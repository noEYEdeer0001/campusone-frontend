'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { ApiRequestError } from '@/types/api';
import type { RegisterFormValues } from '@/features/auth/schemas/register-schema';

export function useRegister() {
  const { register } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: (values: RegisterFormValues) =>
      register(values.fullName, values.email, values.password, values.universityId),
    onSuccess: () => {
      toast.success('Account created! Check your email to verify before logging in.');
      router.push('/login');
    },
    onError: (error) => {
      const message =
        error instanceof ApiRequestError ? error.message : 'Could not create your account.';
      toast.error(message);
    },
  });
}
