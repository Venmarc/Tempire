import Link from 'next/link';
import { Eye, Edit3, Circle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteProductButton } from '@/components/marketplace/DeleteProductButton';

interface SellerProductCardProps {
    product: {
        id: string;
        title: string;
        category: string | null;
        price: number;
        image_url: string | null;
        is_published: boolean;
    };
}

export function SellerProductCard({ product }: SellerProductCardProps) {
    return (
        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-5 space-y-4 hover:border-white/20 transition-colors">
            <div className="flex gap-4">
                <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-zinc-800">
                    {product.image_url ? (
                        <img 
                            src={product.image_url} 
                            alt={product.title} 
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-8 h-8 text-zinc-600" />
                        </div>
                    )}
                </div>
                <div className="min-w-0 flex-1 py-1">
                    <h4 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-emerald-400 transition-colors">
                        {product.title}
                    </h4>
                    <p className="text-sm text-zinc-500 mt-1">
                        {product.category || 'No Category'}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    {product.is_published ? (
                        <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            <Circle className="w-2 h-2 fill-current" />
                            <span>Published</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium bg-zinc-800/50 px-3 py-1 rounded-full border border-white/5">
                            <Circle className="w-2 h-2 fill-current" />
                            <span>Draft</span>
                        </div>
                    )}
                </div>
                <div className="font-bold text-2xl md:text-3xl tracking-tight text-white">
                    ${(product.price / 100).toFixed(2)}
                </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-white/10">
                <Link href={`/products/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full h-11 rounded-xl border-white/10 hover:bg-white/5">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                    </Button>
                </Link>
                <Link href={`/seller/edit/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full h-11 rounded-xl border-white/10 hover:bg-white/5">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                </Link>
                <div className="shrink-0">
                    <DeleteProductButton productId={product.id} productTitle={product.title} />
                </div>
            </div>
        </div>
    );
}
