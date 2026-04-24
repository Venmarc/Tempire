import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { Product, ProductInsertPayload, ProductsResponse, ProductFilters } from '@/types/product';

export class ProductService {
    static async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
        const supabase = createSupabaseServiceClient();
        const { search, category, sort = 'newest', page = 1, limit = 12 } = filters;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from('products')
            .select('*', { count: 'exact' })
            .eq('is_published', true);

        if (search) {
            query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
        }

        if (category) {
            query = query.eq('category', category);
        }

        switch (sort) {
            case 'price_asc':  query = query.order('price', { ascending: true });  break;
            case 'price_desc': query = query.order('price', { ascending: false }); break;
            case 'popular':    query = query.order('sales_count', { ascending: false }); break;
            case 'newest':
            default:           query = query.order('created_at', { ascending: false }); break;
        }

        const { data, error, count } = await query.range(from, to);

        if (error) {
            if (error.code === 'PGRST116' || error.message?.includes('not found') || error.message?.includes('schema cache')) {
                console.warn('⚠️ Products table not found yet. Showing empty state.');
                return { products: [], count: 0 };
            }
            console.error('ProductService.getProducts error:', error);
            return { products: [], count: 0 };
        }

        return {
            products: (data as Product[]) || [],
            count: count || 0,
        };
    }

    static async uploadFile(
        file: File,
        bucket: 'product-images' | 'product-files',
        folderPath: string
    ): Promise<{ url: string; fileSize: number; fileExtension: string }> {
        const supabase = createSupabaseServiceClient();

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Auto-derive metadata from the file itself
        const fileSize = file.size;
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'unknown';

        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const timestamp = Date.now();
        const filePath = `${folderPath}/${timestamp}-${sanitizedName}`;

        const { error } = await supabase.storage
            .from(bucket)
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (error) {
            console.error(`Error uploading to ${bucket}:`, error);
            throw new Error(`Failed to upload ${file.name}`);
        }

        let url: string;
        if (bucket === 'product-images') {
            const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
            url = publicUrlData.publicUrl;
        } else {
            // Private — store the path; signed URL generated on demand
            url = filePath;
        }

        return { url, fileSize, fileExtension };
    }

    static async createProduct(payload: ProductInsertPayload): Promise<Product> {
        const supabase = createSupabaseServiceClient();

        const { data, error } = await supabase
            .from('products')
            .insert([payload])
            .select()
            .single();

        if (error) {
            console.error('ProductService.createProduct error:', error);
            throw new Error('Failed to create product');
        }

        return data as Product;
    }

    static async getProductById(id: string): Promise<Product | null> {
        const supabase = createSupabaseServiceClient();

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No rows returned
                return null;
            }
            console.error('ProductService.getProductById error:', error);
            throw new Error(`Failed to fetch product with id: ${id}`);
        }

        return data as Product;
    }

    static async getProductsBySeller(sellerId: string): Promise<Product[]> {
        const supabase = createSupabaseServiceClient();

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('creator_id', sellerId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('ProductService.getProductsBySeller error:', error);
            return [];
        }

        return (data as Product[]) || [];
    }

    static async updateProduct(id: string, payload: Partial<ProductInsertPayload>): Promise<Product> {
        const supabase = createSupabaseServiceClient();

        const { data, error } = await supabase
            .from('products')
            .update(payload)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('ProductService.updateProduct error:', error);
            throw new Error('Failed to update product');
        }

        return data as Product;
    }

    static async deleteProduct(id: string): Promise<void> {
        const supabase = createSupabaseServiceClient();

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('ProductService.deleteProduct error:', error);
            throw new Error('Failed to delete product');
        }
    }

    static async deleteFile(bucket: 'product-images' | 'product-files', filePath: string): Promise<void> {
        const supabase = createSupabaseServiceClient();
        
        // If it's a full public URL, we need to extract the relative path
        let path = filePath;
        if (filePath.includes('public/')) {
            path = filePath.split(`${bucket}/`)[1];
        }

        const { error } = await supabase.storage
            .from(bucket)
            .remove([path]);

        if (error) {
            console.warn(`Warning: Could not delete old file from ${bucket}:`, error.message);
            // We don't throw here to avoid blocking the main update if cleanup fails
        }
    }

    static async getSignedUrl(bucket: 'product-images' | 'product-files', filePath: string): Promise<string> {
        const supabase = createSupabaseServiceClient();

        const { data, error } = await supabase.storage
            .from(bucket)
            .createSignedUrl(filePath, 3600); // 1 hour link

        if (error) {
            console.error(`Error generating signed URL for ${filePath}:`, error);
            throw new Error('Failed to generate download link');
        }

        return data.signedUrl;
    }
}