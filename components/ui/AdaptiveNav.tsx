'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
    Home, 
    Search, 
    PlusCircle, 
    User, 
    ShoppingCart, 
    X,
    LayoutGrid,
    SearchIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthButtons } from '@/components/auth/AuthButtons';
import { CartBadge } from '@/components/marketplace/CartBadge';
import { SearchBar } from '@/components/marketplace/SearchBar';

export function AdaptiveNav() {
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll for glassmorphism effect on desktop
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close search modal on route change
    useEffect(() => {
        setIsSearchOpen(false);
    }, [pathname]);

    // Active link helper
    const isActive = (path: string) => pathname === path;

    return (
        <>
            {/* --- DESKTOP NAVIGATION (80% Shift Centered) --- */}
            <nav className={cn(
                "hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled 
                    ? "bg-zinc-950/80 backdrop-blur-xl border-white/5 py-3" 
                    : "bg-transparent border-transparent py-5"
            )}>
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center">
                    {/* Left: Logo */}
                    <div className="flex justify-start">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                                T
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">
                                Tempire
                            </span>
                        </Link>
                    </div>

                    {/* Center: Prominent Search */}
                    <div className="flex justify-center w-full max-w-md mx-auto">
                        <SearchBar />
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-2">
                        <Link 
                            href="/seller/dashboard" 
                            className={cn(
                                "px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-200",
                                isActive('/seller/dashboard') 
                                    ? "bg-white text-black" 
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            Sell
                        </Link>
                        <div className="w-px h-4 bg-white/10 mx-2" />
                        <CartBadge />
                        <AuthButtons />
                    </div>
                </div>
            </nav>

            {/* --- MOBILE NAVIGATION --- */}
            
            {/* Mobile Header (Minimal) */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-lg border-b border-white/5 py-4 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm">
                        T
                    </div>
                    <span className="text-lg font-black tracking-tighter text-white">
                        Tempire
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <CartBadge />
                </div>
            </header>

            {/* Mobile Bottom Bar (Floating Capsule - Cineby Inspired) */}
            <div className="md:hidden fixed bottom-8 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
                <div className="bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-full py-2.5 px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-2 pointer-events-auto ring-1 ring-white/5">
                    <NavItem 
                        href="/" 
                        icon={<Home className="w-5 h-5" />} 
                        label="Home" 
                        active={isActive('/')} 
                    />
                    <button 
                        onClick={() => setIsSearchOpen(true)}
                        className={cn(
                            "flex flex-col items-center justify-center w-14 h-12 rounded-2xl gap-1 transition-all duration-300 active:scale-90",
                            isSearchOpen ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <SearchIcon className="w-5 h-5" />
                        <span className="text-[10px] font-bold leading-none">Search</span>
                    </button>
                    <NavItem 
                        href="/seller/dashboard" 
                        icon={<PlusCircle className="w-5 h-5" />} 
                        label="Sell" 
                        active={pathname.startsWith('/seller')} 
                    />
                    <div className="w-px h-6 bg-white/10 mx-1" />
                    <div className="flex items-center justify-center w-14 h-12 scale-90">
                        <AuthButtons />
                    </div>
                </div>
            </div>

            {/* --- MOBILE SEARCH MODAL --- */}
            {isSearchOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-zinc-950 animate-in fade-in duration-300 slide-in-from-bottom-5">
                    <div className="flex flex-col h-full">
                        {/* Modal Header */}
                        <div className="p-6 flex items-center gap-4 border-b border-white/5 bg-zinc-900/30">
                            <div className="flex-1">
                                <SearchBar />
                            </div>
                            <button 
                                onClick={() => setIsSearchOpen(false)}
                                className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-zinc-400 hover:text-white transition-colors active:scale-95"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="flex-1 p-8 space-y-10 overflow-y-auto">
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-6 font-heading">
                                    Quick Browse
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {['AI Prompts', 'Figma Kits', 'Notion', 'Ebooks'].map(cat => (
                                        <Link 
                                            key={cat}
                                            href={`/?category=${cat}`}
                                            onClick={() => setIsSearchOpen(false)}
                                            className="px-5 py-5 bg-zinc-900 border border-white/5 rounded-2xl flex flex-col gap-3 hover:bg-zinc-800 transition-all group"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                                <LayoutGrid className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400" />
                                            </div>
                                            <span className="text-sm font-bold text-zinc-200">{cat}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="pt-2 text-center">
                                <p className="text-sm text-zinc-600 font-medium italic">
                                    Searching 12,540+ curated products...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function NavItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
    return (
        <Link 
            href={href} 
            className={cn(
                "flex flex-col items-center justify-center w-14 h-12 rounded-2xl gap-1 transition-all duration-300 active:scale-90",
                active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
        >
            <div className={cn("transition-transform duration-300", active && "scale-110")}>
                {icon}
            </div>
            <span className={cn("text-[10px] font-bold leading-none", active ? "text-emerald-400" : "text-zinc-500")}>
                {label}
            </span>
        </Link>
    );
}
