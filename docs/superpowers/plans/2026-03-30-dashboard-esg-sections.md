# Dashboard ESG Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current dashboard trend/watchlist composition with four score sections for Total ESG, Environmental, Social, and Governance, each showing company cards with logo treatments and the appropriate score for that section.

**Architecture:** Expand the workspace dashboard data model so each holding carries logo metadata plus `environmental`, `social`, `governance`, and derived total ESG scores. Then rebuild the dashboard page around a reusable section renderer that maps the same holdings into four section-specific grids while preserving the existing Verdant Noir workspace styling.

**Tech Stack:** React 18, TypeScript, React Router 7, Tailwind utility classes, existing workspace UI primitives

---

### Task 1: Add dashboard ESG holding data

**Files:**
- Modify: `src/app/components/workspace/workspace-data.ts`
- Test: `npm run build`

- [ ] **Step 1: Add a typed dashboard holding model**

Create a focused type for dashboard company cards that includes:
- `id`
- `name`
- `logoText`
- `logoAccent`
- `sector`
- `environmentalScore`
- `socialScore`
- `governanceScore`

Also export a helper or field for the aggregate ESG score derived from the three dimensions.

- [ ] **Step 2: Seed believable holding data**

Add 6-8 fictional portfolio companies with distinct names, logo initials/text, and per-dimension scores so each section can render the same companies with different score values.

- [ ] **Step 3: Run the build to verify the data file still compiles**

Run: `npm run build`
Expected: PASS

### Task 2: Rebuild the dashboard page around ESG sections

**Files:**
- Modify: `src/app/components/workspace/pages/DashboardPage.tsx`
- Reference: `src/app/components/workspace/WorkspaceCard.tsx`
- Reference: `src/app/components/workspace/WorkspaceSectionHeading.tsx`
- Test: `npm run build`

- [ ] **Step 1: Remove the current trend and watchlist layout**

Delete the current metric strip, trend window, attention rail, and watchlist rendering from `DashboardPage.tsx`.

- [ ] **Step 2: Add section configuration for ESG, E, S, and G**

Create local section metadata describing:
- section key
- eyebrow/title/description
- score accessor for total ESG, environmental, social, or governance

- [ ] **Step 3: Build a reusable company score card renderer**

Inside `DashboardPage.tsx`, add a compact card layout that shows:
- logo block
- company name
- sector text
- the section-specific score label/value

Keep the styling aligned with the Verdant Noir workspace cards and make the logo treatment feel like a believable portfolio tile rather than a generic badge.

- [ ] **Step 4: Render four stacked dashboard sections**

Map the section configuration into four rendered blocks:
- Total ESG
- Environmental
- Social
- Governance

Each block should show the same companies, but each card must display only the score relevant to that section.

- [ ] **Step 5: Run the build to verify the new dashboard compiles**

Run: `npm run build`
Expected: PASS

### Task 3: Polish layout and copy for the new dashboard structure

**Files:**
- Modify: `src/app/components/workspace/pages/DashboardPage.tsx`
- Modify: `src/app/components/workspace/workspace-data.ts`
- Test: `npm run build`

- [ ] **Step 1: Tighten the section copy and hierarchy**

Ensure the dashboard intro explains that the page is now organized by total ESG, E, S, and G scoring views instead of trend/watchlist analysis.

- [ ] **Step 2: Tune grid density for dashboard readability**

Adjust the company-card grid so it feels intentional on desktop and remains readable on narrower widths.

- [ ] **Step 3: Run final verification**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/app/components/workspace/workspace-data.ts src/app/components/workspace/pages/DashboardPage.tsx docs/superpowers/plans/2026-03-30-dashboard-esg-sections.md
git commit -m "feat: redesign dashboard around esg sections"
```
