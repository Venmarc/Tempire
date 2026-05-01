'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { addItem, isAdding } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const price = product.price;
  const isFree = product.price === 0;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      toast.info("Sign in to save favorites", {
        description: "You need an account to build your library.",
        action: {
          label: "Sign In",
          onClick: () => router.push('/sign-in'),
        },
      });
      return;
    }

    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success("Added to Wishlist", {
        description: "Wishlist syncing is coming in Phase 4!",
      });
    }
  };

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
          <button 
            onClick={toggleWishlist}
            className={cn(
              "absolute top-3 right-3 w-9 h-9 rounded-full border border-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 active:scale-90 z-10",
              isLiked 
                ? "bg-emerald-500 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                : "bg-black/20 text-white hover:bg-white hover:text-black"
            )}
          >
            <Heart className={cn("w-4.5 h-4.5", isLiked && "fill-current")} />
          </button>

          {/* File extension badge */}
          {product.file_extension && (
            <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/70 backdrop-blur text-[10px] font-bold text-zinc-300 rounded uppercase tracking-wider border border-white/5">
              {product.file_extension}
            </span>
          )}
        </div>

        {/* 2. Content Area */}
        <div className="flex flex-col flex-1 p-4 pt-3">
          <h3 className="font-semibold text-base leading-tight text-white line-clamp-2 transition-colors group-hover:text-emerald-400">
            {product.title}
          </h3>

          <p className="mt-1 text-sm text-zinc-400 line-clamp-1">
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
              
              {(product.average_rating === 0 || !product.average_rating) && (
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