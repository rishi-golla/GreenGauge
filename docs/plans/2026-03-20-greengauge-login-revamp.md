# GreenGauge Login Revamp Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the current login page so it matches the homepage’s cinematic, dark, serif-led GreenGauge aesthetic while remaining a clear, functional sign-in experience.

**Architecture:** Keep the existing `/login` route and form behavior, but replace the current bright card-and-footer design with a dark, atmospheric layout that visually belongs to the homepage. Reuse the established type system, color tokens, and glass treatment where appropriate.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS

---

### Task 1: Replace the current bright login layout with a cinematic auth screen

**Files:**
- Modify: `src/app/components/Login.tsx`

**Step 1: Remove the existing white-page auth styling**

Replace the current white background, border-heavy nav/footer, and default form styling.

**Step 2: Rebuild the login page with the homepage visual language**

Use a dark atmospheric background, refined serif-led heading treatment, subtle glassmorphism, and typography aligned with the GreenGauge homepage.

**Step 3: Keep the login flow functional**

Preserve the email/password state, submit handler, and basic form interaction model.

**Step 4: Drop any elements that break the auth composition**

If the footer or chat widget clashes with the login screen, remove them from the login page rather than forcing them into the design.

### Task 2: Verify the redesigned login page

**Files:**
- Verify: `src/app/components/Login.tsx`

**Step 1: Run the build**

Use the existing build command.

**Step 2: Inspect the login page in-browser**

Confirm the page matches the homepage vibe while still reading clearly as a sign-in screen.

**Step 3: Leave git actions for explicit user request**

Do not commit or push unless the user explicitly asks.
