import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from './ProductGridSkeleton';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return <ProductGridSkeleton count={8} />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mx-auto w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6 text-4xl">
          📦
        </div>
        <h3 className="text-2xl font-semibold mb-2">No products yet</h3>
        <p className="text-zinc-400 max-w-md mx-auto">
          Be the first to upload digital products. Sellers can start listing AI prompts, Notion templates, Figma UI kits, and more.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}