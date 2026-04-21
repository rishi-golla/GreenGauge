# GreenGauge Reference Spacing Tuning Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tune the current GreenGauge hero so its sizing and spacing more closely match the provided reference screenshot, especially headline scale, vertical rhythm, and button proportions.

**Architecture:** Keep the current minimalist hero, video background, and core content. Focus only on proportional adjustments in `Home.tsx` so the composition feels larger, lower, and more spacious like the reference image.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS

---

### Task 1: Match the reference composition more closely

**Files:**
- Modify: `src/app/components/Home.tsx`

**Step 1: Increase headline presence**

Tune size, width, and placement so the title dominates the hero more like the reference.

**Step 2: Adjust vertical rhythm**

Increase breathing room between headline, body copy, and CTA while keeping the block visually lower in the viewport.

**Step 3: Resize and reposition the primary CTA**

Make the button feel more substantial and align its spacing with the reference image.

### Task 2: Verify the tuned hero

**Files:**
- Verify: `src/app/components/Home.tsx`

**Step 1: Run the build**

Use the existing build command.

**Step 2: Inspect the result visually**

Confirm the new hero feels closer to the reference in scale and spacing without losing the GreenGauge aesthetic.

**Step 3: Leave git actions for explicit user request**

Do not commit or push unless the user explicitly asks.
