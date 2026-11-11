# Architecture & Codebase Review

**Audit Date:** October 26, 2026  
**Auditor:** Principal Software Architect  
**Focus:** Next.js App Router paradigm compliance, server/client component boundary, caching strategy, state synchronization, backend API design, and database query efficiency.

---

## 1. Frontend Architecture Issues

### ARCH-01: Monolithic Client Component on Homepage (`"use client"`)
- **Location:** `src/app/(marketing)/page.tsx` (Line 1)
- **Problem:**
  Marking the entire marketing homepage as `"use client"` circumvents Next.js 16 Server Components benefits. All static sections (Trust metrics, Why Choose Us, Testimonials, Value props) are bundled into the client JavaScript payload. Furthermore, the `FeaturedProperties` section is forced to fetch data via a client-side `useEffect`, resulting in:
  - Cumulative Layout Shift (CLS) as cards pop in after client hydration.
  - Slower Largest Contentful Paint (LCP).
  - Double fetching on initial mount in React Strict Mode.
- **Architectural Solution:**
  Refactor `page.tsx` to an async Server Component. Fetch `getFeaturedProperties(3)` on the server with Next.js ISR (`revalidate: 3600`). Extract only interactive parts (Hero search tabs, mobile drawers) into lightweight client component islands.

---

### ARCH-02: Bypassed Request Deduplication in API Client (`client.ts`)
- **Location:** `src/lib/api/client.ts` (Lines 66–90) & `src/app/(marketing)/properties/[slug]/page.tsx`
- **Problem:**
  On `/properties/[slug]`, `generateMetadata` and `PropertyDetailPage` both invoke `getPropertyBySlug(slug)`. In standard Next.js, identical `fetch` requests within the same server render pass are automatically deduplicated. However, in `client.ts`:
  ```ts
  const controller = new AbortController();
  const res = await fetch(url, {
    signal: controller.signal, // <--- Bypasses Next.js fetch memoization
    ...
  });
  ```
  Passing a custom `AbortSignal` makes each request unique to the internal fetch cache, forcing Next.js to make **two independent HTTP requests to Express** on every single page load.
- **Architectural Solution:**
  1. Wrap `getPropertyBySlug` with React's `cache()`:
     ```ts
     import { cache } from "react";
     export const getPropertyBySlug = cache(async (slug: string) => { ... });
     ```
  2. Omit custom abort signals during server-side execution where request lifecycles are tied to the incoming page request.

---

### ARCH-03: Dual State Synchronization Between URL and Filter Components
- **Location:** `src/app/(marketing)/properties/PropertyListingContent.tsx` & `src/components/property/FilterPanel.tsx`
- **Problem:**
  `PropertyListingContent` reads `searchParams` and parses them into a `filters` object. Inside it, `FilterPanel` ALSO reads `searchParams`, copies them into a local `filters` state via `useState`, and runs an internal `useEffect` to sync whenever `searchParams` change.
  This creates two parallel sources of truth. When the user modifies filters, `FilterPanel` updates local state, calls `router.push`, which updates the URL, which triggers effects in both components, causing unnecessary re-renders and cascading updates.
- **Architectural Solution:**
  Treat the URL search parameters as the **single source of truth**. Remove internal duplicate state in `FilterPanel`, or pass `filters` and `onFilterChange` down from `PropertyListingContent` as controlled props.

---

## 2. Backend Architecture Issues

### ARCH-04: Unauthenticated Mutation Endpoints (Critical Security Defect)
- **Location:** `backend/src/routes/propertyRoutes.ts` (Lines 26–33)
- **Problem:**
  `POST /api/v1/properties`, `PATCH /api/v1/properties/:id`, and `DELETE /api/v1/properties/:id` have no authentication or authorization middleware. They are completely open to public network callers.
- **Architectural Solution:**
  Implement JWT authentication (`protect` middleware) and role-based access control (`restrictTo('admin', 'agent')`) before any deployment.

---

### ARCH-05: Coarse-Grained Global Rate Limiting
- **Location:** `backend/src/app.ts` (Lines 42–59)
- **Problem:**
  The rate limiter applies a flat `100 requests / 15 minutes` rule to all endpoints prefixed with `/api`. This includes static health checks, public property catalog queries, and authenticated requests. Because each page load triggers 2–3 requests, normal user browsing triggers HTTP 429 within minutes.
- **Architectural Solution:**
  1. Exempt `/health` from rate limiting.
  2. Implement segmented rate limit tiers:
     - Public property browsing: `300–500 req / 15m`.
     - Authentication / Login: `10 req / 15m` (strict anti-brute-force).
     - Authenticated admin routes: `200 req / 15m`.
  3. In development (`NODE_ENV === "development"`), relax or bypass rate limits for localhost callers.

---

### ARCH-06: Missing Persistence Models for Inquiries & Leads
- **Location:** `backend/src/models/`
- **Problem:**
  While `Property`, `Agent`, `Developer`, and `Area` schemas exist, the database lacks schemas for `Lead`, `ViewingRequest`, `User`, and `Project`. Customer inquiries submitted via the frontend have nowhere to be stored.
- **Architectural Solution:**
  Define structured Mongoose schemas for `Lead` (capturing customer contact, source, notes, status) and `ViewingRequest` (capturing property reference, requested timestamp, agent assignment, confirmation status).
