'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Zap, ShieldCheck, Download, Edit3 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import Link from 'next/link';
import { getDownloadUrlAction } from '@/server/actions/product-actions';

interface PurchaseSidebarProps {
    product: Product;
}

export function PurchaseSidebar({ product }: PurchaseSidebarProps) {
    const { isLoaded, isSignedIn, user } = useUser();
    const { openSignIn } = useClerk();
    const [isAdding, setIsAdding] = useState(false);

    const price = product.price / 100;
    const isFree = product.price === 0;

    // Check if user is the creator
    const isCreator = isLoaded && isSignedIn && user?.id === product.creator_id;

    const handleAddToCart = () => {
        if (!isSignedIn) {
            openSignIn();
            return;
        }

        setIsAdding(true);
        // Mock add to cart latency
        setTimeout(() => {
            setIsAdding(false);
            toast.success(`"${product.title}" added to your cart!`);
        }, 500);
    };

    const handleBuyNow = () => {
        if (!isSignedIn) {
            openSignIn();
            return;
        }

        // Mock checkout redirect
        toast.message('Redirecting to checkout...', {
            description: 'This feature is mocked for Phase 2D.',
        });
    };

    const handleDownload = async () => {
        const result = await getDownloadUrlAction(product.id);
        if (result.error) {
            toast.error(result.error);
            return;
        }
        if (result.downloadUrl) {
            window.open(result.downloadUrl, '_blank');
            toast.success('Download started!');
        }
    };

    if (isCreator) {
        return (
            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sticky top-24">
                <div className="mb-6">
                    <span className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Seller Tools</span>
                    <h3 className="text-2xl font-bold mt-2">Your Product</h3>
                </div>
                
                <div className="space-y-4">
                    <div className="bg-zinc-950 p-4 rounded-2xl border border-white/5">
                        <div className="text-sm text-zinc-400">Total Views</div>
                        <div className="text-2xl font-bold mt-1">1,240 <span className="text-sm text-emerald-500 ml-2">Mock</span></div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link href={`/seller/edit/${product.id}`} className="block">
                        <Button className="w-full h-12 rounded-2xl" variant="outline">
                            <Edit3 className="mr-2 w-4 h-4" />
                            Edit Product
                        </Button>
                    </Link>

                    {product.file_url && (
                        <Button 
                            className="w-full h-12 rounded-2xl bg-zinc-800 text-white hover:bg-zinc-700"
                            onClick={handleDownload}
                        >
                            <Download className="mr-2 w-4 h-4" />
                            Download Project Files
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sticky top-24">
            <div className="mb-6">
                <span className="text-5xl font-bold tracking-tighter">
                    {isFree ? 'Free' : `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </span>
            </div>

            <div className="space-y-3">
                <Button 
                    className="w-full text-lg py-6 rounded-2xl bg-white text-black hover:bg-zinc-200 group"
                    onClick={handleBuyNow}
                >
                    <Zap className="mr-2 w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
                    {isFree ? 'Download Now' : 'Buy Now'}
                </Button>

                {!isFree && (
                    <Button 
                        className="w-full py-6 rounded-2xl" 
                        variant="outline"
                        onClick={handleAddToCart}
                        disabled={isAdding}
                    >
                        <ShoppingCart className="mr-2 w-5 h-5" />
                        {isAdding ? 'Adding...' : 'Add to Cart'}
                    </Button>
                )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span>Secure encrypted checkout via Stripe</span>
                </div>
            </div>
        </div>
    );
}
