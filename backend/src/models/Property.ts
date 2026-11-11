import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";
import {
  PROPERTY_PURPOSES,
  PROPERTY_TYPES,
  PROPERTY_STATUSES,
  PUBLISH_STATUSES,
  FURNISHED_STATUSES,
  VERIFICATION_STATUSES,
  CURRENCIES,
} from "../constants/enums.js";

/* ── Sub-document interfaces ────────────────────────────────── */
interface PropertyImage {
  url: string;
  publicId?: string;
  caption?: string;
  isPrimary: boolean;
  width?: number;
  height?: number;
}

interface PropertyLocation {
  address: string;
  community: string;
  area: string;
  city: string;
  coordinates?: { lat: number; lng: number };
}

interface PaymentPlan {
  onBooking: number;
  duringConstruction: number;
  onHandover: number;
  postHandover?: number;
  postHandoverYears?: number;
}

/* ── Main document interface ────────────────────────────────── */
export interface IProperty extends Document {
  title: string;
  slug: string;
  purpose: (typeof PROPERTY_PURPOSES)[number];
  propertyType: (typeof PROPERTY_TYPES)[number];
  status: (typeof PROPERTY_STATUSES)[number];
  publishStatus: (typeof PUBLISH_STATUSES)[number];
  price: number;
  currency: (typeof CURRENCIES)[number];
  pricePerSqft?: number;
  bedrooms: number;
  bathrooms: number;
  builtUpArea: number;
  plotArea?: number;
  location: PropertyLocation;
  areaRef?: Types.ObjectId;
  projectRef?: Types.ObjectId;
  developerRef?: Types.ObjectId;
  agentRef: Types.ObjectId;
  description: string;
  features: string[];
  amenities: string[];
  images: PropertyImage[];
  videos?: Array<{ url: string; title?: string }>;
  floorPlans?: Array<{ url: string; title: string }>;
  virtualTour?: string;
  permitNumber?: string;
  reraRegistration?: string;
  verificationStatus: (typeof VERIFICATION_STATUSES)[number];
  furnished?: (typeof FURNISHED_STATUSES)[number];
  parking?: number;
  serviceChargePerSqft?: number;
  handoverDate?: string;
  paymentPlan?: PaymentPlan;
  views: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/* ── Schema ─────────────────────────────────────────────────── */
const propertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    purpose: { type: String, required: true, enum: PROPERTY_PURPOSES },
    propertyType: { type: String, required: true, enum: PROPERTY_TYPES },
    status: { type: String, required: true, enum: PROPERTY_STATUSES },
    publishStatus: { type: String, required: true, enum: PUBLISH_STATUSES, default: "draft" },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, enum: CURRENCIES, default: "AED" },
    pricePerSqft: { type: Number, min: 0 },
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    builtUpArea: { type: Number, required: true, min: 0 },
    plotArea: { type: Number, min: 0 },
    location: {
      address: { type: String, required: true, trim: true },
      community: { type: String, required: true, trim: true },
      area: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true, default: "Dubai" },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    areaRef: { type: Schema.Types.ObjectId, ref: "Area" },
    projectRef: { type: Schema.Types.ObjectId, ref: "Project" },
    developerRef: { type: Schema.Types.ObjectId, ref: "Developer" },
    agentRef: { type: Schema.Types.ObjectId, ref: "Agent", required: true },
    description: { type: String, required: true, trim: true },
    features: [{ type: String, trim: true }],
    amenities: [{ type: String, trim: true }],
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
        caption: { type: String },
        isPrimary: { type: Boolean, default: false },
        width: { type: Number },
        height: { type: Number },
      },
    ],
    videos: [
      {
        url: { type: String, required: true },
        title: { type: String },
      },
    ],
    floorPlans: [
      {
        url: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    virtualTour: { type: String, trim: true },
    permitNumber: { type: String, trim: true },
    reraRegistration: { type: String, trim: true },
    verificationStatus: {
      type: String,
      required: true,
      enum: VERIFICATION_STATUSES,
      default: "unverified",
    },
    furnished: { type: String, enum: FURNISHED_STATUSES },
    parking: { type: Number, min: 0 },
    serviceChargePerSqft: { type: Number, min: 0 },
    handoverDate: { type: String, trim: true },
    paymentPlan: {
      onBooking: { type: Number, min: 0 },
      duringConstruction: { type: Number, min: 0 },
      onHandover: { type: Number, min: 0 },
      postHandover: { type: Number, min: 0 },
      postHandoverYears: { type: Number, min: 0 },
    },
    views: { type: Number, default: 0, min: 0 },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

/* ── Indexes ────────────────────────────────────────────────── */
// Unique slug — primary lookup path for detail pages
// (already set via unique: true on the field)

// Single-field indexes for common filter queries
propertySchema.index({ publishStatus: 1 });
propertySchema.index({ purpose: 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ bedrooms: 1 });
propertySchema.index({ verificationStatus: 1 });
propertySchema.index({ createdAt: -1 });

// Compound: listing page default query (published + purpose + price range)
propertySchema.index({ publishStatus: 1, purpose: 1, price: 1 });

// Compound: area + type filter (common filter combination)
propertySchema.index({ publishStatus: 1, "location.area": 1, propertyType: 1 });

// Text index for free-text search
propertySchema.index(
  { title: "text", description: "text", "location.area": "text", "location.community": "text" },
  { name: "property_text_search" }
);

export const Property: Model<IProperty> = mongoose.models.Property ?? mongoose.model<IProperty>("Property", propertySchema);
