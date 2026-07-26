'use client';

import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * React error boundaries must be class components -- there is still
 * no hook equivalent for `componentDidCatch`/`getDerivedStateFromError`.
 * This is the app-wide safety net wrapped around all page content in
 * AppProviders; individual features can also wrap a risky subtree
 * (e.g. a rich media preview) in their own <AppErrorBoundary> with a
 * custom fallback.
 */
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
            <AlertTriangle className="h-10 w-10 text-destructive" />
            <div>
              <p className="font-display text-lg font-semibold">Something broke on our end</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try reloading the page. If this keeps happening, it&apos;s us, not you.
              </p>
            </div>
            <Button onClick={() => window.location.reload()}>Reload page</Button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
