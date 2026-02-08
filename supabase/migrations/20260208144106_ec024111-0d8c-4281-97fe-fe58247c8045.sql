-- Create case_studies table
CREATE TABLE public.case_studies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client_name TEXT NOT NULL,
    client_title TEXT,
    description TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    cover_image_url TEXT,
    tags TEXT[] DEFAULT '{}',
    metrics JSONB DEFAULT '{"items": []}',
    featured BOOLEAN NOT NULL DEFAULT false,
    published BOOLEAN NOT NULL DEFAULT false,
    author_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- RLS Policies for case_studies
CREATE POLICY "Admins can view all case studies"
ON public.case_studies
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view published case studies"
ON public.case_studies
FOR SELECT
TO anon, authenticated
USING (published = true);

CREATE POLICY "Admins can insert case studies"
ON public.case_studies
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update case studies"
ON public.case_studies
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete case studies"
ON public.case_studies
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_case_studies_updated_at
BEFORE UPDATE ON public.case_studies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed Dr. Parash case study
INSERT INTO public.case_studies (
    title,
    slug,
    client_name,
    client_title,
    description,
    content,
    category,
    metrics,
    featured,
    published
) VALUES (
    'From Zero Digital Presence to Top Google Rankings',
    'dr-parash-mani-shrestha',
    'Dr. Parash Mani Shrestha',
    'Senior Urologist, Nepal',
    'A comprehensive case study documenting how a senior medical professional with over 30 years of clinical experience went from having no digital presence to ranking #1 on Google for competitive healthcare keywords in Nepal.',
    '<p>This project demonstrates the power of patient, education-first SEO in healthcare.</p>',
    'Healthcare',
    '{"items": [{"label": "Google Ranking", "value": "#1"}, {"label": "Years Experience", "value": "30+"}, {"label": "Digital Presence", "value": "0→1"}]}',
    true,
    true
);