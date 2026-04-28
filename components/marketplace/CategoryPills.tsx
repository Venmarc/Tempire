'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';

const CATEGORIES = [
    { label: 'All Projects', value: '' },
    { label: 'AI Prompts', value: 'AI Prompts' },
    { label: 'Notion Templates', value: 'Notion Templates' },
    { label: 'Figma UI Kits', value: 'Figma UI Kits' },
    { label: 'Ebooks', value: 'Ebooks' },
    { label: 'Icon Sets', value: 'Icons' },
    { label: 'Other', value: 'Other' },
];

export function CategoryPills() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const active = searchParams.get('category') || '';
    const scrollRef = useRef<HTMLDivElement>(null);

    const setCategory = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        // If clicking active pill or "All", clear it
        if (active === value || value === '') {
            params.delete('category');
        } else {
            params.set('category', value);
        }
        
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative group w-full mb-8">
            {/* Scroll Area */}
            <div 
                ref={scrollRef}
                className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none scroll-smooth relative"
            >
                {CATEGORIES.map(({ label, value }) => {
                    const isCurrent = active === value;
                    return (
                        <button
                            key={value || 'all'}
                            onClick={() => setCategory(value)}
                            className={cn(
                                "shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border",
                                isCurrent
                                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-[1.02]"
                                    : "bg-zinc-900/50 text-zinc-500 border-white/5 hover:border-white/10 hover:text-zinc-300"
                            )}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
            
            {/* Subtle Right Gradient Indicator */}
            <div className="absolute right-0 top-0 bottom-4 w-20 bg-linear-to-l from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none z-10" />
        </div>
    );
}
