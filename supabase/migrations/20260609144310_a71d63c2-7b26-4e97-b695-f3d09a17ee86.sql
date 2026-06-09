
CREATE TABLE public.wall_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mask TEXT NOT NULL,
  category TEXT NOT NULL,
  mood TEXT NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.wall_messages TO anon;
GRANT SELECT, INSERT ON public.wall_messages TO authenticated;
GRANT ALL ON public.wall_messages TO service_role;

ALTER TABLE public.wall_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read wall messages"
  ON public.wall_messages FOR SELECT
  USING (true);

CREATE POLICY "Anyone can post a wall message"
  ON public.wall_messages FOR INSERT
  WITH CHECK (true);

CREATE INDEX wall_messages_created_at_idx ON public.wall_messages (created_at DESC);
