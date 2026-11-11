import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { createTestToken } from "../src/utils/jwt.js";

const adminToken = createTestToken("admin");

describe("Validation Middleware & Error Handling", () => {
  it("rejects invalid purpose enum with 422 and field error", async () => {
    const res = await request(app).get("/api/v1/properties?purpose=invalid_purpose");

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
    expect(res.body.error.fields).toHaveProperty("purpose");
  });

  it("rejects page < 1 with 422", async () => {
    const res = await request(app).get("/api/v1/properties?page=0");

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.error.fields).toHaveProperty("page");
  });

  it("rejects limit > 100 with 422", async () => {
    const res = await request(app).get("/api/v1/properties?limit=101");

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.error.fields).toHaveProperty("limit");
  });

  it("rejects negative minPrice with 422", async () => {
    const res = await request(app).get("/api/v1/properties?minPrice=-500");

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.error.fields).toHaveProperty("minPrice");
  });

  it("rejects invalid ObjectId param on PATCH with 422", async () => {
    const res = await request(app)
      .patch("/api/v1/properties/not-a-valid-id")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ price: 1000000 });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
    expect(res.body.error.fields).toHaveProperty("id");
  });

  it("rejects invalid ObjectId param on DELETE with 422", async () => {
    const res = await request(app)
      .delete("/api/v1/properties/123-bad-id")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("rejects POST with missing required fields with 422", async () => {
    const res = await request(app)
      .post("/api/v1/properties")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Incomplete Unit",
      });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.error.fields).toHaveProperty("purpose");
    expect(res.body.error.fields).toHaveProperty("propertyType");
    expect(res.body.error.fields).toHaveProperty("price");
    expect(res.body.error.fields).toHaveProperty("agentRef");
  });

  it("rejects invalid slug format with 422", async () => {
    const res = await request(app).get("/api/v1/properties/Invalid_Slug_With_Spaces!");

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.error.fields).toHaveProperty("slug");
  });
});
