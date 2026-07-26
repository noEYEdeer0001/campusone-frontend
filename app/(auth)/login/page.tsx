import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginForm } from '@/features/auth/components/login-form';

export const metadata: Metadata = { title: 'Log in -- CampusOne' };

export default function LoginPage() {
  return (
    <div>
      <h1 className="mb-1 font-display text-xl font-semibold">Welcome back</h1>
      <p className="mb-6 text-sm text-muted-foreground">Log in to your CampusOne account.</p>
      {/* useSearchParams (used by useLogin for the redirectTo param) requires a Suspense boundary in the App Router. */}
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
