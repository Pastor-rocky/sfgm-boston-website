import { db } from "./server/db";
import { courses } from "./shared/schema";
import { sql } from "drizzle-orm";

async function reseedCourses() {
  try {
    console.log("🗑️  Deleting all enrollments...");
    
    // Delete all enrollments first (foreign key constraint)
    await db.execute(sql`DELETE FROM enrollments`);
    console.log("✅ All enrollments deleted");

    console.log("🗑️  Deleting all courses...");
    
    // Delete all existing courses
    await db.delete(courses);
    console.log("✅ All courses deleted");

    console.log("\n🌱 Seeding courses in correct order...");

    const coursesToInsert = [
      {
        name: "Acts in Action",
        description: "A comprehensive study through the Book of Acts, examining the birth and growth of the early church.",
        duration: 10,
        isActive: true,
        category: "Bible Study",
        difficulty: "Intermediate",
      },
      {
        name: "Becoming a Firestarter",
        description: "Learn how to ignite and maintain your spiritual fire for God.",
        duration: 10,
        isActive: true,
        category: "Spiritual Growth",
        difficulty: "Intermediate",
      },
      {
        name: "Don't Be a Jonah",
        description: "Bishop Anthony Lee's sixth book is filled with compassion and urgency to encourage all those who are running from the call that God has for their life.",
        duration: 10,
        isActive: true,
        category: "Bible Study",
        difficulty: "Intermediate",
      },
      {
        name: "G.R.O.W Beginner Course",
        description: "Welcome orientation and practice course for new Bible school students. Learn how the platform works while exploring G.R.O.W ministry principles: Give, Read, Obey, Win Souls.",
        duration: 4,
        isActive: true,
        category: "Foundation",
        difficulty: "Beginner",
      },
      {
        name: "Studying for Service",
        description: "A course designed to prepare believers for effective ministry and service.",
        duration: 12,
        isActive: true,
        category: "Ministry Training",
        difficulty: "Advanced",
      },
      {
        name: "Deaconship Course: Answering the Call",
        description: "A comprehensive 5-week course on deaconship ministry and service.",
        duration: 5,
        isActive: true,
        category: "Ministry Leadership",
        difficulty: "Intermediate",
      },
      {
        name: "Level Up Leadership",
        description: "Develop your leadership skills and reach new levels of effectiveness in ministry.",
        duration: 6,
        isActive: true,
        category: "Leadership",
        difficulty: "Intermediate",
      },
      {
        name: "Youth Ministry Course",
        description: "Learn how to effectively minister to and reach young people for Christ.",
        duration: 5,
        isActive: true,
        category: "Ministry Training",
        difficulty: "Intermediate",
      },
    ];

    for (const course of coursesToInsert) {
      await db.insert(courses).values(course);
      console.log(`✅ Added course: ${course.name}`);
    }

    console.log("\n🎉 Course reseeding complete!");
    console.log("\n📋 Course order (by ID):");
    console.log("  1: Acts in Action");
    console.log("  2: Becoming a Firestarter");
    console.log("  3: Don't Be a Jonah");
    console.log("  4: G.R.O.W Beginner Course");
    console.log("  5: Studying for Service");
    console.log("  6: Deaconship Course");
    console.log("  7: Level Up Leadership");
    console.log("  8: Youth Ministry Course");

  } catch (error) {
    console.error("❌ Error reseeding courses:", error);
    throw error;
  }
}

reseedCourses()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
