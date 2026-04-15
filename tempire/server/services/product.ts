import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { Product, ProductsResponse } from '@/types/product';

export class ProductService {
    static async getProducts(limit = 12): Promise<ProductsResponse> {
        const supabase = createSupabaseServiceClient();

        try {
            const { data, error, count } = await supabase
                .from('products')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) {
                // Graceful fallback when table doesn't exist yet
                if (error.code === 'PGRST116' || error.message.includes('not found')) {
                    console.warn('Products table not found yet - showing empty state');
                    return { products: [], count: 0 };
                }
                console.error('ProductService.getProducts error:', error);
                throw new Error(`Failed to fetch products: ${error.message}`);
            }

            return {
                products: (data as Product[]) || [],
                count: count || 0,
            };
        } catch (err: any) {
            console.error('ProductService.getProducts unexpected error:', err);
            return { products: [], count: 0 };
        }
    }
}