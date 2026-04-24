'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get('search') || '');

    const updateSearch = useCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }
        params.delete('page'); // Reset to page 1 on new search
        router.push(`${pathname}?${params.toString()}`);
    }, [router, pathname, searchParams]);

    // Debounce: only fire after 350ms of inactivity
    useEffect(() => {
        const timer = setTimeout(() => {
            updateSearch(value);
        }, 350);
        return () => clearTimeout(timer);
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search products..."
                className="w-full h-11 pl-11 pr-10 bg-zinc-900 border border-white/10 rounded-2xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            {value && (
                <button
                    onClick={() => { setValue(''); updateSearch(''); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
