# Sign-in Optical Centering Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Adjust the sign-in page so the full desktop content block sits slightly below true center and the left text column aligns vertically with the right login card.

**Architecture:** Keep the change isolated to the existing login layout in `src/app/components/Login.tsx`. Reuse the established auth-page pattern already present in `src/app/components/Signup.tsx` by changing the login grid wrapper rather than introducing new wrappers or per-column spacing hacks.

**Tech Stack:** React, TypeScript, React Router, Tailwind CSS, Vite

---

### Task 1: Confirm the login layout control points

**Files:**
- Modify: `src/app/components/Login.tsx`
- Reference: `src/app/components/Signup.tsx`
- Reference: `src/app/components/MarketingShell.tsx`

**Step 1: Verify the relevant layout layers**

Confirm that `Login.tsx` contains:
- the outer `<main>` wrapper for page-level vertical placement
- the inner grid wrapper for two-column alignment
- the left marketing text section and right login card section

**Step 2: Verify the existing mismatch**

Confirm that the desktop grid wrapper currently uses `lg:items-start`, which top-aligns the columns and creates the perceived imbalance.

### Task 2: Apply the minimal desktop-only layout adjustment

**Files:**
- Modify: `src/app/components/Login.tsx`

**Step 1: Update column alignment**

Change the login grid wrapper from `lg:items-start` to `lg:items-center` so the left text column and right login card share the same vertical center on desktop widths.

**Step 2: Add a conservative optical offset**

Apply a small desktop-only vertical nudge on that same grid wrapper so the combined login block sits slightly lower than geometric center. Keep the adjustment subtle and localized to the login page.

**Step 3: Preserve smaller breakpoints**

Ensure the adjustment only affects large screens so mobile and tablet stacked layouts keep their current spacing behavior.

### Task 3: Verify the change

**Files:**
- Check: `src/app/components/Login.tsx`

**Step 1: Run diagnostics**

Run language-server diagnostics on `Login.tsx` and confirm there are no new errors.

**Step 2: Run project validation**

Run the relevant project validation command, preferably `npm run build`, and confirm it exits successfully.

**Step 3: Visually inspect the login route**

Open the sign-in page and confirm:
- the overall section sits slightly lower than true center
- the left “Return to the lens...” block is vertically centered against the right login card
- mobile and tablet layouts remain visually stable

### Task 4: Keep the diff surgical

**Files:**
- Modify: `src/app/components/Login.tsx`

**Step 1: Stop after the minimal fix works**

Do not alter `MarketingShell.tsx` unless the login-only grid change fails to achieve the desired balance.

**Step 2: Avoid local margin hacks**

Do not add one-off top or bottom margins to the left text block or the card to fake alignment. Keep the relationship correct at the shared container level.
