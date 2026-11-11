/**
 * Typed, validated environment configuration.
 * Server fails immediately if required variables are missing.
 */

import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().int().positive().default(5001),
    MONGODB_URI: z.string().default("mongodb://localhost:27017/dubai-estate"),
    CORS_ORIGIN: z.string().default("http://localhost:3000"),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900_000),
    RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(600),
    RATE_LIMIT_PUBLIC_MAX: z.coerce.number().int().positive().default(600),
    RATE_LIMIT_MUTATION_MAX: z.coerce.number().int().positive().default(60),
    RATE_LIMIT_AUTH_MAX: z.coerce.number().int().positive().default(10),
    TRUST_PROXY: z.coerce.number().int().nonnegative().default(1),
    LOG_LEVEL: z.string().default("dev"),
    JWT_SECRET: z.string().default("dubai-estate-secure-jwt-key-development-2026"),
    JWT_EXPIRES_IN_SECONDS: z.coerce.number().int().positive().default(86400),
  })
  .refine(
    (data) => {
      if (data.NODE_ENV === "production") {
        return (
          data.JWT_SECRET !== "dubai-estate-secure-jwt-key-development-2026" &&
          data.JWT_SECRET.length >= 32
        );
      }
      return true;
    },
    {
      message:
        "JWT_SECRET must be explicitly set to a cryptographically strong key (minimum 32 characters) in production.",
      path: ["JWT_SECRET"],
    }
  );

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment configuration:");
  for (const issue of parsed.error.issues) {
    console.error(`   ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

export const env = parsed.data;
