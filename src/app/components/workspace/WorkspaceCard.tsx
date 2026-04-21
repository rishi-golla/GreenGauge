import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../ui/utils';

export function WorkspaceCard({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('verdant-glass rounded-[1.6rem] p-5 sm:p-6', className)} {...props} />;
}

