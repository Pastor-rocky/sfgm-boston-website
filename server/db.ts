import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "../shared/schema";

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not set. Database functionality will be limited.");
  // For now, we'll handle this gracefully in production
}

// Configure pool with better connection settings and error handling
export const pool = process.env.DATABASE_URL ? new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 5, // Limit concurrent connections
  idleTimeoutMillis: 30000, // 30 seconds
  connectionTimeoutMillis: 10000, // 10 seconds
}) : null;

// Add connection error handling
if (pool) {
  pool.on('error', (err) => {
    console.error('Database pool error:', err);
  });
}

export const db = pool ? drizzle({ client: pool, schema }) : null;