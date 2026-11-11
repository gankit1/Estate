# Missing & Incomplete Pages Audit

**Audit Date:** October 26, 2026  
**Auditor:** Software Architect & Product Manager  
**Scope:** Comparison of active Next.js routes in `src/app/` against standard Dubai luxury real estate platform architecture and navigation links.

---

## 1. Master Route Audit Matrix

| # | Route / Page | Expected Path | Current Status | Current Behavior | Missing Elements / Required Action |
|---|---|---|---|---|---|
| **1** | **Homepage** | `/` | **EXISTS & WORKS** | Renders full marketing layout | Needs refactoring to Server Component to avoid client-side fetch. |
| **2** | **Properties Catalog** | `/properties` | **EXISTS & WORKS** | Full listing with URL filters | Needs map SDK integration and deduped fetch effect. |
| **3** | **Property Detail** | `/properties/[slug]` | **EXISTS & WORKS** | Dynamic property detail | Needs `React.cache()` to eliminate duplicate server fetch; needs real viewing persistence. |
| **4** | **Properties for Sale** | `/buy` | **PLACEHOLDER / REDIRECT** | Links to `/properties?purpose=sale` | Dedicated landing page with Dubai buyer guide and mortgage calculator missing. |
| **5** | **Properties for Rent** | `/rent` | **PLACEHOLDER / REDIRECT** | Links to `/properties?purpose=rent` | Dedicated landing page with tenant rights, Ejari guidance, and annual rental trends missing. |
| **6** | **Off-Plan Projects** | `/new-projects` | **MISSING (404)** | Clicking homepage card returns 404 | Dedicated directory for off-plan towers, master developments, and payment plan filters. |
| **7** | **Project Detail** | `/new-projects/[slug]` | **MISSING (404)** | Returns 404 | Construction milestones, payment plan schedule, floor plan brochures, developer profile. |
| **8** | **Developers Directory** | `/developers` | **MISSING (404)** | Footer link returns 404 | Directory of major Dubai developers (Emaar, DAMAC, Nakheel, Meraas, Sobha, Omniyat). |
| **9** | **Developer Detail** | `/developers/[slug]` | **MISSING (404)** | Returns 404 | Developer history, active off-plan developments, completed communities, handover track record. |
| **10** | **Dubai Areas Directory** | `/areas` | **MISSING (404)** | Footer and homepage link return 404 | Neighborhood explorer across 8+ prime Dubai districts. |
| **11** | **Area Community Guide** | `/areas/[slug]` | **MISSING (404)** | Links to `/areas/dubai-marina` return 404 | Community lifestyle guide, average rental yields, metro access, top schools, active listings in area. |
| **12** | **Investment Guide** | `/investment` | **MISSING (404)** | Header/footer link returns 404 | Dubai Golden Visa requirements, ROI/yield calculator, tax-free purchasing breakdown. |
| **13** | **About Us** | `/about` | **MISSING (404)** | Nav link returns 404 | Company story, RERA credentials, leadership team, agent directory. |
| **14** | **Contact Us** | `/contact` | **MISSING (404)** | Nav link returns 404 | Office location map, multi-department contact form, VIP investor concierge booking. |
| **15** | **Insights & Blog** | `/blog` | **MISSING (404)** | Footer link returns 404 | Market reports, Dubai Land Department transaction news, quarterly price index analysis. |
| **16** | **Article Detail** | `/blog/[slug]` | **MISSING (404)** | Returns 404 | Rich article view with related properties and agent author profile. |
| **17** | **Saved Properties** | `/favorites` | **MISSING (404)** | No saved listings page | Saved properties grid with price drop alerts and PDF comparison export. |
| **18** | **Property Comparison** | `/compare` | **MISSING (404)** | No comparison tool | Side-by-side spec comparison table (price/sqft, service charges, amenities, handover dates). |
| **19** | **User Login** | `/login` | **MISSING (404)** | Returns 404 | Client portal login with email/password, magic link, or Google OAuth. |
| **20** | **User Registration** | `/register` | **MISSING (404)** | Returns 404 | Buyer/investor registration with preference questionnaire (budget, preferred areas). |
| **21** | **User Dashboard** | `/dashboard` | **MISSING (404)** | Returns 404 | Saved searches, viewing request schedule, document vault, agent message history. |
| **22** | **Agent Dashboard** | `/agent/dashboard` | **MISSING (404)** | Returns 404 | Assigned leads, scheduled viewings, active listing management, client CRM pipeline. |
| **23** | **Admin Dashboard** | `/admin/dashboard` | **MISSING (404)** | Returns 404 | Master property CRUD, agent user management, lead routing, platform analytics. |

---

## 2. Statistical Route Breakdown

- **Total Expected Routes in Full Platform Scope:** **23 Pages**
- **Existing & Functionally Working:** **3 Pages** (13.0%) — `/`, `/properties`, `/properties/[slug]`
- **Existing Placeholders / Redirects:** **2 Pages** (8.7%) — `/buy`, `/rent`
- **Completely Missing (Returning 404 Not Found):** **18 Pages** (78.3%)

---

## 3. High-Priority User Journey Deficiencies

1. **Dead Links in Header and Footer:**
   The navigation header and footer display links to `/new-projects`, `/areas`, `/about`, `/contact`, `/investment`, `/blog`, and `/developers`. Clicking **any of these links directly returns a 404 Not Found page**, severely breaking user immersion and professional confidence.
2. **Missing Customer Account System:**
   There is no way for a client to log in, track their viewings, or view saved properties.
3. **Missing Backoffice Interface:**
   Admins and agents have no graphical interface to add new listings, review customer inquiries, or update property statuses.
