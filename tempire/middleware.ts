import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isSellerRoute = createRouteMatcher([
    '/seller/dashboard(.*)',
    '/(protected)/seller(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    if (isSellerRoute(req)) {
        // This will automatically redirect unauthenticated users to sign-in
        await auth.protect();

        // Role check for authenticated users
        const { sessionClaims } = await auth();
        const role = (sessionClaims?.publicMetadata as any)?.role as string | undefined;

        if (role !== 'seller') {
            console.log(`🚫 Access denied: user ${sessionClaims?.sub || 'unknown'} (role: ${role || 'none'}) tried seller route`);
            return Response.redirect(new URL('/', req.url));
        }

        console.log(`✅ Seller access granted for user ${sessionClaims?.sub}`);
    }
});

export const config = {
    matcher: [
        '/((?!.+\\.[\\w]+$|_next/static|_next/image|favicon.ico).*)',
        '/',
        '/(api|trpc)(.*)',
    ],
};