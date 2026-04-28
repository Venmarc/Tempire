import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailSkeleton() {
    return (
        <div className="pt-24 md:pt-32 min-h-screen">
            <main className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
                
                {/* Breadcrumbs Skeleton */}
                <div className="flex items-center gap-2 mb-8">
                    <Skeleton className="h-4 w-32 bg-zinc-800" />
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                    <Skeleton className="h-4 w-24 bg-zinc-800" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Column: Gallery & Details */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Title Section */}
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-3/4 bg-zinc-800 rounded-2xl" />
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-6 h-6 rounded-full bg-zinc-800" />
                                    <Skeleton className="h-4 w-24 bg-zinc-800" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-4 h-4 bg-zinc-800" />
                                    <Skeleton className="h-4 w-12 bg-zinc-800" />
                                </div>
                            </div>
                        </div>

                        {/* Image Gallery Skeleton */}
                        <div className="aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 relative">
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                        </div>

                        {/* About/Description Skeleton */}
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-48 bg-zinc-800" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full bg-zinc-800" />
                                <Skeleton className="h-4 w-full bg-zinc-800" />
                                <Skeleton className="h-4 w-2/3 bg-zinc-800" />
                            </div>
                        </div>

                        {/* Tech Specs Skeleton */}
                        <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-3 w-16 bg-zinc-800" />
                                    <Skeleton className="h-5 w-24 bg-zinc-800" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Sticky Purchase Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 space-y-6">
                            <Skeleton className="h-10 w-32 bg-zinc-800" />
                            <Skeleton className="h-14 w-full bg-emerald-500/20 rounded-2xl" />
                            <div className="space-y-3 pt-4 border-t border-white/10">
                                <Skeleton className="h-4 w-full bg-zinc-800" />
                                <Skeleton className="h-4 w-full bg-zinc-800" />
                                <Skeleton className="h-4 w-2/3 bg-zinc-800" />
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
