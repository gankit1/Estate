# Regression Test Results

## Issue 1.1 — Verification & Regression Check (2026-10-26)

### 1. Backend Verification
- **Test Command:** `npm test` inside `backend/`
- **Output:** 4 test files passed, 41/41 tests passing (100%)
  - `tests/health.test.ts`: 3/3 passed
  - `tests/properties.test.ts`: 14/14 passed
  - `tests/validation.test.ts`: 8/8 passed
  - `tests/mutations.test.ts`: 16/16 passed
- **Type Check:** `npm run lint` / `tsc --noEmit` — 0 errors
- **Build:** `npm run build` — Clean compilation

### 2. Frontend Verification
- **Test Command:** `npm test` inside project root
- **Output:** 5 test files passed, 78/78 tests passing (100%)
  - `src/__tests__/apiIntegration.test.ts`: 13/13 passed
  - `src/__tests__/propertyService.test.ts`: 18/18 passed
  - `src/__tests__/utils.test.ts`: 27/27 passed
  - `src/__tests__/PropertyCard.test.tsx`: 13/13 passed
  - `src/__tests__/PropertyGallery.test.tsx`: 7/7 passed
- **Type Check:** `npx tsc --noEmit` — 0 errors

### 3. Live Server Endpoint Verification
- `GET http://localhost:5001/api/v1/properties` -> **200 OK** (Public browsing intact)
- `POST http://localhost:5001/api/v1/properties` (No Auth) -> **401 UNAUTHORIZED**
- `PATCH http://localhost:5001/api/v1/properties/:id` (No Auth) -> **401 UNAUTHORIZED**
- `DELETE http://localhost:5001/api/v1/properties/:id` (No Auth) -> **401 UNAUTHORIZED**

### 4. Real Browser Verification
- Navigated to `http://localhost:3000/properties`: Properties render completely with cards, badges, prices, and locations.
- Navigated to `http://localhost:3000/properties/azure-residences-panoramic-marina-view`: Property detail renders with gallery, pricing breakdown, amenities, and enquiry sidebar.
- Zero console regressions observed.

---

## Issue 1.2 — Verification & Regression Check (2026-10-26)

### 1. Backend Verification
- **Test Command:** `npm test` inside `backend/`
- **Output:** 5 test files passed, 45/45 tests passing (100%)
  - `tests/rateLimiter.test.ts`: 4/4 passed (New)
  - `tests/health.test.ts`: 3/3 passed
  - `tests/properties.test.ts`: 14/14 passed
  - `tests/validation.test.ts`: 8/8 passed
  - `tests/mutations.test.ts`: 16/16 passed
- **Type Check:** `npm run lint` / `tsc --noEmit` — 0 errors
- **Build:** `npm run build` — Clean compilation

### 2. Frontend Verification
- **Test Command:** `npm test` inside project root
- **Output:** 5 test files passed, 78/78 tests passing (100%)
- **Type Check:** `npx tsc --noEmit` — 0 errors

### 3. Live Server Rate Limiter Verification
- `GET http://localhost:5001/api/v1/properties`:
  - `RateLimit-Limit: 600`
  - `RateLimit-Remaining: 598`
  - `RateLimit-Reset: 882`
- `GET http://localhost:5001/health`: 200 OK (Exempt from rate limits)
- `GET http://localhost:5001/api/v1/health`: 200 OK (Exempt from rate limits)
- Rate limit violation: Returns 429 with `RATE_LIMIT_EXCEEDED` and `Retry-After` header.
