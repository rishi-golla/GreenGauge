import { useMemo, useState } from 'react';
import { Link2 } from 'lucide-react';

import { usePortfolioConnection } from '../PortfolioConnectionContext';
import { WorkspaceCard } from '../WorkspaceCard';
import { WorkspaceChip } from '../WorkspaceChip';
import { assetRecords } from '../workspace-data';
import { cn } from '../../ui/utils';

const brokerFilters = ['All', 'Robinhood', 'Fidelity'] as const;

export function AssetsPage() {
  const { connectBroker, connectedBrokers, isBrokerConnected } = usePortfolioConnection();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof brokerFilters)[number]>('All');
  const [selectedAssetId, setSelectedAssetId] = useState(assetRecords[0]?.id ?? '');

  const filteredAssets = useMemo(() => {
    return assetRecords.filter((asset) => {
      const normalizedQuery = query.toLowerCase();
      const matchesQuery =
        !query ||
        asset.name.toLowerCase().includes(normalizedQuery) ||
        asset.ticker.toLowerCase().includes(normalizedQuery) ||
        asset.broker.toLowerCase().includes(normalizedQuery) ||
        asset.sector.toLowerCase().includes(normalizedQuery) ||
        asset.region.toLowerCase().includes(normalizedQuery);

      const matchesBroker = activeFilter === 'All' || asset.broker === activeFilter;

      return matchesQuery && matchesBroker;
    });
  }, [activeFilter, query]);

  const selectedAsset =
    filteredAssets.find((asset) => asset.id === selectedAssetId) ??
    filteredAssets[0] ??
    assetRecords[0];

  return (
    <>
      <section>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => connectBroker('Robinhood')}
            className="verdant-glass inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(0,245,212,0.22)] bg-[rgba(0,245,212,0.08)] px-5 py-3 text-sm font-semibold text-[var(--verdant-mint)] shadow-[0_0_24px_rgba(0,245,212,0.12)] transition hover:border-[rgba(0,245,212,0.32)] hover:bg-[rgba(0,245,212,0.12)]"
          >
            <Link2 className="h-4 w-4" />
            {isBrokerConnected('Robinhood') ? 'Robinhood Connected' : 'Connect Robinhood'}
          </button>

          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-white/48">
            {connectedBrokers.length > 0 ? `${connectedBrokers.join(', ')} linked` : 'Demo holdings ready'}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="verdant-glass flex items-center rounded-[1.25rem] px-4 py-3 lg:min-w-[24rem]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Search ticker, broker, sector, or region..."
              className="w-full bg-transparent text-sm text-white/78 outline-none placeholder:text-white/28"
              aria-label="Search holdings"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {brokerFilters.map((filter) => (
              <WorkspaceChip
                key={filter}
                isActive={filter === activeFilter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </WorkspaceChip>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <WorkspaceCard className="overflow-hidden p-0">
          <div className="grid grid-cols-[minmax(0,1.5fr)_0.8fr_0.8fr_0.9fr_0.8fr] gap-4 border-b border-white/8 px-5 py-4 text-[0.72rem] uppercase tracking-[0.22em] text-white/38">
            <span>Owned asset</span>
            <span>Broker</span>
            <span>Quantity</span>
            <span>Value</span>
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
                    'grid w-full grid-cols-[minmax(0,1.5fr)_0.8fr_0.8fr_0.9fr_0.8fr] gap-4 px-5 py-4 text-left transition',
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
                        {asset.ticker} · {asset.sector} · {asset.region}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-white/68">{asset.broker}</span>
                  <span className="text-sm text-white/68">{asset.quantity}</span>
                  <span className="text-sm text-white/68">{asset.marketValue}</span>
                  <span className="text-sm text-[var(--verdant-mint)]">{asset.status}</span>
                </button>
              );
            })}
          </div>
        </WorkspaceCard>

        {selectedAsset ? (
          <WorkspaceCard>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/44">
              Owned Position Detail
            </p>
            <h3
              className="mt-4 text-[2rem] leading-none tracking-[-0.05em] text-white"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
            >
              {selectedAsset.name}
            </h3>
            <p className="mt-3 text-sm text-white/44">
              {selectedAsset.ticker} · {selectedAsset.sector} · {selectedAsset.region}
            </p>
            <p className="mt-6 text-sm leading-7 text-white/64">{selectedAsset.narrative}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.2rem] border border-white/8 bg-black/10 px-4 py-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/34">
                  Market value
                </p>
                <p className="mt-3 text-2xl tracking-[-0.04em] text-white">
                  {selectedAsset.marketValue}
                </p>
              </div>
              <div className="rounded-[1.2rem] border border-white/8 bg-black/10 px-4 py-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/34">
                  Broker source
                </p>
                <p className="mt-3 text-2xl tracking-[-0.04em] text-[var(--verdant-mint)]">
                  {selectedAsset.broker}
                </p>
              </div>
              <div className="rounded-[1.2rem] border border-white/8 bg-black/10 px-4 py-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/34">
                  Quantity
                </p>
                <p className="mt-3 text-2xl tracking-[-0.04em] text-white">
                  {selectedAsset.quantity}
                </p>
              </div>
              <div className="rounded-[1.2rem] border border-white/8 bg-black/10 px-4 py-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/34">
                  Connection
                </p>
                <p className="mt-3 text-2xl tracking-[-0.04em] text-white">
                  {selectedAsset.connectionState}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.2rem] border border-white/8 bg-black/10 px-4 py-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/34">
                    Portfolio weight
                  </p>
                  <p className="mt-2 text-lg text-white/86">{selectedAsset.weight}</p>
                </div>
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/34">
                    Carbon intensity
                  </p>
                  <p className="mt-2 text-lg text-white/86">{selectedAsset.carbonIntensity}</p>
                </div>
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/34">
                    Climate status
                  </p>
                  <p className="mt-2 text-lg text-white/86">{selectedAsset.status}</p>
                </div>
              </div>
            </div>
          </WorkspaceCard>
        ) : null}
      </section>
    </>
  );
}
