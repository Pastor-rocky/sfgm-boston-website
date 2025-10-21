import { db } from './server/db';
import { courseVideos } from './shared/schema';

async function insertDBAJVideos() {
  try {
    console.log('Inserting Don\'t Be a Jonah videos...');

    const videos = [
      {
        courseId: 3,
        title: "Don't Be a Jonah - Week 1",
        url: "https://www.youtube.com/watch?v=kK_nCld8Jow",
        description: "Week 1 lesson for Don't Be a Jonah course",
        orderIndex: 1,
        duration: null,
      },
      {
        courseId: 3,
        title: "Don't Be a Jonah - Week 2",
        url: "https://www.youtube.com/watch?v=ylrBLbgDVB8",
        description: "Week 2 lesson for Don't Be a Jonah course",
        orderIndex: 2,
        duration: null,
      },
      {
        courseId: 3,
        title: "Don't Be a Jonah - Week 3",
        url: "https://www.youtube.com/watch?v=ugYvrQZmMqk",
        description: "Week 3 lesson for Don't Be a Jonah course",
        orderIndex: 3,
        duration: null,
      },
      {
        courseId: 3,
        title: "Don't Be a Jonah - Week 4",
        url: "https://www.youtube.com/watch?v=FXl-JGzu9Do",
        description: "Week 4 lesson for Don't Be a Jonah course",
        orderIndex: 4,
        duration: null,
      },
      {
        courseId: 3,
        title: "Don't Be a Jonah - Week 5",
        url: "https://www.youtube.com/watch?v=UiT0T8YRJB0",
        description: "Week 5 lesson for Don't Be a Jonah course",
        orderIndex: 5,
        duration: null,
      },
    ];

    for (const video of videos) {
      await db.insert(courseVideos).values(video);
      console.log(`Inserted: ${video.title}`);
    }

    console.log('All videos inserted successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('Error inserting videos:', error?.message || error);
    process.exit(1);
  }
}

insertDBAJVideos();














