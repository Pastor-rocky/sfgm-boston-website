# Audio Template - SFGM Boston

## Complete Audio Player Page Creation Guide

**For detailed styling and formatting, always reference:**
**`AUDIO-STYLING-REFERENCE.md`**

This template focuses on the technical setup. The Beautiful Audio Player Template has all the styling details!

---

## Quick Setup (5 Steps)

### 1. Copy Audio File
```bash
cp "your-audio.mp3" "/Users/rocky/Desktop/BostonMinistry/public/coursename-ch5.mp3"
```

### 2. Extract PDF Text
```bash
node extract-pdf.cjs "path/to/Chapter-5.pdf"
```

### 3. Create Page File
File: `client/src/pages/coursename-ch5.tsx`

**Essential Code Structure:**
```tsx
import React, { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function CoursenameCh5() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime += seconds;
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* AUDIO PLAYER CARD - See Beautiful Template for exact styling */}
        <Card className="mb-8 bg-gradient-to-r from-orange-600 to-red-600">
          <CardContent className="p-6">
            {/* Cover & Title */}
            <div className="flex items-start gap-4 mb-6">
              <img src="/cover.jpg" alt="Cover" className="w-24 h-auto rounded shadow-lg" />
              <div>
                <h3 className="text-white text-2xl font-bold">
                  <span className="text-3xl mr-1">🔥</span> Course Title
                </h3>
                <p className="text-white/90 text-xl">Chapter 5</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <Slider
              value={[currentTime]}
              max={duration}
              onValueChange={([v]) => { if (audioRef.current) audioRef.current.currentTime = v; }}
              className="mb-2"
            />
            <div className="flex justify-between text-white/70 text-sm mb-4">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button onClick={() => skip(-15)} size="sm" variant="ghost" className="text-white">
                <SkipBack className="h-5 w-5" />
                <span className="ml-1 text-xs">15</span>
              </Button>
              <Button onClick={togglePlayPause} size="lg" className="bg-white text-orange-600 rounded-full h-14 w-14">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button onClick={() => skip(15)} size="sm" variant="ghost" className="text-white">
                <span className="mr-1 text-xs">15</span>
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Volume */}
            <div className="flex items-center gap-3 justify-center">
              <Volume2 className="h-4 w-4 text-white" />
              <Slider
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={([v]) => {
                  setVolume(v);
                  if (audioRef.current) audioRef.current.volume = v;
                }}
                className="w-24"
              />
            </div>
            
            <audio
              ref={audioRef}
              src="/coursename-ch5.mp3"
              onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
              onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </CardContent>
        </Card>

        {/* CONTENT CARD - Paste extracted PDF text here */}
        <Card className="bg-white">
          <CardContent className="p-8">
            <div className="prose max-w-none">
              {/* See AUDIO-STYLING-REFERENCE.md for formatting */}
              {/* Your extracted and formatted content */}
            </div>
          </CardContent>
        </Card>

        {/* BIBLE READING CARD */}
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

## Step 4: Add Route

In `client/src/App.tsx`:
```typescript
import CoursenameCh5 from './pages/coursename-ch5';

<Route path="/coursename-ch5" component={CoursenameCh5} />
```

---

## Step 5: Add to Course Page

In `client/src/components/course-content-viewer.tsx`:

```tsx
<Card>
  <CardContent className="py-8">
    <h3 className="text-2xl font-bold mb-6">Required Reading Week 5</h3>
    
    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <h4 className="text-lg font-semibold">Chapter 5 Title</h4>
      <Button
        onClick={() => setLocation('/coursename-ch5')}
        className="bg-blue-600 text-white mt-2"
      >
        🎶 Audiobook
      </Button>
    </div>
    
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
- [ ] Audio file copied to `/public/`
- [ ] PDF extracted with `extract-pdf.cjs`
- [ ] Page created with audio player
- [ ] Content formatted (see Beautiful Template!)
- [ ] Route added to App.tsx
- [ ] Week card added to course page
- [ ] Bible link configured (Bible Gateway NLT)
- [ ] Tested audio playback
- [ ] Tested all buttons

**Critical: Use BEAUTIFUL-AUDIO-PLAYER-TEMPLATE-DOCUMENTATION.md for all styling details!**

