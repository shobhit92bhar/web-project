import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Headers endpoint to display incoming request headers and device information
  app.get("/api/headers", (req, res) => {
    try {
      // Extract all headers from the request
      const headers = req.headers;
      
      // Convert headers to a clean object format
      const cleanHeaders: Record<string, string> = {};
      
      for (const [key, value] of Object.entries(headers)) {
        // Handle arrays by joining them with commas
        if (Array.isArray(value)) {
          cleanHeaders[key] = value.join(", ");
        } else if (value) {
          cleanHeaders[key] = value;
        }
      }

      // Extract device information from user-agent
      const userAgent = req.headers['user-agent'] || '';
      const deviceInfo = {
        userAgent,
        ip: req.ip || req.connection.remoteAddress || 'Unknown',
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpVersion: req.httpVersion,
        timestamp: new Date().toISOString()
      };

      // Response headers that would be sent back
      const responseHeaders = {
        'content-type': 'application/json',
        'x-powered-by': 'Express',
        'access-control-allow-origin': '*',
        'date': new Date().toUTCString(),
        'connection': 'keep-alive',
        'server': 'nginx/1.18.0 (Ubuntu)'
      };
      
      res.json({
        requestHeaders: cleanHeaders,
        deviceInfo,
        responseHeaders
      });
    } catch (error) {
      console.error("Error fetching headers:", error);
      res.status(500).json({ error: "Failed to fetch headers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
