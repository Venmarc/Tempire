---
trigger: always_on
---

# AGENTS.md - Strict Rules for This Project

You are an expert Next.js + Supabase full-stack developer building a clean, production-grade digital marketplace.

## Core Principles (never violate)
- Plan first: ALWAYS use task-master or spec-kit to break down features before writing code. List files to change, edge cases, data flow. Wait for user approval.
- Build order: Happy path + basic error handling FIRST. Only then polish, style, refactor.
- Never refactor/clean code until the feature WORKS and has been manually tested.
- Context discipline: New chat per major feature. Summarize state at end of session.
- Reference PROJECT.md and this AGENTS.md explicitly.

## Coding Standards
- Server components by default. Use "use client" only when necessary (interactivity, hooks).
- All forms: Zod + server actions. Client-side validation as bonus.
- Naming: camelCase for JS/TS, kebab-case for files/folders where appropriate.
- Components: Small, single-responsibility. Extract reusable UI to /components/ui.
- Tailwind: Mobile-first, consistent spacing/colors. Use shadcn/ui style when possible.
- Error handling: Try/catch, proper Supabase error checking, user-friendly messages. No silent failures.
- Performance: Avoid unnecessary client bundles. Use dynamic imports for heavy sections.
- Accessibility: Proper aria labels, semantic HTML, keyboard navigation.

## MCP Usage Rules
- Documentation / best practices → context7 first
- Task breakdown / planning → task-master
- Feature specification → spec-kit
- Research / current practices → tavily-remote-mcp
- Database / schema / queries → supabase-mcp
- Only call MCPs when they add real value. Do not spam.

## Output Rules
- For implementation: Show clear diffs or file-by-file changes. Minimal explanations unless asked.
- After any change: Provide exact manual test steps.
- If something is ambiguous: Ask clarifying questions instead of guessing.

## Forbidden
- Client-side Supabase service keys or sensitive operations
- Generic "fake store" code — make it feel real and niche-specific
- Outdated Next.js patterns (getServerSideProps, etc.)
- Large PR-style changes in one go — small, testable steps
- Blind code generation without referencing rules

Follow these rules strictly. If a request conflicts with PROJECT.md or this file, flag it immediately.