# Verdant Noir Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current signed-in `/workspace` screen with a cinematic climate-analysis chat workspace that closely matches the provided Verdant Noir reference while preserving the existing auth redirect flow.

**Architecture:** Keep the route structure intact and treat the authenticated workspace as the main application shell. Build the new screen by splitting the signed-in UI into focused presentational sections inside `AuthenticatedHome.tsx`, then extend the shared theme utilities with a darker atmospheric surface, denser glass styling, and a reusable dot-grid treatment that supports the screenshot-inspired composition.

**Tech Stack:** React 18, React Router, TypeScript, Tailwind CSS 4, shared CSS theme utilities, lucide-react icons, Vite build verification

---

### Task 1: Establish the Verdant Noir surface system

**Files:**
- Modify: `src/styles/theme.css`
- Modify: `src/styles/fonts.css`
- Test: `npm run build`

- [ ] **Step 1: Add the workspace-specific design tokens**

Add a focused token set for the authenticated workspace to support:
- charcoal base `#0D0F0E`
- misty green radial/linear washes
- mint accent `#00F5D4`
- stronger glass blur and border styling
- a 20px dot-grid background utility

- [ ] **Step 2: Add or tune typography primitives for the workspace**

Keep the existing serif/sans pairing if it fits the reference, but expose explicit CSS variables for:
- insight serif text
- label/metric sans text

- [ ] **Step 3: Verify the style layer compiles**

Run: `npm run build`
Expected: Vite build succeeds with the updated shared theme files.

- [ ] **Step 4: Commit the surface-system checkpoint**

```bash
git add src/styles/theme.css src/styles/fonts.css
git commit -m "feat: add verdant noir workspace theme"
```

### Task 2: Replace the signed-in page with the cinematic workspace layout

**Files:**
- Modify: `src/app/components/AuthenticatedHome.tsx`
- Test: `npm run build`

- [ ] **Step 1: Replace the current dashboard-like content with a workspace shell**

Implement a full-height layout in `AuthenticatedHome.tsx` with:
- a slim left sidebar
- a top glass search bar
- a scrollable main chat canvas
- a bottom anchored glass input composer

- [ ] **Step 2: Rebuild the sidebar to match the reference**

Include:
- GreenGauge wordmark and small product label
- nav items for dashboard/assets/risk/AI chat/settings
- active AI Chat row with a mint indicator bar and subtle teal state
- bottom analyst profile card with avatar and live status
- existing sign-out action preserved in a visually integrated control

- [ ] **Step 3: Rebuild the chat stream as structured sections, not bubbles**

Add static conversation sections that mirror the screenshot:
- `GREENGAUGE INTELLIGENCE` heading with mint status dot
- large serif AI insight block with mint-highlighted key terms
- right-aligned `SENIOR ANALYST` prompt in an italic serif glass panel
- `LIVE ANALYSIS` section with supporting serif insight copy

- [ ] **Step 4: Add the paired metric cards and bottom composer**

Include:
- two side-by-side glass metric cards
- paperclip, microphone, and mint circular send button
- placeholder text aligned to the cinematic instrument-panel look

- [ ] **Step 5: Verify the page compiles**

Run: `npm run build`
Expected: Vite build succeeds with the new authenticated workspace component.

- [ ] **Step 6: Commit the workspace-layout checkpoint**

```bash
git add src/app/components/AuthenticatedHome.tsx
git commit -m "feat: build verdant noir workspace layout"
```

### Task 3: Tune fidelity, responsiveness, and screenshot alignment

**Files:**
- Modify: `src/app/components/AuthenticatedHome.tsx`
- Modify: `src/styles/theme.css`
- Test: `npm run build`
- Test: browser visual check of `/workspace`

- [ ] **Step 1: Refine spacing and depth to better match the provided screenshot**

Tune:
- sidebar width and padding
- search bar proportions
- section spacing in the chat stream
- card radii, borders, and glow
- grid visibility and atmospheric background balance

- [ ] **Step 2: Add responsive behavior for tablet and mobile**

Ensure:
- sidebar collapses gracefully into a top stack or horizontal arrangement
- metric cards wrap cleanly
- bottom composer remains accessible
- long serif insight text keeps readable line lengths

- [ ] **Step 3: Rebuild to confirm the refinements are stable**

Run: `npm run build`
Expected: Vite build succeeds after responsive and visual tuning.

- [ ] **Step 4: Run a browser visual verification**

Start the app, open the signed-in workspace, and confirm the implementation visually tracks the reference for:
- atmospheric dark background with 20px dot grid
- mint-accent active sidebar item
- structured chat layout
- live analysis cards
- cinematic bottom input composer

- [ ] **Step 5: Commit the polish checkpoint**

```bash
git add src/app/components/AuthenticatedHome.tsx src/styles/theme.css
git commit -m "feat: polish verdant noir chat workspace"
```
