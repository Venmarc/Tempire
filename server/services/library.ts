import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { Product } from '@/types/product';

export class LibraryService {
  static async getPurchasedProducts(userId: string): Promise<Product[]> {
    const supabase = createSupabaseServiceClient();

    // Query order_items joined with orders (to filter by buyer_id) and products
    // We select product details through the product_id foreign key
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        created_at,
        orders!inner(buyer_id),
        product:products (*)
      `)
      .eq('orders.buyer_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('LibraryService.getPurchasedProducts error:', error);
      return [];
    }

    // Filter out any potential null products (if a product was hard-deleted)
    // and map to the Product type
    return data
      .filter((item: any) => item.product !== null)
      .map((item: any) => item.product as Product);
  }

  static async hasPurchased(userId: string, productId: string): Promise<boolean> {
    const supabase = createSupabaseServiceClient();

    const { data, error } = await supabase
      .from('order_items')
      .select('id, orders!inner(buyer_id)')
      .eq('orders.buyer_id', userId)
      .eq('product_id', productId)
      .limit(1);

    if (error) {
      console.error('LibraryService.hasPurchased error:', error);
      return false;
    }

    return data.length > 0;
  }
}
