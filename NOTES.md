# Future Changes & Minor Bugs

## Seller Tools / Product View Refinements
![Seller Tools Critique](public/screenshots/seller-tools-critique.png)

### Branding
- **Logo**: ![Tempire Logo](/logo.svg) (Tempo.svg - Dynamic Purple/White vector)

### Thoughts & Observations
- **Edit Product Button**: Looks weird, not sitting properly in the layout. Needs better positioning/sizing.
- **Download Button**: Currently opens the Supabase file URL in the browser.
    - *Problem*: Doesn't force a download to the PC.
    - *Goal*: Implement a "Force Download" behavior for a more premium experience.
    - *Technical Solution*: Implement a Next.js proxy route to fetch the file and set the `Content-Disposition: attachment` header, or update Supabase Storage metadata to enforce `attachment`.
- **Copy/Naming**:
    - "Seller Tools" and "Your Product" headers feel generic. Need better, more professional naming.
    - "Seller Tools" area needs a better conceptual name for the entire section.
- **Layout Logic**:
    - "Total Views" should probably be part of the main `Product View` area.
    - *Challenge*: Removing it leaves the "Seller Tools" sidebar vacant. Need to identify higher-value seller actions or stats to fill this space.
- **Overall**: The "Seller Tools" area needs a functional and aesthetic overhaul to feel integrated and "premium".

## Future Seller Onboarding (Hybrid Approach)
- **MVP**: Instant approval upon form submission.
- **Phase 5/6**: Add a "Pending Review" status + email notification to admin.
- **Future**: Full approval workflow + Stripe identity verification (necessary when real payouts are integrated or taking commissions).
- **Post-Onboard Action**: Send an automated welcome email to new sellers upon successful onboarding.

## Phase 3: Cart & Checkout (Completed)
- **Step 1**: Zustand Cart Store & Logic. (Done)
- **Step 2**: Add to Cart on Product Cards. (Done)
- **Step 3**: Add to Cart on Product Detail Page. (Done)
- **Step 4**: CartDropdown (Popover) visual polish & compaction. (Done)
- **Step 5**: Mock Checkout Flow (Two-column layout). (Done)
- **Step 6**: Server Action for Orders + Success Page. (Done)

## Checkout & Post-Purchase UX
- **Library Page**: "Go To My Downloads" should point to a new `/library` or `/purchases` page that lists all products the user has bought, rather than the seller dashboard.
- **Instant Access**: Consider adding an "Open/Download Now" button directly on the success page for the items just purchased.
- **Order Details**: Success page could show a mini-receipt of the items just bought.

## Design Discrepancy: 100% vs 80% Zoom
- **Observation**: Designing at 80% zoom makes things feel "right" (dense/premium) to the developer, but oversized at 100% for the user.
- **Root Cause**: Likely the default Tailwind spacing/font-size scale and container `max-w` values being slightly too generous for a high-density Cineby-style aesthetic.
- **Proposed Solution**: 
    - Investigate reducing root font-size (e.g., `html { font-size: 90% }`).
    - Standardize on narrower containers (e.g., `max-w-5xl` instead of `max-w-7xl` where appropriate).
    - Use tighter spacing utilities (`p-4` instead of `p-6`) as a default rule.

## UX & Performance Testing Observations (Incognito/Guest)
*These observations were gathered from extensive manual testing with stopwatches in incognito mode.*

### 1. Clerk Authentication Performance
- **Observation**: Initial load of the Clerk signup page via redirect (e.g., trying to access `/seller/dashboard` as a guest) takes an extremely long time (up to 60s) on the first hit. Subsequent loads are faster (cached).
- **Analysis**: This massive delay is primarily an artifact of the **Development Environment** (`next dev --webpack` or Turbopack). Next.js compiles routes and middleware on demand. When hitting a protected route, it compiles the middleware, triggers a redirect, and then compiles the Clerk UI components.
- **Proposed Fix**: In production (`tempire.xyz`), Next.js pre-compiles routes and middleware runs on the Edge, which will drastically reduce this to milliseconds. For dev, we can verify Clerk is updated, but we shouldn't over-optimize dev-only compile times.

### 2. Missing Onboarding for Direct Seller Access
- **Observation**: If a guest tries to visit `/seller/dashboard` directly, they are forced to sign up. After signing up, they are a "buyer" by default, so they are redirected to `/` instead of the onboarding flow. They miss the onboarding entirely.
- **Proposed Fix**: Update `proxy.ts`. If an authenticated user without the `seller` role attempts to access `isSellerRoute` (like `/seller/dashboard`), instead of redirecting them to the homepage (`/`), redirect them to `/seller/onboard`.

### 3. Dedicated Auth Routes (`/signin`, `/signup`) & 404 Pages
- **Observation**: Manually visiting `localhost:3000/signin` or `/signup` throws a 404. Furthermore, the 404 page includes the full Navigation, Search, and Footer, which feels unpolished for a premium site.
- **Proposed Fixes**: 
    1. **Auth Routes**: Create dedicated `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx` routes using Clerk's embeddable components so users have a clean URL to visit.
    2. **404 Clean-up**: We can create a Route Group (e.g., `app/(main)`) and move `layout.tsx` (with Nav/Footer) inside it. Then, put `not-found.tsx` at the root so it renders completely blank/custom without the standard site chrome.

### 4. Sign-Out UX
- **Observation**: Clicking sign out takes ~5 seconds with zero visual feedback (no loading spinner), leaving the user wondering if it worked.
- **Proposed Fix**: Wrap the Clerk `<SignOutButton>` in a custom component that intercepts the click, sets an `isSigningOut` state, and displays a spinner or a toast notification ("Signing out...") while the process completes.

### 5. Guest Cart & Wishlist Behavior
- **Observation**: Guests can add to Cart, but adding to Wishlist prompts a sign-in.
- **Analysis**: This is actually **perfect** e-commerce behavior. Allowing guest carts reduces friction, and gating the wishlist encourages account creation. No fix needed; this is working as intended.

### 6. Visual Discrepancies
- **Product Card Sizes**: Top row and bottom row cards have different heights. 
    - *Fix*: Enforce a strict aspect ratio for the image and `h-full` or `line-clamp` for the text content so all cards align perfectly in the grid.
- **Add to Cart Button Color**: The `bg-emerald-500` is too bright and causes eye strain compared to the darker hover text colors.
    - *Fix*: Darken the button background (e.g., `bg-emerald-600` or custom hex) to match the exact shade of the product text on hover.
- **Footer Text**: Needs to be updated to match the new brand message.
    - *Fix*: Change from "Phase 2I..." to "© 2026 Tempire ~ Where Ideas Become Assets." in `Footer.tsx`.

## 7. Future Layout & Routing
- **Landing Page vs. Homepage**: 
    - We need a dedicated landing page where new visitors can learn about the app and sign up without fluff.
    - If the browser remembers the session/user (authenticated), navigating to the root URL should seamlessly load the marketplace Homepage.

## 8. UI/UX & Feature Backlog
- **Floating Nav Bar Overhaul**:
    - *Behavior*: Make it zone out/transparent near the footer, or slide off-screen with a toggle arrow.
    - *Aesthetics*: Too chunky and flat. Reduce height to ~60-68px. Use a translucent dark background (e.g., `rgba(0,0,0,0.85)`) with backdrop blur and subtle drop shadow.
    - *Icons/Layout*: Ensure even distribution (min 48px touch targets). Make icon stroke weights consistent. Enlarge profile avatar. Fix the inconsistent active state (ditch the bright white circle, use a subtle pill or color/icon change).
    - *Safe Area*: Add `env(safe-area-inset-bottom)` to prevent collisions with iOS home indicator.
- **Wishlist Cards**: Currently too large. Resize them to be smaller than product cards but larger than cart dropdown items (closer to seller dashboard product card size).
- **Category Pills**: Clicking a category pill pushes the viewport to the hero section. Update logic to maintain scroll position near the product grid.
- **Spacing Optimization**: Reduce excessive padding/margins around 'Featured Products', 'Filter', and 'Categories'.
- **Hero Typography**: The hero text spans 5 lines. Adjust font size/leading to reduce vertical space footprint.
- **Favicon**: Ensure the logo remains white in browser tabs on desktop (investigate dark/light mode SVG favicon support).
- **SEO Strategy**: Add essential meta keywords and ensure the landing page contains highly relevant content (no fluff).
- **Seller Dashboard Mobile**: The '+ Upload New Product' button overflows. Change text to '+ New Product' and reduce size strictly for mobile view.
# 9. Phase 4 Pivot & Product Journey (May 10, 2026)

### Strategic Pivot
- **Decision**: Pausing Landing Page SEO and Marketing Context tasks.
- **Rationale**: We cannot sell tickets to a movie that hasn't been filmed. The core product journey (**Buy → Own → Download**) must be robust and 100% functional before focusing on discoverability.
- **Immediate Goal**: Complete Phase 4 (Fulfillment & Buyer Library) to ensure users can access their assets securely.
- **Marketing Context**: We will return to finalize `.agents/product-marketing-context.md` once the library flow is stable.

### Future Monetization Ideas (Post-Traction)
- **Current Focus**: One-time payments (ideal for early growth).
- **Future Expansion**:
    - **Recurring Payments**: Subscription models for specific high-value product types:
        - Monthly Prompt Packs / AI Tool Access.
        - Notion Template Subscriptions (with regular updates).
        - Membership / Community Access.
        - SaaS-style utility tools.
    - **Hybrid Pricing**: Support for both One-time and Subscription products in the same marketplace.
    - **Tiered Pricing**: E.g., Basic (One-time) vs. Pro (Subscription).
