/**
 * Rate Limiting Middlewares for Dubai Estate Backend.
 * Segregates public browsing from sensitive mutations and authentication.
 */

import rateLimit, { type Options } from "express-rate-limit";
import type { Request, Response } from "express";
import { env } from "../config/env.js";
import { sendError } from "../utils/response.js";

/**
 * Custom 429 handler producing predictable, standard API error structure.
 */
function rateLimitHandler(
  _req: Request,
  res: Response,
  _next: unknown,
  options: Options
): void {
  res.setHeader("Retry-After", Math.ceil(options.windowMs / 1000));
  sendError(
    res,
    429,
    "RATE_LIMIT_EXCEEDED",
    typeof options.message === "string"
      ? options.message
      : "Too many requests. Please slow down and try again later."
  );
}

/**
 * Factory for creating configured rate limiters with consistent headers and error formatting.
 */
export function createRateLimiter(options: Partial<Options>) {
  return rateLimit({
    windowMs: options.windowMs ?? env.RATE_LIMIT_WINDOW_MS,
    max: options.max ?? env.RATE_LIMIT_PUBLIC_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    handler: rateLimitHandler,
    ...options,
  });
}

/**
 * Public Browsing Limiter
 * Applied to read-only endpoints (GET /api/v1/properties, etc.).
 * Allows generous browsing (default: 600 req / 15 min) to prevent blocking legitimate visitors.
 */
export const publicBrowsingLimiter = createRateLimiter({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_PUBLIC_MAX,
  message: "Too many browsing requests. Please slow down and try again later.",
  skip: (req) => {
    // Health checks and monitoring pings must never be rate-limited
    return req.path === "/health" || req.path.endsWith("/health");
  },
});

/**
 * Mutation Limiter
 * Applied to listing creation, updates, deletions, and viewing submissions.
 * Prevents automated scraping or spam flooding (default: 60 req / 15 min).
 */
export const mutationLimiter = createRateLimiter({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MUTATION_MAX,
  message: "Too many mutation requests. Please wait a few moments before trying again.",
});

/**
 * Authentication Limiter
 * Applied to login and credential submission endpoints.
 * Defends against brute-force attacks (default: 10 attempts / 15 min).
 */
export const authLimiter = createRateLimiter({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_AUTH_MAX,
  message: "Too many authentication attempts. Please wait 15 minutes before retrying.",
});
