-- ============================================
-- Karen's 40th Birthday Site — Database Schema
-- ============================================

-- 1. Create the submissions table
CREATE TABLE submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contributor_name TEXT NOT NULL,
  message TEXT,
  media_url TEXT,
  media_type TEXT NOT NULL DEFAULT 'none' CHECK (media_type IN ('photo', 'video', 'none')),
  photo_year INTEGER CHECK (photo_year IS NULL OR (photo_year >= 1950 AND photo_year <= 2026)),
  exif_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to INSERT (contribute)
CREATE POLICY "Anyone can submit" ON submissions
  FOR INSERT WITH CHECK (true);

-- 4. Allow anyone to SELECT (view the gallery)
CREATE POLICY "Anyone can view" ON submissions
  FOR SELECT USING (true);

-- 5. Only authenticated users can DELETE or UPDATE (admin only)
CREATE POLICY "Only admin can update" ON submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only admin can delete" ON submissions
  FOR DELETE USING (auth.role() = 'authenticated');

-- 6. Enable Realtime for the submissions table
ALTER PUBLICATION supabase_realtime ADD TABLE submissions;

-- ============================================
-- Storage Setup (run in Supabase dashboard)
-- ============================================
-- 1. Create a storage bucket called "media"
-- 2. Set it to PUBLIC
-- 3. Set max file size to 50MB
-- 4. Allow uploads from anyone (no auth required)
--
-- Storage policies (create via dashboard or SQL):
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('media', 'media', true, 52428800);

-- Allow public uploads
CREATE POLICY "Anyone can upload media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media');

-- Allow public reads
CREATE POLICY "Anyone can view media" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- ============================================
-- App Settings (for storing OAuth tokens, etc.)
-- ============================================
CREATE TABLE app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Only authenticated admins can modify app settings
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only admin can view settings" ON app_settings
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Only admin can update settings" ON app_settings
  FOR ALL USING (auth.role() = 'authenticated');

