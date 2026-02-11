
-- Fix blogs RLS: drop restrictive public SELECT and recreate as permissive
DROP POLICY IF EXISTS "Anyone can view published blogs" ON public.blogs;
CREATE POLICY "Anyone can view published blogs"
  ON public.blogs
  FOR SELECT
  USING (published = true);

-- Fix case_studies RLS: drop restrictive public SELECT and recreate as permissive
DROP POLICY IF EXISTS "Anyone can view published case studies" ON public.case_studies;
CREATE POLICY "Anyone can view published case studies"
  ON public.case_studies
  FOR SELECT
  USING (published = true);
