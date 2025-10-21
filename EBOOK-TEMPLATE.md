# E-BOOK TEMPLATE - Complete Multi-Chapter E-Book Creation Guide

## Overview
This template guides you through creating a complete e-book page that combines multiple chapters into a single, navigable page with an integrated audio player and chapter dropdown. This is used for textbooks like "Becoming a Fire Starter" and "Don't Be a Jonah".

---

## ✅ COMPLETED EXAMPLES
- **Becoming a Fire Starter** - `/becoming-a-firestarter-complete-ebook` (10 chapters)
- **Don't Be a Jonah** - `/dont-be-a-jonah-complete-book` (11 chapters)

---

## 📋 REQUIREMENTS

### Files Needed:
1. **Audio Files**: MP3 files for each chapter (stored in `/public/uploads/textbook-audio/`)
2. **PDF File**: Complete textbook PDF (stored in `/public/pdfs/`)
3. **Content**: Text content from individual chapter pages
4. **Cover Image**: Book cover or logo image

---

## 🔧 STEP-BY-STEP IMPLEMENTATION

### STEP 1: Create the E-Book Component File

**Location**: `client/src/pages/[course-name]-complete-ebook.tsx`

**Example**: `client/src/pages/becoming-a-firestarter-complete-ebook.tsx`

#### 1.1 Import Required Dependencies

```typescript
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2, Download } from "lucide-react";
import {
  Paragraph,
  BlueSection,
  GreenSection,
  PurpleSection,
  RedSection,
  YellowSection,
  OrangeSection,
  BulletList,
  InfoBox,
  WarningBox,
  CenterText,
} from "@/components/audio-player-text-template";
```

#### 1.2 Set Up Component Structure

```typescript
export default function [CourseName]CompleteEbook() {
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  // PDF Download Function
  const downloadPDF = () => {
    window.open('/pdfs/[Your-PDF-File-Name].pdf', '_blank');
  };

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);

  // Chapter Configuration
  const chapters = [
    { id: 1, title: "Chapter 1: [Title]", audioUrl: "/uploads/textbook-audio/[audio-file-1].mp3" },
    { id: 2, title: "Chapter 2: [Title]", audioUrl: "/uploads/textbook-audio/[audio-file-2].mp3" },
    // ... add all chapters
  ];
```

#### 1.3 Audio Player Functions

```typescript
  const currentChapterData = chapters[currentChapter - 1];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.src = currentChapterData.audioUrl;
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }
  }, [volume, currentChapter]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSkip = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(Math.max(0, audio.currentTime + delta), duration || audio.duration || 0);
    audio.currentTime = next;
    setCurrentTime(next);
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handleChapterChange = (chapterId: string) => {
    setCurrentChapter(parseInt(chapterId));
  };
```

#### 1.4 Chapter Content Function

**CRITICAL**: This is where you add all the chapter content. Each chapter's content should be copied from its individual chapter page.

```typescript
  const getChapterContent = (chapterId: number) => {
    switch (chapterId) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Copy content from chapter 1 page here */}
            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">Chapter 1 Title</h2>
              <Paragraph>
                Chapter 1 content...
              </Paragraph>
            </BlueSection>
            {/* ... rest of chapter 1 content ... */}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            {/* Copy content from chapter 2 page here */}
          </div>
        );
      
      // ... add all chapters (case 3, 4, 5, etc.)
      
      default:
        return <div>Select a chapter to begin reading</div>;
    }
  };
```

#### 1.5 JSX Render Structure

```typescript
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Button onClick={() => setLocation("/textbook-catalog")} variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to catalog
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <img 
                src="/src/assets/sfgm-shield.png" 
                alt="SFGM Logo" 
                className="h-8 w-8"
              />
              <h1 className="text-xl font-bold text-white">[Book Title]</h1>
              <Button onClick={downloadPDF} variant="ghost" className="text-white hover:bg-white/10">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Audio Player */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 border-purple-400/30 shadow-xl backdrop-blur-sm">
                <CardContent className="p-6">
                  {/* Cover Image */}
                  <div className="mb-6 flex justify-center">
                    <img 
                      src="/src/assets/sfgm-shield.png" 
                      alt="Book Cover" 
                      className="w-24 h-24 object-contain rounded-lg"
                    />
                  </div>

                  {/* Audio Element */}
                  <audio
                    ref={audioRef}
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                    onEnded={() => setIsPlaying(false)}
                  />

                  {/* Chapter Selector */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-purple-200 mb-2 block">
                      Select Chapter
                    </label>
                    <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
                      <SelectTrigger className="bg-purple-800/50 border-purple-400/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-purple-900 border-purple-400/30">
                        {chapters.map((chapter) => (
                          <SelectItem 
                            key={chapter.id} 
                            value={chapter.id.toString()}
                            className="text-white hover:bg-purple-800/50"
                          >
                            {chapter.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Currently Playing */}
                  <div className="text-center mb-4">
                    <h3 className="text-white font-semibold text-sm">
                      {currentChapterData.title}
                    </h3>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <Slider
                      value={[currentTime]}
                      max={duration || 100}
                      step={1}
                      onValueChange={([value]) => {
                        if (audioRef.current) {
                          audioRef.current.currentTime = value;
                          setCurrentTime(value);
                        }
                      }}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-purple-200">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSkip(-10)}
                      className="text-white hover:bg-white/10"
                    >
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={handlePlayPause}
                      className="bg-white text-purple-900 hover:bg-purple-100 h-12 w-12"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSkip(10)}
                      className="text-white hover:bg-white/10"
                    >
                      <SkipForward className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-3">
                    <Volume2 className="h-4 w-4 text-purple-200" />
                    <Slider
                      value={[volume * 100]}
                      max={100}
                      step={1}
                      onValueChange={([value]) => setVolume(value / 100)}
                      className="flex-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Chapter Content */}
          <div className="lg:col-span-2">
            <Card className="bg-white/95 backdrop-blur-sm border-purple-400/30 shadow-xl">
              <CardContent className="p-8">
                {getChapterContent(currentChapter)}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### STEP 2: Add Route to App.tsx

**File**: `client/src/App.tsx`

```typescript
// Import the component
import [CourseName]CompleteEbook from "@/pages/[course-name]-complete-ebook";

// Add the route
<Route path="/[course-name]-complete-ebook" component={[CourseName]CompleteEbook} />
```

**Example**:
```typescript
import BecomingAFireStarterCompleteEbook from "@/pages/becoming-a-firestarter-complete-ebook";

<Route path="/becoming-a-firestarter-complete-ebook" component={BecomingAFireStarterCompleteEbook} />
```

---

### STEP 3: Update Textbook Catalog Navigation

**File**: `client/src/pages/textbook-catalog.tsx`

Update the `handleReadTextbook` function to navigate to the complete e-book:

```typescript
const handleReadTextbook = (textbook: Textbook) => {
  // For your specific course, navigate to the complete e-book
  if (textbook.courseId === [YOUR_COURSE_ID]) {
    setLocation('/[course-name]-complete-ebook');
    return;
  }
  
  // ... existing code for other courses
};
```

Update the "Read E-Book" button click handler:

```typescript
<Button 
  onClick={() => {
    if (textbook.courseId === [YOUR_COURSE_ID]) {
      setLocation('/[course-name]-complete-ebook');
    } else if (textbook.courseId === 3) {
      setLocation('/dont-be-a-jonah-complete-book');
    }
    // ... other conditions
  }}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-7 text-xs"
  size="sm"
>
  <FaBookOpen className="mr-1" />
  Read E-Book
</Button>
```

Update the "Add to Library" button to also navigate:

```typescript
// After adding to library, navigate to the e-book
if (textbook.courseId === [YOUR_COURSE_ID]) {
  setLocation('/[course-name]-complete-ebook');
}
```

---

### STEP 4: Update Personal Library Navigation

**File**: `client/src/pages/my-personal-library.tsx`

#### 4.1 Update `handleBookClick` Function

```typescript
const handleBookClick = (book: any) => {
  if (book.type === 'textbook') {
    // Special handling for your course
    if (book.title === '[Your Book Title]') {
      window.location.href = '/[course-name]-complete-ebook';
      return;
    }
    // Special handling for Don't Be a Jonah
    if (book.title === "Don't Be A Jonah") {
      window.location.href = '/dont-be-a-jonah-complete-book';
      return;
    }
    // Special handling for Becoming a Fire Starter
    if (book.title === 'Becoming a Fire Starter') {
      window.location.href = '/becoming-a-firestarter-complete-ebook';
      return;
    }
    // Open textbook reader for other books
    window.location.href = `/complete-book-reader?courseId=${book.courseId}`;
  }
  // ... rest of function
};
```

#### 4.2 Update Card View "Read Book" Button

```typescript
<Button
  size="sm"
  className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white"
  onClick={() => {
    const title = book.bookTitle || book.title;
    // Special handling for your course
    if (title === '[Your Book Title]') {
      window.location.href = '/[course-name]-complete-ebook';
    } else if (title === 'Becoming a Fire Starter') {
      window.location.href = '/becoming-a-firestarter-complete-ebook';
    } else if (title === "Don't Be A Jonah") {
      window.location.href = '/dont-be-a-jonah-complete-book';
    } else {
      window.location.href = `/complete-book-reader?courseId=${getTextbookCourseId(title)}`;
    }
  }}
>
  <i className="fas fa-book-open mr-2"></i>
  Read Book
</Button>
```

---

## 📝 CONTENT MIGRATION GUIDE

### How to Copy Chapter Content

1. **Open Individual Chapter Page** (e.g., `becoming-a-firestarter-ch1.tsx`)
2. **Find the Content Section** - Look for the main content area inside the `return` statement
3. **Copy Everything Inside the Card/Content Area** - Usually after the audio player card
4. **Paste into `getChapterContent` Switch Case** - Add to the appropriate case number
5. **Wrap in `<div className="space-y-6">`** - Ensure proper spacing

### Content Components Available

Use these components from `@/components/audio-player-text-template`:

- **`<Paragraph>`** - Standard text paragraph
- **`<BlueSection>`** - Blue colored section
- **`<GreenSection>`** - Green colored section
- **`<PurpleSection>`** - Purple colored section
- **`<RedSection>`** - Red colored section
- **`<YellowSection>`** - Yellow colored section
- **`<OrangeSection>`** - Orange colored section
- **`<BulletList>`** - Bulleted list
- **`<InfoBox>`** - Information/tip box
- **`<WarningBox>`** - Warning/caution box
- **`<CenterText>`** - Centered text

### Scripture Blockquotes

For scripture references, use:

```typescript
<blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4">
  <strong>Scripture Reference:</strong> "Scripture text here..."
</blockquote>
```

---

## 🎨 STYLING CONSISTENCY

### Audio Player Card
- Background: `bg-gradient-to-br from-purple-900/90 to-blue-900/90`
- Border: `border-purple-400/30`
- Padding: `p-6`

### Cover Image
- Size: `w-24 h-24`
- Classes: `object-contain rounded-lg`

### Content Card
- Background: `bg-white/95 backdrop-blur-sm`
- Border: `border-purple-400/30`
- Padding: `p-8`

### Header
- Background: `bg-gradient-to-r from-purple-900 to-blue-900`
- Text: `text-white`
- Buttons: `variant="ghost" className="text-white hover:bg-white/10"`

---

## 🔊 AUDIO FILE SETUP

### Audio File Location
Store all chapter audio files in: `/public/uploads/textbook-audio/`

### Naming Convention
Use descriptive, lowercase names with hyphens:
- `fire-starter-cp1.mp3`
- `dont-be-a-jonah-ch1.mp3`
- `[course-name]-chapter-1.mp3`

### File Format
- Format: MP3
- Quality: 128kbps or higher recommended
- Mono or Stereo: Either works

---

## 📄 PDF SETUP

### PDF File Location
Store the complete textbook PDF in: `/public/pdfs/`

### Naming Convention
Use URL-encoded names for spaces:
- `Becoming%20A%20Fire%20Starter.pdf`
- `Dont%20Be%20A%20Jonah%20Book.pdf`

### Download Button Configuration
```typescript
const downloadPDF = () => {
  window.open('/pdfs/[Your-PDF-File-Name].pdf', '_blank');
};
```

---

## ✅ TESTING CHECKLIST

After creating your e-book, test the following:

### Navigation
- [ ] Link from textbook catalog works
- [ ] Link from personal library works (both bookshelf and card view)
- [ ] "Back to catalog" button works
- [ ] "Download PDF" button works and opens correct PDF

### Audio Player
- [ ] All chapter audio files load correctly
- [ ] Play/Pause button works
- [ ] Skip forward/backward (10 seconds) works
- [ ] Volume slider works
- [ ] Progress bar updates correctly
- [ ] Progress bar seeking works
- [ ] Chapter dropdown displays all chapters
- [ ] Changing chapters loads new audio

### Content Display
- [ ] All chapters display content correctly
- [ ] Colored sections render properly
- [ ] Scripture blockquotes are formatted
- [ ] InfoBoxes and WarningBoxes display
- [ ] BulletLists are properly formatted
- [ ] Images load if included
- [ ] Text is readable and properly spaced

### Responsive Design
- [ ] Works on desktop (large screens)
- [ ] Works on tablet (medium screens)
- [ ] Audio player is sticky on desktop
- [ ] Layout stacks properly on mobile

---

## 🚀 QUICK START CHECKLIST

For a new e-book, complete these steps in order:

1. [ ] Gather all chapter MP3 files
2. [ ] Copy MP3 files to `/public/uploads/textbook-audio/`
3. [ ] Copy complete PDF to `/public/pdfs/`
4. [ ] Create new component file: `client/src/pages/[course-name]-complete-ebook.tsx`
5. [ ] Copy template structure from this guide
6. [ ] Update chapter configuration array with titles and audio URLs
7. [ ] Update PDF download path in `downloadPDF` function
8. [ ] Copy content from individual chapter pages into `getChapterContent` switch cases
9. [ ] Add route to `client/src/App.tsx`
10. [ ] Update `textbook-catalog.tsx` navigation
11. [ ] Update `my-personal-library.tsx` navigation
12. [ ] Test all functionality using the testing checklist

---

## 📚 EXAMPLES

### Becoming a Fire Starter
- **File**: `client/src/pages/becoming-a-firestarter-complete-ebook.tsx`
- **Route**: `/becoming-a-firestarter-complete-ebook`
- **Chapters**: 10
- **PDF**: `/pdfs/Becoming%20A%20Fire%20Starter.pdf`

### Don't Be a Jonah
- **File**: `client/src/pages/dont-be-a-jonah-complete-book.tsx`
- **Route**: `/dont-be-a-jonah-complete-book`
- **Chapters**: 11
- **PDF**: `/pdfs/Dont%20Be%20A%20Jonah%20Book.pdf`

---

## 🛠️ TROUBLESHOOTING

### Audio Not Playing
- Check audio file path is correct
- Verify file exists in `/public/uploads/textbook-audio/`
- Check browser console for 404 errors
- Verify file format is MP3

### PDF Download Not Working
- Verify PDF exists in `/public/pdfs/`
- Check URL encoding for spaces (use `%20`)
- Check browser console for errors

### Content Not Displaying
- Verify all imported components are from `@/components/audio-player-text-template`
- Check for missing closing tags
- Verify switch case numbers match chapter IDs

### Navigation Not Working
- Verify route is added to `App.tsx`
- Check import statement in `App.tsx`
- Verify exact path matches in all navigation calls
- Check for typos in file names

---

## 📖 RELATED TEMPLATES

- **AUDIO-TEMPLATE.md** - For individual chapter audio pages
- **AUDIO-STYLING-REFERENCE.md** - Detailed styling guide
- **COURSE-CREATION-GUIDE.md** - Master index of all templates

---

## 🎯 BEST PRACTICES

1. **Keep Original Content** - Don't make text generic or artificial
2. **Test Chapter by Chapter** - Add one chapter at a time and test
3. **Consistent Naming** - Use consistent naming conventions for files and routes
4. **URL Encoding** - Always use URL encoding for file paths with special characters
5. **Component Reuse** - Use the pre-built components for consistency
6. **Sticky Player** - Keep audio player sticky on desktop for better UX
7. **Responsive Testing** - Test on multiple screen sizes
8. **Audio Quality** - Use good quality audio files for better user experience

---

**Template Version**: 1.0  
**Last Updated**: Current Session  
**Created For**: SFGM Boston Bible School

