-- CREATE ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id TEXT NOT NULL, -- Clerk User ID
    total_amount INTEGER NOT NULL, -- Total in cents
    status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- CREATE ORDER ITEMS TABLE (Links products to orders)
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) NOT NULL,
    price_at_purchase INTEGER NOT NULL, -- Standard practice to store price at time of sale
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR ORDERS
-- Buyers can see their own orders
CREATE POLICY "Buyers can view own orders" 
ON public.orders FOR SELECT 
USING (auth.uid()::text = buyer_id);

-- POLICIES FOR ORDER ITEMS
-- Buyers can see items from their own orders
CREATE POLICY "Buyers can view own order items" 
ON public.order_items FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_items.order_id 
        AND orders.buyer_id = auth.uid()::text
    )
);

-- Note: We handle INSERTs via service role / server actions for security
