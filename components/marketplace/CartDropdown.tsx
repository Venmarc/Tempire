'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ShoppingCart } from 'lucide-react';
import { CartContent } from './CartContent';

export function CartDropdown() {
  const { totalCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
        <CartContent onClose={() => setOpen(false)} variant="popover" />
      </PopoverContent>
    </Popover>
  );
}
