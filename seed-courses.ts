import { db } from "./server/db";
import { courses } from "./shared/schema";

async function seedCourses() {
  try {
    console.log("🌱 Seeding courses database...");

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
    ];

    for (const course of coursesToInsert) {
      await db.insert(courses).values(course).onConflictDoNothing();
      console.log(`✅ Added course: ${course.name}`);
    }

    console.log("\n🎉 Course seeding complete!");
    
  } catch (error) {
    console.error("❌ Error seeding courses:", error);
    throw error;
  }
}

seedCourses()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
