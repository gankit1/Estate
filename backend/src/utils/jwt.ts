/**
 * Standard RFC 7519 JSON Web Token (JWT) implementation using Node's native `crypto` module.
 * Eliminates external dependencies while ensuring cryptographically secure HMAC-SHA256 signatures.
 */

import crypto from "crypto";
import { env } from "../config/env.js";
import { AppError } from "./AppError.js";
import type { AuthUser, UserRole } from "../types/express.js";

export interface JwtPayload extends AuthUser {
  iat?: number;
  exp?: number;
}

/**
 * Base64URL encode string or Buffer
 */
function base64url(input: string | Buffer): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, "utf8");
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

/**
 * Base64URL decode to UTF-8 string
 */
function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf8");
}

/**
 * Sign a standard HS256 JWT
 */
export function signJwt(
  payload: AuthUser,
  secret = env.JWT_SECRET,
  expiresInSeconds = env.JWT_EXPIRES_IN_SECONDS
): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(fullPayload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(dataToSign)
    .digest();

  const encodedSignature = base64url(signature);
  return `${dataToSign}.${encodedSignature}`;
}

/**
 * Verify a standard HS256 JWT
 */
export function verifyJwt(token: string, secret = env.JWT_SECRET): JwtPayload {
  if (!token || typeof token !== "string") {
    throw AppError.unauthorized("Authentication token is missing or malformed.");
  }

  const parts = token.split(".");
  if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
    throw AppError.unauthorized("Invalid JWT structure.");
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts as [string, string, string];
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(dataToSign)
    .digest();

  let providedSignature: Buffer;
  try {
    let base64 = encodedSignature.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
      base64 += "=";
    }
    providedSignature = Buffer.from(base64, "base64");
  } catch {
    throw AppError.unauthorized("Invalid signature format.");
  }

  if (
    providedSignature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(providedSignature, expectedSignature)
  ) {
    throw AppError.unauthorized("Invalid token signature.");
  }

  let payload: JwtPayload;
  try {
    payload = JSON.parse(base64urlDecode(encodedPayload));
  } catch {
    throw AppError.unauthorized("Malformed token payload.");
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    throw AppError.unauthorized("Authentication token has expired.");
  }

  if (!payload.id || !payload.role) {
    throw AppError.unauthorized("Token payload is missing required identity claims.");
  }

  return payload;
}

/**
 * Test & Development helper: Generate a valid signed token for a role
 */
export function createTestToken(
  role: UserRole,
  overrides: Partial<AuthUser> = {}
): string {
  const user: AuthUser = {
    id: overrides.id || crypto.randomUUID(),
    email: overrides.email || `${role}@example.com`,
    role,
    ...(role === "agent" ? { agentId: overrides.agentId || crypto.randomUUID() } : {}),
    ...overrides,
  };
  return signJwt(user);
}
