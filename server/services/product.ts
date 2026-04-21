import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { Product, ProductsResponse } from '@/types/product';

export class ProductService {
    static async getProducts(limit = 12): Promise<ProductsResponse> {
        const supabase = createSupabaseServiceClient();

        const { data, error, count } = await supabase
            .from('products')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            // Graceful handling when table doesn't exist yet (common in early development)
            if (error.code === 'PGRST116' || error.message?.includes('not found') || error.message?.includes('schema cache')) {
                console.warn('⚠️ Products table not found yet. Showing empty state.');
                return { products: [], count: 0 };
            }

            console.error('ProductService.getProducts error:', error);
            // Don't throw — return empty instead of breaking the page
            return { products: [], count: 0 };
        }

        return {
            products: (data as Product[]) || [],
            count: count || 0,
        };
    }
}