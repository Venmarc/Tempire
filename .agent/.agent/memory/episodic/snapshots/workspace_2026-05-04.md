# Workspace (live task state)

## Current task
Phase 3: Cart Logic & Mock Checkout Implementation.
Steps 1-3 are complete. Next up is Step 4: Product Detail Page "Add to Cart".

## Open files
- server/actions/product-actions.ts
- PHASES.md
- hooks/useCart.ts
- components/marketplace/ProductCard.tsx
- components/marketplace/CartDropdown.tsx
- store/useCartStore.ts
- NOTES.md

## Active hypotheses
- The CartDropdown (Popover) works but Victor wants more visual polish — will revisit later.
- The CartDrawer.tsx (Sheet-based) is deprecated but not deleted yet.

## Checkpoints
- [x] Step 1: Create clean Zustand Cart Store (`store/useCartStore.ts`, `types/cart.ts`)
- [x] Step 1b: Refactor `hooks/useCart.ts` to be a strict typed compatibility wrapper (CartItem → Product)
- [x] Step 2: Add to Cart button on ProductCard + Cart icon in desktop navbar
- [x] Step 2 price fix: Changed to raw cents variable, single division at display layer
- [x] Step 3: CartDrawer (Sheet) → REJECTED by Victor → Replaced with CartDropdown (Popover)
- [x] Step 3b: Premium visual polish pass on CartDropdown
- [ ] Step 4: Add "Add to Cart" to Product Detail Page (PurchaseSidebar)
- [ ] Step 5: Build Checkout Flow (Cineby-style dark premium)
- [ ] Step 6: Success Page

## Next step
Step 4: Product Detail Page "Add to Cart" integration.
Victor noted this in NOTES.md under Phase 3 Tasks.

## Brain state (May 1, 2026 evening)
- 8 new lessons graduated today covering: JSX nesting, exact code following, edit scope discipline, 80% Shift UI patterns, typed wrappers, tsc verification, price formatting, small steps workflow
- 3 failure events logged: price double-division, any[] cast, Sheet rejection
- 1 success event logged: Zustand migration
- Total accepted lessons in corpus: ~20+
