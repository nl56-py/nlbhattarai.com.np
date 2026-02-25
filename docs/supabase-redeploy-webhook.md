# Supabase Webhook Setup for Publish-Time Redeploy

This config calls `POST /api/redeploy` when blog rows change.

## Required environment variables (Vercel)

1. `VERCEL_DEPLOY_HOOK_URL`
2. `SEO_REDEPLOY_SECRET`

## Endpoint

- URL: `https://www.nlbhattarai.com.np/api/redeploy`
- Method: `POST`
- Header: `x-redeploy-secret: <SEO_REDEPLOY_SECRET>`

## Suggested Supabase database webhook scope

1. Table: `public.blogs`
2. Events: `INSERT`, `UPDATE`
3. Payload: include `record` and `old_record` so change detection can run.

## Notes

1. The endpoint triggers deploy only when SEO-impacting fields changed.
2. Non-published content changes are ignored unless publish status is involved.
3. You can force trigger manually:
   - `POST /api/redeploy?force=1`
   - Include correct `x-redeploy-secret` header.
