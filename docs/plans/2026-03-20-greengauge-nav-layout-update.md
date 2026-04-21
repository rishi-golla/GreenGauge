# GreenGauge Navigation Layout Update Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the current homepage navigation to match the provided left/center/right layout and styling without changing the rest of the hero.

**Architecture:** Keep the existing header placement and hero beneath it. Rework only the `nav` structure in `Home.tsx` so the main container is plain, the logo sits left, links are centered with absolute positioning, and the CTA is a simple outlined pill on the right.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS

---

### Task 1: Replace the current glass nav shell with the requested layout

**Files:**
- Modify: `src/app/components/Home.tsx`

**Step 1: Remove the glass-shell styling from the main nav container**

Use a plain container with the requested `relative z-50 w-full flex items-center justify-between px-12 py-10` structure.

**Step 2: Update left, center, and right nav zones**

Apply the requested logo styling, centered absolute nav links, and right-side CTA button styling.

**Step 3: Preserve the rest of the homepage**

Do not change the hero content, spacing, or video treatment.

### Task 2: Verify the updated nav

**Files:**
- Verify: `src/app/components/Home.tsx`

**Step 1: Run the build**

Use the existing build command.

**Step 2: Check the header in-browser**

Confirm the left/center/right alignment works and that the nav reads cleanly over the video.

**Step 3: Leave git actions for explicit user request**

Do not commit or push unless the user explicitly asks.
