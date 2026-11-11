/**
 * ============================================================
 * Property Service — Frontend API abstraction
 * ============================================================
 * Connects to Express/MongoDB backend:
 *   GET /api/v1/properties
 *   GET /api/v1/properties/:slug
 *   GET /api/v1/properties/featured
 *   GET /api/v1/properties/:id/similar
 * ============================================================
 */

import type {
  Property,
  PropertyFilters,
  PaginatedData,
  ApiResponse,
} from "@/types";
import { apiClient } from "./client";
import { normalizeProperty } from "./normalize";
import { mockProperties } from "@/lib/data/mock-properties";

/**
 * Checks if mock mode is explicitly enabled (e.g. for offline unit testing).
 * Never silently enabled in normal dev or production runtime.
 */
export function isMockMode(): boolean {
  if (process.env.USE_MOCK_DATA === "true" || process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return true;
  }
  // Allow isolated unit tests to run deterministically against mock data unless testing real API
  if (process.env.NODE_ENV === "test" && process.env.TEST_REAL_API !== "true") {
    return true;
  }
  return false;
}

/* ── Fallback mock implementation for offline unit tests and API failover ── */
export function applyMockFilters(properties: Property[], filters: PropertyFilters): Property[] {
  let result = properties.filter((p) => p.publishStatus === "published");

  if (filters.purpose) {
    result = result.filter((p) => p.purpose === filters.purpose);
  }

  if (filters.propertyType) {
    const types = Array.isArray(filters.propertyType)
      ? filters.propertyType
      : [filters.propertyType];
    result = result.filter((p) => types.includes(p.propertyType));
  }

  if (filters.status) {
    result = result.filter((p) => p.status === filters.status);
  }

  if (filters.area) {
    const areas = Array.isArray(filters.area) ? filters.area : [filters.area];
    result = result.filter((p) =>
      areas.some((a) => {
        const cleanA = a.toLowerCase().replace(/[^a-z0-9]/g, "");
        const cleanArea = p.location.area.toLowerCase().replace(/[^a-z0-9]/g, "");
        const cleanCommunity = (p.location.community ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
        return (
          p.location.area.toLowerCase().includes(a.toLowerCase()) ||
          p.areaRef === a ||
          cleanArea.includes(cleanA) ||
          cleanA.includes(cleanArea) ||
          cleanCommunity.includes(cleanA) ||
          (cleanA === "jvc" && (cleanArea.includes("jumeirahvillage") || cleanCommunity.includes("jvc")))
        );
      })
    );
  }

  if (filters.minPrice !== undefined && filters.minPrice > 0) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined && filters.maxPrice < Infinity) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.bedrooms !== undefined) {
    const beds = Array.isArray(filters.bedrooms) ? filters.bedrooms : [filters.bedrooms];
    const numBeds = beds.map(Number);
    const hasFivePlus = numBeds.includes(5);
    result = result.filter((p) => {
      if (numBeds.includes(p.bedrooms)) return true;
      if (hasFivePlus && p.bedrooms >= 5) return true;
      return false;
    });
  }

  if (filters.bathrooms !== undefined) {
    result = result.filter((p) => p.bathrooms >= filters.bathrooms!);
  }

  if (filters.minArea !== undefined) {
    result = result.filter((p) => p.builtUpArea >= filters.minArea!);
  }

  if (filters.maxArea !== undefined) {
    result = result.filter((p) => p.builtUpArea <= filters.maxArea!);
  }

  if (filters.furnished) {
    result = result.filter((p) => p.furnished === filters.furnished);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    result = result.filter((p) =>
      filters.amenities!.every((a) =>
        p.amenities.some((pa) => pa.toLowerCase().includes(a.toLowerCase()))
      )
    );
  }

  if (filters.developer) {
    result = result.filter(
      (p) =>
        p.developerRef === filters.developer ||
        p.developer?.slug === filters.developer
    );
  }

  if (filters.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.area.toLowerCase().includes(q) ||
        p.location.community.toLowerCase().includes(q)
    );
  }

  return result;
}

export type SortKey = "price-asc" | "price-desc" | "newest" | "oldest" | "area-asc" | "area-desc" | "popular";

export function applyMockSort(properties: Property[], sort?: string): Property[] {
  const sorted = [...properties];
  const key = (sort ?? "newest") as SortKey;

  switch (key) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "oldest":
      return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    case "area-asc":
      return sorted.sort((a, b) => a.builtUpArea - b.builtUpArea);
    case "area-desc":
      return sorted.sort((a, b) => b.builtUpArea - a.builtUpArea);
    case "popular":
      return sorted.sort((a, b) => b.views - a.views);
    default:
      return sorted;
  }
}

/**
 * Returns mock properties with filtering, sorting, and pagination applied.
 */
export function getMockProperties(
  filters: PropertyFilters = {}
): ApiResponse<PaginatedData<Property>> {
  const filtered = applyMockFilters(mockProperties, filters);
  const sorted = applyMockSort(filtered, filters.sort);
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 20;
  const total = sorted.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const items = sorted.slice(start, start + limit).map(normalizeProperty);

  return {
    success: true,
    data: {
      items,
      pagination: { page, limit, total, totalPages },
    },
  };
}

/**
 * Returns a single mock property by slug.
 */
export function getMockPropertyBySlug(slug: string): ApiResponse<Property> {
  const property = mockProperties.find(
    (p) => p.slug === slug && p.publishStatus === "published"
  );

  if (!property) {
    return {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: `Property with slug "${slug}" not found.`,
      },
    };
  }

  return {
    success: true,
    data: normalizeProperty(property),
  };
}

/**
 * Returns top featured properties from mock dataset.
 */
export function getMockFeaturedProperties(limit = 6): ApiResponse<Property[]> {
  const featured = mockProperties
    .filter((p) => p.verificationStatus === "featured" && p.publishStatus === "published")
    .slice(0, limit)
    .map(normalizeProperty);

  return {
    success: true,
    data: featured,
  };
}

/**
 * Returns similar properties from mock dataset.
 */
export function getMockSimilarProperties(
  property: Property,
  limit = 3
): ApiResponse<Property[]> {
  const similar = mockProperties
    .filter(
      (p) =>
        p._id !== property._id &&
        p.publishStatus === "published" &&
        (p.location.area === property.location.area ||
          p.propertyType === property.propertyType ||
          (p.price >= property.price * 0.7 && p.price <= property.price * 1.3))
    )
    .slice(0, limit)
    .map(normalizeProperty);

  return {
    success: true,
    data: similar,
  };
}

/* ── Public API ─────────────────────────────────────────────── */

/**
 * Serializes frontend PropertyFilters to URLSearchParams record for backend.
 */
function serializeFilters(
  filters: PropertyFilters
): Record<string, string | number | boolean | (string | number)[] | undefined> {
  return {
    purpose: filters.purpose,
    propertyType: filters.propertyType,
    status: filters.status,
    area: filters.area,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    bedrooms: filters.bedrooms,
    bathrooms: filters.bathrooms,
    furnished: filters.furnished,
    amenities: filters.amenities,
    developer: filters.developer,
    q: filters.q,
    sort: filters.sort,
    page: filters.page,
    limit: filters.limit,
  };
}

/**
 * GET /api/v1/properties
 * Returns paginated, filtered, sorted properties from Express backend.
 * Gracefully falls back to local mock data if the backend is offline or returns an error.
 */
export async function getProperties(
  filters: PropertyFilters = {}
): Promise<ApiResponse<PaginatedData<Property>>> {
  if (isMockMode()) {
    return getMockProperties(filters);
  }

  try {
    const res = await apiClient<PaginatedData<unknown>>("/properties", {
      params: serializeFilters(filters),
    });

    if (res.success && res.data && Array.isArray(res.data.items)) {
      return {
        success: true,
        data: {
          items: res.data.items.map(normalizeProperty),
          pagination: res.data.pagination,
        },
        message: res.message,
      };
    }

    // Backend returned an error response or unexpected structure — fall back to mock data
    console.warn(
      "[propertyService] Backend API not reachable or returned error; serving mock properties data:",
      !res.success ? res.error?.message : "Missing items"
    );
    return getMockProperties(filters);
  } catch (err) {
    console.warn("[propertyService] Backend API request failed, serving mock properties data:", err);
    return getMockProperties(filters);
  }
}

/**
 * GET /api/v1/properties/:slug
 * Returns a single property by slug from Express backend with populated references.
 * Gracefully falls back to mock property data if the backend is offline.
 */
export async function getPropertyBySlug(slug: string): Promise<ApiResponse<Property>> {
  if (isMockMode()) {
    return getMockPropertyBySlug(slug);
  }

  try {
    const res = await apiClient<unknown>(`/properties/${encodeURIComponent(slug)}`);

    if (res.success && res.data) {
      return {
        success: true,
        data: normalizeProperty(res.data),
        message: res.message,
      };
    }

    // If backend is down or returned error, check if property exists in mock data
    const mockRes = getMockPropertyBySlug(slug);
    if (mockRes.success) {
      console.warn(
        `[propertyService] Backend property for "${slug}" unavailable; serving from mock properties.`
      );
      return mockRes;
    }

    // Not found in backend nor in mock data
    if (!res.success) {
      return res;
    }
    return mockRes;
  } catch (err) {
    console.warn(`[propertyService] Error fetching "${slug}" from backend:`, err);
    return getMockPropertyBySlug(slug);
  }
}

/**
 * GET /api/v1/properties/featured
 * Returns top featured properties from Express backend.
 * Gracefully falls back to mock featured properties if the backend is offline.
 */
export async function getFeaturedProperties(limit = 6): Promise<ApiResponse<Property[]>> {
  if (isMockMode()) {
    return getMockFeaturedProperties(limit);
  }

  try {
    const res = await apiClient<unknown[]>("/properties/featured", {
      params: { limit },
    });

    if (res.success && Array.isArray(res.data)) {
      return {
        success: true,
        data: res.data.map(normalizeProperty),
        message: res.message,
      };
    }

    console.warn("[propertyService] Backend featured properties failed; serving mock data.");
    return getMockFeaturedProperties(limit);
  } catch (err) {
    console.warn("[propertyService] Backend featured properties error:", err);
    return getMockFeaturedProperties(limit);
  }
}

/**
 * GET /api/v1/properties/:id/similar
 * Returns properties similar to the given property from Express backend.
 * Gracefully falls back to mock similar properties if the backend is offline.
 */
export async function getSimilarProperties(
  property: Property,
  limit = 3
): Promise<ApiResponse<Property[]>> {
  if (isMockMode()) {
    return getMockSimilarProperties(property, limit);
  }

  try {
    const identifier = property.slug || property._id;
    const res = await apiClient<unknown[]>(`/properties/${encodeURIComponent(identifier)}/similar`, {
      params: { limit },
    });

    if (res.success && Array.isArray(res.data)) {
      return {
        success: true,
        data: res.data.map(normalizeProperty),
        message: res.message,
      };
    }

    return getMockSimilarProperties(property, limit);
  } catch (err) {
    console.warn("[propertyService] Backend similar properties error:", err);
    return getMockSimilarProperties(property, limit);
  }
}

/**
 * Available sort options for UI dropdowns.
 */
export const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-asc", label: "Area: Small to Large" },
  { value: "area-desc", label: "Area: Large to Small" },
  { value: "popular", label: "Most Viewed" },
] as const;

/**
 * Available filter options for UI.
 */
export const filterOptions = {
  purposes: [
    { value: "sale", label: "Buy" },
    { value: "rent", label: "Rent" },
  ],
  propertyTypes: [
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "townhouse", label: "Townhouse" },
    { value: "penthouse", label: "Penthouse" },
    { value: "duplex", label: "Duplex" },
  ],
  bedrooms: [
    { value: "0", label: "Studio" },
    { value: "1", label: "1 Bed" },
    { value: "2", label: "2 Beds" },
    { value: "3", label: "3 Beds" },
    { value: "4", label: "4 Beds" },
    { value: "5", label: "5+ Beds" },
  ],
  priceRanges: {
    sale: [
      { min: 0, max: 1_000_000, label: "Under AED 1M" },
      { min: 1_000_000, max: 3_000_000, label: "AED 1M – 3M" },
      { min: 3_000_000, max: 5_000_000, label: "AED 3M – 5M" },
      { min: 5_000_000, max: 10_000_000, label: "AED 5M – 10M" },
      { min: 10_000_000, max: Infinity, label: "AED 10M+" },
    ],
    rent: [
      { min: 0, max: 50_000, label: "Under AED 50K" },
      { min: 50_000, max: 100_000, label: "AED 50K – 100K" },
      { min: 100_000, max: 200_000, label: "AED 100K – 200K" },
      { min: 200_000, max: Infinity, label: "AED 200K+" },
    ],
  },
  statuses: [
    { value: "ready", label: "Ready" },
    { value: "off-plan", label: "Off-Plan" },
  ],
  areas: [
    { value: "dubai-marina", label: "Dubai Marina" },
    { value: "downtown-dubai", label: "Downtown Dubai" },
    { value: "palm-jumeirah", label: "Palm Jumeirah" },
    { value: "business-bay", label: "Business Bay" },
    { value: "dubai-hills-estate", label: "Dubai Hills Estate" },
    { value: "jvc", label: "Jumeirah Village Circle" },
    { value: "dubai-creek-harbour", label: "Dubai Creek Harbour" },
    { value: "jumeirah", label: "Jumeirah" },
  ],
  amenities: [
    "Swimming Pool", "Gym", "Covered Parking", "24/7 Security",
    "Concierge", "Private Pool", "Maid's Room", "Balcony",
    "Children's Play Area", "BBQ Area", "Sauna", "Smart Home System",
  ],
} as const;
