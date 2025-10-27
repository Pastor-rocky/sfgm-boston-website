import { db } from "./server/db.js";
import { courses } from "./shared/schema.js";

async function checkCourseIds() {
  const allCourses = await db.select().from(courses).orderBy(courses.id);
  console.log('\n📋 Current Course IDs in Database:');
  allCourses.forEach(c => console.log(`  ID ${c.id}: ${c.name}`));
}

checkCourseIds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
