'use client';

import Image from 'next/image';
import { Product } from '@/types/product';
import { ImageIcon } from 'lucide-react';

interface ProductGalleryProps {
    product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
    if (!product.image_url) {
        return (
            <div className="w-full aspect-4/3 md:aspect-video bg-zinc-900 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-zinc-500">
                <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
                <p>No preview available</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Primary Image */}
            <div className="relative w-full aspect-4/3 md:aspect-video bg-zinc-950 rounded-3xl overflow-hidden border border-white/10">
                <Image
                    src={product.image_url}
                    alt={product.title}
                    fill
                    unoptimized // Bypasses local next/image processing
                    className="object-cover"
                    priority
                />
            </div>

            {/* Future expansion: Thumbnails could go here */}
        </div>
    );
}
