# GreenGauge One-Line Headline Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Adjust the current GreenGauge hero headline so it stays on one visual line at desktop while preserving the minimalist cinematic hero.

**Architecture:** Keep the current homepage structure intact. Make the smallest necessary change in `Home.tsx`—through wording, size, measure, or wrapping control—then verify the updated title still looks balanced over the video.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS

---

### Task 1: Make the desktop headline stay on one line

**Files:**
- Modify: `src/app/components/Home.tsx`

**Step 1: Adjust headline wording or layout constraints**

Change the text and/or sizing so the hero title stays on one visual line at desktop.

**Step 2: Preserve visual tone**

Keep the serif-led, cinematic feel and do not introduce new hero elements.

### Task 2: Verify the result

**Files:**
- Verify: `src/app/components/Home.tsx`

**Step 1: Run the build**

Use the existing build command.

**Step 2: Check the headline visually**

Confirm that the title remains legible and sits on one line at desktop widths.

**Step 3: Leave git actions for explicit user request**

Do not commit or push unless the user explicitly asks.
