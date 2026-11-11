import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import {
  createRateLimiter,
  publicBrowsingLimiter,
  mutationLimiter,
  authLimiter,
} from "../src/middlewares/rateLimiter.js";

describe("Rate Limiting Middleware", () => {
  it("exports properly configured rate limiters", () => {
    expect(publicBrowsingLimiter).toBeDefined();
    expect(mutationLimiter).toBeDefined();
    expect(authLimiter).toBeDefined();
    expect(typeof publicBrowsingLimiter).toBe("function");
    expect(typeof mutationLimiter).toBe("function");
    expect(typeof authLimiter).toBe("function");
  });

  it("permits requests within allowed threshold and returns standard rate-limit headers", async () => {
    const testApp = express();
    testApp.use(
      "/test",
      createRateLimiter({
        windowMs: 60_000,
        max: 3,
      })
    );
    testApp.get("/test", (_req, res) => res.json({ success: true }));

    const res1 = await request(testApp).get("/test");
    expect(res1.status).toBe(200);
    expect(res1.headers).toHaveProperty("ratelimit-limit");
    expect(res1.headers).toHaveProperty("ratelimit-remaining");

    const res2 = await request(testApp).get("/test");
    expect(res2.status).toBe(200);

    const res3 = await request(testApp).get("/test");
    expect(res3.status).toBe(200);
  });

  it("blocks requests exceeding threshold with predictable 429 and RATE_LIMIT_EXCEEDED code", async () => {
    const testApp = express();
    testApp.use(
      "/limited",
      createRateLimiter({
        windowMs: 60_000,
        max: 2,
        message: "Rate limit reached for test.",
      })
    );
    testApp.get("/limited", (_req, res) => res.json({ success: true }));

    await request(testApp).get("/limited");
    await request(testApp).get("/limited");

    // Third request exceeds limit
    const res = await request(testApp).get("/limited");
    expect(res.status).toBe(429);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe("RATE_LIMIT_EXCEEDED");
    expect(res.body.error.message).toContain("Rate limit reached for test.");
    expect(res.headers).toHaveProperty("retry-after");
  });

  it("skips rate limiting for health check endpoints", async () => {
    const testApp = express();
    testApp.use(
      createRateLimiter({
        windowMs: 60_000,
        max: 1,
        skip: (req) => req.path === "/health",
      })
    );
    testApp.get("/health", (_req, res) => res.json({ status: "ok" }));

    // Multiple calls to /health should never be blocked even when max is 1
    const res1 = await request(testApp).get("/health");
    const res2 = await request(testApp).get("/health");
    const res3 = await request(testApp).get("/health");

    expect(res1.status).toBe(200);
    expect(res2.status).toBe(200);
    expect(res3.status).toBe(200);
  });
});
