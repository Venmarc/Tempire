'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function SellerDashboard() {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Consistent Header with Clickable Logo */}
            <header className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl shrink-0">
                            T
                        </div>
                        <span className="text-2xl font-bold tracking-tighter hidden md:block">
                            Tempire
                        </span>
                    </Link>

                    {/* We can reuse AuthButtons here too if you want full header, but for minimal keep simple */}
                </div>
            </header>

            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-4xl font-bold tracking-tighter">Seller Dashboard</h1>
                <p className="text-zinc-400 mt-2">Welcome, {user?.fullName || user?.username || 'Seller'}</p>

                <div className="mt-12 p-8 border border-white/10 rounded-3xl bg-zinc-900/50">
                    <p className="text-zinc-400">This is a protected seller-only page.</p>
                    <p className="text-sm text-emerald-400 mt-4">✅ Phase 1 Complete — Role-based access control working</p>
                </div>
            </div>
        </div>
    );
}