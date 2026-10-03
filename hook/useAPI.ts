import { useCallback, useState } from "react";
import type { AxiosError, AxiosRequestConfig, Method } from "axios";

import axiosInstance from "./axiosInstance";

interface UseAPIReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  request: (
    endpoint: string,
    method?: Method,
    body?: unknown,
    config?: AxiosRequestConfig
  ) => Promise<T | null>;
}

const getErrorMessage = (value: unknown): string | null => {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const message = getErrorMessage(item);
      if (message) return message;
    }
    return null;
  }

  if (value && typeof value === "object") {
    const errorData = value as Record<string, unknown>;

    // Common DRF and API error response fields
    const priorityKeys = [
      "detail",
      "message",
      "error",
      "non_field_errors",
    ];

    for (const key of priorityKeys) {
      if (key in errorData) {
        const message = getErrorMessage(errorData[key]);
        if (message) return message;
      }
    }

    // Handle field-specific validation errors, e.g. username/password
    for (const [key, fieldValue] of Object.entries(errorData)) {
      const message = getErrorMessage(fieldValue);
      if (message) {
        return `${key}: ${message}`;
      }
    }
  }

  return null;
};

const useAPI = <T = unknown>(): UseAPIReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (
      endpoint: string,
      method: Method = "GET",
      body?: unknown,
      config?: AxiosRequestConfig
    ): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance({
          url: endpoint,
          method,
          data: body,
          ...config,
        });

        setData(response.data);
        return response.data;
      } catch (err: unknown) {
        const axiosError = err as AxiosError<unknown>;

        const apiMessage = getErrorMessage(
          axiosError.response?.data
        );

        const errorMessage =
          apiMessage ||
          (axiosError.response
            ? `Request failed with status code ${axiosError.response.status}`
            : axiosError.message) ||
          "Something went wrong. Please try again.";

        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useAPI;