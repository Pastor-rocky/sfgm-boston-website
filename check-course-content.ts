import { db } from "./server/db";
import { courseVideos, quizzes } from "./shared/schema";
import { eq } from "drizzle-orm";

async function checkCourseContent() {
  try {
    const videos = await db.select().from(courseVideos).where(eq(courseVideos.courseId, 1));
    const quizzesForCourse = await db.select().from(quizzes).where(eq(quizzes.courseId, 1));
    
    console.log(`\nCourse 1 (Acts in Action) Content:`);
    console.log(`  Videos: ${videos.length}`);
    console.log(`  Quizzes: ${quizzesForCourse.length}`);
    
    if (videos.length === 0) {
      console.log("\n❌ No videos in database for course 1");
    }
    
    if (quizzesForCourse.length === 0) {
      console.log("❌ No quizzes in database for course 1");
    }
    
    console.log("\n✅ Course readings are handled by hardcoded content in server/storage.ts");
    console.log("   (Acts audio player chapters)");
    
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
}

checkCourseContent()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
