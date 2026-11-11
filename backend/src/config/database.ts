/**
 * MongoDB connection with graceful shutdown.
 */

import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log(`✓ MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log("✓ MongoDB disconnected");
}

// Graceful shutdown handlers
function handleShutdown(signal: string) {
  return async () => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    await disconnectDB();
    process.exit(0);
  };
}

process.on("SIGINT", handleShutdown("SIGINT"));
process.on("SIGTERM", handleShutdown("SIGTERM"));

// Connection event listeners
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  if (env.NODE_ENV !== "test") {
    console.log("MongoDB disconnected");
  }
});
