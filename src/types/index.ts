// Core shared TypeScript types for Dubai Estate Platform

/* ── API ────────────────────────────────────────────────────── */
export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: Pagination;
}

/* ── Property ───────────────────────────────────────────────── */
export type PropertyPurpose = "sale" | "rent";
export type PropertyType =
  | "apartment"
  | "villa"
  | "townhouse"
  | "penthouse"
  | "duplex"
  | "office"
  | "retail"
  | "land";
export type PropertyStatus = "ready" | "off-plan";
export type PublishStatus = "draft" | "published" | "archived";
export type FurnishedStatus = "furnished" | "unfurnished" | "semi-furnished";
export type VerificationStatus = "unverified" | "verified" | "featured";

export interface PropertyLocation {
  address: string;
  community: string;
  area: string;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PropertyImage {
  url: string;
  publicId?: string;
  caption?: string;
  isPrimary: boolean;
  width?: number;
  height?: number;
}

export interface PaymentPlan {
  onBooking: number;
  duringConstruction: number;
  onHandover: number;
  postHandover?: number;
  postHandoverYears?: number;
}

export interface Property {
  _id: string;
  title: string;
  slug: string;
  purpose: PropertyPurpose;
  propertyType: PropertyType;
  status: PropertyStatus;
  publishStatus: PublishStatus;
  price: number;
  currency: "AED" | "USD";
  pricePerSqft?: number;
  bedrooms: number;
  bathrooms: number;
  builtUpArea: number;
  plotArea?: number;
  location: PropertyLocation;
  areaRef?: string;
  projectRef?: string;
  developerRef?: string;
  agentRef: string;
  description: string;
  features: string[];
  amenities: string[];
  images: PropertyImage[];
  videos?: Array<{ url: string; title?: string }>;
  floorPlans?: Array<{ url: string; title: string }>;
  virtualTour?: string;
  permitNumber?: string;
  reraRegistration?: string;
  verificationStatus: VerificationStatus;
  furnished?: FurnishedStatus;
  parking?: number;
  serviceChargePerSqft?: number;
  handoverDate?: string;
  paymentPlan?: PaymentPlan;
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  // Populated fields
  agent?: Agent;
  area?: Area;
  project?: Project;
  developer?: Developer;
}

export interface PropertyFilters {
  purpose?: PropertyPurpose;
  propertyType?: PropertyType | PropertyType[];
  status?: PropertyStatus;
  area?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | number[];
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  furnished?: FurnishedStatus;
  amenities?: string[];
  developer?: string;
  project?: string;
  q?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

/* ── Project ────────────────────────────────────────────────── */
export type ProjectStatus = "upcoming" | "under-construction" | "ready";

export interface UnitType {
  type: string;
  bedrooms: number;
  area: string;
  startingPrice: number;
}

export interface Project {
  _id: string;
  name: string;
  slug: string;
  developerRef: string;
  location: PropertyLocation;
  areaRef?: string;
  status: ProjectStatus;
  publishStatus: PublishStatus;
  startingPrice: number;
  currency: "AED";
  unitTypes: UnitType[];
  handoverDate?: string;
  paymentPlan?: PaymentPlan;
  amenities: string[];
  description: string;
  images: PropertyImage[];
  floorPlans?: Array<{ url: string; title: string }>;
  brochureUrl?: string;
  faq?: Array<{ question: string; answer: string }>;
  agentRef?: string;
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  // Populated
  developer?: Developer;
  area?: Area;
}

/* ── Developer ──────────────────────────────────────────────── */
export interface Developer {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  established?: number;
  projectsCount?: number;
  headquarters?: string;
  website?: string;
  images?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ── Area ───────────────────────────────────────────────────── */
export interface NearbyPlace {
  category: string;
  name: string;
  distance: string;
}

export interface Area {
  _id: string;
  name: string;
  slug: string;
  heroImage: string;
  overview: string;
  lifestyle?: string;
  propertyTypes?: string[];
  avgSalePricePerSqft?: number;
  avgRentApartment?: number;
  avgRentalYield?: number;
  coordinates?: { lat: number; lng: number };
  transportation?: {
    metro: boolean;
    bus: boolean;
    tram: boolean;
    notes?: string;
  };
  nearbyPlaces?: NearbyPlace[];
  faq?: Array<{ question: string; answer: string }>;
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ── Agent ──────────────────────────────────────────────────── */
export interface Agent {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  avatar?: string;
  bio?: string;
  whatsapp?: string;
  specializations?: PropertyType[];
  languages?: string[];
  isActive: boolean;
}

/* ── Lead ───────────────────────────────────────────────────── */
export type LeadIntent = "BUY" | "RENT" | "INVEST" | "INFORMATION" | "UNKNOWN";
export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "VIEWING"
  | "NEGOTIATION"
  | "CLOSED"
  | "LOST";
export type LeadSource =
  | "WEBSITE"
  | "PROPERTY"
  | "PROJECT"
  | "WHATSAPP"
  | "CALL"
  | "CONTACT_FORM"
  | "BROCHURE"
  | "VIEWING_REQUEST";

export interface LeadFormData {
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  message?: string;
  propertyId?: string;
  projectId?: string;
  agentId?: string;
  source: LeadSource;
  intent?: LeadIntent;
  budget?: { min?: number; max?: number; currency: string };
  preferredAreas?: string[];
}

/* ── Viewing Request ─────────────────────────────────────────── */
export interface ViewingRequestFormData {
  name: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  propertyId: string;
}

/* ── Blog ───────────────────────────────────────────────────── */
export type BlogPublishStatus = "draft" | "published";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author?: Agent;
  publishStatus: BlogPublishStatus;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  readTimeMinutes?: number;
  createdAt: string;
  updatedAt: string;
}

/* ── UI Helpers ─────────────────────────────────────────────── */
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
export type Intent = "default" | "success" | "warning" | "error" | "info";
