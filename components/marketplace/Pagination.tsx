import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    limit: number;
    searchParams: Record<string, string | undefined>;
}

export function Pagination({ currentPage, totalCount, limit, searchParams }: PaginationProps) {
    const totalPages = Math.ceil(totalCount / limit);

    if (totalPages <= 1) return null;

    const buildUrl = (page: number) => {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, val]) => {
            if (val && key !== 'page') params.set(key, val);
        });
        if (page > 1) params.set('page', String(page));
        const qs = params.toString();
        return qs ? `/?${qs}` : '/';
    };

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    // Build visible page numbers (up to 5 around current)
    const pages: number[] = [];
    const delta = 2;
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-16">
            {/* Previous */}
            {hasPrev ? (
                <Link
                    href={buildUrl(currentPage - 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-2xl border border-white/10 text-sm text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" /> Prev
                </Link>
            ) : (
                <span className="flex items-center gap-1 px-4 py-2 rounded-2xl border border-white/5 text-sm text-zinc-700 cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" /> Prev
                </span>
            )}

            {/* First page + ellipsis */}
            {pages[0] > 1 && (
                <>
                    <Link href={buildUrl(1)} className="w-10 h-10 flex items-center justify-center rounded-2xl border border-white/10 text-sm text-zinc-400 hover:text-white hover:border-white/30 transition-colors">1</Link>
                    {pages[0] > 2 && <span className="text-zinc-600 px-1">…</span>}
                </>
            )}

            {/* Page numbers */}
            {pages.map((page) => (
                <Link
                    key={page}
                    href={buildUrl(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-2xl text-sm border transition-colors ${
                        page === currentPage
                            ? 'bg-white text-black border-white font-semibold'
                            : 'border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                    }`}
                >
                    {page}
                </Link>
            ))}

            {/* Last page + ellipsis */}
            {pages[pages.length - 1] < totalPages && (
                <>
                    {pages[pages.length - 1] < totalPages - 1 && <span className="text-zinc-600 px-1">…</span>}
                    <Link href={buildUrl(totalPages)} className="w-10 h-10 flex items-center justify-center rounded-2xl border border-white/10 text-sm text-zinc-400 hover:text-white hover:border-white/30 transition-colors">{totalPages}</Link>
                </>
            )}

            {/* Next */}
            {hasNext ? (
                <Link
                    href={buildUrl(currentPage + 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-2xl border border-white/10 text-sm text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
                >
                    Next <ChevronRight className="w-4 h-4" />
                </Link>
            ) : (
                <span className="flex items-center gap-1 px-4 py-2 rounded-2xl border border-white/5 text-sm text-zinc-700 cursor-not-allowed">
                    Next <ChevronRight className="w-4 h-4" />
                </span>
            )}
        </div>
    );
}
