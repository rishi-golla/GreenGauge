import type { ButtonHTMLAttributes } from 'react';

import { cn } from '../ui/utils';

export function WorkspaceChip({
  isActive,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-full border px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] transition',
        isActive
          ? 'border-[rgba(0,245,212,0.34)] bg-[rgba(0,245,212,0.12)] text-[var(--verdant-mint)]'
          : 'border-white/10 bg-white/[0.02] text-white/56 hover:border-white/18 hover:text-white',
        className,
      )}
      {...props}
    />
  );
}
