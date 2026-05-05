'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ShoppingCart, Trash2, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CartDropdown() {
  const { 
    items, 
    wishlist,
    removeItem, 
    clearCart, 
    totalPrice, 
    totalCount,
    toggleWishlist 
  } = useCart();
  
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'cart' | 'wishlist'>('cart');

  useEffect(() => { setMounted(true); }, []);

  const formattedTotal = (totalPrice() / 100).toFixed(2);
  
  const displayItems = activeTab === 'cart' ? items : wishlist;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="relative p-2.5 hover:bg-zinc-800 rounded-2xl transition-colors duration-200 cursor-pointer group"
          aria-label="Open cart"
        >
          <ShoppingCart className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-200" />
          {mounted && totalCount() > 0 && (
            <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-zinc-950">
              {totalCount()}
            </div>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        className="w-80 p-0 bg-zinc-950 border border-zinc-800 ring-0 shadow-2xl rounded-3xl overflow-hidden"
        sideOffset={12}
      >
        {/* Header with Switcher */}
        <div className="p-4 border-b border-white/8">
          <div className="flex bg-zinc-900 p-1 rounded-xl mb-4">
            <button
              onClick={() => setActiveTab('cart')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'cart' 
                ? 'bg-zinc-800 text-white shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Cart ({items.length})
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'wishlist' 
                ? 'bg-zinc-800 text-white shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5 rotate-180" /> {/* Using Trash inverted as heart stand-in for now or just generic icon */}
              Saved ({wishlist.length})
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500/10 p-1.5 rounded-lg">
                {activeTab === 'cart' ? (
                  <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Package className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <p className="font-bold text-sm leading-tight">
                {activeTab === 'cart' ? 'Your Cart' : 'Saved Items'}
              </p>
            </div>

            <Link
              href={activeTab === 'cart' ? "/checkout" : "/wishlist"}
              className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider transition-colors duration-200"
            >
              {activeTab === 'cart' ? "Checkout" : "View Full Wishlist"}
            </Link>
          </div>
        </div>

        {/* Items Container */}
        <div className="max-h-[250px] overflow-auto p-2 space-y-1 slim-scrollbar">
          {displayItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-zinc-900 p-4 rounded-2xl mb-3">
                <Package className="w-8 h-8 text-zinc-600" />
              </div>
              <p className="text-zinc-300 text-xs font-bold">
                {activeTab === 'cart' ? 'Cart is empty' : 'No saved items'}
              </p>
              <button
                onClick={() => setActiveTab(activeTab === 'cart' ? 'wishlist' : 'cart')}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-medium mt-1"
              >
                Check your {activeTab === 'cart' ? 'wishlist' : 'cart'} instead
              </button>
            </div>
          ) : (
            displayItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex items-center rounded-2xl"
              >
                <Link
                  href={`/products/${item.id}`}
                  className="flex items-center gap-3 flex-1 min-w-0 hover:bg-zinc-900/60 border border-transparent hover:border-white/6 rounded-2xl p-2.5 pr-10 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl overflow-hidden shrink-0 border border-white/6">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-zinc-600" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-medium text-xs leading-snug line-clamp-2 text-zinc-100">
                      {item.title}
                    </h4>
                    <p className="text-emerald-400 text-xs font-semibold mt-0.5">
                      ${(item.price / 100).toFixed(2)}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    if (activeTab === 'cart') {
                      removeItem(item.id);
                    } else {
                      toggleWishlist(item);
                    }
                  }}
                  className="absolute right-3 text-zinc-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-400/10 transition-colors duration-200 cursor-pointer shrink-0"
                  aria-label={`Remove ${item.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {activeTab === 'cart' && items.length > 0 && (
          <div className="border-t border-white/8 px-4 py-3 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-zinc-400">Total</span>
              <span className="text-xl font-semibold tracking-tighter text-white">${formattedTotal}</span>
            </div>

            <Button
              asChild
              size="lg"
              className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-xs rounded-xl font-bold cursor-pointer transition-colors duration-200"
            >
              <Link href="/checkout">
                Proceed to Checkout
              </Link>
            </Button>

            <button
              onClick={clearCart}
              className="w-full text-[10px] text-zinc-500 hover:text-red-400 transition-colors duration-200 cursor-pointer py-0.5"
            >
              Clear Shopping Cart
            </button>
          </div>
        )}
        
        {activeTab === 'wishlist' && wishlist.length > 0 && (
           <div className="border-t border-white/8 px-4 py-3">
             <Button
                asChild
                variant="outline"
                className="w-full h-11 border-white/10 hover:bg-white/5 text-xs rounded-xl font-bold transition-all"
              >
                <Link href="/wishlist">
                  Manage Wishlist
                </Link>
              </Button>
           </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
