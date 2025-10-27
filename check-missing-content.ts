import { db } from "./server/db.js";
import { courseVideos, quizzes } from "./shared/schema.js";
import { eq, like, or } from "drizzle-orm";

async function checkMissingContent() {
  try {
    console.log("🔍 Checking for missing content for Course 1 (Acts in Action)...\n");

    // Check videos
    console.log("📹 Checking videos...");
    const videos = await db
      .select()
      .from(courseVideos)
      .where(eq(courseVideos.courseId, 1));
    
    console.log(`   Found ${videos.length} videos for course 1`);
    if (videos.length === 0) {
      console.log("   ⚠️  NO VIDEOS FOUND - This is expected based on the code (line 755 in server/storage.ts)");
    }

    // Check quizzes
    console.log("\n📝 Checking quizzes...");
    const actsQuizzes = await db
      .select()
      .from(quizzes)
      .where(
        or(
          like(quizzes.title, "%Acts in Action%"),
          like(quizzes.title, "%Acts Week%")
        )
      );
    
    console.log(`   Found ${actsQuizzes.length} quizzes matching 'Acts in Action' or 'Acts Week'`);
    if (actsQuizzes.length > 0) {
      console.log("\n   Quiz titles:");
      actsQuizzes.forEach(q => {
        console.log(`   - ID: ${q.id}, Title: ${q.title}`);
      });
    } else {
      console.log("   ⚠️  NO QUIZZES FOUND - Need to create quizzes with titles containing 'Acts in Action' or 'Acts Week'");
    }

    console.log("\n✅ Check complete!");
    console.log("\n📋 SUMMARY:");
    console.log("   - Videos: Expected to be 0 (Acts in Action doesn't have videos)");
    console.log("   - Quizzes: Need to be created in the database");

  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
}

checkMissingContent()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
