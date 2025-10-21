# Quiz Template 1 - Comprehensive Documentation

## Complete Guide to Creating Course Quizzes

This template provides step-by-step instructions for creating weekly quizzes and final exams for any course in the SFGM Boston system.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quiz File Requirements](#quiz-file-requirements)
3. [Step 1: Extract PDF Quiz Questions](#step-1-extract-pdf-quiz-questions)
4. [Step 2: Determine Quiz IDs](#step-2-determine-quiz-ids)
5. [Step 3: Create Quiz Database Script](#step-3-create-quiz-database-script)
6. [Step 4: Run Database Script](#step-4-run-database-script)
7. [Step 5: Update Server Routes](#step-5-update-server-routes)
8. [Step 6: Verify Quiz Integration](#step-6-verify-quiz-integration)
9. [Quiz Settings Reference](#quiz-settings-reference)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Files
- PDF quiz files for each week
- `extract-pdf.cjs` script in project root
- Access to PostgreSQL database
- `DATABASE_URL` in `.env` file

### Course Information Needed
- Course ID (e.g., 1 for Acts, 2 for Fire Starter, 3 for DBAJ)
- Course name/prefix for URLs (e.g., `acts`, `firestarter`, `dbaj`)
- Number of weekly quizzes
- Starting database ID for quizzes

---

## Quiz File Requirements

### File Naming Convention
```
Week 1 quiz.pdf
Week 2 quiz.pdf
...
Week 10 quiz.pdf
Final Exam.pdf
```

### PDF Format Expected
Each PDF should contain:
- Question number and text
- Options A, B, C, D
- Correct answer indicated clearly
- 20 questions per weekly quiz
- 50 questions for final exam (recommended)

---

## Step 1: Extract PDF Quiz Questions

### 1.1 Navigate to Quiz Folder
```bash
cd "/path/to/course/Quiz/1/"
```

### 1.2 Run PDF Extractor
```bash
node /Users/rocky/Desktop/BostonMinistry/extract-pdf.cjs "Week 1 quiz.pdf"
```

This creates: `Week 1 quiz_extracted.txt`

### 1.3 Review Extracted Text
Open the extracted file and verify:
- All questions are readable
- Options are properly formatted
- Correct answers are identified
- No formatting issues

**Example Extracted Format:**
```
Week 1 quiz
Question 1: What is the main theme of this chapter?
A) Faith and works
B) Grace through faith
C) Obedience to the law
D) Temple worship
Correct Answer: B) Grace through faith
```

### 1.4 Repeat for All Quizzes
Extract all weekly quizzes and final exam:
```bash
for i in {1..10}; do
  cd "/path/to/course/Quiz/$i/"
  node /Users/rocky/Desktop/BostonMinistry/extract-pdf.cjs "Week $i quiz.pdf"
done

cd "/path/to/course/Quiz/Final Exam/"
node /Users/rocky/Desktop/BostonMinistry/extract-pdf.cjs "Final Exam.pdf"
```

---

## Step 2: Determine Quiz IDs

### 2.1 Find Next Available Quiz ID
Check existing quizzes in the database:
```bash
curl -s http://localhost:56000/api/quizzes/acts-final-exam | jq '.id'
# Returns: 47 (example)
# Next ID would be: 48
```

### 2.2 Plan ID Allocation
For a 10-week course with final exam:
- Week 1: ID 48
- Week 2: ID 49
- Week 3: ID 50
- ...
- Week 10: ID 57
- Final Exam: ID 58

**Important:** Final exam ID should be last in the sequence.

---

## Step 3: Create Quiz Database Script

### 3.1 Create Script File
Create a TypeScript file: `add-[coursename]-week[X]-quiz.ts`

**Example:** `add-firestarter-week1-quiz.ts`

### 3.2 Basic Script Template

```typescript
import { db } from './server/db';
import { quizzes, quizQuestions } from './shared/schema';

async function addCourseWeekQuiz() {
  try {
    console.log('Creating [Course Name] Week [X] Quiz...');
    
    // Create the quiz entry
    const [quiz] = await db.insert(quizzes).values({
      id: 48, // Use your determined ID
      moduleId: null,
      title: '[Course Name] — Week [X] Quiz',
      timeLimit: 15, // 15 minutes for weekly quiz
      passingScore: 70,
      isFinalExam: false,
      isPublished: true,
      publishedAt: new Date(),
    }).returning();
    
    console.log('Quiz created:', quiz);
    
    // Create quiz questions
    const questions = [
      { 
        quizId: 48, 
        question: 'Your question text here?', 
        type: 'multiple_choice' as const, 
        options: ['A) Option 1', 'B) Option 2', 'C) Option 3', 'D) Option 4'], 
        correctAnswer: 'B) Option 2', 
        points: 1, 
        orderIndex: 1 
      },
      // Add all 20 questions...
    ];
    
    await db.insert(quizQuestions).values(questions);
    
    console.log(`Successfully created quiz with ${questions.length} questions!`);
    console.log(`Quiz ID: ${quiz.id}`);
    console.log(`Access at: http://localhost:56000/quiz/[coursename]-week-[X]`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating quiz:', error);
    process.exit(1);
  }
}

addCourseWeekQuiz();
```

### 3.3 Final Exam Script Template

```typescript
import { db } from './server/db';
import { quizzes, quizQuestions } from './shared/schema';

async function addCourseFinalExam() {
  try {
    console.log('Creating [Course Name] Final Exam...\n');
    
    const [finalExam] = await db.insert(quizzes).values({
      id: 58, // Last ID in sequence
      moduleId: null,
      title: '[Course Name] — Final Exam',
      timeLimit: 30, // 30 minutes for 50 questions
      passingScore: 70,
      isFinalExam: true, // IMPORTANT: Set to true
      isPublished: true,
      publishedAt: new Date(),
    }).returning();
    
    const questions = [
      // Add all 50 questions...
    ];
    
    await db.insert(quizQuestions).values(questions);
    
    console.log(`\n✅ Successfully created Final Exam with ${questions.length} questions!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating Final Exam:', error);
    process.exit(1);
  }
}

addCourseFinalExam();
```

### 3.4 Question Format Requirements

**Correct Format:**
```typescript
{ 
  quizId: 48, 
  question: 'According to John 3:16, what did God give?', 
  type: 'multiple_choice' as const, 
  options: [
    'A) His law', 
    'B) His only begotten Son', 
    'C) His commandments', 
    'D) His temple'
  ], 
  correctAnswer: 'B) His only begotten Son', 
  points: 1, 
  orderIndex: 1 
}
```

**Important Notes:**
- `type` must be `'multiple_choice' as const`
- `options` array must have exactly 4 items
- `correctAnswer` must match one option exactly (including A), B), etc.)
- `orderIndex` should increment from 1 to 20 (or 50 for final)
- Escape single quotes in text: `\'` or use double quotes

---

## Step 4: Run Database Script

### 4.1 Set Database URL
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/boston_ministry"
```

### 4.2 Execute Script
```bash
cd /Users/rocky/Desktop/BostonMinistry
DATABASE_URL="postgresql://postgres:password@localhost:5432/boston_ministry" npx tsx add-[coursename]-week[X]-quiz.ts
```

### 4.3 Verify Success
Look for output:
```
✅ Successfully created [Course Name] Week [X] Quiz with 20 questions!
Quiz ID: 48 ([coursename]-week-[X])
```

### 4.4 Verify API Access
```bash
curl -s http://localhost:56000/api/quizzes/[coursename]-week-1 | jq '{title: .title, questions: (.questions | length)}'
```

Expected output:
```json
{
  "title": "Fire Starter — Week 1 Quiz",
  "questions": 20
}
```

### 4.5 Clean Up Scripts
After all quizzes are created successfully, delete the temporary scripts:
```bash
rm add-[coursename]-week*.ts
rm add-[coursename]-final-exam.ts
```

---

## Step 5: Update Server Routes

### 5.1 Open Routes File
File: `server/routes.ts`

### 5.2 Add Quiz ID Mappings

Find the `quizIdMap` object and add your course quizzes:

```typescript
const quizIdMap: { [key: string]: number } = {
  // Existing courses...
  'acts-week-1': 13,
  'dbaj-week-1': 26,
  
  // Add your course (example: Fire Starter)
  'firestarter-week-1': 48,
  'firestarter-week-2': 49,
  'firestarter-week-3': 50,
  'firestarter-week-4': 51,
  'firestarter-week-5': 52,
  'firestarter-week-6': 53,
  'firestarter-week-7': 54,
  'firestarter-week-8': 55,
  'firestarter-week-9': 56,
  'firestarter-week-10': 57,
  'firestarter-final-exam': 58,
};
```

**Important:** 
- String IDs use lowercase and hyphens
- Format: `[coursename]-week-[number]`
- Final exam: `[coursename]-final-exam`
- These mappings appear in TWO locations in routes.ts (search for both)

### 5.3 Restart Server
The server must be restarted to pick up the new routes:
```bash
pkill -f "tsx server/index.ts"
sleep 2
npm run dev
```

Or if using the running shell:
```bash
# Server should auto-restart with HMR
```

---

## Step 6: Verify Quiz Integration

### 6.1 Check Course Page Filtering

File: `client/src/components/course-content-viewer.tsx`

Verify quiz filtering is in place (around line 170):

```typescript
// Special handling for Fire Starter course (courseId = 2)
if (courseId === 2) {
  quizzes = allQuizzes.filter((q: any) => 
    q.title && q.title.includes('Fire Starter')
  );
}
```

**Add filtering for your course if needed:**
```typescript
// Special handling for [Your Course] (courseId = X)
if (courseId === X) {
  quizzes = allQuizzes.filter((q: any) => 
    q.title && q.title.includes('[Your Course Title]')
  );
}
```

### 6.2 Check Quiz URL Generation

In the same file (around line 2910), verify URL generation:

```typescript
let quizUrl;
if (courseId === 1) {
  quizUrl = isFinalExam ? '/quiz/acts-final-exam' : `/quiz/acts-week-${quizNumber}`;
} else if (courseId === 2) {
  quizUrl = isFinalExam ? '/quiz/firestarter-final-exam' : `/quiz/firestarter-week-${quizNumber}`;
} else if (courseId === 3) {
  quizUrl = isFinalExam ? '/quiz/dbaj-final-exam' : `/quiz/dbaj-week-${quizNumber}`;
} else {
  quizUrl = `/quiz/${quiz.id}`;
}
```

**Add your course:**
```typescript
} else if (courseId === X) {
  quizUrl = isFinalExam ? '/quiz/[coursename]-final-exam' : `/quiz/[coursename]-week-${quizNumber}`;
```

### 6.3 Test All Quiz URLs

```bash
# Test each weekly quiz
for i in {1..10}; do
  echo "Week $i:"
  curl -s "http://localhost:56000/api/quizzes/[coursename]-week-$i" | jq -r '.title // "Not found"'
done

# Test final exam
curl -s "http://localhost:56000/api/quizzes/[coursename]-final-exam" | jq -r '.title // "Not found"'
```

### 6.4 Verify Course Page Display

1. Navigate to: `http://localhost:56000/course/[courseId]`
2. Verify all quiz cards are visible
3. Check "Take Quiz" buttons work
4. Verify quiz prerequisite logic (if applicable)

---

## Quiz Settings Reference

### Time Limits (Recommended)
- **Weekly Quiz (20 questions):** 15 minutes
- **Final Exam (50 questions):** 30 minutes
- **Short Quiz (10 questions):** 10 minutes

### Passing Scores
- **Standard:** 70%
- **Final Exam:** 65-70%
- **Advanced Course:** 75-80%

### Quiz Types
```typescript
isFinalExam: false  // Weekly quiz
isFinalExam: true   // Final exam (triggers essay prompt)
```

### Question Points
- **Standard:** 1 point per question
- **Bonus Questions:** Set `isBonus: true`
- **Weighted:** Adjust `points` value (default: 1)

---

## File Structure

### Quiz Creation Files (Temporary)
```
project-root/
├── add-[coursename]-week1-quiz.ts
├── add-[coursename]-week2-quiz.ts
├── ...
├── add-[coursename]-week10-quiz.ts
└── add-[coursename]-final-exam.ts
```

**Note:** Delete these after successful creation!

### Extracted Quiz Files (Keep for reference)
```
SFGM Orlando Courses/
└── ([X]) [Course Name]/
    └── Quiz/
        ├── 1/
        │   ├── Week 1 quiz.pdf
        │   └── Week 1 quiz_extracted.txt
        ├── 2/
        │   ├── Week 2 quiz.pdf
        │   └── Week 2 quiz_extracted.txt
        ...
        └── Final Exam/
            ├── Final Exam.pdf
            └── Final Exam_extracted.txt
```

---

## Database Schema Reference

### Quizzes Table
```typescript
{
  id: number              // Unique ID (e.g., 48)
  moduleId: number | null // Usually null for course quizzes
  title: string          // "Course Name — Week X Quiz"
  timeLimit: number      // Minutes (15 for weekly, 30 for final)
  passingScore: number   // Percentage (70)
  isFinalExam: boolean   // false for weekly, true for final
  isPublished: boolean   // true
  publishedAt: Date      // Current date/time
  createdAt: Date        // Auto-generated
}
```

### Quiz Questions Table
```typescript
{
  id: number              // Auto-generated
  quizId: number         // References quiz ID (e.g., 48)
  question: string       // Question text
  type: string           // 'multiple_choice'
  options: string[]      // Array of 4 options
  correctAnswer: string  // Must match one option exactly
  points: number         // Usually 1
  orderIndex: number     // 1-20 (or 1-50)
  isBonus: boolean       // Usually false
  parentQuestionId: null // Usually null
}
```

---

## Essay Integration (Final Exams)

### Automatic Essay Prompts

When `isFinalExam: true`, the system automatically shows an essay prompt after quiz completion.

### Course-Specific Essay Messages

File: `client/src/components/final-exam-completion.tsx`

Current prompts:
```typescript
case "becoming a fire starter":
  return {
    congratsMessage: "You've completed the journey to get on fire, stay on fire, and spread the fire!",
    essayPrompt: "Now tell us what this course did for you and what you got out of learning to be ignited by God's fire and spread it to others."
  };
```

**To add your course:**
```typescript
case "your course name":
  return {
    congratsMessage: "Your completion message here!",
    essayPrompt: "Your essay prompt here."
  };
```

### Essay Requirements
- Minimum 200 words
- Automatically tracked in `essays` table
- Requires instructor approval
- Students submit immediately after final exam

---

## Troubleshooting

### Quiz Not Found (404)
**Problem:** `http://localhost:56000/quiz/coursename-week-1` returns "Quiz Not Found"

**Solutions:**
1. Check `quizIdMap` in `server/routes.ts` - ensure mapping exists
2. Restart server to pick up route changes
3. Verify quiz exists: `curl http://localhost:56000/api/quizzes/coursename-week-1`
4. Check quiz ID is correct in database

### Quiz Not Showing on Course Page
**Problem:** Quiz cards don't appear on `http://localhost:56000/course/X`

**Solutions:**
1. Verify quiz filtering in `course-content-viewer.tsx`
2. Check quiz title includes correct course name
3. Verify `isPublished: true` in database
4. Check courseId matching logic

### Database Script Fails
**Problem:** `Error: Cannot find module './server/db'`

**Solutions:**
1. Ensure script is in project root: `/Users/rocky/Desktop/BostonMinistry/`
2. Check import paths are correct
3. Verify DATABASE_URL is set
4. Run from project root directory

### Duplicate ID Error
**Problem:** `Error: duplicate key value violates unique constraint`

**Solutions:**
1. Check quiz ID isn't already used
2. Query existing IDs: `SELECT id, title FROM quizzes ORDER BY id;`
3. Use next available ID in sequence
4. Update script with correct ID

### Wrong Number of Questions
**Problem:** Quiz shows 0 questions or wrong count

**Solutions:**
1. Verify `questions` array in script
2. Check `quizId` matches in all questions
3. Ensure script completed successfully
4. Query database: `SELECT COUNT(*) FROM quiz_questions WHERE quiz_id = X;`

---

## Quick Reference Commands

### Extract PDF
```bash
node extract-pdf.cjs "Week 1 quiz.pdf"
```

### Create Quiz
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/boston_ministry" npx tsx add-quiz-script.ts
```

### Verify Quiz
```bash
curl -s http://localhost:56000/api/quizzes/coursename-week-1 | jq
```

### Test All Quizzes
```bash
for i in {1..10}; do curl -s "http://localhost:56000/api/quizzes/coursename-week-$i" | jq -r '.title'; done
```

### Restart Server
```bash
pkill -f "tsx server/index.ts" && sleep 2 && npm run dev
```

---

## Success Checklist

- [ ] All PDF quizzes extracted successfully
- [ ] Quiz IDs determined and documented
- [ ] Database scripts created for all quizzes
- [ ] All scripts executed successfully
- [ ] `quizIdMap` updated in `server/routes.ts` (both locations)
- [ ] Server restarted to pick up new routes
- [ ] All quiz URLs tested and working
- [ ] Quiz filtering added to course-content-viewer.tsx
- [ ] Quiz URL generation updated for course
- [ ] All quizzes visible on course page
- [ ] "Take Quiz" buttons functional
- [ ] Final exam marked with `isFinalExam: true`
- [ ] Essay prompt configured (if needed)
- [ ] Temporary scripts deleted
- [ ] Documentation updated

---

## Example: Complete Fire Starter Implementation

### Quiz IDs Assigned
```
Week 1:  48 → firestarter-week-1
Week 2:  49 → firestarter-week-2
Week 3:  50 → firestarter-week-3
Week 4:  51 → firestarter-week-4
Week 5:  52 → firestarter-week-5
Week 6:  53 → firestarter-week-6
Week 7:  54 → firestarter-week-7
Week 8:  55 → firestarter-week-8
Week 9:  56 → firestarter-week-9
Week 10: 57 → firestarter-week-10
Final:   58 → firestarter-final-exam
```

### Routes Added
```typescript
'firestarter-week-1': 48,
'firestarter-week-2': 49,
// ... through week 10
'firestarter-final-exam': 58,
```

### Course Page Integration
```typescript
if (courseId === 2) {
  quizzes = allQuizzes.filter((q: any) => 
    q.title && q.title.includes('Fire Starter')
  );
}
```

### Result
- ✅ 11 quizzes created (10 weekly + 1 final)
- ✅ 250 total questions (200 weekly + 50 final)
- ✅ All accessible via URL
- ✅ All visible on course page
- ✅ Essay integration complete

---

## Notes

- Keep extracted quiz files for reference
- Delete database scripts after successful creation
- Always verify quizzes before publishing course
- Test quiz-taking flow end-to-end
- Document any course-specific quiz logic
- Update this template with improvements

---

**Last Updated:** October 9, 2025
**Version:** 1.0.0
**Author:** SFGM Boston Development Team

