import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import {
  getProperties,
  getPropertyBySlug,
  getFeaturedProperties,
  getSimilarProperties,
  getMockProperties,
} from "@/lib/api/propertyService";
import { PropertyListingContent } from "@/app/(marketing)/properties/PropertyListingContent";
import { mockProperties } from "@/lib/data/mock-properties";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/properties",
  useSearchParams: () => new URLSearchParams(""),
}));

describe("Property API graceful mock fallback", () => {
  const originalEnv = process.env.TEST_REAL_API;

  beforeEach(() => {
    process.env.TEST_REAL_API = "true";
  });

  afterEach(() => {
    process.env.TEST_REAL_API = originalEnv;
    vi.restoreAllMocks();
  });

  it("falls back to mock properties when backend API returns network failure", async () => {
    // Simulate network failure / offline backend server
    global.fetch = vi.fn().mockRejectedValue(new Error("fetch failed (ECONNREFUSED)"));

    const res = await getProperties({});
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.items.length).toBeGreaterThan(0);
      expect(res.data.pagination.total).toBe(mockProperties.length);
      expect(res.data.items[0]).toHaveProperty("title");
      expect(res.data.items[0]).toHaveProperty("price");
    }
  });

  it("falls back to mock properties when backend API returns 500 error response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({
        success: false,
        error: { message: "Internal server error", code: "SERVER_ERROR" },
      }),
    });

    const res = await getProperties({ limit: 5 });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.items.length).toBe(5);
    }
  });

  it("filters correctly in mock fallback mode for area slug (e.g. dubai-marina)", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Backend offline"));

    const res = await getProperties({ area: "dubai-marina" });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.items.length).toBeGreaterThan(0);
      res.data.items.forEach((p) => {
        expect(p.location.area.toLowerCase()).toContain("dubai marina");
      });
    }
  });

  it("filters correctly in mock fallback mode for JVC area slug", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Backend offline"));

    const res = await getProperties({ area: "jvc" });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.items.length).toBeGreaterThan(0);
      res.data.items.forEach((p) => {
        const areaLower = p.location.area.toLowerCase();
        expect(
          areaLower.includes("jvc") || areaLower.includes("jumeirah village circle")
        ).toBe(true);
      });
    }
  });

  it("falls back to mock property when fetching by slug and backend is down", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Backend offline"));

    const targetSlug = mockProperties[0].slug;
    const res = await getPropertyBySlug(targetSlug);
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.slug).toBe(targetSlug);
      expect(res.data.title).toBe(mockProperties[0].title);
    }
  });

  it("returns error if slug is neither on backend nor in mock dataset", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({
        success: false,
        error: { message: "Not found", code: "NOT_FOUND" },
      }),
    });

    const res = await getPropertyBySlug("completely-fictional-nonexistent-slug");
    expect(res.success).toBe(false);
  });

  it("falls back to mock featured properties when backend is down", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Backend offline"));

    const res = await getFeaturedProperties(3);
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.length).toBeLessThanOrEqual(3);
      expect(res.data[0].verificationStatus).toBe("featured");
    }
  });

  it("falls back to mock similar properties when backend is down", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Backend offline"));

    const target = mockProperties[0];
    const res = await getSimilarProperties(target, 2);
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.length).toBeLessThanOrEqual(2);
      expect(res.data.every((p) => p._id !== target._id)).toBe(true);
    }
  });

  it("renders property listings without crashing or showing Something Went Wrong when backend is down", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Failed to reach server"));

    render(<PropertyListingContent />);

    // Should NOT show the error state
    await waitFor(() => {
      expect(screen.queryByText(/Something Went Wrong/i)).not.toBeInTheDocument();
    });

    // Should render properties from fallback
    await waitFor(() => {
      expect(screen.getByText(/properties found/i)).toBeInTheDocument();
    });

    const firstPropTitle = mockProperties[0].title;
    expect(screen.getByText(firstPropTitle)).toBeInTheDocument();
  });
});

