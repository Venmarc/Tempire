'use client';

import { useEffect, useState } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ensureProfile } from '@/server/actions/auth';

export default function AfterSignupPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();
    const [status, setStatus] = useState('Syncing profile...');

    useEffect(() => {
        if (!isLoaded) return;

        const syncProfile = async () => {
            if (!isSignedIn || !user) {
                router.push('/');
                return;
            }

            try {
                await ensureProfile();
                setStatus('Profile synced successfully!');
                // Small delay so user sees success
                setTimeout(() => {
                    router.push('/');
                }, 800);
            } catch (err: any) {
                console.error('ensureProfile failed:', err);
                setStatus(`Sync failed: ${err.message}`);
                // Still redirect after error
                setTimeout(() => router.push('/'), 1500);
            }
        };

        syncProfile();
    }, [isLoaded, isSignedIn, user, router]);

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
            <div className="text-center">
                <p className="text-2xl mb-4">{status}</p>
                <p className="text-zinc-500">This should only take a moment...</p>
            </div>
        </div>
    );
}