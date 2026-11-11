/**
 * Express application — separated from server.ts for testability.
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { sendError } from "./utils/response.js";
import healthRoutes from "./routes/healthRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

import { publicBrowsingLimiter } from "./middlewares/rateLimiter.js";

const app = express();

/* ── Proxy Configuration ─────────────────────────────────────── */
if (env.TRUST_PROXY) {
  app.set("trust proxy", env.TRUST_PROXY);
}

/* ── Security ───────────────────────────────────────────────── */
app.use(helmet());

/* ── CORS ───────────────────────────────────────────────────── */
const allowedOrigins = env.CORS_ORIGIN.split(",").map((o) => o.trim());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ── Body parsing ───────────────────────────────────────────── */
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

/* ── Logging ────────────────────────────────────────────────── */
if (env.NODE_ENV !== "test") {
  app.use(morgan(env.LOG_LEVEL));
}

/* ── Rate limiting ──────────────────────────────────────────── */
if (env.NODE_ENV !== "test") {
  app.use("/api", publicBrowsingLimiter);
}

/* ── Routes ─────────────────────────────────────────────────── */
app.use("/health", healthRoutes);
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/properties", propertyRoutes);

/* ── 404 handler ────────────────────────────────────────────── */
app.use((_req, res) => {
  sendError(res, 404, "NOT_FOUND", "The requested resource was not found");
});

/* ── Global error handler ───────────────────────────────────── */
app.use(errorHandler);

export default app;
