/**
 * Zod validation middleware factory.
 * Validates request body, query, or params against a Zod schema.
 */

import type { Request, Response, NextFunction } from "express";
import { type ZodSchema } from "zod";
import { sendError } from "../utils/response.js";

type ValidationTarget = "body" | "query" | "params";

export function validate(schema: ZodSchema, target: ValidationTarget = "body") {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      const fields: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join(".");
        fields[key] = issue.message;
      }
      sendError(_res, 422, "VALIDATION_ERROR", "Invalid request data", fields);
      return;
    }
    // Replace with parsed & transformed data
    if (target === "body") req.body = result.data;
    if (target === "query") req.validatedQuery = result.data;
    if (target === "params") req.validatedParams = result.data;
    next();
  };
}
