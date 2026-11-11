/**
 * Server entry point.
 * 1. Loads environment
 * 2. Connects to MongoDB
 * 3. Starts HTTP server
 */

import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";
import app from "./app.js";

async function start() {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`✓ Server running on http://localhost:${env.PORT}`);
    console.log(`  Environment: ${env.NODE_ENV}`);
    console.log(`  Health: http://localhost:${env.PORT}/api/v1/health`);
  });
}

start().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
