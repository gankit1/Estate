/**
 * Data normalization functions for API responses.
 * Bridges differences between Mongoose documents and frontend domain types.
 */

import type { Property, Agent, Area, Developer, PropertyImage } from "@/types";

export function normalizeImage(img: unknown, fallbackTitle = "Property"): PropertyImage {
  if (typeof img === "string") {
    return {
      url: img,
      isPrimary: true,
      caption: fallbackTitle,
    };
  }

  if (img && typeof img === "object") {
    const i = img as Record<string, unknown>;
    return {
      url: String(i.url || "/images/placeholder.jpg"),
      publicId: i.publicId ? String(i.publicId) : undefined,
      caption: i.caption ? String(i.caption) : fallbackTitle,
      isPrimary: Boolean(i.isPrimary),
      width: typeof i.width === "number" ? i.width : undefined,
      height: typeof i.height === "number" ? i.height : undefined,
    };
  }

  return {
    url: "/images/placeholder.jpg",
    isPrimary: true,
    caption: fallbackTitle,
  };
}

export function normalizeProperty(raw: unknown): Property {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid property payload received from API");
  }

  const p = raw as Record<string, unknown>;

  // Resolve populated Agent
  let agent: Agent | undefined = undefined;
  if (p.agent && typeof p.agent === "object") {
    agent = p.agent as Agent;
  } else if (p.agentRef && typeof p.agentRef === "object") {
    agent = p.agentRef as Agent;
  }

  // Resolve populated Area
  let area: Area | undefined = undefined;
  if (p.area && typeof p.area === "object") {
    area = p.area as Area;
  } else if (p.areaRef && typeof p.areaRef === "object") {
    area = p.areaRef as Area;
  }

  // Resolve populated Developer
  let developer: Developer | undefined = undefined;
  if (p.developer && typeof p.developer === "object") {
    developer = p.developer as Developer;
  } else if (p.developerRef && typeof p.developerRef === "object") {
    developer = p.developerRef as Developer;
  }

  // Normalize Images
  let images: PropertyImage[] = [];
  if (Array.isArray(p.images) && p.images.length > 0) {
    images = p.images.map((img) => normalizeImage(img, String(p.title || "Property")));
  } else if (p.image) {
    images = [normalizeImage(p.image, String(p.title || "Property"))];
  } else {
    images = [{ url: "/images/placeholder.jpg", isPrimary: true, caption: String(p.title || "Property") }];
  }

  // Normalize Location
  const locRaw = (p.location && typeof p.location === "object" ? p.location : {}) as Record<string, unknown>;
  const location = {
    address: String(locRaw.address || locRaw.area || p.location || "Dubai, UAE"),
    community: String(locRaw.community || locRaw.area || locRaw.address || "Dubai"),
    area: String(locRaw.area || (typeof p.location === "string" ? p.location : "Dubai")),
    city: String(locRaw.city || "Dubai"),
    coordinates: locRaw.coordinates as { lat: number; lng: number } | undefined,
  };

  const id = String(p._id || p.id || "");

  return {
    _id: id,
    title: String(p.title || ""),
    slug: String(p.slug || ""),
    purpose: p.purpose === "rent" ? "rent" : "sale",
    propertyType: (p.propertyType as Property["propertyType"]) || "apartment",
    status: (p.status as Property["status"]) || "ready",
    publishStatus: (p.publishStatus as Property["publishStatus"]) || "published",
    price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
    currency: (p.currency as "AED" | "USD") || "AED",
    pricePerSqft: typeof p.pricePerSqft === "number" ? p.pricePerSqft : undefined,
    bedrooms: typeof p.bedrooms === "number" ? p.bedrooms : Number(p.bedrooms) || 0,
    bathrooms: typeof p.bathrooms === "number" ? p.bathrooms : Number(p.bathrooms) || 0,
    builtUpArea: typeof p.builtUpArea === "number" ? p.builtUpArea : Number(p.builtUpArea || p.area) || 0,
    plotArea: typeof p.plotArea === "number" ? p.plotArea : undefined,
    location,
    areaRef: typeof p.areaRef === "string" ? p.areaRef : area?._id,
    projectRef: typeof p.projectRef === "string" ? p.projectRef : undefined,
    developerRef: typeof p.developerRef === "string" ? p.developerRef : developer?._id,
    agentRef: typeof p.agentRef === "string" ? p.agentRef : agent?._id || "",
    description: String(p.description || ""),
    features: Array.isArray(p.features) ? p.features.map(String) : [],
    amenities: Array.isArray(p.amenities) ? p.amenities.map(String) : [],
    images,
    videos: Array.isArray(p.videos) ? (p.videos as Array<{ url: string; title?: string }>) : undefined,
    floorPlans: Array.isArray(p.floorPlans) ? (p.floorPlans as Array<{ url: string; title: string }>) : undefined,
    virtualTour: p.virtualTour ? String(p.virtualTour) : undefined,
    permitNumber: p.permitNumber ? String(p.permitNumber) : undefined,
    reraRegistration: p.reraRegistration ? String(p.reraRegistration) : undefined,
    verificationStatus: (p.verificationStatus as Property["verificationStatus"]) || "unverified",
    furnished: (p.furnished as Property["furnished"]) || undefined,
    parking: typeof p.parking === "number" ? p.parking : undefined,
    serviceChargePerSqft: typeof p.serviceChargePerSqft === "number" ? p.serviceChargePerSqft : undefined,
    handoverDate: p.handoverDate ? String(p.handoverDate) : undefined,
    paymentPlan: p.paymentPlan as Property["paymentPlan"],
    views: typeof p.views === "number" ? p.views : Number(p.views) || 0,
    publishedAt: p.publishedAt ? new Date(p.publishedAt as string).toISOString() : undefined,
    createdAt: p.createdAt ? new Date(p.createdAt as string).toISOString() : new Date().toISOString(),
    updatedAt: p.updatedAt ? new Date(p.updatedAt as string).toISOString() : new Date().toISOString(),
    agent,
    area,
    developer,
  };
}
