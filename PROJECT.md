# Tempire - Niche Creator Marketplace

## Project Overview
Production-grade digital marketplace where creators sell digital products (AI prompts, Notion templates, Figma UI kits, ebooks, etc.). Buyers can browse, filter, search, view details, add to cart, and complete mock checkout. Sellers can upload/manage products and view basic sales.

Goal: Ship a polished, fast, accessible, live portfolio piece with 95+ Lighthouse scores across all categories. Everything must feel production-ready from day one — no tutorial slop, no "implement later" placeholders.

## Tech Stack (Non-Negotiable)
- Next.js 15+ App Router with TypeScript (strict mode)
- Tailwind CSS 4 + shadcn/ui
- Clerk for primary authentication + role management
- Supabase (Postgres + Realtime + Storage) — all database operations server-side only
- TanStack Query for client-side data fetching, caching, and optimistic updates
- Zod for form validation
- @vercel/og for dynamic OG images
- sonner or react-hot-toast for notifications

## Folder Structure (Production Grade)
app/
  (auth)/
  (protected)/          ← route group for dashboards
    dashboard/
      seller/
      buyer/
  products/
    [id]/
  layout.tsx
  page.tsx
  globals.css
components/
  ui/                   ← shadcn/ui components
  forms/
  marketplace/          ← product grid, cards, filters, etc.
lib/
  supabase/             ← server.ts and client.ts (cookies() handling)
  utils.ts
  queries.ts
server/
  actions/              ← Server Actions
  services/             ← AuthService, ProductService, UserService, etc.
  db/                   ← type-safe queries
types/
hooks/
middleware.ts
next.config.mjs
tailwind.config.ts
.env.example

## Core Services to Implement (Server-Side Only)
1. **AuthService** — Clerk session handling, middleware protection, role checks (buyer/seller)
2. **DatabaseService** — Type-safe Supabase client with RLS awareness and proper error handling
3. **ProductService** — CRUD for products, filtering, search, pagination, Supabase Storage uploads
4. **UserService** — Profiles, seller dashboard data, purchase history
5. **OrderService** — Mock checkout flow, cart persistence (local + Supabase), order records
6. **AnalyticsService** — Track page views, product views, add-to-cart, mock purchases (expandable)

## Critical Requirements & Guardrails
- ALL database operations MUST be server-side (Server Components, Server Actions, Route Handlers). Never expose Supabase client keys on client.
- Middleware.ts for route protection before any page renders (public, protected, seller-only routes).
- Real-time updates via Supabase postgres_changes + private channels (SSE only as fallback).
- Full Zod validation on every form/input.
- Dynamic OG images on all product detail pages.
- Performance: Server Components by default, streaming where beneficial, Next.js Image optimization, minimal client JS. Target 95+ Lighthouse.
- Accessibility: ARIA labels, keyboard navigation, semantic HTML, screen-reader friendly.
- SEO: Proper metadata, structured data where relevant, fast LCP.
- Clean separation of concerns: UI vs services/actions.
- Error boundaries, loading states/skeletons, user-friendly error messages.
- Fully responsive (mobile-first) with shadcn/ui.
- Environment variables properly managed (.env.example provided).

## MVP Features (Build Order)
1. Foundation: Clerk + Supabase setup + middleware RBAC
2. Database schema + RLS (products, profiles, orders, storage buckets)
3. Buyer flow: Product grid with filters/search/infinite scroll, product detail page with dynamic OG
4. Seller flow: Product upload form (Zod + Supabase Storage)
5. Cart + mock checkout flow
6. Basic seller dashboard + analytics
7. Polish: Realtime updates, performance, SEO, accessibility

## Monetization (Currently Mock)
- Browse / filter / search products
- Product detail with images and "Add to Cart"
- Mock checkout (cart persistence → success page)
- Seller upload and product management
- Make the mock feel production-quality

## Code Patterns (Strict)
- Server Components by default. Use 'use client' only when necessary.
- Async/await everywhere.
- TanStack Query for client-side state with proper invalidation.
- No client-side Supabase queries.
- Proper error handling and logging.
- Memory-efficient, no unnecessary re-renders.

## Deployment
- Optimized for Vercel
- Supabase RLS setup notes in README
- Clerk webhook/environment setup
- Image optimization and dynamic OG configured

Reference this PROJECT.md file in every single chat. Do not deviate from the stack, structure, or requirements without explicit approval.

When planning or implementing any feature, always create an Implementation Plan first, then start with:
- List affected files
- Edge cases
- Data flow
- Manual test steps

Then wait for approval before writing code.
