import { describe, it, expect } from "vitest";
import { formatPrice, formatArea, formatBedrooms, formatHandoverDate, formatRelativeTime } from "@/lib/utils/format";
import { buildSearchParams, parseSearchParams, calculatePagination, getWhatsAppUrl } from "@/lib/utils/search";
import { slugify, generatePropertySlug, capitalize, toTitleCase } from "@/lib/utils/slugify";

describe("formatPrice", () => {
  it("formats AED price with comma separators", () => {
    expect(formatPrice(2_850_000)).toContain("2,850,000");
  });

  it("formats compact price with M suffix", () => {
    expect(formatPrice(2_850_000, "AED", { compact: true })).toBe("AED 2.9M");
  });

  it("formats compact price with K suffix", () => {
    expect(formatPrice(850_000, "AED", { compact: true })).toBe("AED 850K");
  });

  it("handles USD currency", () => {
    const result = formatPrice(1_000_000, "USD");
    expect(result).toContain("1,000,000");
  });
});

describe("formatArea", () => {
  it("formats sqft with comma separator", () => {
    expect(formatArea(1420)).toBe("1,420 sqft");
  });

  it("converts to sqm when requested", () => {
    const result = formatArea(1000, "sqm");
    expect(result).toContain("sqm");
    expect(result).toContain("93");
  });
});

describe("formatBedrooms", () => {
  it("returns 'Studio' for 0 bedrooms", () => {
    expect(formatBedrooms(0)).toBe("Studio");
  });

  it("returns '1 Bedroom' for 1", () => {
    expect(formatBedrooms(1)).toBe("1 Bedroom");
  });

  it("returns '3 Bedrooms' for 3", () => {
    expect(formatBedrooms(3)).toBe("3 Bedrooms");
  });
});

describe("formatHandoverDate", () => {
  it("formats to quarter/year", () => {
    expect(formatHandoverDate("2027-03-01")).toBe("Q1 2027");
    expect(formatHandoverDate("2027-06-15")).toBe("Q2 2027");
    expect(formatHandoverDate("2027-09-01")).toBe("Q3 2027");
    expect(formatHandoverDate("2027-12-01")).toBe("Q4 2027");
  });
});

describe("buildSearchParams", () => {
  it("builds query string from filters", () => {
    const qs = buildSearchParams({ purpose: "sale", bedrooms: 2 });
    expect(qs).toContain("purpose=sale");
    expect(qs).toContain("bedrooms=2");
  });

  it("skips undefined values", () => {
    const qs = buildSearchParams({ purpose: undefined, bedrooms: 2 });
    expect(qs).not.toContain("purpose");
    expect(qs).toContain("bedrooms=2");
  });

  it("handles arrays", () => {
    const qs = buildSearchParams({ bedrooms: [1, 2] });
    expect(qs).toContain("bedrooms=1");
    expect(qs).toContain("bedrooms=2");
  });

  it("returns empty string for no filters", () => {
    expect(buildSearchParams({})).toBe("");
  });
});

describe("parseSearchParams", () => {
  it("parses URLSearchParams correctly", () => {
    const params = new URLSearchParams("purpose=sale&bedrooms=2&page=1");
    const result = parseSearchParams(params);
    expect(result.purpose).toBe("sale");
    expect(result.bedrooms).toBe(2);
    expect(result.page).toBe(1);
  });

  it("parses multiple bedrooms", () => {
    const params = new URLSearchParams("bedrooms=1&bedrooms=2");
    const result = parseSearchParams(params);
    expect(result.bedrooms).toEqual([1, 2]);
  });

  it("defaults page to 1", () => {
    const result = parseSearchParams(new URLSearchParams(""));
    expect(result.page).toBe(1);
  });
});

describe("calculatePagination", () => {
  it("calculates total pages correctly", () => {
    const result = calculatePagination(25, 10, 1);
    expect(result.totalPages).toBe(3);
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPreviousPage).toBe(false);
  });

  it("handles last page", () => {
    const result = calculatePagination(25, 10, 3);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(true);
    expect(result.endItem).toBe(25);
  });

  it("handles empty results", () => {
    const result = calculatePagination(0, 10, 1);
    expect(result.totalPages).toBe(0);
    expect(result.startItem).toBe(0);
    expect(result.endItem).toBe(0);
  });
});

describe("getWhatsAppUrl", () => {
  it("generates correct WhatsApp deep link", () => {
    const url = getWhatsAppUrl("971501234567");
    expect(url).toBe("https://wa.me/971501234567");
  });

  it("includes message when provided", () => {
    const url = getWhatsAppUrl("971501234567", "Hello");
    expect(url).toContain("text=Hello");
  });

  it("strips non-digit characters from phone", () => {
    const url = getWhatsAppUrl("+971 50 123 4567");
    expect(url).toBe("https://wa.me/971501234567");
  });
});

describe("slugify", () => {
  it("converts text to URL-safe slug", () => {
    expect(slugify("Dubai Marina Apartment")).toBe("dubai-marina-apartment");
  });

  it("handles special characters", () => {
    expect(slugify("2-Bed — Luxury")).toBe("2-bed-luxury");
  });
});

describe("capitalize", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });
});

describe("toTitleCase", () => {
  it("title-cases a string", () => {
    expect(toTitleCase("dubai marina")).toBe("Dubai Marina");
  });
});
