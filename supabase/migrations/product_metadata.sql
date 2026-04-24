-- Phase 2F: Add real product metadata fields
-- Run this in your Supabase SQL editor

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS file_size BIGINT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS file_extension TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS average_rating NUMERIC(3,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS sales_count INTEGER DEFAULT 0;

-- Verify columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'products'
  AND column_name IN ('file_size', 'file_extension', 'average_rating', 'review_count', 'sales_count');
