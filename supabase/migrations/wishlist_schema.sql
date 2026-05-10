-- Create wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL, -- Matches Clerk user ID
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    -- Ensure a user can only wishlist a product once
    UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own wishlist" 
ON wishlists FOR SELECT 
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can add to their own wishlist" 
ON wishlists FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can remove from their own wishlist" 
ON wishlists FOR DELETE 
USING (auth.uid()::text = user_id);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlists(user_id);
