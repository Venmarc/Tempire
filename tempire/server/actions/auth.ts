'use server';

import { currentUser } from '@clerk/nextjs/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type Profile = {
    id: string;
    username: string | null;
    email: string;
    role: 'buyer' | 'seller';
    created_at: string;
    updated_at: string;
};

export async function ensureProfile() {
    const clerkUser = await currentUser();

    if (!clerkUser) {
        throw new Error('No authenticated user');
    }

    const { id: userId, emailAddresses, username, firstName, lastName } = clerkUser;
    const primaryEmail = emailAddresses[0]?.emailAddress;

    if (!primaryEmail) {
        throw new Error('No email address found');
    }

    const displayName = username || `${firstName || ''} ${lastName || ''}`.trim() || null;

    const serviceClient = createSupabaseServiceClient();

    // Idempotent upsert
    const { error } = await serviceClient
        .from('profiles')
        .upsert(
            {
                id: userId,
                username: displayName,
                email: primaryEmail,
                role: 'buyer' as const, // default for new users
                updated_at: new Date().toISOString(),
            },
            {
                onConflict: 'id',
                ignoreDuplicates: false,
            }
        );

    if (error) {
        console.error('ensureProfile error:', error);
        throw new Error(`Failed to create profile: ${error.message}`);
    }

    // Optional: Update Clerk metadata if we want to keep it in sync (minimal for now)
    // await clerkClient.users.updateUser(userId, { publicMetadata: { role: 'buyer' } });

    revalidatePath('/', 'layout'); // Clear any cached layouts that depend on profile

    return { success: true, role: 'buyer' as const };
}