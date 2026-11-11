import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IAgent extends Document {
  firstName: string;
  lastName: string;
  slug: string;
  email: string;
  phone: string;
  whatsapp?: string;
  avatar?: string;
  bio?: string;
  title?: string;
  specializations: string[];
  languages: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const agentSchema = new Schema<IAgent>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, trim: true },
    avatar: { type: String, trim: true },
    bio: { type: String, trim: true },
    title: { type: String, trim: true },
    specializations: [{ type: String }],
    languages: [{ type: String }],
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Agent: Model<IAgent> = mongoose.models.Agent ?? mongoose.model<IAgent>("Agent", agentSchema);
