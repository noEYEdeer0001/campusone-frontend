'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { PageLoader } from '@/components/common/loading';

/**
 * middleware.ts gates navigation based on cookie *presence* at the
 * edge, which is fast but approximate (see its own comment). This
 * component is the real authority on the client: it waits for
 * `/api/auth/me` to actually resolve before deciding, and redirects
 * if that resolves to "not authenticated" -- covering the case where
 * a refresh token cookie exists but is expired/revoked server-side.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <PageLoader label="Checking your session..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
