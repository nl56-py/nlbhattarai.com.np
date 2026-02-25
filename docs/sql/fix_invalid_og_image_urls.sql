-- Backfill invalid og_image_url values for blogs and case studies.
-- Invalid values are nulled so rendering can fall back to cover_image_url or default image.

begin;

update public.blogs
set og_image_url = null
where og_image_url is not null
  and (
    btrim(og_image_url) = ''
    or og_image_url !~* '^https?://[^[:space:]]+$'
  );

update public.case_studies
set og_image_url = null
where og_image_url is not null
  and (
    btrim(og_image_url) = ''
    or og_image_url !~* '^https?://[^[:space:]]+$'
  );

commit;
