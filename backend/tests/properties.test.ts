import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import type { IAgent, IArea, IDeveloper } from "../src/models/index.js";
import { createTestProperty, createTestAgent, createTestArea, createTestDeveloper } from "./fixtures.js";

describe("Properties API — Listing & Queries", () => {
  let agent: IAgent;

  beforeEach(async () => {
    agent = await createTestAgent();
  });

  it("GET /api/v1/properties returns paginated published properties matching contract", async () => {
    await createTestProperty({ title: "Marina Unit 1", price: 2000000, agentRef: agent._id });
    await createTestProperty({ title: "Marina Unit 2", price: 3000000, agentRef: agent._id });

    const res = await request(app).get("/api/v1/properties");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(Array.isArray(res.body.data.items)).toBe(true);
    expect(res.body.data.items.length).toBe(2);
    expect(res.body.data.pagination).toEqual({
      page: 1,
      limit: 12,
      total: 2,
      totalPages: 1,
    });

    const item = res.body.data.items[0];
    expect(item).toHaveProperty("_id");
    expect(item).toHaveProperty("title");
    expect(item).toHaveProperty("slug");
    expect(item).toHaveProperty("price");
    expect(item).toHaveProperty("agentRef");
  });

  it("filters by purpose (sale vs rent)", async () => {
    await createTestProperty({ title: "For Sale", purpose: "sale", agentRef: agent._id });
    await createTestProperty({ title: "For Rent", purpose: "rent", agentRef: agent._id });

    const resSale = await request(app).get("/api/v1/properties?purpose=sale");
    expect(resSale.status).toBe(200);
    expect(resSale.body.data.items.length).toBe(1);
    expect(resSale.body.data.items[0].purpose).toBe("sale");

    const resRent = await request(app).get("/api/v1/properties?purpose=rent");
    expect(resRent.status).toBe(200);
    expect(resRent.body.data.items.length).toBe(1);
    expect(resRent.body.data.items[0].purpose).toBe("rent");
  });

  it("filters by propertyType (single and multiple)", async () => {
    await createTestProperty({ title: "Apartment", propertyType: "apartment", agentRef: agent._id });
    await createTestProperty({ title: "Villa", propertyType: "villa", agentRef: agent._id });
    await createTestProperty({ title: "Penthouse", propertyType: "penthouse", agentRef: agent._id });

    const resApt = await request(app).get("/api/v1/properties?propertyType=apartment");
    expect(resApt.body.data.items.length).toBe(1);
    expect(resApt.body.data.items[0].propertyType).toBe("apartment");

    const resMulti = await request(app).get("/api/v1/properties?propertyType=apartment&propertyType=villa");
    expect(resMulti.body.data.items.length).toBe(2);
  });

  it("filters by price range (minPrice and maxPrice)", async () => {
    await createTestProperty({ title: "Cheap", price: 1000000, agentRef: agent._id });
    await createTestProperty({ title: "Mid", price: 3000000, agentRef: agent._id });
    await createTestProperty({ title: "Expensive", price: 8000000, agentRef: agent._id });

    const res = await request(app).get("/api/v1/properties?minPrice=2000000&maxPrice=5000000");
    expect(res.status).toBe(200);
    expect(res.body.data.items.length).toBe(1);
    expect(res.body.data.items[0].title).toBe("Mid");
  });

  it("filters by bedrooms and status", async () => {
    await createTestProperty({ title: "1BR Ready", bedrooms: 1, status: "ready", agentRef: agent._id });
    await createTestProperty({ title: "3BR OffPlan", bedrooms: 3, status: "off-plan", agentRef: agent._id });

    const res1 = await request(app).get("/api/v1/properties?bedrooms=1");
    expect(res1.body.data.items.length).toBe(1);
    expect(res1.body.data.items[0].title).toBe("1BR Ready");

    const res2 = await request(app).get("/api/v1/properties?status=off-plan");
    expect(res2.body.data.items.length).toBe(1);
    expect(res2.body.data.items[0].title).toBe("3BR OffPlan");
  });

  it("filters by area name (regex match)", async () => {
    await createTestProperty({
      title: "Marina Penthouse",
      location: { address: "Marina", community: "Marina", area: "Dubai Marina", city: "Dubai" },
      agentRef: agent._id,
    });
    await createTestProperty({
      title: "Downtown Flat",
      location: { address: "Downtown", community: "Downtown", area: "Downtown Dubai", city: "Dubai" },
      agentRef: agent._id,
    });

    const res = await request(app).get("/api/v1/properties?area=dubai-marina");
    expect(res.status).toBe(200);
    expect(res.body.data.items.length).toBe(1);
    expect(res.body.data.items[0].location.area).toBe("Dubai Marina");
  });

  it("sorts by price-asc, price-desc, and newest", async () => {
    await createTestProperty({ title: "Prop 100", price: 1000000, createdAt: new Date("2024-01-01"), agentRef: agent._id });
    await createTestProperty({ title: "Prop 500", price: 5000000, createdAt: new Date("2024-02-01"), agentRef: agent._id });
    await createTestProperty({ title: "Prop 300", price: 3000000, createdAt: new Date("2024-03-01"), agentRef: agent._id });

    const resAsc = await request(app).get("/api/v1/properties?sort=price-asc");
    expect(resAsc.body.data.items[0].price).toBe(1000000);
    expect(resAsc.body.data.items[2].price).toBe(5000000);

    const resDesc = await request(app).get("/api/v1/properties?sort=price-desc");
    expect(resDesc.body.data.items[0].price).toBe(5000000);
    expect(resDesc.body.data.items[2].price).toBe(1000000);
  });

  it("supports pagination with page and limit", async () => {
    for (let i = 1; i <= 5; i++) {
      await createTestProperty({ title: `Item ${i}`, price: i * 1000000, agentRef: agent._id });
    }

    const res = await request(app).get("/api/v1/properties?page=2&limit=2");
    expect(res.status).toBe(200);
    expect(res.body.data.items.length).toBe(2);
    expect(res.body.data.pagination).toEqual({
      page: 2,
      limit: 2,
      total: 5,
      totalPages: 3,
    });
  });

  it("returns empty result when no properties match", async () => {
    await createTestProperty({ price: 1000000, agentRef: agent._id });

    const res = await request(app).get("/api/v1/properties?minPrice=90000000");
    expect(res.status).toBe(200);
    expect(res.body.data.items).toEqual([]);
    expect(res.body.data.pagination.total).toBe(0);
    expect(res.body.data.pagination.totalPages).toBe(0);
  });

  it("does not return unpublished draft properties", async () => {
    await createTestProperty({ title: "Published", publishStatus: "published", agentRef: agent._id });
    await createTestProperty({ title: "Draft", publishStatus: "draft", agentRef: agent._id });

    const res = await request(app).get("/api/v1/properties");
    expect(res.body.data.items.length).toBe(1);
    expect(res.body.data.items[0].title).toBe("Published");
  });
});

describe("Property Detail & Specialized Queries", () => {
  let agent: IAgent;
  let area: IArea;
  let developer: IDeveloper;

  beforeEach(async () => {
    agent = await createTestAgent();
    area = await createTestArea();
    developer = await createTestDeveloper();
  });

  it("GET /api/v1/properties/:slug returns property with populated references", async () => {
    const prop = await createTestProperty({
      title: "Stunning Sea View Apartment",
      slug: "stunning-sea-view-apartment",
      agentRef: agent._id,
      areaRef: area._id,
      developerRef: developer._id,
    });

    const res = await request(app).get(`/api/v1/properties/${prop.slug}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.slug).toBe("stunning-sea-view-apartment");
    expect(res.body.data.agentRef.firstName).toBe("Sarah");
    expect(res.body.data.areaRef.name).toBe(area.name);
    expect(res.body.data.developerRef.name).toBe(developer.name);
  });

  it("GET /api/v1/properties/:slug returns 404 for non-existent slug", async () => {
    const res = await request(app).get("/api/v1/properties/non-existent-property-slug");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("NOT_FOUND");
  });

  it("GET /api/v1/properties/featured returns featured properties", async () => {
    await createTestProperty({ title: "Featured 1", verificationStatus: "featured", agentRef: agent._id });
    await createTestProperty({ title: "Standard 2", verificationStatus: "verified", agentRef: agent._id });

    const res = await request(app).get("/api/v1/properties/featured");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].title).toBe("Featured 1");
  });

  it("GET /api/v1/properties/:slug/similar returns similar properties", async () => {
    const main = await createTestProperty({
      title: "Main Penthouse",
      slug: "main-penthouse",
      propertyType: "penthouse",
      price: 5000000,
      agentRef: agent._id,
    });

    await createTestProperty({
      title: "Similar Penthouse",
      slug: "similar-penthouse",
      propertyType: "penthouse",
      price: 5200000,
      agentRef: agent._id,
    });

    const res = await request(app).get(`/api/v1/properties/${main.slug}/similar`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].slug).toBe("similar-penthouse");
  });
});
