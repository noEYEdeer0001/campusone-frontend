import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiRequestError } from '@/types/api';
import type { ApiErrorEnvelope } from '@/types/api';

/**
 * Deliberately same-origin ('/api', no absolute backend URL) -- this
 * client never talks to the Express backend directly. Every request
 * goes to this Next.js app's own Route Handlers, which hold the
 * httpOnly cookies this JS code is not allowed to read. `withCredentials`
 * ensures cookies ride along even if this is ever deployed on a
 * different subdomain than expected.
 */
export const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

/**
 * Single-flight refresh, same reasoning as documented in this
 * project's backend-facing client from an earlier phase: if several
 * requests 401 at once, only the first triggers `/api/auth/refresh`;
 * the rest wait on that same promise rather than each independently
 * (and uselessly) racing to rotate an already-single-use refresh
 * token.
 */
let refreshPromise: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  try {
    await axios.post('/api/auth/refresh', null, { withCredentials: true });
    return true;
  } catch {
    return false;
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorEnvelope>) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    const isAuthRoute = originalRequest?.url?.includes('/auth/');
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true;
      refreshPromise ??= tryRefresh().finally(() => {
        refreshPromise = null;
      });

      const refreshed = await refreshPromise;
      if (refreshed) {
        return apiClient(originalRequest);
      }

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    const message = error.response?.data?.message ?? error.message ?? 'Something went wrong';
    const errors = error.response?.data?.errors ?? [];
    return Promise.reject(new ApiRequestError(error.response?.status ?? 0, message, errors));
  },
);
