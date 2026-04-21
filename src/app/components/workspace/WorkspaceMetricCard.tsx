import { WorkspaceCard } from './WorkspaceCard';
import { cn } from '../ui/utils';

type Accent = 'mint' | 'warm' | 'neutral';

export function WorkspaceMetricCard({
  label,
  value,
  detail,
  accent = 'neutral',
}: {
  label: string;
  value: string;
  detail: string;
  accent?: Accent;
}) {
  return (
    <WorkspaceCard
      className={cn(
        'min-h-[9rem]',
        accent === 'mint' && 'bg-[rgba(0,245,212,0.06)]',
        accent === 'warm' && 'bg-[rgba(255,138,118,0.06)]',
      )}
    >
      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/46">{label}</p>
      <div className="mt-5 flex items-end gap-3">
        <p className="text-4xl tracking-[-0.05em] text-white sm:text-[2.8rem]">{value}</p>
        <p
          className={cn(
            'pb-1 text-sm',
            accent === 'mint' && 'text-[var(--verdant-mint)]',
            accent === 'warm' && 'text-[#f3a79f]',
            accent === 'neutral' && 'text-white/56',
          )}
        >
          {detail}
        </p>
      </div>
    </WorkspaceCard>
  );
}

