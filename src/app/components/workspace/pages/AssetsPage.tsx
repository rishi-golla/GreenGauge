import { useMemo, useState } from 'react';

import { WorkspaceCard } from '../WorkspaceCard';
import { WorkspaceChip } from '../WorkspaceChip';
import { WorkspaceSectionHeading } from '../WorkspaceSectionHeading';
import { assetFilters, assetRecords } from '../workspace-data';
import { cn } from '../../ui/utils';

export function AssetsPage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof assetFilters)[number]>('All');
  const [selectedAssetId, setSelectedAssetId] = useState(assetRecords[0]?.id ?? '');

  const filteredAssets = useMemo(() => {
    return assetRecords.filter((asset) => {
      const matchesQuery =
        !query ||
        asset.name.toLowerCase().includes(query.toLowerCase()) ||
        asset.sector.toLowerCase().includes(query.toLowerCase()) ||
        asset.region.toLowerCase().includes(query.toLowerCase());

      const matchesFilter =
        activeFilter === 'All' ||
        asset.status === activeFilter ||
        asset.region === activeFilter ||
        asset.sector === activeFilter;

      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query]);

  const selectedAsset =
    filteredAssets.find((asset) => asset.id === selectedAssetId) ?? filteredAssets[0] ?? assetRecords[0];

  return (
    <>
      <section>
        <WorkspaceSectionHeading
          eyebrow="Holdings Browser"
          title="Scan the names, sectors, and weights shaping portfolio drag."
          description="This page is tuned for faster comparison work: search the book, filter by signal, and open a richer narrative view without losing the overall mix."
        />
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="verdant-glass flex items-center rounded-[1.25rem] px-4 py-3 lg:min-w-[24rem]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Search holdings, region, or sector..."
              className="w-full bg-transparent text-sm text-white/78 outline-none placeholder:text-white/28"
              aria-label="Search holdings"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {assetFilters.map((filter) => (
              <WorkspaceChip key={filter} isActive={filter === activeFilter} onClick={() => setActiveFilter(filter)}>
                {filter}
              </WorkspaceChip>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <WorkspaceCard className="overflow-hidden p-0">
          <div className="grid grid-cols-[minmax(0,1.4fr)_0.8fr_0.8fr_0.8fr] gap-4 border-b border-white/8 px-5 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-white/38">
            <span>Holding</span>
            <span>Weight</span>
            <span>Intensity</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-white/6">
            {filteredAssets.map((asset) => {
              const Icon = asset.icon;
              const isSelected = asset.id === selectedAsset?.id;

              return (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => setSelectedAssetId(asset.id)}
                  className={cn(
                    'grid w-full grid-cols-[minmax(0,1.4fr)_0.8fr_0.8fr_0.8fr] gap-4 px-5 py-4 text-left transition',
                    isSelected ? 'bg-[rgba(0,245,212,0.06)]' : 'hover:bg-white/[0.03]',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.04] text-white/72">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">{asset.name}</p>
                      <p className="truncate text-xs text-white/44">
                        {asset.sector} · {asset.region}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-white/68">{asset.weight}</span>
                  <span className="text-sm text-white/68">{asset.carbonIntensity}</span>
                  <span className="text-sm text-[var(--verdant-mint)]">{asset.status}</span>
                </button>
              );
            })}
          </div>
        </WorkspaceCard>

        {selectedAsset ? (
          <WorkspaceCard>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/44">Asset Detail</p>
            <h3
              className="mt-4 text-[2rem] leading-none tracking-[-0.05em] text-white"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              {selectedAsset.name}
            </h3>
            <p className="mt-3 text-sm text-white/44">
              {selectedAsset.sector} · {selectedAsset.region}
            </p>
            <p className="mt-6 text-sm leading-7 text-white/64">{selectedAsset.narrative}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.2rem] border border-white/8 bg-black/10 px-4 py-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/34">Exposure</p>
                <p className="mt-3 text-2xl tracking-[-0.04em] text-white">{selectedAsset.exposure}</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/8 bg-black/10 px-4 py-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/34">Status</p>
                <p className="mt-3 text-2xl tracking-[-0.04em] text-[var(--verdant-mint)]">{selectedAsset.status}</p>
              </div>
            </div>
          </WorkspaceCard>
        ) : null}
      </section>
    </>
  );
}

