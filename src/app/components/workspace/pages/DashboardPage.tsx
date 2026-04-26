import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';

import {
  dashboardSectionDefinitions,
  dashboardScoredCompanies,
  sortCompanies,
  type DashboardScoredCompany,
} from '../dashboard-engine';
import { companyLogoDomains } from '../dashboard-universe';
import { fetchCompanyMarketSnapshot, type CompanyMarketSnapshot } from '../../../../lib/alpha-vantage';

type SectionKey = (typeof dashboardSectionDefinitions)[number]['key'];

const initialVisibleCounts: Record<SectionKey, number> = {
  total: 6,
  environmental: 6,
  social: 6,
  governance: 6,
};

const buildSparkline = (values: number[]) => {
  const width = 180;
  const height = 34;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');
};

const getScoreStyles = (score: number) => {
  if (score >= 80) {
    return {
      scoreClass: 'text-[#9ff4de]',
      ringStroke: '#32d9a5',
      sparkStroke: '#56f0c2',
      glow: 'rgba(50,217,165,0.24)',
    };
  }

  if (score >= 60) {
    return {
      scoreClass: 'text-[#ffe08a]',
      ringStroke: '#f5c94a',
      sparkStroke: '#f5d979',
      glow: 'rgba(245,201,74,0.2)',
    };
  }

  return {
    scoreClass: 'text-[#ffb4a8]',
    ringStroke: '#ff7f6d',
    sparkStroke: '#ff9d8f',
    glow: 'rgba(255,127,109,0.22)',
  };
};

const getPercentDelta = (values: number[]) => {
  const first = values[0];
  const last = values[values.length - 1];

  if (!first) {
    return 0;
  }

  return Number((((last - first) / first) * 100).toFixed(2));
};

const getLogoSources = (company: DashboardScoredCompany) => {
  const domain = companyLogoDomains[company.id];
  const domainSources = domain
    ? [
        `https://logo.clearbit.com/${domain}`,
        `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      ]
    : [];

  return [...new Set([company.logoUrl, ...domainSources].filter(Boolean))];
};

function BrandLogo({ company }: { company: DashboardScoredCompany }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const logoSources = getLogoSources(company);
  const currentSource = logoSources[sourceIndex];
  const exhausted = sourceIndex >= logoSources.length;

  return (
    <div
      className="flex h-[5.4rem] w-[5.4rem] shrink-0 items-center justify-center rounded-[1.3rem] bg-white/[0.95] p-4 shadow-[0_18px_34px_rgba(0,0,0,0.22)]"
      style={{
        boxShadow: `0 18px 34px rgba(0,0,0,0.22), 0 0 0 1px ${company.brandColor}22 inset`,
      }}
    >
      {currentSource && !exhausted ? (
        <img
          src={currentSource}
          alt={`${company.name} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
          onError={() => setSourceIndex((current) => current + 1)}
        />
      ) : (
        <div className="flex max-w-full items-center justify-center text-center">
          <span
            className="font-sans text-[0.82rem] font-bold uppercase leading-tight tracking-[0.08em]"
            style={{ color: company.brandColor }}
          >
            {company.logoFallback}
          </span>
        </div>
      )}
    </div>
  );
}

export function DashboardPage() {
  const [visibleCounts, setVisibleCounts] = useState(initialVisibleCounts);
  const [marketSnapshots, setMarketSnapshots] = useState<Record<string, CompanyMarketSnapshot>>({});
  const [marketFailures, setMarketFailures] = useState<Record<string, string>>({});

  const sections = useMemo(
    () =>
      dashboardSectionDefinitions.map((section) => {
        const sortedCompanies = sortCompanies(dashboardScoredCompanies, section.getScore);
        return {
          section,
          sortedCompanies,
          visibleCompanies: sortedCompanies.slice(0, visibleCounts[section.key]),
          hasMore: visibleCounts[section.key] < sortedCompanies.length,
        };
      }),
    [visibleCounts],
  );

  const visibleTickers = useMemo(
    () =>
      Array.from(
        new Set(
          sections.flatMap(({ visibleCompanies }) => visibleCompanies.map((company) => company.ticker)),
        ),
      ),
    [sections],
  );

  useEffect(() => {
    let isCancelled = false;

    const loadSnapshots = async () => {
      for (const ticker of visibleTickers) {
        if (marketSnapshots[ticker] || marketFailures[ticker]) {
          continue;
        }

        try {
          const snapshot = await fetchCompanyMarketSnapshot(ticker);

          if (isCancelled) {
            return;
          }

          setMarketSnapshots((current) => {
            if (current[ticker]) {
              return current;
            }

            return {
              ...current,
              [ticker]: snapshot,
            };
          });
        } catch (error) {
          if (isCancelled) {
            return;
          }

          const message = error instanceof Error ? error.message : 'Unable to load market data.';
          setMarketFailures((current) => ({
            ...current,
            [ticker]: message,
          }));
        }
      }
    };

    void loadSnapshots();

    return () => {
      isCancelled = true;
    };
  }, [marketFailures, marketSnapshots, visibleTickers]);

  return (
    <div className="space-y-10 pb-10" style={{ fontFamily: 'Inter, var(--font-ui), sans-serif' }}>
      {sections.map(({ section, visibleCompanies, hasMore, sortedCompanies }) => {
        const heading = section.key === 'total' ? 'ESG' : section.title;

        return (
          <section key={section.key} className="relative space-y-6">
            <div className="pointer-events-none absolute inset-x-8 top-4 h-52 rounded-full bg-[radial-gradient(circle,rgba(0,245,212,0.12),transparent_68%)] blur-3xl" />

            <div className="relative flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--verdant-mint)] shadow-[0_0_14px_rgba(0,245,212,0.45)]" />
              <h2 className="text-[1.55rem] font-semibold tracking-[-0.04em] text-white">
                {heading}
              </h2>
            </div>

            <div className="relative grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {visibleCompanies.map((company, index) => {
                const score = section.getScore(company);
                const scoreStyles = getScoreStyles(score);
                const marketSnapshot = marketSnapshots[company.ticker];
                const sparklineValues = marketSnapshot?.sparkline ?? company.trend;
                const sparkline = buildSparkline(sparklineValues);
                const scoreBarWidth = `${Math.max(18, score)}%`;
                const fallbackPercentDelta = getPercentDelta(company.trend);
                const trendValue = marketSnapshot
                  ? `${marketSnapshot.changePercent >= 0 ? '+' : ''}${marketSnapshot.changePercent.toFixed(2)}%`
                  : `${fallbackPercentDelta >= 0 ? '+' : ''}${fallbackPercentDelta.toFixed(2)}%`;
                const trendLabel = marketSnapshot ? '1D' : '12M';

                return (
                  <Link
                    key={`${section.key}-${company.id}`}
                    to={`/workspace/company/${company.ticker}`}
                    className="block focus-visible:outline-none"
                    aria-label={`Open ${company.name} detail page`}
                  >
                    <article
                      className="liquid-glass group relative flex min-h-[18.5rem] cursor-pointer flex-col justify-between rounded-[1.5rem] px-8 pt-8 pb-7 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(0,0,0,0.28)] focus-within:-translate-y-1.5"
                      style={{
                        animation: 'fade-rise 0.75s ease-out both',
                        animationDelay: `${index * 70}ms`,
                        backdropFilter: 'blur(26px)',
                        WebkitBackdropFilter: 'blur(26px)',
                        boxShadow:
                          'inset 1px 1px 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.035), 0 22px 48px rgba(0,0,0,0.24)',
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.025) 100%)',
                      }}
                    >
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-0 top-8 h-[60%] w-px bg-gradient-to-b from-white/45 via-white/10 to-transparent" />
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                        <div
                          className="absolute -left-10 top-4 h-32 w-32 rounded-full blur-3xl opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ backgroundColor: `${company.brandColor}20` }}
                        />
                      </div>

                      <div className="relative flex items-start justify-between gap-6">
                        <div className="flex items-start gap-5">
                          <BrandLogo company={company} />

                          <div className="min-w-0 self-start pt-1">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                              <h3 className="text-[1.32rem] font-semibold leading-tight tracking-[-0.03em] text-white">
                                {company.name}
                              </h3>
                              <span className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white/28">
                                {company.ticker}
                              </span>
                            </div>
                            <p className="mt-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white/36">
                              {company.industry}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 self-start text-right">
                          <p className="mb-2 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white/26">
                            {section.scoreLabel}
                          </p>
                          <div className="min-w-[7.5rem]">
                            <p className={`text-[3.6rem] font-semibold leading-none tracking-[-0.1em] ${scoreStyles.scoreClass}`}>
                              {score}
                            </p>
                            <div className="mt-2 flex items-baseline justify-end gap-1.5">
                              <span className="text-[0.82rem] font-semibold tracking-[-0.02em] text-white/55">
                                out of
                              </span>
                              <span className="text-[1rem] font-semibold tracking-[-0.04em] text-white/82">
                                100
                              </span>
                            </div>
                            <div className="mt-4 h-[0.35rem] w-full overflow-hidden rounded-full bg-white/[0.08]">
                              <div
                                className="h-full rounded-full transition-[width] duration-500 ease-out"
                                style={{
                                  width: scoreBarWidth,
                                  background: `linear-gradient(90deg, ${scoreStyles.ringStroke}, ${scoreStyles.sparkStroke})`,
                                  boxShadow: `0 0 14px ${scoreStyles.glow}`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative mt-8 border-t border-white/8 pt-5">
                        <div className="flex items-end justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/24">
                              {marketSnapshot ? 'Market trend' : '12M trend'}
                            </p>
                            <svg width="180" height="34" viewBox="0 0 180 34" fill="none" aria-hidden="true" className="max-w-full">
                              <polyline
                                points={sparkline}
                                fill="none"
                                stroke={scoreStyles.sparkStroke}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          <div className="shrink-0 text-right">
                            <p
                              className={`text-[0.82rem] font-semibold uppercase tracking-[0.14em] ${
                                marketSnapshot
                                  ? marketSnapshot.changePercent >= 0
                                    ? 'text-[#9ff4de]'
                                    : 'text-[#ffb4a8]'
                                  : fallbackPercentDelta >= 0
                                    ? 'text-[#9ff4de]'
                                    : 'text-[#ffb4a8]'
                              }`}
                            >
                              {trendValue}
                            </p>
                            <p className="mt-1 text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-white/22">
                              {trendLabel}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {hasMore ? (
              <button
                type="button"
                onClick={() =>
                  setVisibleCounts((current) => ({
                    ...current,
                    [section.key]: Math.min(current[section.key] + 6, sortedCompanies.length),
                  }))
                }
                className="liquid-glass group relative inline-flex w-full items-center justify-center overflow-hidden rounded-[1.2rem] px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/46 transition-all duration-300 hover:-translate-y-0.5 hover:text-white/72 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
                style={{
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow:
                    'inset 1px 1px 0 rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.035), 0 14px 32px rgba(0,0,0,0.18)',
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.055) 50%, rgba(255,255,255,0.03) 100%)',
                }}
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
                <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] transition-transform duration-700 group-hover:translate-x-[420%]" />
                <span className="relative">See more</span>
              </button>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
