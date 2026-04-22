# Dashboard Terminal Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the ESG dashboard to feel like a premium financial terminal with real companies, authentic-looking logos, denser score visuals, and a cleaner high-end fintech layout.

**Architecture:** Replace the current fictional dashboard holding dataset with real-company records that include ticker symbols, logo image sources, and compact 12-month trend data. Then rebuild the dashboard section cards around a structured 4x2 grid with stronger glass styling, logo images, ticker metadata, and a compact ring/sparkline visualization while keeping the rest of the workspace intact.

**Tech Stack:** React 18, TypeScript, Tailwind utility classes, existing workspace shell components, runtime-hosted logo images

---

### Task 1: Prepare isolated workspace and verify baseline

**Files:**
- Modify: none
- Test: `npm run build`

- [ ] **Step 1: Create a git worktree for the redesign**

Run:

```bash
git worktree add .worktrees/dashboard-terminal-redesign -b dashboard-terminal-redesign
```

Expected: new worktree created successfully

- [ ] **Step 2: Install dependencies if needed and verify baseline**

Run:

```bash
npm run build
```

Expected: PASS

### Task 2: Replace dashboard data with real-company records

**Files:**
- Modify: `src/app/components/workspace/workspace-data.ts`
- Test: `npm run build`

- [ ] **Step 1: Add a richer dashboard company type**

Extend or replace the current dashboard holding type so each record includes:
- company name
- ticker
- sector/industry label
- logo image URL
- E, S, G scores
- compact 12-month trend series for visualization

- [ ] **Step 2: Replace placeholder holdings with real companies**

Use these companies:
- NVIDIA
- Microsoft
- Apple
- Tesla
- Amazon
- Alphabet
- Meta
- Netflix

Assign believable E/S/G values and short trend arrays for each.

- [ ] **Step 3: Run build verification**

Run: `npm run build`
Expected: PASS

### Task 3: Redesign the dashboard cards and section layout

**Files:**
- Modify: `src/app/components/workspace/pages/DashboardPage.tsx`
- Test: `npm run build`

- [ ] **Step 1: Rework section rendering into a stricter terminal layout**

Keep the four ESG sections, but make each section render:
- section label/title only
- a strict 4-column x 2-row card grid on large screens
- a full-width glass `See more` bar under the 8 cards

- [ ] **Step 2: Replace placeholder logo blocks with real image logos**

Render each company logo as an image with graceful fallback styling if the remote asset fails.

- [ ] **Step 3: Add denser terminal-like card content**

Each card should show only:
- logo
- bold company name
- ticker
- industry/sector
- large ESG/E/S/G score
- compact trend visualization (sparkline or circular progress ring)

- [ ] **Step 4: Tighten styling toward premium terminal aesthetics**

Use:
- restrained glass slab styling
- thicker blur
- subtle inner highlight
- calmer but more premium spacing
- cleaner Inter/SF-like dashboard typography

- [ ] **Step 5: Run build verification**

Run: `npm run build`
Expected: PASS

### Task 4: Refine dashboard-only shell atmosphere

**Files:**
- Modify: `src/app/components/workspace/WorkspaceShell.tsx`
- Modify: `src/app/components/workspace/WorkspaceHeader.tsx`
- Test: `npm run build`

- [ ] **Step 1: Tune the dashboard-only background**

Adjust the dashboard route background so it feels like a high-end terminal:
- deep charcoal/navy base
- subtle teal/blue/violet glows
- faint premium noise
- reduced visual clutter

- [ ] **Step 2: Keep dashboard header behavior intentional**

Preserve the dashboard’s reduced header text treatment if it still fits the layout; otherwise refine it to support the new terminal feel without reintroducing noisy copy.

- [ ] **Step 3: Run final verification**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/app/components/workspace/workspace-data.ts src/app/components/workspace/pages/DashboardPage.tsx src/app/components/workspace/WorkspaceShell.tsx src/app/components/workspace/WorkspaceHeader.tsx docs/superpowers/plans/2026-03-30-dashboard-terminal-redesign.md
git commit -m "feat: redesign dashboard as premium esg terminal"
```
