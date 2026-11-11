import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import type { IAgent } from "../src/models/index.js";
import { createTestProperty, createTestAgent } from "./fixtures.js";
import { createTestToken } from "../src/utils/jwt.js";

describe("Property Mutations & RBAC Authorization (POST, PATCH, DELETE)", () => {
  let agent: IAgent;
  let otherAgent: IAgent;
  let adminToken: string;
  let agentToken: string;
  let otherAgentToken: string;
  let buyerToken: string;

  beforeEach(async () => {
    agent = await createTestAgent({ email: `agent-${Date.now()}@example.com` });
    otherAgent = await createTestAgent({ email: `other-${Date.now()}@example.com` });

    adminToken = createTestToken("admin", { email: "admin@example.com" });
    agentToken = createTestToken("agent", {
      email: agent.email,
      agentId: agent._id.toString(),
    });
    otherAgentToken = createTestToken("agent", {
      email: otherAgent.email,
      agentId: otherAgent._id.toString(),
    });
    buyerToken = createTestToken("buyer", { email: "buyer@example.com" });
  });

  const validPropertyData = (overrides = {}) => ({
    title: "Brand New Downtown Loft",
    purpose: "sale",
    propertyType: "apartment",
    status: "ready",
    publishStatus: "published",
    price: 3200000,
    currency: "AED",
    bedrooms: 2,
    bathrooms: 2,
    builtUpArea: 1350,
    location: {
      address: "Downtown Boulevard",
      community: "Downtown",
      area: "Downtown Dubai",
      city: "Dubai",
    },
    agentRef: agent._id.toString(),
    description: "Exceptional luxury living in the center of Dubai with world-class amenities.",
    features: ["Balcony", "Central AC"],
    amenities: ["Swimming Pool", "Gym"],
    images: [
      {
        url: "https://example.com/loft.jpg",
        isPrimary: true,
      },
    ],
    ...overrides,
  });

  /* ── 1. Unauthenticated Mutations (Anonymous Denied) ───────── */
  describe("Unauthenticated Access Protection", () => {
    it("POST /api/v1/properties is rejected with 401 when no token is provided", async () => {
      const res = await request(app)
        .post("/api/v1/properties")
        .send(validPropertyData());

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("UNAUTHORIZED");
    });

    it("PATCH /api/v1/properties/:id is rejected with 401 when no token is provided", async () => {
      const prop = await createTestProperty({ agentRef: agent._id });

      const res = await request(app)
        .patch(`/api/v1/properties/${prop._id}`)
        .send({ price: 4000000 });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("UNAUTHORIZED");
    });

    it("DELETE /api/v1/properties/:id is rejected with 401 when no token is provided", async () => {
      const prop = await createTestProperty({ agentRef: agent._id });

      const res = await request(app).delete(`/api/v1/properties/${prop._id}`);

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("UNAUTHORIZED");
    });

    it("Rejects requests with malformed or invalid token signature", async () => {
      const res = await request(app)
        .post("/api/v1/properties")
        .set("Authorization", "Bearer invalid.fake.token")
        .send(validPropertyData());

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  /* ── 2. Buyer Role Access (Forbidden from mutating properties) ─ */
  describe("Buyer Role Denial", () => {
    it("POST /api/v1/properties returns 403 Forbidden for buyers", async () => {
      const res = await request(app)
        .post("/api/v1/properties")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send(validPropertyData());

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("FORBIDDEN");
    });

    it("PATCH /api/v1/properties/:id returns 403 Forbidden for buyers", async () => {
      const prop = await createTestProperty({ agentRef: agent._id });

      const res = await request(app)
        .patch(`/api/v1/properties/${prop._id}`)
        .set("Authorization", `Bearer ${buyerToken}`)
        .send({ price: 4000000 });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("FORBIDDEN");
    });

    it("DELETE /api/v1/properties/:id returns 403 Forbidden for buyers", async () => {
      const prop = await createTestProperty({ agentRef: agent._id });

      const res = await request(app)
        .delete(`/api/v1/properties/${prop._id}`)
        .set("Authorization", `Bearer ${buyerToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe("FORBIDDEN");
    });
  });

  /* ── 3. Agent Ownership & Permissions ───────────────────────── */
  describe("Agent Permissions & Ownership Enforcement", () => {
    it("Agent can create a property and is automatically bound to own agentId", async () => {
      // Even if agent tries to supply another agent's ID, backend enforces their own
      const payload = validPropertyData({ agentRef: otherAgent._id.toString() });

      const res = await request(app)
        .post("/api/v1/properties")
        .set("Authorization", `Bearer ${agentToken}`)
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.agentRef._id || res.body.data.agentRef).toBe(
        agent._id.toString()
      );
    });

    it("Agent can update their own property", async () => {
      const prop = await createTestProperty({
        title: "Agent Owned Villa",
        agentRef: agent._id,
      });

      const res = await request(app)
        .patch(`/api/v1/properties/${prop._id}`)
        .set("Authorization", `Bearer ${agentToken}`)
        .send({ title: "Updated Villa Title", price: 5000000 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("Updated Villa Title");
    });

    it("Agent CANNOT update a property owned by another agent (403 Forbidden)", async () => {
      const prop = await createTestProperty({
        title: "Other Agent Property",
        agentRef: otherAgent._id,
      });

      const res = await request(app)
        .patch(`/api/v1/properties/${prop._id}`)
        .set("Authorization", `Bearer ${agentToken}`)
        .send({ price: 9999999 });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain("only update properties that you own");
    });

    it("Agent CANNOT transfer property ownership to another agent (403 Forbidden)", async () => {
      const prop = await createTestProperty({ agentRef: agent._id });

      const res = await request(app)
        .patch(`/api/v1/properties/${prop._id}`)
        .set("Authorization", `Bearer ${agentToken}`)
        .send({ agentRef: otherAgent._id.toString() });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain("cannot reassign listing ownership");
    });

    it("Agent can delete their own property", async () => {
      const prop = await createTestProperty({ agentRef: agent._id });

      const res = await request(app)
        .delete(`/api/v1/properties/${prop._id}`)
        .set("Authorization", `Bearer ${agentToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("Agent CANNOT delete a property owned by another agent (403 Forbidden)", async () => {
      const prop = await createTestProperty({ agentRef: otherAgent._id });

      const res = await request(app)
        .delete(`/api/v1/properties/${prop._id}`)
        .set("Authorization", `Bearer ${agentToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.error.message).toContain("only delete properties that you own");
    });
  });

  /* ── 4. Admin Permissions (Full authorized access) ───────────── */
  describe("Admin Full Authorized Access", () => {
    it("Admin can create a property for any agent", async () => {
      const payload = validPropertyData({ agentRef: otherAgent._id.toString() });

      const res = await request(app)
        .post("/api/v1/properties")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });

    it("Admin can update any property regardless of assigned agent", async () => {
      const prop = await createTestProperty({ agentRef: otherAgent._id });

      const res = await request(app)
        .patch(`/api/v1/properties/${prop._id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ price: 6200000 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.price).toBe(6200000);
    });

    it("Admin can delete any property", async () => {
      const prop = await createTestProperty({ agentRef: otherAgent._id });

      const res = await request(app)
        .delete(`/api/v1/properties/${prop._id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
