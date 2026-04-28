import { NextResponse } from 'next/server';
import { ProductService } from '@/server/services/product';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
        return NextResponse.json({ products: [] });
    }

    try {
        const { products } = await ProductService.getProducts({
            search: query,
            limit: 6, // Small subset for live results
        });

        return NextResponse.json({ products });
    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json({ products: [] }, { status: 500 });
    }
}
