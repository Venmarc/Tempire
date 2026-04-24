'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ArrowUpDown } from 'lucide-react';

const SORT_OPTIONS = [
    { label: 'Newest', value: 'newest' },
    { label: 'Most Popular', value: 'popular' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
];

export function SortSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const active = searchParams.get('sort') || 'newest';

    const setSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', value);
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-zinc-500 pointer-events-none shrink-0" />
            <select
                value={active}
                onChange={(e) => setSort(e.target.value)}
                className="bg-zinc-900 border border-white/10 text-sm text-zinc-300 rounded-2xl px-3 py-2 pr-8 focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
            >
                {SORT_OPTIONS.map(({ label, value }) => (
                    <option key={value} value={value} className="bg-zinc-900">
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
}
