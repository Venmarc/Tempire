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

### 2026-04

- Always serialize timestamps in UTC to avoid cross-region comparison bugs  <!-- status=accepted confidence=0.46 evidence=1 id=lesson_422695ae5b2d -->

### 2026-04-24 (Phase 2H — manually curated, high confidence)

- **Next.js route groups are filesystem-only** — never appear in browser URLs. Middleware matchers must use real URL paths (e.g. `/seller/edit`) not folder names (e.g. `/(protected)/seller`). A wrong pattern silently skips auth, causing `currentUser()` to return null and triggering spurious redirects. <!-- importance=9 -->

- **`generateMetadata()` must never throw** — wrap in try/catch and return a safe fallback title. An uncaught error inside `generateMetadata` surfaces as a cryptic unrelated error (e.g. ClerkAPIResponseError) at the page level, masking the true cause. <!-- importance=8 -->

- **Service methods called from both page components and `generateMetadata` must return null on all error paths** — never throw. Throwing from a shared service crashes the entire Server Component tree with misleading errors. <!-- importance=8 -->

- **`<input type="file">` cannot be pre-populated** (browser security). In edit forms with existing files, use a hidden `sr-only` input triggered by `ref.current.click()` from a custom Button, and display the current filename in a controlled `<span>` via state. <!-- importance=7 -->

- **After adding columns to an existing table, always provide a SQL backfill AND a display-layer fallback** for pre-migration rows (which will be NULL). For string fields like `file_extension`, derive from the stored URL path as fallback. <!-- importance=8 -->

- **Clerk `currentUser()` can return null if middleware didn't run auth for the route.** Never use `user?.id || ''` — this silently queries DB with an empty string. Always guard with `if (!user) redirect('/')` before any DB operation. Use a multi-field displayName fallback chain: `firstName || fullName || username || email.split('@')[0] || 'Seller'`. <!-- importance=9 -->
- Next.js route group folders like (protected) are filesystem-only and never appear in browser URLs. The isSellerRoute middleware matcher must use the actual URL paths (/seller/dashboard, /seller/edit, /seller/upload) — never the folder names.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_d2c04e81e055 -->
- generateMetadata() in Next.js Server Components must never throw — wrap in try/catch and return a fallback. An uncaught throw inside generateMetadata surfaces as a cryptic unrelated error (e.g. ClerkAPIResponseError) at the page level.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_89343ca1ec99 -->
- Service methods (e.g. getProductById) that are called from both page components AND generateMetadata must return null on all error paths — never throw. Throwing from a service causes the entire Server Component tree to fail with misleading errors.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_70598f79eb42 -->
- Browser <input type='file'> cannot be pre-populated for security reasons — it always shows 'No file chosen'. In edit forms with existing files, use a hidden sr-only input + a custom Button that triggers it via ref.current.click(), and show the current filename in a controlled span alongside it.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_f12a103da206 -->
- When new DB columns are added to existing tables (e.g. file_size, file_extension in Phase 2F), existing rows will have NULL. Always provide a SQL backfill script AND a display-layer fallback (e.g. derive file_extension from the file_url path). Don't rely on column data being present for pre-migration rows.  <!-- status=accepted confidence=0.6 evidence=1 id=lesson_e44af91ffb6b -->
