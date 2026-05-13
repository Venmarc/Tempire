'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import { 
    Home, 
    Search, 
    PlusCircle, 
    X,
    LayoutGrid,
    ShoppingBag,
    Library,
    Menu,
    ShoppingCart,
    Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthButtons } from '@/components/auth/AuthButtons';
import { CartDropdown } from '@/components/marketplace/CartDropdown';
import { SearchBar } from '@/components/marketplace/SearchBar';
import { LiveSearchResults } from '@/components/marketplace/LiveSearchResults';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { CartContent } from '@/components/marketplace/CartContent';
import { useCart } from '@/hooks/useCart';

export function AdaptiveNav() {
    const pathname = usePathname();
    const { user, isLoaded, isSignedIn } = useUser();
    const { totalCount } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileTab, setMobileTab] = useState<'menu' | 'cart'>('menu');

    const isSeller = user?.publicMetadata?.role === 'seller';
    const sellerHref = isSeller ? "/seller/dashboard" : "/seller/onboard";
    const sellerText = isSeller ? "Sell" : "Start Selling";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsFooterVisible(entry.isIntersecting),
            { rootMargin: "50px" }
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, [pathname]);

    useEffect(() => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <>
            {/* --- DESKTOP NAVIGATION --- */}
            <nav className={cn(
                "hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled ? "bg-zinc-950/80 backdrop-blur-xl border-white/5 py-3" : "bg-zinc-950/20 border-transparent py-3"
            )}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-12">
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        <BrandLogo variant="white" size={40} className="group-hover:rotate-12 transition-transform duration-500" />
                        <span className="text-2xl font-black tracking-tighter text-white">Tempire</span>
                    </Link>

                    <div className="flex-1 max-w-2xl mx-auto">
                        <SearchBar />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-6 text-sm font-bold tracking-wide">
                            <Link href="/browse" className={cn(pathname.startsWith('/browse') ? "text-white" : "text-zinc-500 hover:text-white")}>Browse</Link>
                            <Link href={sellerHref} className={cn(pathname.startsWith('/seller') ? "text-white" : "text-zinc-500 hover:text-white", !isSeller && "text-emerald-500 hover:text-emerald-400")}>{sellerText}</Link>
                            <Link href="/library" className={cn(pathname.startsWith('/library') ? "text-white" : "text-zinc-500 hover:text-white")}>Library</Link>
                        </div>
                        
                        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                            {/* Theme Toggle Placeholder */}
                            <button className="p-2.5 text-zinc-500 hover:text-white transition-colors">
                                <Moon className="w-5 h-5" />
                            </button>
                            <CartDropdown />
                            <AuthButtons />
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- MOBILE HEADER --- */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-zinc-950/50 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <BrandLogo variant="white" size={32} />
                </Link>
                
                <div className="flex items-center gap-3">
                    {/* Always Visible: Theme & Auth */}
                    <button className="p-2 text-zinc-500">
                        <Moon className="w-5 h-5" />
                    </button>

                    {isLoaded && !isSignedIn && (
                        <SignUpButton mode="modal">
                            <Button size="sm" className="h-9 px-4 rounded-xl bg-white text-black font-bold text-xs">
                                Get Started
                            </Button>
                        </SignUpButton>
                    )}

                    {/* Hamburger Menu */}
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                                <Menu className="w-6 h-6" />
                                {totalCount() > 0 && (
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border border-zinc-950" />
                                )}
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[85%] sm:w-[400px] p-0 bg-zinc-950 border-white/10 text-white flex flex-col">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            
                            {/* Option C: Tabbed Capsule */}
                            <div className="p-6 pb-0">
                                <div className="flex bg-zinc-900 p-1 rounded-2xl mb-6">
                                    <button 
                                        onClick={() => setMobileTab('menu')}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all",
                                            mobileTab === 'menu' ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500"
                                        )}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                        Menu
                                    </button>
                                    <button 
                                        onClick={() => setMobileTab('cart')}
                                        className={cn(
                                            "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all",
                                            mobileTab === 'cart' ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500"
                                        )}
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Cart {totalCount() > 0 && `(${totalCount()})`}
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                {mobileTab === 'menu' ? (
                                    <div className="p-6 space-y-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Navigation</label>
                                            <div className="grid gap-2">
                                                <MobileMenuLink href="/browse" icon={<Home className="w-5 h-5" />} label="Browse Marketplace" active={pathname === '/browse'} />
                                                <MobileMenuLink href={sellerHref} icon={<PlusCircle className="w-5 h-5 text-emerald-500" />} label={sellerText} active={pathname.startsWith('/seller')} />
                                                <MobileMenuLink href="/library" icon={<Library className="w-5 h-5" />} label="My Library" active={pathname === '/library'} />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Account</label>
                                            <div className="p-4 bg-zinc-900 rounded-2xl border border-white/5">
                                                <AuthButtons isMobile={true} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <CartContent variant="drawer" onClose={() => setIsMenuOpen(false)} />
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            {/* Mobile Bottom Capsule (Stay for quick access) */}
            <div className={cn(
                "md:hidden fixed left-0 right-0 z-50 flex justify-center px-6 pointer-events-none transition-transform duration-500",
                "bottom-[calc(1.5rem+env(safe-area-inset-bottom))]",
                isFooterVisible && "translate-y-[150%]"
            )}>
                <div className="bg-black/85 backdrop-blur-md border border-white/10 rounded-[24px] h-[60px] px-2 shadow-2xl flex items-center gap-1 pointer-events-auto">
                    <MobileNavItem href="/browse" icon={<Home className="w-6 h-6" />} active={pathname === '/browse'} />
                    <button 
                        onClick={() => setIsSearchOpen(true)}
                        className={cn("relative flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-300", isSearchOpen ? "text-white" : "text-zinc-500")}
                    >
                        <Search className="w-6 h-6" />
                    </button>
                    <MobileNavItem href={sellerHref} icon={<PlusCircle className="w-7 h-7 text-emerald-500" />} active={pathname.startsWith('/seller')} />
                    <MobileNavItem href="/library" icon={<Library className="w-6 h-6" />} active={pathname === '/library'} />
                    <button onClick={() => { setMobileTab('cart'); setIsMenuOpen(true); }} className="relative flex items-center justify-center w-12 h-12 rounded-xl text-zinc-500">
                        <ShoppingCart className="w-6 h-6" />
                        {totalCount() > 0 && <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />}
                    </button>
                </div>
            </div>

            {/* Mobile Search Modal */}
            {isSearchOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-zinc-950 flex flex-col animate-in slide-in-from-bottom duration-300">
                    <div className="p-6 border-b border-white/5 flex items-center gap-4">
                        <div className="flex-1"><SearchBar onQueryChange={setSearchQuery} /></div>
                        <button onClick={() => setIsSearchOpen(false)} className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-full text-zinc-400"><X className="w-6 h-6" /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        {searchQuery.length >= 2 ? (
                            <LiveSearchResults query={searchQuery} onResultClick={() => setIsSearchOpen(false)} />
                        ) : (
                            <div className="space-y-10">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Explore Categories</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {['AI Prompts', 'Figma Kits', 'Notion', 'Ebooks'].map(cat => (
                                        <Link key={cat} href={`/browse?category=${cat}`} onClick={() => setIsSearchOpen(false)} className="p-6 bg-zinc-900 border border-white/5 rounded-3xl flex flex-col gap-4 group">
                                            <LayoutGrid className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                                            <span className="text-sm font-bold">{cat}</span>
                                        </Link>
                                    ))}
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
        <Link href={href} className={cn("relative flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-300", active ? "text-white" : "text-zinc-500")}>
            {icon}
            {active && <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />}
        </Link>
    );
}

function MobileMenuLink({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
    return (
        <Link href={href} className={cn("flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300", active ? "bg-white/5 border-white/10 text-white" : "border-transparent text-zinc-400 hover:bg-white/5")}>
            {icon}
            <span className="font-bold tracking-tight">{label}</span>
        </Link>
    );
}
