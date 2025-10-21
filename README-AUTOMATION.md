# 🚀 SFGM Boston - Course Automation System

## Revolutionary Course Creation in 15 Minutes!

This automation system transforms course creation from a **2-3 day manual process** into a **15-minute automated workflow**.

---

## 📚 Documentation Files

### Quick Start
1. **QUICK-START-AUTO-COURSE.md** - 5-minute getting started guide
2. **AUTO-COURSE-CREATOR.md** - Complete automation documentation

### For AI Assistant
3. **AI-INSTRUCTIONS-AUTO-COURSE.md** - Instructions for AI to follow when creating courses

### Reference (Original Templates)
4. **COURSE-CREATION-GUIDE.md** - Master guide with all templates
5. **VIDEO-TEMPLATE.md** - Video integration
6. **AUDIO-TEMPLATE.md** - Audio player setup
7. **AUDIO-STYLING-REFERENCE.md** - Beautiful formatting
8. **QUIZ-TEMPLATE.md** - Quiz creation
9. **EBOOK-TEMPLATE.md** - Complete e-books

---

## 🎯 What Gets Automated

### Fully Automated (Zero Manual Work):
- ✅ PDF text extraction (all chapters + quizzes)
- ✅ Audio file copying to `/public/`
- ✅ Chapter page creation with audio players
- ✅ Complete e-book page structure
- ✅ Route registration in `App.tsx`
- ✅ Quiz database script generation
- ✅ Consistent naming conventions

### Semi-Automated (AI Assistance):
- ✅ Week card creation in `course-content-viewer.tsx`
- ✅ Quiz filtering and URL generation
- ✅ Progress tracking configuration
- ✅ Quiz question parsing and formatting
- ✅ Chapter content embedding in e-book
- ✅ Beautiful formatting with color-coded sections

### Manual (One-Time Setup):
- ✅ Database connection for quiz script
- ✅ Server restart
- ✅ Testing

---

## 🎨 Key Features

### 1. Intelligent Naming
All files named after the course:
- `deacon-training-ch1.tsx`
- `/deacon-training-ch1`
- `/quiz/deacon-training-week-1`

**No more generic numbered files!**

### 2. Beautiful Formatting
Color-coded sections automatically applied:
- 🔴 Red: Warnings, Important Notes
- 🔵 Blue: Key Points, Definitions
- 🟢 Green: Actions, Steps
- 🟣 Purple: Scripture, Quotes

### 3. Seamless E-Books
Complete e-books with:
- Single audio player
- Chapter dropdown selector
- All content embedded
- No page reloads

### 4. Perfect Quiz Distribution
Ensures 25% correct answers in each option (A, B, C, D)

### 5. Original Content Preservation
Always uses exact text from PDFs - never generic content!

---

## 📊 Before & After Comparison

| Task | Manual | Automated | Time Saved |
|------|--------|-----------|------------|
| PDF extraction | 30 min | 2 min | 28 min |
| Audio file copying | 15 min | 1 min | 14 min |
| Chapter pages | 4 hours | 5 min | 3h 55min |
| Complete e-book | 2 hours | 3 min | 1h 57min |
| Quiz scripts | 3 hours | 2 min | 2h 58min |
| Routes & navigation | 1 hour | 2 min | 58 min |
| **TOTAL** | **2-3 days** | **15 min** | **99% faster!** |

---

## 🛠️ How to Use

### Option 1: Manual Python Command
```bash
python3 auto-create-course.py
```
Then answer the interactive prompts.

### Option 2: Tell the AI
Just say:
```
"Create a new course called 'Deacon Training' with 8 chapters, 8 quizzes, and Bible readings"
```

The AI will:
1. Run the auto-creator with your details
2. Complete the semi-automated steps
3. Guide you through final testing

---

## 📁 Course Materials Structure

Organize materials like this:

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
    │   └── Complete Book.pdf (for download)
    │
    ├── Quiz/
    │   ├── 1/
    │   │   └── Week 1 quiz.pdf
    │   ├── 2/
    │   │   └── Week 2 quiz.pdf
    │   └── Final Exam/
    │       └── Final Exam.pdf
    │
    └── Required Reading/ (optional)
        └── bible-readings.txt
```

---

## 🎓 Example Workflow

### User Says:
*"Create Leadership Excellence course - 10 chapters, 10 quizzes, no videos, has Bible readings"*

### AI Does:
1. Runs `python3 auto-create-course.py`
2. Inputs provided details
3. Waits for PDF extraction (2 min)
4. Updates course-content-viewer.tsx (3 min)
5. Updates server routes (1 min)
6. Parses quiz PDFs (5 min)
7. Embeds e-book content (2 min)
8. Tests everything (2 min)

### Result:
**15 minutes later, complete course is live!**

---

## ✅ What You Get

For a course named "Leadership Excellence":

### Pages Created:
- `leadership-excellence-ch1.tsx` through `ch10.tsx`
- `leadership-excellence-complete-ebook.tsx`

### Routes Working:
- `/leadership-excellence-ch1` through `/ch10`
- `/leadership-excellence-complete-ebook`
- `/quiz/leadership-excellence-week-1` through `/week-10`
- `/quiz/leadership-excellence-final-exam`

### Features Working:
- ✅ Beautiful audio players
- ✅ Seamless e-book with chapter selector
- ✅ All quizzes with 25% answer distribution
- ✅ Progress tracking (X/10 Readings, X/11 Quizzes)
- ✅ Bible reading cards
- ✅ Textbook catalog integration
- ✅ Personal library integration

---

## 🐛 Troubleshooting

### "Auto-creator not found"
```bash
# Make sure you're in the project root
cd /Users/rocky/Desktop/BostonMinistry
python3 auto-create-course.py
```

### "PDF extraction failed"
- Check PDF isn't password-protected
- Verify path is correct
- Try manual: `node extract-pdf.cjs "path/to/file.pdf"`

### "Quizzes not showing"
- Run database script: `DATABASE_URL="..." npx tsx add-coursename-quizzes.ts`
- Check server routes updated
- Restart server

### "Progress shows 0/0"
- Update `getCompletionStats()` in `course-content-viewer.tsx`
- Add special handling for your courseId

---

## 🎉 Success Stories

### Studying for Service (Course 5)
- 12 chapters + 12 quizzes
- **Old way**: 3 days manual work
- **New way**: 20 minutes automated
- **Result**: Perfect, working in production

### G.R.O.W (Course 4)
- 4 chapters + 5 quizzes + complete e-book
- **Old way**: 1 day manual work
- **New way**: 15 minutes automated
- **Result**: Seamless player, original content preserved

---

## 📞 Need Help?

1. **For quick start**: See `QUICK-START-AUTO-COURSE.md`
2. **For full details**: See `AUTO-COURSE-CREATOR.md`
3. **For AI instructions**: See `AI-INSTRUCTIONS-AUTO-COURSE.md`
4. **For manual method**: See `COURSE-CREATION-GUIDE.md`

---

## 🚀 Next Steps

Ready to create a course?

1. Organize your materials (PDFs, MP3s)
2. Run `python3 auto-create-course.py`
3. Answer the prompts
4. Let the magic happen! ✨

**Or simply tell the AI what course you want to create!**

---

**Transform 2-3 days of tedious work into 15 minutes of automation!** 🎉

