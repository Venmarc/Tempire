'use client';

import { useCart } from '@/hooks/useCart';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Trash2, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function CartDrawer() {
  const { items, removeItem, clearCart, totalPrice, totalCount } = useCart();
  const [open, setOpen] = useState(false);

  const formattedTotal = (totalPrice() / 100).toFixed(2);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative p-2.5 hover:bg-zinc-800 rounded-2xl transition-colors group">
          <ShoppingCart className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
          {totalCount() > 0 && (
            <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full">
              {totalCount()}
            </div>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart ({totalCount()})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingCart className="w-16 h-16 text-zinc-600 mb-4" />
              <p className="text-zinc-400">Your cart is empty</p>
              <p className="text-sm text-zinc-500 mt-2">Start adding premium assets</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-zinc-900/50 border border-white/5 rounded-2xl p-4">
                <div className="w-20 h-20 bg-zinc-800 rounded-xl overflow-hidden shrink-0">
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
                      <Package className="w-8 h-8 text-zinc-600" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium line-clamp-2">{item.title}</h4>
                  <p className="text-emerald-400 font-medium mt-1">
                    ${ (item.price / 100).toFixed(2) }
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-zinc-500 hover:text-red-400 transition-colors self-start"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${formattedTotal}</span>
            </div>

            <div className="space-y-3">
              <Button 
                asChild 
                className="w-full bg-emerald-500 hover:bg-emerald-600 py-6 text-base"
                onClick={() => setOpen(false)}
              >
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>

              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => {
                  clearCart();
                  setOpen(false);
                }}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
