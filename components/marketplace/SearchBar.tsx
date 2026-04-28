'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    onQueryChange?: (query: string) => void;
}

export function SearchBar({ onQueryChange }: SearchBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get('search') || '');

    // Sync input value with URL search params when they change (e.g. Back button or external clear)
    useEffect(() => {
        const urlSearch = searchParams.get('search') || '';
        if (urlSearch !== value) {
            setValue(urlSearch);
        }
    }, [searchParams]);

    // Update parent logic (mobile modal results)
    useEffect(() => {
        onQueryChange?.(value);
    }, [value, onQueryChange]);

    // Debounce internal value to URL
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentUrlSearch = searchParams.get('search') || '';
            if (value !== currentUrlSearch) {
                const params = new URLSearchParams(searchParams.toString());
                if (value) {
                    params.set('search', value);
                } else {
                    params.delete('search');
                }
                params.delete('page');
                router.push(`${pathname}?${params.toString()}`, { scroll: false });
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [value, pathname, router]); // Decoupled from searchParams to prevent flicker loops

    return (
        <div className="relative w-full transition-all duration-300 ease-in-out group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white pointer-events-none transition-colors" />
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search premium assets..."
                className="w-full h-14 pl-14 pr-12 bg-zinc-900 border border-white/5 rounded-full text-base text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-zinc-900 transition-all duration-500 shadow-2xl focus:shadow-emerald-500/5 ring-0 focus:ring-4 focus:ring-white/5"
            />
            {value && (
                <button
                    onClick={() => { setValue(''); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-all"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
