# Niche Creator Marketplace - "Tempire"

## Project Overview
Digital marketplace where creators sell Notion templates, Figma UI kits, AI prompts, ebooks, and other digital products. Buyers browse, filter, purchase (mock checkout). Sellers upload/manage products and view sales.

Target: Production-like demo for portfolio. Fast, polished, accessible, mobile-first. Lighthouse 95+.

## Tech Stack (strict)
- Framework: Next.js 15+ App Router (server components by default)
- Language: TypeScript (strict)
- Styling: Tailwind CSS 4 (mobile-first, no inline styles)
- Auth: Clerk (protected routes, user roles: buyer/seller)
- Database: Supabase (Postgres + Realtime + Storage for product files)
- Validation: Zod
- Data fetching: TanStack Query / Server Actions
- Other: react-hot-toast or sonner for notifications, @vercel/og for dynamic OG images
- MCPs: Always prefer context7 for docs, task-master for planning, supabase-mcp for DB, tavily for research

## Core Folder Structure
/app
  / (public routes)
/dashboard
  /seller
  /buyer
/components
  /ui (shadcn-style reusable)
/lib/supabase.ts
/types/
/hooks/

## Key Features (MVP priority order)
1. Public: Product grid with infinite scroll + filters (category, price, rating, search)
2. Product detail page (images, description, "Add to Cart", mock buy button)
3. Auth + protected routes (Clerk)
4. Seller dashboard: Upload digital product (title, description, price, category, file upload to Supabase Storage), view my products/sales
5. Cart + mock checkout (local persistence + Supabase order record)
6. Basic analytics (seller sales overview with simple charts)
7. Responsive + dark mode toggle
8. SEO: Proper metadata, dynamic OG images, semantic HTML, fast LCP

## Non-Negotiables
- All database operations server-side only.
- Zod validation on all forms/inputs.
- Error boundaries and user-friendly error messages.
- No hardcoded secrets.
- Manual test steps must be provided after any feature implementation.
- Performance: Server components where possible, streaming where it improves UX.

## Data Schema (draft - expand with supabase-mcp)
- users (Clerk handles most, link via clerk_id)
- products (id, title, description, price, category, creator_id, file_url, created_at)
- orders (id, buyer_id, product_id, amount, status)
- carts (temporary or persisted)

Reference this file in every chat. Deviate only with explicit approval.