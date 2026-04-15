import { ProductService } from '@/server/services/product';
import { ProductGrid } from '@/components/marketplace/ProductGrid';
import Link from 'next/link';

export default async function MarketplacePage() {
  let products: any[] = [];
  let error: string | null = null;

  try {
    const result = await ProductService.getProducts(12);
    products = result.products;
  } catch (err: any) {
    error = err.message || 'Failed to load products';
    console.error('Homepage products fetch error:', err);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl shrink-0">
              T
            </div>
            <span className="text-2xl font-bold tracking-tighter hidden md:block">
              Tempire
            </span>
          </Link>

          {/* TODO: Add AuthButtons back when ready */}
          <div className="text-sm text-zinc-400">Auth coming back soon</div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
          Premium digital products from independent creators
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
          AI prompts, Notion templates, Figma UI kits, ebooks, and more — all from creators who ship.
        </p>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl font-semibold tracking-tighter">Featured Products</h2>
            <p className="text-zinc-400 mt-2">Discover high-quality digital goods</p>
          </div>
          <div className="text-sm text-zinc-500">12 products shown • More filters coming</div>
        </div>

        {error ? (
          <div className="text-center py-20 text-red-400">
            Error loading products: {error}
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      {/* Footer */}
      <footer className="text-xs text-zinc-600 text-center py-8 border-t border-white/10 mt-auto">
        Phase 2B — Product browsing grid with skeleton loaders
      </footer>
    </div>
  );
}