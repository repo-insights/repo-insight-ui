import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenStore } from "./token-store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.example.com";
const PUBLIC_AUTH_PATHS = [
  "/api/v1/auth/login/",
  "/api/v1/auth/signup",
  "/api/v1/auth/verify-email",
  "/api/v1/auth/resend-verification",
  "/api/v1/auth/refresh",
];

function getRequestPath(config: InternalAxiosRequestConfig) {
  const url = config.url ?? "";

  try {
    return new URL(url, BASE_URL).pathname;
  } catch {
    return url;
  }
}

function isPublicAuthRequest(config: InternalAxiosRequestConfig) {
  const path = getRequestPath(config);
  return PUBLIC_AUTH_PATHS.some((publicPath) => path.startsWith(publicPath));
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // sends refresh token cookie automatically
  headers: { "Content-Type": "application/json" },
});

// Attach access token to every request
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (isPublicAuthRequest(config)) {
    delete config.headers.Authorization;
    return config;
  }

  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (err: unknown, token: string | null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (err) reject(err);
    else if (token) resolve(token);
  });
  refreshQueue = [];
};

// Auto-refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isPublicAuthRequest(originalRequest)
    ) {
      return Promise.reject(normalizeError(error));
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post<{ access_token: string }>(
        `${BASE_URL}/api/v1/auth/refresh`,
        null,
        { withCredentials: true }
      );
      tokenStore.set(data.access_token);
      processQueue(null, data.access_token);
      originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      tokenStore.clear();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

function normalizeError(error: AxiosError): ApiError {
  const data = error.response?.data as
    | {
        detail?: string | Array<{ msg?: string }>;
        message?: string;
        errors?: Array<{ message?: string }>;
      }
    | undefined;

  const validationMessage =
    data?.errors?.[0]?.message ??
    (Array.isArray(data?.detail) ? data?.detail[0]?.msg : undefined);

  return {
    message:
      validationMessage ??
      (typeof data?.detail === "string" ? data.detail : undefined) ??
      data?.message ??
      error.message ??
      "An unexpected error occurred",
    status: error.response?.status,
    code: error.code,
  };
}
