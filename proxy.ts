import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isSellerRoute = createRouteMatcher([
    '/seller/dashboard(.*)',
    '/seller/upload(.*)',
    '/seller/edit(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    try {
        if (isSellerRoute(req)) {
            const authObj = await auth();
            
            if (!authObj.userId) {
                console.log(`📡 Middleware: Unauthenticated user on seller route ${req.nextUrl.pathname}. Redirecting...`);
                return authObj.redirectToSignIn({ returnBackUrl: req.url });
            }

            const role = authObj.sessionClaims?.role as string | undefined;

            if (role !== 'seller') {
                console.log(`🚫 Middleware: Access denied for ${authObj.userId} on ${req.nextUrl.pathname} (role: ${role || 'none'})`);
                return Response.redirect(new URL('/', req.url));
            }

            console.log(`✅ Middleware: Seller access granted for ${authObj.userId} on ${req.nextUrl.pathname}`);
        }
    } catch (error: any) {
        console.error(`❌ Middleware Error on ${req.nextUrl.pathname}:`, error.message);
        // On error, we generally want to let the request proceed and have the page handle it,
        // unless it's a security-critical failure.
    }
});

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico).*)',
        '/',
        '/(api|trpc)(.*)',   // ← This was the broken line. Fixed.
    ],
};