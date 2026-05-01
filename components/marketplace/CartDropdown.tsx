'use client';

import { useCart } from '@/hooks/useCart';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ShoppingCart, Trash2, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CartDropdown() {
  const { items, removeItem, clearCart, totalPrice, totalCount } = useCart();

  const formattedTotal = (totalPrice() / 100).toFixed(2);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2.5 hover:bg-zinc-800 rounded-2xl transition-colors group">
          <ShoppingCart className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
          {totalCount() > 0 && (
            <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-zinc-950">
              {totalCount()}
            </div>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent 
        align="end" 
        className="w-96 p-0 bg-zinc-950 border border-white/5 shadow-2xl mt-2 rounded-3xl overflow-hidden"
        sideOffset={12}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2 rounded-2xl">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="font-semibold text-lg">Your Cart</p>
              <p className="text-xs text-zinc-500">({totalCount()} items)</p>
            </div>
          </div>
          
          <Link 
            href="/cart" 
            className="text-sm text-emerald-400 hover:text-emerald-500 font-medium transition-colors"
          >
            View Full Cart →
          </Link>
        </div>

        {/* Items */}
        <div className="max-h-[380px] overflow-auto p-6 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-zinc-900 p-6 rounded-3xl mb-6">
                <Package className="w-14 h-14 text-zinc-600" />
              </div>
              <p className="text-zinc-400 font-medium">Cart is empty</p>
              <p className="text-sm text-zinc-500 mt-1">Discover premium assets to get started</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div 
                key={item.id} 
                className="group flex gap-4 bg-zinc-900/70 hover:bg-zinc-900 border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all duration-200"
              >
                <div className="w-20 h-20 bg-zinc-800 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                  {item.image_url ? (
                    <Image 
                      src={item.image_url} 
                      alt={item.title}
                      width={80} 
                      height={80}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-9 h-9 text-zinc-600" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <h4 className="font-medium leading-tight line-clamp-2 text-sm pr-6">
                    {item.title}
                  </h4>
                  <p className="text-emerald-400 font-semibold mt-2">
                    ${(item.price / 100).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="opacity-40 group-hover:opacity-100 text-zinc-400 hover:text-red-400 p-1 transition-all self-start mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="bg-zinc-900 border-t border-white/10 p-6 space-y-5">
            <div className="flex justify-between items-baseline">
              <span className="text-zinc-400">Total</span>
              <span className="text-2xl font-semibold tracking-tighter">${formattedTotal}</span>
            </div>

            <Button 
              asChild 
              size="lg"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-base py-7 rounded-2xl font-medium"
            >
              <Link href="/checkout">
                Proceed to Checkout
              </Link>
            </Button>

            <button 
              onClick={clearCart}
              className="w-full text-sm text-zinc-500 hover:text-zinc-400 transition-colors py-2"
            >
              Clear Cart
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
