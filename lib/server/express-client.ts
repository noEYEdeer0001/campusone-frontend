import axios from 'axios';
import type { AxiosError } from 'axios';
import { ApiRequestError } from '@/types/api';
import type { ApiErrorEnvelope } from '@/types/api';

/**
 * This instance is imported ONLY from files under app/api/**\/route.ts
 * (Route Handlers run server-side). It talks directly to the Express
 * backend using the real Bearer-token contract that backend actually
 * implements -- no cookies cross this boundary, matching your
 * backend's existing auth design exactly rather than asking it to
 * support a session mechanism it wasn't built with.
 */
export const expressApi = axios.create({
  baseURL: process.env.BACKEND_API_URL ?? 'http://localhost:4000/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

export function toApiRequestError(error: unknown): ApiRequestError {
  const axiosError = error as AxiosError<ApiErrorEnvelope>;
  const status = axiosError.response?.status ?? 0;
  const message = axiosError.response?.data?.message ?? axiosError.message ?? 'Something went wrong';
  const errors = axiosError.response?.data?.errors ?? [];
  return new ApiRequestError(status, message, errors);
}
