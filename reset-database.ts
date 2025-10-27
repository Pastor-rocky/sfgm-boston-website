import { db } from "./server/db";
import { sql } from "drizzle-orm";

async function resetDatabase() {
  try {
    console.log("🗑️  Resetting database...");
    
    // Drop all tables
    await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE`);
    await db.execute(sql`CREATE SCHEMA public`);
    
    console.log("✅ Database reset complete!");
    console.log("\nNow run: npm run db:push");
    
  } catch (error) {
    console.error("❌ Error resetting database:", error);
    throw error;
  }
}

resetDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
