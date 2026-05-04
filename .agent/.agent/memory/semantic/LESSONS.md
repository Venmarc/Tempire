# Lessons (auto-distilled + manually curated)

> Entries here outlive specific tasks. The dream cycle promotes recurring
> patterns from episodic into this file. Feel free to curate manually —
> delete bad lessons, tighten wording, reorganize sections.

## Seed lessons
- Always read `protocols/permissions.md` before any destructive tool call.
- Write the failing test before writing the fix.
- Log to episodic memory on every significant action, success or failure.
- When a skill has failed 3+ times in 14 days, propose a rewrite.
- Never force push to protected branches under any circumstance.

## Auto-promoted entries will be appended below

### 2026-05

- Never divide price by 100 twice — if a variable already converts cents to dollars at declaration (e.g. const price = product.price / 100), do NOT divide again in the JSX display. Always trace the full data path from database (cents) to display (dollars) before touching price logic.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_04da941a02b4 -->
- Never use 'any' type to silence TypeScript errors — always create proper type mappings. When a compatibility wrapper returns data for components expecting a specific type (e.g. Product[]), map every required field with sensible defaults instead of casting to any[].  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_b7f501905e5e -->
- When editing a file, never move code blocks outside their parent container accidentally — always verify the structural nesting of JSX before and after the edit. A conditional wrapper moved outside a flex container silently breaks layout alignment on different screen sizes.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_8fe314984e32 -->
- When the user provides exact code snippets in their plan, implement them exactly as written — do not rewrite, optimize, or substitute equivalent expressions. Deviating from explicit user code introduces subtle bugs and erodes trust.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_515ee86f856d -->
- Before editing any file, verify which lines are within your scope and which are not — never touch imports, variables, or logic blocks that are unrelated to the current task. Read the full file context first, identify the exact target lines, and leave everything else untouched.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_ca6cb7f3b859 -->
- For Tempire 80% Shift layout, prefer lightweight UI patterns (Popover dropdowns, inline modals) over heavy full-screen overlays (Sheet, side drawers). A full-width Sheet feels too heavy on a centered max-w-7xl layout and blocks content unnecessarily.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_5d3588d95fe6 -->
- When migrating state management (e.g. TanStack Query to Zustand), create a properly typed compatibility wrapper that maps every field of the old type with sensible defaults — never use 'as any' to bypass type errors. The wrapper must satisfy the full interface contract of consuming components.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_5d1eb9311c85 -->
- Always run npx tsc --noEmit after every code change and before reporting completion to the user. Never report success without a clean type check. This catches regressions early and maintains the strict TypeScript discipline Victor expects.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_357709b95f82 -->
- Tempire prices are stored in cents (integer) in Supabase. The single source of truth for conversion is: divide by 100 exactly once, at the display layer in JSX. Never create an intermediate variable that pre-divides and then divide again in the template string.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_c322d3cc76ff -->
- Victor works in small, testable steps — never implement more than one step at a time. Wait for manual test confirmation before proceeding to the next step. Each step should have clear affected files, exact code changes, and manual test steps listed upfront.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_68c01a6a2fe7 -->

### 2026-04

- Always serialize timestamps in UTC to avoid cross-region comparison bugs  <!-- status=accepted confidence=0.46 evidence=1 id=lesson_422695ae5b2d -->
- Next.js route group folders like (protected) are filesystem-only and never appear in browser URLs. The isSellerRoute middleware matcher must use the actual URL paths (/seller/dashboard, /seller/edit, /seller/upload) — never the folder names.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_d2c04e81e055 -->
- generateMetadata() in Next.js Server Components must never throw — wrap in try/catch and return a fallback. An uncaught throw inside generateMetadata surfaces as a cryptic unrelated error (e.g. ClerkAPIResponseError) at the page level.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_89343ca1ec99 -->
- Service methods (e.g. getProductById) that are called from both page components AND generateMetadata must return null on all error paths — never throw. Throwing from a service causes the entire Server Component tree to fail with misleading errors.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_70598f79eb42 -->
- Browser <input type='file'> cannot be pre-populated for security reasons — it always shows 'No file chosen'. In edit forms with existing files, use a hidden sr-only input + a custom Button that triggers it via ref.current.click(), and show the current filename in a controlled span alongside it.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_f12a103da206 -->
- When new DB columns are added to existing tables (e.g. file_size, file_extension in Phase 2F), existing rows will have NULL. Always provide a SQL backfill script AND a display-layer fallback (e.g. derive file_extension from the file_url path). Don't rely on column data being present for pre-migration rows.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_e44af91ffb6b -->
- **Next.js route groups are filesystem-only** — never appear in browser URLs. Middleware matchers must use real URL paths (e.g. `/seller/edit`) not folder names (e.g. `/(protected)/seller`). A wrong pattern silently skips auth, causing `currentUser()` to return null and triggering spurious redirects.  <!-- status=legacy confidence=0.7 evidence=0 id=lesson_legacy_d7dec5a7b099 -->
- **`generateMetadata()` must never throw** — wrap in try/catch and return a safe fallback title. An uncaught error inside `generateMetadata` surfaces as a cryptic unrelated error (e.g. ClerkAPIResponseError) at the page level, masking the true cause.  <!-- status=legacy confidence=0.7 evidence=0 id=lesson_legacy_982e3dacf7ba -->
- **Service methods called from both page components and `generateMetadata` must return null on all error paths** — never throw. Throwing from a shared service crashes the entire Server Component tree with misleading errors.  <!-- status=legacy confidence=0.7 evidence=0 id=lesson_legacy_63625aeba22d -->
- **`<input type="file">` cannot be pre-populated** (browser security). In edit forms with existing files, use a hidden `sr-only` input triggered by `ref.current.click()` from a custom Button, and display the current filename in a controlled `<span>` via state.  <!-- status=legacy confidence=0.7 evidence=0 id=lesson_legacy_a9668393c3e4 -->
- **After adding columns to an existing table, always provide a SQL backfill AND a display-layer fallback** for pre-migration rows (which will be NULL). For string fields like `file_extension`, derive from the stored URL path as fallback.  <!-- status=legacy confidence=0.7 evidence=0 id=lesson_legacy_af4b8e624da9 -->
- **Clerk `currentUser()` can return null if middleware didn't run auth for the route.** Never use `user?.id || ''` — this silently queries DB with an empty string. Always guard with `if (!user) redirect('/')` before any DB operation. Use a multi-field displayName fallback chain: `firstName || fullName || username || email.split('@')[0] || 'Seller'`.  <!-- status=legacy confidence=0.7 evidence=0 id=lesson_legacy_70af55c27f4a -->
