'use server';

import { currentUser } from '@clerk/nextjs/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { clerkClient } from '@clerk/nextjs/server';

type ClerkUser = {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    username?: string | null;
    first_name?: string | null;
    last_name?: string | null;
};

export async function ensureProfile() {
    const clerkUser = await currentUser();
    if (!clerkUser) {
        throw new Error('No authenticated user from Clerk');
    }

    const primaryEmail = clerkUser.emailAddresses[0]?.emailAddress;
    if (!primaryEmail) {
        throw new Error('No email address found on Clerk user');
    }

    const displayName = clerkUser.username ||
        `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null;

    return upsertProfile({
        id: clerkUser.id,
        email: primaryEmail,
        username: displayName,
        role: 'buyer' as const,
    });
}

export async function ensureProfileFromWebhook(clerkData: ClerkUser) {
    const primaryEmail = clerkData.email_addresses?.[0]?.email_address;
    if (!primaryEmail) {
        console.warn('No email in webhook payload for', clerkData.id);
        return { success: false };
    }

    const displayName = clerkData.username ||
        `${clerkData.first_name || ''} ${clerkData.last_name || ''}`.trim() || null;

    return upsertProfile({
        id: clerkData.id,
        email: primaryEmail,
        username: displayName,
        role: 'buyer' as const,
    });
}

async function upsertProfile(data: {
    id: string;
    email: string;
    username: string | null;
    role: 'buyer' | 'seller';
}) {
    const serviceClient = createSupabaseServiceClient();

    const { error } = await serviceClient
        .from('profiles')
        .upsert(
            {
                id: data.id,
                username: data.username,
                email: data.email,
                role: data.role,
                updated_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
        );

    if (error) {
        console.error('Supabase upsert error for user', data.id, ':', error);
        throw new Error(`Failed to upsert profile: ${error.message}`);
    }

    // Sync role to Clerk publicMetadata (fixed for Clerk v7)
    try {
        const client = await clerkClient();
        await client.users.updateUser(data.id, {
            publicMetadata: {
                role: data.role,
            },
        });
        console.log(`Clerk publicMetadata updated: role=${data.role} for user ${data.id}`);
    } catch (err: any) {
        console.error('Failed to update Clerk publicMetadata:', err.message);
    }

    console.log('ensureProfile: Successfully upserted profile for', data.id, 'email:', data.email, 'role:', data.role);
    return { success: true, role: data.role };
}