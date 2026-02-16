ALTER TABLE public.contact_messages
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'recent'
CHECK (status IN ('recent', 'viewed', 'reached'));

CREATE INDEX IF NOT EXISTS contact_messages_status_created_at_idx
ON public.contact_messages (status, created_at DESC);

GRANT UPDATE ON TABLE public.contact_messages TO authenticated;

DROP POLICY IF EXISTS "Admins can update contact messages" ON public.contact_messages;
CREATE POLICY "Admins can update contact messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
