// Vercel serverless function entry point
import { db } from "../server/db";
import { setupRoutes } from "../server/routes";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup routes
setupRoutes(app);

// Export as Vercel serverless function
export default async (req: Request, res: Response) => {
  // Handle all requests through Express app
  return app(req, res);
};
