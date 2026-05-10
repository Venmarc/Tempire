import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { Product } from '@/types/product';

export class WishlistService {
  static async toggleWishlist(userId: string, productId: string): Promise<boolean> {
    const supabase = createSupabaseServiceClient();

    // 1. Check if already exists
    const { data: existing } = await supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (existing) {
      // 2. Remove if exists
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('id', existing.id);
      
      if (error) throw error;
      return false; // Not in wishlist anymore
    } else {
      // 3. Add if not exists
      const { error } = await supabase
        .from('wishlists')
        .insert([{ user_id: userId, product_id: productId }]);
      
      if (error) throw error;
      return true; // Now in wishlist
    }
  }

  static async getWishlist(userId: string): Promise<Product[]> {
    const supabase = createSupabaseServiceClient();

    const { data, error } = await supabase
      .from('wishlists')
      .select(`
        created_at,
        product:products (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('WishlistService.getWishlist error:', error);
      return [];
    }

    return data
      .filter((item: any) => item.product !== null)
      .map((item: any) => item.product as Product);
  }

  static async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const supabase = createSupabaseServiceClient();

    const { data, error } = await supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .limit(1);

    if (error) return false;
    return data.length > 0;
  }
}
