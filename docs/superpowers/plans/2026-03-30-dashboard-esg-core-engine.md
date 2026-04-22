# ESG Core Engine Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dynamic ESG dashboard with 50 global blue-chip companies, weighted ESG scoring, per-section sorting, and paginated 4x2 glass cards.

**Architecture:** Keep the feature self-contained in the workspace dashboard by moving the ESG model into typed data helpers inside `workspace-data.ts`, then render section-specific slices in `DashboardPage.tsx` with local pagination state per section. Preserve the existing GreenGauge workspace shell, but add dashboard-only atmosphere, hidden hero copy, and a more terminal-grade glass UI treatment around the new scoring engine.

**Tech Stack:** React 18, TypeScript, React Router 7, Vite, Tailwind CSS 4, shared theme utilities, remote SVG logos via CDN, build verification with `npm run build`

---

### Task 1: Build the ESG Core data engine

**Files:**
- Modify: `src/app/components/workspace/workspace-data.ts`
- Test: `npm run build`
- Test: scripted browser assertions on `/workspace/dashboard`

- [ ] **Step 1: Define the new dashboard data model**

Add a typed model for a 50-company universe and per-company scoring inputs:

```ts
export type DashboardCompany = {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  industry: string;
  logoUrl: string;
  logoFallback: string;
  carbonIntensityBand: 'low' | 'moderate' | 'high' | 'severe';
  renewableTransitionBand: 'leader' | 'advancing' | 'mixed' | 'lagging';
  laborBand: 'strong' | 'stable' | 'mixed' | 'weak';
  privacyBand: 'strong' | 'stable' | 'mixed' | 'weak';
  governanceBand: 'strong' | 'stable' | 'mixed' | 'weak';
  controversy: 'none' | 'minor' | 'moderate' | 'major';
  newsSentiment: 'positive' | 'steady' | 'negative';
};
```

- [ ] **Step 2: Populate 50 unique blue-chip companies**

Create `dashboardBlueChipUniverse` with 50 unique global companies spanning technology, finance, consumer, industrials, energy, healthcare, telecom, and materials. Include examples such as Apple, Microsoft, NVIDIA, Tesla, Amazon, Alphabet, Meta, Netflix, Shell, BP, JPMorgan, Goldman Sachs, TSMC, ASML, Samsung, Nestle, Unilever, Toyota, Siemens, Airbus, Novo Nordisk, Roche, SAP, Visa, Mastercard, and others.

Use official-looking CDN SVG marks such as:

```ts
logoUrl: 'https://cdn.simpleicons.org/apple/ffffff'
```

Also include a short fallback mark for every company so a blocked logo still renders cleanly:

```ts
logoFallback: 'AAPL'
```

- [ ] **Step 3: Implement the ESG Core scoring helpers**

Add pure scoring helpers in `workspace-data.ts`:

```ts
const environmentalScore = (company: DashboardCompany) => { ... };
const socialScore = (company: DashboardCompany) => { ... };
const governanceScore = (company: DashboardCompany) => { ... };
const totalEsgScore = (company: DashboardCompany) =>
  Math.round(environmentalScore(company) * 0.4 + socialScore(company) * 0.3 + governanceScore(company) * 0.3);
```

Map sector posture into the score so lower-carbon software and services trend higher on `E` than oil and gas. Apply controversy and news-sentiment penalties so names like Tesla can show weaker social/trend posture.
Clamp every exported score to `0-100` so ring thresholds and ranking remain valid:

```ts
const clampScore = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
```

- [ ] **Step 4: Generate the 12-month trend series from sentiment**

Add a helper that returns a 12-point sparkline and net point delta:

```ts
const buildTrendSeries = (company: DashboardCompany, score: number) => ({
  values: number[],
  delta: number,
});
```

Use deterministic generation only, based on the company bands and controversy state, so the same company always produces the same 12-month sparkline. Use mild downtrends for controversy-heavy names and steadier/upward series for stronger operators.
Clamp every trend point into the valid score domain so the 12-point series always stays inside `0-100`.

- [ ] **Step 5: Export the computed section-ready dataset**

Export:

```ts
export type DashboardScoredCompany = DashboardCompany & {
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  totalScore: number;
  trend: number[];
  trendDelta: number;
};

export const dashboardScoredCompanies: DashboardScoredCompany[] = ...
```

Also export a stable sorting helper used by every section:

```ts
export const sortCompanies = (
  companies: DashboardScoredCompany[],
  getScore: (company: DashboardScoredCompany) => number,
) =>
  [...companies].sort((left, right) => {
    const scoreDelta = getScore(right) - getScore(left);
    if (scoreDelta !== 0) return scoreDelta;
    return left.name.localeCompare(right.name);
  });
```

- [ ] **Step 6: Run build verification**

Run: `npm run build`

Expected: PASS with no TypeScript or bundling errors.

- [ ] **Step 7: Run scripted data assertions**

Use browser automation or DevTools evaluation against the rendered dashboard to verify:
- the dataset contains exactly 50 unique company ids
- all exported section scores are between `0` and `100`
- every trend array has exactly 12 clamped values
- `totalScore` matches `(E * 0.4) + (S * 0.3) + (G * 0.3)` after rounding

### Task 2: Rebuild the dashboard layout and pagination

**Files:**
- Modify: `src/app/components/workspace/pages/DashboardPage.tsx`
- Test: `npm run build`
- Test: scripted browser assertions on `/workspace/dashboard`

- [ ] **Step 1: Replace the static dashboard with a section-driven renderer**

Define section metadata:

```ts
const scoreSections = [
  { key: 'total', eyebrow: 'TOTAL ESG', scoreLabel: 'ESG', getScore: (c) => c.totalScore },
  { key: 'environmental', eyebrow: 'ENVIRONMENTAL', scoreLabel: 'E', getScore: (c) => c.environmentalScore },
  { key: 'social', eyebrow: 'SOCIAL', scoreLabel: 'S', getScore: (c) => c.socialScore },
  { key: 'governance', eyebrow: 'GOVERNANCE', scoreLabel: 'G', getScore: (c) => c.governanceScore },
];
```

- [ ] **Step 2: Add per-section pagination state**

Track how many rows each section has revealed:

```ts
const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({
  total: 8,
  environmental: 8,
  social: 8,
  governance: 8,
});
```

The `See more` action should increase the clicked section by `8`.

- [ ] **Step 3: Render a strict 4x2 section grid**

For each section:
- sort by the relevant score
- use the shared stable tie-breaker helper
- slice with `visibleCounts[section.key]`
- render cards in `xl:grid-cols-4`
- collapse to `lg:grid-cols-2` and `sm:grid-cols-1` below desktop
- keep cards uniform height

- [ ] **Step 4: Rebuild each card for high-fidelity financial UI**

Each card should show only:
- official logo
- fallback mark when a remote logo fails
- company name
- ticker
- industry/sector line
- large score on the right
- score ring with color logic:
  - `80-100`: green
  - `60-79`: yellow
  - `0-59`: red
- 12-month sparkline and signed `pts` delta

Use `font-sans` everywhere on the dashboard for the terminal feel.
Render logos through `ImageWithFallback` and place them in a bright logo well so both dark and light brand marks stay readable.

- [ ] **Step 5: Make the `See more` bar functional**

Render the button only if more companies remain for that section:

```ts
const hasMore = visibleCount < sortedCompanies.length;
```

The label can remain `See more`, but it must extend the section downward by the next 8 cards when clicked.

- [ ] **Step 6: Run build verification**

Run: `npm run build`

Expected: PASS with no React or TypeScript errors.

- [ ] **Step 7: Run scripted pagination and ordering assertions**

Use browser automation or DevTools evaluation to verify:
- each section initially renders 8 cards
- clicking one section's `See more` reveals 8 more only in that section
- equal-score companies remain in stable name order after expansion
- Tesla and any other controversy-heavy names render negative `pts` values

### Task 3: Refine the dashboard-only shell and theme fit

**Files:**
- Modify: `src/app/components/workspace/WorkspaceShell.tsx`
- Modify: `src/app/components/workspace/WorkspaceHeader.tsx`
- Modify: `src/app/components/workspace/workspace-data.ts`
- Test: `npm run build`

- [ ] **Step 1: Make the dashboard route feel distinct**

Use `useLocation()` in `WorkspaceShell.tsx` and apply a dashboard-only background:
- deep charcoal-to-navy gradient
- teal/green ambient glows
- subtle soft depth behind the card grid

- [ ] **Step 2: Widen the dashboard container**

Increase only the dashboard content width so a 4-column grid breathes properly on desktop.

- [ ] **Step 3: Hide unused dashboard page meta**

Set the dashboard page meta in `workspace-data.ts` to empty strings and make `WorkspaceHeader.tsx` render page hero text only when content exists.

- [ ] **Step 4: Preserve the liquid-glass treatment**

Keep using the shared `liquid-glass` utility and complement it with inline 1px highlight treatments for the new dashboard cards and section action bars.

- [ ] **Step 5: Run build verification**

Run: `npm run build`

Expected: PASS.

### Task 4: Final verification and handoff

**Files:**
- Modify: `docs/superpowers/plans/2026-03-30-dashboard-esg-core-engine.md`
- Test: `npm run build`
- Test: browser validation on `/workspace/dashboard`

- [ ] **Step 1: Review output for requirement coverage**

Confirm the finished dashboard includes:
- 50 unique companies
- weighted total ESG formula
- clamped `0-100` section scores
- per-section sorting
- stable tie-break sorting by company name
- 8-card grid slices
- functional paginated expansion
- real logo URLs
- fallback logo rendering
- sparkline/news-driven trend deltas
- score ring colors by threshold
- dashboard-only atmosphere

- [ ] **Step 2: Run final verification**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 3: Run browser verification**

Check these behaviors on `/workspace/dashboard`:
- exactly 8 cards per section before expansion
- clicking `See more` reveals 8 more only for the clicked section
- ordering stays stable after expansion
- controversy-heavy names like Tesla show negative `pts`
- score rings use green, yellow, and red thresholds correctly
- force one logo image to an invalid URL and confirm the fallback mark renders cleanly
- desktop uses `4x2`, tablet uses `2xN`, and mobile uses `1xN`

- [ ] **Step 4: Mark the plan as executed**

Update the checkbox states in this plan to reflect completion before handoff.
