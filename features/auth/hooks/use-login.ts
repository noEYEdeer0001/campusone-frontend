'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { ApiRequestError } from '@/types/api';
import type { LoginFormValues } from '@/features/auth/schemas/login-schema';

export function useLogin() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: (values: LoginFormValues) => login(values.email, values.password),
    onSuccess: () => {
      toast.success('Welcome back!');
      const redirectTo = searchParams.get('redirectTo');
      router.push(redirectTo && redirectTo.startsWith('/') ? redirectTo : '/dashboard');
      router.refresh();
    },
    onError: (error) => {
      const message =
        error instanceof ApiRequestError ? error.message : 'Could not log in. Please try again.';
      toast.error(message);
    },
  });
}
