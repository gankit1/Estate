/**
 * Property controller — thin handlers that delegate to the service layer.
 */

import type { Request, Response, NextFunction } from "express";
import * as propertyService from "../services/propertyService.js";
import { sendSuccess, sendPaginated } from "../utils/response.js";
import type { ListPropertiesQuery } from "../validators/property.js";

/**
 * GET /api/v1/properties
 */
export async function listProperties(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = req.validatedQuery as ListPropertiesQuery;
    const result = await propertyService.listProperties(query);
    sendPaginated(res, result.items, result.pagination);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/v1/properties/featured
 */
export async function getFeatured(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const limit = Math.min(Number(req.query.limit) || 6, 20);
    const properties = await propertyService.getFeatured(limit);
    sendSuccess(res, properties);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/v1/properties/:slug
 */
export async function getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.validatedParams as { slug: string };
    const property = await propertyService.getBySlug(slug);
    sendSuccess(res, property);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/v1/properties/:slug/similar
 */
export async function getSimilar(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const slug = (Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug) as string;
    const limit = Math.min(Number(req.query.limit) || 3, 10);
    const properties = await propertyService.getSimilar(slug, limit);
    sendSuccess(res, properties);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/v1/properties
 * NOTE: No authentication in Phase 3. Will be protected in Phase 4+.
 */
export async function createProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const property = await propertyService.createProperty(req.body, req.user);
    sendSuccess(res, property, "Property created successfully", 201);
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/v1/properties/:id
 * Protected: Admin or Agent who owns the property
 */
export async function updateProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.validatedParams as { id: string };
    const property = await propertyService.updateProperty(id, req.body, req.user);
    sendSuccess(res, property, "Property updated successfully");
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/v1/properties/:id
 * Protected: Admin or Agent who owns the property
 */
export async function deleteProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.validatedParams as { id: string };
    await propertyService.deleteProperty(id, req.user);
    sendSuccess(res, null, "Property deleted successfully");
  } catch (err) {
    next(err);
  }
}
