import { Router } from "express";
import { sendSuccess } from "../utils/response.js";
import mongoose from "mongoose";

const router = Router();

router.get("/", (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? "connected" : dbState === 2 ? "connecting" : "disconnected";

  sendSuccess(res, {
    status: "ok",
    uptime: Math.floor(process.uptime()),
    database: dbStatus,
    timestamp: new Date().toISOString(),
  }, "API is healthy");
});

export default router;
