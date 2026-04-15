import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
    return (
        <div className="group relative bg-zinc-900 rounded-3xl overflow-hidden border border-white/10">
            {/* Image skeleton with shimmer */}
            <div className="relative aspect-4/3 bg-zinc-800 overflow-hidden">
                <Skeleton className="absolute inset-0 w-full h-full" />
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            </div>

            {/* Content skeleton */}
            <div className="p-5">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/2 mb-4" />

                <div className="flex justify-between items-end">
                    <Skeleton className="h-7 w-20" />
                    <Skeleton className="h-9 w-24 rounded-2xl" />
                </div>
            </div>
        </div>
    );
}