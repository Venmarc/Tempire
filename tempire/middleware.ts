import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/(protected)/seller(.*)',
]);

const isSellerRoute = createRouteMatcher([
    '/(protected)/seller(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth();

    // Basic protection for all protected routes
    if (isProtectedRoute(req)) {
        if (!userId) {
            return auth().redirectToSignIn();
        }
    }

    // Seller-only routes
    if (isSellerRoute(req)) {
        const role = (sessionClaims?.publicMetadata as any)?.role as string | undefined;

        if (role !== 'seller') {
            console.log(`Access denied: user ${userId} with role ${role} tried to access seller route`);
            // For now, redirect to home. Later we can show a nice "upgrade to seller" page
            return Response.redirect(new URL('/', req.url));
        }
    }
});

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)',
        '/',
        '/(api|trpc)(.*)',
    ],
};
// TODO: After profiles are synced, extend with role-based protection using Clerk publicMetadata
// Example: const role = auth().sessionClaims?.role as string | undefined;
// Then protect /dashboard/seller/* etc.