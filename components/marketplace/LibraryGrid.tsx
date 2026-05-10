import { Product } from '@/types/product';
import { LibraryCard } from './LibraryCard';
import { Library } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface LibraryGridProps {
  products: Product[];
}

export function LibraryGrid({ products }: LibraryGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mb-6">
          <Library className="w-10 h-10 text-zinc-600" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your library is empty</h2>
        <p className="text-zinc-500 max-w-sm mb-8">
          You haven't purchased any digital assets yet. Start exploring the marketplace to build your collection.
        </p>
        <Link href="/browse">
          <Button variant="outline" className="rounded-2xl border-zinc-800 hover:bg-white hover:text-black transition-all">
            Explore Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {products.map((product) => (
        <LibraryCard key={product.id} product={product} />
      ))}
    </div>
  );
}
