# The Tempire Standard (20-Point Quality Checklist)

Every asset sold on Tempire must adhere to this 20-point standard to ensure a premium, production-ready experience for buyers.

### 1. Technical Excellence
1.  **Strict TypeScript**: No `any` types permitted. All data structures must be fully typed.
2.  **Zero Hydration Errors**: Components must render identically on server and client to prevent layout flicker.
3.  **Next.js 16+ Compliance**: Usage of modern App Router patterns and React 19 features.
4.  **Linting & Formatting**: 100% compliance with project ESLint and Prettier configurations.
5.  **Performance Baseline**: Mobile Lighthouse performance score of 90+.

### 2. Design & UX
6.  **Mobile Responsive**: Flawless experience from 320px (mobile) to 2560px+ (ultrawide).
7.  **Design Token Adherence**: Consistent use of the Tempire color palette, spacing scale, and typography.
8.  **Dark Mode Native**: Complete dark mode support with high-contrast readability.
9.  **Micro-interactions**: Subtle CSS transitions for all hover, active, and loading states.
10. **Zero Layout Shift (CLS)**: Skeletons or fixed-aspect ratios must be used for all async content.

### 3. Security & Stability
11. **Server-Side Security**: All database operations performed via Server Actions/Services; zero client-side Supabase keys.
12. **Input Validation**: Strict Zod schemas for all form inputs and API payloads.
13. **Error Boundaries**: Graceful fallbacks for unexpected component or data errors.
14. **Sensitive Data Protection**: No hardcoded secrets; use of managed environment variables.

### 4. Code Architecture
15. **Separation of Concerns**: UI components must be isolated from business logic/service layers.
16. **State Optimization**: Efficient use of Zustand/React Query to prevent unnecessary re-renders.
17. **Atomic Primitives**: Reusable UI components (buttons, inputs) derived from the base design system.
18. **URL State Sync**: Complex UI states (filters, search) must be mirrored in the URL.

### 5. Delivery & Documentation
19. **Environment Setup**: Inclusion of a comprehensive `.env.example` file.
20. **Product Documentation**: A clear `README.md` explaining installation, configuration, and feature set.
