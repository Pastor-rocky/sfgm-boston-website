# Required Reading Template - SFGM Boston

## Quick Guide to Adding Required Reading (Audiobook + Bible)

### What You Need:
1. **MP3 audio file** for the chapter
2. **PDF textbook file** for the chapter  
3. **Bible reading references** for the week

---

## Step 1: Extract PDF Text

```bash
node extract-pdf.cjs "path/to/Chapter-5.pdf"
```

This creates: `Chapter-5_extracted.txt`

---

## Step 2: Copy Audio File to Public Directory

```bash
cp "your-chapter-audio.mp3" "/Users/rocky/Desktop/BostonMinistry/public/fire-starter-ch5.mp3"
```

---

## Step 3: Create Audio Player Page

Create file: `client/src/pages/[coursename]-ch[X].tsx`

**Use the AUDIO-STYLING-REFERENCE.md** for complete styling guide!

**Minimal Example:**
```tsx
import React, { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export default function CoursenameCh5() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Audio Player Card */}
        <Card className="mb-8 bg-gradient-to-r from-orange-600 to-red-600">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <img src="/course-cover.jpg" alt="Cover" className="w-24 h-auto rounded shadow-lg" />
              <div>
                <h3 className="text-white text-2xl font-bold">
                  <span className="text-3xl mr-1">🔥</span> Course Title
                </h3>
                <p className="text-white/90 text-xl font-semibold">Chapter 5</p>
              </div>
            </div>
            
            {/* Audio Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button onClick={() => skip(-15)} size="sm" variant="ghost" className="text-white">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button onClick={togglePlayPause} size="lg" className="bg-white text-orange-600 rounded-full h-14 w-14">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button onClick={() => skip(15)} size="sm" variant="ghost" className="text-white">
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            
            <Slider
              value={[currentTime]}
              max={duration}
              onValueChange={([v]) => { if (audioRef.current) audioRef.current.currentTime = v; }}
              className="mb-2"
            />
            
            <audio
              ref={audioRef}
              src="/fire-starter-ch5.mp3"
              onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
              onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </CardContent>
        </Card>

        {/* Chapter Content Card */}
        <Card className="bg-white">
          <CardContent className="p-8">
            <div className="prose max-w-none">
              {/* Paste your extracted PDF text here */}
              {/* Format using sections from Beautiful Audio Player Template */}
              <h2 className="text-2xl font-bold mb-6 text-red-900">
                🔥 CHAPTER 5: YOUR TITLE
              </h2>
              <p className="mb-4">Your extracted content here...</p>
            </div>
          </CardContent>
        </Card>

        {/* Bible Reading Card */}
        <Card className="mt-8 bg-green-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Required Bible Reading</h3>
            <Button
              onClick={() => window.open('https://www.biblegateway.com/passage/?search=Luke+17-20&version=NLT', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              📖 Read Luke 17-20
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## Step 4: Add Route to App.tsx

```typescript
import CoursenameCh5 from './pages/coursename-ch5';

// In routes section:
<Route path="/coursename-ch5" component={CoursenameCh5} />
```

---

## Step 5: Add to Course Page

In `client/src/components/course-content-viewer.tsx`, add the week card:

```tsx
<Card>
  <CardContent className="py-8">
    <h3 className="text-2xl font-bold mb-6">Required Reading Week 5</h3>
    
    {/* Audiobook */}
    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <h4 className="text-lg font-semibold">Chapter 5 Title</h4>
      <Button
        onClick={() => setLocation('/coursename-ch5')}
        className="bg-blue-600 text-white mt-2"
      >
        🎶 Audiobook
      </Button>
    </div>
    
    {/* Bible Reading */}
    <div className="bg-green-50 p-4 rounded-lg">
      <h4 className="text-lg font-semibold">Luke 17-20</h4>
      <Button
        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Luke+17-20&version=NLT', '_blank')}
        className="bg-green-600 text-white mt-2"
      >
        📖 Bible Chapter
      </Button>
    </div>
  </CardContent>
</Card>
```

---

## Complete Checklist
- [ ] PDF extracted to `_extracted.txt`
- [ ] Audio file copied to `/public/`
- [ ] Audio player page created
- [ ] Content formatted (use Beautiful Template styling!)
- [ ] Route added to App.tsx
- [ ] Week card added to course page
- [ ] Bible reading link configured
- [ ] Page tested and working

**See AUDIO-STYLING-REFERENCE.md for detailed formatting!**

