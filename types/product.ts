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
};

export type ProductInsertPayload = Omit<Product, 'id' | 'created_at'>;

export type ProductsResponse = {
    products: Product[];
    count: number;
};