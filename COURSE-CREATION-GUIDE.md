# 📚 SFGM Boston - Complete Course Creation Guide

## 🚀 NEW: Automatic Course Creator

**Create entire courses in 15 minutes instead of 3 days!**

### 🎯 START HERE → `START-HERE-AUTOMATION.md`

The automation system creates:
- ✅ All chapter pages with beautiful audio players
- ✅ Complete e-book with seamless chapter selector
- ✅ All quiz database scripts
- ✅ All routes and navigation
- ✅ Progress tracking configuration
- ✅ Consistent naming throughout
- ✅ Original content preservation

### Quick Start Options:

**Option 1: Run Python Script**
```bash
python3 auto-create-course.py
```

**Option 2: Tell the AI**
```
"Create a new course called [Name] with [X] chapters"
```

### Documentation:
- 📍 **START-HERE-AUTOMATION.md** - Decision tree & quick start
- ⚡ **QUICK-START-AUTO-COURSE.md** - 5-minute guide
- 📖 **AUTO-COURSE-CREATOR.md** - Complete reference
- 🤖 **AI-INSTRUCTIONS-AUTO-COURSE.md** - For AI assistant
- 📊 **README-AUTOMATION.md** - Overview & comparison
- 📋 **AUTOMATION-SYSTEM-SUMMARY.md** - Technical details

**99% time savings - Battle-tested on 2 complete courses!**

---

## The 5 Essential Templates

Use these templates to create any course efficiently (or use the auto-creator above):

---

## **1. VIDEO-TEMPLATE.md** 📹
**Use for:** Adding YouTube videos to courses

**What it covers:**
- Uploading videos to YouTube
- Adding videos to database
- Video display on course page
- Custom video schedules
- Progress tracking

**Quick command:**
```bash
DATABASE_URL="..." npx tsx add-video-script.ts
```

---

## **2. AUDIO-TEMPLATE.md** 🎵
**Use for:** Creating audiobook/chapter pages with audio player

**What it covers:**
- Copying audio files to public directory
- Creating audio player page
- Basic audio controls setup
- Adding routes
- Adding to course page

**References:** `AUDIO-STYLING-REFERENCE.md` for detailed styling

---

## **3. AUDIO-STYLING-REFERENCE.md** 🎨
**Use for:** Detailed styling and formatting for audio pages

**What it covers:**
- Complete Beautiful Audio Player styling
- Color-coded sections (Red, Blue, Green, Purple, Yellow, Orange)
- Scripture blockquote formatting
- InfoBox and WarningBox usage
- Emoji sizing and alignment
- Cards within cards hierarchy
- Complete Fire Starter example

**Critical for:** Making pages look professional and consistent

---

## **4. QUIZ-TEMPLATE.md** 📝
**Use for:** Creating weekly quizzes and final exams

**What it covers:**
- PDF quiz extraction
- Quiz ID allocation
- Database script creation
- Server route configuration
- Course page integration
- Essay integration (final exams)
- Complete Fire Starter example

**Quick process:**
1. Extract PDF → 2. Create script → 3. Run script → 4. Update routes → 5. Done!

---

## **5. EBOOK-TEMPLATE.md** 📖
**Use for:** Creating complete multi-chapter e-books with integrated audio

**What it covers:**
- Complete e-book page structure
- Integrated audio player with chapter selection
- Chapter content migration from individual pages
- PDF download button integration
- Textbook catalog navigation
- Personal library navigation
- Complete examples (Fire Starter, Don't Be a Jonah)

**Key features:**
- Single page with all chapters
- Dropdown chapter selector
- Sticky audio player
- Download PDF button
- Responsive design

---

## Essential Tool: PDF Extractor

**File:** `extract-pdf.cjs` (in project root)

**Usage:**
```bash
node extract-pdf.cjs "path/to/file.pdf"
```

**What it does:**
- Extracts all text from PDF
- Saves as `_extracted.txt`
- Works with any PDF format

**Use for:**
- Chapter content extraction
- Quiz question extraction
- Any PDF text content

---

## Typical Course Creation Workflow

### Week 1 Setup Example:

**1. Video (if applicable)**
```bash
# Create add-video script and run it
DATABASE_URL="..." npx tsx add-video.ts
```

**2. Required Reading (Audiobook)**
```bash
# Extract PDF
node extract-pdf.cjs "Chapter-1.pdf"

# Copy audio
cp "chapter-1.mp3" public/coursename-ch1.mp3

# Create page: coursename-ch1.tsx (see AUDIO-TEMPLATE.md)
# Style it beautifully (see AUDIO-STYLING-REFERENCE.md)
# Add route to App.tsx
# Add card to course page
```

**3. Bible Reading**
```bash
# Just add the button with Bible Gateway link:
# https://www.biblegateway.com/passage/?search=Luke+1-4&version=NLT
```

**4. Quiz**
```bash
# Extract quiz PDF
node extract-pdf.cjs "Week-1-quiz.pdf"

# Create and run database script (see QUIZ-TEMPLATE.md)
DATABASE_URL="..." npx tsx add-quiz.ts

# Update server routes
# Quiz automatically appears on course page!
```

---

## File Organization

### Essential Files (Keep These):
```
├── extract-pdf.cjs ✅ (PDF text extractor)
├── VIDEO-TEMPLATE.md ✅ (Video guide)
├── AUDIO-TEMPLATE.md ✅ (Audio page setup)
├── AUDIO-STYLING-REFERENCE.md ✅ (Beautiful styling guide)
├── QUIZ-TEMPLATE.md ✅ (Quiz creation guide)
├── EBOOK-TEMPLATE.md ✅ (Complete e-book guide)
├── COURSE-CREATION-GUIDE.md ✅ (This file - master index)
└── FIRE-STARTER-QUIZ-COMPLETION-SUMMARY.md ✅ (Example reference)
```

### Temporary Files (Delete After Use):
```
add-video-*.ts (after running)
add-quiz-*.ts (after running)
*_extracted.txt (keep for reference, but not required)
```

---

## Quick Reference: Where to Add Code

### 1. New Audio Page Route
**File:** `client/src/App.tsx`
```typescript
import CoursenameCh5 from './pages/coursename-ch5';
<Route path="/coursename-ch5" component={CoursenameCh5} />
```

### 2. Week Card on Course Page
**File:** `client/src/components/course-content-viewer.tsx`
Add new `<Card>` in the appropriate courseId section

### 3. Quiz ID Mapping
**File:** `server/routes.ts`
Add to `quizIdMap` (appears in TWO locations!)
```typescript
'coursename-week-1': 48,
```

### 4. Quiz Filtering
**File:** `client/src/components/course-content-viewer.tsx` (Line ~177)
```typescript
if (courseId === X) {
  quizzes = allQuizzes.filter((q: any) => 
    q.title && q.title.includes('Your Course Title')
  );
}
```

### 5. Quiz URL Generation
**File:** `client/src/components/course-content-viewer.tsx` (Lines ~2910, 2937)
```typescript
} else if (courseId === X) {
  quizUrl = isFinalExam ? '/quiz/coursename-final-exam' : `/quiz/coursename-week-${quizNumber}`;
```

---

## Complete Course Checklist

### Videos
- [ ] Videos uploaded to YouTube
- [ ] Database scripts created and run
- [ ] Videos appear on course page
- [ ] Custom schedule configured (if needed)

### Required Reading (Audiobook)
- [ ] All PDFs extracted
- [ ] All audio files copied to `/public/`
- [ ] All chapter pages created
- [ ] All beautifully styled (see AUDIO-STYLING-REFERENCE.md)
- [ ] All routes added to App.tsx
- [ ] All week cards added to course page
- [ ] All Bible links configured

### Quizzes
- [ ] All quiz PDFs extracted
- [ ] Quiz IDs allocated
- [ ] Database scripts created and run
- [ ] Server routes updated (both locations!)
- [ ] Quiz filtering added
- [ ] Quiz URL generation added
- [ ] All quizzes tested
- [ ] Final exam essay configured

### Final Steps
- [ ] All temporary scripts deleted
- [ ] Server restarted
- [ ] Full course tested
- [ ] All URLs working
- [ ] Progress tracking verified

---

## Success Metrics

✅ **Videos**: All playing correctly  
✅ **Audio Pages**: Beautifully formatted with proper styling  
✅ **Quizzes**: All 11 quizzes (10 weekly + 1 final) working  
✅ **Bible Links**: All opening to correct passages (NLT)  
✅ **Course Page**: Everything displays correctly  
✅ **URLs**: All working without 404 errors

---

## Need Help?

**For Videos:** See `VIDEO-TEMPLATE.md`  
**For Audio Pages:** See `AUDIO-TEMPLATE.md` + `AUDIO-STYLING-REFERENCE.md`  
**For Quizzes:** See `QUIZ-TEMPLATE.md`  
**For Complete E-Books:** See `EBOOK-TEMPLATE.md`  
**For Examples:** See `FIRE-STARTER-QUIZ-COMPLETION-SUMMARY.md`

---

**Everything you need is in these 5 templates!** 🎉

