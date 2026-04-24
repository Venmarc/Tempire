import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.price / 100;
  const isFree = product.price === 0;

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

          {/* File extension badge */}
          {product.file_extension && (
            <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/70 backdrop-blur text-xs font-mono text-zinc-300 rounded-md uppercase">
              {product.file_extension}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-1 group-hover:text-white transition-colors">
            {product.title}
          </h3>

          <p className="text-sm text-zinc-500 line-clamp-1 mb-3">
            {product.creator_name || 'Unknown creator'}
          </p>

          {/* Rating + sales */}
          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-zinc-300 font-medium">
                {product.average_rating > 0 ? product.average_rating.toFixed(1) : '—'}
              </span>
              {product.review_count > 0 && <span>({product.review_count})</span>}
            </span>
            {product.sales_count > 0 && (
              <span>{product.sales_count} sold</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {isFree ? (
                <span className="text-emerald-400">Free</span>
              ) : (
                `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              )}
            </span>

            <button className="px-5 py-2 bg-white text-black text-sm font-medium rounded-2xl hover:bg-zinc-200 transition-colors">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}