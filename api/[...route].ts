// Vercel serverless function - catch-all API routes
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from "../server/db";
import { setupRoutes } from "../server/routes";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup all routes
const server = setupRoutes(app);

// Export as Vercel serverless function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Return a promise that resolves when the response is sent
  return new Promise<void>((resolve) => {
    // Convert Vercel request/response to Express
    const expressReq = req as any;
    const expressRes = res as any;
    
    // Handle the request through Express
    app(req as any, res as any, () => {
      // Response has been sent
      resolve();
    });
  });
}
