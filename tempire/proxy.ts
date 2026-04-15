import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isSellerRoute = createRouteMatcher([
    '/seller/dashboard(.*)',
    '/(protected)/seller(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    if (isSellerRoute(req)) {
        const { userId } = await auth();

        if (!userId) {
            // Redirect to sign-in while preserving the original requested URL
            const signInUrl = new URL('/sign-in', req.url);  // or wherever your sign-in modal lands
            signInUrl.searchParams.set('redirect_url', req.url);
            return Response.redirect(signInUrl);
        }

        await auth.protect();

        const { sessionClaims } = await auth();
        const role = sessionClaims?.role as string | undefined;

        if (role !== 'seller') {
            console.log(`🚫 Access denied: user ${sessionClaims?.sub || 'unknown'} (role: ${role || 'none'})`);
            return Response.redirect(new URL('/', req.url));
        }

        console.log(`✅ Seller access granted for user ${sessionClaims?.sub} (role: ${role})`);
    }
});

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico).*)',
        '/',
        '/(api|trpc)(.*)',
    ],
};