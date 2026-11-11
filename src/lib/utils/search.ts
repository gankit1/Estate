import type { PropertyFilters } from "@/types";

/**
 * Build a URLSearchParams string from PropertyFilters object.
 * Only non-empty/non-undefined values are included.
 */
export function buildSearchParams(filters: PropertyFilters): string {
  const params = new URLSearchParams();

  const entries = Object.entries(filters) as [
    keyof PropertyFilters,
    PropertyFilters[keyof PropertyFilters]
  ][];

  for (const [key, value] of entries) {
    if (value === undefined || value === null || value === "") continue;

    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.set(key, String(value));
    }
  }

  return params.toString();
}

/**
 * Parse URLSearchParams into a typed PropertyFilters object.
 */
export function parseSearchParams(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>
): PropertyFilters {
  const get = (key: string): string | undefined => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key) ?? undefined;
    }
    const v = searchParams[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const getAll = (key: string): string[] => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.getAll(key);
    }
    const v = searchParams[key];
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
  };

  const getNumber = (key: string): number | undefined => {
    const v = get(key);
    if (!v) return undefined;
    const n = Number(v);
    return isNaN(n) ? undefined : n;
  };

  return {
    purpose: get("purpose") as PropertyFilters["purpose"],
    propertyType: (() => {
      const vals = getAll("propertyType") as PropertyFilters["propertyType"][];
      if (vals.length === 0) return undefined;
      if (vals.length === 1) return vals[0];
      return vals as PropertyFilters["propertyType"];
    })(),
    status: get("status") as PropertyFilters["status"],
    area: (() => {
      const vals = getAll("area");
      if (vals.length === 0) return undefined;
      if (vals.length === 1) return vals[0];
      return vals;
    })(),
    minPrice: getNumber("minPrice"),
    maxPrice: getNumber("maxPrice"),
    bedrooms: (() => {
      const vals = getAll("bedrooms");
      if (vals.length === 0) return undefined;
      const nums = vals.map(Number).filter((n) => !isNaN(n));
      if (nums.length === 1) return nums[0];
      return nums;
    })(),
    bathrooms: getNumber("bathrooms"),
    minArea: getNumber("minArea"),
    maxArea: getNumber("maxArea"),
    furnished: get("furnished") as PropertyFilters["furnished"],
    amenities: getAll("amenities").filter(Boolean),
    developer: get("developer"),
    project: get("project"),
    q: get("q"),
    sort: get("sort"),
    page: getNumber("page") ?? 1,
    limit: getNumber("limit") ?? 20,
  };
}

/**
 * Calculate total pages given a total count and page size.
 */
export function calculatePagination(
  total: number,
  limit: number,
  page: number
): {
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startItem: number;
  endItem: number;
} {
  const totalPages = Math.ceil(total / limit);
  const safeLimit = Math.max(1, limit);
  const startItem = (page - 1) * safeLimit + 1;
  const endItem = Math.min(page * safeLimit, total);

  return {
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    startItem: total === 0 ? 0 : startItem,
    endItem: total === 0 ? 0 : endItem,
  };
}

/**
 * Get the WhatsApp deep-link URL for a given phone number and message.
 */
export function getWhatsAppUrl(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const encodedMsg = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${cleaned}${encodedMsg ? `?text=${encodedMsg}` : ""}`;
}

/**
 * Get property enquiry WhatsApp message.
 */
export function getPropertyWhatsAppMessage(
  propertyTitle: string,
  propertyUrl: string
): string {
  return `Hi, I'm interested in the property "${propertyTitle}". ${propertyUrl}`;
}
