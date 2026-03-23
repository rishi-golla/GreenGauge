# Login Auth Blob Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refine the login page so the main content sits vertically centered with a slight upward optical bias, the left and right columns align by center, and the shared auth background reads taller and more immersive.

**Architecture:** Keep the change surgical across exactly two existing files. Use `src/app/components/Login.tsx` for composition and alignment changes, and `src/app/components/MarketingShell.tsx` for the shared auth-only background/blob coverage so the visual adjustment remains route-aware without redesigning page structure.

**Tech Stack:** React, TypeScript, React Router, Tailwind CSS, Vite

---

### Task 1: Rebalance the login block position

**Files:**
- Modify: `src/app/components/Login.tsx`

**Step 1: Remove the downward desktop bias**

Replace the current desktop top margin on the grid wrapper with a slight shared upward offset so the full login block remains vertically centered overall but lands a little above geometric center.

**Step 2: Keep the columns moving as one unit**

Apply the optical offset on the grid wrapper itself rather than on the left or right column individually.

### Task 2: Preserve center-to-center column alignment

**Files:**
- Modify: `src/app/components/Login.tsx`

**Step 1: Keep grid-level vertical centering**

Retain or restore `lg:items-center` on the login grid wrapper so the left marketing column and right login card remain vertically centered relative to each other.

**Step 2: Avoid per-column spacing hacks**

Do not add one-off top margins, padding, or transforms to only the left section or only the right card.

### Task 3: Expand shared auth background coverage

**Files:**
- Modify: `src/app/components/MarketingShell.tsx`

**Step 1: Increase auth blob height**

Increase the auth-only top and bottom overlay heights so the dark field occupies more of the viewport and no longer reads like a thin horizontal strip.

**Step 2: Deepen the auth-route gradient reach**

Adjust the auth-route overlay gradient stops so the darker coverage extends farther vertically, approximating the visual effect of `py-24` to `py-32` without breaking the min-height centering model.

### Task 4: Verify layout safety

**Files:**
- Check: `src/app/components/Login.tsx`
- Check: `src/app/components/MarketingShell.tsx`

**Step 1: Run project validation**

Run `npm run build` and confirm the project builds successfully.

**Step 2: Verify the intended visual outcomes**

Confirm the login block sits slightly above exact center, the left and right columns share a visual midline on desktop, and the auth background coverage feels substantially taller.

**Step 3: Check route isolation**

Confirm the backdrop adjustments remain auth-route-specific and do not alter non-auth pages wrapped by `MarketingShell`.
