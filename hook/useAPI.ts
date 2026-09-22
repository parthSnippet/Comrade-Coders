import { useCallback, useState } from "react";
import axios from "axios";
import type { AxiosError, AxiosRequestConfig, Method } from "axios";

import apiConfig from "../config/global.json";

interface ApiErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
}

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
        const response = await axios({
          baseURL: apiConfig.api.baseUrl,
          url: endpoint,
          method,
          data: body,
          ...config,
        });

        setData(response.data);

        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError<ApiErrorResponse>;

        const errorMessage =
          axiosError.response?.data?.detail ||
          axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          axiosError.message ||
          "Something went wrong.";

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