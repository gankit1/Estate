/**
 * Authentication and Role-Based Authorization Middlewares.
 */

import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { verifyJwt } from "../utils/jwt.js";
import type { UserRole } from "../types/express.js";

/**
 * Middleware to authenticate requests via Bearer JWT.
 * Sets `req.user` upon successful token verification.
 */
export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw AppError.unauthorized(
        "Authentication required. Please provide a valid Bearer token in the Authorization header."
      );
    }

    const token = authHeader.substring(7).trim();
    if (!token) {
      throw AppError.unauthorized("Authentication token is missing.");
    }

    const payload = verifyJwt(token);
    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      agentId: payload.agentId,
    };

    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Middleware to enforce role-based access control (RBAC).
 * Requires `authenticate` to run first.
 */
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(AppError.unauthorized("Authentication required."));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        AppError.forbidden(
          `Permission denied. Role '${req.user.role}' is not authorized to perform this operation.`
        )
      );
    }

    next();
  };
}
