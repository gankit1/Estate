# Project Fix Changelog

All changes made during the bug fix and completion process are documented here chronologically.

---

## [Issue 1.1] Unprotected Property Mutation APIs & RBAC Protection — 2026-10-26

### Vulnerability Addressed
- Prior to this fix, `POST /api/v1/properties`, `PATCH /api/v1/properties/:id`, and `DELETE /api/v1/properties/:id` were accessible without any authentication or authorization. Any anonymous HTTP client could insert, modify, or delete listings.

### Changes Implemented
1. **JWT & Crypto Foundation (`backend/src/utils/jwt.ts`)**:
   - Implemented RFC 7519 compliant HMAC-SHA256 JWT signing and verification using Node.js native `crypto`.
   - Avoided third-party dependency overhead/vulnerabilities.
   - Enforced expiration checks and timing-safe signature comparison (`crypto.timingSafeEqual`).
2. **Environment Configuration (`backend/src/config/env.ts`)**:
   - Added `JWT_SECRET` and `JWT_EXPIRES_IN_SECONDS` with sensible fallback defaults.
3. **Type Definitions (`backend/src/types/express.d.ts`)**:
   - Defined `UserRole` (`"admin" | "agent" | "buyer"`) and `AuthUser` interface.
   - Augmented `Express.Request` to include optional `user?: AuthUser`.
4. **Error Handling (`backend/src/utils/AppError.ts`)**:
   - Added `AppError.unauthorized()` (401) and `AppError.forbidden()` (403).
5. **Security Middlewares (`backend/src/middlewares/auth.ts`)**:
   - `authenticate`: Extracts and validates `Bearer` JWT from `Authorization` header, attaching `req.user`.
   - `requireRole(...allowedRoles)`: Enforces role-based permissions (403 if role not permitted, 401 if unauthenticated).
6. **Property Service Ownership & Anti-Tampering (`backend/src/services/propertyService.ts`)**:
   - `createProperty`: Enforces that if created by an agent, `agentRef` is bound to the agent's identity (`user.agentId`).
   - `updateProperty`: Rejects updates if the agent does not own the listing (`existing.agentRef !== user.agentId`). Blocks unauthorized attempts by agents to transfer listing ownership to another agent.
   - `deleteProperty`: Rejects listing deletion if the agent does not own the listing.
   - `admin`: Retains full administrative control over all listings.
7. **Route Protection (`backend/src/routes/propertyRoutes.ts`)**:
   - Added `authenticate` and `requireRole("admin", "agent")` on `POST /`, `PATCH /:id`, and `DELETE /:id`.
   - Ensured public browsing routes (`GET /`, `GET /featured`, `GET /:slug`, `GET /:slug/similar`) remain fully open without authentication.
8. **Automated Testing (`backend/tests/mutations.test.ts`, `backend/tests/validation.test.ts`)**:
   - Added 16 automated tests covering anonymous rejection, invalid tokens, buyer forbidden responses, agent listing creation, agent ownership verification on patch/delete, agent transfer rejection, and admin overrides.
   - Updated existing validation tests to pass authorized admin tokens for parameter/body validation checks.

---

## [Issue 1.2] Global Rate Limiter Tuning & Route Segregation — 2026-10-26

### Issues Addressed
- Blanket 100 req/15min rate limit across all `/api` routes created frequent false-positive 429 errors during regular user browsing.
- Health check endpoints were not exempt from rate limiting.
- Reverse proxy IPs were not handled safely (`trust proxy`).
- Production JWT configuration had a default fallback secret without refinement.

### Changes Implemented
1. **Configurable Granular Limits (`backend/src/config/env.ts`)**:
   - Added `RATE_LIMIT_PUBLIC_MAX` (default 600 req/15 min) for reading/browsing.
   - Added `RATE_LIMIT_MUTATION_MAX` (default 60 req/15 min) for mutations.
   - Added `RATE_LIMIT_AUTH_MAX` (default 10 req/15 min) for brute-force protection.
   - Added `TRUST_PROXY` (default 1).
   - Added production refinement: `JWT_SECRET` must be set explicitly to a strong key (>= 32 chars) in production.
2. **Rate Limiting Middleware Module (`backend/src/middlewares/rateLimiter.ts`)**:
   - `publicBrowsingLimiter`: Generous threshold, skips health checks.
   - `mutationLimiter`: Protects `POST`, `PATCH`, `DELETE /api/v1/properties`.
   - `authLimiter`: Strict threshold for future authentication endpoints.
   - Standard RFC 6585 response format returning `429` with `RATE_LIMIT_EXCEEDED` and `Retry-After` header.
3. **App & Route Wiring (`backend/src/app.ts`, `backend/src/routes/propertyRoutes.ts`)**:
   - Configured `app.set("trust proxy", env.TRUST_PROXY)`.
   - Replaced blanket limiter with `publicBrowsingLimiter` on `/api`.
   - Applied `mutationLimiter` to property mutations.
4. **Automated Testing (`backend/tests/rateLimiter.test.ts`)**:
   - Added 4 tests validating rate limiting headers, threshold enforcement, 429 response structure, and health endpoint exemptions.

---

## [UI/UX Overhaul] Property Detail Page & Typography Fixes — 2026-10-26

### Issues Addressed
- Single-image listings (such as Bay Living Studio) collapsed the hero gallery to a sliver.
- Aggressive unlayered raw CSS rules in `globals.css` (`h2 { font-size: clamp(...) }` and `button { background: none }`) overrode Tailwind utilities, distorting headings into gigantic serif text and stripping button backgrounds.
- Property detail page was flat, washed-out, and lacked luxury architectural hierarchy.
- Right sidebar had only a disconnected agent box with an empty void beneath it.

### Changes Implemented
1. **CSS Specificity Reset (`src/app/globals.css`)**:
   - Encapsulated heading typography and form base resets into `@layer base { ... }` so Tailwind utilities (`text-xs`, `font-mono`, `bg-primary`, `border`) apply properly without being clobbered by unlayered CSS.
2. **Hero Gallery Showcase (`src/components/property/PropertyGallery.tsx`)**:
   - Ensured full-height architectural container (`h-[380px] sm:h-[480px] lg:h-[540px]`) with responsive handling for 1, 2, 3, and 4+ images.
   - Added DLD Verified Listing badge, dynamic photo counter, and "View Fullscreen Photo" trigger with high-resolution lightbox.
3. **Architectural Property Dossier (`src/app/(marketing)/properties/[slug]/page.tsx`)**:
   - Refined tag system (`[FOR RENT]`, `[APARTMENT]`, `[DLD PERMIT VALIDATED]`).
   - 8-card luxury property specifications ribbon with custom minimalist SVG line icons for Bedrooms, Bathrooms, Area, Parking, Furnishing, Property Type, Availability, and Ownership.
   - Redesigned overview, features, amenities with custom lifestyle icons (Pool, Gym, Parking, Security, etc.), and connectivity block with direct Google Maps launch button.
   - Added 3-card curated similar properties showcase.
4. **Luxury Advisor & Enquiry Sidebar (`src/components/property/EnquirySidebar.tsx`)**:
   - Replaced the disconnected box with an authoritative luxury broker dossier (agent portrait, online indicator, DLD BRN #48291, languages).
   - Added direct WhatsApp inquiry, "Schedule Private Tour" modal trigger, and direct call actions.
   - Embedded an instant inquiry contact form and detailed financial / tenancy breakdown (monthly rent estimate, 5% deposit, cheque options, 0% commission).
   - Added 3 authentic title deeds and DLD trust assurance badges.

---

## [Issue 4.x] Color Hunt Luxury Palette & Hydration Resolution — 2026-10-26

### Issues Addressed
- The previous brown-beige palette appeared muddy, dull, and lacked the crisp prestige expected of luxury Dubai brokerages.
- Raw CSS rules (`body`, `p`, `a`, `strong`) outside `@layer` were overriding Tailwind utility text and color classes across the site.
- Homepage hero text contrast against the background image had insufficient legibility.
- React SSR hydration warning on `/properties/[slug]` caused by non-deterministic `window.location.href` in WhatsApp deep-links.

### Changes Implemented
1. **Color Hunt Modern Royal Navy & Champagne Gold Palette (`src/app/globals.css`)**:
   - Primary: `#102C57` (Modern Royal Navy) with complete 50–900 shades.
   - Secondary / Accent: `#C5A880` (Champagne Gold) with complete 50–700 shades.
   - Luminous Backdrops: Clean architectural `#F8F9FA` background and pure crisp `#FFFFFF` card surfaces.
   - High Contrast Slate Text: Primary text `#0F172A` (Midnight Slate) and secondary `#334155`.
2. **Complete Cascade Layering (`src/app/globals.css`)**:
   - Encapsulated `body`, `h1–h6`, `p`, `a`, `strong`, `img`, and `ul/ol` inside `@layer base { ... }`.
   - Restored full precedence for all Tailwind utility classes (`text-*`, `bg-*`, `border-*`).
3. **Homepage Hero Contrast & Accents (`src/app/(marketing)/page.tsx`)**:
   - Replaced muddy brown gradient overlay with a deep royal navy atmospheric wash (`rgba(10, 28, 56, 0.92)`).
   - Upgraded eyebrow to champagne gold `#C5A880` and subtext to high-contrast `text-sand-100/90`.
   - Upgraded primary CTA to Champagne Gold (`bg-secondary text-navy-900`) and secondary CTA to glassmorphic outline.
4. **Hydration Mismatch Fix (`src/components/property/EnquirySidebar.tsx`)**:
   - Replaced client-only `window.location.href` in WhatsApp links with deterministic property canonical URL `https://dubaiestate.ae/properties/${property.slug}`.
   - Eliminated Next.js SSR hydration error overlay completely.
5. **Component Synchronization**:
   - Updated `Badge.tsx`, `Header.tsx`, `Footer.tsx`, and `WhyUsSection` to align with the Royal Navy and Champagne Gold tokens.
6. **Automated Verification**:
   - TypeScript check: 0 errors (`npx tsc --noEmit`).
   - Frontend tests: 78/78 passing.
   - Backend tests: 45/45 passing.
   - Visual inspection: Playwright high-resolution captures verified for both homepage and property detail page.

---

## [Brand Update] Company Name Rebranding to Pacific Star Realty — 2026-10-26

### Changes Implemented
1. **Brand Identity & Logo ([`src/components/layout/Header.tsx`](file:///Users/ankitkumargupta/Desktop/learning/estate/src/components/layout/Header.tsx))**:
   - Integrated custom 8-point geometric luxury compass star emblem with champagne gold accenting inside a royal navy container.
   - Updated wordmark to **PacificStar REALTY** with high-end font hierarchy.
2. **Footer Rebranding ([`src/components/layout/Footer.tsx`](file:///Users/ankitkumargupta/Desktop/learning/estate/src/components/layout/Footer.tsx))**:
   - Added matching compass star emblem and wordmark.
   - Updated copyright notice to `© {currentYear} Pacific Star Realty. All rights reserved.`
   - Updated default contact email to `hello@pacificstarrealty.com`.
3. **Application Metadata & SEO ([`src/app/layout.tsx`](file:///Users/ankitkumargupta/Desktop/learning/estate/src/app/layout.tsx))**:
   - Root title template updated to `%s | Pacific Star Realty` and default to `Pacific Star Realty | Premium Real Estate in Dubai`.
   - Updated `siteName`, `authors`, `creator`, and OpenGraph/Twitter card tags.
4. **Marketing & Property Pages**:
   - [`src/app/(marketing)/page.tsx`](file:///Users/ankitkumargupta/Desktop/learning/estate/src/app/(marketing)/page.tsx): Updated Why Us section eyebrow to `Why Pacific Star Realty`.
   - [`src/app/(marketing)/properties/page.tsx`](file:///Users/ankitkumargupta/Desktop/learning/estate/src/app/(marketing)/properties/page.tsx): Updated listing title and OpenGraph title.
   - [`src/app/(marketing)/properties/[slug]/page.tsx`](file:///Users/ankitkumargupta/Desktop/learning/estate/src/app/(marketing)/properties/[slug]/page.tsx): Updated property detail titles and fallback error metadata.
   - [`e2e/properties.spec.ts`](file:///Users/ankitkumargupta/Desktop/learning/estate/e2e/properties.spec.ts): Updated Playwright test title assertion to match `/Pacific Star Realty/i`.


