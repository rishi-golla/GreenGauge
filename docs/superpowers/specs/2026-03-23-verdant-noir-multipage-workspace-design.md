# Verdant Noir Multipage Workspace Design

**Date:** 2026-03-23

**Goal**

Evolve the authenticated GreenGauge experience from a single cinematic AI workspace into a cohesive five-page signed-in product prototype. The result should preserve the existing Verdant Noir visual identity while adding believable, route-driven experiences for `Dashboard`, `Assets`, `Risk`, `AI Chat`, and `Settings`.

**Scope**

This design targets a high-fidelity prototype, not a persistence-heavy production application. Interactions should feel polished and intentional, but the underlying portfolio data, chat responses, settings state, and scenario controls may remain local/mock as long as they are internally consistent and visually convincing.

## Product Direction

The signed-in experience should feel like a climate-intelligence terminal for portfolio analysts. Every screen should belong to the same world: restrained, cinematic, analytical, and tactile. Rather than treating each route as a blank new page, the workspace should use one shared shell with route-specific content personalities:

- `Dashboard`: portfolio-wide executive overview
- `Assets`: holdings browser with dense, scan-friendly analysis surfaces
- `Risk`: scenario and concentration analysis
- `AI Chat`: conversational analyst interface with highlighted intelligence responses
- `Settings`: calm control room for workspace preferences

This keeps the product coherent while ensuring the pages do not feel like copies of one another.

## Architecture

The authenticated app should be split into a workspace shell and page modules.

### Shared workspace shell

The shell owns:

- left navigation
- route-aware active state
- persistent search/header rail
- atmospheric background and dot grid
- analyst identity / session controls
- responsive layout framing

The shell should render an `Outlet` for the active workspace page so the signed-in app becomes truly route-driven instead of hardcoding one page in `AuthenticatedHome.tsx`.

### Shared workspace data

A dedicated mock-data module should provide:

- shared portfolio summary metrics
- holdings and sector data
- risk scenarios and stress signals
- chat threads / preset prompts
- settings categories and option values

This data layer should be static but structured enough to support multiple pages without duplication or contradictory numbers.

### Shared UI primitives

Reusable workspace components should cover:

- page headers and eyebrow labels
- glass cards / section panels
- metric cards and delta treatments
- pills, chips, and scenario toggles
- table/list rows for assets and risks
- shell navigation items

The goal is to avoid a giant page file and keep each piece understandable in isolation.

## Visual System

The Verdant Noir system already exists and should be extended rather than replaced.

### Global shell language

- Deep charcoal base with mint highlights
- Fine dot-grid canvas across the main content region
- Frosted dark-glass cards with subtle edge glow
- Instrument Serif for insight/editorial copy
- Manrope for labels, controls, metrics, and dense product UI

### Page-specific emphasis

- `Dashboard`: slightly broader spacing and more summary-oriented composition
- `Assets`: denser cards and list/table presentation
- `Risk`: more urgency in accent use and stress visualization
- `AI Chat`: largest editorial typography and most spacious rhythm
- `Settings`: quietest page with cleaner spacing and lower drama

The pages should feel related through the shell, but not interchangeable.

## Route and Interaction Model

The authenticated route set should expand from only `/workspace` to nested workspace routes:

- `/workspace/dashboard`
- `/workspace/assets`
- `/workspace/risk`
- `/workspace/chat`
- `/workspace/settings`

`/workspace` should remain the canonical post-auth destination used by auth redirects and login completion. The route mounted at `/workspace` should then redirect internally to the default nested page, which should be `Dashboard` unless product constraints make `AI Chat` the preferred landing experience. Because the current signed-in screen already strongly establishes the chat surface, a practical compromise is:

- keep `AI Chat` visually richest
- make `/workspace` redirect to `/workspace/dashboard`

This makes the signed-in app feel more product-like while preserving chat as a core surface rather than the only surface.

Navigation interactions should be immediate and route-based. Filters, chips, segmented controls, prompt presets, and settings toggles should update local component state to make the prototype feel alive.

The shared marketing shell must also recognize nested `/workspace/*` routes as workspace surfaces so the signed-in pages keep the darker Verdant Noir treatment instead of falling back to the login/signup presentation layer.

## Page Designs

### Dashboard

Purpose: provide the fastest possible read on portfolio climate posture.

Key sections:

- page header with current portfolio posture summary
- hero metric strip for financed emissions, resilience, transition sensitivity, and concentration
- trend panel with period toggles
- top movers / watchlist section
- compact “attention now” insight rail

Behavior:

- period toggles swap chart or trend copy locally
- cards respond to hover/focus
- watchlist rows visually prioritize the riskiest names

### Assets

Purpose: browse and inspect holdings with believable climate metadata.

Key sections:

- searchable holdings header with filter chips
- dense asset list or table with region, sector, weight, intensity, and status
- selected asset detail panel or featured asset card
- allocation / composition summary cards

Behavior:

- search updates visible results locally
- filter chips and sort toggles change the presented holdings subset
- selecting an asset swaps the detail panel content

### Risk

Purpose: analyze scenario pressure, concentrations, and vulnerabilities.

Key sections:

- scenario header with stress controls
- scenario comparison cards
- sector / geography vulnerability breakdown
- ranked risk drivers list
- callout panel for “what matters now”

Behavior:

- scenario chips update the headline numbers and explanatory text
- ranked lists reorder or swap data based on selected scenario
- emphasis styling should make this page feel analytically sharper than Dashboard

### AI Chat

Purpose: present GreenGauge as a conversational climate analyst.

Key sections:

- intelligence status label
- large editorial AI insight cards with highlighted phrases
- analyst prompt cards
- supporting live analysis section
- bottom composer with prompt presets or quick actions

Behavior:

- preset prompts swap visible response blocks
- prompt chips can reframe the analysis copy and metric cards
- the page should feel cinematic, but still like a product interface rather than a static poster

### Settings

Purpose: make the signed-in app feel complete and configurable.

Key sections:

- workspace profile / briefing preferences
- alert threshold controls
- scenario default selectors
- display / layout preferences
- analyst mode or reporting tone controls

Behavior:

- toggles, radios, and segmented controls update local state
- settings groupings should feel clean and grounded, not ornamental
- a lightweight “saved locally” affordance is acceptable if it remains prototype-only

## Responsive Behavior

Desktop is the primary design target, but the workspace must remain usable on tablet and mobile.

- Sidebar should collapse into a top navigation row or compact menu treatment on smaller screens.
- Dense multi-column sections should stack without losing hierarchy.
- Editorial serif sections must maintain readable line lengths.
- Bottom composers, filters, and segmented controls must remain reachable without overlap.
- Cards should wrap cleanly and preserve contrast.

The responsive goal is “premium and intentional,” not simply “unbroken.”

## Data Strategy

Use a single curated mock portfolio model spanning:

- a small set of named assets
- sectors and geographies
- weighted portfolio metrics
- scenario outcomes
- analyst prompts and AI response variants
- user preference values

Numbers should be credible and cross-page consistent. For example, the portfolio exposure and resilience figures shown in `Dashboard`, `Risk`, and `AI Chat` should belong to the same fictional portfolio rather than being invented independently on each page.

## Error Handling

Because this is prototype-focused, error handling should stay lightweight:

- preserve existing sign-out error handling
- keep auth route guarding intact
- avoid interactions that imply unavailable backend support
- if local state is used for settings, message it as local prototype behavior rather than cloud persistence

## Testing and Verification

Implementation should focus on regression-safe structure rather than broad automated UI coverage, since the repo currently has minimal testing scaffolding.

Required verification:

- route navigation works across all five workspace pages
- `/workspace` redirects to the intended default page while remaining the canonical auth redirect target
- direct login flow remains intact
- unauthenticated access to nested workspace routes redirects to login with a preserved `redirectTo` value
- responsive layout remains usable at mobile and desktop sizes
- `npm run build` passes after implementation

## File Structure Direction

Recommended structure:

- `src/app/components/workspace/WorkspaceShell.tsx`
- `src/app/components/workspace/WorkspaceSidebar.tsx`
- `src/app/components/workspace/WorkspaceHeader.tsx`
- `src/app/components/workspace/WorkspaceCard.tsx`
- `src/app/components/workspace/WorkspaceMetricCard.tsx`
- `src/app/components/workspace/pages/DashboardPage.tsx`
- `src/app/components/workspace/pages/AssetsPage.tsx`
- `src/app/components/workspace/pages/RiskPage.tsx`
- `src/app/components/workspace/pages/AIChatPage.tsx`
- `src/app/components/workspace/pages/SettingsPage.tsx`
- `src/app/components/workspace/workspace-data.ts`
- updates to `src/app/routes.ts`
- targeted theme expansion in `src/styles/theme.css`

This keeps the shell, pages, and data clearly separated and makes future backend integration easier.

## Outcome

The signed-in GreenGauge experience should feel like a credible product prototype, not a single mock screen. After implementation, a user should be able to log in, move through five distinct sections of the workspace, and get the impression of a sophisticated climate-analysis platform with a clear design language, believable data, and coherent user flows.
