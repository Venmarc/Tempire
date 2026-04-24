'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const CATEGORIES = [
    { label: 'All', value: '' },
    { label: 'AI Prompts', value: 'AI Prompts' },
    { label: 'Notion Templates', value: 'Notion Templates' },
    { label: 'Figma UI Kits', value: 'Figma UI Kits' },
    { label: 'Ebooks', value: 'Ebooks' },
    { label: 'Icons', value: 'Icons' },
    { label: 'Other', value: 'Other' },
];

export function CategoryFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const active = searchParams.get('category') || '';

    const setCategory = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set('category', value);
        } else {
            params.delete('category');
        }
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map(({ label, value }) => (
                <button
                    key={value || 'all'}
                    onClick={() => setCategory(value)}
                    className={`shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 border ${
                        active === value
                            ? 'bg-white text-black border-white'
                            : 'bg-transparent text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
