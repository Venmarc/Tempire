export type Product = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    image_url: string | null;
    creator_name: string | null;
    category: string | null;
    created_at: string;
};

export type ProductsResponse = {
    products: Product[];
    count: number;
};