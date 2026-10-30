import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';
export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={cn('rounded-lg border border-surface-border bg-white shadow-card', className)} />;
}
