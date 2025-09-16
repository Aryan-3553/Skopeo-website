import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

// Database schema
const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  company: text("company"),
  role: text("role"),
  message: text("message"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Validation schema
const insertContactMessageSchema = z.object({
  firstName: z.string().optional().default(""),
  lastName: z.string().optional().default(""),
  email: z.string().optional().default(""),
  company: z.string().optional(),
  role: z.string().optional(),
  message: z.string().optional().default(""),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

// Database connection
let db: any = null;
function getDb() {
  if (!db) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    const client = postgres(process.env.DATABASE_URL);
    db = drizzle(client);
  }
  return db;
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    // Validate the request body
    const validatedData = insertContactMessageSchema.parse(req.body);
    
    // Extract IP address and user agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    // Get database connection
    const database = getDb();
    
    // Create the contact message with additional metadata
    const result = await database.insert(contactMessages).values({
      ...validatedData,
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
    
    if (error instanceof Error && error.name === 'ZodError') {
      res.status(400).json({
        status: "error",
        message: "Invalid form data",
        errors: error.message
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Internal server error"
      });
    }
  }
});

// Get all contact messages (for admin use)
app.get("/api/contact", async (req, res) => {
  try {
    const database = getDb();
    const messages = await database.select().from(contactMessages).orderBy(contactMessages.createdAt);
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
