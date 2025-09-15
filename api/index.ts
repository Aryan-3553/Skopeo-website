import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { 
  type ContactMessage, 
  type InsertContactMessage,
  contactMessages
} from "../shared/schema";
import { eq } from "drizzle-orm";
import { insertContactMessageSchema } from "../shared/schema";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connection
let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  try {
    const client = postgres(process.env.DATABASE_URL);
    db = drizzle(client);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
} else {
  console.warn("⚠️ DATABASE_URL not found, database features disabled");
}

// Logging utility
function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// API Routes (inlined from server/routes.ts)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Skopeo API is running" });
});

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
    if (!db) {
      return res.status(500).json({
        status: "error",
        message: "Database not available"
      });
    }

    // Accept any data without validation
    const formData = req.body;
    
    // Extract IP address and user agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    // Create the contact message with additional metadata
    const result = await db.insert(contactMessages).values({
      firstName: formData.firstName || "Unknown",
      lastName: formData.lastName || "User",
      email: formData.email || "no-email@example.com",
      company: formData.company || null,
      role: formData.role || null,
      message: formData.message || "No message provided",
      ipAddress: ipAddress || undefined,
      userAgent: userAgent || undefined,
    }).returning();

    const contactMessage = result[0];

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
    if (!db) {
      return res.status(500).json({
        status: "error",
        message: "Database not available"
      });
    }

    const messages = await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
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
    if (!db) {
      return res.status(500).json({
        status: "error",
        message: "Database not available"
      });
    }

    const result = await db.select().from(contactMessages).where(eq(contactMessages.id, req.params.id)).limit(1);
    const message = result[0];
    
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
    if (!db) {
      return res.status(500).json({
        status: "error",
        message: "Database not available"
      });
    }

    const { status } = req.body;
    if (!status || !['new', 'contacted', 'resolved'].includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid status. Must be one of: new, contacted, resolved"
      });
    }

    const result = await db
      .update(contactMessages)
      .set({ status, updatedAt: new Date() })
      .where(eq(contactMessages.id, req.params.id))
      .returning();
    
    const updatedMessage = result[0];
    
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

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  throw err;
});

// Serve static files in production (inlined from server/vite.ts)
function serveStatic(app: express.Express) {
  const distPath = path.resolve(process.cwd(), "dist/public");
  
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    
    // fall through to index.html if the file doesn't exist
    app.use("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  } else {
    // Fallback for when static files aren't found
    app.use("*", (_req, res) => {
      res.status(404).json({ message: "Static files not found" });
    });
  }
}

if (process.env.NODE_ENV === "production") {
  serveStatic(app);
}

// For Vercel serverless functions
export default app;
