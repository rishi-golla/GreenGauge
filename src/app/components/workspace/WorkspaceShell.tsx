import { Outlet } from 'react-router';

import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceSidebar } from './WorkspaceSidebar';

export function WorkspaceShell({
  isSigningOut,
  signOutError,
  onSignOut,
}: {
  isSigningOut: boolean;
  signOutError: string | null;
  onSignOut: () => void;
}) {
  return (
    <main className="flex flex-1 overflow-hidden verdant-noir-surface">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <WorkspaceSidebar
          isSigningOut={isSigningOut}
          signOutError={signOutError}
          onSignOut={onSignOut}
        />

        <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 verdant-grid opacity-80" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom,rgba(0,245,212,0.12),transparent_60%)]" />

          <div className="relative z-10 flex flex-1 flex-col px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
            <WorkspaceHeader />

            <div className="verdant-scrollbar mt-6 flex-1 overflow-y-auto pb-6">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:gap-10">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

