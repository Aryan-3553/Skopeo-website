import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

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

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Accept any data without validation
      const formData = req.body;
      
      // Extract IP address and user agent for tracking
      const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
      const userAgent = req.get('User-Agent');
      
      // Create the contact message with additional metadata
      const contactMessage = await storage.createContactMessage({
        firstName: formData.firstName || "Unknown",
        lastName: formData.lastName || "User",
        email: formData.email || "no-email@example.com",
        company: formData.company || undefined,
        role: formData.role || undefined,
        message: formData.message || "No message provided",
        ipAddress: ipAddress || undefined,
        userAgent: userAgent || undefined,
      });

      res.status(201).json({
        status: "success",
        message: "Contact message submitted successfully",
        data: {
          id: contactMessage.id,
          createdAt: contactMessage.createdAt,
        }
      });
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error"
      });
    }
  });

  // Get all contact messages (for admin use)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json({
        status: "success",
        data: messages
      });
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error"
      });
    }
  });

  // Get a specific contact message
  app.get("/api/contact/:id", async (req, res) => {
    try {
      const message = await storage.getContactMessage(req.params.id);
      if (!message) {
        return res.status(404).json({
          status: "error",
          message: "Contact message not found"
        });
      }
      res.json({
        status: "success",
        data: message
      });
    } catch (error) {
      console.error("Error fetching contact message:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error"
      });
    }
  });

  // Update contact message status
  app.patch("/api/contact/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || !['new', 'contacted', 'resolved'].includes(status)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid status. Must be one of: new, contacted, resolved"
        });
      }

      const updatedMessage = await storage.updateContactMessageStatus(req.params.id, status);
      if (!updatedMessage) {
        return res.status(404).json({
          status: "error",
          message: "Contact message not found"
        });
      }

      res.json({
        status: "success",
        data: updatedMessage
      });
    } catch (error) {
      console.error("Error updating contact message status:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error"
      });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
