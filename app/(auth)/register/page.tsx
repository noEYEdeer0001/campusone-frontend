import type { Metadata } from 'next';
import { RegisterForm } from '@/features/auth/components/register-form';

export const metadata: Metadata = { title: 'Create account -- CampusOne' };

export default function RegisterPage() {
  return (
    <div>
      <h1 className="mb-1 font-display text-xl font-semibold">Create your account</h1>
      <p className="mb-6 text-sm text-muted-foreground">Join your campus on CampusOne.</p>
      <RegisterForm />
    </div>
  );
}
