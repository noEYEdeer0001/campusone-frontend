import { QueryClient } from '@tanstack/react-query';
import { ApiRequestError } from '@/types/api';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (error instanceof ApiRequestError && error.statusCode < 500 && error.statusCode !== 0) {
            return false;
          }
          return failureCount < 2;
        },
      },
      mutations: { retry: false },
    },
  });
}
