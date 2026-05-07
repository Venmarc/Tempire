import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isSellerRoute = createRouteMatcher([
    '/seller/dashboard(.*)',
    '/seller/upload(.*)',
    '/seller/edit(.*)',
]);

const isOnboardRoute = createRouteMatcher(['/seller/onboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
    // Only intercept for protected routes
    if (isSellerRoute(req)) {
        const authObj = await auth();
        
        // 1. Force Sign-in if not logged in
        if (!authObj.userId) {
            return authObj.redirectToSignIn({ returnBackUrl: req.url });
        }

        // 2. Role-based access (Sellers only)
        const role = authObj.sessionClaims?.role as string | undefined;
        if (role !== 'seller') {
            return Response.redirect(new URL('/', req.url));
        }
    }

    if (isOnboardRoute(req)) {
        const authObj = await auth();
        
        if (!authObj.userId) {
            return authObj.redirectToSignIn({ returnBackUrl: req.url });
        }

        const role = authObj.sessionClaims?.role as string | undefined;
        if (role === 'seller') {
            return Response.redirect(new URL('/seller/dashboard', req.url));
        }
    }
});

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico).*)',
        '/',
        '/(api|trpc)(.*)',
    ],
};
