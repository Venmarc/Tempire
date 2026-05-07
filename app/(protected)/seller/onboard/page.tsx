import { Suspense } from 'react';
import { OnboardingForm } from './OnboardingForm';
import { Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

function OnboardingSkeleton() {
    return (
        <div className="space-y-12">
            <div className="space-y-4">
                <div className="flex justify-between">
                    <Skeleton className="h-4 w-48 bg-white/5" />
                    <Skeleton className="h-4 w-12 bg-white/5" />
                </div>
                <Skeleton className="h-32 w-full rounded-2xl bg-white/5" />
            </div>

            <div className="space-y-4">
                <Skeleton className="h-4 w-40 bg-white/5" />
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-24 rounded-xl bg-white/5" />
                    ))}
                </div>
            </div>

            <Skeleton className="h-24 w-full rounded-3xl bg-white/5" />
            <Skeleton className="h-14 w-full rounded-2xl bg-white/5" />
        </div>
    );
}

export default function OnboardPage() {
    return (
        <div className="min-h-screen bg-zinc-950 pt-32 pb-24 text-white">
            <div className="max-w-2xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                        <Sparkles className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter mb-4">
                        Become a Creator
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-md mx-auto font-medium">
                        Join the Tempire ecosystem. Turn your ideas into premium digital assets and start selling to our community.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-zinc-900/30 border border-white/5 p-8 sm:p-12 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10">
                        <Suspense fallback={<OnboardingSkeleton />}>
                            <OnboardingForm />
                        </Suspense>
                    </div>
                </div>

            </div>
        </div>
    );
}
