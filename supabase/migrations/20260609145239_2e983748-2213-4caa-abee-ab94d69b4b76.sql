
ALTER TABLE public.wall_messages
  ADD CONSTRAINT wall_messages_content_len CHECK (char_length(content) BETWEEN 1 AND 500),
  ADD CONSTRAINT wall_messages_mask_len CHECK (char_length(mask) <= 50),
  ADD CONSTRAINT wall_messages_category_len CHECK (char_length(category) <= 50),
  ADD CONSTRAINT wall_messages_mood_len CHECK (char_length(mood) <= 10);
