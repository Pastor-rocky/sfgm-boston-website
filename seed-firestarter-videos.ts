import { db } from "./server/db.js";
import { courseVideos } from "./shared/schema.js";

async function seedFirestarterVideos() {
  try {
    console.log('🎥 Seeding Fire Starter course videos...\n');

    const videos = [
      {
        courseId: 2, // Becoming a Firestarter
        title: "Fire Starter Week 1",
        description: "Week 1 lesson for Becoming a Firestarter course",
        url: "https://www.youtube.com/watch?v=placeholder1",
        orderIndex: 1,
        duration: null,
        isDeleted: false
      },
      {
        courseId: 2,
        title: "Fire Starter Week 2",
        description: "Week 2 lesson for Becoming a Firestarter course",
        url: "https://www.youtube.com/watch?v=placeholder2",
        orderIndex: 2,
        duration: null,
        isDeleted: false
      },
      {
        courseId: 2,
        title: "Fire Starter Week 3",
        description: "Week 3 lesson for Becoming a Firestarter course",
        url: "https://www.youtube.com/watch?v=placeholder3",
        orderIndex: 3,
        duration: null,
        isDeleted: false
      },
      {
        courseId: 2,
        title: "Fire Starter Week 4",
        description: "Week 4 lesson for Becoming a Firestarter course",
        url: "https://www.youtube.com/watch?v=placeholder4",
        orderIndex: 4,
        duration: null,
        isDeleted: false
      },
      {
        courseId: 2,
        title: "Fire Starter Week 5",
        description: "Week 5 lesson for Becoming a Firestarter course",
        url: "https://www.youtube.com/watch?v=placeholder5",
        orderIndex: 5,
        duration: null,
        isDeleted: false
      }
    ];

    for (const video of videos) {
      await db.insert(courseVideos).values(video);
      console.log(`✅ Added video: ${video.title}`);
    }

    console.log('\n🎉 Fire Starter videos seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding videos:', error);
    throw error;
  }
}

seedFirestarterVideos()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
