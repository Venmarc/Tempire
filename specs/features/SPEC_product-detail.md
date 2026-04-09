# Feature Specification: Product Detail Page

## Overview
A high-conversion detail page for digital products. It must showcase social proof, clear value propositions, and a seamless path to checkout.

## Technical Specifications
- **Route**: `app/products/[id]/page.tsx` (Dynamic Server Component)
- **Data Source**: Supabase `products` table joined with `profiles` (creator).
- **SEO**: Metadata generated via `generateMetadata()` based on product title/description.

## User Persona Interactions

### Guest / Unauthenticated
- View full product details.
- "Add to Cart" prompts redirect to Clerk login or stores cart locally.
- "Buy Now" triggers Clerk sign-in.

### Authenticated Buyer
- View details.
- Add to cart / Buy Now.
- If already purchased: Show "Download" button instead of purchase options.

### Product Owner (Seller)
- View "Edit Product" shortcut button.
- See sales count/stats overlay (only visible to owner).

## Component Breakdown

### 1. Image/Preview Gallery
- Primary screenshot + thumbnails.
- Lightbox for full-size viewing.
- Support for video/embed if provided.

### 2. Product Header
- Breadcrumbs (`Browse > Category > Niche`).
- Title, Price, Rating summary.
- Creator profile link (Avatar + Name).

### 3. Purchase Sidebar
- Price display.
- "Add to Cart" button (State-aware).
- "Buy Now" button.
- Secure payment badges (mock).

### 4. Details & Description
- Rich text description.
- Niche tags.
- Technical specs (e.g., "File Size", "Format", "Last Updated").

## Edge Cases & Error Handling

| Edge Case | Response / Behavior |
| :--- | :--- |
| **Product Not Found** | Return `notFound()` triggering the custom `app/not-found.tsx`. |
| **Product Deleted** | Same as Not Found. |
| **Price = 0** | Change buttons to "Get Free" or "Download Now". |
| **Already Purchased** | Hide Cart/Buy buttons, show prominent Download link. |
| **Inactive Seller** | Show "Listing Suspended" banner. |
| **Invalid ID Format** | Trigger 404/Error Boundary. |

## Analytics Requirements
- Track view count on render (Edge Function or Server Action).
- Track "Add to Cart" clicks.
