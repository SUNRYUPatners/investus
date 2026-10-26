-- Add content_en (bilingual English version) to wall_posts and analyst_posts
-- Used by market-open-posts cron to store AI-generated English translations
-- UI falls back to content when content_en is NULL

ALTER TABLE wall_posts
  ADD COLUMN IF NOT EXISTS content_en text;

ALTER TABLE analyst_posts
  ADD COLUMN IF NOT EXISTS content_en text;
