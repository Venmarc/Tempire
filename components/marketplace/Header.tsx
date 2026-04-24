'use client';

import Link from 'next/link';
import { AuthButtons } from '@/components/auth/AuthButtons';
import { CartBadge } from '@/components/marketplace/CartBadge';

export function Header() {
    return (
        <header className="border-b border-white/10 sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl shrink-0">
                        T
                    </div>
                    <span className="text-2xl font-bold tracking-tighter hidden md:block">
                        Tempire
                    </span>
                </Link>
                
                <div className="flex items-center gap-6">
                    <CartBadge />
                    <AuthButtons />
                </div>
            </div>
        </header>
    );
}
