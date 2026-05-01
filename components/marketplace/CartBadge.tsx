'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function CartBadge() {
    const { totalCount } = useCart();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const count = totalCount();

    if (count === 0) return null;

    return (
        <span className="absolute top-0 right-0 w-5 h-5 bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-zinc-950 translate-x-1/4 -translate-y-1/4 pointer-events-none">
            {count}
        </span>
    );
}
