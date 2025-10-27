import { db } from "./server/db";
import { courses } from "./shared/schema";
import { asc } from "drizzle-orm";

async function verifyCourses() {
  try {
    const courseList = await db.select().from(courses).orderBy(asc(courses.id));
    console.log("\nCurrent courses in database:");
    if (courseList.length === 0) {
      console.log("❌ NO COURSES FOUND IN DATABASE!");
      console.log("\nThe database is empty. You need to run:");
      console.log("npx tsx reseed-courses.ts");
    } else {
      courseList.forEach(c => console.log(`✅ ID: ${c.id}, Name: ${c.name}`));
      console.log(`\n✅ Total: ${courseList.length} courses`);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
}

verifyCourses()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
