# Future Changes & Minor Bugs

## Seller Tools / Product View Refinements
![Seller Tools Critique](public/screenshots/seller-tools-critique.png)

### Thoughts & Observations
- **Edit Product Button**: Looks weird, not sitting properly in the layout. Needs better positioning/sizing.
- **Download Button**: Currently opens the Supabase file URL in the browser.
    - *Problem*: Doesn't force a download to the PC.
    - *Goal*: Implement a "Force Download" behavior for a more premium experience.
    - *Technical Solution*: Implement a Next.js proxy route to fetch the file and set the `Content-Disposition: attachment` header, or update Supabase Storage metadata to enforce `attachment`.
- **Copy/Naming**:
    - "Seller Tools" and "Your Product" headers feel generic. Need better, more professional naming.
    - "Seller Tools" area needs a better conceptual name for the entire section.
- **Layout Logic**:
    - "Total Views" should probably be part of the main `Product View` area.
    - *Challenge*: Removing it leaves the "Seller Tools" sidebar vacant. Need to identify higher-value seller actions or stats to fill this space.
- **Overall**: The "Seller Tools" area needs a functional and aesthetic overhaul to feel integrated and "premium".

## Phase 3: Cart & Checkout (Completed)
- **Step 1**: Zustand Cart Store & Logic. (Done)
- **Step 2**: Add to Cart on Product Cards. (Done)
- **Step 3**: Add to Cart on Product Detail Page. (Done)
- **Step 4**: CartDropdown (Popover) visual polish & compaction. (Done)
- **Step 5**: Mock Checkout Flow (Two-column layout). (Done)
- **Step 6**: Server Action for Orders + Success Page. (Done)

## Checkout & Post-Purchase UX
- **Library Page**: "Go To My Downloads" should point to a new `/library` or `/purchases` page that lists all products the user has bought, rather than the seller dashboard.
- **Instant Access**: Consider adding an "Open/Download Now" button directly on the success page for the items just purchased.
- **Order Details**: Success page could show a mini-receipt of the items just bought.

## Design Discrepancy: 100% vs 80% Zoom
- **Observation**: Designing at 80% zoom makes things feel "right" (dense/premium) to the developer, but oversized at 100% for the user.
- **Root Cause**: Likely the default Tailwind spacing/font-size scale and container `max-w` values being slightly too generous for a high-density Cineby-style aesthetic.
- **Proposed Solution**: 
    - Investigate reducing root font-size (e.g., `html { font-size: 90% }`).
    - Standardize on narrower containers (e.g., `max-w-5xl` instead of `max-w-7xl` where appropriate).
    - Use tighter spacing utilities (`p-4` instead of `p-6`) as a default rule.
