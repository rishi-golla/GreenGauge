# GreenGauge Hero Spacing Rhythm Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the current GreenGauge hero spacing so it follows the provided prompt’s spacing rhythm while keeping the existing GreenGauge text and design.

**Architecture:** Keep the hero structure, content, and visual language intact. Limit changes to spacing and layout rhythm in `Home.tsx`, then verify the updated proportions in-browser.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS

---

### Task 1: Align the hero spacing to the target prompt rhythm

**Files:**
- Modify: `src/app/components/Home.tsx`

**Step 1: Update hero container spacing**

Adjust the hero block padding to match the prompt’s centered `px-6 pt-32 pb-40 py-[90px]` feel.

**Step 2: Match internal spacing rhythm**

Tune the spacing between headline, paragraph, and CTA to follow the prompt’s `mt-8` and `mt-12` style cadence.

**Step 3: Preserve GreenGauge content**

Do not change text or add/remove hero elements unless required for spacing integrity.

### Task 2: Verify the updated hero

**Files:**
- Verify: `src/app/components/Home.tsx`

**Step 1: Run the build**

Use the existing build command.

**Step 2: Inspect the hero in-browser**

Confirm the updated spacing feels closer to the prompt rhythm while still fitting the current GreenGauge composition.

**Step 3: Leave git actions for explicit user request**

Do not commit or push unless the user explicitly asks.
