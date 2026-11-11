# Technical Debt, Security Vulnerabilities & Risk Register

**Document Scope:** Complete technical risk evaluation across the codebase, infrastructure, dependencies, and architecture.

---

## 1. Critical Security Vulnerabilities (P0)

### RISK-01: Publicly Accessible Property Mutation Endpoints
- **Severity:** **CRITICAL**
- **Impact:** Any client on the network can send HTTP `POST`, `PATCH`, or `DELETE` requests to `/api/v1/properties` to create, modify, or delete property listings in MongoDB without authentication.
- **Affected Files:**
  - `backend/src/routes/propertyRoutes.ts` (Lines 26–33)
  - `backend/src/controllers/propertyController.ts`
- **Recommended Resolution:**
  1. Implement JWT-based authentication middleware (`protect`).
  2. Implement role-based authorization middleware (`restrictTo('admin', 'agent')`).
  3. Mount `protect` and `restrictTo` onto all mutation routes before any production or public staging deployment.

### RISK-02: Absence of Authentication & Identity Management
- **Severity:** **CRITICAL**
- **Impact:** No identity verification exists for users, agents, or administrators. Admin tools and lead assignment cannot be safely deployed.
- **Affected Files:**
  - `backend/src/models/User.ts` (Missing)
  - `backend/src/routes/authRoutes.ts` (Missing)
- **Recommended Resolution:**
  1. Execute Phase 5 immediately.
  2. Implement secure password hashing with bcrypt, HttpOnly SameSite cookies for tokens, and CSRF protection.

---

## 2. Architecture & Technical Debt (High Severity)

### RISK-03: Indiscriminate Global Rate Limiting
- **Severity:** **HIGH**
- **Impact:** In `backend/src/app.ts` (lines 42–59), a single rate limiter of 100 requests per 15 minutes is mounted across all `/api` routes. In development, testing, or multi-tab browsing, legitimate requests to `/api/v1/health` and `/api/v1/properties` are rejected with HTTP 429 (`RATE_LIMIT`).
- **Affected Files:**
  - `backend/src/app.ts`
  - `backend/.env`
- **Recommended Resolution:**
  1. Exempt `/health` from rate limiting.
  2. Segment rate limits: 300 req/15m for public property queries; 10 req/15m for login/register; 100 req/15m for authenticated admin APIs.
  3. In development (`NODE_ENV=development`), raise limit or disable for localhost.

### RISK-04: Mock Data & Simulated Lead Capture
- **Severity:** **HIGH**
- **Impact:** The `ViewingForm` modal on property detail pages gives users the false impression that a viewing appointment was successfully booked (`setSubmitted(true)`), while no record is persisted to MongoDB and no email is sent to agents.
- **Affected Files:**
  - `src/components/property/EnquirySidebar.tsx` (Lines 48–52)
- **Recommended Resolution:**
  1. Build `POST /api/v1/inquiries` and `POST /api/v1/viewings` in Phase 6.
  2. Connect the form to real backend persistence with loading states and email notifications.

### RISK-05: Client-Side-Only Favorites Toggle
- **Severity:** **MEDIUM**
- **Impact:** Clicking the heart icon on a property card toggles in-memory component state only. Upon refreshing the page, all saved favorites are lost.
- **Affected Files:**
  - `src/components/property/PropertyCard.tsx` (Lines 11–56)
- **Recommended Resolution:**
  1. Store favorited property IDs in browser `localStorage` as an immediate improvement.
  2. Synchronize with the backend user profile once Phase 5 Authentication is active.

---

## 3. Data Model & Integration Risks (Medium Severity)

### RISK-06: Missing Models for Projects, Leads, and Inquiries
- **Severity:** **MEDIUM**
- **Impact:** Homepage off-plan projects and Dubai neighborhood grids rely on hardcoded mock data. Database schemas for developments and customer inquiries do not exist yet.
- **Affected Files:**
  - `src/app/(marketing)/page.tsx`
  - `backend/src/models/index.ts`
- **Recommended Resolution:**
  1. Create `Project` model in Phase 8.
  2. Create `Lead` and `ViewingRequest` models in Phase 6.

### RISK-07: Static Map Placeholders
- **Severity:** **MEDIUM**
- **Impact:** Listing map view and property location sections render static placeholders rather than interactive geolocated maps.
- **Affected Files:**
  - `src/app/(marketing)/properties/PropertyListingContent.tsx`
  - `src/app/(marketing)/properties/[slug]/page.tsx`
- **Recommended Resolution:**
  1. Integrate Mapbox GL JS or Google Maps JavaScript SDK using existing coordinates in MongoDB (`location.coordinates`).

---

## 4. Environment, Performance & SEO Risks (Medium / Low Severity)

### RISK-08: Port 5000 Collision on macOS
- **Severity:** **MEDIUM (Resolved locally, risk for teammates)**
- **Impact:** macOS AirPlay Receiver (`AirTunes`) binds to port 5000 by default and returns HTTP 403 Forbidden. Running backend on port 5000 fails silently or causes confusing permission errors.
- **Affected Files:**
  - `backend/.env`
  - `.env.local`
- **Recommended Resolution:**
  1. Standardize backend port on `5001` across all `.env.example` templates and documentation.

### RISK-09: Missing Structured Data (JSON-LD) for Real Estate SEO
- **Severity:** **LOW**
- **Impact:** Property detail pages currently render standard HTML meta tags and OpenGraph tags, but lack Google `RealEstateListing` JSON-LD schema, limiting search engine rich snippet visibility.
- **Affected Files:**
  - `src/app/(marketing)/properties/[slug]/page.tsx`
- **Recommended Resolution:**
  1. Inject `<script type="application/ld+json">` with schema markup in Phase 9.

### RISK-10: Absence of CDN & Cloud Media Storage
- **Severity:** **MEDIUM**
- **Impact:** Property images currently reference external Unsplash URLs. In a production environment, user/agent uploaded photos must be securely stored in an object storage bucket (AWS S3) or CDN (Cloudinary) with automatic responsive resizing.
- **Affected Files:**
  - `backend/src/models/Property.ts`
- **Recommended Resolution:**
  1. Build media upload service in Phase 8 with Cloudinary or S3 integration.
