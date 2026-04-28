import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
    return (
        <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden">
            {/* Image Area */}
            <div className="relative aspect-video bg-zinc-800">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4 bg-zinc-800 rounded-lg" />
                    <Skeleton className="h-4 w-1/2 bg-zinc-800 rounded-lg" />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-8 w-20 bg-zinc-800 rounded-xl" />
                    <Skeleton className="h-10 w-28 bg-zinc-800 rounded-2xl" />
                </div>
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}
