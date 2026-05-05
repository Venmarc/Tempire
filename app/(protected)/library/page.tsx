'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useCart } from '@/hooks/useCart';
import { Package, Download, ArrowRight, Library, Search, Loader2, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { LibraryService } from '@/server/services/library';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { getDownloadUrlAction } from '@/server/actions/product-actions';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

function LibraryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('tab') === 'wishlist' ? 'wishlist' : 'purchases';
  
  const { user, isLoaded } = useUser();
  const { wishlist, toggleWishlist, addItem } = useCart();
  
  const [purchases, setPurchases] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadPurchases() {
      if (!user) return;
      try {
        const products = await LibraryService.getPurchasedProducts(user.id);
        setPurchases(products);
      } catch (error) {
        console.error('Failed to load library:', error);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoaded) {
      loadPurchases();
    }
  }, [user, isLoaded]);

  const handleTabChange = (tab: 'purchases' | 'wishlist') => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`/library?${params.toString()}`);
  };

  const handleDownload = async (productId: string, title: string) => {
    try {
      const result = await getDownloadUrlAction(productId);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      if (result.downloadUrl) {
        window.open(result.downloadUrl, '_blank');
        toast.success(`Downloading ${title}...`);
      }
    } catch (error) {
      toast.error('Failed to generate download link');
    }
  };

  const handleMoveToCart = (product: Product) => {
    addItem(product);
    toggleWishlist(product);
    toast.success("Moved to cart");
  };

  const displayedItems = activeTab === 'purchases' ? purchases : wishlist;
  const filteredItems = displayedItems.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-500/10 p-2.5 rounded-2xl">
                {activeTab === 'purchases' ? (
                   <Library className="w-6 h-6 text-emerald-400" />
                ) : (
                   <Heart className="w-6 h-6 text-red-400 fill-red-400" />
                )}
              </div>
              <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                {activeTab === 'purchases' ? 'My Assets' : 'Saved for Later'}
              </span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter leading-[0.9]">
              {activeTab === 'purchases' ? 'Library' : 'Wishlist'}
            </h1>
            <p className="text-zinc-500 mt-4 text-lg max-w-xl font-medium">
              {activeTab === 'purchases' 
                ? 'Your premium digital collection. Instant access to your high-quality tools and assets.' 
                : 'Items you have saved for later. Move them to your cart when you are ready to ship.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
             {/* Tab Switcher */}
            <div className="flex bg-zinc-900/50 backdrop-blur-md p-1.5 rounded-3xl border border-white/5 w-full sm:w-auto">
              <button
                onClick={() => handleTabChange('purchases')}
                className={cn(
                  "px-6 py-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center gap-2",
                  activeTab === 'purchases' 
                    ? "bg-white text-black shadow-xl" 
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Purchases
                <span className={cn(
                  "px-1.5 py-0.5 rounded-md text-[10px]",
                  activeTab === 'purchases' ? "bg-black/10" : "bg-white/5"
                )}>{purchases.length}</span>
              </button>
              <button
                onClick={() => handleTabChange('wishlist')}
                className={cn(
                  "px-6 py-3 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center gap-2",
                  activeTab === 'wishlist' 
                    ? "bg-white text-black shadow-xl" 
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Wishlist
                <span className={cn(
                  "px-1.5 py-0.5 rounded-md text-[10px]",
                  activeTab === 'wishlist' ? "bg-black/10" : "bg-white/5"
                )}>{wishlist.length}</span>
              </button>
            </div>

            <div className="relative group w-full sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-white/5 rounded-3xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {displayedItems.length === 0 ? (
          <div className="text-center py-24 bg-zinc-900/30 border-2 border-dashed border-white/5 rounded-[4rem]">
            <div className="bg-zinc-800 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 ring-1 ring-white/5">
              {activeTab === 'purchases' ? (
                <Library className="w-10 h-10 text-zinc-600" />
              ) : (
                <Heart className="w-10 h-10 text-zinc-600" />
              )}
            </div>
            <h2 className="text-3xl font-black mb-4">
              {activeTab === 'purchases' ? 'No purchases yet' : 'Wishlist is empty'}
            </h2>
            <p className="text-zinc-500 mb-12 max-w-sm mx-auto font-medium">
              {activeTab === 'purchases' 
                ? 'Explore the marketplace to find premium assets for your next project.'
                : 'Heart items that catch your eye and they will show up here for later.'}
            </p>
            <Button asChild className="rounded-[1.5rem] h-14 px-10 bg-emerald-500 hover:bg-emerald-400 text-black font-black transition-all hover:scale-105 active:scale-95">
              <Link href="/">
                Browse Marketplace
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 rounded-[4rem] border border-white/5">
             <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">No matching {activeTab} found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/10 transition-all duration-500 flex flex-col h-full hover:shadow-3xl hover:shadow-black"
              >
                {/* Image Wrapper */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                      <Package className="w-12 h-12 text-zinc-700" />
                    </div>
                  )}
                  
                  {/* Remove Button for Wishlist */}
                  {activeTab === 'wishlist' && (
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-5 right-5 w-11 h-11 bg-black/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all z-10 border border-white/10"
                    >
                      <Heart className="w-4.5 h-4.5 fill-current" />
                    </button>
                  )}
                  
                  {product.category && (
                    <div className="absolute top-5 left-5">
                      <span className="px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info Container */}
                <div className="p-8 flex flex-col grow">
                  <h3 className="font-black text-xl mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors tracking-tight">
                    {product.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-8 flex items-center gap-2 uppercase font-black tracking-widest opacity-60">
                    By {product.creator_name || 'Independent Creator'}
                  </p>

                  <div className="mt-auto pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeTab === 'purchases' ? (
                      <Button 
                        onClick={() => handleDownload(product.id, product.title)}
                        className="rounded-2xl h-12 bg-white text-black hover:bg-zinc-200 font-black tracking-tight"
                      >
                        <Download className="w-4.5 h-4.5 mr-2" />
                        Download
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleMoveToCart(product)}
                        className="rounded-2xl h-12 bg-emerald-500 text-white hover:bg-emerald-600 font-black tracking-tight"
                      >
                        <ShoppingCart className="w-4.5 h-4.5 mr-2" />
                        Move to Cart
                      </Button>
                    )}
                    <Button 
                      asChild
                      variant="outline"
                      className="rounded-2xl h-12 border-white/10 hover:bg-white/5 font-black tracking-tight"
                    >
                      <Link href={`/products/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    }>
      <LibraryContent />
    </Suspense>
  );
}
