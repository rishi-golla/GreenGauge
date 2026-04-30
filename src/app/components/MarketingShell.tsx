import { Outlet, useLocation } from 'react-router';

import { cn } from './ui/utils';

const SHARED_VIDEO_SRC =
  'https://videos.pexels.com/video-files/16116385/16116385-uhd_2560_1440_24fps.mp4';

export function MarketingShell() {
  const { pathname } = useLocation();
  const isWorkspaceRoute = pathname === '/workspace' || pathname.startsWith('/workspace/');
  const isImmersiveRoute =
    pathname === '/login' || pathname === '/signup' || isWorkspaceRoute;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className={cn(
          'absolute inset-0 z-0 h-full w-full object-cover transition-all duration-500',
          isWorkspaceRoute
            ? 'opacity-0'
            : isImmersiveRoute
            ? 'brightness-[0.35] contrast-[1.05] saturate-[0.72]'
            : 'brightness-[0.62] contrast-[1.05] saturate-[0.85]',
        )}
      >
        <source src={SHARED_VIDEO_SRC} type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 z-10 transition-opacity duration-500',
          isWorkspaceRoute
            ? 'opacity-100 bg-[#0d0f0e]'
            : isImmersiveRoute
            ? 'opacity-100 bg-[radial-gradient(circle_at_top,rgba(147,197,166,0.2),transparent_42%),linear-gradient(180deg,rgba(3,18,22,0.34)_0%,rgba(3,15,20,0.82)_32%,rgba(2,11,15,0.92)_68%,rgba(2,10,14,0.97)_100%)]'
            : 'opacity-0',
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 top-0 z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_58%)] transition-all duration-500',
          isWorkspaceRoute
            ? 'h-[18rem] opacity-20'
            : isImmersiveRoute
              ? 'h-[30rem] opacity-100'
              : 'h-64 opacity-0',
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 bottom-0 z-10 bg-[radial-gradient(circle_at_bottom,rgba(91,128,110,0.24),transparent_58%)] transition-all duration-500',
          isWorkspaceRoute
            ? 'h-[24rem] opacity-45'
            : isImmersiveRoute
              ? 'h-[34rem] opacity-100'
              : 'h-80 opacity-0',
        )}
      />
      <div className="relative z-20 flex min-h-screen flex-col">
        <Outlet />
      </div>
    </div>
  );
}
