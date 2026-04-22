import { useLocation } from 'react-router';

import { workspacePageMeta } from './workspace-data';

export function WorkspaceHeader() {
  const location = useLocation();
  const isCompanyRoute = location.pathname.startsWith('/workspace/company/');
  const pageMeta = workspacePageMeta[location.pathname] ?? workspacePageMeta['/workspace/dashboard'];
  const hasPageMeta = Boolean(pageMeta.eyebrow || pageMeta.title || pageMeta.description);

  if (isCompanyRoute) {
    return null;
  }

  return (
    <div className="space-y-6">
      {hasPageMeta ? (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.74rem] uppercase tracking-[0.28em] text-white/44">{pageMeta.eyebrow}</p>
            <h1
              className="mt-3 text-[2.4rem] leading-none tracking-[-0.055em] text-white sm:text-[3.25rem]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              {pageMeta.title}
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/58 sm:text-base">{pageMeta.description}</p>
        </div>
      ) : null}
    </div>
  );
}

