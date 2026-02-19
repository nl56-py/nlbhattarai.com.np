# Secrets Rotation Note

This project previously tracked `.env`. Even if the repo is private, rotate Supabase keys if the repository ever had broader access.

## Recommended actions

1. In Supabase dashboard, rotate project API keys.
2. Update Vercel env vars:
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_URL` (if project moved)
3. Update local `.env` from new values.
4. Redeploy Vercel.
5. Validate auth + public reads + admin writes.
