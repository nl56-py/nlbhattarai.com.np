# Lovable to Vercel + Supabase Org Cutover Playbook

This repository is now configured for a non-Lovable deployment pipeline.

## Phase A: Pre-cutover checklist

1. Announce maintenance window.
2. Set `VITE_ADMIN_WRITES_LOCKED=true` in the active deployment.
3. Verify admin panel shows maintenance banner and write actions are disabled.
4. Take Supabase backup/snapshot from dashboard.
5. Confirm current env vars:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

## Phase B: Supabase organization transfer

1. Transfer project in Supabase dashboard:
   - `Settings -> General -> Transfer project`
2. Confirm transfer completed.
3. Run `docs/sql/verify_project_state.sql` in SQL editor.
4. Confirm required objects exist:
   - tables: `blogs`, `case_studies`, `contact_messages`, `user_roles`
   - function: `public.has_role`
   - storage bucket: `blog-images`
   - RLS policies still attached

## Phase C: Vercel deployment

1. Import repository in Vercel.
2. Build command: `npm run build`
3. Output: `dist`
4. Set env vars for Production and Preview.
5. Deploy and capture production `*.vercel.app` URL.

## Phase D: Auth URL configuration

In Supabase Auth settings:

1. Site URL: `https://<your-project>.vercel.app`
2. Redirect URLs:
   - `https://<your-project>.vercel.app/admin`
   - `http://localhost:8080/admin`

## Phase E: Bootstrap admins

1. Each admin signs up/logs in once.
2. Run `docs/sql/bootstrap_admins.sql` with real emails.
3. Validate admin access at `/admin`.

## Phase F: Smoke tests

1. Public pages load and fetch data.
2. Admin login works.
3. Blog CRUD + publish toggle works.
4. Case-study CRUD + publish/feature toggles work.
5. Image upload works in `blog-images` bucket.
6. Contact form insert works.
7. Contact status updates work.

## Phase G: Cutover complete

1. Set `VITE_ADMIN_WRITES_LOCKED=false`.
2. Redeploy.
3. Monitor Supabase logs for 24 hours (Auth, PostgREST, Storage, RLS denies).

## Rollback

1. Revert traffic to previous deployment.
2. Keep writes frozen while diagnosing.
3. Fix config/env mismatch.
4. Redeploy and re-run smoke tests.
