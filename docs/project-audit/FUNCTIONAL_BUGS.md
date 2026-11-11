# Functional Verification & Bug Inventory

**Audit Date:** October 26, 2026  
**Auditor:** QA Engineering Lead & Senior Full-Stack Engineer  
**Methodology:** Direct manual browser inspection, network monitoring, and edge-case execution across desktop, tablet, and mobile viewports.

---

## 1. Feature Functional Status Classification

| # | Feature / User Journey | Functional Status | Data Source | Evidence / Findings |
|---|---|---|---|---|
| **1** | **Homepage Navigation** | **WORKING** | Next.js Router | Desktop links, logo click, sticky header scroll behavior work. |
| **2** | **Hero Property Search** | **PARTIALLY WORKING** | Client Query Navigation | Navigates to `/properties?purpose=...&propertyType=...` correctly, but lacks live location autocomplete. |
| **3** | **Buy / Rent Switcher** | **WORKING** | URL `searchParams` + Express | Toggles purpose parameter and updates listing results. |
| **4** | **Property Type Filters** | **WORKING** | Express Query Builder | Apartment, Villa, Penthouse, Townhouse filters filter MongoDB correctly. |
| **5** | **Price Range Filters** | **WORKING** | Express Query Builder | Min and Max price inputs filter price boundaries correctly. |
| **6** | **Bedrooms / Bathrooms** | **WORKING** | Express Query Builder | Matches bedroom/bathroom counts in database. |
| **7** | **Area Neighborhood Filters**| **WORKING** | Express Regex Match | Matches area name against populated `areaRef`. |
| **8** | **Catalog Sorting** | **WORKING** | Mongoose `sort()` | `price-asc`, `price-desc`, `newest` reorder cards correctly. |
| **9** | **Pagination Controls** | **WORKING** | Mongoose `skip()`/`limit()` | Page buttons and Next/Prev controls update URL and results. |
| **10** | **Property Card Navigation**| **WORKING** | Next.js Link | Clicking card opens correct `/properties/[slug]` detail view. |
| **11** | **Property Detail Rendering**| **WORKING** | Real MongoDB API | Title, price in AED, specs, amenities, and agent card display accurately. |
| **12** | **Image Gallery & Lightbox** | **PARTIALLY WORKING** | Client React State | Thumbnails update main photo and lightbox opens; lacks mobile touch swipe and keyboard arrow listener. |
| **13** | **Favorites / Bookmarking** | **BROKEN / SIMULATED** | Transient `useState` | **Defect:** Does NOT save to `localStorage` or DB. Resets immediately on reload. |
| **14** | **WhatsApp CTA Link** | **WORKING** | `https://wa.me/` | Opens WhatsApp with pre-filled message including property title. |
| **15** | **Direct Phone Call CTA** | **WORKING** | `tel:` URL protocol | Triggers telephone call to agent's assigned phone number. |
| **16** | **Viewing Request Form** | **BROKEN / SIMULATED** | Transient `useState` | **Defect:** Form modal claims appointment is booked, but sends NO network request and saves NO record to MongoDB. |
| **17** | **Mobile Navigation Drawer** | **WORKING** | Framer Motion Drawer | Hamburger menu opens slide-out drawer; links navigate cleanly. |
| **18** | **Mobile Filter Sheet** | **WORKING** | Client Modal | Filter button opens full-screen filter dialog; applies to URL. |
| **19** | **Error & Retry States** | **WORKING** | Client Error Boundary | Displays retry button on 500/timeout; retrying fetches fresh data. |
| **20** | **Empty Results State** | **WORKING** | Client Component | Displays illustration and "Clear All Filters" button when 0 results match. |
| **21** | **Interactive Map View** | **NOT IMPLEMENTED** | Static Box | Prominent placeholder: *"Interactive map will be available in a future update"*. |

---

## 2. Detailed Bug Reports

### BUG-01: Viewing Form Submission is Completely Fake / Simulated
- **Issue ID:** BUG-01
- **Severity:** **CRITICAL (High Business Impact)**
- **Route:** `/properties/[slug]`
- **File / Component:** `src/components/property/EnquirySidebar.tsx` (Lines 48–52)
- **Steps to Reproduce:**
  1. Open any property detail page (e.g., `http://localhost:3000/properties/azure-residences-panoramic-marina-view`).
  2. Click the "Book a Viewing" button.
  3. Enter Name, Email, Phone, select a Viewing Date, and click "Confirm Viewing Request".
  4. Observe the green confirmation screen stating *"Viewing Request Received! Sarah Thompson will contact you shortly."*
  5. Check browser Network tab: **Zero HTTP requests were sent**.
  6. Check MongoDB: **Zero records created in database**.
- **Expected Result:**
  Form should dispatch `POST /api/v1/inquiries` or `POST /api/v1/viewings`, persist lead details to MongoDB, and trigger an automated email notification to the agent.
- **Actual Result:**
  Pure client-side simulation: `setSubmitted(true)`. The lead is lost immediately upon closing the modal.
- **Root Cause:**
  `handleSubmit` in `EnquirySidebar.tsx` was coded as a frontend placeholder with a comment: `// In Phase 3, this will POST to /api/v1/viewings`.
- **Recommended Solution:**
  1. Create `Lead` and `ViewingRequest` Mongoose schemas in backend.
  2. Implement `POST /api/v1/inquiries` in Express.
  3. Connect `EnquirySidebar.tsx` to the API with loading spinners and real error handling.

---

### BUG-02: Favorites Do Not Persist Across Reloads
- **Issue ID:** BUG-02
- **Severity:** **MEDIUM**
- **Route:** `/properties` & `/properties/[slug]`
- **File / Component:** `src/components/property/PropertyCard.tsx` (Lines 12–54)
- **Steps to Reproduce:**
  1. Navigate to `http://localhost:3000/properties`.
  2. Click the heart icon on any property card to save it (heart turns red).
  3. Refresh the page (`Cmd + R` or `F5`).
  4. Observe the heart icon: it resets back to un-saved (white/gray).
- **Expected Result:**
  Favorited properties should remain saved across page reloads (persisted in `localStorage` for anonymous users and synced to user account for logged-in users).
- **Actual Result:**
  Heart icon is driven solely by local React state: `const [saved, setSaved] = React.useState(false);`.
- **Root Cause:**
  No persistence layer (`localStorage` or backend API) was implemented for bookmarking.
- **Recommended Solution:**
  Implement a `useFavorites` hook backed by `localStorage` as an interim fix, and sync with the User model in Phase 5.

---

### BUG-03: Rate Limiter Blocks Legitimate Localhost Browsing (HTTP 429)
- **Issue ID:** BUG-03
- **Severity:** **HIGH**
- **Route:** All routes (`/`, `/properties`, `/properties/[slug]`)
- **File / Component:** `backend/src/app.ts` (Lines 42–59)
- **Steps to Reproduce:**
  1. Open the website on `localhost:3000`.
  2. Browse through 15–20 properties or click through 5 filter combinations.
  3. Refresh the page or click a new property.
  4. The page crashes with an error banner: *"Too many requests, please try again later."*
  5. Visiting `http://localhost:5001/api/v1/health` returns HTTP 429.
- **Expected Result:**
  Development browsing and automated test runs should never be blocked by rate limiters. Health check endpoints must never be rate-limited.
- **Actual Result:**
  A single global rate limiter (`max: 100` per 15 minutes) applies to all incoming localhost requests.
- **Root Cause:**
  Overly aggressive global rate limiter configured in `backend/src/app.ts` without route exemptions or environment overrides.
- **Recommended Solution:**
  1. Exempt `/health` from rate limiting.
  2. Raise public query limits to 300–500 req/15m.
  3. In development mode (`NODE_ENV === "development"`), relax rate limits for `localhost`.
