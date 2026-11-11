/**
 * Zod schemas for Property API request validation.
 * Prevents MongoDB operator injection by strictly typing all inputs.
 */

import { z } from "zod";
import {
  PROPERTY_PURPOSES,
  PROPERTY_TYPES,
  PROPERTY_STATUSES,
  PUBLISH_STATUSES,
  FURNISHED_STATUSES,
  VERIFICATION_STATUSES,
  CURRENCIES,
  SORT_OPTIONS,
} from "../constants/enums.js";

/* ── Shared helpers ─────────────────────────────────────────── */
const objectIdRegex = /^[a-f\d]{24}$/i;
const objectIdSchema = z.string().regex(objectIdRegex, "Invalid ObjectId format");

const toNumberArray = (val: string | string[] | undefined): number[] | undefined => {
  if (!val) return undefined;
  const arr = Array.isArray(val) ? val : [val];
  const nums = arr.map(Number).filter((n) => !isNaN(n));
  return nums.length > 0 ? nums : undefined;
};

const toStringArray = (val: string | string[] | undefined): string[] | undefined => {
  if (!val) return undefined;
  const arr = Array.isArray(val) ? val : [val];
  return arr.length > 0 ? arr : undefined;
};

/* ── GET /properties query params ───────────────────────────── */
export const listPropertiesSchema = z.object({
  purpose: z.enum(PROPERTY_PURPOSES).optional(),
  propertyType: z
    .union([z.enum(PROPERTY_TYPES), z.array(z.enum(PROPERTY_TYPES))])
    .optional()
    .transform((v) => (v ? (Array.isArray(v) ? v : [v]) : undefined)),
  status: z.enum(PROPERTY_STATUSES).optional(),
  area: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) => toStringArray(v as string | string[] | undefined)),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  bedrooms: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) => toNumberArray(v as string | string[] | undefined)),
  bathrooms: z.coerce.number().int().min(0).optional(),
  furnished: z.enum(FURNISHED_STATUSES).optional(),
  amenities: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) => toStringArray(v as string | string[] | undefined)),
  developer: z.string().optional(),
  q: z.string().max(200).optional(),
  sort: z.enum(SORT_OPTIONS).default("newest"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
});

export type ListPropertiesQuery = z.infer<typeof listPropertiesSchema>;

/* ── GET /properties/:slug ──────────────────────────────────── */
export const propertySlugSchema = z.object({
  slug: z.string().min(1).max(300).regex(/^[a-z0-9-]+$/, "Invalid slug format"),
});

/* ── POST /properties ───────────────────────────────────────── */
export const createPropertySchema = z.object({
  title: z.string().min(3).max(200).trim(),
  purpose: z.enum(PROPERTY_PURPOSES),
  propertyType: z.enum(PROPERTY_TYPES),
  status: z.enum(PROPERTY_STATUSES),
  publishStatus: z.enum(PUBLISH_STATUSES).default("draft"),
  price: z.number().min(0),
  currency: z.enum(CURRENCIES).default("AED"),
  pricePerSqft: z.number().min(0).optional(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  builtUpArea: z.number().min(0),
  plotArea: z.number().min(0).optional(),
  location: z.object({
    address: z.string().min(1).trim(),
    community: z.string().min(1).trim(),
    area: z.string().min(1).trim(),
    city: z.string().min(1).trim().default("Dubai"),
    coordinates: z
      .object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
      })
      .optional(),
  }),
  areaRef: objectIdSchema.optional(),
  projectRef: objectIdSchema.optional(),
  developerRef: objectIdSchema.optional(),
  agentRef: objectIdSchema,
  description: z.string().min(10).trim(),
  features: z.array(z.string().trim()).default([]),
  amenities: z.array(z.string().trim()).default([]),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        publicId: z.string().optional(),
        caption: z.string().optional(),
        isPrimary: z.boolean().default(false),
        width: z.number().optional(),
        height: z.number().optional(),
      })
    )
    .default([]),
  videos: z
    .array(z.object({ url: z.string().url(), title: z.string().optional() }))
    .optional(),
  floorPlans: z
    .array(z.object({ url: z.string().url(), title: z.string() }))
    .optional(),
  virtualTour: z.string().url().optional(),
  permitNumber: z.string().trim().optional(),
  reraRegistration: z.string().trim().optional(),
  verificationStatus: z.enum(VERIFICATION_STATUSES).default("unverified"),
  furnished: z.enum(FURNISHED_STATUSES).optional(),
  parking: z.number().int().min(0).optional(),
  serviceChargePerSqft: z.number().min(0).optional(),
  handoverDate: z.string().trim().optional(),
  paymentPlan: z
    .object({
      onBooking: z.number().min(0),
      duringConstruction: z.number().min(0),
      onHandover: z.number().min(0),
      postHandover: z.number().min(0).optional(),
      postHandoverYears: z.number().int().min(0).optional(),
    })
    .optional(),
});

export type CreatePropertyBody = z.infer<typeof createPropertySchema>;

/* ── PATCH /properties/:id ──────────────────────────────────── */
export const updatePropertySchema = createPropertySchema.partial();
export type UpdatePropertyBody = z.infer<typeof updatePropertySchema>;

export const objectIdParamSchema = z.object({
  id: objectIdSchema,
});
