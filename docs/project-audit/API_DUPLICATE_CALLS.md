# Investigation Report: Repeated & Duplicate API Calls

**Audit Date:** October 26, 2026  
**Auditor:** Senior Software Architect & Performance Engineer  
**Scope:** Network request flow, React lifecycle effects, caching layers, server vs. client component execution, and rate limiter interactions.

---

## 1. Executive Summary of Network Findings

Real-time browser network inspection and backend request logging revealed **systematic duplicate API calls** on every page that interacts with the backend. 

Key patterns discovered:
1. **Server Metadata + Page Component Double Fetch:** On `/properties/[slug]`, `generateMetadata` and `PropertyDetailPage` each independently execute an HTTP fetch for the exact same property document.
2. **Client Component Mounting in Strict Mode:** Both the Homepage (`FeaturedProperties`) and Catalog (`PropertyListingContent`) execute duplicate calls on mount due to unmemoized React 18/19 Strict Mode double-invocation in development.
3. **Unstable Dependency in Listing Page:** In `PropertyListingContent.tsx`, `parseSearchParams` returns a new object reference on every render, recreating the `fetchProperties` callback and re-triggering effects.
4. **Rate Limiter Cascading Failure:** The global rate limiter (`RATE_LIMIT_MAX_REQUESTS=100` per 15 minutes) treats these duplicate requests as separate hits, quickly triggering HTTP 429 (`RATE_LIMIT`) and crashing data loading for all subsequent page views.

---

## 2. API Endpoint Analysis Matrix

### Investigation 1: `GET /api/v1/properties/featured?limit=3`
- **Page / Route:** `/` (Homepage)
- **Component:** `FeaturedProperties` in `src/app/(marketing)/page.tsx`
- **Expected Number of Calls:** 1 call per session (or 0 client calls if server-rendered)
- **Actual Number of Calls:** **2 calls on initial page load**
  - Call 1: HTTP 200 (duration ~43ms)
  - Call 2: HTTP 304 / 200 (duration ~8ms)
- **Trigger / Initiator:** `useEffect` hook with empty dependency array `[]` inside a Client Component (`"use client"` on line 1 of `page.tsx`).
- **Continuous Requests:** No (does not loop continuously without interaction).
- **Development vs. Production Behavior:**
  - *Development:* Double-invoked by React Strict Mode (simulates unmount/remount).
  - *Production:* Single call on initial client hydration, but **should not be a client call at all** (Homepage should server-render this data).
- **Root Cause:**
  1. `src/app/(marketing)/page.tsx` is marked `"use client"` at line 1, forcing all data fetching into client-side `useEffect`.
  2. No caching or request deduplication wrapper exists on the client.
- **Proposed Architectural Fix:**
  - Refactor `src/app/(marketing)/page.tsx` into a Next.js Server Component.
  - Fetch `getFeaturedProperties(3)` directly in the Server Component and pass pre-rendered data as props to client interactive sections.

---

### Investigation 2: `GET /api/v1/properties?page=1&limit=12`
- **Page / Route:** `/properties` (Catalog Listing)
- **Component:** `PropertyListingContent` in `src/app/(marketing)/properties/PropertyListingContent.tsx`
- **Expected Number of Calls:** 1 call on initial load; 1 call per filter change or page change.
- **Actual Number of Calls:** **2 calls on initial page load**
  - Call 1: HTTP 200 (duration ~15ms)
  - Call 2: HTTP 304 / 200 (duration ~6ms)
- **Trigger / Initiator:**
  ```tsx
  const filters = React.useMemo(() => parseSearchParams(searchParams), [searchParams]);
  const fetchProperties = React.useCallback(async () => { ... }, [filters]);
  React.useEffect(() => { fetchProperties(); }, [fetchProperties]);
  ```
- **Continuous Requests:** No continuous loop detected when idle, but re-triggers synchronously whenever URL params change.
- **Development vs. Production Behavior:**
  - *Development:* Double-invoked on initial load by React Strict Mode.
  - *Production:* Single call on mount, but filter changes trigger cascading state updates.
- **Root Cause:**
  1. `FilterPanel.tsx` and `PropertyListingContent.tsx` both listen to `searchParams` and maintain separate duplicate states.
  2. `fetchProperties` calls `setLoading(true)` synchronously inside the effect, which triggers the React lint warning `react-hooks/set-state-in-effect`.
- **Proposed Architectural Fix:**
  - Unify filter state management. Pass `filters` down from `PropertyListingContent` to `FilterPanel` or lift filter state to URL as single source of truth without local duplicate mirrors.
  - Use React 19 `useTransition` or proper fetch effect cleanup (`AbortController`) to avoid redundant in-flight requests during rapid filter toggling.

---

### Investigation 3: `GET /api/v1/properties/:slug`
- **Page / Route:** `/properties/[slug]` (Property Detail Page)
- **Component:** `PropertyDetailPage` & `generateMetadata` in `src/app/(marketing)/properties/[slug]/page.tsx`
- **Expected Number of Calls:** 1 call per page request on the server.
- **Actual Number of Calls:** **2 identical calls on EVERY page load**
  - Call 1: HTTP 200 (triggered by `generateMetadata` on line 18)
  - Call 2: HTTP 200 (triggered by `PropertyDetailPage` on line 48)
- **Trigger / Initiator:**
  ```tsx
  // Call 1 in generateMetadata():
  export async function generateMetadata({ params }) {
    const { slug } = await params;
    const res = await getPropertyBySlug(slug); // <--- Call 1
    ...
  }

  // Call 2 in Page component:
  export default async function PropertyDetailPage({ params }) {
    const { slug } = await params;
    const res = await getPropertyBySlug(slug); // <--- Call 2
    ...
  }
  ```
- **Continuous Requests:** No (terminates after server render).
- **Development vs. Production Behavior:**
  - **Both Development AND Production execute 2 duplicate backend calls per request.**
- **Root Cause:**
  Next.js App Router automatically deduplicates requests across `generateMetadata` and Server Components **ONLY if the fetch function uses React cache or standard Next.js fetch memoization**. Because `src/lib/api/client.ts` instantiates a custom `new AbortController()` on line 75 and assigns `signal: controller.signal` to `fetch()`, Next.js's native request memoizer considers every call unique and bypasses deduplication!
- **Proposed Architectural Fix:**
  - Wrap `getPropertyBySlug` in React's `cache()`:
    ```ts
    import { cache } from "react";
    export const getPropertyBySlug = cache(async (slug: string) => { ... });
    ```
  - Allow Next.js request deduplication on the server by omitting custom abort signals during server-side execution.

---

### Investigation 4: Global Rate Limiting Cascade Trigger
- **Endpoint:** All `/api/*` routes
- **File:** `backend/src/app.ts` (lines 42–59)
- **Issue:**
  ```ts
  app.use("/api", rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // 100 requests per 15 minutes across all of /api
  }));
  ```
- **Impact:**
  Because the frontend executes 2–3 requests per page navigation (e.g. 2 for listing, 2 for detail + 1 for similar = 5 requests per property view), navigating through just 20 listings triggers the 100-request limit. Once tripped, the backend responds with:
  ```json
  { "success": false, "error": { "code": "RATE_LIMIT", "message": "Too many requests, please try again later." } }
  ```
  This immediately breaks `/api/v1/health`, catalog loading, and detail page rendering.
- **Proposed Architectural Fix:**
  - Remove `/health` from rate limiting.
  - Increase public browsing limit to 300–500 requests per 15 minutes.
  - In development (`NODE_ENV === "development"`), disable or relax rate limiting on `localhost`.
