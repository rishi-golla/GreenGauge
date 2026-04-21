# GreenGauge Hero Simplification Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Simplify the existing GreenGauge hero by removing the top pill, removing the secondary CTA and bottom audience sentence, and updating the headline to the user's requested single-line text.

**Architecture:** Keep the existing hero structure, video background, and navigation. Make only the requested content and layout simplifications in `Home.tsx`, then verify the result still builds and reads clearly.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS

---

### Task 1: Simplify the homepage hero content

**Files:**
- Modify: `src/app/components/Home.tsx`

**Step 1: Remove the hero pill**

Delete the `Climate portfolio x-ray` pill above the headline.

**Step 2: Update the hero headline**

Set the headline to a single straight line: `See the climate story hidden inside your portfolio`.

**Step 3: Remove the secondary CTA and bottom sentence**

Keep only the primary platform CTA and remove the extra bottom audience line.

### Task 2: Verify the simplified hero

**Files:**
- Verify: `src/app/components/Home.tsx`

**Step 1: Build the app**

Run the existing build command.

**Step 2: Review the hero visually**

Confirm the page is visibly simpler and still balanced over the foggy forest video.

**Step 3: Leave git actions for explicit user request**

Do not commit or push unless the user explicitly asks.
