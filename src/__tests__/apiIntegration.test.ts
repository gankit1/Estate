import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { apiClient, buildQueryString } from "@/lib/api/client";
import { normalizeProperty, normalizeImage } from "@/lib/api/normalize";
import {
  getProperties,
  getPropertyBySlug,
  getFeaturedProperties,
  getSimilarProperties,
} from "@/lib/api/propertyService";

describe("API Integration & Normalization", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("apiClient", () => {
    it("handles successful 200 JSON responses", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: { test: "data" },
        }),
      });

      const res = await apiClient<{ test: string }>("/test");
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.test).toBe("data");
      }
    });

    it("handles 404 NOT_FOUND errors gracefully", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "Property not found",
          },
        }),
      });

      const res = await apiClient("/properties/unknown");
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.code).toBe("NOT_FOUND");
        expect(res.error.message).toBe("Property not found");
      }
    });

    it("handles 422 VALIDATION_ERROR with field-level details", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
        statusText: "Unprocessable Entity",
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid query parameters",
            fields: { purpose: "Invalid enum" },
          },
        }),
      });

      const res = await apiClient("/properties?purpose=bad");
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.code).toBe("VALIDATION_ERROR");
        expect(res.error.fields).toHaveProperty("purpose");
      }
    });

    it("handles network failure and returns NETWORK_ERROR", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Failed to fetch"));

      const res = await apiClient("/properties");
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.code).toBe("NETWORK_ERROR");
        expect(res.error.message).toContain("Failed to fetch");
      }
    });

    it("handles timeout and returns TIMEOUT error code", async () => {
      global.fetch = vi.fn().mockImplementation(() => {
        const error = new Error("The operation was aborted");
        error.name = "AbortError";
        return Promise.reject(error);
      });

      const res = await apiClient("/properties", { timeoutMs: 10 });
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.code).toBe("TIMEOUT");
        expect(res.error.message).toContain("timed out");
      }
    });

    it("serializes query parameters correctly with buildQueryString", () => {
      const qs = buildQueryString({
        purpose: "sale",
        propertyType: ["apartment", "villa"],
        minPrice: 1000000,
        bedrooms: [2, 3],
        emptyVal: undefined,
      });

      expect(qs).toContain("purpose=sale");
      expect(qs).toContain("propertyType=apartment");
      expect(qs).toContain("propertyType=villa");
      expect(qs).toContain("minPrice=1000000");
      expect(qs).toContain("bedrooms=2");
      expect(qs).toContain("bedrooms=3");
      expect(qs).not.toContain("emptyVal");
    });
  });

  describe("normalizeProperty", () => {
    it("normalizes a raw Mongoose response document", () => {
      const raw = {
        _id: "6718abc123",
        title: "Test Marina Flat",
        slug: "test-marina-flat",
        purpose: "sale",
        propertyType: "apartment",
        status: "ready",
        price: "2500000",
        currency: "AED",
        bedrooms: "2",
        bathrooms: 2,
        builtUpArea: 1300,
        location: {
          address: "Tower 1, Marina",
          area: "Dubai Marina",
        },
        agentRef: {
          _id: "agent-1",
          firstName: "Sarah",
          lastName: "Thompson",
          phone: "+971501234567",
        },
        images: [{ url: "https://example.com/img.jpg", isPrimary: true }],
      };

      const normalized = normalizeProperty(raw);

      expect(normalized._id).toBe("6718abc123");
      expect(normalized.title).toBe("Test Marina Flat");
      expect(normalized.price).toBe(2500000);
      expect(normalized.bedrooms).toBe(2);
      expect(normalized.agent).toBeDefined();
      expect(normalized.agent?.firstName).toBe("Sarah");
      expect(normalized.agentRef).toBe("agent-1");
      expect(normalized.location.area).toBe("Dubai Marina");
      expect(normalized.images[0]?.url).toBe("https://example.com/img.jpg");
    });

    it("provides safe fallbacks for missing images and optional fields", () => {
      const raw = {
        id: "prop-simple",
        title: "Simple Studio",
        slug: "simple-studio",
      };

      const normalized = normalizeProperty(raw);

      expect(normalized._id).toBe("prop-simple");
      expect(normalized.images.length).toBe(1);
      expect(normalized.images[0].url).toBe("/images/placeholder.jpg");
      expect(normalized.features).toEqual([]);
      expect(normalized.amenities).toEqual([]);
      expect(normalized.views).toBe(0);
    });

    it("normalizes string image to PropertyImage structure", () => {
      const img = normalizeImage("https://example.com/photo.jpg", "Photo Title");
      expect(img.url).toBe("https://example.com/photo.jpg");
      expect(img.isPrimary).toBe(true);
      expect(img.caption).toBe("Photo Title");
    });
  });

  describe("propertyService connected calls (when TEST_REAL_API=true)", () => {
    const originalEnv = process.env.TEST_REAL_API;

    beforeEach(() => {
      process.env.TEST_REAL_API = "true";
    });

    afterEach(() => {
      process.env.TEST_REAL_API = originalEnv;
    });

    it("fetches properties with pagination from backend", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            items: [
              {
                _id: "prop-1",
                title: "Mocked Connected Property",
                slug: "mocked-connected-property",
                price: 1500000,
                purpose: "sale",
                propertyType: "apartment",
                location: { address: "Marina", area: "Dubai Marina" },
                images: [],
              },
            ],
            pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
          },
        }),
      });

      const res = await getProperties({ page: 1, limit: 10 });
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.items.length).toBe(1);
        expect(res.data.items[0].title).toBe("Mocked Connected Property");
        expect(res.data.pagination.total).toBe(1);
      }
    });

    it("fetches single property by slug and normalizes populated references", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: {
            _id: "prop-detail-1",
            title: "Detailed Penthouse",
            slug: "detailed-penthouse",
            price: 5000000,
            purpose: "sale",
            propertyType: "penthouse",
            agentRef: {
              _id: "agent-99",
              firstName: "Tariq",
              lastName: "Mansour",
            },
            areaRef: {
              _id: "area-55",
              name: "Palm Jumeirah",
              slug: "palm-jumeirah",
            },
          },
        }),
      });

      const res = await getPropertyBySlug("detailed-penthouse");
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.slug).toBe("detailed-penthouse");
        expect(res.data.agent?.firstName).toBe("Tariq");
        expect(res.data.area?.name).toBe("Palm Jumeirah");
      }
    });

    it("fetches featured properties", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: [
            {
              _id: "featured-1",
              title: "Featured Unit",
              slug: "featured-unit",
              verificationStatus: "featured",
              price: 3000000,
            },
          ],
        }),
      });

      const res = await getFeaturedProperties(3);
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.length).toBe(1);
        expect(res.data[0].verificationStatus).toBe("featured");
      }
    });

    it("fetches similar properties using property slug or id", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: new Headers({ "content-type": "application/json" }),
        json: async () => ({
          success: true,
          data: [
            {
              _id: "sim-1",
              title: "Similar Unit",
              slug: "similar-unit",
              price: 2900000,
            },
          ],
        }),
      });

      const sampleProp = normalizeProperty({
        _id: "main-prop-id",
        slug: "main-prop-slug",
        title: "Main Prop",
      });

      const res = await getSimilarProperties(sampleProp, 2);
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.length).toBe(1);
        expect(res.data[0].slug).toBe("similar-unit");
      }
    });
  });
});
