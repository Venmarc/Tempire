import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isSellerRoute = createRouteMatcher([
    '/seller/dashboard(.*)',
    '/(protected)/seller(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    if (isSellerRoute(req)) {
        const authObj = await auth();
        
        if (!authObj.userId) {
            // Manually redirect to sign-in smoothly instead of throwing an error back to Next.js
            return authObj.redirectToSignIn({ returnBackUrl: req.url });
        }

        const role = authObj.sessionClaims?.role as string | undefined;

        if (role !== 'seller') {
            console.log(`🚫 Access denied: user ${authObj.userId || 'unknown'} (role: ${role || 'none'})`);
            return Response.redirect(new URL('/', req.url));
        }

        console.log(`✅ Seller access granted for user ${authObj.userId} (role: ${role})`);
    }
});

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico).*)',
        '/',
        '/(api|trpc)(.*)',   // ← This was the broken line. Fixed.
    ],
};