import { describe, it, expect } from "vitest";
import { getProperties, getPropertyBySlug, getFeaturedProperties, getSimilarProperties } from "@/lib/api/propertyService";
import { mockProperties } from "@/lib/data/mock-properties";

describe("propertyService", () => {
  describe("getProperties", () => {
    it("returns all published properties with no filters", async () => {
      const res = await getProperties({});
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.items.length).toBeGreaterThan(0);
        expect(res.data.pagination.total).toBe(res.data.items.length);
      }
    });

    it("filters by purpose=sale", async () => {
      const res = await getProperties({ purpose: "sale" });
      expect(res.success).toBe(true);
      if (res.success) {
        res.data.items.forEach((p) => {
          expect(p.purpose).toBe("sale");
        });
      }
    });

    it("filters by purpose=rent", async () => {
      const res = await getProperties({ purpose: "rent" });
      expect(res.success).toBe(true);
      if (res.success) {
        res.data.items.forEach((p) => {
          expect(p.purpose).toBe("rent");
        });
      }
    });

    it("filters by propertyType=villa", async () => {
      const res = await getProperties({ propertyType: "villa" });
      expect(res.success).toBe(true);
      if (res.success) {
        res.data.items.forEach((p) => {
          expect(p.propertyType).toBe("villa");
        });
      }
    });

    it("filters by multiple propertyTypes", async () => {
      const res = await getProperties({ propertyType: ["villa", "penthouse"] });
      expect(res.success).toBe(true);
      if (res.success) {
        res.data.items.forEach((p) => {
          expect(["villa", "penthouse"]).toContain(p.propertyType);
        });
      }
    });

    it("filters by bedrooms", async () => {
      const res = await getProperties({ bedrooms: 2 });
      expect(res.success).toBe(true);
      if (res.success) {
        res.data.items.forEach((p) => {
          expect(p.bedrooms).toBe(2);
        });
      }
    });

    it("filters by price range", async () => {
      const res = await getProperties({ minPrice: 1_000_000, maxPrice: 5_000_000 });
      expect(res.success).toBe(true);
      if (res.success) {
        res.data.items.forEach((p) => {
          expect(p.price).toBeGreaterThanOrEqual(1_000_000);
          expect(p.price).toBeLessThanOrEqual(5_000_000);
        });
      }
    });

    it("filters by status=off-plan", async () => {
      const res = await getProperties({ status: "off-plan" });
      expect(res.success).toBe(true);
      if (res.success) {
        res.data.items.forEach((p) => {
          expect(p.status).toBe("off-plan");
        });
      }
    });

    it("sorts by price ascending", async () => {
      const res = await getProperties({ sort: "price-asc" });
      expect(res.success).toBe(true);
      if (res.success && res.data.items.length > 1) {
        for (let i = 1; i < res.data.items.length; i++) {
          expect(res.data.items[i].price).toBeGreaterThanOrEqual(
            res.data.items[i - 1].price
          );
        }
      }
    });

    it("sorts by price descending", async () => {
      const res = await getProperties({ sort: "price-desc" });
      expect(res.success).toBe(true);
      if (res.success && res.data.items.length > 1) {
        for (let i = 1; i < res.data.items.length; i++) {
          expect(res.data.items[i].price).toBeLessThanOrEqual(
            res.data.items[i - 1].price
          );
        }
      }
    });

    it("paginates correctly", async () => {
      const res = await getProperties({ limit: 3, page: 1 });
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.items.length).toBeLessThanOrEqual(3);
        expect(res.data.pagination.page).toBe(1);
        expect(res.data.pagination.limit).toBe(3);
      }
    });

    it("returns empty results for impossible filters", async () => {
      const res = await getProperties({ minPrice: 999_999_999 });
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.items.length).toBe(0);
        expect(res.data.pagination.total).toBe(0);
      }
    });

    it("filters by text query", async () => {
      const res = await getProperties({ q: "marina" });
      expect(res.success).toBe(true);
      if (res.success) {
        res.data.items.forEach((p) => {
          const searchable = `${p.title} ${p.description} ${p.location.area} ${p.location.community}`.toLowerCase();
          expect(searchable).toContain("marina");
        });
      }
    });
  });

  describe("getPropertyBySlug", () => {
    it("returns a property for a valid slug", async () => {
      const slug = mockProperties[0].slug;
      const res = await getPropertyBySlug(slug);
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.slug).toBe(slug);
      }
    });

    it("returns error for invalid slug", async () => {
      const res = await getPropertyBySlug("this-slug-does-not-exist");
      expect(res.success).toBe(false);
    });
  });

  describe("getFeaturedProperties", () => {
    it("returns only featured properties", async () => {
      const res = await getFeaturedProperties();
      expect(res.success).toBe(true);
      if (res.success) {
        res.data.forEach((p) => {
          expect(p.verificationStatus).toBe("featured");
        });
      }
    });

    it("respects limit parameter", async () => {
      const res = await getFeaturedProperties(2);
      expect(res.success).toBe(true);
      if (res.success) {
        expect(res.data.length).toBeLessThanOrEqual(2);
      }
    });
  });

  describe("getSimilarProperties", () => {
    it("excludes the source property", async () => {
      const source = mockProperties[0];
      const res = await getSimilarProperties(source);
      expect(res.success).toBe(true);
      if (res.success) {
        res.data.forEach((p) => {
          expect(p._id).not.toBe(source._id);
        });
      }
    });
  });
});
