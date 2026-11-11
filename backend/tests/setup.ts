/**
 * Test setup file: starts in-memory MongoDB, connects mongoose, and manages lifecycle.
 */

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { beforeAll, afterAll, beforeEach } from "vitest";

let mongod: MongoMemoryServer | null = null;

beforeAll(async () => {
  // Start ephemeral in-memory MongoDB server
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // Disconnect any existing connection
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri);
}, 60_000);

beforeEach(async () => {
  // Clear all collections between tests to keep them isolated
  if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongod) {
    await mongod.stop();
  }
}, 30_000);
