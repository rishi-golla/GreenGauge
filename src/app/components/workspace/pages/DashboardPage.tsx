import { useMemo, useState } from 'react';

import { WorkspaceCard } from '../WorkspaceCard';
import { WorkspaceChip } from '../WorkspaceChip';
import { WorkspaceMetricCard } from '../WorkspaceMetricCard';
import { WorkspaceSectionHeading } from '../WorkspaceSectionHeading';
import { attentionMoments, dashboardMetrics, dashboardPeriods, dashboardTrendSeries, watchlistHoldings } from '../workspace-data';

export function DashboardPage() {
  const [period, setPeriod] = useState<(typeof dashboardPeriods)[number]>('1Q');
  const points = dashboardTrendSeries[period];
  const maxResilience = useMemo(
    () => Math.max(...points.map((point) => point.resilience)),
    [points],
  );

  return (
    <>
      <section>
        <WorkspaceSectionHeading
          eyebrow="Portfolio Posture"
          title="A calmer read on the names shaping your climate profile."
          description="This view is designed to tell you what changed, where the drag is concentrating, and which holdings deserve another pass before the story drifts."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <WorkspaceMetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
        <WorkspaceCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.74rem] uppercase tracking-[0.26em] text-white/44">Trend Window</p>
              <h3
                className="mt-3 text-[1.8rem] leading-none tracking-[-0.04em] text-white"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                Resilience is improving faster than emissions are falling.
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {dashboardPeriods.map((option) => (
                <WorkspaceChip key={option} isActive={option === period} onClick={() => setPeriod(option)}>
                  {option}
                </WorkspaceChip>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-3">
            {points.map((point) => (
              <div key={point.month} className="flex flex-col">
                <div className="flex h-40 items-end rounded-[1.2rem] border border-white/8 bg-white/[0.02] p-3">
                  <div
                    className="w-full rounded-full bg-[linear-gradient(180deg,rgba(0,245,212,0.85)_0%,rgba(0,245,212,0.2)_100%)]"
                    style={{ height: `${(point.resilience / maxResilience) * 100}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-white/72">{point.month}</p>
                <p className="text-xs text-white/44">{point.emissions.toFixed(2)}M tCO2e</p>
              </div>
            ))}
          </div>
        </WorkspaceCard>

        <WorkspaceCard>
          <p className="text-[0.74rem] uppercase tracking-[0.26em] text-white/44">Attention Now</p>
          <div className="mt-5 space-y-4">
            {attentionMoments.map((moment, index) => (
              <div key={moment} className="rounded-[1.25rem] border border-white/8 bg-black/10 px-4 py-4">
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/34">Signal 0{index + 1}</p>
                <p className="mt-3 text-sm leading-7 text-white/68">{moment}</p>
              </div>
            ))}
          </div>
        </WorkspaceCard>
      </section>

      <section>
        <WorkspaceSectionHeading eyebrow="Watchlist" title="The small cluster doing most of the damage." />
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {watchlistHoldings.map((holding) => (
            <WorkspaceCard key={holding.name}>
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/44">{holding.sector}</p>
              <h3
                className="mt-3 text-[1.6rem] leading-none tracking-[-0.04em] text-white"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                {holding.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/64">{holding.note}</p>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-white/54">{holding.risk}</span>
                <span className="text-[#f3a79f]">{holding.move}</span>
              </div>
            </WorkspaceCard>
          ))}
        </div>
      </section>
    </>
  );
}

