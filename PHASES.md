# PHASES.md

**Phase 1: Authentication & Role-Based Access Control (RBAC)**

Completed: April 2026

## Overview
Phase 1 established a solid, production-grade authentication foundation using Clerk + Supabase with strict RBAC (buyer/seller roles).

## What Was Built
- Full Clerk integration (`@clerk/nextjs`) with modal Sign In / Sign Up flows
- Custom Session Token for reliable role propagation (`sessionClaims.role`)
- Server-only Supabase client
- `profiles` table + webhook handler (`app/api/webhooks/clerk/route.ts`) for `user.created` / `user.updated`
- Middleware protection via `proxy.ts` (Next.js 16+ compatible)
- Seller-only route protection under `(protected)/seller/*`
- `AuthButtons.tsx` with proper loading skeleton and `UserButton`
- Consistent 80% Shift layout and dark mode

## Key Fixes Implemented
- Flaky role sync → Solved with Custom Session Token instead of `publicMetadata` alone
- Webhook forcing default 'buyer' role → Fixed by reading role from Clerk payload
- "role: none" bugs → Resolved via custom claims in JWT
- Middleware deprecation + immutable redirect issues → Migrated to `proxy.ts`
- Avatar flash → Replaced with proper `Suspense`-friendly skeleton

## Phase 1 Success Criteria Met
- [x] Reliable Clerk ↔ Supabase profile sync
- [x] Seller role protection via middleware
- [x] Clean header navigation + auth controls
- [x] All DB operations server-side only
- [x] Stable foundation with no critical errors

**Phase 1 Complete.**

---

**Phase 2: Products Foundation & Marketplace (In Progress)**

**Current Phase Status:** Phase 2A Completed | Moving into Phase 2C (Seller Product Upload)

**Last Updated:** April 2026

## Overview
Phase 2 focuses on building the core marketplace experience: products table, buyer-facing product grid, and seller upload flow. Emphasis on real data, server-side only operations, RLS, proper pricing, and production-grade UI patterns.

## What Was Built in Phase 2A (Products Foundation)

### Database & Services
- `products` table with proper schema:
  - `price` stored in cents (integer)
  - `creator_id` as `text` (to match Clerk user IDs)
  - `is_published` flag
  - Support for `image_url`, `file_url`, `category`, `tags`, etc.
- RLS policies: Public read for published products, creator-only write
- `ProductService` with `getProducts()` (server-side Supabase query + graceful fallback if table missing)
- `types/product.ts` + `ProductsResponse` type

### Buyer Marketplace (Homepage)
- Homepage (`app/page.tsx`) converted to real marketplace with Featured Products grid
- `ProductCard.tsx`, `ProductGrid.tsx`, `ProductCardSkeleton.tsx`
- Suspense + shimmer skeleton loaders on initial load/hard refresh
- Dynamic product count display
- Proper price formatting ($XX.XX)
- Next.js Image configured for external domains (currently using picsum.photos)

### Key Decisions & Constraints Enforced
- Server Components by default, all DB operations server-side only
- No client-side Supabase queries (ever)
- Price in cents to avoid floating-point issues
- `creator_id` as text to match Clerk `user_XXXX` format
- Happy path + basic error handling + graceful fallbacks first
- Always run with `npm run dev -- --webpack` (Turbopack disabled for stability)
- Maintain 80% Shift centered layout + shadcn/ui patterns
- Test data inserted (4 visible products on homepage)

### Supabase Storage Preparation (Recent)
- Created two dedicated buckets:
  - `product-images` (public read for cover images)
  - `product-files` (strictly private — no public read, signed URLs planned)
- Storage policies applied with `DROP POLICY IF EXISTS` to prevent duplicate name errors (42710)
- Policies support authenticated uploads and proper public/private separation

## Current State at End of Phase 2A
- Homepage renders cleanly as a functional marketplace with real Supabase products
- Product grid uses real data, skeletons, and correct formatting
- Clerk RBAC fully stable (seller routes protected)
- No blocking issues
- Minor UI polish (spacing, hover effects, empty state) deferred

## Issues Encountered & Resolved
- Initial table missing → Graceful empty state in `ProductService.getProducts()`
- Price formatting precision → Solved by storing in cents
- Clerk ID compatibility → `creator_id` changed to `text`
- Turbopack instability → Forced Webpack in dev command

## Phase 2A Success Criteria Met
- [x] Products table + RLS
- [x] Working server-side `ProductService.getProducts()`
- [x] Functional product grid on homepage with skeletons
- [x] Proper pricing and dynamic count
- [x] Storage buckets + basic policies ready for uploads
- [x] All operations remain server-side only

**Phase 2A Complete.**

### Next: Phase 2C — Seller Product Upload Form
**Goal:** Build dedicated seller upload page (`/seller/upload` or similar) with:
- Zod-validated form (title, description, price, category, tags, cover image, downloadable file)
- Drag & drop + live preview for images
- Server Action calling extended `ProductService`
- Image upload to `product-images`, file upload to `product-files`
- `createProduct()` with correct `creator_id` from `currentUser()`
- Basic success/error states + draft vs publish

**Current Blockers Resolved:** Storage buckets and policies now in place.

## Phase 2 Overall Plan (Remaining)
- Extend `ProductService` with upload + create methods
- Build seller upload form (Zod + Server Action)
- Basic seller dashboard overview
- Product detail page + dynamic OG images (later)
- Testing with both published/unpublished products

**Important Notes for Continuation**
- Keep changes small and require manual testing before next step
- Use existing `ProductService` pattern for all product operations
- Reference PROJECT.md, AGENTS.md, CONSTITUTION.md, and DECISIONS.md in every session
- Maintain production mindset — everything must feel shippable

**Phase 2 In Progress.**