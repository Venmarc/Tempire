'use server';

import { currentUser } from '@clerk/nextjs/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

type ClerkUser = {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    username?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    public_metadata?: { role?: 'buyer' | 'seller' };
};

export async function ensureProfile() {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error('No authenticated user from Clerk');

    const primaryEmail = clerkUser.emailAddresses[0]?.emailAddress;
    if (!primaryEmail) throw new Error('No email address found');

    const role = (clerkUser.publicMetadata as any)?.role === 'seller' ? 'seller' : 'buyer';

    return upsertProfile({
        id: clerkUser.id,
        email: primaryEmail,
        username: clerkUser.username || `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null,
        role,
    });
}

export async function ensureProfileFromWebhook(clerkData: ClerkUser) {
    console.log('🔍 Webhook received for user:', clerkData.id);
    console.log('🔍 Public metadata in payload:', clerkData.public_metadata);

    const primaryEmail = clerkData.email_addresses?.[0]?.email_address;
    if (!primaryEmail) {
        console.warn('No email in webhook payload');
        return { success: false };
    }

    const roleFromClerk = (clerkData.public_metadata as any)?.role === 'seller' ? 'seller' : 'buyer';

    console.log(`📌 Role from webhook: ${roleFromClerk} for user ${clerkData.id}`);

    return upsertProfile({
        id: clerkData.id,
        email: primaryEmail,
        username: clerkData.username || `${clerkData.first_name || ''} ${clerkData.last_name || ''}`.trim() || null,
        role: roleFromClerk,
    });
}

async function upsertProfile(data: {
    id: string;
    email: string;
    username: string | null;
    role: 'buyer' | 'seller';
}) {
    const serviceClient = createSupabaseServiceClient();

    console.log(`💾 Upserting profile for ${data.id} → role: ${data.role}`);

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
        console.error('Supabase upsert error:', error);
        throw new Error(`Failed to upsert profile: ${error.message}`);
    }

    console.log(`✅ Profile upserted successfully for ${data.id} with role ${data.role}`);
    return { success: true, role: data.role };
}

// Optional helper for manual refresh (call from a protected page if needed)
export async function refreshUserRole() {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error('No user');

    const role = (clerkUser.publicMetadata as any)?.role === 'seller' ? 'seller' : 'buyer';

    const serviceClient = createSupabaseServiceClient();
    await serviceClient
        .from('profiles')
        .update({ role, updated_at: new Date().toISOString() })
        .eq('id', clerkUser.id);

    console.log(`🔄 Refreshed Supabase role to ${role} for ${clerkUser.id}`);
    return role;
}