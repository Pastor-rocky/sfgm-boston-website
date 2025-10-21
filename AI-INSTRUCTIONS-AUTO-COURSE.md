# 🤖 AI Instructions: Automatic Course Creation

## When User Says "Create a New Course"

### STEP 1: Use the Python Auto-Creator

When the user wants to create a new course, you should:

1. **Ask for course details**:
   - Course name (e.g., "Deacon Training")
   - Course ID number
   - Number of chapters
   - Number of quizzes
   - Has videos? (y/n)
   - Has Bible readings? (y/n)
   - Course folder path

2. **Run the auto-creator**:
   ```bash
   python3 auto-create-course.py
   ```
   
   Then **pass the user's answers as input** to the interactive prompts.

3. **The script automatically handles**:
   - ✅ PDF extraction (all chapters + quizzes)
   - ✅ Audio file copying
   - ✅ Chapter page creation
   - ✅ Complete e-book creation
   - ✅ Quiz script generation
   - ✅ Route updates (App.tsx)
   - ✅ Basic navigation setup

### STEP 2: Complete Manual Steps

After the auto-creator runs, you need to complete these steps:

1. **Update `course-content-viewer.tsx`**:
   - Add week cards for the new courseId
   - Add quiz filtering logic
   - Add quiz URL generation
   - Add progress tracking stats

2. **Update `server/routes.ts`**:
   - Add quiz ID mappings to `quizIdMap`
   - Map string IDs like `coursename-week-1` to numeric IDs

3. **Update `textbook-catalog.tsx`**:
   - Add e-book navigation for new courseId
   - Link to `/{coursename}-complete-ebook`

4. **Parse and populate quiz database script**:
   - Read extracted quiz PDFs
   - Generate quiz questions, options, and answers
   - Complete the `add-{coursename}-quizzes.ts` script

5. **Embed chapter content in complete e-book**:
   - Extract content from individual chapter pages
   - Embed into `getChapterContent()` function in e-book
   - Ensure seamless chapter switching

### STEP 3: Run Database Script

```bash
DATABASE_URL="connection-string" npx tsx add-{coursename}-quizzes.ts
```

### STEP 4: Test Everything

- All chapter pages load
- Audio players work
- Complete e-book loads
- Chapter dropdown works
- All quizzes accessible
- Progress tracking accurate

---

## Naming Convention Rules

### CRITICAL: Use Course Name for ALL Files

**DO:**
- `deacon-training-ch1.tsx`
- `leadership-excellence-ch1.tsx`
- `grow-ch1.tsx`

**DON'T:**
- `course-53-ch1.tsx` ❌
- `ch1.tsx` ❌
- Numbered generic names ❌

### Apply to Everything:

| Type | Format | Example |
|------|--------|---------|
| Chapter page | `{coursename}-ch1.tsx` | `deacon-training-ch1.tsx` |
| Component name | `{CourseName}Ch1` | `DeaconTrainingCh1` |
| Audio file | `{coursename}-ch1.mp3` | `deacon-training-ch1.mp3` |
| E-book page | `{coursename}-complete-ebook.tsx` | `deacon-training-complete-ebook.tsx` |
| Route | `/{coursename}-ch1` | `/deacon-training-ch1` |
| Quiz ID | `{coursename}-week-1` | `deacon-training-week-1` |
| Final exam | `{coursename}-final-exam` | `deacon-training-final-exam` |

### URL Slug Generation:
1. Take course name: "Deacon Training"
2. Lowercase: "deacon training"
3. Replace spaces/special chars with hyphens: "deacon-training"
4. Use consistently everywhere

---

## Content Extraction Rules

### ALWAYS Use Original Text from PDFs

**NEVER generate generic content!**

1. Extract PDF: `node extract-pdf.cjs "path/to/file.pdf"`
2. Read `*_extracted.txt` file
3. Use **exact original text** in React components
4. Preserve all content, quotes, scriptures
5. Only add formatting HTML (divs, classes)
6. Don't paraphrase, summarize, or rewrite

### Beautiful Formatting

Apply color-coded sections:

```tsx
// Red - Warnings, Important Notes
<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
  <h3 className="text-red-900 font-bold">⚠️ Important</h3>
  <p className="text-red-800">{original text here}</p>
</div>

// Blue - Key Points, Definitions
<div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
  <h3 className="text-blue-900 font-bold">📘 Key Point</h3>
  <p className="text-blue-800">{original text here}</p>
</div>

// Green - Actions, Steps
<div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
  <h3 className="text-green-900 font-bold">✅ Action Step</h3>
  <p className="text-green-800">{original text here}</p>
</div>

// Purple - Scripture, Quotes
<div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
  <blockquote className="text-purple-900 italic">{original text here}</blockquote>
</div>
```

---

## Quiz Creation Rules

### Quiz Answer Distribution

[[memory:8577046]]
**ALWAYS ensure 25% of correct answers in each option (A, B, C, D)**

For a 12-question quiz:
- 3 questions with answer A
- 3 questions with answer B
- 3 questions with answer C
- 3 questions with answer D

### Quiz Database Structure

```typescript
{
  title: "Course Name - Week 1 Quiz",
  courseId: X,
  moduleId: null,
  weekNumber: 1,
  passingScore: 70,
  createdAt: new Date(),
  questions: [
    {
      questionText: "Exact text from PDF",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0, // Index of correct answer (0=A, 1=B, 2=C, 3=D)
      points: 8.33, // 100 / number of questions
    }
  ]
}
```

---

## Complete E-Book Rules

### Seamless Player Experience

The complete e-book should:
1. ✅ Have ONE audio player at top
2. ✅ Have chapter dropdown selector
3. ✅ Embed ALL chapter content directly
4. ✅ Switch content dynamically (no page reload)
5. ✅ NOT be sticky (player stays at top)

### Content Embedding Method

Use `getChapterContent()` function:

```tsx
const getChapterContent = (chapterId: number) => {
  switch (chapterId) {
    case 1:
      return (
        <div className="space-y-6">
          {/* Full Chapter 1 content embedded here */}
        </div>
      );
    case 2:
      return (
        <div className="space-y-6">
          {/* Full Chapter 2 content embedded here */}
        </div>
      );
    // ... all chapters
  }
};
```

### Building E-Book Content

Use Python script to extract content from individual chapter pages:

```python
# Read each chapter page
with open(f'client/src/pages/{coursename}-ch{i}.tsx', 'r') as f:
    content = f.read()

# Extract content section (between CardContent tags)
match = re.search(r'<CardContent className="p-8 prose max-w-none">(.*?)</CardContent>', content, re.DOTALL)

# Embed into getChapterContent()
```

---

## Progress Tracking Rules

### Update `getCompletionStats()` in course-content-viewer.tsx

```typescript
// Special handling for Your Course (courseId = X)
if (courseId === X) {
  const totalReadings = NUM_CHAPTERS;
  const totalQuizzesForCourse = NUM_QUIZZES + 1; // +1 for final exam
  const totalVideosForCourse = NUM_VIDEOS; // or 0 if none
  
  const completedReadingsForCourse = contentProgress.filter((p: any) => 
    p.contentType === 'reading' && p.completed
  ).length;
  
  const completedQuizzesForCourse = quizzes.filter((q: any) => 
    q.attempts > 0 && q.bestScore !== null && (parseFloat(q.bestScore) * 100) >= (q.passingScore || 70)
  ).length;
  
  return {
    videos: { completed: 0, total: totalVideosForCourse },
    readings: { completed: completedReadingsForCourse, total: totalReadings },
    quizzes: { completed: completedQuizzesForCourse, total: totalQuizzesForCourse },
  };
}
```

---

## Bible Reading Cards

When course has Bible readings, add cards like this:

```tsx
<Card className="border-purple-200 hover:shadow-lg transition-all">
  <CardContent className="p-6">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h4 className="font-semibold text-lg mb-2">
          📖 Required Bible Reading
        </h4>
        <p className="text-sm text-gray-600">
          Week {weekNum}: {biblePassage}
        </p>
      </div>
    </div>
    <Button
      onClick={() => window.open(
        `https://www.biblegateway.com/passage/?search=${encodeURIComponent(biblePassage)}&version=NLT`,
        '_blank'
      )}
      className="w-full"
    >
      Read {biblePassage} (NLT)
    </Button>
  </CardContent>
</Card>
```

---

## ⚠️ CRITICAL LESSONS FROM DEACON COURSE (Session 41)

### 1. E-Book Content Must Be Embedded, Not Linked
**PROBLEM**: Originally created e-book with "Read Chapter" buttons that navigated to individual pages
**SOLUTION**: Embed ALL chapter content directly in `getChapterContent()` switch statement
- Copy content sections from individual chapter pages
- Paste into each case in the switch statement
- User can scroll through content seamlessly while audio plays

### 2. Complete E-Book Structure (Reference: grow-complete-ebook.tsx)
```tsx
// ✅ CORRECT Structure:
const getChapterContent = (chapterId: number) => {
  switch (chapterId) {
    case 1:
      return <div className="space-y-6">{/* FULL chapter 1 content */}</div>;
    case 2:
      return <div className="space-y-6">{/* FULL chapter 2 content */}</div>;
    // ... all chapters
  }
};

return (
  <div className="max-w-4xl mx-auto">  {/* Use max-w-4xl for narrower width */}
    {/* Audio Player with Chapter Selector */}
    <Card>
      <Select value={currentChapter} onValueChange={handleChapterChange}>
        {/* Chapter dropdown */}
      </Select>
      {/* Playback controls */}
    </Card>
    
    {/* Content Card */}
    <Card>
      <CardContent className="prose max-w-none">
        {getChapterContent(currentChapter)}
      </CardContent>
    </Card>
  </div>
);
```

### 3. Container Width Standardization
**CRITICAL**: ALL e-book pages must use `max-w-4xl mx-auto` for consistent narrow width
- ❌ DON'T use: `container mx-auto` (too wide)
- ❌ DON'T use: `max-w-5xl mx-auto` (too wide)
- ✅ DO use: `max-w-4xl mx-auto` (perfect reading width)

### 4. Audio File Naming Convention
**Pattern**: `{coursename}-ch{X}.mp3` or `Cp{X}.mp3` from source
**Location**: `/public/` directory
**Example**: 
- Source: `Cp1.mp3` → Copy to: `/public/deacon-course-ch1.mp3`
- Ensure `audioUrl` in chapters array matches: `/deacon-course-ch1.mp3`

### 5. Textbook Catalog Integration (COMPLETE CHECKLIST)
When adding new course to catalog:

```typescript
// 1. Add to completeTextbooks array in correct order
const newCourse = courses.find((c: any) => c.id === COURSE_ID);
if (newCourse) {
  completeTextbooks.push({
    id: COURSE_ID, // Display order = Course ID
    title: "Course Title",
    author: "Author Name",
    description: "Full description...",
    bookCoverUrl: "/course-cover.png",
    category: "Category",
    difficulty: "Beginner|Intermediate|Advanced",
    chapterCount: NUM_CHAPTERS,
    estimatedReadingTime: "X-Y hours",
    isComplete: true,
    courseId: COURSE_ID,
    courseName: "Course Name",
    isUpdated: newCourse.isUpdated || false
  });
}

// 2. Add e-book navigation (line ~812)
else if (textbook.courseId === COURSE_ID) {
  setLocation('/{coursename}-complete-ebook');
}

// 3. Add PDF download (line ~857)
else if (textbook.courseId === COURSE_ID) {
  window.open('/pdfs/{Course Name}.pdf', '_blank');
}

// 4. Add library handler (line ~529)
if (textbook.courseId === COURSE_ID) {
  setLocation('/{coursename}-complete-ebook');
}
```

### 6. PDF Management
**MUST DO**: Copy course PDF to `/public/pdfs/` directory
```bash
cp "source/path/Course.pdf" "/Users/rocky/Desktop/BostonMinistry/public/pdfs/Course Name.pdf"
```
**Note**: Use URL-encoded name in code: `/pdfs/Course%20Name.pdf`

### 7. Catalog Card Display Order
**DEFAULT SORT**: Set `sortBy` to `"course"` for course number order
**SORT LOGIC**: Add this case to sort function:
```typescript
if (sortBy === 'course') return (a.id - b.id) * dir;
```

### 8. Course Content Viewer Updates (course-content-viewer.tsx)
**MUST UPDATE** for each new course:
1. **Video hiding**: Add courseId to conditions `(courseId !== 4 && courseId !== 6 && courseId !== NEW_ID)`
2. **Grid layout**: Update to show 2 columns when no videos
3. **Tab display**: Hide video tab for courses without videos
4. **Progress stats**: Add special case in `getCompletionStats()`
5. **Week cards**: Add reading/quiz cards for each week
6. **Button text**: Use `🎶 Audiobook` not "Listen & Read"

### 9. Chapter Page Audio Player Header
**CRITICAL**: Update audio player title to match chapter:
```tsx
<p className="text-white/90 text-xl font-semibold">
  Chapter {X}: {Chapter Title}  {/* NOT generic "Introduction" */}
</p>
```

### 10. Remove Unnecessary Chapters
If course has fewer chapters than initially planned:
1. Delete the chapter page file
2. Remove from `App.tsx` imports and routes
3. Update `chapters` array in complete e-book
4. Update total readings count in progress tracking
5. Remove any week cards from course-content-viewer

### 11. Quiz Database Script Requirements
**MUST CORRECT**:
- `points` must be INTEGER (not decimal like 8.33)
- Field is `question` NOT `questionText`
- Must include `type: "multiple_choice"`
- `correctAnswer` must be STRING: "0", "1", "2", or "3"
- Check for existing quizzes before insert to avoid duplicates

### 12. Cover Image Display
**For course detail page** (course-detail.tsx):
```tsx
// Add conditional for new course
{id === "COURSE_ID" ? (
  <img 
    src="/course-cover.png" 
    className="w-72 h-72 object-contain"  // Use object-contain for circular logos
  />
) : (
  // default image handling
)}
```

---

## Quick Checklist

When user says "Create [Course Name] course":

- [ ] Run `python3 auto-create-course.py`
- [ ] Provide course details to prompts
- [ ] Wait for auto-creation to complete
- [ ] **Copy audio files to /public/ with correct naming**
- [ ] **Copy course PDF to /public/pdfs/**
- [ ] Update `course-content-viewer.tsx` (cards, filtering, URLs, stats, video hiding)
- [ ] Update `server/routes.ts` (quiz ID mappings)
- [ ] Update `textbook-catalog.tsx` (e-book link, PDF download, course card)
- [ ] Parse quiz PDFs and complete database script
- [ ] **Embed ALL chapter content in complete e-book `getChapterContent()`**
- [ ] **Verify all e-books use `max-w-4xl mx-auto`**
- [ ] Update audio player headers with chapter titles
- [ ] Run quiz database script with DATABASE_URL
- [ ] Add course to database with cover image
- [ ] Test all pages load
- [ ] Test audio players work
- [ ] Test chapter switching in e-book
- [ ] Test all quizzes accessible
- [ ] Test progress tracking accurate
- [ ] Test PDF download works
- [ ] Delete temporary files

---

**With this system, you can create entire courses in 15 minutes instead of 2-3 days!** 🚀

