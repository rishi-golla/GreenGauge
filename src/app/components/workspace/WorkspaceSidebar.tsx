import { LogOut } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';

import { analystProfile, workspaceNavigation } from './workspace-data';
import { cn } from '../ui/utils';
import { GlobalSearch } from './GlobalSearch';

export function WorkspaceSidebar({
  isSigningOut,
  signOutError,
  onSignOut,
}: {
  isSigningOut: boolean;
  signOutError: string | null;
  onSignOut: () => void;
}) {
  const location = useLocation();
  const isCompanyRoute = location.pathname.startsWith('/workspace/company/');

  return (
    <aside
      className={`flex w-full shrink-0 flex-col border-b border-white/6 bg-black/32 px-5 py-6 lg:fixed lg:left-0 lg:top-0 lg:z-50 lg:h-screen lg:border-r lg:border-b-0 lg:overflow-hidden lg:py-7 ${
        isCompanyRoute ? 'lg:w-[5.8rem] lg:px-3' : 'lg:w-[280px] lg:px-6'
      }`}
    >
      <div className="flex items-center justify-between lg:block">
        <div className={isCompanyRoute ? 'lg:text-center' : ''}>
          <p
            className={`tracking-[-0.045em] text-white ${isCompanyRoute ? 'text-[1.5rem]' : 'text-[2rem]'}`}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            {isCompanyRoute ? 'GG' : 'GreenGauge'}
          </p>
          {!isCompanyRoute ? (
            <p className="mt-1 text-[0.68rem] uppercase tracking-[0.28em] text-white/42">Portfolio X-Ray</p>
          ) : null}
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

      <div className="flex flex-1 flex-col overflow-hidden">
        {!isCompanyRoute ? (
          <div className="mt-6 lg:mt-8">
            <GlobalSearch />
          </div>
        ) : null}

        <nav className={`mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 ${isCompanyRoute ? 'lg:mt-10' : 'lg:mt-4'}`}>
          {workspaceNavigation.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                cn(
                  `group relative flex overflow-hidden rounded-2xl text-left transition ${
                    isCompanyRoute ? 'items-center justify-center px-3 py-3.5' : 'items-center gap-[14px] px-5 py-[14px]'
                  }`,
                  isActive
                    ? 'verdant-sidebar-active text-[var(--verdant-mint)]'
                    : 'text-white/64 hover:bg-white/[0.04] hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="h-[1.15rem] w-[1.15rem] shrink-0" />
                  {!isCompanyRoute ? <span className="text-[15px] font-medium tracking-[-0.01em]">{label}</span> : null}
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
            className={`verdant-glass hidden items-center justify-center gap-2 rounded-2xl py-3 text-[0.72rem] uppercase tracking-[0.22em] text-white/62 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60 lg:inline-flex ${
              isCompanyRoute ? 'w-full px-0' : 'w-full px-4'
            }`}
          >
            <LogOut className="h-4 w-4" />
            {!isCompanyRoute ? (isSigningOut ? 'Signing out' : 'Close session') : null}
          </button>

          <div
            className={`verdant-glass flex rounded-2xl py-3.5 ${
              isCompanyRoute ? 'items-center justify-center px-2' : 'items-center gap-3 px-4'
            }`}
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#eef8f4_0%,#8ca59d_100%)] text-sm font-semibold text-[#10211d]">
              {analystProfile.initials}
              <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border border-[#0d0f0e] bg-[var(--verdant-mint)]" />
            </div>
            {!isCompanyRoute ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{analystProfile.name}</p>
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
