import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

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
