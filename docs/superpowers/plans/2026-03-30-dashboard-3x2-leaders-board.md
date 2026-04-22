# Dashboard 3x2 Leaders Board Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the dashboard into a single premium 3-column by 2-row leaders board showing the top 6 ESG companies in wide glass cards.

**Architecture:** Reuse the existing ESG engine and global company universe, but simplify the page renderer to one hero board sourced from the top six total ESG scores. Keep the dashboard-only shell atmosphere already in place, and concentrate the visual work inside `DashboardPage.tsx` so the redesign is isolated and reversible.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS 4, shared dashboard engine data, build verification with `npm run build`

---

### Task 1: Define the leaders-board data slice

**Files:**
- Modify: `src/app/components/workspace/dashboard-engine.ts`
- Test: `npm run build`

- [ ] **Step 1: Export a top-six total ESG slice**

Add an export that returns the six highest `totalScore` companies from the scoring engine using the existing stable sorter.

- [ ] **Step 2: Keep the sorted order aligned with the requested leaders**

Verify the exported slice resolves to the current expected leadership order:
- Microsoft
- SAP
- Mastercard
- Salesforce
- Visa
- Unilever

- [ ] **Step 3: Run build verification**

Run: `npm run build`

Expected: PASS.

### Task 2: Rebuild the dashboard page as a single 3x2 board

**Files:**
- Modify: `src/app/components/workspace/pages/DashboardPage.tsx`
- Test: `npm run build`

- [ ] **Step 1: Remove the multi-section renderer**

Replace the stacked ESG sections with one board-level heading and one strict `3 x 2` desktop grid.

- [ ] **Step 2: Make cards landscape-oriented**

Set up wide horizontal cards with a side-by-side internal layout:
- left: large logo well
- center: company name, ticker, industry
- right: ESG label, score ring, large score

- [ ] **Step 3: Increase top breathing room**

Use at least `32px` top padding so the logo, company block, and score block sit comfortably below the top border and align on the same top line.

- [ ] **Step 4: Keep the sparkline as the bottom information band**

Render the 12-month sparkline and signed `pts` delta in a dedicated lower strip with a soft divider so the header row stays uncluttered.

- [ ] **Step 5: Preserve the premium glass styling**

Keep the liquid-glass slab treatment, but emphasize the top and left highlight feel with subtle inner glow and specular edge cues.

- [ ] **Step 6: Run build verification**

Run: `npm run build`

Expected: PASS.

### Task 3: Final verification and sync

**Files:**
- Modify: `docs/superpowers/plans/2026-03-30-dashboard-3x2-leaders-board.md`
- Test: `npm run build`

- [ ] **Step 1: Verify requirement coverage**

Confirm:
- strict `3 x 2` grid on desktop
- landscape cards
- 32px-ish top padding
- aligned logo, name block, and score block
- the six requested leaders
- trend sparkline at the bottom
- deep charcoal dashboard atmosphere remains intact

- [ ] **Step 2: Run final build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 3: Mark the plan as executed**

Update this plan checklist before handoff.
