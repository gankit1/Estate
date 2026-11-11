# Prioritized Pending Tasks Backlog — Dubai Real Estate Platform

**Priority Definitions:**
- **P0 — Critical Blocker:** Security vulnerabilities, public data mutation risks, or architecture release blockers.
- **P1 — Core Business Functionality:** Essential features for lead generation, property transactions, and agent operations.
- **P2 — Important Enhancement:** High-value user experience, SEO, performance, and management capabilities.
- **P3 — Polish & Optional:** Nice-to-have visual flourishes, advanced analytics, and supplementary features.

---

## 1. Master Pending Task Register

| Task ID | Phase | Task Description | Priority | Status | Dependencies | Acceptance Criteria |
|---|---|---|---|---|---|---|
| **TSK-SEC-01** | Phase 5 | Protect Property Mutation Endpoints with Auth Middleware | **P0** | PENDING | None | `POST`, `PATCH`, `DELETE` on `/api/v1/properties` return `401 Unauthorized` without valid JWT; only `admin` and `agent` roles allowed. |
| **TSK-AUT-01** | Phase 5 | User Model & Password Hashing (bcrypt + Mongoose) | **P0** | PENDING | None | `User` schema supports `email`, `passwordHash`, `name`, `role` (`buyer`, `agent`, `admin`), `avatar`, and `isActive`. |
| **TSK-AUT-02** | Phase 5 | Authentication Controller & JWT Token Lifecycle | **P0** | PENDING | TSK-AUT-01 | Implements `/api/v1/auth/register`, `/login`, `/logout`, `/refresh-token`, `/me` with HttpOnly secure cookie and CSRF protection. |
| **TSK-AUT-03** | Phase 5 | Role-Based Authorization Middleware (`restrictTo`) | **P0** | PENDING | TSK-AUT-02 | Middleware inspects JWT claims and enforces granular role permissions (`admin`, `agent`, `buyer`). |
| **TSK-AUT-04** | Phase 5 | Frontend Auth Context, Login & Register Pages | **P1** | PENDING | TSK-AUT-02 | Next.js routes `/login` and `/register` with form validation, error banners, and persistent session state. |
| **TSK-LED-01** | Phase 6 | Inquiries & Viewing Requests Database Models | **P1** | PENDING | None | `Lead` and `ViewingRequest` Mongoose schemas with property, agent, buyer contact info, preferred date/time, and status. |
| **TSK-LED-02** | Phase 6 | Lead Submission API (`POST /api/v1/inquiries`) | **P1** | PENDING | TSK-LED-01 | Validates form payload with Zod, captures source page/UTM parameters, persists record in MongoDB, returns 201. |
| **TSK-LED-03** | Phase 6 | Connect Frontend ViewingForm & Sidebar to Inquiries API | **P1** | PENDING | TSK-LED-02 | Form submits real POST request, handles loading spinner, displays real confirmation, and handles API errors. |
| **TSK-LED-04** | Phase 6 | Email & WhatsApp Agent Notification Service | **P1** | PENDING | TSK-LED-02 | Automated email dispatch (Resend/SendGrid) to assigned agent and buyer confirmation upon viewing request. |
| **TSK-DSH-01** | Phase 7 | Admin & Agent Dashboard Layout & Navigation | **P1** | PENDING | TSK-AUT-03 | Authenticated `/dashboard` route group with role-based navigation sidebar and responsive stats widgets. |
| **TSK-DSH-02** | Phase 7 | Property Listing Management CRUD (Admin / Agent) | **P1** | PENDING | TSK-DSH-01, TSK-SEC-01 | Full data table with filters, draft/published toggles, and property creation/edit wizard form. |
| **TSK-DSH-03** | Phase 7 | Lead Management & Status Workflow Screen | **P1** | PENDING | TSK-DSH-01, TSK-LED-02 | Table of incoming leads with status pipeline (`New`, `Contacted`, `Viewing Scheduled`, `Closed`, `Lost`). |
| **TSK-CNT-01** | Phase 8 | Off-Plan Projects Schema, API & Dedicated Routes | **P1** | PENDING | None | `Project` model, `/api/v1/projects` CRUD, and public frontend `/new-projects` and `/new-projects/[slug]` pages. |
| **TSK-CNT-02** | Phase 8 | Dubai Areas Directory & Community Guide Pages | **P1** | PENDING | None | `/api/v1/areas` endpoints and public frontend `/areas` and `/areas/[slug]` pages with neighborhood amenities. |
| **TSK-CNT-03** | Phase 8 | Developer Portfolio Directory & Profiles | **P2** | PENDING | None | `/api/v1/developers` endpoints and public frontend `/developers` and `/developers/[slug]` pages. |
| **TSK-MAP-01** | Phase 8 | Interactive Mapbox / Google Maps Integration | **P2** | PENDING | None | Interactive map view on `/properties` with price pins, cluster markers, and coordinate bounds filtering. |
| **TSK-MED-01** | Phase 8 | Cloudinary / S3 Presigned URL Media Upload Service | **P1** | PENDING | TSK-AUT-03 | Multipart image upload endpoint with resizing, WebP compression, and Cloudinary/S3 cloud storage. |
| **TSK-SEO-01** | Phase 9 | Structured Data (JSON-LD) & Dynamic Sitemap Generator | **P2** | PENDING | None | Generates `sitemap.xml`, `robots.txt`, and Google `RealEstateListing` JSON-LD structured schemas. |
| **TSK-A11-01** | Phase 9 | Complete Accessibility & Keyboard Navigation Audit | **P2** | PENDING | None | WCAG 2.1 AA compliance, accessible modal focus traps, aria landmarks, color contrast verification. |
| **TSK-PRF-01** | Phase 9 | Performance Optimization & Core Web Vitals (CWV) | **P2** | PENDING | None | LCP < 2.0s, CLS < 0.1, Next.js image optimization, Redis caching layer for read-heavy property APIs. |
| **TSK-SEC-02** | Phase 9 | Security Hardening & Rate Limit Segmentation | **P1** | PENDING | None | Separate rate limit tiers for auth, public read, and admin; exempt health check; MongoDB sanitize; HSTS. |
| **TSK-DEP-01** | Phase 10 | Production Dockerization & Docker Compose | **P1** | PENDING | TSK-SEC-01 | Production Multi-stage Dockerfiles for Next.js and Express backend with non-root runtime users. |
| **TSK-DEP-02** | Phase 10 | CI/CD Automated Test Pipeline & Cloud Deployment | **P1** | PENDING | TSK-DEP-01 | GitHub Actions pipeline running lint, unit tests, E2E tests, and deploying to Vercel + AWS / Render / DigitalOcean. |

---

## 2. Detailed Implementation Plans for Key Subtasks

### 2.1 Authentication & Role-Based Access Control (RBAC)
- **Files to Create:**
  - `backend/src/models/User.ts`
  - `backend/src/controllers/authController.ts`
  - `backend/src/routes/authRoutes.ts`
  - `backend/src/middlewares/auth.ts`
  - `backend/src/validators/auth.ts`
  - `src/lib/api/authService.ts`
  - `src/context/AuthContext.tsx`
  - `src/app/(auth)/login/page.tsx`
  - `src/app/(auth)/register/page.tsx`
- **Security Protocols:**
  - Passwords hashed with `bcrypt` (12 rounds).
  - Short-lived Access Token (15m) + Long-lived Refresh Token (7d) stored in `HttpOnly`, `SameSite=Strict`, `Secure` cookies.
  - Granular roles: `admin` (full access), `agent` (manages assigned listings & leads), `buyer` (saves favorites & manages enquiries).

### 2.2 Securing Property Mutation APIs (P0 Urgent Remediation)
- **Current Vulnerability:** `POST /api/v1/properties`, `PATCH /api/v1/properties/:id`, and `DELETE /api/v1/properties/:id` in `backend/src/routes/propertyRoutes.ts` lack authentication.
- **Remediation Action:**
  ```ts
  // Apply protection middleware:
  router.post("/", protect, restrictTo("admin", "agent"), validate(createPropertySchema, "body"), ctrl.createProperty);
  router.patch("/:id", protect, restrictTo("admin", "agent"), validate(objectIdParamSchema, "params"), validate(updatePropertySchema, "body"), ctrl.updateProperty);
  router.delete("/:id", protect, restrictTo("admin"), validate(objectIdParamSchema, "params"), ctrl.deleteProperty);
  ```

### 2.3 Lead & Viewing Request Persistence
- **Files to Create:**
  - `backend/src/models/Lead.ts`
  - `backend/src/models/ViewingRequest.ts`
  - `backend/src/controllers/inquiryController.ts`
  - `backend/src/routes/inquiryRoutes.ts`
  - `backend/src/services/emailService.ts`
  - `src/lib/api/inquiryService.ts`
- **Functional Flow:**
  1. User fills `ViewingForm` modal on property detail page.
  2. Frontend dispatches `POST /api/v1/inquiries` with property ID, date, time, name, email, phone, and optional message.
  3. Backend persists record in `viewings` collection.
  4. Backend triggers asynchronous email notification via Resend to the assigned agent.
  5. Frontend displays verified confirmation with calendar booking summary.

### 2.4 Cloudinary / Media Asset Management
- **Files to Create:**
  - `backend/src/services/mediaService.ts`
  - `backend/src/routes/uploadRoutes.ts`
  - `backend/src/middlewares/upload.ts` (using `multer` with file size & mime type validation)
- **Capabilities:**
  - Accepts JPEG, PNG, WebP up to 10MB.
  - Automatically generates responsive breakpoints (thumb 400px, medium 800px, hero 1600px).
  - Stores Cloudinary `public_id` and HTTPS URLs in Mongoose property documents.

### 2.5 Performance Optimization & Production Hardening
- **Rate Limit Segmentation:**
  - Public browsing: 300 requests per 10 minutes.
  - Health check (`/health`): Exempt from rate limits.
  - Auth endpoints (`/api/v1/auth/login`): 5 attempts per 15 minutes to prevent brute-forcing.
- **Caching Layer:**
  - Implement Redis caching for high-traffic read queries (`/api/v1/properties/featured` and `/api/v1/properties/:slug`).
