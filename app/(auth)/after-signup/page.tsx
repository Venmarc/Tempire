import { redirect } from 'next/navigation';
import { ensureProfile } from '@/server/actions/auth';
import { currentUser } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export default async function AfterSignupPage() {
    const clerkUser = await currentUser();
    if (!clerkUser) {
        console.log('AfterSignup: No clerkUser found — redirecting');
        redirect('/');
    }

    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
        try {
            console.log(`AfterSignup: Sync attempt ${attempts + 1} for user ${clerkUser.id}`);
            await ensureProfile();
            console.log('AfterSignup: Profile synced successfully');
            break;
        } catch (err: any) {
            attempts++;
            console.error(`AfterSignup: Attempt ${attempts} failed:`, err.message);
            if (attempts >= maxAttempts) {
                console.error('AfterSignup: All retry attempts failed');
            } else {
                // Small delay to let Clerk session propagate
                await new Promise(resolve => setTimeout(resolve, 400));
            }
        }
    }

    redirect('/');
}