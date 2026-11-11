/**
 * Property Service — business logic layer.
 * Orchestrates repository calls, slug generation, and validation.
 */

import * as propertyRepo from "../repositories/propertyRepository.js";
import type { IProperty } from "../models/index.js";
import type { ListPropertiesQuery, CreatePropertyBody, UpdatePropertyBody } from "../validators/property.js";
import { slugify } from "../utils/slugify.js";
import { AppError } from "../utils/AppError.js";

/**
 * Generates a unique slug, appending a numeric suffix if needed.
 */
async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
  let slug = slugify(title);
  let attempt = 0;

  while (await propertyRepo.slugExists(slug, excludeId)) {
    attempt++;
    slug = `${slugify(title)}-${attempt}`;
  }

  return slug;
}

/* ── List ───────────────────────────────────────────────────── */
export async function listProperties(query: ListPropertiesQuery) {
  return propertyRepo.findProperties(query);
}

/* ── Get by slug ────────────────────────────────────────────── */
export async function getBySlug(slug: string) {
  const property = await propertyRepo.findBySlug(slug);
  if (!property) {
    throw AppError.notFound(`Property with slug "${slug}" not found.`);
  }
  return property;
}

/* ── Featured ───────────────────────────────────────────────── */
export async function getFeatured(limit: number) {
  return propertyRepo.findFeatured(limit);
}

/* ── Similar ────────────────────────────────────────────────── */
export async function getSimilar(identifier: string, limit: number) {
  let property = await propertyRepo.findBySlug(identifier);
  if (!property && identifier.match(/^[0-9a-fA-F]{24}$/)) {
    property = await propertyRepo.findById(identifier);
  }
  if (!property) {
    throw AppError.notFound(`Property "${identifier}" not found.`);
  }
  return propertyRepo.findSimilar(property, limit);
}

import type { AuthUser } from "../types/express.js";

/* ── Create ─────────────────────────────────────────────────── */
export async function createProperty(data: CreatePropertyBody, user?: AuthUser) {
  const propertyData: Record<string, unknown> = { ...data };

  // If user is an agent, bind agentRef strictly to their own agentId
  if (user && user.role === "agent") {
    if (!user.agentId) {
      throw AppError.forbidden("Agent user account has no associated agent profile.");
    }
    propertyData.agentRef = user.agentId;
  }

  const slug = await generateUniqueSlug(data.title);
  propertyData.slug = slug;
  propertyData.publishedAt = data.publishStatus === "published" ? new Date() : undefined;

  return propertyRepo.createProperty(propertyData as unknown as Partial<IProperty>);
}

/* ── Update ─────────────────────────────────────────────────── */
export async function updateProperty(id: string, data: UpdatePropertyBody, user?: AuthUser) {
  const existing = await propertyRepo.findById(id);
  if (!existing) {
    throw AppError.notFound(`Property with id "${id}" not found.`);
  }

  // Enforce agent ownership
  if (user && user.role === "agent") {
    if (!user.agentId || existing.agentRef?.toString() !== user.agentId.toString()) {
      throw AppError.forbidden("Permission denied. You can only update properties that you own.");
    }
    // Prevent mass-assignment / ownership transfer
    const incomingAgentRef = (data as Record<string, unknown>).agentRef;
    if (incomingAgentRef && incomingAgentRef.toString() !== user.agentId.toString()) {
      throw AppError.forbidden("Permission denied. Agents cannot reassign listing ownership.");
    }
  }

  const updateData: Record<string, unknown> = { ...data };

  // Regenerate slug if title changed
  if (data.title && data.title !== existing.title) {
    updateData.slug = await generateUniqueSlug(data.title, id);
  }

  // Set publishedAt if transitioning to published
  if (data.publishStatus === "published" && existing.publishStatus !== "published") {
    updateData.publishedAt = new Date();
  }

  const updated = await propertyRepo.updateProperty(id, updateData as unknown as Partial<IProperty>);
  if (!updated) {
    throw AppError.notFound(`Property with id "${id}" not found.`);
  }

  return updated;
}

/* ── Delete ─────────────────────────────────────────────────── */
export async function deleteProperty(id: string, user?: AuthUser) {
  const existing = await propertyRepo.findById(id);
  if (!existing) {
    throw AppError.notFound(`Property with id "${id}" not found.`);
  }

  // Enforce agent ownership
  if (user && user.role === "agent") {
    if (!user.agentId || existing.agentRef?.toString() !== user.agentId.toString()) {
      throw AppError.forbidden("Permission denied. You can only delete properties that you own.");
    }
  }

  const deleted = await propertyRepo.deleteProperty(id);
  if (!deleted) {
    throw AppError.notFound(`Property with id "${id}" not found.`);
  }
  return deleted;
}
