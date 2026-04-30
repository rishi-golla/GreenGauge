# Chat Empty-State Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the chat route so prompts live in the empty state, collapse into a compact composer control after the first message, and remove the chat-specific header clutter.

**Architecture:** Keep the redesign isolated to the chat route and the workspace header metadata. Extract pure display-state helpers for test coverage, then refactor the page component to render an animated empty state plus a compact suggestions tray in the composer.

**Tech Stack:** React 18, TypeScript/TSX, Vite, existing workspace UI primitives, `node:test`

---

### Task 1: Add testable chat UI-state helpers

**Files:**
- Create: `src/app/components/workspace/chat-ui-state.js`
- Create: `src/app/components/workspace/chat-ui-state.node-test.mjs`

- [ ] **Step 1: Write the failing test**
- [ ] **Step 2: Run the test and verify it fails**
- [ ] **Step 3: Implement the minimal helper logic**
- [ ] **Step 4: Run the test and verify it passes**

### Task 2: Quiet the chat route chrome

**Files:**
- Modify: `src/app/components/workspace/workspace-data.ts`
- Modify: `src/app/components/workspace/WorkspaceHeader.tsx`
- Modify: `src/styles/fonts.css`

- [ ] **Step 1: Remove chat route header copy from shared metadata**
- [ ] **Step 2: Ensure the workspace header stays quiet on the chat route**
- [ ] **Step 3: Add mono typography support for the chat page**

### Task 3: Refactor the chat page empty state and composer

**Files:**
- Modify: `src/app/components/workspace/pages/AIChatPage.tsx`

- [ ] **Step 1: Move preset prompts into the empty state**
- [ ] **Step 2: Add collapsed `Suggestions` behavior in the composer**
- [ ] **Step 3: Replace instructional copy with placeholder guidance**
- [ ] **Step 4: Remove unnecessary decorative chat copy and tighten spacing**

### Task 4: Verify the implementation

**Files:**
- Test: `src/app/components/workspace/chat-ui-state.node-test.mjs`

- [ ] **Step 1: Run `node --test src/app/components/workspace/chat-ui-state.node-test.mjs`**
- [ ] **Step 2: Run `npm run build`**
- [ ] **Step 3: Review the diff for chat-route-only changes**
