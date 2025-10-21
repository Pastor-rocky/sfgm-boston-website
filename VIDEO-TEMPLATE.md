# Video Template - SFGM Boston

## Quick Guide to Adding Videos to Courses

### Step 1: Prepare Your Video
- Upload video to YouTube
- Get the full URL (e.g., `https://www.youtube.com/watch?v=kK_nCld8Jow`)

### Step 2: Add Video to Database

**Option A: Direct Database Script**
Create file: `add-video-[coursename].ts`

```typescript
import { db } from './server/db';
import { courseVideos } from './shared/schema';

async function addVideo() {
  await db.insert(courseVideos).values({
    courseId: 1, // Your course ID
    title: 'Course Name - Week 1',
    description: 'Introduction to the course',
    videoUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
    duration: 45, // Minutes
    orderIndex: 1, // Week number
    isPublished: true,
  });
  
  console.log('Video added successfully!');
  process.exit(0);
}

addVideo();
```

**Run it:**
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/boston_ministry" npx tsx add-video-[coursename].ts
```

### Step 3: Video Display

Videos automatically appear on the course page at `http://localhost:56000/course/[courseId]` in the "Videos" tab.

**The system handles:**
- ✅ YouTube embedding
- ✅ Progress tracking
- ✅ Week-based access control
- ✅ Completion status

### Custom Video Schedules

If your course has videos only on certain weeks (like weeks 1, 3, 5, 7, 9), update `course-content-viewer.tsx`:

```typescript
{courseId === X ? (
  // Custom schedule
  <div className="space-y-4">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(weekNumber => {
      const hasVideo = [1, 3, 5, 7, 9].includes(weekNumber); // Your custom weeks
      // ... video card logic
    })}
  </div>
) : (
  // Default: shows all videos from database
)}
```

### Complete Setup Checklist
- [ ] Video uploaded to YouTube
- [ ] Video URL obtained
- [ ] Database script created
- [ ] Script executed successfully
- [ ] Video appears on course page
- [ ] Video plays correctly
- [ ] Progress tracking works
- [ ] Cleanup: Delete add-video script

**That's it! Videos are ready.**

