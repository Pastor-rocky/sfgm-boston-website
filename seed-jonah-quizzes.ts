import { db } from "./server/db.js";
import { quizzes, quizQuestions } from "./shared/schema.js";
import fs from 'fs';
import path from 'path';

// Parse quiz text file into structured data
function parseQuizFile(filePath: string): { title: string; questions: any[] } {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').map(l => l.trim()).filter(l => l);

  const title = lines.find(l => l.includes('Week') || l.includes('quiz'))?.substring(0, 100) || 'Quiz';
  
  const questions: any[] = [];
  let currentQuestion: any = null;
  let optionIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect question number (support both "1." and "1)" formats)
    if (/^\d+[\.\)]\s*/.test(line) || /^Questions\s+\d+-\d+/.test(line)) {
      // Skip chapter headers
      if (line.includes('Chapter') || line.includes('Deep Depression')) {
        continue;
      }
      
      // Save previous question
      if (currentQuestion && currentQuestion.question) {
        questions.push(currentQuestion);
      }
      
      // Start new question
      currentQuestion = {
        question: line.replace(/^\d+[\.\)]\s*/, '').replace(/^Questions\s+\d+-\d+:\s*/, ''),
        options: [],
        correctAnswer: '',
        orderIndex: questions.length + 1
      };
      optionIndex = 0;
    }
    // Detect options (A, B, C, D) - support both uppercase and lowercase
    else if (/^[A-Da-d]\./.test(line) || /^[A-Da-d]\)/.test(line)) {
      const option = line.replace(/^[A-Da-d][.\)]\s*/, '').trim();
      if (option) {
        currentQuestion.options.push(option);
      }
    }
    // Detect correct answer (support both uppercase and lowercase)
    else if (line.includes('Correct Answer:') || line.includes('Answer:')) {
      const match = line.match(/(?:Correct Answer|Answer):\s*([A-Da-d])/i);
      if (match && currentQuestion) {
        currentQuestion.correctAnswer = match[1].toUpperCase();
      }
    }
    // Continue option text if we have fewer than 4 options
    else if (currentQuestion && currentQuestion.options && currentQuestion.options.length > 0 && currentQuestion.options.length < 4 && currentQuestion.options[currentQuestion.options.length - 1]) {
      // Continue the last option
      const lastOption = currentQuestion.options[currentQuestion.options.length - 1];
      currentQuestion.options[currentQuestion.options.length - 1] = lastOption + ' ' + line.trim();
    }
    // Continue question text
    else if (currentQuestion && !line.includes('Correct Answer')) {
      // Append to current question if it doesn't match other patterns
      if (line && !/^\d+\./.test(line) && !/^[A-D][.\)]/.test(line)) {
        currentQuestion.question += ' ' + line;
      }
    }
  }

  // Add last question
  if (currentQuestion && currentQuestion.question) {
    questions.push(currentQuestion);
  }

  return { title, questions };
}

async function seedJonahQuizzes() {
  try {
    console.log('📝 Seeding Jonah course quizzes...\n');

    const quizFiles = [
      { week: 1, file: 'client/src/pages/content/quizzes/jonah/week-1-quiz-don-t-be-a-jonah-pdf.txt' },
      { week: 2, file: 'client/src/pages/content/quizzes/jonah/week-2-quiz-don-t-be-a-jonah-pdf.txt' },
      { week: 3, file: 'client/src/pages/content/quizzes/jonah/week-3-quiz-don-t-be-a-jonah-pdf.txt' },
      { week: 4, file: 'client/src/pages/content/quizzes/jonah/week-4-quiz-don-t-be-a-jonah-pdf.txt' },
      { week: 5, file: 'client/src/pages/content/quizzes/jonah/week-5-quiz-don-t-be-a-jonah-pdf.txt' },
      { week: 6, file: 'client/src/pages/content/quizzes/jonah/week-6-quiz-don-t-be-a-jonah-pdf.txt' },
      { week: 7, file: 'client/src/pages/content/quizzes/jonah/week-7-quiz-don-t-be-a-jonah-pdf.txt' },
      { week: 8, file: 'client/src/pages/content/quizzes/jonah/week-8-quiz-don-t-be-a-jonah-pdf.txt' },
      { week: 9, file: 'client/src/pages/content/quizzes/jonah/week-9-quiz-don-t-be-a-jonah-pdf.txt' },
      { week: 10, file: 'client/src/pages/content/quizzes/jonah/week-10-quiz-don-t-be-a-jonah-pdf.txt' },
      { week: 11, file: 'client/src/pages/content/quizzes/jonah/week-11-quiz-don-t-be-a-jonah-pdf.txt' },
      { week: 'final', file: 'client/src/pages/content/quizzes/jonah/-dbaj-final-exam-pdf.txt', isFinal: true },
    ];

    for (const { week, file, isFinal } of quizFiles) {
      const filePath = path.join(process.cwd(), file);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${file}`);
        continue;
      }

      let title, questions;
      try {
        const parsed = parseQuizFile(filePath);
        title = parsed.title;
        questions = parsed.questions;
      } catch (err) {
        console.log(`   ⚠️  Error parsing file: ${err}`);
        continue;
      }
      
      // Create quiz
      const quizTitle = isFinal 
        ? "Don't Be a Jonah - Final Exam" 
        : `Don't Be a Jonah - Week ${week}`;
      
      const [quiz] = await db.insert(quizzes).values({
        title: quizTitle,
        passingScore: 70,
        timeLimit: isFinal ? 120 : 60,
        isFinalExam: !!isFinal,
        isPublished: true
      }).returning();

      console.log(`✅ Created quiz: ${quizTitle} (ID: ${quiz.id})`);

      // Insert questions
      for (let q of questions) {
        if (q && q.options && q.options.length >= 4 && q.correctAnswer) {
          try {
            await db.insert(quizQuestions).values({
              quizId: quiz.id,
              question: q.question,
              type: 'multiple_choice',
              options: q.options,
              correctAnswer: q.correctAnswer,
              points: 1,
              orderIndex: q.orderIndex,
              isBonus: false
            });
          } catch (err) {
            console.log(`   ⚠️  Skipped invalid question: ${q.question?.substring(0, 50)}...`);
          }
        }
      }
      
      console.log(`   Added ${questions.filter(q => q.options.length >= 4).length} questions\n`);
    }

    console.log('🎉 Jonah quizzes seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding quizzes:', error);
    throw error;
  }
}

seedJonahQuizzes()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
