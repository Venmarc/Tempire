'use client';

import Image from 'next/image';
import { Download, ExternalLink, FileIcon } from 'lucide-react';
import { Product } from '@/types/product';
import { useState } from 'react';
import { toast } from 'sonner';
import { generateDownloadLinkAction } from '@/server/actions/library-actions';

interface LibraryCardProps {
  product: Product;
}

export function LibraryCard({ product }: LibraryCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const result = await generateDownloadLinkAction(product.id);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.url) {
        // Trigger download by opening in a new tab or using a temporary anchor
        window.open(result.url, '_blank');
        toast.success("Download started", {
          description: "Your secure link has been generated."
        });
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to generate download link");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="group block h-full">
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
              <FileIcon className="w-8 h-8 text-zinc-700" />
            </div>
          )}

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
            <h3 className="font-semibold text-base leading-tight text-white line-clamp-2 transition-colors">
              {product.title}
            </h3>
          </div>

          <p className="text-sm text-zinc-400 line-clamp-1">
            {product.creator_name || 'Independent Creator'}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/5 bg-white/5">
              Purchased
            </span>
          </div>

          {/* Spacer pushes bottom bar to the very bottom */}
          <div className="flex-1" />

          {/* 3. Bottom bar */}
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 text-black text-sm font-bold h-11 rounded-2xl transition-all active:scale-[0.98] disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-zinc-500 border-t-black rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Download Asset
            </button>
            
            <button
              onClick={() => window.open(`/products/${product.id}`, '_blank')}
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium h-9 rounded-xl transition-all active:scale-[0.98]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
