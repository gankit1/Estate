/**
 * Property Repository — encapsulates all Mongoose queries.
 * Controllers and services never call Mongoose directly.
 */

import { Property, type IProperty } from "../models/index.js";
import type { FilterQuery, SortOrder } from "mongoose";
import type { ListPropertiesQuery } from "../validators/property.js";
import type { SortOption } from "../constants/enums.js";

/* ── Sort map ───────────────────────────────────────────────── */
const SORT_MAP: Record<SortOption, Record<string, SortOrder>> = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  "area-asc": { builtUpArea: 1 },
  "area-desc": { builtUpArea: -1 },
  popular: { views: -1 },
};

/* ── Build filter query from validated params ───────────────── */
function buildFilter(params: ListPropertiesQuery): FilterQuery<IProperty> {
  const filter: FilterQuery<IProperty> = { publishStatus: "published" };

  if (params.purpose) filter.purpose = params.purpose;

  if (params.propertyType && params.propertyType.length > 0) {
    filter.propertyType = params.propertyType.length === 1
      ? params.propertyType[0]
      : { $in: params.propertyType };
  }

  if (params.status) filter.status = params.status;

  if (params.area && params.area.length > 0) {
    filter["location.area"] = {
      $in: params.area.map((a) => new RegExp(a.replace(/-/g, "[ -]"), "i")),
    };
  }

  if (params.minPrice !== undefined || params.maxPrice !== undefined) {
    filter.price = {};
    if (params.minPrice !== undefined) filter.price.$gte = params.minPrice;
    if (params.maxPrice !== undefined) filter.price.$lte = params.maxPrice;
  }

  if (params.bedrooms && params.bedrooms.length > 0) {
    filter.bedrooms = params.bedrooms.length === 1
      ? params.bedrooms[0]
      : { $in: params.bedrooms };
  }

  if (params.bathrooms !== undefined) {
    filter.bathrooms = { $gte: params.bathrooms };
  }

  if (params.furnished) filter.furnished = params.furnished;

  if (params.amenities && params.amenities.length > 0) {
    filter.amenities = { $all: params.amenities };
  }

  if (params.developer) {
    filter.developerRef = params.developer;
  }

  if (params.q) {
    filter.$text = { $search: params.q };
  }

  return filter;
}

/* ── Public Repository API ──────────────────────────────────── */

function formatPropertyDoc<T>(doc: T | null): T | null {
  if (!doc) return null;
  const d = doc as Record<string, unknown>;
  const agent = d.agent ?? (typeof d.agentRef === "object" ? d.agentRef : undefined);
  const area = d.area ?? (typeof d.areaRef === "object" ? d.areaRef : undefined);
  const developer = d.developer ?? (typeof d.developerRef === "object" ? d.developerRef : undefined);
  return {
    ...d,
    agent,
    area,
    developer,
  } as unknown as T;
}

export async function findProperties(params: ListPropertiesQuery) {
  const filter = buildFilter(params);
  const sort = SORT_MAP[params.sort] ?? SORT_MAP.newest;
  const skip = (params.page - 1) * params.limit;

  const [items, total] = await Promise.all([
    Property.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(params.limit)
      .populate("agentRef", "firstName lastName phone email avatar whatsapp languages")
      .populate("areaRef", "name slug")
      .populate("developerRef", "name slug logo")
      .lean(),
    Property.countDocuments(filter),
  ]);

  return {
    items: items.map((item) => formatPropertyDoc(item)),
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages: Math.ceil(total / params.limit),
    },
  };
}

export async function findBySlug(slug: string) {
  const doc = await Property.findOne({ slug, publishStatus: "published" })
    .populate("agentRef", "firstName lastName phone email avatar whatsapp bio specializations languages isActive")
    .populate("areaRef")
    .populate("developerRef")
    .lean<IProperty>();

  return formatPropertyDoc(doc);
}

export async function findById(id: string) {
  const doc = await Property.findById(id).lean<IProperty>();
  return formatPropertyDoc(doc);
}

export async function findFeatured(limit: number) {
  const docs = await Property.find({ publishStatus: "published", verificationStatus: "featured" })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("agentRef", "firstName lastName phone avatar")
    .lean();

  return docs.map((doc) => formatPropertyDoc(doc as Record<string, unknown>));
}

export async function findSimilar(
  property: Pick<IProperty, "_id" | "location" | "propertyType" | "price">,
  limit: number
) {
  const docs = await Property.find({
    _id: { $ne: property._id },
    publishStatus: "published",
    $or: [
      { "location.area": property.location.area },
      { propertyType: property.propertyType },
      { price: { $gte: property.price * 0.7, $lte: property.price * 1.3 } },
    ],
  })
    .limit(limit)
    .populate("agentRef", "firstName lastName phone avatar")
    .lean();

  return docs.map((doc) => formatPropertyDoc(doc as Record<string, unknown>));
}

export async function createProperty(data: Partial<IProperty>) {
  const property = new Property(data);
  return property.save();
}

export async function updateProperty(id: string, data: Partial<IProperty>) {
  return Property.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
}

export async function deleteProperty(id: string) {
  return Property.findByIdAndDelete(id).lean();
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const filter: FilterQuery<IProperty> = { slug };
  if (excludeId) filter._id = { $ne: excludeId };
  const count = await Property.countDocuments(filter);
  return count > 0;
}
