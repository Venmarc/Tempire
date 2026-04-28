import { Suspense } from 'react';
import { ProductService } from '@/server/services/product';
import { ProductGrid } from '@/components/marketplace/ProductGrid';
import { CategoryPills } from '@/components/marketplace/CategoryPills';
import { SortSelector } from '@/components/marketplace/SortSelector';
import { Pagination } from '@/components/marketplace/Pagination';
import type { ProductFilters } from '@/types/product';

const LIMIT = 12;

interface PageProps {
    searchParams: Promise<{
        search?: string;
        category?: string;
        sort?: string;
        page?: string;
    }>;
}

async function ProductsSection({ filters }: { filters: ProductFilters }) {
    const result = await ProductService.getProducts(filters);
    return <ProductGrid products={result.products} isLoading={false} />;
}

export default async function MarketplacePage({ searchParams }: PageProps) {
    const sp = await searchParams;

    const page = Math.max(1, parseInt(sp.page || '1', 10));
    const filters: ProductFilters = {
        search: sp.search,
        category: sp.category,
        sort: (sp.sort as ProductFilters['sort']) || 'newest',
        page,
        limit: LIMIT,
    };

    // Fetch for count (to compute pagination)
    const result = await ProductService.getProducts(filters);

    return (
        <div className="pt-24 md:pt-32 grow">
            {/* Hero */}
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-4">
                    Premium digital products<br className="hidden md:block" /> from independent creators
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    AI prompts, Notion templates, Figma UI kits, ebooks, and more — all from creators who ship.
                </p>
            </div>

            {/* Browse Section */}
            <div className="max-w-7xl mx-auto px-6 pb-24 w-full">
                {/* Header row + Sort */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tighter">
                            {sp.search
                                ? `Results for "${sp.search}"`
                                : sp.category
                                    ? sp.category
                                    : 'Featured Products'
                            }
                        </h2>
                        <p className="text-zinc-500 mt-1 text-sm">
                            {result.count} {result.count === 1 ? 'product' : 'products'} found
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <Suspense>
                            <SortSelector />
                        </Suspense>
                    </div>
                </div>

                {/* Category Pills */}
                <Suspense>
                    <CategoryPills />
                </Suspense>

                {/* Product Grid */}
                <Suspense fallback={<ProductGrid products={[]} isLoading={true} />}>
                    <ProductsSection filters={filters} />
                </Suspense>

                {/* Pagination */}
                <div className="mt-12">
                    <Pagination
                        currentPage={page}
                        totalCount={result.count}
                        limit={LIMIT}
                        searchParams={{ search: sp.search, category: sp.category, sort: sp.sort }}
                    />
                </div>
            </div>
        </div>
    );
}