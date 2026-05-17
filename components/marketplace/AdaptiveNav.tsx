'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import {
    Search,
    X,
    LayoutGrid,
    Menu,
    ShoppingCart,
    Moon,
    ChevronDown,
    ChevronRight
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
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDesktop, setIsDesktop] = useState(false);

    const isSeller = user?.publicMetadata?.role === 'seller';
    const sellerHref = isSeller ? "/seller/dashboard" : "/seller/onboard";
    const sellerText = isSeller ? "Sell" : "Start Selling";

    useEffect(() => {
        const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        setIsCartOpen(false);
        setIsSearchOpen(false);
        setSearchQuery('');
    }, [pathname]);

    // Ensure body scroll is locked when menu is open
    useEffect(() => {
        if (isMenuOpen || isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isMenuOpen, isSearchOpen]);

    return (
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isMenuOpen ? "bg-zinc-950 border-white/10 py-3" : (scrolled ? "bg-zinc-950/90 backdrop-blur-xl border-white/10 py-3" : "bg-zinc-950/50 backdrop-blur-md border-transparent py-3 sm:py-4")
            )}>
                <div className="w-full px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-6 lg:gap-8">

                    {/* --- LEFT SECTION (Menu Trigger + Logo) --- */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-2 p-2 -ml-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 ml-2 xl:ml-4">
                            <BrandLogo variant="white" size={32} className="group-hover:rotate-12 transition-transform duration-500" />
                            {isDesktop && (
                                <span className="text-2xl font-black tracking-tighter text-white">Tempire</span>
                            )}
                        </Link>
                    </div>

                    {/* --- CENTER SECTION (Scalable Search) --- */}
                    <div className="flex-1 max-w-2xl mx-auto flex items-center justify-center">
                        <div className="hidden sm:block w-full">
                            <SearchBar />
                        </div>
                        <div className="sm:hidden w-full">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="w-full h-11 bg-zinc-900 border border-white/5 rounded-full flex items-center px-4 gap-3 text-zinc-500 hover:text-white transition-colors"
                            >
                                <Search className="w-4 h-4" />
                                <span className="text-sm">Search...</span>
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT SECTION (Actions & Auth) --- */}
                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        {/* Always visible icons container */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button className="hidden sm:block p-2 text-zinc-500 hover:text-white transition-colors">
                                <Moon className="w-5 h-5" />
                            </button>

                            {/* Desktop Cart */}
                            <div className="hidden md:block">
                                <CartDropdown />
                            </div>

                            {/* Mobile Cart Sheet */}
                            <div className="md:hidden">
                                <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                                    <SheetTrigger asChild>
                                        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                                            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                                            {totalCount() > 0 && (
                                                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border border-zinc-950" />
                                            )}
                                        </button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="w-[85%] sm:w-[400px] p-0 bg-zinc-950 border-white/10 text-white flex flex-col">
                                        <SheetTitle className="sr-only">Shopping Cart</SheetTitle>
                                        <CartContent variant="drawer" onClose={() => setIsCartOpen(false)} />
                                    </SheetContent>
                                </Sheet>
                            </div>

                            {/* Auth Container */}
                            <div className="flex items-center">
                                {isLoaded && !isSignedIn ? (
                                    <>
                                        {!isDesktop ? (
                                            /* Mobile: Log in link instead of big button */
                                            <SignInButton mode="modal">
                                                <Button size="sm" variant="ghost" className="h-9 px-2 text-zinc-400 hover:text-white font-bold">
                                                    Log In
                                                </Button>
                                            </SignInButton>
                                        ) : (
                                            /* Desktop: Log In + Sign Up side-by-side */
                                            <div className="flex items-center gap-3">
                                                <SignInButton mode="modal">
                                                    <button className="px-5 py-2 text-sm font-medium hover:bg-white/10 rounded-2xl transition-colors border border-white/20 text-zinc-200 hover:text-white whitespace-nowrap">
                                                        Log In
                                                    </button>
                                                </SignInButton>

                                                <SignUpButton mode="modal">
                                                    <button className="px-5 py-2 text-sm font-medium bg-white text-black rounded-2xl hover:bg-zinc-100 transition-colors font-bold whitespace-nowrap">
                                                        Sign Up
                                                    </button>
                                                </SignUpButton>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <AuthButtons />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- UNIVERSAL DROPDOWN MENU --- */}
                <div
                    className={cn(
                        "absolute top-full left-0 right-0 w-full bg-zinc-950 border-b border-white/10 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl z-50",
                        isMenuOpen ? "max-h-[calc(100vh-80px)] opacity-100 visible" : "max-h-0 opacity-0 invisible"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div className="w-full max-w-[1600px] mx-auto overflow-y-auto max-h-[calc(100vh-80px)] custom-scrollbar p-6 sm:p-12 lg:p-16">
                        <div
                            style={isDesktop ? {
                                display: 'grid',
                                gridTemplateColumns: '3fr 1fr 6fr 1fr 2fr',
                                gap: '2rem'
                            } : {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2rem'
                            }}
                        >
                            {/* Column 1: Navigation Links (Left, 3 cols) */}
                            <div
                                className="flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 block">Navigation</span>
                                <div className="flex flex-col">
                                    <DropdownNavLink href="/browse" label="Browse Marketplace" onClick={() => setIsMenuOpen(false)} />
                                    <DropdownNavLink href={sellerHref} label={sellerText} onClick={() => setIsMenuOpen(false)} />
                                    <DropdownNavLink href="/library" label="My Library" onClick={() => setIsMenuOpen(false)} />
                                </div>
                                {/* Mobile Auth in Dropdown */}
                                {!isDesktop && (
                                    <div className="mt-8 pt-8 border-t border-white/5">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 block mb-4">Account</span>
                                        <AuthButtons isMobile={true} />
                                    </div>
                                )}
                            </div>

                            {/* Column 2: Spacer Gap 1 (Only on desktop) */}
                            {isDesktop && <div onClick={(e) => e.stopPropagation()} />}

                            {/* Column 3: Product Categories (Center, 6 cols) */}
                            <div
                                className="flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 block">Categories</span>
                                <div className="flex flex-col">
                                    <DropdownCategoryLink href="/browse?category=AI Prompts" label="AI Prompts" count="1,248" onClick={() => setIsMenuOpen(false)} />
                                    <DropdownCategoryLink href="/browse?category=Figma Kits" label="Figma Kits" count="482" onClick={() => setIsMenuOpen(false)} />
                                    <DropdownCategoryLink href="/browse?category=Notion" label="Notion Templates" count="956" onClick={() => setIsMenuOpen(false)} />
                                    <DropdownCategoryLink href="/browse?category=Ebooks" label="Ebooks & Guides" count="164" onClick={() => setIsMenuOpen(false)} />
                                </div>
                            </div>

                            {/* Column 4: Spacer Gap 2 (Only on desktop) */}
                            {isDesktop && <div onClick={(e) => e.stopPropagation()} />}

                            {/* Column 5: Account widget (Far Right, 2 cols) */}
                            {isDesktop && (
                                <div
                                    className="flex flex-col"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 block">Account</span>
                                    <div className="flex flex-col gap-4 py-2">
                                        {isLoaded && isSignedIn && user ? (
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center gap-3">
                                                    <AuthButtons />
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-sm font-light text-zinc-200 truncate">
                                                            {user.fullName || user.username || 'User Profile'}
                                                        </span>
                                                        <span className="text-xs font-light text-zinc-500 truncate">
                                                            {user.primaryEmailAddress?.emailAddress}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="h-px bg-white/5 w-full my-1" />
                                                <Link href="/library" onClick={() => setIsMenuOpen(false)} className="text-sm font-light text-zinc-500 hover:text-zinc-200 transition-colors">
                                                    Manage Assets
                                                </Link>
                                                <Link href={sellerHref} onClick={() => setIsMenuOpen(false)} className="text-sm font-light text-zinc-500 hover:text-zinc-200 transition-colors">
                                                    Creator Dashboard
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-4">
                                                <span className="text-xs font-light text-zinc-500 leading-relaxed">
                                                    Sign in to access your library, dashboard, and settings.
                                                </span>
                                                <AuthButtons />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Click Outside Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-300"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Search Modal */}
            {isSearchOpen && (
                <div className="sm:hidden fixed inset-0 z-50 bg-zinc-950 flex flex-col animate-in slide-in-from-bottom duration-300">
                    <div className="p-4 border-b border-white/5 flex items-center gap-3">
                        <div className="flex-1"><SearchBar onQueryChange={setSearchQuery} /></div>
                        <button onClick={() => setIsSearchOpen(false)} className="w-11 h-11 flex items-center justify-center bg-zinc-900 rounded-full text-zinc-400"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        {searchQuery.length >= 2 ? (
                            <LiveSearchResults query={searchQuery} onResultClick={() => setIsSearchOpen(false)} />
                        ) : (
                            <div className="space-y-8 mt-4">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 text-center">Explore Categories</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {['AI Prompts', 'Figma Kits', 'Notion', 'Ebooks'].map(cat => (
                                        <Link key={cat} href={`/browse?category=${cat}`} onClick={() => setIsSearchOpen(false)} className="p-4 bg-zinc-900 border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3 group">
                                            <LayoutGrid className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                                            <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{cat}</span>
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

function DropdownNavLink({ href, label, onClick }: { href: string, label: string, onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="w-full py-4 border-b border-white/5 transition-all duration-300 flex justify-between items-center group text-zinc-500 hover:text-zinc-200"
        >
            <span className="text-sm sm:text-base tracking-wide transition-colors font-light">
                {label}
            </span>
            <ChevronRight className="w-4 h-4 text-zinc-600 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
        </Link>
    );
}

function DropdownCategoryLink({ href, label, count, onClick }: { href: string, label: string, count: string, onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="w-full py-4 border-b border-white/5 transition-all duration-300 flex justify-between items-center group text-zinc-300 hover:text-white"
        >
            <span className="text-sm sm:text-base tracking-wide font-light">
                {label}
            </span>
            <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors font-light">
                    {count}
                </span>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-all duration-300 opacity-30 group-hover:opacity-100 group-hover:translate-x-1" />
            </div>
        </Link>
    );
}
