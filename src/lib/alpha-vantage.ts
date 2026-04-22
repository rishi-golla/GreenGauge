type AlphaVantageErrorCode = 'missing_api_key' | 'rate_limited' | 'invalid_symbol' | 'network_error' | 'bad_payload';

export class AlphaVantageError extends Error {
  code: AlphaVantageErrorCode;

  constructor(code: AlphaVantageErrorCode, message: string) {
    super(message);
    this.name = 'AlphaVantageError';
    this.code = code;
  }
}

type CacheEntry<T> = {
  value: T;
  timestamp: number;
};

type AlphaVantageOverviewResponse = {
  Symbol?: string;
  Name?: string;
  Description?: string;
  Exchange?: string;
  Currency?: string;
  Country?: string;
  Sector?: string;
  Industry?: string;
  MarketCapitalization?: string;
  PERatio?: string;
  DividendYield?: string;
  Beta?: string;
  ['52WeekHigh']?: string;
  ['52WeekLow']?: string;
};

type AlphaVantageDailyPoint = {
  date: string;
  close: number;
};

export type CompanyOverview = {
  symbol: string;
  name: string;
  description: string;
  exchange: string;
  currency: string;
  country: string;
  sector: string;
  industry: string;
  marketCapitalization: number | null;
  peRatio: number | null;
  dividendYield: number | null;
  beta: number | null;
  week52High: number | null;
  week52Low: number | null;
};

export type MarketChartPoint = {
  date: string;
  label: string;
  close: number;
};

export type CompanyMarketSnapshot = {
  symbol: string;
  latestClose: number;
  previousClose: number;
  change: number;
  changePercent: number;
  latestDate: string;
  sparkline: number[];
  chart: MarketChartPoint[];
};

const API_BASE = 'https://www.alphavantage.co/query';
const MARKET_CACHE_TTL_MS = 1000 * 60 * 30;
const OVERVIEW_CACHE_TTL_MS = 1000 * 60 * 60 * 12;
const memoryCache = new Map<string, CacheEntry<unknown>>();

const getApiKey = () => {
  const apiKey = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

  if (!apiKey) {
    throw new AlphaVantageError(
      'missing_api_key',
      'Missing Alpha Vantage API key. Set VITE_ALPHA_VANTAGE_API_KEY in your environment.',
    );
  }

  return apiKey;
};

const parseNumber = (value?: string) => {
  if (!value || value === 'None') {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const cacheKey = (prefix: string, symbol: string) => `${prefix}:${symbol.toUpperCase()}`;

const readLocalStorageCache = <T,>(key: string, ttlMs: number) => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - parsed.timestamp > ttlMs) {
      window.localStorage.removeItem(key);
      return null;
    }

    return parsed.value;
  } catch {
    return null;
  }
};

const writeLocalStorageCache = <T,>(key: string, value: T) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({
        value,
        timestamp: Date.now(),
      } satisfies CacheEntry<T>),
    );
  } catch {
    // Ignore quota and serialization issues.
  }
};

const readCache = <T,>(key: string, ttlMs: number) => {
  const cached = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (cached && Date.now() - cached.timestamp <= ttlMs) {
    return cached.value;
  }

  const localValue = readLocalStorageCache<T>(key, ttlMs);
  if (localValue) {
    memoryCache.set(key, { value: localValue, timestamp: Date.now() });
    return localValue;
  }

  return null;
};

const writeCache = <T,>(key: string, value: T) => {
  const entry: CacheEntry<T> = { value, timestamp: Date.now() };
  memoryCache.set(key, entry);
  writeLocalStorageCache(key, value);
};

const formatChartLabel = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const fetchAlphaVantage = async (params: Record<string, string>) => {
  const url = new URL(API_BASE);
  const apiKey = getApiKey();

  Object.entries({
    ...params,
    apikey: apiKey,
  }).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  let response: Response;
  try {
    response = await fetch(url.toString());
  } catch {
    throw new AlphaVantageError('network_error', 'Unable to reach Alpha Vantage.');
  }

  const payload = (await response.json()) as Record<string, unknown>;

  if ('Note' in payload) {
    throw new AlphaVantageError(
      'rate_limited',
      String(payload.Note ?? 'Alpha Vantage rate limit reached.'),
    );
  }

  if ('Error Message' in payload || 'Information' in payload) {
    throw new AlphaVantageError(
      'invalid_symbol',
      String(payload['Error Message'] ?? payload.Information ?? 'Alpha Vantage rejected the request.'),
    );
  }

  return payload;
};

const normalizeOverview = (payload: AlphaVantageOverviewResponse): CompanyOverview => ({
  symbol: payload.Symbol ?? '',
  name: payload.Name ?? '',
  description: payload.Description ?? '',
  exchange: payload.Exchange ?? '',
  currency: payload.Currency ?? '',
  country: payload.Country ?? '',
  sector: payload.Sector ?? '',
  industry: payload.Industry ?? '',
  marketCapitalization: parseNumber(payload.MarketCapitalization),
  peRatio: parseNumber(payload.PERatio),
  dividendYield: parseNumber(payload.DividendYield),
  beta: parseNumber(payload.Beta),
  week52High: parseNumber(payload['52WeekHigh']),
  week52Low: parseNumber(payload['52WeekLow']),
});

const normalizeDailySeries = (payload: Record<string, unknown>): AlphaVantageDailyPoint[] => {
  const series = payload['Time Series (Daily)'];
  if (!series || typeof series !== 'object') {
    throw new AlphaVantageError('bad_payload', 'Alpha Vantage did not return a daily time series.');
  }

  const entries = Object.entries(series as Record<string, Record<string, string>>)
    .map(([date, values]) => {
      const adjusted = parseNumber(values['5. adjusted close']);
      const close = parseNumber(values['4. close']);
      return {
        date,
        close: adjusted ?? close ?? NaN,
      };
    })
    .filter((point) => Number.isFinite(point.close))
    .sort((left, right) => left.date.localeCompare(right.date));

  if (!entries.length) {
    throw new AlphaVantageError('bad_payload', 'Alpha Vantage returned an empty price series.');
  }

  return entries;
};

export const fetchCompanyOverview = async (symbol: string) => {
  const key = cacheKey('overview', symbol);
  const cached = readCache<CompanyOverview>(key, OVERVIEW_CACHE_TTL_MS);
  if (cached) {
    return cached;
  }

  const payload = (await fetchAlphaVantage({
    function: 'OVERVIEW',
    symbol,
  })) as AlphaVantageOverviewResponse;

  if (!payload.Symbol) {
    throw new AlphaVantageError('bad_payload', `No company overview was returned for ${symbol}.`);
  }

  const overview = normalizeOverview(payload);
  writeCache(key, overview);
  return overview;
};

export const fetchDailySeries = async (symbol: string) => {
  const key = cacheKey('daily-series', symbol);
  const cached = readCache<AlphaVantageDailyPoint[]>(key, MARKET_CACHE_TTL_MS);
  if (cached) {
    return cached;
  }

  const payload = await fetchAlphaVantage({
    function: 'TIME_SERIES_DAILY',
    symbol,
    outputsize: 'compact',
  });

  const series = normalizeDailySeries(payload);
  writeCache(key, series);
  return series;
};

export const fetchCompanyMarketSnapshot = async (symbol: string) => {
  const key = cacheKey('market-snapshot', symbol);
  const cached = readCache<CompanyMarketSnapshot>(key, MARKET_CACHE_TTL_MS);
  if (cached) {
    return cached;
  }

  const series = await fetchDailySeries(symbol);
  const latest = series[series.length - 1];
  const previous = series[series.length - 2] ?? latest;
  const change = Number((latest.close - previous.close).toFixed(2));
  const changePercent = previous.close
    ? Number((((latest.close - previous.close) / previous.close) * 100).toFixed(2))
    : 0;

  const chart = series.slice(-60).map((point) => ({
    date: point.date,
    label: formatChartLabel(point.date),
    close: point.close,
  }));

  const snapshot: CompanyMarketSnapshot = {
    symbol: symbol.toUpperCase(),
    latestClose: latest.close,
    previousClose: previous.close,
    change,
    changePercent,
    latestDate: latest.date,
    sparkline: series.slice(-12).map((point) => point.close),
    chart,
  };

  writeCache(key, snapshot);
  return snapshot;
};
