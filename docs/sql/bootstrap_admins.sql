-- Replace placeholder emails before running.
-- Each email must already exist in auth.users (user has signed up at least once).

WITH target_users AS (
  SELECT id
  FROM auth.users
  WHERE email IN (
    'admin1@example.com',
    'admin2@example.com',
    'admin3@example.com'
  )
)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM target_users
ON CONFLICT (user_id, role) DO NOTHING;

-- Verification
SELECT u.email, r.role, r.created_at
FROM public.user_roles r
JOIN auth.users u ON u.id = r.user_id
WHERE r.role = 'admin'
ORDER BY u.email;
