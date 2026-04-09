# Tempire - Niche Creator Marketplace

## Overview
Portfolio-grade digital marketplace for creators to sell AI prompts, Notion templates, Figma kits, and other digital downloads. Buyers browse/filter/purchase (mock checkout). Fast, polished, accessible. Target: 95+ Lighthouse score.

## Tech Stack (strict)
- Next.js 15+ App Router (server components default, async pages)
- TypeScript strict
- Tailwind CSS 4, mobile-first
- Auth: Clerk (middleware + RBAC for seller/buyer roles)
- DB: Supabase (Postgres, Realtime via postgres_changes, Storage for files)
- Validation: Zod
- Other: TanStack Query, @vercel/og (dynamic OG images), sonner toasts

## Folder Structure
app/ (routes + (protected) route group for dashboards)
components/ui/
lib/supabase/ (separate server.ts and client.ts with cookies())
types/
middleware.ts

## MVP Phases
1. Foundation: Clerk + Supabase connection + middleware RBAC
2. Schema: products, profiles, orders tables + RLS
3. Buyer flow: Product grid (filters, infinite scroll), detail page
4. Seller flow: Upload form (Zod + Supabase Storage)
5. Cart + mock checkout
6. Polish: Realtime updates (Supabase preferred), SEO, performance

## Real-time Decision
Default to Supabase Realtime (postgres_changes + private channels). Use SSE only as fallback.

## Non-Negotiables
- All DB operations server-side only.
- Middleware for auth protection before page render.
- Manual test steps after every implemented feature.
- No client-side secrets. Dynamic OG images on all product pages.
- Reference this file + AGENTS.md in every chat.