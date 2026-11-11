/**
 * Shared enums/constants matching the frontend type definitions.
 * Single source of truth for enum values used in Mongoose schemas and validators.
 */

export const PROPERTY_PURPOSES = ["sale", "rent"] as const;
export type PropertyPurpose = (typeof PROPERTY_PURPOSES)[number];

export const PROPERTY_TYPES = ["apartment", "villa", "townhouse", "penthouse", "duplex", "office", "retail", "land"] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const PROPERTY_STATUSES = ["ready", "off-plan"] as const;
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

export const PUBLISH_STATUSES = ["draft", "published", "archived"] as const;
export type PublishStatus = (typeof PUBLISH_STATUSES)[number];

export const FURNISHED_STATUSES = ["furnished", "unfurnished", "semi-furnished"] as const;
export type FurnishedStatus = (typeof FURNISHED_STATUSES)[number];

export const VERIFICATION_STATUSES = ["unverified", "verified", "featured"] as const;
export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

export const CURRENCIES = ["AED", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const SORT_OPTIONS = ["newest", "oldest", "price-asc", "price-desc", "area-asc", "area-desc", "popular"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];
