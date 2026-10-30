import { cn } from '@/lib/cn';
import { forwardRef, type InputHTMLAttributes } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...rest }, ref) => (
    <input
      ref={ref}
      {...rest}
      className={cn(
        'h-11 w-full rounded-md border border-surface-border bg-white px-3 text-sm text-ink placeholder:text-ink-subtle',
        'focus:border-brand-600 focus:ring-2 focus:ring-brand-100 transition-colors',
        className,
      )}
    />
  ),
);
Input.displayName = 'Input';
