/**
 * Consistent API response helpers matching the frontend ApiResponse<T> type.
 */

import type { Response } from "express";

interface SuccessPayload<T> {
  success: true;
  data: T;
  message?: string;
}

interface ErrorPayload {
  success: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
}

export function sendSuccess<T>(res: Response, data: T, message?: string, statusCode = 200): void {
  const body: SuccessPayload<T> = { success: true, data };
  if (message) body.message = message;
  res.status(statusCode).json(body);
}

export function sendError(
  res: Response,
  statusCode: number,
  code: string,
  message: string,
  fields?: Record<string, string>
): void {
  const body: ErrorPayload = {
    success: false,
    error: { code, message },
  };
  if (fields) body.error.fields = fields;
  res.status(statusCode).json(body);
}

export function sendPaginated<T>(
  res: Response,
  items: T[],
  pagination: { page: number; limit: number; total: number; totalPages: number }
): void {
  sendSuccess(res, { items, pagination });
}
