import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowLeft, Building2, Globe2, Landmark, TrendingUp } from 'lucide-react';

import { ChartContainer, ChartTooltipContent } from '../../ui/chart';
import { fetchCompanyMarketSnapshot, fetchCompanyOverview, type CompanyMarketSnapshot, type CompanyOverview } from '../../../../lib/alpha-vantage';
import { dashboardScoredCompanies } from '../dashboard-engine';
import { WorkspaceCard } from '../WorkspaceCard';

const companyLogoDomains: Record<string, string> = {
  apple: 'apple.com',
  microsoft: 'microsoft.com',
  nvidia: 'nvidia.com',
  amazon: 'amazon.com',
  alphabet: 'google.com',
  meta: 'meta.com',
  netflix: 'netflix.com',
  tesla: 'tesla.com',
  oracle: 'oracle.com',
  salesforce: 'salesforce.com',
  sap: 'sap.com',
  ibm: 'ibm.com',
  tsmc: 'tsmc.com',
  asml: 'asml.com',
  samsung: 'samsung.com',
  sony: 'sony.com',
  alibaba: 'alibaba.com',
  tencent: 'tencent.com',
  siemens: 'siemens.com',
  airbus: 'airbus.com',
  'schneider-electric': 'se.com',
  honeywell: 'honeywell.com',
  caterpillar: 'caterpillar.com',
  toyota: 'toyota.com',
  byd: 'byd.com',
  shell: 'shell.com',
  bp: 'bp.com',
  totalenergies: 'totalenergies.com',
  nextera: 'nexteraenergy.com',
  enel: 'enel.com',
  jpmorgan: 'jpmorganchase.com',
  'goldman-sachs': 'goldmansachs.com',
  'bank-of-america': 'bankofamerica.com',
  hsbc: 'hsbc.com',
  ubs: 'ubs.com',
  visa: 'visa.com',
  mastercard: 'mastercard.com',
  'american-express': 'americanexpress.com',
  'berkshire-hathaway': 'berkshirehathaway.com',
  blackrock: 'blackrock.com',
  'novo-nordisk': 'novonordisk.com',
  roche: 'roche.com',
  'johnson-johnson': 'jnj.com',
  pfizer: 'pfizer.com',
  nestle: 'nestle.com',
  unilever: 'unilever.com',
  'procter-gamble': 'pg.com',
  pepsico: 'pepsico.com',
  'coca-cola': 'coca-cola.com',
  lvmh: 'lvmh.com',
  adyen: 'adyen.com',
  accenture: 'accenture.com',
  cisco: 'cisco.com',
  broadcom: 'broadcom.com',
  intel: 'intel.com',
  qualcomm: 'qualcomm.com',
  servicenow: 'servicenow.com',
  snowflake: 'snowflake.com',
  abb: 'abb.com',
  deere: 'deere.com',
  'rio-tinto': 'riotinto.com',
  bhp: 'bhp.com',
  linde: 'linde.com',
  suncor: 'suncor.com',
  novartis: 'novartis.com',
  merck: 'merck.com',
  sanofi: 'sanofi.com',
  telefonica: 'telefonica.com',
  verizon: 'verizon.com',
  'deutsche-telekom': 'telekom.com',
};

const scoreTone = (score: number) => {
  if (score >= 80) {
    return {
      text: 'text-[#9ff4de]',
      border: 'border-[#32d9a5]/25',
      glow: 'rgba(50,217,165,0.22)',
    };
  }

  if (score >= 60) {
    return {
      text: 'text-[#ffe08a]',
      border: 'border-[#f5c94a]/25',
      glow: 'rgba(245,201,74,0.2)',
    };
  }

  return {
    text: 'text-[#ffb4a8]',
    border: 'border-[#ff7f6d]/25',
    glow: 'rgba(255,127,109,0.22)',
  };
};

const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const integerFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

const compactNumber = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const shortScoreDescriptions = {
  environmental: 'Carbon and transition.',
  social: 'Labor and privacy.',
  governance: 'Board and controls.',
};

const getLogoSources = (companyId: string, logoUrl: string) => {
  const domain = companyLogoDomains[companyId];
  const domainSources = domain
    ? [
        `https://logo.clearbit.com/${domain}`,
        `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      ]
    : [];

  return [...new Set([logoUrl, ...domainSources].filter(Boolean))];
};

function DetailLogo({
  companyId,
  logoUrl,
  logoFallback,
  brandColor,
  name,
}: {
  companyId: string;
  logoUrl: string;
  logoFallback: string;
  brandColor: string;
  name: string;
}) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const sources = getLogoSources(companyId, logoUrl);
  const currentSource = sources[sourceIndex];

  return (
    <div
      className="flex h-[5.8rem] w-[5.8rem] items-center justify-center rounded-[1.4rem] bg-white/[0.96] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.22)]"
      style={{ boxShadow: `0 20px 40px rgba(0,0,0,0.22), 0 0 0 1px ${brandColor}22 inset` }}
    >
      {currentSource ? (
        <img
          src={currentSource}
          alt={`${name} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
          onError={() => setSourceIndex((current) => current + 1)}
        />
      ) : (
        <span className="font-sans text-sm font-semibold uppercase tracking-[0.1em]" style={{ color: brandColor }}>
          {logoFallback}
        </span>
      )}
    </div>
  );
}

export function CompanyDetailPage() {
  const { ticker = '' } = useParams();
  const company = useMemo(
    () => dashboardScoredCompanies.find((entry) => entry.ticker.toLowerCase() === ticker.toLowerCase()),
    [ticker],
  );
  const [overview, setOverview] = useState<CompanyOverview | null>(null);
  const [marketSnapshot, setMarketSnapshot] = useState<CompanyMarketSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [marketError, setMarketError] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    if (!company) {
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    const load = async () => {
      setIsLoading(true);
      setMarketError(null);

      const [overviewResult, marketResult] = await Promise.allSettled([
        fetchCompanyOverview(company.ticker),
        fetchCompanyMarketSnapshot(company.ticker),
      ]);

      if (isCancelled) {
        return;
      }

      if (overviewResult.status === 'fulfilled') {
        setOverview(overviewResult.value);
      }

      if (marketResult.status === 'fulfilled') {
        setMarketSnapshot(marketResult.value);
      } else {
        setMarketError(marketResult.reason instanceof Error ? marketResult.reason.message : 'Market data is unavailable right now.');
      }

      setIsLoading(false);
    };

    void load();

    return () => {
      isCancelled = true;
    };
  }, [company]);

  if (!company) {
    return (
      <div className="space-y-6 pb-12">
        <Link to="/workspace/dashboard" className="inline-flex items-center gap-2 text-sm text-white/52 transition hover:text-white/80">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <WorkspaceCard className="border border-white/10 p-8 text-white/70">
          No company matched ticker <span className="font-semibold text-white">{ticker}</span>.
        </WorkspaceCard>
      </div>
    );
  }

  const totalTone = scoreTone(company.totalScore);
  const changePositive = (marketSnapshot?.changePercent ?? 0) >= 0;
  const chartDomain = useMemo(() => {
    if (!marketSnapshot?.chart.length) {
      return ['auto', 'auto'] as const;
    }

    const closes = marketSnapshot.chart.map((point) => point.close);
    const min = Math.min(...closes);
    const max = Math.max(...closes);
    const buffer = Math.max((max - min) * 0.18, max * 0.035, 8);

    return [Math.max(0, min - buffer), max + buffer] as const;
  }, [marketSnapshot]);

  return (
    <div className="h-full min-h-0 overflow-hidden" style={{ fontFamily: 'Inter, var(--font-ui), sans-serif' }}>
      <div className="grid h-full min-h-0 gap-2 xl:grid-cols-[23rem_minmax(0,1fr)]">
        <WorkspaceCard className="grid h-full min-h-0 grid-rows-[auto_auto_auto_auto_1fr] gap-2 overflow-hidden border border-white/10 p-3.5">
          <div className="flex items-center justify-start gap-4">
            <Link to="/workspace/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-white/54 transition hover:text-white/84">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>

          <div className="flex items-start gap-4">
            <DetailLogo
              companyId={company.id}
              logoUrl={company.logoUrl}
              logoFallback={company.logoFallback}
              brandColor={company.brandColor}
              name={company.name}
            />
            <div className="min-w-0 pt-1">
              <p className="text-[0.7rem] uppercase tracking-[0.24em] text-white/34">{company.ticker}</p>
              <h1 className="mt-1.5 text-[1.7rem] font-semibold leading-tight tracking-[-0.05em] text-white">
                {company.name}
              </h1>
              <p className="mt-1 text-[0.82rem] font-medium uppercase tracking-[0.14em] text-white/38">
                {overview?.industry || company.industry}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-white/32">Company info</p>
            <p className={`mt-1.5 text-[0.84rem] leading-6 text-white/62 ${isDescriptionExpanded ? '' : '[display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:3]'}`}>
              {overview?.description ||
                `${company.name} is tracked in GreenGauge as a ${company.industry.toLowerCase()} business within the ${company.sector.toLowerCase()} sector. This page combines the local ESG model with live market data from Alpha Vantage.`}
            </p>
            <button
              type="button"
              onClick={() => setIsDescriptionExpanded((current) => !current)}
              className="mt-1 text-[0.72rem] font-medium text-[var(--verdant-mint)] transition hover:text-white"
            >
              {isDescriptionExpanded ? 'Read less' : 'Read more'}
            </button>
          </div>

          <div className="grid gap-1.5">
            <div
              className={`rounded-[1rem] border ${totalTone.border} bg-white/[0.03] px-3 py-2`}
              style={{ boxShadow: `inset 1px 1px 0 rgba(255,255,255,0.08), 0 0 24px ${totalTone.glow}` }}
            >
              <p className="text-[0.66rem] uppercase tracking-[0.2em] text-white/38">Total ESG</p>
              <div className="mt-0.5 flex items-end justify-between gap-3">
                <p className={`text-[1.7rem] font-semibold leading-none tracking-[-0.08em] ${totalTone.text}`}>
                  {company.totalScore}
                </p>
                <p className="pb-0.5 text-[0.72rem] text-white/44">out of 100</p>
              </div>
              <p className="mt-0.5 text-[0.72rem] leading-4.5 text-white/58">40% E, 30% S, 30% G.</p>
            </div>

            <div className="rounded-[1rem] border border-white/8 bg-white/[0.02] px-3 py-2">
              <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Environmental', value: company.environmentalScore, description: shortScoreDescriptions.environmental },
                { label: 'Social', value: company.socialScore, description: shortScoreDescriptions.social },
                { label: 'Governance', value: company.governanceScore, description: shortScoreDescriptions.governance },
              ].map((item) => {
                const tone = scoreTone(item.value);

                return (
                  <div
                    key={item.label}
                    className="rounded-[0.85rem] border border-white/6 bg-white/[0.015] px-2.5 py-2"
                  >
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-white/62">{item.label.slice(0, 1)}</p>
                    <p className={`mt-1 text-[1.2rem] font-semibold leading-none tracking-[-0.06em] ${tone.text}`}>
                      {item.value}
                    </p>
                    <p className="mt-1 text-[0.7rem] leading-4 text-white/52">{item.description}</p>
                  </div>
                );
              })}
              </div>
            </div>
          </div>

          <div className="grid content-start gap-1.5 sm:grid-cols-2">
            {[
              { icon: Building2, label: 'Sector', value: overview?.sector || company.sector },
              { icon: Globe2, label: 'Country', value: overview?.country || 'Global' },
              { icon: Landmark, label: 'Exchange', value: overview?.exchange || 'Market data pending' },
              {
                icon: TrendingUp,
                label: 'Market cap',
                value:
                  overview?.marketCapitalization != null
                    ? compactNumber.format(overview.marketCapitalization)
                    : 'Unavailable',
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-[0.8rem] border border-white/6 bg-white/[0.015] px-2.5 py-1.5">
                <div className="flex items-center gap-1.5 text-white/36">
                  <Icon className="h-3 w-3" />
                  <span className="text-[0.56rem] uppercase tracking-[0.14em]">{label}</span>
                </div>
                <p className="mt-0.5 text-[0.76rem] font-medium text-white/72">{value}</p>
              </div>
            ))}
          </div>
        </WorkspaceCard>

        <div className="grid min-h-0 gap-2">
          <WorkspaceCard className="flex min-h-0 flex-col overflow-hidden border border-white/10 p-3">
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white/34">Price</p>
                <p className="mt-1.5 text-[2.25rem] font-semibold leading-none tracking-[-0.08em] text-white">
                  {marketSnapshot ? compactCurrency.format(marketSnapshot.latestClose) : '--'}
                </p>
                <p className={`mt-0.5 text-[0.84rem] font-semibold ${changePositive ? 'text-[#9ff4de]' : 'text-[#ffb4a8]'}`}>
                  {marketSnapshot
                    ? `${marketSnapshot.change >= 0 ? '+' : ''}${compactCurrency.format(marketSnapshot.change)} (${marketSnapshot.changePercent >= 0 ? '+' : ''}${marketSnapshot.changePercent.toFixed(2)}%)`
                    : marketError || 'Waiting for Alpha Vantage'}
                </p>
              </div>
            </div>
            {marketSnapshot ? (
              <ChartContainer
                config={{
                  close: {
                    label: 'Close',
                    color: '#32d9a5',
                  },
                }}
                className="h-full min-h-[25rem] w-full flex-1"
              >
                <AreaChart data={marketSnapshot.chart} margin={{ left: 0, right: 4, top: 2, bottom: 2 }}>
                  <defs>
                    <linearGradient id="company-close-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#32d9a5" stopOpacity={0.32} />
                      <stop offset="95%" stopColor="#32d9a5" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={32} tickMargin={6} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={46}
                    domain={chartDomain}
                    tickFormatter={(value) => `$${integerFormatter.format(value)}`}
                  />
                  <Tooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(_, payload) => String(payload?.[0]?.payload?.label ?? '')}
                        formatter={(value) => [compactCurrency.format(Number(value)), 'Close']}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke="#56f0c2"
                    strokeWidth={2.4}
                    fill="url(#company-close-fill)"
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="flex min-h-0 flex-1 items-center justify-center rounded-[1.3rem] border border-dashed border-white/12 bg-white/[0.02] px-6 text-center text-sm leading-7 text-white/52">
                {isLoading ? 'Loading market data from Alpha Vantage...' : marketError || 'Market data is unavailable right now.'}
              </div>
            )}
          </WorkspaceCard>
        </div>
      </div>
    </div>
  );
}
