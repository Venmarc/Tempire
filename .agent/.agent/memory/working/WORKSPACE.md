# Workspace (live task state)

## Current task
Phase 3: Cart Logic & Mock Checkout Implementation.
We are currently migrating to a Zustand store and integrating the "Add to Cart" UI elements across the marketplace.

## Open files
- server/actions/product-actions.ts
- PHASES.md
- hooks/useCart.ts
- components/marketplace/ProductCard.tsx
- components/marketplace/CartBadge.tsx

## Active hypotheses
- The compatibility layer in `hooks/useCart.ts` prevents breaking existing components by casting the new `CartItem` shape into the old `Product` shape with default null/blank fields.

## Checkpoints
- [x] Initialized brain context (PREFERENCES, PROJECT, PHASES, DECISIONS)
- [x] Verified brain state (show.py, recall.py)
- [x] Create clean Zustand Cart Store (`store/useCartStore.ts`, `types/cart.ts`)
- [x] Refactor `hooks/useCart.ts` to be a strict compatibility wrapper mapping `CartItem` -> `Product`
- [x] Update `ProductCard.tsx` (Add to Cart button replacing Star icon)
- [x] Update `CartBadge.tsx` (Always show icon, only show number if > 0)
- [ ] Build `CartDrawer.tsx`
- [ ] Build Checkout Flow

## Next step
Waiting for user manual tests for Step 2 and confirmation of `shadcn sheet` installation before proceeding to Step 3 (Cart Drawer).
