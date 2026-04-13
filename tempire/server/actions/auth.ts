'use server';

import { currentUser } from '@clerk/nextjs/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';

export async function ensureProfile() {
    const clerkUser = await currentUser();

    if (!clerkUser) {
        throw new Error('No authenticated user from Clerk');
    }

    const { id: userId, emailAddresses, username, firstName, lastName } = clerkUser;
    const primaryEmail = emailAddresses[0]?.emailAddress;

    if (!primaryEmail) {
        throw new Error('No email address found on Clerk user');
    }

    const displayName = username || `${firstName || ''} ${lastName || ''}`.trim() || null;

    const serviceClient = createSupabaseServiceClient();

    const { error } = await serviceClient
        .from('profiles')
        .upsert(
            {
                id: userId,
                username: displayName,
                email: primaryEmail,
                role: 'buyer' as const,
                updated_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
        );

    if (error) {
        console.error('ensureProfile Supabase error for user', userId, ':', error);
        throw new Error(`Failed to upsert profile: ${error.message}`);
    }
    // revalidatePath is safe here because this is a Server Action
    // but we'll call it from the page only if needed. For now, keep it.
    // revalidatePath('/', 'layout');

    console.log('ensureProfile: Successfully upserted profile for', userId, 'email:', primaryEmail);

    return { success: true, role: 'buyer' as const };
}