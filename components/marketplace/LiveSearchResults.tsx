'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';

export function LiveSearchResults({ query, onResultClick }: { query: string; onResultClick: () => void }) {
    const { data, isLoading } = useQuery<{ products: Product[] }>({
        queryKey: ['live-search', query],
        queryFn: () => fetch(`/api/search?q=${encodeURIComponent(query)}`).then(res => res.json()),
        enabled: query.length >= 2,
    });

    if (query.length < 2) return null;

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-white/5 animate-pulse">
                        <div className="w-16 h-16 bg-zinc-800 rounded-xl" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-zinc-800 rounded w-3/4" />
                            <div className="h-3 bg-zinc-800 rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const products = data?.products || [];

    if (products.length === 0) {
        return (
            <div className="py-12 text-center text-zinc-500">
                No products found for "{query}"
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map(product => (
                <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={onResultClick}
                    className="flex gap-4 p-4 bg-zinc-900 border border-white/5 rounded-2xl hover:border-emerald-500/30 hover:bg-zinc-800/50 transition-all group"
                >
                    <div className="relative w-16 h-16 shrink-0 bg-zinc-800 rounded-xl overflow-hidden">
                        {product.image_url && (
                            <Image 
                                src={product.image_url} 
                                alt={product.title} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-500" 
                            />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-emerald-400 transition-colors">
                            {product.title}
                        </h4>
                        <p className="text-xs text-zinc-500 mb-1">{product.creator_name}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-[10px] font-bold text-zinc-400">
                                    {product.average_rating > 0 ? product.average_rating.toFixed(1) : 'NEW'}
                                </span>
                            </div>
                            <span className="text-sm font-black text-white">
                                {product.price === 0 ? 'Free' : `$${(product.price / 100)}`}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
