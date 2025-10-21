// Quiz types for the application
export interface QuizData {
  id: number;
  title: string;
  description?: string;
  moduleName?: string;
  courseName?: string;
  courseId: number;
  moduleId?: number;
  timeLimit?: number;
  passingScore: number;
  isFinalExam?: boolean;
  isPublished: boolean;
  questionCount?: number;
  completed: boolean;
  bestScore?: number | null;
  attempts: number;
  createdAt: Date;
  publishedAt?: Date;
}

// Quiz question types
export interface QuizQuestion {
  id: number;
  quizId: number;
  question: string;
  options: string[];
  correctAnswer: string;
  type: 'multiple_choice' | 'essay';
  orderIndex: number;
}

// Quiz attempt types
export interface QuizAttempt {
  id: number;
  quizId: number;
  studentId: string;
  answers: Record<number, string>;
  score: number;
  submittedAt: Date;
  passed: boolean;
}
