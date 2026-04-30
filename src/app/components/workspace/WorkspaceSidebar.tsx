import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { NavLink } from 'react-router';

import { analystProfile, workspaceNavigation } from './workspace-data';
import { SETTINGS_STORAGE_KEY, SETTINGS_UPDATED_EVENT } from './pages/SettingsPage';
import { cn } from '../ui/utils';
import { GlobalSearch } from './GlobalSearch';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function getSavedName(): string | null {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return null;
    return (JSON.parse(raw) as { account?: { name?: string } })?.account?.name ?? null;
  } catch {
    return null;
  }
}

export function WorkspaceSidebar({
  isSigningOut,
  signOutError,
  onSignOut,
  userName,
  isCollapsed,
  onToggleCollapse,
}: {
  isSigningOut: boolean;
  signOutError: string | null;
  onSignOut: () => void;
  userName: string | null;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const isCompact = isCollapsed;
  const [savedName, setSavedName] = useState<string | null>(getSavedName);

  useEffect(() => {
    const handler = () => setSavedName(getSavedName());
    window.addEventListener(SETTINGS_UPDATED_EVENT, handler);
    return () => window.removeEventListener(SETTINGS_UPDATED_EVENT, handler);
  }, []);

  const displayName = savedName ?? userName ?? analystProfile.name;
  const initials = getInitials(displayName);

  return (
    <aside
      className={cn(
        'flex w-full shrink-0 flex-col border-b border-white/6 bg-black/32 px-5 py-6 transition-[width,padding] duration-300 ease-in-out',
        'lg:fixed lg:left-0 lg:top-0 lg:z-50 lg:h-screen lg:overflow-hidden lg:border-r lg:border-b-0 lg:py-7',
        isCompact ? 'lg:w-[4.5rem] lg:px-2' : 'lg:w-[18.5rem] lg:px-5',
      )}
    >
      {/* Header */}
      <div className={cn('flex items-center', isCompact ? 'lg:flex-col lg:gap-3' : 'justify-between lg:mb-0')}>
        <div className={isCompact ? 'lg:text-center' : ''}>
          <p
            className={cn(
              'tracking-[-0.045em] text-white transition-all duration-300',
              isCompact ? 'text-[1.5rem]' : 'text-[2rem]',
            )}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            {isCompact ? 'GG' : 'GreenGauge'}
          </p>
          {!isCompact ? (
            <p className="mt-1 text-[0.68rem] uppercase tracking-[0.28em] text-white/42">Portfolio X-Ray</p>
          ) : null}
        </div>

        {/* Desktop collapse toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/[0.06] hover:text-white/80 lg:flex"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* Mobile sign out */}
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

      <div className="flex flex-1 flex-col overflow-hidden">
        {!isCompact ? (
          <div className="mt-6 lg:mt-8">
            <GlobalSearch />
          </div>
        ) : null}

        <nav className={cn('mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1', isCompact ? 'lg:mt-6' : 'lg:mt-4')}>
          {workspaceNavigation.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                cn(
                  'group relative flex overflow-hidden rounded-2xl text-left transition',
                  isCompact ? 'items-center justify-center px-3 py-3.5' : 'items-center gap-4 px-4 py-4',
                  isActive
                    ? 'verdant-sidebar-active text-[var(--verdant-mint)]'
                    : 'text-white/64 hover:bg-white/[0.04] hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCompact ? (
                    <span className="text-sm font-medium tracking-[-0.01em]">{label}</span>
                  ) : null}
                  {isActive ? (
                    <span className="absolute inset-y-3 right-0 w-px rounded-full bg-[var(--verdant-mint)] shadow-[0_0_18px_rgba(0,245,212,0.95)]" />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-3 pb-1">
          <button
            type="button"
            onClick={onSignOut}
            disabled={isSigningOut}
            className={cn(
              'verdant-glass hidden items-center justify-center gap-2 rounded-2xl py-3 text-[0.72rem] uppercase tracking-[0.22em] text-white/62 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60 lg:inline-flex',
              isCompact ? 'w-full px-0' : 'w-full px-4',
            )}
          >
            <LogOut className="h-4 w-4" />
            {!isCompact ? (isSigningOut ? 'Signing out' : 'Close session') : null}
          </button>

          <div
            className={cn(
              'verdant-glass flex rounded-2xl py-3.5',
              isCompact ? 'items-center justify-center px-2' : 'items-center gap-3 px-4',
            )}
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#eef8f4_0%,#8ca59d_100%)] text-sm font-semibold text-[#10211d]">
              {initials}
              <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border border-[#0d0f0e] bg-[var(--verdant-mint)]" />
            </div>
            {!isCompact ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                <p className="truncate text-xs text-white/52">
                  {analystProfile.role} · {analystProfile.status}
                </p>
              </div>
            ) : null}
          </div>

          {signOutError ? (
            <p className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
              {signOutError}
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
