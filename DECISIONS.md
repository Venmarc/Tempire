```markdown
# DECISIONS.md - Key Architectural Decisions

**Project:** Tempire - Creator Marketplace  
**Last Updated:** April 2026

This document records major technical decisions made during development, the reasoning behind them, and alternatives considered.

## Authentication & User Management

### 1. Clerk as Primary Authentication Provider
**Decision:** Use Clerk for all authentication (sign up, sign in, sessions, user management).

**Why:**
- Excellent developer experience with modal flows and pre-built components
- Strong support for social providers (Google, etc.)
- Built-in webhook system for user events
- Reliable JWT/session management with custom claims
- Better security and rate limiting than rolling our own auth

**Alternative Considered:** Supabase Auth  
**Rejected because:** Clerk offers superior UX for modals and social login, and we wanted to keep Supabase strictly for data storage.

### 2. Webhooks for Profile Sync (Instead of after-signup redirect)
**Decision:** Use Clerk webhooks (`user.created` / `user.updated`) to sync user data to Supabase `profiles` table instead of redirect-based flow after sign-up.

**Why:**
- More reliable than redirect-based approaches (which often fail due to race conditions or network issues)
- Decouples auth flow from database writes
- Works consistently for both email/password and social sign-ups
- Allows Clerk to remain the source of truth for user metadata

**Alternative:** `/after-signup` route with manual profile creation  
**Rejected because:** Flaky, especially with social providers and page reloads.

### 3. Custom Session Token for Role Propagation
**Decision:** Use Clerk’s Custom Session Token feature to inject `role` directly into every JWT (`sessionClaims.role`).

**Why:**
- PublicMetadata changes were not propagating reliably to middleware due to JWT caching
- This approach guarantees the role is immediately available after sign-in
- Much more reliable than polling or manual refreshes

**Alternative:** Rely only on `publicMetadata` + frequent session refresh  
**Rejected because:** Caused persistent "role: none" bugs during testing.

### 4. Role Storage Strategy
**Decision:** 
- Primary source of truth: Clerk `publicMetadata.role`
- Mirror in Supabase `profiles.role` for easy querying and future RLS
- Never hardcode role in webhook (always read from Clerk payload)

**Why:**
- Clerk handles session/JWT distribution best
- Supabase mirror enables efficient database-level queries and RLS policies

## Technical Stack Decisions

### 5. Server Components & Server-Only Database Operations
**Decision:** Default to Server Components. All Supabase operations must be server-side only (never expose client keys).

**Why:**
- Better performance and security
- Smaller client bundle
- Easier data fetching with streaming
- Aligns with Next.js 16+ best practices

**Alternative:** Mixed client-side queries with TanStack Query  
**Rejected for core data operations** (allowed only for optimistic updates later).

### 6. Middleware File Convention
**Decision:** Use `proxy.ts` instead of deprecated `middleware.ts` (Next.js 16.2.3+).

**Why:**
- Avoids deprecation warnings
- Future-proof for Next.js updates

### 7. Price Storage Format
**Decision:** Store `price` in cents (integer) in the `products` table.

**Why:**
- Prevents floating-point precision issues
- Standard practice for any future payment integration
- Easier calculations and comparisons

## Development Process Decisions

### 8. Small, Testable Steps
**Decision:** Always implement happy path + basic error handling first. Never refactor until feature works and is manually tested.

**Why:**
- Reduces debugging surface area
- Makes progress visible and confidence high
- Aligns with "shippable from day one" philosophy

### 9. Turbopack Disabled
**Decision:** Always run dev server with `npm run dev -- --webpack`

**Why:**
- Turbopack had compatibility issues with fonts and certain dependencies
- Webpack proved more stable during early development

---

**Decision Philosophy:**
- Prioritize reliability and production-readiness over speed
- Choose tools that reduce long-term maintenance burden
- Keep Clerk as auth source of truth, Supabase as data source of truth
- Security and performance first (server-side only where possible)

This document will be updated as major decisions are made in future phases.
```