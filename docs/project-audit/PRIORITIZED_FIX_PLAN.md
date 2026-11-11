# Prioritized Remediation & Fix Plan

**Audit Date:** October 26, 2026  
**Auditor:** Senior Technical Lead & Software Architect  
**Objective:** Provide a step-by-step, dependency-aware remediation plan to resolve reported defects, eliminate duplicate calls, fix simulated features, and elevate the UI to Dubai luxury standards.

---

## 1. Remediation Phases & Prioritized Execution Order

```
[Phase A: Critical Security & Rate Limiting] (P0)
   ├── Lock down mutation routes (POST, PATCH, DELETE) with Auth
   └── Fix rate limiter segmentation to prevent localhost HTTP 429
            │
            ▼
[Phase B: API Deduplication & Network Architecture] (P1)
   ├── Wrap getPropertyBySlug with React cache() to eliminate double fetch
   ├── Refactor Homepage (page.tsx) to Server Component
   └── Unify filter state in PropertyListingContent (single source of truth)
            │
            ▼
[Phase C: Functional Persistence Fixes] (P1)
   ├── Build Lead / ViewingRequest models & POST /api/v1/inquiries
   ├── Connect ViewingForm to real backend & email notification
   └── Implement localStorage persistence for Favorites
            │
            ▼
[Phase D: Dubai Luxury UI/UX Redesign] (P1)
   ├── Re-architect Hero with glassmorphism search & editorial typography
   ├── Upgrade PropertyCard with 16:10 aspect ratio, gold accents & elevated design
   ├── Redesign FilterPanel with responsive live filters & AED currency adornments
   └── Replace "Coming Soon" map boxes with real interactive Mapbox / Google Maps
            │
            ▼
[Phase E: Core Missing Marketing Pages] (P2)
   ├── Build /new-projects & /new-projects/[slug] (Off-Plan Developments)
   ├── Build /areas & /areas/[slug] (Dubai Community Guides)
   └── Build /about, /contact, and /developers directory
```

---

## 2. Detailed Remediation Work Packages

### FIX-01: Lock Down Property Mutation Endpoints with Authentication (P0)
- **Issue ID:** FIX-01 (Corresponds to RISK-01)
- **Severity:** **CRITICAL**
- **Page / Route:** `POST`, `PATCH`, `DELETE` on `/api/v1/properties`
- **File / Component:** `backend/src/routes/propertyRoutes.ts`
- **Steps to Reproduce:**
  Send `DELETE http://localhost:5001/api/v1/properties/<id>` via curl or Postman without headers. The property is deleted with HTTP 200.
- **Expected Result:**
  Request rejected with `HTTP 401 Unauthorized` or `HTTP 403 Forbidden`.
- **Actual Result:**
  Property is modified/deleted without authentication.
- **Root Cause:**
  Routes lack `protect` and `restrictTo` middleware.
- **Recommended Solution:**
  1. Create JWT verification middleware (`protect`) and role-based check (`restrictTo('admin', 'agent')`).
  2. Apply to `POST`, `PATCH`, `DELETE` routes in `propertyRoutes.ts`.
- **Dependencies:** User model / JWT utility (Phase 5).
- **Verification Criteria:**
  Supertest unit test verifying 401 on unauthenticated mutation, 403 on non-admin/agent role, and 200 on authorized admin JWT.

---

### FIX-02: Fix Global Rate Limiter Over-Restriction (P0)
- **Issue ID:** FIX-02 (Corresponds to RISK-03 & BUG-03)
- **Severity:** **CRITICAL**
- **Page / Route:** All routes (`/api/*`)
- **File / Component:** `backend/src/app.ts` (Lines 42–59)
- **Steps to Reproduce:**
  Make 100 requests within 15 minutes from localhost. Subsequent calls return HTTP 429.
- **Expected Result:**
  Healthcheck `/api/v1/health` is never blocked; public property browsing allows generous throughput (300–500 req/15m); localhost in development is not aggressively throttled.
- **Actual Result:**
  Entire application crashes with HTTP 429 after 30–40 page navigations.
- **Root Cause:**
  Single in-memory rate limiter mounted globally at `/api` with `max: 100`.
- **Recommended Solution:**
  1. Mount `healthRoutes` before the rate limiter.
  2. In development (`env.NODE_ENV === "development"`), relax rate limits.
  3. Create separate tiered rate limiters for public browsing vs auth vs admin.
- **Dependencies:** None.
- **Verification Criteria:**
  Sending 150 consecutive health checks and property queries from localhost returns 200 OK without 429.

---

### FIX-03: Eliminate Duplicate Property Detail Backend Calls (P1)
- **Issue ID:** FIX-03 (Corresponds to ARCH-02)
- **Severity:** **HIGH**
- **Page / Route:** `/properties/[slug]`
- **File / Component:** `src/lib/api/propertyService.ts` & `src/lib/api/client.ts`
- **Steps to Reproduce:**
  Navigate to `/properties/azure-residences-panoramic-marina-view` and observe backend terminal log: two identical `GET /api/v1/properties/azure-residences-panoramic-marina-view` requests are logged.
- **Expected Result:**
  Exactly ONE backend request is executed per page view.
- **Actual Result:**
  Two identical requests executed (one by `generateMetadata`, one by `PropertyDetailPage`).
- **Root Cause:**
  `client.ts` uses custom `AbortController` signal, bypassing Next.js fetch memoization.
- **Recommended Solution:**
  Wrap `getPropertyBySlug` in React's `cache()`:
  ```ts
  import { cache } from "react";
  export const getPropertyBySlug = cache(async (slug: string) => { ... });
  ```
- **Dependencies:** None.
- **Verification Criteria:**
  Visiting any property detail page produces exactly one backend log line for that property slug.

---

### FIX-04: Convert Homepage to Server Component & Eliminate Client-Side Fetch (P1)
- **Issue ID:** FIX-04 (Corresponds to ARCH-01)
- **Severity:** **HIGH**
- **Page / Route:** `/` (Homepage)
- **File / Component:** `src/app/(marketing)/page.tsx`
- **Steps to Reproduce:**
  Load `/` and observe client hydration: featured property cards appear with delay; backend logs show two calls in dev mode.
- **Expected Result:**
  Homepage renders fully populated HTML from server; featured properties are included in initial SSR payload; zero client-side fetch.
- **Actual Result:**
  Client component fetches data via `useEffect` after page load.
- **Root Cause:**
  `"use client"` directive on line 1 of `page.tsx`.
- **Recommended Solution:**
  Remove `"use client"` from `page.tsx`. Fetch `getFeaturedProperties(3)` directly in the Server Component. Extract interactive subcomponents (`HeroSearch`, `NavDrawer`) into dedicated client files.
- **Dependencies:** None.
- **Verification Criteria:**
  Page source HTML contains featured property titles before JavaScript execution; backend logs show zero client fetches from browser.

---

### FIX-05: Implement Real Viewing Request Persistence & Email Notification (P1)
- **Issue ID:** FIX-05 (Corresponds to BUG-01)
- **Severity:** **HIGH**
- **Page / Route:** `/properties/[slug]`
- **File / Component:** `src/components/property/EnquirySidebar.tsx`, `backend/src/models/Lead.ts`, `backend/src/controllers/inquiryController.ts`
- **Steps to Reproduce:**
  Submit viewing form modal. Confirm modal closes with success banner, but zero database records exist.
- **Expected Result:**
  New document created in `viewings` collection; automated email sent to assigned agent; verified confirmation ID displayed.
- **Actual Result:**
  Simulated in-memory submission (`setSubmitted(true)`).
- **Root Cause:**
  Backend inquiry API and model were not implemented.
- **Recommended Solution:**
  1. Create `Lead` and `ViewingRequest` Mongoose schemas.
  2. Implement `POST /api/v1/inquiries` in Express with Zod validation.
  3. Integrate Resend email delivery to notify agent.
  4. Connect frontend form with real POST request and error states.
- **Dependencies:** Resend / SendGrid API key (or local console mailer in development).
- **Verification Criteria:**
  Submitting viewing form creates document in MongoDB `viewings` collection and triggers email.

---

### FIX-06: Persist Property Favorites in LocalStorage (P2)
- **Issue ID:** FIX-06 (Corresponds to BUG-02)
- **Severity:** **MEDIUM**
- **Page / Route:** `/properties` & `/properties/[slug]`
- **File / Component:** `src/components/property/PropertyCard.tsx`
- **Steps to Reproduce:**
  Favorite a property, reload the page; favorite is lost.
- **Expected Result:**
  Heart icon remains active after page reload.
- **Actual Result:**
  Resets to false.
- **Root Cause:**
  `useState(false)` with no persistence.
- **Recommended Solution:**
  Create a `useFavorites` hook using `localStorage` with SSR-safe hydration.
- **Dependencies:** None.
- **Verification Criteria:**
  Favoriting property, reloading page, and checking heart icon shows it remains active.

---

### FIX-07: Luxury UI Overhaul (P1)
- **Issue ID:** FIX-07 (Corresponds to Task 1 UI/UX Audit)
- **Severity:** **HIGH**
- **Page / Route:** Sitewide (`/`, `/properties`, `/properties/[slug]`)
- **File / Component:** `src/components/`, `src/app/globals.css`, `src/app/(marketing)/`
- **Recommended Solution:**
  1. Elevate design tokens: add champagne gold gradients, refined charcoal backgrounds, borderless elevated cards, and smooth hover scales.
  2. Modernize Hero with translucent glassmorphic search bar and editorial serif typography.
  3. Upgrade property card layout to 16:10 aspect ratio with large price typography and elegant specification icons.
  4. Integrate interactive Mapbox/Google Maps to eliminate placeholder boxes.
- **Dependencies:** Mapbox / Google Maps API key.
- **Verification Criteria:**
  Visual review passes Dubai luxury real estate benchmark criteria across desktop, tablet, and mobile.
