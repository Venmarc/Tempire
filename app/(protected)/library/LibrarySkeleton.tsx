import { Skeleton } from '@/components/ui/skeleton';

export function LibrarySkeleton() {
    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Section Skeleton */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="w-11 h-11 rounded-2xl bg-white/5" />
                            <Skeleton className="w-24 h-4 rounded-md bg-white/5" />
                        </div>
                        <Skeleton className="h-16 w-3/4 max-w-md bg-white/5 rounded-2xl" />
                        <Skeleton className="h-6 w-full max-w-xl bg-white/5 rounded-xl mt-4" />
                        <Skeleton className="h-6 w-2/3 max-w-sm bg-white/5 rounded-xl" />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Tab Switcher Skeleton */}
                        <Skeleton className="h-14 w-full sm:w-64 rounded-3xl bg-white/5" />
                        {/* Search Bar Skeleton */}
                        <Skeleton className="h-14 w-full sm:w-72 rounded-3xl bg-white/5" />
                    </div>
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="bg-zinc-900 border border-white/5 rounded-[1.5rem] overflow-hidden flex flex-col h-auto">
                            {/* Image Placeholder */}
                            <Skeleton className="w-full aspect-[4/3] rounded-none bg-white/5" />
                            
                            {/* Info Container */}
                            <div className="p-5 flex flex-col grow">
                                <Skeleton className="h-5 w-3/4 mb-1.5 bg-white/5 rounded-lg" />
                                <Skeleton className="h-3 w-1/2 mb-6 bg-white/5 rounded-md" />
                                <div className="mt-auto pt-5 border-t border-white/5 grid grid-cols-1 gap-2">
                                    <Skeleton className="h-10 w-full rounded-xl bg-white/5" />
                                    <Skeleton className="h-10 w-full rounded-xl bg-white/5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
