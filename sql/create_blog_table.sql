-- Create blog table
CREATE TABLE public.blog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[],
  read_time INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Insert sample blog post data
INSERT INTO public.blog (title, description, content, image_url, tags, read_time) 
VALUES 
(
  'Getting Started with Next.js and Supabase', 
  'Learn how to build a modern web application with Next.js and Supabase.', 
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'https://placehold.co/600x400',
  ARRAY['Next.js', 'Supabase', 'Web Development'],
  5
);

-- Add RLS policies
ALTER TABLE public.blog ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read blog posts
CREATE POLICY "Allow public read access" ON public.blog
  FOR SELECT USING (true); 