import Link from 'next/link';

export function Footer() {
    return (
        <footer className="mt-auto border-t border-white/5 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg">
                            T
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-white">
                            Tempire
                        </span>
                    </div>
                    
                    <p className="text-zinc-500 text-sm">
                        &copy; {new Date().getFullYear()} Tempire. Phase 2I: Premium UI Refinements.
                    </p>
                    
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-zinc-500 hover:text-white transition-colors text-sm">Home</Link>
                        <Link href="/seller/dashboard" className="text-zinc-500 hover:text-white transition-colors text-sm">Sell</Link>
                        <Link href="/cart" className="text-zinc-500 hover:text-white transition-colors text-sm">Cart</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
