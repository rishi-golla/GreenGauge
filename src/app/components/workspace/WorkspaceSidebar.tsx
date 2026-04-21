import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router';

import { analystProfile, workspaceNavigation } from './workspace-data';
import { cn } from '../ui/utils';

export function WorkspaceSidebar({
  isSigningOut,
  signOutError,
  onSignOut,
}: {
  isSigningOut: boolean;
  signOutError: string | null;
  onSignOut: () => void;
}) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-white/6 bg-black/32 px-5 py-6 lg:min-h-screen lg:w-[18.5rem] lg:border-r lg:border-b-0 lg:px-5 lg:py-7">
      <div className="flex items-center justify-between lg:block">
        <div>
          <p
            className="text-[2rem] tracking-[-0.045em] text-white"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            GreenGauge
          </p>
          <p className="mt-1 text-[0.68rem] uppercase tracking-[0.28em] text-white/42">Portfolio X-Ray</p>
        </div>

        <button
          type="button"
          onClick={onSignOut}
          disabled={isSigningOut}
          className="verdant-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-white/70 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60 lg:hidden"
        >
          <LogOut className="h-3.5 w-3.5" />
          {isSigningOut ? 'Signing out' : 'Sign out'}
        </button>
      </div>

      <nav className="mt-6 grid gap-2 sm:grid-cols-2 lg:mt-14 lg:grid-cols-1">
        {workspaceNavigation.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-4 overflow-hidden rounded-2xl px-4 py-4 text-left transition',
                isActive
                  ? 'verdant-sidebar-active text-[var(--verdant-mint)]'
                  : 'text-white/64 hover:bg-white/[0.04] hover:text-white',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium tracking-[-0.01em]">{label}</span>
                {isActive ? (
                  <span className="absolute inset-y-3 right-0 w-px rounded-full bg-[var(--verdant-mint)] shadow-[0_0_18px_rgba(0,245,212,0.95)]" />
                ) : null}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 hidden lg:block lg:flex-1" />

      <div className="mt-6 space-y-3 lg:mt-0">
        <button
          type="button"
          onClick={onSignOut}
          disabled={isSigningOut}
          className="verdant-glass hidden w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-[0.72rem] uppercase tracking-[0.22em] text-white/62 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60 lg:inline-flex"
        >
          <LogOut className="h-4 w-4" />
          {isSigningOut ? 'Signing out' : 'Close session'}
        </button>

        <div className="verdant-glass flex items-center gap-3 rounded-2xl px-4 py-3.5">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#eef8f4_0%,#8ca59d_100%)] text-sm font-semibold text-[#10211d]">
            {analystProfile.initials}
            <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border border-[#0d0f0e] bg-[var(--verdant-mint)]" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{analystProfile.name}</p>
            <p className="truncate text-xs text-white/52">
              {analystProfile.role} · {analystProfile.status}
            </p>
          </div>
        </div>

        {signOutError ? (
          <p className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            {signOutError}
          </p>
        ) : null}
      </div>
    </aside>
  );
}

