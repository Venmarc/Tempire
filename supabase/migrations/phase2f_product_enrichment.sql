-- ============================================================
-- PHASE 2F: Product Schema Enrichment
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. ADD REAL METADATA FIELDS TO PRODUCTS TABLE
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS file_size BIGINT,            -- size in bytes, auto-populated on upload
  ADD COLUMN IF NOT EXISTS file_extension TEXT,         -- e.g. 'zip', 'pdf', auto from filename
  ADD COLUMN IF NOT EXISTS average_rating NUMERIC(3,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS review_count INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS sales_count INTEGER NOT NULL DEFAULT 0;

-- 2. CREATE ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id TEXT NOT NULL,          -- Clerk User ID (e.g. user_XXXX)
    total_amount INTEGER NOT NULL,   -- Total in cents
    status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CREATE ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) NOT NULL,
    price_at_purchase INTEGER NOT NULL,   -- price in cents at time of sale
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES FOR ORDERS
-- Buyers can only see their own orders
CREATE POLICY "Buyers can view own orders"
ON public.orders FOR SELECT
USING (auth.uid()::text = buyer_id);

-- Service role (server actions) can insert orders
CREATE POLICY "Service role can insert orders"
ON public.orders FOR INSERT
WITH CHECK (true);

-- 6. RLS POLICIES FOR ORDER ITEMS
-- Buyers can only see items from their own orders
CREATE POLICY "Buyers can view own order items"
ON public.order_items FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.orders
        WHERE orders.id = order_items.order_id
        AND orders.buyer_id = auth.uid()::text
    )
);

-- Service role can insert order items
CREATE POLICY "Service role can insert order items"
ON public.order_items FOR INSERT
WITH CHECK (true);

-- 7. VERIFY EVERYTHING WAS CREATED (run this to confirm)
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'products'
  AND column_name IN ('file_size', 'file_extension', 'average_rating', 'review_count', 'sales_count')
ORDER BY column_name;
