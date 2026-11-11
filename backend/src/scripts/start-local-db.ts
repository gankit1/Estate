/**
 * Development script to start a local MongoDB process on port 27017.
 * Uses system mongod if available, otherwise uses the downloaded mongod binary.
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(__dirname, "../..");
const dbPath = path.join(backendRoot, "data", "db");

function checkPort(port = 27017, host = "127.0.0.1"): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on("connect", () => {
      socket.destroy();
      resolve(true); // port in use
    });
    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });
    socket.on("error", () => {
      resolve(false);
    });
    socket.connect(port, host);
  });
}

function findMongodBinary(): string {
  // Check memory-server cache
  const cacheDir = path.join(backendRoot, "node_modules", ".cache", "mongodb-memory-server");
  if (fs.existsSync(cacheDir)) {
    const files = fs.readdirSync(cacheDir);
    const mongodFile = files.find((f) => f.startsWith("mongod-") || f === "mongod");
    if (mongodFile) {
      return path.join(cacheDir, mongodFile);
    }
  }
  return "mongod";
}

async function start() {
  const isRunning = await checkPort(27017);
  if (isRunning) {
    console.log("✓ MongoDB is already running on 127.0.0.1:27017");
    process.exit(0);
  }

  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }

  const binary = findMongodBinary();
  console.log(`Starting MongoDB on 127.0.0.1:27017 using binary: ${binary}`);
  console.log(`Data directory: ${dbPath}`);

  const proc = spawn(binary, ["--dbpath", dbPath, "--port", "27017", "--bind_ip", "127.0.0.1"], {
    stdio: "inherit",
  });

  proc.on("error", (err) => {
    console.error("Failed to start mongod:", err);
    process.exit(1);
  });

  proc.on("exit", (code) => {
    console.log(`mongod process exited with code ${code}`);
    process.exit(code ?? 0);
  });

  process.on("SIGINT", () => {
    proc.kill("SIGINT");
  });

  process.on("SIGTERM", () => {
    proc.kill("SIGTERM");
  });
}

start();
