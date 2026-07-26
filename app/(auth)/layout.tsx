import type { ReactNode } from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/40 px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
          C1
        </div>
        <span className="font-display text-xl font-semibold">CampusOne</span>
      </Link>
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}
