# Alpha Vantage Company Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add live stock data to the ESG dashboard so cards can open a company detail page with a stock chart, company summary, ESG breakdown, and real dashboard sparklines powered by Alpha Vantage.

**Architecture:** Introduce a focused Alpha Vantage client in `src/lib` that fetches company overview and compact price series, then build a dashboard market-data adapter that merges live price data with the existing ESG engine. Add a new `/workspace/company/:ticker` route and page that reuses the existing workspace shell, keeping ESG scoring local while layering live market history on top with resilient fallbacks for rate limits or missing data.

**Tech Stack:** React, React Router, Vite env vars, native fetch, Recharts, existing workspace ESG engine, Tailwind utilities

---

### Task 1: Add Alpha Vantage data client and response shaping

**Files:**
- Create: `src/lib/alpha-vantage.ts`
- Modify: `src/lib/supabase.ts` only if shared env helpers become necessary; otherwise leave untouched

- [ ] **Step 1: Create the Alpha Vantage env contract**

Implement `src/lib/alpha-vantage.ts` with a required `VITE_ALPHA_VANTAGE_API_KEY` read from `import.meta.env`. Throw a clear error only when a request is attempted without a key, not at module import time, so the app can still boot into routes that do not need market data.

- [ ] **Step 2: Add fetch helpers for overview and daily prices**

In `src/lib/alpha-vantage.ts`, add small helpers for:
- `fetchCompanyOverview(symbol: string)`
- `fetchDailySeries(symbol: string)`
- `fetchCompanyMarketSnapshot(symbol: string)`

Keep all Alpha Vantage URL building in this file. Normalize the JSON shape into typed objects the UI can consume.

- [ ] **Step 3: Handle Alpha Vantage failure modes**

Detect and normalize:
- rate limit responses (`Note`)
- API errors (`Error Message`, empty responses)
- missing symbols or malformed payloads

Return structured fallback errors instead of letting UI code parse raw API responses.

- [ ] **Step 4: Add compact transformation helpers**

Inside `src/lib/alpha-vantage.ts`, derive:
- latest price
- price change
- percent change
- 12 most recent closing prices
- chart points for the detail page

Keep formatting logic out of the page components.

- [ ] **Step 5: Verify the new client compiles**

Run: `npm run build`
Expected: PASS

### Task 2: Merge live sparkline data into the dashboard cards

**Files:**
- Modify: `src/app/components/workspace/pages/DashboardPage.tsx`
- Modify: `src/app/components/workspace/dashboard-engine.ts` only if a non-breaking adapter export helps keep the page small
- Create: `src/app/components/workspace/dashboard-market.ts` if the market/ESG merge logic starts to crowd `DashboardPage.tsx`

- [ ] **Step 1: Add dashboard market data state**

In `DashboardPage.tsx`, create a focused client-side loading flow that fetches live market snapshots for the currently visible companies only. Keep ESG ranking based on the existing engine; only the sparkline and price-change style should switch to Alpha Vantage-backed market data when available.

- [ ] **Step 2: Preserve ESG fallback behavior**

If live market data is unavailable, keep rendering the existing simulated trend and delta so the dashboard never collapses into empty cards.

- [ ] **Step 3: Update card click behavior**

Wrap each company card in navigation to `/workspace/company/:ticker` and pass enough identity (`ticker` or `company.id`) to resolve the company detail page reliably.

- [ ] **Step 4: Surface live market cues cleanly**

Use the fetched price trend for the bottom sparkline and replace the footer delta with market-price delta when available. Keep ESG score styling separate from market trend styling to avoid mixing the two signals.

- [ ] **Step 5: Verify dashboard build behavior**

Run: `npm run build`
Expected: PASS

### Task 3: Add the company detail route and premium company page

**Files:**
- Modify: `src/app/routes.ts`
- Create: `src/app/components/workspace/pages/CompanyDetailPage.tsx`
- Modify: `src/app/components/workspace/workspace-data.ts`
- Modify: `src/app/components/workspace/WorkspaceHeader.tsx` if company-specific meta needs route-aware handling

- [ ] **Step 1: Add a nested workspace detail route**

In `src/app/routes.ts`, add `workspace/company/:ticker` under the authenticated workspace shell so the page inherits the existing navigation and auth gate.

- [ ] **Step 2: Build the detail page data flow**

In `CompanyDetailPage.tsx`, resolve the requested company from the existing dashboard universe by ticker. Fetch:
- Alpha Vantage overview
- Alpha Vantage daily series

Use React state and `useEffect` for loading and error handling. Do not move this logic into global state.

- [ ] **Step 3: Build the page layout**

Create a two-column layout:
- left panel: company name, ticker, industry, company description, ESG total, E, S, G, and short explanatory copy for each score
- main panel: stock chart, latest price, market change, and compact supporting stats

Use the current premium workspace visual language instead of introducing a new design system.

- [ ] **Step 4: Add resilient loading and failure states**

If Alpha Vantage data fails or is rate-limited, keep the page usable:
- still show company identity from the local ESG universe
- still show ESG breakdown
- show a clear market-data unavailable state for the chart area

- [ ] **Step 5: Verify route integration**

Run: `npm run build`
Expected: PASS

### Task 4: Refine visuals and validate the end-to-end flow

**Files:**
- Modify: `src/app/components/workspace/pages/DashboardPage.tsx`
- Modify: `src/app/components/workspace/pages/CompanyDetailPage.tsx`
- Modify: `src/app/components/workspace/WorkspaceShell.tsx` only if the detail page needs a width adjustment

- [ ] **Step 1: Tune detail-page typography and spacing**

Make sure the new page reads like the rest of the GreenGauge workspace: clear hierarchy, premium spacing, and no cramped chart or ESG explanation blocks.

- [ ] **Step 2: Make dashboard cards feel interactive**

Ensure cards communicate drilldown intent with cursor, hover state, and accessible link semantics without losing the existing glass look.

- [ ] **Step 3: Verify the live flow manually**

Run the app locally and confirm:
- dashboard cards still render
- a card click opens `/workspace/company/:ticker`
- the detail page loads overview + chart when API responses succeed
- fallbacks appear gracefully on API failure

- [ ] **Step 4: Run final verification**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Prepare closeout notes**

Document for the user:
- which file owns the Alpha Vantage client
- how the live sparkline fallback works
- what remains simulated (ESG scoring) versus live (market prices)
