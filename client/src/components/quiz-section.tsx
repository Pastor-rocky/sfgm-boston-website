import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { QuizData } from '@/types/quiz';

// Using QuizData from types/quiz.ts

export default function QuizSection() {
  // Fetch quiz data from API
  const { data: quizzes = [], isLoading } = useQuery<QuizData[]>({
    queryKey: ['/api/student/quizzes'],
  });

  const pendingQuizzes = quizzes.filter((quiz: QuizData) => !quiz.completed);
  const completedQuizzes = quizzes.filter((quiz: QuizData) => quiz.completed);

  const getQuizStatus = (quiz: QuizData) => {
    if (quiz.completed && quiz.bestScore! >= quiz.passingScore) return 'passed';
    if (quiz.completed && quiz.bestScore! < quiz.passingScore) return 'failed';
    if (quiz.attempts > 0) return 'retake';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'retake': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'passed': return 'Passed';
      case 'failed': return 'Needs Retake';
      case 'retake': return 'In Progress';
      default: return 'Available';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quizzes...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">

      {/* Recent Completed Quizzes */}
      {completedQuizzes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <i className="fas fa-trophy mr-2 text-green-600"></i>
              Recent Completions
            </CardTitle>
            <CardDescription>
              Your recently completed quizzes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedQuizzes.slice(0, 2).map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface QuizCardProps {
  quiz: QuizData;
}

function QuizCard({ quiz }: QuizCardProps) {
  const getQuizStatus = (quiz: QuizData) => {
    if (quiz.completed && quiz.bestScore! >= quiz.passingScore) return 'passed';
    if (quiz.completed && quiz.bestScore! < quiz.passingScore) return 'failed';
    if (quiz.attempts > 0) return 'retake';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'retake': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'passed': return 'Passed';
      case 'failed': return 'Needs Retake';
      case 'retake': return 'In Progress';
      default: return 'Available';
    }
  };

  const status = getQuizStatus(quiz);

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-medium text-gray-900">{quiz.title}</h4>
          <Badge className={`${getStatusColor(status)} border text-xs`}>
            {getStatusText(status)}
          </Badge>
          {quiz.isFinalExam && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
              Final Exam
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{quiz.courseName} - {quiz.moduleName}</p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span><i className="fas fa-question-circle mr-1"></i>{quiz.questionCount} questions</span>
          <span><i className="fas fa-clock mr-1"></i>{quiz.timeLimit} min</span>
          <span><i className="fas fa-target mr-1"></i>{quiz.passingScore}% to pass</span>
          {quiz.bestScore !== null && quiz.bestScore !== undefined && (
            <span className={quiz.bestScore >= quiz.passingScore ? 'text-green-600' : 'text-red-600'}>
              <i className="fas fa-star mr-1"></i>Best: {quiz.bestScore}%
            </span>
          )}
        </div>

        {quiz.bestScore !== null && (
          <div className="mt-2">
            <Progress 
              value={quiz.bestScore} 
              className="h-1"
            />
          </div>
        )}
      </div>

      <div className="ml-4">
        <Link href={`/quiz/${quiz.id}`}>
          <PrerequisiteQuizButton quiz={quiz} status={status} />
        </Link>
      </div>
    </div>
  );
}

// Prerequisite Quiz Button Component
interface PrerequisiteQuizButtonProps {
  quiz: QuizData;
  status: string;
}

function PrerequisiteQuizButton({ quiz, status }: PrerequisiteQuizButtonProps) {
  const { toast } = useToast();
  
  // Prerequisites removed - all quizzes are freely accessible

  const canAccess = true; // Prerequisites removed - all content accessible

  if (!canAccess) {
    return (
      <Button 
        size="sm"
        variant="outline"
        disabled
        onClick={() => {
          toast({
            title: 'Quiz Locked',
            description: 'Complete all videos and readings to unlock this quiz.',
            variant: 'destructive',
          });
        }}
        className="bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
      >
        <i className="fas fa-lock mr-2"></i>
        Locked
      </Button>
    );
  }

  return (
    <Button 
      size="sm"
      className={
        status === 'passed' 
          ? 'bg-green-600 hover:bg-green-700' 
          : status === 'failed' || status === 'retake'
          ? 'bg-orange-600 hover:bg-orange-700'
          : 'bg-blue-600 hover:bg-blue-700'
      }
    >
      {status === 'passed' 
        ? 'Review' 
        : status === 'failed' || status === 'retake'
        ? 'Retake'
        : 'Start'
      }
    </Button>
  );
}