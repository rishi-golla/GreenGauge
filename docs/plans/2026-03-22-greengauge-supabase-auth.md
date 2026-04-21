# GreenGauge Supabase Auth Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Connect the existing login and signup screens to Supabase auth using the project's Vite environment variables and redirect successful auth to the current main app page.

**Architecture:** Add one shared browser Supabase client in `src/lib/supabase.ts`, then wire the existing page-level form handlers to `supabase.auth.signInWithPassword` and `supabase.auth.signUp`. Keep the diff small by using inline component state for error and success messaging, and use `/` as the post-auth destination because the current router does not define `/dashboard`.

**Tech Stack:** React, React Router, Vite, TypeScript, Supabase JS

---

### Task 1: Shared Supabase Client

**Files:**
- Create: `src/lib/supabase.ts`
- Test: `npm run build`

**Step 1: Add a shared client module**

Create a single exported `supabase` client using `createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)`.

**Step 2: Add fail-fast env validation**

Throw a clear error when either env variable is missing so local misconfiguration is obvious.

**Step 3: Verify the client compiles**

Run: `npm run build`
Expected: Build completes without `import.meta.env` or Supabase import errors.

### Task 2: Login Flow

**Files:**
- Modify: `src/app/components/Login.tsx`
- Test: `npm run build`

**Step 1: Keep existing local form state**

Reuse the existing `email` and `password` state and add minimal `error` plus `isSubmitting` state.

**Step 2: Replace console logging with Supabase sign-in**

Update `handleSubmit` to call `supabase.auth.signInWithPassword({ email, password })`.

**Step 3: Add minimal UI feedback**

Render a small inline error block on failure, disable the submit button while the request is in flight, and preserve user input.

**Step 4: Redirect on success**

Use `useNavigate()` to send successful sign-in to `/`.

### Task 3: Signup Flow

**Files:**
- Modify: `src/app/components/Signup.tsx`
- Test: `npm run build`

**Step 1: Keep existing local form state**

Reuse `fullName`, `email`, and `password`, then add minimal `error`, `message`, and `isSubmitting` state.

**Step 2: Replace console logging with Supabase sign-up**

Call `supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })`.

**Step 3: Add minimal UI feedback**

Render a small inline error block on failure.

**Step 4: Handle both signup outcomes**

If Supabase returns a session, navigate to `/`. If it returns no session, keep the user on the page and show a confirmation message because email verification may be enabled.

### Task 4: Verification

**Files:**
- Verify: `src/lib/supabase.ts`
- Verify: `src/app/components/Login.tsx`
- Verify: `src/app/components/Signup.tsx`

**Step 1: Run diagnostics**

Check changed files for static issues.

**Step 2: Run build verification**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Manual behavior check**

Confirm that login redirects to `/` on success, signup shows inline error text on failure, and signup shows a confirmation-style success message when no session is returned.
