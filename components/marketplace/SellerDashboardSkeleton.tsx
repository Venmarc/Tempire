import { Skeleton } from '@/components/ui/skeleton';

export function SellerDashboardSkeleton() {
    return (
        <div className="pt-24 md:pt-32 min-h-screen">
            <main className="max-w-5xl mx-auto px-6 pt-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-64 bg-zinc-800 rounded-2xl" />
                        <Skeleton className="h-6 w-96 bg-zinc-800 rounded-lg" />
                    </div>
                    <Skeleton className="h-14 w-48 bg-emerald-500/20 rounded-2x" />
                </div>

                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex items-center gap-6">
                            <Skeleton className="w-16 h-16 bg-zinc-800 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-6 w-1/3 bg-zinc-800" />
                                <Skeleton className="h-4 w-1/4 bg-zinc-800" />
                            </div>
                            <Skeleton className="h-8 w-24 bg-zinc-800" />
                            <div className="flex gap-2">
                                <Skeleton className="w-10 h-10 bg-zinc-800 rounded-xl" />
                                <Skeleton className="w-10 h-10 bg-zinc-800 rounded-xl" />
                                <Skeleton className="w-10 h-10 bg-zinc-800 rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
