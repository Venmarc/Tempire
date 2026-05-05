'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    Home, 
    Search, 
    PlusCircle, 
    X,
    LayoutGrid,
    ShoppingBag,
    Library
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthButtons } from '@/components/auth/AuthButtons';
import { CartDropdown } from '@/components/marketplace/CartDropdown';
import { SearchBar } from '@/components/marketplace/SearchBar';
import { LiveSearchResults } from '@/components/marketplace/LiveSearchResults';

export function AdaptiveNav() {
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll(); // Set correct state immediately on mount
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsSearchOpen(false);
        setSearchQuery('');
    }, [pathname]);

    const isActive = (path: string) => pathname === path;

    return (
        <>
            {/* --- DESKTOP NAVIGATION (80% Shift Centered) --- */}
            <nav className={cn(
                "hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled ? "bg-zinc-950/80 backdrop-blur-xl border-white/5 py-3" : "bg-zinc-950/20 border-transparent py-5"
            )}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-12">
                    {/* Left: Logo */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-black text-2xl group-hover:rotate-12 transition-transform duration-500">
                            T
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">
                            Tempire
                        </span>
                    </Link>

                    {/* Center: Prominent Search */}
                    <div className="flex-1 max-w-2xl mx-auto">
                        <SearchBar />
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-6">
                        <Link 
                            href="/" 
                            className={cn(
                                "text-sm font-bold tracking-wide transition-colors",
                                isActive('/') ? "text-white" : "text-zinc-500 hover:text-white"
                            )}
                        >
                            Browse
                        </Link>
                        <Link 
                            href="/seller/dashboard" 
                            className={cn(
                                "text-sm font-bold tracking-wide transition-colors",
                                pathname.startsWith('/seller') ? "text-white" : "text-zinc-500 hover:text-white"
                            )}
                        >
                            Sell
                        </Link>
                        <Link 
                            href="/library" 
                            className={cn(
                                "text-sm font-bold tracking-wide transition-colors",
                                pathname.startsWith('/library') ? "text-white" : "text-zinc-500 hover:text-white"
                            )}
                        >
                            Library
                        </Link>
                        <div className="flex items-center gap-3 md:gap-4 border-l border-white/10 pl-6">
                            <CartDropdown />
                            <AuthButtons />
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- MOBILE NAVIGATION --- */}
            
            {/* Mobile Header (Minimal) */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-zinc-950/50 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg">
                        T
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    <CartDropdown />
                </div>
            </header>

            {/* Mobile Bottom Capsule */}
            <div className="md:hidden fixed bottom-8 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
                <div className="bg-zinc-900 border border-white/10 rounded-full h-16 px-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-1 pointer-events-auto ring-1 ring-white/5">
                    <MobileNavItem 
                        href="/" 
                        icon={<Home className="w-6 h-6" />} 
                        active={isActive('/')} 
                    />
                    <button 
                        onClick={() => setIsSearchOpen(true)}
                        className={cn(
                            "flex items-center justify-center w-12 h-11 rounded-full transition-all duration-300",
                            isSearchOpen ? "bg-white text-black" : "text-zinc-500 hover:text-white"
                        )}
                    >
                        <Search className="w-6 h-6" />
                    </button>
                    
                    <MobileNavItem 
                        href="/seller/dashboard" 
                        icon={<PlusCircle className="w-7 h-7 text-emerald-500" />} 
                        active={pathname.startsWith('/seller')} 
                    />
                    
                    <MobileNavItem 
                        href="/library" 
                        icon={<Library className="w-6 h-6" />} 
                        active={pathname.startsWith('/library')} 
                    />
                    
                    <div className="flex items-center justify-center w-12 h-11">
                        <AuthButtons />
                    </div>
                </div>
            </div>

            {/* --- MOBILE SEARCH MODAL (Full Screen) --- */}
            {isSearchOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-zinc-950 flex flex-col animate-in slide-in-from-bottom duration-300">
                    {/* Modal Header */}
                    <div className="p-6 border-b border-white/5 flex items-center gap-4">
                        <div className="flex-1">
                            <SearchBar onQueryChange={setSearchQuery} />
                        </div>
                        <button 
                            onClick={() => setIsSearchOpen(false)}
                            className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-full text-zinc-400"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    
                    {/* Modal Results Grid / Placeholder */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
                        {searchQuery.length >= 2 ? (
                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Search Results</h3>
                                <LiveSearchResults query={searchQuery} onResultClick={() => setIsSearchOpen(false)} />
                            </div>
                        ) : (
                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6">Explore Categories</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['AI Prompts', 'Figma Kits', 'Notion', 'Ebooks', 'Icons', 'Tools'].map(cat => (
                                            <Link 
                                                key={cat}
                                                href={`/?category=${cat}`}
                                                onClick={() => setIsSearchOpen(false)}
                                                className="p-6 bg-zinc-900 border border-white/5 rounded-3xl flex flex-col gap-4 hover:border-emerald-500/50 transition-colors group"
                                            >
                                                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                                    <LayoutGrid className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                                                </div>
                                                <span className="text-sm font-bold tracking-tight">{cat}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="text-center text-zinc-600 py-10">
                                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p className="text-sm italic">Type at least 2 characters to search the entire catalog...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

function MobileNavItem({ href, icon, active }: { href: string, icon: React.ReactNode, active: boolean }) {
    return (
        <Link 
            href={href} 
            className={cn(
                "flex items-center justify-center w-14 h-12 rounded-full transition-all duration-300",
                active ? "bg-white text-black" : "text-zinc-500 hover:text-white"
            )}
        >
            {icon}
        </Link>
    );
}
