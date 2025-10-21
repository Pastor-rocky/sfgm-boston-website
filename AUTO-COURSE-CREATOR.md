# 🚀 Automatic Course Creation System

## One-Command Course Creation

This system automates the entire course creation process using Python scripts. Just provide the course materials and run one command!

---

## 📋 Prerequisites

### Required Course Materials Structure:
```
SFGM Orlando Courses/
└── (X) Your Course Name 📚Course/
    ├── Videos/ (optional)
    │   ├── 1/
    │   │   └── video-metadata.txt (YouTube URL, title, duration)
    │   └── 2/
    ├── Text-Book/
    │   ├── 1/
    │   │   ├── Chapter 1.pdf
    │   │   └── chapter-1.mp3
    │   ├── 2/
    │   │   ├── Chapter 2.pdf
    │   │   └── chapter-2.mp3
    │   └── Complete Book.pdf (for download)
    ├── Quiz/
    │   ├── 1/
    │   │   └── Week 1 quiz.pdf
    │   ├── 2/
    │   │   └── Week 2 quiz.pdf
    │   └── Final Exam/
    │       └── Final Exam.pdf
    └── Required Reading/
        └── bible-readings.txt (Week-by-week Bible passages)
```

---

## 🎯 Usage

### Step 1: Run the Auto-Creator
```bash
python3 auto-create-course.py
```

### Step 2: Follow the Interactive Prompts
```
Enter course name: Deacon Course
Enter course ID: 6
Enter number of chapters: 8
Enter number of weekly quizzes: 8
Does this course have videos? (y/n): n
Does this course have Bible readings? (y/n): y
Enter course folder path: SFGM Orlando Courses/(6) Deacon Course 📚Course
```

### Step 3: Review and Confirm
The script will:
1. ✅ Extract all PDFs automatically
2. ✅ Create all chapter pages (deacon-course-ch1.tsx through ch8.tsx)
3. ✅ Copy all audio files to /public/
4. ✅ Create complete e-book page (deacon-course-complete-ebook.tsx)
5. ✅ Generate all quiz database scripts
6. ✅ Update App.tsx with all routes
7. ✅ Update course-content-viewer.tsx with all cards
8. ✅ Update server/routes.ts with quiz mappings
9. ✅ Update textbook-catalog.tsx
10. ✅ Configure progress tracking

### Step 4: Run Database Scripts
```bash
DATABASE_URL="your-db-url" npx tsx add-deacon-course-quizzes.ts
```

### Step 5: Test!
```
http://localhost:56000/course/6
http://localhost:56000/deacon-course-complete-ebook
```

---

## 🛠️ What Gets Created

### 1. Chapter Pages
- `client/src/pages/deacon-course-ch1.tsx` through `chX.tsx`
- Each with beautiful audio player
- All content from PDFs with proper formatting
- Color-coded sections (red, blue, green, purple, yellow, orange)

### 2. Complete E-Book
- `client/src/pages/deacon-course-complete-ebook.tsx`
- All chapters embedded
- Seamless audio player with chapter dropdown
- PDF download button

### 3. Quiz System
- Database script: `add-deacon-course-quizzes.ts`
- All weekly quizzes + final exam
- String-based URLs: `/quiz/deacon-course-week-1`
- Essay prompt for final exam (auto-configured)

### 4. Navigation & Routes
- All routes added to `App.tsx`
- All week cards added to course page
- Bible reading links (if applicable)
- Textbook catalog integration
- Progress tracking configured

---

## 📝 Naming Convention

The system automatically creates consistent names:

| Item | Format | Example |
|------|--------|---------|
| Chapter Pages | `coursename-ch1.tsx` | `deacon-course-ch1.tsx` |
| Audio Files | `coursename-ch1.mp3` | `deacon-course-ch1.mp3` |
| Complete E-Book | `coursename-complete-ebook.tsx` | `deacon-course-complete-ebook.tsx` |
| Weekly Quiz | `coursename-week-1` | `deacon-course-week-1` |
| Final Exam | `coursename-final-exam` | `deacon-course-final-exam` |
| Routes | `/coursename-ch1` | `/deacon-course-ch1` |

**No more numbered courses like "course-53"!** Everything uses the actual course name.

---

## 🎨 Formatting Features

### Color-Coded Sections
The system automatically applies beautiful formatting:

```tsx
// Red Sections (Warnings, Important Notes)
<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
  <h3 className="text-red-900 font-bold">⚠️ Important</h3>
  <p className="text-red-800">Content here</p>
</div>

// Blue Sections (Key Points, Definitions)
<div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
  <h3 className="text-blue-900 font-bold">📘 Key Point</h3>
  <p className="text-blue-800">Content here</p>
</div>

// Green Sections (Actions, Steps)
<div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
  <h3 className="text-green-900 font-bold">✅ Action Step</h3>
  <p className="text-green-800">Content here</p>
</div>

// Purple Sections (Scripture, Quotes)
<div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
  <blockquote className="text-purple-900 italic">
    "Scripture quote here"
  </blockquote>
</div>
```

### Audio Player Styling
- Gradient backgrounds matching course theme
- Large emoji icons with proper sizing
- Skip forward/back 15s buttons
- Volume control
- Progress bar
- Chapter dropdown (for complete e-book)

---

## 🔧 Advanced Options

### Custom Bible Readings
Create `bible-readings.txt` in course folder:
```
Week 1: Luke 1-4
Week 2: Luke 5-8
Week 3: Luke 9-12
Week 4: Matthew 1-5
```

### Custom Quiz Start ID
If you need specific quiz IDs, edit the generated script:
```typescript
const START_QUIZ_ID = 100; // Change this
```

### Custom Course Colors
Edit the generated files to change color schemes:
- Fire themes: Red/Orange gradients
- Growth themes: Green/Emerald gradients
- Study themes: Blue/Indigo gradients
- Leadership themes: Purple/Violet gradients

---

## 📂 Files Created

### Required Files (Keep):
- `auto-create-course.py` - Main automation script
- `extract-all-pdfs.py` - Batch PDF extractor
- `generate-chapter-pages.py` - Chapter page generator
- `generate-complete-ebook.py` - E-book generator
- `generate-quiz-scripts.py` - Quiz database script generator
- `update-navigation.py` - Updates App.tsx and course-content-viewer.tsx
- `AUTO-COURSE-CREATOR.md` - This documentation

### Temporary Files (Auto-deleted):
- `add-[coursename]-quizzes.ts` - Deleted after running
- `*_extracted.txt` - Deleted after processing
- Any intermediate build files

---

## 🎓 Example: Full Course Creation

```bash
# Run the auto-creator
python3 auto-create-course.py

# Answer prompts
Course name: Leadership Excellence
Course ID: 7
Chapters: 10
Weekly quizzes: 10
Videos: no
Bible readings: yes
Folder: SFGM Orlando Courses/(7) Leadership Excellence 📚Course

# Script runs automatically...
# ✅ 10 chapters created
# ✅ Complete e-book created
# ✅ 11 quizzes generated (10 weekly + 1 final)
# ✅ All routes added
# ✅ All navigation updated
# ✅ Progress tracking configured

# Run database script (one time)
DATABASE_URL="your-db" npx tsx add-leadership-excellence-quizzes.ts

# Test
open http://localhost:56000/course/7
open http://localhost:56000/leadership-excellence-complete-ebook

# Done! 🎉
```

---

## ⚡ Benefits

### Before (Manual):
- 2-3 days per course
- 100+ manual edits
- High error rate
- Inconsistent formatting
- Tedious repetition

### After (Automated):
- 15 minutes per course
- 1 command + 1 database run
- Consistent quality
- Beautiful formatting
- Zero tedium

---

## 🐛 Troubleshooting

### "PDF extraction failed"
- Verify PDF path is correct
- Check PDF isn't password-protected
- Try `node extract-pdf.cjs "path/to/file.pdf"` manually

### "Audio file not found"
- Check audio file exists in Text-Book/X/ folder
- Verify it's an MP3 file
- Check file name matches PDF name

### "Quiz not appearing"
- Verify database script ran successfully
- Check quiz ID not already in use
- Restart server
- Clear browser cache

### "Routes not working"
- Server needs restart after App.tsx changes
- Check for typos in route paths
- Verify import statements added

---

## 📊 Success Checklist

After running auto-creator:

- [ ] All chapter pages accessible
- [ ] All audio players working
- [ ] Complete e-book loads
- [ ] Chapter dropdown works
- [ ] All quizzes accessible
- [ ] Bible links open correctly
- [ ] Progress tracking accurate
- [ ] Textbook catalog link works
- [ ] PDF download works
- [ ] No 404 errors

---

## 🎉 Next Steps

1. **Test the course thoroughly**
2. **Delete temporary files** (script offers this)
3. **Create Git restore point**: `git add . && git commit -m "Added [Course Name]"`
4. **Move to next course!**

---

**Now you can create entire courses in minutes instead of days!** 🚀

