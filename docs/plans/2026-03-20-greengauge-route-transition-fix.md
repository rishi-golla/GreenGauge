# GreenGauge Route Transition Flash Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Eliminate the brief blue background flash when navigating between the homepage and login page by moving the shared atmospheric background into a persistent app-level shell.

**Architecture:** The current pages each render their own fullscreen video and overlay stack, which can expose the plain theme background for a frame during route transitions. The fix is to introduce a shared background shell at the app/router level and simplify page components so navigation swaps foreground content without tearing down the entire visual backdrop.

**Tech Stack:** React, React Router, TypeScript, Vite, Tailwind CSS

---

### Task 1: Introduce a persistent shared background shell

**Files:**
- Create or modify: app-level layout component
- Modify: `src/app/routes.ts`
- Modify: `src/app/App.tsx` if needed

**Step 1: Create a shared route/layout wrapper**

Move the cinematic video + overlay treatment into a persistent wrapper rendered around both `/` and `/login`.

**Step 2: Update routes to render pages inside the shared shell**

Use nested routes or a shared layout pattern so the background survives navigation.

### Task 2: Remove duplicated page-level background stacks

**Files:**
- Modify: `src/app/components/Home.tsx`
- Modify: `src/app/components/Login.tsx`

**Step 1: Strip background/video layers that now belong to the shared shell**

Keep each page responsible only for its foreground content and page-specific composition.

**Step 2: Preserve each page’s visual identity within the shared backdrop**

Make sure Home and Login still feel correct after the background responsibility moves upward.

### Task 3: Verify seamless navigation

**Files:**
- Verify: shared layout file
- Verify: `Home.tsx`
- Verify: `Login.tsx`

**Step 1: Run the build**

Use the existing build command.

**Step 2: Manually test navigation between `/` and `/login`**

Confirm there is no visible blue flash and the transition feels continuous.

**Step 3: Leave git actions for explicit user request**

Do not commit or push unless the user explicitly asks.
