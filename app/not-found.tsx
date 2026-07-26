import Link from 'next/link';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <Compass className="h-10 w-10 text-muted-foreground" />
      <div>
        <p className="font-display text-5xl font-bold text-primary">404</p>
        <h1 className="mt-2 font-display text-xl font-semibold">This page doesn&apos;t exist on campus</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The link might be broken, or the page may have moved.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
