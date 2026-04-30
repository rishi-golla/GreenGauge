import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router';

import { dashboardBlueChipUniverse, companyLogoDomains } from './dashboard-universe';

type SearchResult = {
  id: string;
  companyId: string;
  label: string;
  sublabel: string;
  to: string;
  logoUrl: string;
  logoFallback: string;
  brandColor: string;
};

const COMPANY_LIMIT = 8;

function CompanyLogo({
  companyId,
  logoUrl,
  logoFallback,
  brandColor,
}: {
  companyId: string;
  logoUrl: string;
  logoFallback: string;
  brandColor: string;
}) {
  const [sourceIndex, setSourceIndex] = useState(0);

  const sources = useMemo(() => {
    const domain = companyLogoDomains[companyId];
    const domainSources = domain
      ? [`https://logo.clearbit.com/${domain}`, `https://www.google.com/s2/favicons?domain=${domain}&sz=64`]
      : [];
    return [...new Set([logoUrl, ...domainSources].filter(Boolean))];
  }, [companyId, logoUrl]);

  const current = sources[sourceIndex];
  const exhausted = sourceIndex >= sources.length;

  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]"
      style={{ boxShadow: `0 0 0 1px ${brandColor}33 inset` }}
    >
      {current && !exhausted ? (
        <img
          src={current}
          alt=""
          onError={() => setSourceIndex((i) => i + 1)}
          className="h-5 w-5 object-contain"
        />
      ) : (
        <span className="text-[0.5rem] font-bold leading-none" style={{ color: brandColor }}>
          {logoFallback.slice(0, 3)}
        </span>
      )}
    </div>
  );
}

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return dashboardBlueChipUniverse
      .filter(({ name, ticker, sector, industry }) =>
        name.toLowerCase().includes(q) ||
        ticker.toLowerCase().includes(q) ||
        sector.toLowerCase().includes(q) ||
        industry.toLowerCase().includes(q),
      )
      .slice(0, COMPANY_LIMIT)
      .map(({ id, ticker, name, sector, industry, logoUrl, logoFallback, brandColor }) => ({
        id: `company-${ticker}`,
        companyId: id,
        label: `${name}`,
        sublabel: `${ticker} · ${sector} · ${industry}`,
        to: `/workspace/company/${ticker}`,
        logoUrl,
        logoFallback,
        brandColor,
      }));
  }, [query]);

  const showDropdown = isOpen && results.length > 0;

  const handleSelect = useCallback(
    (result: SearchResult) => {
      navigate(result.to);
      setQuery('');
      setIsOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
    },
    [navigate],
  );

  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (showDropdown ? Math.min(prev + 1, results.length - 1) : -1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && results[activeIndex]) {
        e.preventDefault();
        handleSelect(results[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="verdant-glass flex items-center gap-3 rounded-2xl px-4 py-3">
        <Search className="h-4 w-4 shrink-0 text-white/38" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search companies, assets, scenarios…"
          className="flex-1 bg-transparent text-sm text-white/80 outline-none placeholder:text-white/28"
          aria-label="Global search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="text-white/32 transition hover:text-white/64"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          role="listbox"
          aria-label="Search results"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[28rem] overflow-y-auto rounded-2xl border border-white/8 bg-[#07101a]/96 shadow-[0_16px_48px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        >
          {results.map((result, index) => (
            <button
              key={result.id}
              id={`search-result-${index}`}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(result)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                index > 0 ? 'border-t border-white/[0.04]' : ''
              } ${index === activeIndex ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'}`}
            >
              <CompanyLogo
                companyId={result.companyId}
                logoUrl={result.logoUrl}
                logoFallback={result.logoFallback}
                brandColor={result.brandColor}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm leading-tight text-white/88">{result.label}</p>
                <p className="mt-0.5 truncate text-xs leading-snug text-white/40">{result.sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
