```markdown
# PHASE_1.md - Foundation Complete

**Phase 1: Authentication & Role-Based Access Control (RBAC)**

Completed: April 2026

## Overview
Phase 1 focused on building a solid, production-grade authentication foundation using Clerk + Supabase. The goal was to have reliable user management, role-based protection (buyer/seller), and clean middleware before moving into product features.

## What Was Built

### Core Authentication
- Clerk integration with modal Sign In / Sign Up flows
- Full integration with `@clerk/nextjs` v7
- Custom session token to reliably expose `role` in `sessionClaims`
- `AuthButtons.tsx` component with proper loading skeleton and UserButton avatar

### Supabase Integration
- Server-only Supabase client setup
- `profiles` table with role field
- Webhook handler (`app/api/webhooks/clerk/route.ts`) for `user.created` and `user.updated`
- Reliable profile creation and sync between Clerk and Supabase

### Role-Based Access Control (RBAC)
- Middleware protection using `proxy.ts` (Next.js 16 compatible)
- Seller-only routes under `(protected)/seller/*`
- Role stored in Clerk publicMetadata + injected into session token
- `auth.protect()` + manual role check for seller routes
- Graceful redirect for unauthorized users

### Key Fixes Implemented
- **Flaky role sync**: Fixed by using Custom Session Token in Clerk dashboard instead of relying only on publicMetadata propagation
- **Webhook issues**: Updated `ensureProfileFromWebhook` to respect role from Clerk payload instead of hardcoding 'buyer'
- **"role: none" bug**: Resolved by forcing role into JWT via custom claims
- **Immutable middleware error**: Cleaned up `proxy.ts` matcher and redirect logic
- **Avatar flash/delay**: Replaced hacky `useEffect` with proper skeleton using `useUser()` and `Suspense`-friendly pattern
- **Next.js 16 deprecation**: Migrated from `middleware.ts` to `proxy.ts`

### UI & Navigation
- Consistent clickable logo across header
- 80% Shift centered layout maintained
- Dark mode default with proper Tailwind/shadcn styling

## Important Decisions & Constraints Enforced
- All database operations remain server-side only (no client Supabase keys)
- Server Components by default, `'use client'` only when necessary
- Clerk as primary auth source of truth for roles
- Webhook + Supabase profiles as secondary mirror
- Small, testable steps with manual verification before proceeding
- Always run dev server with `npm run dev -- --webpack` (Turbopack disabled for stability)

## Current State at End of Phase 1
- Users can sign up / sign in via Clerk modal
- Seller role correctly protects `/seller/dashboard`
- Homepage renders cleanly with placeholder for future marketplace
- AuthButtons restored with proper loading states
- No more "role: none", immutable errors, or webhook failures
- Foundation is stable and production-grade

## Issues Encountered & Resolved
- PublicMetadata changes not reflecting immediately → Solved with Custom Session Token
- Webhook forcing 'buyer' role → Fixed by reading from Clerk payload
- Avatar flash on homepage → Replaced with proper skeleton
- Middleware deprecation + immutable redirect errors → Cleaned up `proxy.ts`
- Test data / role changes requiring full logout → Made reliable with session token

## Phase 1 Success Criteria Met
- [x] Reliable Clerk + Supabase user/profile sync
- [x] Working seller role protection via middleware
- [x] Clean, consistent header with auth controls
- [x] No critical console errors or crashes
- [x] Server-side only database operations
- [x] Foundation ready for product features

**Phase 1 Complete.**

Next phase will focus on products table, seller upload flow, and marketplace grid (already partially started in Phase 2B).
```