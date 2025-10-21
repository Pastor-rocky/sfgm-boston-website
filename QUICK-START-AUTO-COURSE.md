# 🚀 Quick Start: Auto Course Creator

## Create a Complete Course in 15 Minutes!

### Step 1: Organize Your Materials

Put all course materials in this structure:
```
SFGM Orlando Courses/
└── (X) Your Course Name 📚Course/
    ├── Text-Book/
    │   ├── 1/
    │   │   ├── Chapter 1.pdf
    │   │   └── chapter-1.mp3
    │   ├── 2/
    │   │   ├── Chapter 2.pdf
    │   │   └── chapter-2.mp3
    │   └── ...
    └── Quiz/
        ├── 1/
        │   └── Week 1 quiz.pdf
        ├── 2/
        │   └── Week 2 quiz.pdf
        └── Final Exam/
            └── Final Exam.pdf
```

### Step 2: Run the Auto-Creator

```bash
python3 auto-create-course.py
```

### Step 3: Answer the Prompts

```
📚 Enter course name: Deacon Training
🔢 Enter course ID number: 8
📖 Enter number of chapters: 6
📝 Enter number of weekly quizzes: 6
🎥 Does this course have videos? (y/n): n
📕 Does this course have Bible readings? (y/n): y
📁 Enter course folder path: SFGM Orlando Courses/(8) Deacon Training 📚Course
```

### Step 4: Wait for Magic! ✨

The script will automatically:
- ✅ Extract all PDFs
- ✅ Copy all audio files
- ✅ Create all chapter pages
- ✅ Create complete e-book
- ✅ Generate quiz scripts
- ✅ Update all routes
- ✅ Update navigation

### Step 5: Run Quiz Database Script

```bash
DATABASE_URL="your-connection-string" npx tsx add-deacon-training-quizzes.ts
```

### Step 6: Test!

```bash
# Restart server
pkill -f "npm run dev" && npm run dev

# Open browser
open http://localhost:56000/course/8
open http://localhost:56000/deacon-training-complete-ebook
```

## 🎉 Done!

Your complete course is now live with:
- Beautiful audio player pages
- Seamless e-book with chapter selector
- Working quizzes
- Progress tracking
- Bible reading links (if applicable)
- Perfect naming conventions

---

## What You Get

### Pages Created:
- `deacon-training-ch1.tsx` through `ch6.tsx`
- `deacon-training-complete-ebook.tsx`

### Routes Added:
- `/deacon-training-ch1` through `/ch6`
- `/deacon-training-complete-ebook`

### Quizzes:
- `/quiz/deacon-training-week-1` through `/week-6`
- `/quiz/deacon-training-final-exam`

### Navigation:
- Course page cards for all weeks
- Textbook catalog link
- Personal library integration

---

## Benefits

| Before | After |
|--------|-------|
| 2-3 days manual work | 15 minutes automated |
| 100+ manual edits | 1 command + prompts |
| High error rate | Consistent quality |
| Tedious repetition | Zero tedium |

---

## See Full Documentation

For complete details, see: `AUTO-COURSE-CREATOR.md`

