import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'neutral' | 'success' | 'danger' | 'warning' | 'info';

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-secondary text-secondary-foreground',
  success: 'bg-green-500/10 text-green-600 dark:text-green-400',
  danger: 'bg-destructive/10 text-destructive',
  warning: 'bg-accent/15 text-accent-foreground dark:text-accent',
  info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = 'neutral', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
