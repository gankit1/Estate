import mongoose, { Schema, type Document, type Model } from "mongoose";

interface NearbyPlace {
  category: string;
  name: string;
  distance: string;
}

export interface IArea extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const areaSchema = new Schema<IArea>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    heroImage: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    lifestyle: { type: String, trim: true },
    propertyTypes: [{ type: String }],
    avgSalePricePerSqft: { type: Number, min: 0 },
    avgRentApartment: { type: Number, min: 0 },
    avgRentalYield: { type: Number, min: 0 },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    transportation: {
      metro: { type: Boolean },
      bus: { type: Boolean },
      tram: { type: Boolean },
      notes: { type: String },
    },
    nearbyPlaces: [
      {
        category: { type: String, required: true },
        name: { type: String, required: true },
        distance: { type: String, required: true },
      },
    ],
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Area: Model<IArea> = mongoose.models.Area ?? mongoose.model<IArea>("Area", areaSchema);
