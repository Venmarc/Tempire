import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';

export function Footer() {
    return (
        <footer className="mt-auto border-t border-white/5 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <BrandLogo variant="white" size={32} />
                        <span className="text-xl font-bold tracking-tighter text-white">
                            Tempire
                        </span>
                    </div>
                    
                    <p className="text-zinc-500 text-sm">
                        &copy; {new Date().getFullYear()} Tempire. Phase 2I: Premium UI Refinements.
                    </p>
                    
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-zinc-500 hover:text-white transition-colors text-sm">Home</Link>
                        <Link href="/browse" className="text-zinc-500 hover:text-white transition-colors text-sm">Marketplace</Link>
                        <Link href="/seller/dashboard" className="text-zinc-500 hover:text-white transition-colors text-sm">Sell</Link>
                        <Link href="/cart" className="text-zinc-500 hover:text-white transition-colors text-sm">Cart</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
