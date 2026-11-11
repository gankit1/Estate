import { Router } from "express";
import * as ctrl from "../controllers/propertyController.js";
import { validate } from "../middlewares/validate.js";
import { authenticate, requireRole } from "../middlewares/auth.js";
import { mutationLimiter } from "../middlewares/rateLimiter.js";
import {
  listPropertiesSchema,
  propertySlugSchema,
  createPropertySchema,
  updatePropertySchema,
  objectIdParamSchema,
} from "../validators/property.js";

const router = Router();

// GET /api/v1/properties/featured — must come before /:slug (PUBLIC)
router.get("/featured", ctrl.getFeatured);

// GET /api/v1/properties (PUBLIC)
router.get("/", validate(listPropertiesSchema, "query"), ctrl.listProperties);

// GET /api/v1/properties/:slug (PUBLIC)
router.get("/:slug", validate(propertySlugSchema, "params"), ctrl.getBySlug);

// GET /api/v1/properties/:slug/similar (PUBLIC)
router.get("/:slug/similar", ctrl.getSimilar);

// POST /api/v1/properties (PROTECTED: Admin or Agent only)
router.post(
  "/",
  mutationLimiter,
  authenticate,
  requireRole("admin", "agent"),
  validate(createPropertySchema, "body"),
  ctrl.createProperty
);

// PATCH /api/v1/properties/:id (PROTECTED: Admin or Agent who owns the property)
router.patch(
  "/:id",
  mutationLimiter,
  authenticate,
  requireRole("admin", "agent"),
  validate(objectIdParamSchema, "params"),
  validate(updatePropertySchema, "body"),
  ctrl.updateProperty
);

// DELETE /api/v1/properties/:id (PROTECTED: Admin or Agent who owns the property)
router.delete(
  "/:id",
  mutationLimiter,
  authenticate,
  requireRole("admin", "agent"),
  validate(objectIdParamSchema, "params"),
  ctrl.deleteProperty
);

export default router;
