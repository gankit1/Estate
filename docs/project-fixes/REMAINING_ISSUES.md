# Remaining Issues Backlog

The following verified issues from the audit are pending execution, strictly ordered by priority:

---

## Batch 1 — Critical Security & Stability
- [x] **Issue 1.1 — Unprotected Property Mutation APIs** *(VERIFIED)*
- [x] **Issue 1.2 — Global Rate Limiter Tuning & Route Segregation** *(VERIFIED)*
  - Segregated public browsing rate limits (600 req/15 min) from mutations (60 req/15 min) and auth (10 req/15 min).
  - Configured `trust proxy` and health endpoint exemption.
  - Added predictable 429 response structure.

---

## Batch 2 — Duplicate API Calls and Performance
- [ ] **Issue 2.1 — Property Detail Duplicate Fetching**
  - Deduplicate requests between `generateMetadata()` and `PropertyDetailPage()` using `React.cache()` or equivalent request-scoped deduplication.
- [ ] **Issue 2.2 — Homepage Duplicate API Calls**
  - Eliminate redundant client-side `useEffect` requests by using Server Component fetching.
- [ ] **Issue 2.3 — Property Listing Repeated Requests**
  - Unify filter state as single source of truth, eliminating redundant calls on `FilterPanel`.

---

## Batch 3 — Existing Functional Bugs
- [ ] **Issue 3.1 — Viewing Request Form Persistence**
  - Connect `EnquirySidebar.tsx` to validated backend viewing submission endpoint.
- [ ] **Issue 3.2 — Favorites Persistence**
  - Provide local/session persistence across refreshes for saved properties.
- [ ] **Issue 3.3 — Map Integration**
  - Implement real map preview strategy without broken placeholders.
- [ ] **Issue 3.4 — Other Broken Interactions**
  - Hero search, pagination, mobile drawer, error boundaries.

---

## Batch 4 — Professional UI/UX Redesign
- [ ] Design audit & direction proposal (Burnt sienna, terracotta, sand neutrals, luxury Dubai styling).
- [ ] Page-by-page redesign execution after explicit approval.

---

## Batch 5 — Missing Pages
- [ ] 18 missing routes (marketing, user dashboard, agent/admin dashboard).

---

## Batch 6 — Final Quality Assurance
- [ ] Full automated E2E and regression suite.
