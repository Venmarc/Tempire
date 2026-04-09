# Tempire Constitution

## Core Values
- Premium but Performant Experience: Butter smooth where it matters, but never at the cost of Lighthouse scores or INP.
- Speed by Default: Server Components + Streaming first. Use skeleton loaders instead of spinners.
- Security & Privacy First: All digital assets protected via RLS and signed URLs. Only purchasers or owners access downloads.
- Production Mindset: Everything must feel shippable. No placeholders.

## Design Standards
- Layout: "80% Shift" — centered containers with max 80% width on desktop for focus.
- Typography: Inter (body), Outfit (headings).
- Colors: Dark mode default. Define CSS variables in Tailwind (deep grays #0a0a0a, accents to be finalized).
- UI: shadcn/ui patterns with rounded-2xl, subtle backdrop-blur only if it doesn't hurt performance.

## Technical Constraints (Non-Negotiable from PROJECT.md)
- Next.js 15 App Router, TypeScript strict.
- Clerk auth with middleware protection before page render.
- Supabase server-side only (no client queries). RLS enabled on all tables.
- Supabase Storage for private product files.
- Zod validation on every form and input.
- Dynamic OG images on all product/detail pages.
- TanStack Query for client-side state.
- Target: 95+ Lighthouse (Performance, Accessibility, Best Practices, SEO). INP < 200ms, FCP < 1.2s.

## Development Rules
- Server Components by default.
- Plan first, happy path + basic errors first, manual test before polish.
- New chat per major feature.
- Reference PROJECT.md and AGENTS.md in every session.