-- Core tables
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('blogs', 'case_studies', 'contact_messages', 'user_roles')
ORDER BY tablename;

-- Core function
SELECT p.proname AS function_name
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.proname = 'has_role';

-- Required storage bucket
SELECT id, name, public
FROM storage.buckets
WHERE id = 'blog-images';

-- RLS enabled checks
SELECT relname AS table_name, relrowsecurity AS rls_enabled
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND relname IN ('blogs', 'case_studies', 'contact_messages', 'user_roles')
ORDER BY relname;

-- Policy inventory
SELECT schemaname, tablename, policyname, permissive, cmd
FROM pg_policies
WHERE schemaname IN ('public', 'storage')
  AND tablename IN ('blogs', 'case_studies', 'contact_messages', 'user_roles', 'objects')
ORDER BY schemaname, tablename, policyname;
