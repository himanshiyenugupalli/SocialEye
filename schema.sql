-- Run this in your Supabase SQL Editor

-- 1. Create the reports table
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  image_url TEXT,
  severity TEXT DEFAULT 'PENDING',
  ai_notes TEXT,
  status TEXT DEFAULT 'REPORTED',
  user_id UUID REFERENCES auth.users(id)
);

-- 2. Setup Row Level Security (RLS) for reports
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reports (or restrict to authenticated if you prefer)
CREATE POLICY "Reports are viewable by everyone" 
ON reports FOR SELECT USING (true);

-- Allow authenticated users to insert their own reports
CREATE POLICY "Users can insert their own reports" 
ON reports FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. Create the Storage Bucket for report images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('reports', 'reports', true);

-- 4. Setup Storage Policies for the 'reports' bucket
CREATE POLICY "Report images are publicly accessible."
ON storage.objects FOR SELECT
USING (bucket_id = 'reports');

CREATE POLICY "Authenticated users can upload report images."
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'reports' AND
  auth.role() = 'authenticated'
);
