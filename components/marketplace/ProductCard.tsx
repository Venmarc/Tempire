'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { WishlistButton } from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isAdding } = useCart();
  const price = product.price;
  const isFree = product.price === 0;

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50">
        {/* 1. Image Area */}
        <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden shrink-0">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
              <span className="text-zinc-600 text-xs">No preview</span>
            </div>
          )}

          {/* Wishlist Heart Overlay */}
          <div className="absolute top-3 right-3 z-10">
            <WishlistButton 
              productId={product.id} 
              size="sm" 
              className="backdrop-blur-md bg-black/20" 
            />
          </div>

          {/* File extension badge */}
          {product.file_extension && (
            <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/70 backdrop-blur text-[10px] font-bold text-zinc-300 rounded uppercase tracking-wider border border-white/5">
              {product.file_extension}
            </span>
          )}
        </div>

        {/* 2. Content Area */}
        <div className="flex flex-col flex-1 p-4 pt-3">
          <div className="h-[42px] mb-1">
            <h3 className="font-semibold text-base leading-tight text-white line-clamp-2 transition-colors group-hover:text-emerald-400">
              {product.title}
            </h3>
          </div>

          <p className="text-sm text-zinc-400 line-clamp-1">
            {product.creator_name || 'Independent Creator'}
          </p>

          {/* Spacer pushes bottom bar to the very bottom */}
          <div className="flex-1" />

          {/* 3. Bottom bar */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold tracking-tighter text-white">
                {isFree ? (
                  <span className="text-emerald-400">Free</span>
                ) : (
                  `$${(price / 100).toFixed(2)}`
                )}
              </span>
              
            {/* NEW tag based on creation date (last 14 days) */}
            {new Date(product.created_at).getTime() > Date.now() - 14 * 24 * 60 * 60 * 1000 && (
              <span className="rounded bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-400 uppercase tracking-wider">
                NEW
              </span>
            )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
              disabled={isAdding}
              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white text-sm font-medium px-4 py-2 rounded-2xl transition-all active:scale-[0.97] disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}