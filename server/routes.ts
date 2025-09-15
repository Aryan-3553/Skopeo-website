import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Basic health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Skopeo API is running" });
  });

  // Example API endpoint
  app.get("/api/status", (req, res) => {
    res.json({ 
      status: "success", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
