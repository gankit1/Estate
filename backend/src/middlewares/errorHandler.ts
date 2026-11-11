/**
 * Global error handler.
 * Catches all errors and returns consistent API error responses.
 * Never leaks stack traces, connection strings, or internal paths in production.
 */

import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";
import { sendError } from "../utils/response.js";
import { env } from "../config/env.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  void _next;
  // Already an AppError — use it directly
  if (err instanceof AppError) {
    sendError(res, err.statusCode, err.code, err.message, err.fields);
    return;
  }

  // Mongoose CastError (invalid ObjectId, bad types)
  if (err instanceof mongoose.Error.CastError) {
    sendError(res, 400, "BAD_REQUEST", `Invalid ${err.path}: ${err.value}`);
    return;
  }

  // Mongoose ValidationError (schema-level validation)
  if (err instanceof mongoose.Error.ValidationError) {
    const fields: Record<string, string> = {};
    for (const [key, val] of Object.entries(err.errors)) {
      fields[key] = val.message;
    }
    sendError(res, 422, "VALIDATION_ERROR", "Validation failed", fields);
    return;
  }

  // MongoDB duplicate key error (code 11000)
  const errRecord = err as unknown as Record<string, unknown>;
  if (err.name === "MongoServerError" && errRecord.code === 11000) {
    const keyValue = errRecord.keyValue as Record<string, unknown> | undefined;
    const field = keyValue ? Object.keys(keyValue)[0] ?? "field" : "field";
    sendError(res, 409, "CONFLICT", `Duplicate value for ${field}`, {
      [field]: `This ${field} already exists`,
    });
    return;
  }

  // Unexpected error
  if (env.NODE_ENV === "development") {
    console.error("Unhandled error:", err);
  }

  sendError(res, 500, "INTERNAL_ERROR", "An unexpected error occurred");
}
