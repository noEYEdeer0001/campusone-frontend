'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { ApiRequestError } from '@/types/api';
import type { AuthUser, AuthUserClaims } from '@/types/models';

type SessionUser = AuthUser | AuthUserClaims;

interface AuthContextValue {
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string, universityId: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    authService
      .me()
      .then((result) => {
        if (mounted) setUser(result.user);
      })
      .catch((error: unknown) => {
        // A 401 here just means "not logged in" -- not a real error to
        // surface. Anything else (network failure) still leaves the
        // user logged-out client-side, which is the safe default.
        if (!(error instanceof ApiRequestError) || error.statusCode !== 401) {
          console.error('Failed to bootstrap session', error);
        }
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authService.login({ email, password });
    setUser(result.user);
  }, []);

  const register = useCallback(
    async (fullName: string, email: string, password: string, universityId: string) => {
      await authService.register({ fullName, email, password, universityId });
      // Registration does not log the user in -- the backend requires
      // email verification first, so there is no session yet.
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      router.push('/login');
      router.refresh();
    }
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, isAuthenticated: Boolean(user), login, register, logout }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
