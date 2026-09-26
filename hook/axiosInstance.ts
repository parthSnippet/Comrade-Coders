import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

import apiConfig from "../config/global.json";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || apiConfig.api.baseUrl;

// ─── JWT expiry check ─────────────────────────────────────────────────────────
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

// ─── Extend config to carry retry flag ───────────────────────────────────────
interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// ─── Refresh queue — prevents multiple simultaneous refresh calls ─────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
    }
  });
  failedQueue = [];
}

// ─── Logout helper ────────────────────────────────────────────────────────────
function forceLogout() {
  sessionStorage.removeItem("admin_access_token");
  sessionStorage.removeItem("admin_refresh_token");
  sessionStorage.removeItem("admin_user");
  // Only redirect if currently on an admin protected page
  if (window.location.pathname.startsWith("/admin/")) {
    window.location.href = "/admin";
  }
}

// ─── Axios instance ───────────────────────────────────────────────────────────
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// ─── Request interceptor — attach access token ────────────────────────────────
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isAuthEndpoint =
      config.url?.includes(apiConfig.api.endpoints.authLogin) ||
      config.url?.includes(apiConfig.api.endpoints.authRefresh);
    const token = sessionStorage.getItem("admin_access_token");
    if (token && config.headers && !isAuthEndpoint) {
      if (isTokenExpired(token)) {
        // Token expired — let response interceptor handle refresh via 401
        // but still attach it so server returns 401 to trigger refresh flow
      }
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor — handle 401 & refresh ─────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryableRequestConfig;

    // Not a 401 or already retried — pass through
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Don't try to refresh if the failing request IS the refresh endpoint
    if (originalRequest.url?.includes(apiConfig.api.endpoints.authRefresh)) {
      forceLogout();
      return Promise.reject(error);
    }

    // Don't try to refresh if the failing request IS the login endpoint
    if (originalRequest.url?.includes(apiConfig.api.endpoints.authLogin)) {
      return Promise.reject(error);
    }

    const refreshToken = sessionStorage.getItem("admin_refresh_token");

    // No refresh token available — logout immediately
    if (!refreshToken) {
      forceLogout();
      return Promise.reject(error);
    }

    // Another request is already refreshing — queue this one
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest._retry = true;
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          }
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    // This request will handle the refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshResponse = await axios.post(
        `${BASE_URL}${apiConfig.api.endpoints.authRefresh}`,
        { refresh: refreshToken },
        { timeout: 10000 }
      );

      const newAccessToken: string = refreshResponse.data.access;

      // Persist new token
      sessionStorage.setItem("admin_access_token", newAccessToken);

      // Also update refresh token if backend rotates it
      if (refreshResponse.data.refresh) {
        sessionStorage.setItem("admin_refresh_token", refreshResponse.data.refresh);
      }

      // Update default header for future requests
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${newAccessToken}`;

      // Resolve all queued requests with new token
      processQueue(null, newAccessToken);

      // Retry original request
      if (originalRequest.headers) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      }
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Refresh failed — reject all queued requests and logout
      processQueue(refreshError, null);
      forceLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
