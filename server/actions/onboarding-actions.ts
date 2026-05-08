'use server';

import { currentUser, clerkClient } from '@clerk/nextjs/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { z } from 'zod';

const onboardingSchema = z.object({
    bio: z.string().max(500, "Bio must be 500 characters or less"),
    categories: z.array(z.string()).min(1, "Select at least one category"),
    termsAccepted: z.literal(true, {
        message: "You must accept the terms"
    })
});

export type OnboardingState = {
    error?: string;
    success?: boolean;
    fieldErrors?: {
        bio?: string[];
        categories?: string[];
        termsAccepted?: string[];
    };
};

export async function becomeSellerAction(
    prevState: OnboardingState,
    formData: FormData
): Promise<OnboardingState> {
    try {
        const user = await currentUser();
        if (!user) {
            return { error: 'Not authenticated' };
        }

        const role = user.publicMetadata?.role;
        if (role === 'seller') {
            return { error: 'You are already a seller' };
        }

        // Parse categories (might come as a stringified array if using a custom chip component, or multiple FormData entries)
        let categories: string[] = [];
        try {
            categories = JSON.parse(formData.get('categories') as string || '[]');
        } catch {
            categories = formData.getAll('category') as string[];
        }

        const validatedFields = onboardingSchema.safeParse({
            bio: formData.get('bio'),
            categories: categories,
            termsAccepted: formData.get('termsAccepted') === 'true',
        });

        if (!validatedFields.success) {
            return {
                fieldErrors: validatedFields.error.flatten().fieldErrors,
                error: 'Please fix the errors in the form'
            };
        }

        // 1. Update Clerk Role
        const client = await clerkClient();
        await client.users.updateUserMetadata(user.id, {
            publicMetadata: {
                ...user.publicMetadata,
                role: 'seller',
                onboardingData: validatedFields.data // Optional: store their onboarding info
            }
        });

        // 2. Update Supabase Role
        const serviceClient = createSupabaseServiceClient();
        const { error: supabaseError } = await serviceClient
            .from('profiles')
            .update({ 
                role: 'seller',
                updated_at: new Date().toISOString()
            })
            .eq('id', user.id);

        if (supabaseError) {
            console.error('Failed to update Supabase profile role:', supabaseError);
            // We don't fail the whole request because Clerk is the source of truth, 
            // but we should ideally handle this better in production.
        }

        return { success: true };

    } catch (error: any) {
        console.error('Onboarding error:', error);
        return { error: error.message || 'An unexpected error occurred' };
    }
}
