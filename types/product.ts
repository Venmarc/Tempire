export type Product = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    image_url: string | null;
    file_url: string | null;
    creator_name: string | null;
    creator_id: string;
    category: string | null;
    tags: string[] | null;
    is_published: boolean;
    created_at: string;
    // Real metadata fields — populated at upload time or updated by system
    file_size: number | null;        // bytes
    file_extension: string | null;   // e.g. 'zip', 'pdf'
    average_rating: number;          // 0.00 – 5.00
    review_count: number;
    sales_count: number;
};

export type ProductInsertPayload = Omit<Product, 'id' | 'created_at'>;

export type ProductsResponse = {
    products: Product[];
    count: number;
};

// For filtering the product grid
export type ProductFilters = {
    search?: string;
    category?: string;
    sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular';
    page?: number;
    limit?: number;
};