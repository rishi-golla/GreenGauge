import { Search } from 'lucide-react';
import { useLocation } from 'react-router';

import { workspacePageMeta } from './workspace-data';

export function WorkspaceHeader() {
  const location = useLocation();
  const pageMeta = workspacePageMeta[location.pathname] ?? workspacePageMeta['/workspace/dashboard'];

  return (
    <div className="space-y-6">
      <div className="verdant-glass flex w-full items-center gap-3 rounded-[1.35rem] px-4 py-3 text-white/44 sm:max-w-[28rem]">
        <Search className="h-4 w-4 shrink-0 text-white/60" />
        <input
          type="search"
          placeholder="Search carbon data..."
          className="w-full bg-transparent text-sm text-white/78 outline-none placeholder:text-white/30"
          aria-label="Search carbon data"
        />
      </div>

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
    </div>
  );
}

