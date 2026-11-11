import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IDeveloper extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const developerSchema = new Schema<IDeveloper>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    logo: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    established: { type: Number },
    projectsCount: { type: Number, min: 0 },
    headquarters: { type: String, trim: true },
    website: { type: String, trim: true },
    images: [{ type: String }],
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Developer: Model<IDeveloper> = mongoose.models.Developer ?? mongoose.model<IDeveloper>("Developer", developerSchema);
