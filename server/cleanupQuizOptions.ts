import { db } from "./db";
import { quizQuestions } from "@shared/schema";
import { eq } from 'drizzle-orm';

// Function to clean up quiz options by removing A, B, C, D prefixes
export async function cleanupQuizOptions() {
  try {
    // Get all multiple choice questions
    const questions = await db.select().from(quizQuestions);
    
    let updateCount = 0;
    
    for (const question of questions) {
      if (question.type === 'multiple_choice' && question.options) {
        const options = question.options as string[];
        let hasChanges = false;
        
        // Clean up options by removing A), B), C), D) prefixes
        const cleanOptions = options.map(option => {
          if (typeof option === 'string') {
            // Remove prefixes like "A) ", "B) ", "C) ", "D) "
            const cleaned = option.replace(/^[A-D]\)\s*/, '');
            if (cleaned !== option) {
              hasChanges = true;
            }
            return cleaned;
          }
          return option;
        });
        
        if (hasChanges) {
          await db
            .update(quizQuestions)
            .set({ options: cleanOptions })
            .where(eq(quizQuestions.id, question.id));
          
          updateCount++;
          console.log(`Updated question ${question.id}: ${question.question}`);
          console.log(`  Before: ${JSON.stringify(options)}`);
          console.log(`  After: ${JSON.stringify(cleanOptions)}`);
        }
      }
    }
    
    console.log(`\nCleanup completed. Updated ${updateCount} questions.`);
    return updateCount;
    
  } catch (error) {
    console.error('Error cleaning up quiz options:', error);
    throw error;
  }
}