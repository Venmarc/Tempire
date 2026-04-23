import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-4/3 bg-zinc-950 overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <span className="text-zinc-500 text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-2 group-hover:text-white transition-colors">
            {product.title}
          </h3>

          <p className="text-sm text-zinc-400 line-clamp-1 mb-4">
            {product.creator_name || 'Unknown creator'}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">
                ${(product.price / 100).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              {product.category && (
                <span className="text-xs text-zinc-500 ml-2">• {product.category}</span>
              )}
            </div>

            <button className="px-6 py-2 bg-white text-black text-sm font-medium rounded-2xl hover:bg-zinc-200 transition-colors">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}