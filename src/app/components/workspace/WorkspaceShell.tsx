import { Outlet, useLocation } from 'react-router';

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
  const location = useLocation();
  const isDashboardRoute = location.pathname === '/workspace/dashboard';
  const isCompanyRoute = location.pathname.startsWith('/workspace/company/');
  const isImmersiveWorkspaceRoute = isDashboardRoute || isCompanyRoute;

  return (
    <main className="flex h-screen flex-1 overflow-hidden verdant-noir-surface">
      <div className="flex h-full w-full flex-col overflow-hidden lg:flex-row">
        {!isCompanyRoute ? (
          <WorkspaceSidebar
            isSigningOut={isSigningOut}
            signOutError={signOutError}
            onSignOut={onSignOut}
          />
        ) : null}

        <section className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          <div
            className={
              isImmersiveWorkspaceRoute
                ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(0,245,212,0.14),transparent_0_28rem),radial-gradient(circle_at_84%_22%,rgba(31,111,235,0.12),transparent_0_26rem),radial-gradient(circle_at_50%_80%,rgba(0,245,212,0.08),transparent_0_30rem),linear-gradient(180deg,#04070b_0%,#091018_48%,#0d151c_100%)]'
                : 'pointer-events-none absolute inset-0 verdant-grid opacity-80'
            }
          />
          {isImmersiveWorkspaceRoute ? (
            <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(rgba(255,255,255,0.8)_0.45px,transparent_0.45px)] [background-size:7px_7px]" />
          ) : null}
          <div
            className={
              isImmersiveWorkspaceRoute
                ? 'pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(circle_at_bottom,rgba(0,245,212,0.08),transparent_58%)]'
                : 'pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom,rgba(0,245,212,0.12),transparent_60%)]'
            }
          />

          <div
            className={`relative z-10 flex flex-1 flex-col px-4 py-4 sm:px-6 sm:py-5 ${
              isCompanyRoute ? 'lg:px-4 lg:py-3' : 'lg:px-8 lg:py-6'
            }`}
          >
            <WorkspaceHeader />

            <div
              className={`verdant-scrollbar flex-1 ${isCompanyRoute ? 'mt-0 overflow-hidden pb-0' : 'mt-6 overflow-y-auto pb-6'}`}
            >
              <div
                className={`${isCompanyRoute ? '' : 'mx-auto'} flex w-full flex-col ${
                  isCompanyRoute ? 'h-full gap-0' : 'gap-8 lg:gap-10'
                } ${
                  isCompanyRoute ? 'max-w-none' : isImmersiveWorkspaceRoute ? 'max-w-[104rem]' : 'max-w-6xl'
                }`}
              >
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

