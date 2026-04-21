# GreenGauge Cinematic Hero Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current homepage with a cinematic single-page GreenGauge hero that uses a fullscreen looping video background, glassmorphic navigation, and refined climate-focused brand messaging.

**Architecture:** Keep the implementation narrow and hero-focused. Rework the existing `Home.tsx` into a single-page landing experience, update the global style and font entry points to support the dark cinematic theme, and preserve the current route structure without introducing extra sections or decorative overlays.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, CSS variables, shadcn-compatible theme tokens

---

### Task 1: Update global visual foundations for the cinematic theme

**Files:**
- Modify: `src/styles/fonts.css`
- Modify: `src/styles/theme.css`
- Modify: `index.html`

**Step 1: Add Google font imports and font variables**

Define the display/body font imports and CSS variables for the new landing page direction.

**Step 2: Replace the default light theme tokens with the requested dark HSL token set**

Keep the variables compatible with the existing Tailwind theme mapping.

**Step 3: Update document title for GreenGauge**

Make sure the browser title no longer references the Figma import scaffold.

**Step 4: Verify there are no contradictory global styles**

Read the updated files and confirm the hero can rely on the new theme values.

### Task 2: Replace the current homepage with a single cinematic hero

**Files:**
- Modify: `src/app/components/Home.tsx`

**Step 1: Remove the current multi-section ESG marketing layout**

Delete the current overview/pillars/footer-heavy structure and replace it with a single fullscreen hero composition.

**Step 2: Add fullscreen looping background video**

Use the provided source URL in a fullscreen `<video>` element with the required autoplay/loop/muted/playsInline behavior.

**Step 3: Implement the glassmorphic navigation and cinematic hero copy**

Adapt the prompt’s visual system to GreenGauge branding, climate portfolio messaging, and the selected foggy-forest aesthetic.

**Step 4: Add the liquid-glass utility class and staged reveal animations inline or in component-local style**

Keep the implementation minimal and self-contained; no unnecessary extra sections or effects.

**Step 5: Keep the existing `ChatWidget` only if it does not visually break the hero**

If it clashes, remove it from the homepage rather than forcing it into the composition.

### Task 3: Verify the landing page works in the current app

**Files:**
- Verify: `src/app/components/Home.tsx`
- Verify: `src/styles/fonts.css`
- Verify: `src/styles/theme.css`
- Verify: `index.html`

**Step 1: Run diagnostics/build**

Use the project’s build command to catch type or Tailwind issues.

**Step 2: Review the final changed files**

Confirm the implementation matches the cinematic prompt while staying true to GreenGauge.

**Step 3: Visually verify the hero in-browser if possible**

Check that the video fills the viewport, typography remains legible, and the glass effect reads cleanly.

**Step 4: Leave git actions for explicit user request**

Do not commit or push unless the user explicitly asks.
