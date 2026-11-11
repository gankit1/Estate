# Test Verification & Execution Audit Report

**Audit Date:** October 26, 2026  
**Auditor:** QA Engineering Lead  
**Test Harness:** Vitest v5.0.3 (Frontend) | Vitest v3.0.6 (Backend) | Supertest v7.0.0 | Playwright v1.58.0  
**Testing Rule:** Passing automated tests must not override manually reproduced defects.

---

## 1. Test Execution Summary

| Quality Gate | Command | Result | Tests Passed | Tests Failed | Tests Skipped | Duration |
|---|---|---|---|---|---|---|
| **Frontend TypeScript** | `npx tsc --noEmit` | **PASS** | 0 errors | 0 | 0 | 2.1s |
| **Frontend ESLint** | `npm run lint` | **PASS** | 0 errors (18 warnings) | 0 | 0 | 4.8s |
| **Frontend Unit/Component** | `npm test` | **PASS** | **78** | 0 | 0 | 1.9s |
| **Frontend Production Build** | `npm run build` | **PASS** | 5 routes compiled | 0 | 0 | 3.2s |
| **Backend TypeScript** | `npx tsc --noEmit` | **PASS** | 0 errors | 0 | 0 | 1.8s |
| **Backend ESLint** | `npm run lint` | **PASS** | 0 errors | 0 | 0 | 1.1s |
| **Backend Integration** | `npm test` | **PASS** | **31** | 0 | 0 | 3.1s |
| **Backend Production Build** | `npm run build` | **PASS** | Compiled to `dist/` | 0 | 0 | 1.3s |
| **Playwright E2E Suite** | `npx playwright test` | **PASS** | **17** | 0 | 1 (Desktop skipped mobile) | 13.2s |
| **TOTAL AUTOMATED TESTS** | — | **ALL PASS** | **126 tests** | **0** | **1** | — |

---

## 2. Browser Console & Network Runtime Errors

While automated tests exit with code 0, active browser inspection and network monitoring revealed significant runtime anomalies:

### 1. Browser Console Warnings
- **React Hook Warning:** `react-hooks/set-state-in-effect` triggered in `PropertyListingContent.tsx` on line 244 and `FilterPanel.tsx` on line 114 when updating state directly within effect bodies.
- **Image Optimization Warnings:** Next.js warning on `<img>` tags in `setup.tsx` and `PropertyDetailPage` floor plan schematics advising migration to `next/image` with responsive dimensions.

### 2. Network Errors
- **HTTP 429 (`RATE_LIMIT`):** Under repeated navigation or rapid filter selection, the Express backend returns HTTP 429:
  ```json
  { "success": false, "error": { "code": "RATE_LIMIT", "message": "Too many requests, please try again later." } }
  ```
  This causes the frontend to enter an error state until the 15-minute rate limit window clears.
- **HTTP 404 (`NOT_FOUND`) on Dead Links:** Navigating to `/new-projects`, `/areas`, `/about`, `/contact`, `/developers`, or `/blog` produces browser console 404 network errors.

---

## 3. Disconnect Between Automated Tests and Real World UX

| Feature | Automated Test Status | Real Browser Manual Status | Disconnect Explanation |
|---|---|---|---|
| **Viewing Form** | Tested (Modal opens & closes) | **BROKEN / FAKE** | Tests verify DOM element visibility upon clicking "Book a Viewing". Tests did NOT verify network persistence or database storage. |
| **Favorites** | Tested (Button toggles heart) | **BROKEN / FAKE** | Tests verify button CSS toggle class. Tests did NOT verify persistence across browser refresh. |
| **Properties API** | Tested (200 OK returned) | **DUPLICATE REQUESTS** | Tests check endpoint status. Tests did NOT assert request counts or deduplication behavior across Server/Client boundaries. |
| **Site Navigation** | Tested (Header links exist) | **DEAD ENDS (404)** | Tests verify navbar renders links. Tests did NOT verify that target destination pages actually exist. |
