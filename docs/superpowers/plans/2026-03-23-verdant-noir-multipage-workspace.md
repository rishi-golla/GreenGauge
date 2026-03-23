# Verdant Noir Multipage Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the signed-in GreenGauge experience into a routed five-page Verdant Noir workspace prototype with polished static interactions for Dashboard, Assets, Risk, AI Chat, and Settings.

**Architecture:** Split the authenticated area into a reusable workspace shell plus nested page routes. Introduce a shared mock-data module and reusable workspace UI primitives so the visual identity remains consistent while each page has distinct content and interactions. Preserve existing Supabase auth guarding and login/signup flows.

**Tech Stack:** React 18, React Router 7, TypeScript, Tailwind CSS 4, shared CSS theme utilities, lucide-react icons, Vite build verification

---

### Task 1: Introduce workspace routes and shared mock data

**Files:**
- Create: `src/app/components/workspace/workspace-data.ts`
- Modify: `src/app/routes.ts`
- Modify: `src/lib/auth-routing.js` (only if needed for canonical `/workspace` redirect behavior)
- Test: `src/lib/auth-routing.node-test.mjs` (only if auth redirect behavior changes)
- Test: `npm run build`

- [ ] **Step 1: Create the shared workspace mock-data module**

Add `src/app/components/workspace/workspace-data.ts` with:
- sidebar navigation metadata for `dashboard`, `assets`, `risk`, `chat`, and `settings`
- dashboard summary metrics and watchlist data
- assets list with sector, region, portfolio weight, carbon intensity, and status
- risk scenario data and vulnerability lists
- chat prompt/response variants
- settings section metadata

- [ ] **Step 2: Update the authenticated route tree for nested workspace pages**

Modify `src/app/routes.ts` so:
- `/workspace` remains auth-guarded
- `/workspace` redirects to `/workspace/dashboard`
- nested child routes exist for `dashboard`, `assets`, `risk`, `chat`, and `settings`
- login/signup route behavior remains unchanged

- [ ] **Step 3: Make the route build cleanly with the new nested structure**

Ensure route definitions import the page components by their final intended paths, even if stubbed initially.

- [ ] **Step 4: Run the build to verify the route tree compiles**

Run: `npm run build`
Expected: Vite build succeeds with the new workspace route definitions.

### Task 2: Build the shared Verdant Noir workspace shell

**Files:**
- Create: `src/app/components/workspace/WorkspaceShell.tsx`
- Create: `src/app/components/workspace/WorkspaceSidebar.tsx`
- Create: `src/app/components/workspace/WorkspaceHeader.tsx`
- Modify: `src/app/components/AuthenticatedHome.tsx`
- Modify: `src/app/components/MarketingShell.tsx`
- Modify: `src/styles/theme.css`
- Test: `npm run build`

- [ ] **Step 1: Create the reusable workspace shell component**

Implement `WorkspaceShell.tsx` to provide:
- full-height Verdant Noir surface
- responsive sidebar and content layout
- shared top search/header rail
- scrollable content region
- route slot via `Outlet` or `children`

- [ ] **Step 2: Extract the navigation and analyst/session chrome into a sidebar component**

Implement `WorkspaceSidebar.tsx` using the shared navigation metadata, active route highlighting, analyst card, and the existing sign-out behavior.

- [ ] **Step 3: Extract the top content rail into a header component**

Implement `WorkspaceHeader.tsx` with:
- search field
- route-aware page eyebrow/title support
- optional page-level action slot if needed

- [ ] **Step 4: Convert `AuthenticatedHome.tsx` into the auth-aware shell entry point**

Refactor `AuthenticatedHome.tsx` so it no longer hardcodes AI Chat content. It should preserve sign-out behavior and render the shell for nested workspace pages.

- [ ] **Step 5: Extend theme utilities only where the shell needs shared support**

Add any missing reusable classes to `src/styles/theme.css` for:
- section wrappers
- shell spacing helpers
- stronger shell panel variants
- active state accents shared across pages

- [ ] **Step 6: Run the build to verify the shell compiles**

Run: `npm run build`
Expected: Vite build succeeds with the new shell components wired in.

- [ ] **Step 7: Update `MarketingShell.tsx` for nested workspace routes**

Broaden the workspace route detection so `/workspace/dashboard`, `/workspace/assets`, `/workspace/risk`, `/workspace/chat`, and `/workspace/settings` all receive the workspace-specific background treatment.

### Task 3: Add reusable workspace UI building blocks

**Files:**
- Create: `src/app/components/workspace/WorkspaceCard.tsx`
- Create: `src/app/components/workspace/WorkspaceMetricCard.tsx`
- Create: `src/app/components/workspace/WorkspaceSectionHeading.tsx`
- Create: `src/app/components/workspace/WorkspaceChip.tsx`
- Test: `npm run build`

- [ ] **Step 1: Create a shared card wrapper for Verdant Noir panels**

Implement `WorkspaceCard.tsx` with className overrides so every page can render glass panels without repeating layout boilerplate.

- [ ] **Step 2: Create a reusable metric card primitive**

Implement `WorkspaceMetricCard.tsx` to handle:
- eyebrow labels
- large values
- delta/annotation text
- optional accent state

- [ ] **Step 3: Create section heading and chip primitives**

Implement:
- `WorkspaceSectionHeading.tsx` for eyebrow + title patterns
- `WorkspaceChip.tsx` for filters, toggles, and scenario pills

- [ ] **Step 4: Run the build to verify the primitives compile**

Run: `npm run build`
Expected: Vite build succeeds with the shared workspace primitives.

### Task 4: Implement the Dashboard and Assets pages

**Files:**
- Create: `src/app/components/workspace/pages/DashboardPage.tsx`
- Create: `src/app/components/workspace/pages/AssetsPage.tsx`
- Modify: `src/app/components/workspace/workspace-data.ts`
- Test: `npm run build`

- [ ] **Step 1: Build the Dashboard page using shared primitives**

Implement `DashboardPage.tsx` with:
- executive summary header
- metric strip
- trend/period toggle area
- watchlist or top movers section
- “attention now” insight block

- [ ] **Step 2: Add local interaction state to Dashboard**

Use local component state for period toggles or summary switches so the page responds like a product prototype.

- [ ] **Step 3: Build the Assets page using the shared mock holdings model**

Implement `AssetsPage.tsx` with:
- search bar or filter chip cluster
- holdings table/list
- selected asset detail panel or featured detail card
- allocation summary support cards

- [ ] **Step 4: Add local search/filter/selection interactions to Assets**

Use local state to:
- filter visible rows
- switch highlighted asset details
- make the page feel interactive without backend persistence

- [ ] **Step 5: Run the build to verify Dashboard and Assets compile**

Run: `npm run build`
Expected: Vite build succeeds with both pages added.

### Task 5: Implement the Risk and AI Chat pages

**Files:**
- Create: `src/app/components/workspace/pages/RiskPage.tsx`
- Create: `src/app/components/workspace/pages/AIChatPage.tsx`
- Modify: `src/app/components/workspace/workspace-data.ts`
- Test: `npm run build`

- [ ] **Step 1: Build the Risk page**

Implement `RiskPage.tsx` with:
- scenario header
- scenario selection chips
- comparison metric cards
- vulnerability breakdown
- ranked risk-driver list

- [ ] **Step 2: Add local scenario-switching behavior to Risk**

Use local state so selecting scenarios changes visible numbers, labels, and explanatory copy.

- [ ] **Step 3: Move the current cinematic chat design into a dedicated AI Chat page**

Implement `AIChatPage.tsx` by adapting the existing Verdant Noir signed-in composition into a route-specific page within the shared shell.

- [ ] **Step 4: Add local prompt-switching behavior to AI Chat**

Use local state for:
- prompt presets
- response swaps
- metric card changes tied to the selected prompt variant

- [ ] **Step 5: Run the build to verify Risk and AI Chat compile**

Run: `npm run build`
Expected: Vite build succeeds with both pages added.

### Task 6: Implement the Settings page and responsive polish

**Files:**
- Create: `src/app/components/workspace/pages/SettingsPage.tsx`
- Modify: `src/app/components/workspace/WorkspaceShell.tsx`
- Modify: `src/app/components/workspace/WorkspaceSidebar.tsx`
- Modify: `src/styles/theme.css`
- Test: `npm run build`

- [ ] **Step 1: Build the Settings page**

Implement `SettingsPage.tsx` with grouped settings panels for:
- briefing preferences
- alert thresholds
- scenario defaults
- display/layout behavior

- [ ] **Step 2: Add local toggle and selection state to Settings**

Use local component state so the controls react meaningfully in the prototype.

- [ ] **Step 3: Refine responsive shell behavior**

Update shell/sidebar/theme behavior so:
- the sidebar collapses gracefully on smaller screens
- page content stacks well on tablet/mobile
- inputs and controls remain accessible

- [ ] **Step 4: Run the build to verify the full workspace compiles**

Run: `npm run build`
Expected: Vite build succeeds with all five pages and responsive shell updates.

### Task 7: Verify the complete signed-in experience

**Files:**
- Verify: `src/app/routes.ts`
- Verify: `src/app/components/workspace/`
- Verify: `src/app/components/Login.tsx`
- Verify: `src/app/components/Home.tsx`
- Test: `npm run build`

- [ ] **Step 1: Verify route and interaction coverage manually**

Confirm:
- landing page still links into login
- login page still renders directly
- authenticated workspace routes resolve for all five pages
- `/workspace` redirects to `/workspace/dashboard`
- unauthenticated access to `/workspace/dashboard` redirects to login with a preserved `redirectTo` value

- [ ] **Step 2: Verify design cohesion across pages**

Check that:
- sidebar active state follows the route
- shell visuals remain consistent
- each page still has a distinct personality
- no page feels like a broken placeholder
- mobile/tablet layouts keep navigation, cards, and page-level controls reachable

- [ ] **Step 3: Run the final build verification**

Run: `npm run build`
Expected: Vite build succeeds with the full multipage workspace implementation.
