import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation } from 'wouter';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';


interface ContentProgressItem {
  id: number;
  studentId: string;
  courseId: number;
  contentType: 'video' | 'reading' | 'quiz';
  contentId: number;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
}

interface CourseVideo {
  id: number;
  courseId: number;
  title: string;
  description: string | null;
  videoUrl: string | null;
  duration: number | null;
  orderIndex: number;
  isRequired: boolean;
  isPublished: boolean;
}

interface CourseReading {
  id: number;
  courseId: number;
  title: string;
  description: string | null;
  readingType: 'text' | 'book_chapter' | 'external_link';
  content: string | null;
  bookTitle: string | null;
  bookAuthor: string | null;
  bookCoverUrl: string | null;
  chapterNumber: number | null;
  chapterTitle: string | null;
  pageRange: string | null;
  externalUrl: string | null;
  pdfUrl: string | null;
  hasAudioOption: boolean;
  audioUrl: string | null;
  estimatedTime: number | null;
  orderIndex: number;
  isRequired: boolean;
  isPublished: boolean;
}

interface Quiz {
  id: number;
  courseId: number;
  title: string;
  description: string | null;
  timeLimit: number | null;
  passingScore: number;
  isPublished: boolean;
  isFinalExam: boolean;
  orderIndex: number;
  questions: number;
}

interface QuizAttempt {
  id: number;
  studentId: string;
  quizId: number;
  score: number;
  completedAt: string;
  timeSpent: number;
  passed: boolean;
}

interface CourseContentViewerProps {
  courseId: number;
}

export default function CourseContentViewer({ courseId }: CourseContentViewerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  // For course 4 (G.R.O.W), start with readings tab since there are no videos
  const [activeTab, setActiveTab] = useState(courseId === 4 ? 'readings' : 'videos');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<CourseVideo | null>(null);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // Helper function to create progress tracking for readings
  const createReadingProgressHandler = (contentId: number, action: () => void) => {
    return async () => {
      try {
        await progressMutation.mutateAsync({
          courseId,
          contentType: 'reading',
          contentId,
          completed: true
        });
      } catch (error) {
        console.error('Failed to update reading progress:', error);
      }
      action();
    };
  };

  // Fetch course content
  const { data: videos = [], isLoading: videosLoading } = useQuery<CourseVideo[]>({
    queryKey: [`/api/courses/${courseId}/videos`],
    enabled: !!courseId,
  });

  const { data: readings = [], isLoading: readingsLoading, error: readingsError, refetch: refetchReadings } = useQuery<CourseReading[]>({
    queryKey: [`/api/courses/${courseId}/readings`],
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });


  const { data: allQuizzes = [], isLoading: allQuizzesLoading, error: quizzesError, refetch: refetchQuizzes } = useQuery<Quiz[]>({
    queryKey: [`/api/student/quizzes/all`],
    enabled: !!courseId,
    retry: 1,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });



  // Debug API errors
  if (quizzesError) {
    console.error('Quiz API error:', quizzesError);
  }

  // Filter quizzes for the current course
  let quizzes = allQuizzes.filter((q: any) => q.courseId === courseId);
  
  // Special handling for Acts in Action course (courseId = 1)
  // Since quizzes aren't linked to courses, we need to filter by title pattern
  if (courseId === 1) {
    quizzes = allQuizzes.filter((q: any) => 
      q.title && (q.title.includes('Acts in Action') || q.title.includes('Acts Week'))
    );
  }
  
  // Special handling for Fire Starter course (courseId = 2)
  if (courseId === 2) {
    quizzes = allQuizzes.filter((q: any) => 
      q.title && q.title.includes('Fire Starter')
    );
  }
  
  // Special handling for Don't Be a Jonah course (courseId = 3)
  if (courseId === 3) {
    quizzes = allQuizzes.filter((q: any) => 
      q.title && (q.title.includes('Jonah') || q.title.includes('DBAJ'))
    );
  }
  
  // Special handling for Studying for Service course (courseId = 5)
  if (courseId === 5) {
    quizzes = allQuizzes.filter((q: any) => 
      q.title && q.title.includes('Studying for Service')
    );
  }
  
  // Special handling for G.R.O.W course (courseId = 4)
  if (courseId === 4) {
    quizzes = allQuizzes.filter((q: any) => 
      q.title && q.title.includes('G.R.O.W')
    );
  }
  
  // Special handling for Deacon Course (courseId = 6)
  if (courseId === 6) {
    quizzes = allQuizzes.filter((q: any) => 
      q.title && q.title.includes('Deacon Course')
    );
  }
  
  // Special handling for Level Up Leadership Course (courseId = 7)
  if (courseId === 7) {
    quizzes = allQuizzes.filter((q: any) => 
      q.title && q.title.includes('Level Up Leadership')
    );
  }
  
  // Special handling for Youth Ministry Course (courseId = 8)
  if (courseId === 8) {
    quizzes = allQuizzes.filter((q: any) => 
      q.title && q.title.includes('Youth Ministry')
    );
  }
  
  // Quiz filtering complete

  // Fetch student progress
  const { data: contentProgress = [], isLoading: contentProgressLoading, error: contentProgressError, refetch: refetchProgress } = useQuery<ContentProgressItem[]>({
    queryKey: [`/api/content-progress/${courseId}`],
    enabled: !!courseId
  });

  // Manual completion tracking for G.R.O.W course cache issues
  const [manualCompletions, setManualCompletions] = useState<{[key: string]: boolean}>({});

  // Load manual completions from API once
  React.useEffect(() => {
    if (courseId === 4 && Object.keys(manualCompletions).length === 0) {
      const loadManualCompletions = async () => {
        const token = localStorage.getItem('auth_token');
        if (!token) return;
        
        try {
          const response = await fetch(`/api/content-progress/${courseId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          
          if (Array.isArray(data)) {
            const completions: {[key: string]: boolean} = {};
            data.forEach((item: any) => {
              if (item.completed) {
                const key = `${item.contentType}-${item.contentId}`;
                completions[key] = true;
              }
            });
            setManualCompletions(completions);
            // Manual completions loaded
          }
        } catch (error) {
          console.error('Failed to load manual completions:', error);
        }
      };
      
      loadManualCompletions();
    }
  }, [courseId, manualCompletions]);

  // Content progress tracking complete

  // Content progress tracking

  // Fetch quiz attempts for this course with manual authentication
  const { data: quizAttempts = [], isLoading: attemptsLoading, error: attemptsError } = useQuery<QuizAttempt[]>({
    queryKey: [`/api/quiz-attempts/course/${courseId}`],
    enabled: courseId !== null && courseId !== undefined && courseId >= 0, // Enable for courseId 0
    retry: 1,
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes (shorter for quiz attempts)
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    queryFn: async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('No auth token');
      
      const response = await fetch(`/api/quiz-attempts/course/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    }
  });

  
  // Quiz attempts loaded successfully

  // Prerequisites removed - all content is freely accessible

  // Progress tracking mutation
  const progressMutation = useMutation({
    mutationFn: async (data: {
      courseId: number;
      contentType: 'video' | 'reading' | 'quiz';
      contentId: number;
      completed: boolean;
    }) => {
      return apiRequest('POST', '/api/content-progress', data);
    },
    onSuccess: async () => {
      
      // Force refresh content progress
      refetchProgress();
      
      // Prerequisites removed - no need to invalidate
      
      // Force refresh the readings data as well
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${courseId}/readings`] });
    },
    onError: (error) => {
      console.error('Progress mutation failed:', error);
      console.error('Full error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    },
  });

  const handleContentComplete = async (contentType: 'video' | 'reading' | 'quiz', contentId: number) => {
    try {
      await progressMutation.mutateAsync({
        courseId,
        contentType,
        contentId,
        completed: true,
      });
      toast({
        title: 'Progress Updated',
        description: `${contentType === 'video' ? 'Video' : contentType === 'reading' ? 'Reading' : 'Quiz'} marked as complete!`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update progress',
        variant: 'destructive',
      });
    }
  };

  const isContentCompleted = (contentType: 'video' | 'reading' | 'quiz', contentId: number) => {
    // For G.R.O.W course, use manual completions as fallback
    if (courseId === 4) {
      const manualKey = `${contentType}-${contentId}`;
      const manualCompletion = manualCompletions[manualKey];
      if (manualCompletion) return true;
    }
    
    return contentProgress.some(
      (p) => p.contentType === contentType && p.contentId === contentId && p.completed
    );
  };

  // Get quiz attempt for a specific quiz
  const getQuizAttempt = (quizId: number) => {
    return quizAttempts.find((attempt: QuizAttempt) => attempt.quizId === quizId);
  };

  // Check if quiz was passed
  const isQuizPassed = (quizId: number, passingScore: number) => {
    const attempt = getQuizAttempt(quizId);
    return attempt ? attempt.score >= passingScore : false;
  };

  // Get congratulations message
  const getCongratulationsMessage = (score: number, passingScore: number) => {
    const percentage = Math.round(score);
    if (percentage >= 90) {
      return `🎉 Excellent work! You scored ${percentage}% - Outstanding performance!`;
    } else if (percentage >= passingScore) {
      return `🎊 Congratulations! You passed with ${percentage}% - Great job!`;
    } else {
      return `📚 You scored ${percentage}%. Keep studying to reach the ${passingScore}% passing score.`;
    }
  };

  const getCompletionStats = () => {
    const publishedVideos = videos.filter((v: CourseVideo) => v.isPublished);
    const publishedReadings = readings.filter((r: CourseReading) => r.isPublished);
    // Use all quizzes for this course (they come from the quiz system, not course structure)
    const totalQuizzes = quizzes.length;
    
    const completedVideos = publishedVideos.filter((v: CourseVideo) => 
      isContentCompleted('video', v.id)
    ).length;
    
    const completedReadings = publishedReadings.filter((r: CourseReading) => 
      isContentCompleted('reading', r.id)
    ).length;
    
    // Count completed quizzes based on actual quiz attempts with passing scores
    const completedQuizzes = quizzes.filter((q: any) => 
      q.completed && q.bestScore >= q.passingScore
    ).length;

    // Special handling for Acts in Action course (courseId = 1)
    if (courseId === 1) {
      // For Acts in Action, we have 21 total readings (3 per week × 10 weeks + 1 final)
      const totalReadings = 21; // All individual readings across all weeks
      const totalQuizzesForCourse = 11; // 10 weekly quizzes + 1 final exam
      const totalVideosForCourse = 10; // 10 weeks of video content
      
      // Count completed readings for Acts in Action
      const completedReadingsForActs = contentProgress.filter((p: any) => 
        p.contentType === 'reading' && p.completed
      ).length;
      
      // Count completed quizzes for Acts in Action - use the actual quiz data
      const completedQuizzesForActs = quizzes.filter((q: any) => 
        q.attempts > 0 && q.bestScore !== null && (parseFloat(q.bestScore) * 100) >= (q.passingScore || 70)
      ).length;
      
      return {
        videos: { completed: completedVideos, total: totalVideosForCourse },
        readings: { completed: completedReadingsForActs, total: totalReadings },
        quizzes: { completed: completedQuizzesForActs, total: totalQuizzesForCourse },
      };
    }
    
    // Special handling for Fire Starter course (courseId = 2)
    if (courseId === 2) {
      // For Fire Starter, we have 20 readings (textbook chapters)
      const totalReadings = 20; // 20 textbook chapters
      const totalQuizzesForCourse = 11; // 10 weekly quizzes + 1 final exam
      const totalVideosForCourse = 10; // 10 weeks (no actual videos, but show as 10 weeks)
      
      // Count completed readings from content progress
      const completedReadingsForFireStarter = contentProgress.filter((p: any) => 
        p.contentType === 'reading' && p.completed
      ).length;
      
      // Count completed quizzes - use the actual quiz data
      const completedQuizzesForFireStarter = quizzes.filter((q: any) => 
        q.attempts > 0 && q.bestScore !== null && (parseFloat(q.bestScore) * 100) >= (q.passingScore || 70)
      ).length;
      
      return {
        videos: { completed: 0, total: 10 }, // Show 0/10 for 10 weeks
        readings: { completed: completedReadingsForFireStarter, total: totalReadings },
        quizzes: { completed: completedQuizzesForFireStarter, total: totalQuizzesForCourse },
      };
    }
    
    // Special handling for Don't Be a Jonah course (courseId = 3)
    if (courseId === 3) {
      // For Don't Be a Jonah, we have 22 total readings (11 textbook chapters + 11 Bible chapters)
      const totalReadings = 22; // 22 total readings (2 per week × 11 weeks)
      const totalQuizzesForCourse = 12; // 11 weekly quizzes + 1 final exam
      const totalVideosForCourse = 5; // 5 video lessons
      
      // Count completed readings from content progress
      const completedReadingsForJonah = contentProgress.filter((p: any) => 
        p.contentType === 'reading' && p.completed
      ).length;
      
      // Count completed quizzes - use the actual quiz data
      const completedQuizzesForJonah = quizzes.filter((q: any) => 
        q.attempts > 0 && q.bestScore !== null && (parseFloat(q.bestScore) * 100) >= (q.passingScore || 70)
      ).length;
      
      return {
        videos: { completed: completedVideos, total: totalVideosForCourse },
        readings: { completed: completedReadingsForJonah, total: totalReadings },
        quizzes: { completed: completedQuizzesForJonah, total: totalQuizzesForCourse },
      };
    }
    
    // Special handling for Studying for Service course (courseId = 5)
    if (courseId === 5) {
      // For Studying for Service, we have 24 total readings (12 weeks × 2 readings per week)
      const totalReadings = 24; // 24 total readings (2 per week × 12 weeks)
      const totalQuizzesForCourse = 13; // 12 weekly quizzes + 1 final exam (estimated)
      const totalVideosForCourse = 11; // 11 video lessons
      
      // Count completed readings from content progress
      const completedReadingsForStudying = contentProgress.filter((p: any) => 
        p.contentType === 'reading' && p.completed
      ).length;
      
      // Count completed quizzes - use the actual quiz data
      const completedQuizzesForStudying = quizzes.filter((q: any) => 
        q.attempts > 0 && q.bestScore !== null && (parseFloat(q.bestScore) * 100) >= (q.passingScore || 70)
      ).length;
      
      return {
        videos: { completed: completedVideos, total: totalVideosForCourse },
        readings: { completed: completedReadingsForStudying, total: totalReadings },
        quizzes: { completed: completedQuizzesForStudying, total: totalQuizzesForCourse },
      };
    }

    // Special handling for Level Up Leadership course (courseId = 7)
    if (courseId === 7) {
      // For Level Up Leadership, we have 6 total readings (6 weeks × 1 reading per week)
      const totalReadings = 6; // 6 total readings (1 per week × 6 weeks)
      const totalQuizzesForCourse = 6; // 6 quizzes total (no final exam for Level Up Leadership)
      const totalVideosForCourse = 7; // 7 video lessons
      
      // Count completed readings from content progress
      const completedReadingsForLeadership = contentProgress.filter((p: any) => 
        p.contentType === 'reading' && p.completed
      ).length;
      
      // Count completed quizzes - use the actual quiz data
      const completedQuizzesForLeadership = quizzes.filter((q: any) => 
        q.attempts > 0 && q.bestScore !== null && (parseFloat(q.bestScore) * 100) >= (q.passingScore || 70)
      ).length;
      
      return {
        videos: { completed: completedVideos, total: totalVideosForCourse },
        readings: { completed: completedReadingsForLeadership, total: totalReadings },
        quizzes: { completed: completedQuizzesForLeadership, total: totalQuizzesForCourse },
      };
    }
    
    // Special handling for Deacon Course (courseId = 6)
    if (courseId === 6) {
      const totalReadings = 5; // 5 chapters of readings
      const totalQuizzesForCourse = 6; // 5 weekly quizzes + 1 final exam
      const totalVideosForCourse = 0; // No videos
      
      const completedReadingsForDeacon = contentProgress.filter((p: any) => 
        p.contentType === 'reading' && p.completed
      ).length;
      
      const completedQuizzesForDeacon = quizzes.filter((q: any) => 
        q.attempts > 0 && q.bestScore !== null && (parseFloat(q.bestScore) * 100) >= (q.passingScore || 70)
      ).length;
      
      return {
        videos: { completed: 0, total: 0 },
        readings: { completed: completedReadingsForDeacon, total: totalReadings },
        quizzes: { completed: completedQuizzesForDeacon, total: totalQuizzesForCourse },
      };
    }
    
    // Special handling for Youth Ministry Course (courseId = 8)
    if (courseId === 8) {
      const totalReadings = 5; // 5 chapters of readings
      const totalQuizzesForCourse = 6; // 5 weekly quizzes + 1 final exam
      const totalVideosForCourse = 0; // No videos
      
      const completedReadingsForYouth = contentProgress.filter((p: any) => 
        p.contentType === 'reading' && p.completed
      ).length;
      
      const completedQuizzesForYouth = quizzes.filter((q: any) => 
        q.attempts > 0 && q.bestScore !== null && (parseFloat(q.bestScore) * 100) >= (q.passingScore || 70)
      ).length;
      
      return {
        videos: { completed: 0, total: 0 },
        readings: { completed: completedReadingsForYouth, total: totalReadings },
        quizzes: { completed: completedQuizzesForYouth, total: totalQuizzesForCourse },
      };
    }
    
    // Special handling for G.R.O.W course (courseId = 4)
    if (courseId === 4) {
      // For G.R.O.W, we have 4 total readings (4 weeks × 1 audiobook per week)
      const totalReadings = 4; // 4 total readings (1 audiobook per week × 4 weeks)
      const totalQuizzesForCourse = 5; // 4 weekly quizzes + 1 final exam
      const totalVideosForCourse = 0; // No videos
      
      // Count completed readings from content progress
      const completedReadingsForGrow = contentProgress.filter((p: any) => 
        p.contentType === 'reading' && p.completed
      ).length;
      
      // Count completed quizzes - use the actual quiz data
      const completedQuizzesForGrow = quizzes.filter((q: any) => 
        q.attempts > 0 && q.bestScore !== null && (parseFloat(q.bestScore) * 100) >= (q.passingScore || 70)
      ).length;
      
      return {
        videos: { completed: 0, total: 0 }, // No videos for G.R.O.W
        readings: { completed: completedReadingsForGrow, total: totalReadings },
        quizzes: { completed: completedQuizzesForGrow, total: totalQuizzesForCourse },
      };
    }

    return {
      videos: { completed: completedVideos, total: publishedVideos.length },
      readings: { completed: completedReadings, total: publishedReadings.length },
      quizzes: { completed: completedQuizzes, total: totalQuizzes },
    };
  };


  // Extract week number from content title
  const extractWeekNumber = (title: string) => {
    // Handle reflection essay - should be treated as week 12 (requires ALL course completion)
    if (title.toLowerCase().includes('reflection essay')) {
      return 12;
    }
    
    // Handle final exam - should be treated as week 11 (after all regular weeks)
    if (title.toLowerCase().includes('final exam')) {
      return 11;
    }
    
    // Look for "Week X" pattern
    const weekMatch = title.match(/Week (\d+)/i);
    if (weekMatch) {
      return parseInt(weekMatch[1]);
    }
    
    // For videos and readings without explicit week numbers, 
    // we'll use orderIndex to determine week number
    // orderIndex 0-9 = Week 1, 10-19 = Week 2, etc.
    // This is a fallback for content that doesn't have "Week X" in title
    return 1; // Default to Week 1 if no pattern found
  };

  // All content is freely accessible - no progression restrictions
  const canAccessWeek = (weekNumber: number) => {
    return true; // Always accessible
  };

  // All readings are freely accessible - no restrictions
  const canAccessReadings = (weekNumber: number) => {
    return true; // Always accessible
  };


  // All quizzes are freely accessible - no restrictions
  const canAccessQuiz = (weekNumber: number, isFinalExam: boolean = false) => {
    if (isFinalExam) {
      // For final exam, check if all course content is completed
      const totalVideos = videos.length;
      const totalReadings = courseId === 1 ? 21 : readings.length; // Course 1 has 21 hardcoded readings
      const totalQuizzes = allQuizzes.filter((q: any) => !q.isFinalExam).length;
      
      const completedVideos = contentProgress.filter((p: any) => 
        p.contentType === 'video' && p.completed
      ).length;
      
      const completedReadings = contentProgress.filter((p: any) => 
        p.contentType === 'reading' && p.completed
      ).length;
      
      const completedQuizzes = quizAttempts.length;
      
      // Final exam unlocks only when all videos, readings, and quizzes are completed
      return completedVideos === totalVideos && 
             completedReadings === totalReadings && 
             completedQuizzes === totalQuizzes;
    }
    
    return true; // Regular quizzes are always accessible
  };

  // Get the completion message for locked content
  // Get the completion message for content
  const getCompletionMessage = (weekNumber: number, contentType: 'video' | 'reading' | 'quiz' = 'video') => {
    return "Content is freely accessible";
  };

  // Check if a week is fully completed (all videos + readings + quiz with passing score)
  // Simplified completion checking - no longer needed for progression
  const isWeekFullyCompleted = (weekNumber: number) => {
    return true; // Always consider weeks completed for display purposes
  };

  const stats = getCompletionStats();

  if (videosLoading || readingsLoading || allQuizzesLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <i className="fas fa-chart-line text-blue-600"></i>
            Course Progress
          </CardTitle>
          <CardDescription>
            All content is freely accessible
          </CardDescription>
        </CardHeader>
        <CardContent>
      <div className={`grid grid-cols-1 ${(courseId === 4 || courseId === 6 || courseId === 8) ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
        {courseId !== 4 && courseId !== 6 && courseId !== 8 && (
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.videos.completed}/{stats.videos.total}
            </div>
            <div className="text-sm text-gray-600">Videos Completed</div>
            <Progress 
              value={stats.videos.total > 0 ? (stats.videos.completed / stats.videos.total) * 100 : 0} 
              className="mt-2"
            />
          </div>
        )}
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.readings.completed}/{stats.readings.total}
              </div>
              <div className="text-sm text-gray-600">Readings Completed</div>
              <Progress 
                value={stats.readings.total > 0 ? (stats.readings.completed / stats.readings.total) * 100 : 0} 
                className="mt-2"
              />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.quizzes.completed}/{stats.quizzes.total}
              </div>
              <div className="text-sm text-gray-600">Quizzes Completed</div>
              <Progress 
                value={stats.quizzes.total > 0 ? (stats.quizzes.completed / stats.quizzes.total) * 100 : 0} 
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className={`grid w-full ${(courseId === 4 || courseId === 6 || courseId === 8) ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {courseId !== 4 && courseId !== 6 && courseId !== 8 && (
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <i className="fas fa-video"></i>
            Videos ({stats.videos.completed}/{stats.videos.total})
          </TabsTrigger>
        )}
        <TabsTrigger value="readings" className="flex items-center gap-2">
          <i className="fas fa-book"></i>
          Readings ({stats.readings.completed}/{stats.readings.total})
        </TabsTrigger>
        <TabsTrigger value="quizzes" className="flex items-center gap-2">
          <i className="fas fa-quiz"></i>
          Quizzes ({stats.quizzes.completed}/{stats.quizzes.total})
        </TabsTrigger>
      </TabsList>

        {courseId !== 0 && (
          <TabsContent value="videos" className="space-y-4">
            {courseId === 3 ? (
              // Special video schedule for Don't Be a Jonah course
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(weekNumber => {
                  const hasVideo = [1, 3, 5, 7, 9].includes(weekNumber);
                  const video = videos.find(v => {
                    const videoWeek = extractWeekNumber(v.title);
                    return videoWeek === weekNumber || (weekNumber === 1 && v.orderIndex === 1);
                  });
                  const isAccessible = canAccessWeek(weekNumber);
                  const isCompleted = video && isContentCompleted('video', video.id);
                  
                  return (
                    <Card key={weekNumber} className={`border-l-4 ${isAccessible ? 'border-blue-500' : 'border-gray-300'} h-56 sm:h-44 flex flex-col ${!isAccessible ? 'opacity-60' : ''}`}>
                      <CardHeader className="flex-shrink-0 pb-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="flex items-center gap-2 text-sm">
                              <i className={`fas ${hasVideo ? 'fa-play' : 'fa-video-slash'} ${isAccessible ? 'text-blue-600' : 'text-gray-400'}`}></i>
                              Don't Be a Jonah - Week {weekNumber}
                              {!isAccessible && (
                                <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                                  <i className="fas fa-lock mr-1"></i>
                                  Available
                                </Badge>
                              )}
                              {isAccessible && isCompleted && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                  Completed
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {hasVideo ? 'Video lesson available' : 'No video for this week'}
                            </CardDescription>
                          </div>
                          {video?.duration && (
                            <span className="text-xs text-gray-500 ml-2">
                              <i className="fas fa-clock mr-1"></i>
                              {video.duration} min
                            </span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex items-end pb-2">
                        <div className="flex items-center gap-2 w-full">
                          {hasVideo && isAccessible ? (
                            <Button
                              onClick={() => {
                                if (video?.videoUrl) {
                                  setCurrentVideo(video);
                                  setVideoModalOpen(true);
                                  progressMutation.mutateAsync({
                                    courseId,
                                    contentType: 'video',
                                    contentId: video.id,
                                    completed: true
                                  }).then(() => {
                                    queryClient.invalidateQueries({ queryKey: [`/api/content-progress/${courseId}`] });
                                  }).catch(error => {
                                    console.error('Failed to update video progress:', error);
                                    toast({
                                      title: 'Error',
                                      description: 'Failed to mark video as complete',
                                      variant: 'destructive',
                                    });
                                  });
                                } else {
                                  toast({
                                    title: 'Video Not Available',
                                    description: 'This video has not been uploaded yet.',
                                    variant: 'destructive',
                                  });
                                }
                              }}
                              className="flex items-center gap-2"
                              size="sm"
                            >
                              <i className="fas fa-play"></i>
                              Watch Video
                            </Button>
                          ) : !hasVideo ? (
                            <Button
                              variant="outline"
                              className="flex items-center gap-2 "
                              size="sm"
                            >
                              <i className="fas fa-video-slash"></i>
                              No Video This Week
                            </Button>
                          ) : null}
                          {!isAccessible && (
                            <Button
                              variant="outline"
                              className="flex items-center gap-2 "
                              size="sm"
                            >
                              <i className="fas fa-lock"></i>
                              {getCompletionMessage(weekNumber, 'reading')}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : courseId === 7 ? (
              // Level Up Leadership Course Videos
              <div className="space-y-4">
                {videos.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <i className="fas fa-video text-4xl text-gray-400 mb-4"></i>
                      <p className="text-gray-600">No videos available yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  videos
                    .sort((a: CourseVideo, b: CourseVideo) => a.orderIndex - b.orderIndex)
                    .map((video: CourseVideo) => {
                      let weekNumber = extractWeekNumber(video.title);
                      if (weekNumber === 1 && !video.title.toLowerCase().includes('week')) {
                        weekNumber = video.orderIndex + 1;
                      }
                      const isAccessible = canAccessWeek(weekNumber);
                      return (
                        <Card key={video.id} className={`border-l-4 border-purple-500 h-56 sm:h-44 flex flex-col`}>
                          <CardHeader className="flex-shrink-0 pb-1">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="flex items-center gap-2 text-sm">
                                  <i className={`fas fa-play text-purple-600`}></i>
                                  {video.title}
                                  {isContentCompleted('video', video.id) && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                      Completed
                                    </Badge>
                                  )}
                                </CardTitle>
                                {video.description && (
                                  <CardDescription className="text-xs mt-1">
                                    {video.description}
                                  </CardDescription>
                                )}
                              </div>
                              {video?.duration && (
                                <span className="text-xs text-gray-500 ml-2">
                                  <i className="fas fa-clock mr-1"></i>
                                  {video.duration} min
                                </span>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1 flex items-end pb-2">
                            <div className="flex items-center gap-2 w-full">
                              <Button
                                onClick={() => {
                                  if (video?.videoUrl) {
                                    setCurrentVideo(video);
                                    setVideoModalOpen(true);
                                    progressMutation.mutateAsync({
                                      courseId,
                                      contentType: 'video',
                                      contentId: video.id,
                                      completed: true
                                    }).then(() => {
                                      queryClient.invalidateQueries({ queryKey: [`/api/content-progress/${courseId}`] });
                                    }).catch(error => {
                                      console.error('Failed to update video progress:', error);
                                      toast({
                                        title: 'Error',
                                        description: 'Failed to mark video as complete',
                                        variant: 'destructive',
                                      });
                                    });
                                  } else {
                                    toast({
                                      title: 'Video Not Available',
                                      description: 'This video has not been uploaded yet.',
                                      variant: 'destructive',
                                    });
                                  }
                                }}
                                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                                size="sm"
                              >
                                <i className="fas fa-play"></i>
                                Watch Video
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                )}
              </div>
            ) : (
              // Default video rendering for other courses
              videos.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <i className="fas fa-video text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600">No videos available yet</p>
                  </CardContent>
                </Card>
              ) : (
                // Render available videos only
                videos
                    .sort((a: CourseVideo, b: CourseVideo) => a.orderIndex - b.orderIndex)
                    .map((video: CourseVideo) => {
                      let weekNumber = extractWeekNumber(video.title);
                      if (weekNumber === 1 && !video.title.toLowerCase().includes('week')) {
                        weekNumber = video.orderIndex + 1;
                      }
                      const isAccessible = canAccessWeek(weekNumber);
                      return (
                        <Card key={video.id} className={`border-l-4 ${isAccessible ? 'border-blue-500' : 'border-gray-300'} h-56 sm:h-44 flex flex-col ${!isAccessible ? 'opacity-60' : ''}`}>
                          <CardHeader className="flex-shrink-0 pb-1">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="flex items-center gap-2 text-sm">
                                  <i className={`fas fa-play ${isAccessible ? 'text-blue-600' : 'text-gray-400'}`}></i>
                                  {video.title}
                                  {!isAccessible && (
                                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                                      <i className="fas fa-lock mr-1"></i>
                                      Available
                                    </Badge>
                                  )}
                                  {isAccessible && isContentCompleted('video', video.id) && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                      Completed
                                    </Badge>
                                  )}
                                </CardTitle>
                                {video.description && (
                                  <CardDescription className="text-xs">{video.description}</CardDescription>
                                )}
                              </div>
                              {video.duration && (
                                <span className="text-xs text-gray-500 ml-2">
                                  <i className="fas fa-clock mr-1"></i>
                                  {video.duration} min
                                </span>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1 flex items-end pb-2">
                            <div className="flex items-center gap-2 w-full">
                              {isAccessible ? (
                                <Button
                                  onClick={() => {
                                    if (video.videoUrl) {
                                      setCurrentVideo(video);
                                      setVideoModalOpen(true);
                                      progressMutation.mutateAsync({
                                        courseId,
                                        contentType: 'video',
                                        contentId: video.id,
                                        completed: true
                                      }).then(() => {
                                        queryClient.invalidateQueries({ queryKey: [`/api/content-progress/${courseId}`] });
                                      }).catch(error => {
                                        console.error('Failed to update video progress:', error);
                                        toast({
                                          title: 'Error',
                                          description: 'Failed to mark video as complete',
                                          variant: 'destructive',
                                        });
                                      });
                                    } else {
                                      toast({
                                        title: 'Video Not Available',
                                        description: 'This video has not been uploaded yet.',
                                        variant: 'destructive',
                                      });
                                    }
                                  }}
                                  className="flex items-center gap-2"
                                  size="sm"
                                >
                                  <i className="fas fa-play"></i>
                                  Watch Video
                                </Button>
                              ) : null}
                              {!isAccessible && (
                                <Button
                                  variant="outline"
                                  className="flex items-center gap-2 "
                                  size="sm"
                                >
                                  <i className="fas fa-lock"></i>
                                  {getCompletionMessage(weekNumber, 'reading')}
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
              )
            )}
          </TabsContent>
        )}

        <TabsContent value="readings" className="space-y-4">
          {courseId === 2 ? (
            <div className="space-y-4">
              {/* Week 1 Required Reading for Don't Be a Jonah */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 1</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Don’t Be a Jonah — Chapter 1</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/dont-be-a-jonah-player-ch1')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">1 Timothy Chapter 1 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+1&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 2 Required Reading for Don't Be a Jonah */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 2</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Don’t Be a Jonah — Chapter 2</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={createReadingProgressHandler(102, () => setLocation('/dont-be-a-jonah-player-ch2'))}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">1 Timothy Chapter 2 (NLT)</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(202, () => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+2&version=NLT', '_blank'))}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 3 Required Reading for Don't Be a Jonah */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 3</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700">Don’t Be a Jonah — Chapter 3</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/dont-be-a-jonah-player-ch3')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">1 Timothy Chapter 3 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+3&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 4 Required Reading for Don't Be a Jonah */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 4</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700">Don’t Be a Jonah — Chapter 4</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/dont-be-a-jonah-player-ch4')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">1 Timothy Chapter 4 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+4&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 5 Required Reading for Don't Be a Jonah */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 5</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700">Don’t Be a Jonah — Chapter 5</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/dont-be-a-jonah-player-ch5')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">1 Timothy Chapter 5 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+5&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 6 Required Reading for Don't Be a Jonah */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 6</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700">Don’t Be a Jonah — Chapter 6</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/dont-be-a-jonah-player-ch6')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">1 Timothy Chapter 6 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+6&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 7 Required Reading for Don't Be a Jonah */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 7</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700">Don’t Be a Jonah — Chapter 7</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/dont-be-a-jonah-player-ch7')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">2 Timothy Chapter 1 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=2+Timothy+1&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 8 Required Reading for Don't Be a Jonah */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 8</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700">Don’t Be a Jonah — Chapter 8</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/dont-be-a-jonah-player-ch8')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">2 Timothy Chapter 2 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=2+Timothy+2&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 9 Required Reading for Don't Be a Jonah */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 9</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700">Don’t Be a Jonah — Chapter 9</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/dont-be-a-jonah-player-ch9')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">2 Timothy Chapter 3 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=2+Timothy+3&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 10 Required Reading for Don't Be a Jonah */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 10</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700">Don’t Be a Jonah — Chapter 10</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/dont-be-a-jonah-player-ch10')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">2 Timothy Chapter 4 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=2+Timothy+4&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 11 Required Reading for Don't Be a Jonah */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 11</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700">Don’t Be a Jonah — Chapter 11</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/dont-be-a-jonah-player-ch11')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Titus Chapter 1 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Titus+1&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : courseId === 1 ? (
            <div className="space-y-4">
              {/* Week 1 Required Reading Card */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Required Reading Week 1
                  </h3>
                  
                  {/* Acts in Action Section - Introduction */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold text-gray-800">Required Reading</h4>
                          {isContentCompleted('reading', 1) && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                              ✅ Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Acts in Action Introduction</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(1, () => window.location.href = '/acts-audio-player')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>

                  {/* Acts in Action Section - Chapter 1 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold text-gray-800">Required Reading</h4>
                          {isContentCompleted('reading', 2) && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                              ✅ Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Acts in Action Chapter 1</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(2, () => window.location.href = '/acts-audio-player-ch1')}
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bible Reading Section */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold text-gray-800">Required Bible Reading</h4>
                          {isContentCompleted('reading', 3) && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                              ✅ Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Acts Chapters 1-2</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(3, () => window.open('https://www.biblegateway.com/passage/?search=Acts+1-2&version=NLT', '_blank'))}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 2 Required Reading Card */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Required Reading Week 2
                  </h3>
                  
                  {/* Acts in Action Section - Chapter 2 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold text-gray-800">Required Reading</h4>
                          {isContentCompleted('reading', 4) && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                              ✅ Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Acts in Action Chapter 2</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(4, () => window.location.href = '/acts-audio-player-ch2')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bible Reading Section */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold text-gray-800">Required Bible Reading</h4>
                          {isContentCompleted('reading', 5) && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                              ✅ Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Acts Chapters 3-5</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(5, () => window.open('https://www.biblegateway.com/passage/?search=Acts+3-5&version=NLT', '_blank'))}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 3 Required Reading Card */}
              <Card >
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-2">
                    Required Reading Week 3
                  </h3>
                  
                  {/* Acts in Action Section - Chapter 3 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold text-gray-800">Required Reading</h4>
                          {isContentCompleted('reading', 6) && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                              ✅ Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Acts in Action Chapter 3</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(6, () => window.location.href = '/acts-audio-player-ch3')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bible Reading Section */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold text-gray-800">Required Bible Reading</h4>
                          {isContentCompleted('reading', 7) && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                              ✅ Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Acts Chapters 6-8</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(7, () => window.open('https://www.biblegateway.com/passage/?search=Acts+6-8&version=NLT', '_blank'))}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 4 Required Reading Card */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 4</h3>
                  
                  {/* Acts in Action Section - Chapter 4 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Reading</h4>
                        <p className="text-sm text-gray-600">Acts in Action Chapter 4</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(8, () => window.location.href = '/acts-audio-player-ch4')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bible Reading Section */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Bible Reading</h4>
                        <p className="text-sm text-gray-600">Acts Chapters 9-11</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(9, () => window.open('https://www.biblegateway.com/passage/?search=Acts+9-11&version=NLT', '_blank'))}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 5 Required Reading Card */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 5</h3>
                  
                  {/* Acts in Action Section - Chapter 5 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Reading</h4>
                        <p className="text-sm text-gray-600">Acts in Action Chapter 5</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(10, () => window.location.href = '/acts-audio-player-ch5')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bible Reading Section */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Bible Reading</h4>
                        <p className="text-sm text-gray-600">Acts Chapters 12-14</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(11, () => window.open('https://www.biblegateway.com/passage/?search=Acts+12-14&version=NLT', '_blank'))}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 6 Required Reading Card */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 6</h3>
                  
                  {/* Acts in Action Section - Chapter 6 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Reading</h4>
                        <p className="text-sm text-gray-600">Acts in Action Chapter 6</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(12, () => window.location.href = '/acts-audio-player-ch6')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bible Reading Section */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Bible Reading</h4>
                        <p className="text-sm text-gray-600">Acts Chapters 15-17</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(13, () => window.open('https://www.biblegateway.com/passage/?search=Acts+15-17&version=NLT', '_blank'))}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 7 Required Reading Card */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 7</h3>
                  
                  {/* Acts in Action Section - Chapter 7 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Reading</h4>
                        <p className="text-sm text-gray-600">Acts in Action Chapter 7</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(14, () => window.location.href = '/acts-audio-player-ch7')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bible Reading Section */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Bible Reading</h4>
                        <p className="text-sm text-gray-600">Acts Chapters 18-20</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(15, () => window.open('https://www.biblegateway.com/passage/?search=Acts+18-20&version=NLT', '_blank'))}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 8 Required Reading Card */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 8</h3>
                  
                  {/* Acts in Action Section - Chapter 8 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Reading</h4>
                        <p className="text-sm text-gray-600">Acts in Action Chapter 8</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(16, () => window.location.href = '/acts-audio-player-ch8')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bible Reading Section */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Bible Reading</h4>
                        <p className="text-sm text-gray-600">Acts Chapters 21-23</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(17, () => window.open('https://www.biblegateway.com/passage/?search=Acts+21-23&version=NLT', '_blank'))}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 9 Required Reading Card */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 9</h3>
                  
                  {/* Acts in Action Section - Chapter 9 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Reading</h4>
                        <p className="text-sm text-gray-600">Acts in Action Chapter 9</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(18, () => window.location.href = '/acts-audio-player-ch9')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bible Reading Section */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Bible Reading</h4>
                        <p className="text-sm text-gray-600">Acts Chapters 24-26</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(19, () => window.open('https://www.biblegateway.com/passage/?search=Acts+24-26&version=NLT', '_blank'))}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 10 Required Reading Card */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 10</h3>
                  
                  {/* Acts in Action Section - Chapter 10 */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Reading</h4>
                        <p className="text-sm text-gray-600">Acts in Action Chapter 10</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(20, () => window.location.href = '/acts-audio-player-ch10')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bible Reading Section */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Required Bible Reading</h4>
                        <p className="text-sm text-gray-600">Acts Chapters 27-28</p>
                      </div>
                      <Button
                        onClick={createReadingProgressHandler(21, () => window.open('https://www.biblegateway.com/passage/?search=Acts+27-28&version=NLT', '_blank'))}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : courseId === 4 ? (
            <div className="space-y-4">
              {/* Week 1 Required Reading for Firestarter */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 1</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Fire Starter — Chapter 1: Becoming a Fire Starter</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/becoming-a-firestarter-ch1')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Luke Chapters 1-4 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Luke+1-4&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 2 Required Reading for Firestarter */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 2</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Fire Starter — Chapter 2: It's Fire or Nothing!</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/becoming-a-firestarter-ch2')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Luke Chapters 5-8 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Luke+5-8&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 3 Required Reading for Firestarter */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 3</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Fire Starter — Chapter 3: Fuel for the Fire</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/becoming-a-firestarter-ch3')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Luke Chapters 9-12 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Luke+9-12&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 4 Required Reading for Firestarter */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 4</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Fire Starter — Chapter 4: Keep Your Eyes on the Fire</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/becoming-a-firestarter-ch4')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Luke Chapters 13-16 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Luke+13-16&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 5 Required Reading for Firestarter */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 5</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Fire Starter — Chapter 5: Tested by Fire</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/becoming-a-firestarter-ch5')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Luke Chapters 17-20 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Luke+17-20&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 6 Required Reading for Firestarter */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 6</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Fire Starter — Chapter 6: The Consuming Fire</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/becoming-a-firestarter-ch6')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Luke Chapters 21-24 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Luke+21-24&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 7 Required Reading for Firestarter */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 7</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Fire Starter — Chapter 7: Fasting for Fire</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/becoming-a-firestarter-ch7')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">John Chapters 1-5 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=John+1-5&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 8 Required Reading for Firestarter */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 8</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Fire Starter — Chapter 8: Fellowship of Fire</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/becoming-a-firestarter-ch8')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">John Chapters 6-10 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=John+6-10&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 9 Required Reading for Firestarter */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 9</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Fire Starter — Chapter 9: Fan the Fire</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/becoming-a-firestarter-ch9')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">John Chapters 11-15 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=John+11-15&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 10 Required Reading for Firestarter */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 10</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Fire Starter — Chapter 10: Conclusion</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/becoming-a-firestarter-ch10')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">John Chapters 16-21 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=John+16-21&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : courseId === 5 ? (
            <div className="space-y-4">
              {/* Week 1 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 1</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 1: Know Your Text</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch1')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Matthew Chapters 1-4 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Matthew+1-4&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 2 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 2</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 2: Notice the Names</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch2')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Matthew Chapters 5-8 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Matthew+5-8&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 3 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 3</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 3: Keep the Cities in Sight</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch3')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Matthew Chapters 9-12 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Matthew+9-12&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 4 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 4</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 4: Numbers Add Up</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch4')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Matthew Chapters 13-16 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Matthew+13-16&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 5 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 5</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 5: The Original Language</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch5')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Matthew Chapters 17-20 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Matthew+17-20&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 6 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 6</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 6: Stories That Bring Glory</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch6')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Matthew Chapters 21-24 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Matthew+21-24&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 7 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 7</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 7: Illustrated Sermons</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch7')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Matthew Chapters 25-28 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Matthew+25-28&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 8 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 8</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 8: Application Applied</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch8')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Mark Chapters 1-4 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Mark+1-4&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 9 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 9</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 9: Putting the Sermon Together</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch9')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Mark Chapters 5-6 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Mark+5-6&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 10 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 10</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 10: The Full Gospel</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch10')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Mark Chapters 7-8 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Mark+7-8&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 11 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 11</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 11: Being a Man of the Word</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch11')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Mark Chapters 9-11 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Mark+9-11&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 12 Required Reading for Studying for Service */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 12</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-1">Required Reading</h4>
                        <p className="text-blue-700 text-sm">Studying for Service — Chapter 12: Conclusion</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setLocation('/studying-for-service-ch12')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          🎶 Audiobook
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">Required Bible Reading</h4>
                        <p className="text-green-700 text-sm">Mark Chapters 12-16 (NLT)</p>
                      </div>
                      <Button
                        onClick={() => window.open('https://www.biblegateway.com/passage/?search=Mark+12-16&version=NLT', '_blank')}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50"
                      >
                        📖 Bible Chapter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : courseId === 1 ? (
            <div className="space-y-4">
              {/* Week 1 Required Reading for G.R.O.W */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 1</h3>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-green-900 font-semibold text-xl mb-1">🌱 G.R.O.W</p>
                        <p className="text-gray-700 text-lg">Introduction & Chapter 1: Give - Time, Talents, Treasure</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/grow-ch1'}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 2 Required Reading for G.R.O.W */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 2</h3>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-green-900 font-semibold text-xl mb-1">🌱 G.R.O.W</p>
                        <p className="text-gray-700 text-lg">Chapter 2: Read - Feed Daily on God's Word</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/grow-ch2'}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 3 Required Reading for G.R.O.W */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 3</h3>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-green-900 font-semibold text-xl mb-1">🌱 G.R.O.W</p>
                        <p className="text-gray-700 text-lg">Chapter 3: Obey - Listen and Apply God's Word</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/grow-ch3'}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 4 Required Reading for G.R.O.W */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 4</h3>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-green-900 font-semibold text-xl mb-1">🌱 G.R.O.W</p>
                        <p className="text-gray-700 text-lg">Chapter 4: Win - Go, Witness, Make Disciples</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/grow-ch4'}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : courseId === 7 ? (
            <div className="space-y-4">
              {/* Week 1 Required Reading for Deacon Course */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 1</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-purple-900 font-semibold text-xl mb-1">⚡ Deacon Course</p>
                        <p className="text-gray-700 text-lg">Introduction/Chapter 1 The Unignorable Nudge</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/deacon-course-ch1'}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 2 Required Reading for Deacon Course */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 2</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-purple-900 font-semibold text-xl mb-1">⚡ Deacon Course</p>
                        <p className="text-gray-700 text-lg">Chapter 2 Laying the Foundation</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/deacon-course-ch2'}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 3 Required Reading for Deacon Course */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 3</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-purple-900 font-semibold text-xl mb-1">⚡ Deacon Course</p>
                        <p className="text-gray-700 text-lg">Chapter 3: The Servant in Motion</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/deacon-course-ch3'}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 4 Required Reading for Deacon Course */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 4</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-purple-900 font-semibold text-xl mb-1">⚡ Deacon Course</p>
                        <p className="text-gray-700 text-lg">Chapter 4: The Spiritual Battlefield</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/deacon-course-ch4'}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 5 Required Reading for Deacon Course */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 5</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-purple-900 font-semibold text-xl mb-1">⚡ Deacon Course</p>
                        <p className="text-gray-700 text-lg">Chapter 5: Commissioned for Impact</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/deacon-course-ch5'}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          ) : courseId === 7 ? (
            <div className="space-y-4">
              {/* Week 1 Required Reading for Level Up Leadership */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 1</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-purple-900 font-semibold text-xl mb-1">⬆️ Level Up Leadership</p>
                        <p className="text-gray-700 text-lg">Position Leadership (Pages 1-81)</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/level-up-leadership-week1'}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        📖 Required Reading
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 2 Required Reading for Level Up Leadership */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 2</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-purple-900 font-semibold text-xl mb-1">⬆️ Level Up Leadership</p>
                        <p className="text-gray-700 text-lg">Permission Leadership (Pages 85-129)</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/level-up-leadership-week2'}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        📖 Required Reading
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 3 Required Reading for Level Up Leadership */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 3</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-purple-900 font-semibold text-xl mb-1">⬆️ Level Up Leadership</p>
                        <p className="text-gray-700 text-lg">Production Leadership (Pages 133-178)</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/level-up-leadership-week3'}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        📖 Required Reading
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 4 Required Reading for Level Up Leadership */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 4</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-purple-900 font-semibold text-xl mb-1">⬆️ Level Up Leadership</p>
                        <p className="text-gray-700 text-lg">People Development Leadership (Pages 181-228)</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/level-up-leadership-week4'}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        📖 Required Reading
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 5 Required Reading for Level Up Leadership */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 5</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-purple-900 font-semibold text-xl mb-1">⬆️ Level Up Leadership</p>
                        <p className="text-gray-700 text-lg">Pinnacle Leadership (Pages 229-286)</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/level-up-leadership-week5'}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        📖 Required Reading
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 6 Required Reading for Level Up Leadership */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 6</h3>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-purple-900 font-semibold text-xl mb-1">⬆️ Level Up Leadership</p>
                        <p className="text-gray-700 text-lg">Integration & Application</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/level-up-leadership-week6'}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        📖 Required Reading
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : courseId === 8 ? (
            <div className="space-y-4">
              {/* Week 1 Required Reading for Youth Ministry Course */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 1</h3>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-orange-900 font-semibold text-xl mb-1">👥 Youth Ministry Course</p>
                        <p className="text-gray-700 text-lg">Chapter 1: The Calling</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/youth-ministry-course-ch1'}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 2 Required Reading for Youth Ministry Course */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 2</h3>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-orange-900 font-semibold text-xl mb-1">👥 Youth Ministry Course</p>
                        <p className="text-gray-700 text-lg">Chapter 2: Requirements</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/youth-ministry-course-ch2'}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 3 Required Reading for Youth Ministry Course */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 3</h3>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-orange-900 font-semibold text-xl mb-1">👥 Youth Ministry Course</p>
                        <p className="text-gray-700 text-lg">Chapter 3: Responsibilities</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/youth-ministry-course-ch3'}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 4 Required Reading for Youth Ministry Course */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 4</h3>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-orange-900 font-semibold text-xl mb-1">👥 Youth Ministry Course</p>
                        <p className="text-gray-700 text-lg">Chapter 4: Accountability</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/youth-ministry-course-ch4'}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 5 Required Reading for Youth Ministry Course */}
              <Card>
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Required Reading Week 5</h3>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left flex-1">
                        <p className="text-orange-900 font-semibold text-xl mb-1">👥 Youth Ministry Course</p>
                        <p className="text-gray-700 text-lg">Chapter 5: Making New Disciples</p>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/youth-ministry-course-ch5'}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        🎶 Audiobook
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : readings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <i className="fas fa-book text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No readings available yet</h3>
                <p className="text-gray-500">Check back later for course materials.</p>
              </CardContent>
            </Card>
          ) : (
            readings
              .sort((a: CourseReading, b: CourseReading) => a.orderIndex - b.orderIndex)
              .map((reading: CourseReading) => {
                // Extract week number from reading title for access control
                const weekNumber = extractWeekNumber(reading.title);
                const isAccessible = canAccessReadings(weekNumber);
                return (
                <Card key={reading.id} className={`border-l-4 ${isAccessible ? 'border-green-500' : 'border-gray-300'} h-56 sm:h-44 flex flex-col ${!isAccessible ? 'opacity-60' : ''} mb-6`}>
                  <CardHeader className="flex-shrink-0 pb-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <i className={`fas fa-book ${isAccessible ? 'text-green-600' : 'text-gray-400'}`}></i>
                          {(() => {
                            // Clean up reading title to show only "Week X:" format
                            // Remove everything after the colon including chapter references and Bible book names
                            const cleanTitle = reading.title.replace(/:\s*.*$/i, ':');
                            return cleanTitle;
                          })()}
                          {!isAccessible && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                              <i className="fas fa-lock mr-1"></i>
                              Available
                            </Badge>
                          )}
                          {isAccessible && isContentCompleted('reading', reading.id) && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              Completed
                            </Badge>
                          )}

                        </CardTitle>
                        {reading.description && (
                          <CardDescription className="text-xs">{reading.description}</CardDescription>
                        )}
                        
                        {/* Add required reading format display for all assignments */}
                        {reading.content && reading.content.startsWith('{') ? (
                          (() => {
                            try {
                              const readingData = JSON.parse(reading.content);
                              
                              // Extract week number to determine requirements
                              const weekNumber = extractWeekNumber(reading.title);
                              
                              // Handle combined assignments
                              if (readingData.type === 'combined' && readingData.assignments) {
                                const textbookAssignment = readingData.assignments.find((a: any) => a.type === 'textbook');
                                const bibleAssignment = readingData.assignments.find((a: any) => a.type === 'bible');
                                
                                // Format display with clean chapter references
                                let displayText = '';
                                if (textbookAssignment && textbookAssignment.title) {
                                  // Convert "Chapters 1-2" to "Chapters 1-2 of the textbook"
                                  const chapterMatch = textbookAssignment.title.match(/Chapters? (\d+)(?:-(\d+))?/i);
                                  if (chapterMatch) {
                                    const startChapter = chapterMatch[1];
                                    const endChapter = chapterMatch[2];
                                    if (endChapter) {
                                      displayText += `Chapters ${startChapter}-${endChapter} of the textbook`;
                                    } else {
                                      displayText += `Chapter ${startChapter} of the textbook`;
                                    }
                                  } else {
                                    displayText += textbookAssignment.title;
                                  }
                                }
                                
                                // Add Bible reading assignment
                                if (bibleAssignment && bibleAssignment.title) {
                                  if (displayText) displayText += ' + ';
                                  // Replace "2 Timothy" with just "Timothy"
                                  let bibleTitle = bibleAssignment.title.replace(/2\s*Timothy/gi, 'Timothy');
                                  displayText += bibleTitle;
                                }
                                
                                if (courseId === 1 && weekNumber <= 4) { // Don't Be A Jonah course, only weeks 1-4 have Jonah chapters
                                  if (displayText) displayText += ' + ';
                                  displayText += `Jonah ${weekNumber}`;
                                }
                                
                                if (displayText) {
                                  return (
                                    <p className="text-xs text-blue-600 mt-1 font-medium">
                                      <i className="fas fa-list-ul mr-1"></i>
                                      Required: {displayText}
                                    </p>
                                  );
                                }
                              }
                              
                              // Handle old format with direct textbook/bible properties - clean chapter references
                              if (readingData.textbook || readingData.bible) {
                                let displayText = '';
                                if (readingData.textbook && readingData.textbook.title) {
                                  // Convert "Chapters 1-2" to "Chapters 1-2 of the textbook"
                                  const chapterMatch = readingData.textbook.title.match(/Chapters? (\d+)(?:-(\d+))?/i);
                                  if (chapterMatch) {
                                    const startChapter = chapterMatch[1];
                                    const endChapter = chapterMatch[2];
                                    if (endChapter) {
                                      displayText += `Chapters ${startChapter}-${endChapter} of the textbook`;
                                    } else {
                                      displayText += `Chapter ${startChapter} of the textbook`;
                                    }
                                  } else {
                                    displayText += readingData.textbook.title;
                                  }
                                }
                                
                                // Add Bible reading assignment
                                if (readingData.bible && readingData.bible.title) {
                                  if (displayText) displayText += ' + ';
                                  // Replace "2 Timothy" with just "Timothy"
                                  let bibleTitle = readingData.bible.title.replace(/2\s*Timothy/gi, 'Timothy');
                                  displayText += bibleTitle;
                                }
                                
                                if (courseId === 1 && weekNumber <= 4) { // Don't Be A Jonah course, only weeks 1-4 have Jonah chapters
                                  if (displayText) displayText += ' + ';
                                  displayText += `Jonah ${weekNumber}`;
                                }
                                
                                if (displayText) {
                                  return (
                                    <p className="text-xs text-blue-600 mt-1 font-medium">
                                      <i className="fas fa-list-ul mr-1"></i>
                                      Required: {displayText}
                                    </p>
                                  );
                                }
                              }
                            } catch (e) {
                              // Silent fail for malformed JSON
                            }
                            return null;
                          })()
                        ) : null}
                        {reading.bookTitle && (
                          <p className="text-xs text-gray-600 mt-1">
                            <i className="fas fa-bookmark mr-1"></i>
                            {reading.bookTitle}
                            {reading.bookAuthor && ` by ${reading.bookAuthor}`}
                            {reading.chapterNumber && ` - Chapter ${reading.chapterNumber}`}
                            {reading.chapterTitle && `: ${reading.chapterTitle}`}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {reading.estimatedTime && (
                          <span className="text-xs text-gray-500">
                            <i className="fas fa-clock mr-1"></i>
                            {reading.estimatedTime} min
                          </span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-end pt-1 px-4">
                    <div className="flex items-center gap-2 w-full overflow-hidden">
                      {reading.content && reading.content.startsWith('{') ? (
                        // For required reading assignments (JSON format), show both buttons
                        (() => {
                          try {
                            const readingData = JSON.parse(reading.content);
                            
                            // Handle textbook_chapters format (G.R.O.W course 0)
                            if (readingData.type === 'textbook_chapters' && readingData.assignments) {
                              const textbookAssignment = readingData.assignments.find((a: any) => a.type === 'textbook');
                              
                              return (
                                <div className="flex w-full">
                                  {textbookAssignment && isAccessible && (
                                    <Button
                                      onClick={() => {
                                        
                                        // Navigate to complete book reader for G.R.O.W textbook
                                        const url = `/complete-book-reader?courseId=${courseId}`;
                                        window.location.href = url;
                                        
                                        // Update progress in background
                                        progressMutation.mutateAsync({
                                          courseId,
                                          contentType: 'reading',
                                          contentId: reading.id,
                                          completed: true,
                                        }).catch(error => {
                                          console.error('Failed to update reading progress:', error);
                                        });
                                      }}
                                      className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center py-2 px-3 text-sm font-medium min-h-[36px] rounded shadow-sm w-full"
                                      title={`🌱 ${textbookAssignment.title} - Let's Start Growing!`}
                                    >
                                      🌱 Let's Start Growing
                                    </Button>
                                  )}
                                  {!isAccessible && (
                                    <Button
                                      className="bg-gray-300 text-gray-500 flex items-center justify-center py-2 px-3 text-sm font-medium min-h-[36px] rounded shadow-sm w-full "
                                    >
                                      🔒 Available
                                    </Button>
                                  )}
                                </div>
                              );
                            }

                            // Handle combined format (assignments array)
                            if (readingData.type === 'combined' && readingData.assignments) {
                              const textbookAssignment = readingData.assignments.find((a: any) => a.type === 'textbook');
                              const bibleAssignment = readingData.assignments.find((a: any) => a.type === 'bible');
                              
                              // Helper function to get Jonah chapter for each week
                              const getJonahChapterForWeek = (weekNumber: number) => {
                                const jonahChapters = {
                                  1: { chapter: 1, title: "Jonah 1", url: "https://www.biblegateway.com/passage/?search=Jonah%201&version=NLT" },
                                  2: { chapter: 2, title: "Jonah 2", url: "https://www.biblegateway.com/passage/?search=Jonah%202&version=NLT" },
                                  3: { chapter: 3, title: "Jonah 3", url: "https://www.biblegateway.com/passage/?search=Jonah%203&version=NLT" },
                                  4: { chapter: 4, title: "Jonah 4", url: "https://www.biblegateway.com/passage/?search=Jonah%204&version=NLT" }
                                };
                                return jonahChapters[weekNumber as keyof typeof jonahChapters];
                              };

                              // Get current week number from reading title
                              const currentWeekNumber = (() => {
                                const match = reading.title.match(/Week (\d+)/i);
                                return match ? parseInt(match[1]) : 1;
                              })();

                              const jonahChapter = courseId === 1 ? getJonahChapterForWeek(currentWeekNumber) : null;

                              return (
                                <div className="flex flex-col gap-2 w-full">
                                  {/* Reading Resources */}
                                  <div className="flex flex-row gap-1 w-full">
                                    {textbookAssignment && isAccessible && (
                                      <Button
                                        onClick={() => {
                                          
                                          // Navigate to textbook reader (avoiding popup blockers)
                                          const chapterTitle = encodeURIComponent(textbookAssignment.title);
                                          const url = `/complete-book-reader?courseId=${courseId}&chapterToRead=${chapterTitle}`;
                                          window.location.href = url;
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center py-2 px-1 text-xs font-medium min-h-[32px] rounded shadow-sm flex-1"
                                        title={`📚 Reading Assignment: Please read ${textbookAssignment.title}. Click "SELECT CHAPTER" in the book reader to choose the correct chapter.`}
                                      >
                                        <span className="text-sm">📚</span>
                                      </Button>
                                    )}
                                  {bibleAssignment && isAccessible && (
                                    <Button
                                      onClick={() => {
                                        
                                        // Open Bible URL immediately to avoid popup blockers
                                        window.open(bibleAssignment.url, '_blank');
                                        
                                        // Update progress in background
                                        progressMutation.mutateAsync({
                                          courseId,
                                          contentType: 'reading',
                                          contentId: reading.id,
                                          completed: true,
                                        }).catch(error => {
                                          console.error('Failed to update reading progress:', error);
                                        });
                                      }}
                                      className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center py-2 px-1 text-xs font-medium min-h-[32px] rounded shadow-sm flex-1"
                                      title={(() => {
                                        // Extract Bible chapters from URL or default message
                                        const url = bibleAssignment.url;
                                        if (url.includes('1%20Timothy%201-2')) {
                                          return "✝️ Bible Reading Assignment: Please read 1 Timothy chapters 1-2";
                                        } else if (url.includes('1%20Timothy%203-4')) {
                                          return "✝️ Bible Reading Assignment: Please read 1 Timothy chapters 3-4";
                                        } else if (url.includes('1%20Timothy%205-6')) {
                                          return "✝️ Bible Reading Assignment: Please read 1 Timothy chapters 5-6";
                                        } else if (url.includes('2%20Timothy%201-3')) {
                                          return "✝️ Bible Reading Assignment: Please read 2 Timothy chapters 1-3";
                                        } else if (url.includes('Titus%201-3')) {
                                          return "✝️ Bible Reading Assignment: Please read Titus chapters 1-3";
                                        } else {
                                          return "✝️ Bible Reading Assignment: Please read the assigned Bible chapters";
                                        }
                                      })()}
                                    >
                                      <span className="text-sm">✝️</span>
                                    </Button>
                                  )}
                                  {jonahChapter && isAccessible && (
                                    <Button
                                      onClick={() => {
                                        
                                        // Open Jonah chapter URL
                                        window.open(jonahChapter.url, '_blank');
                                        
                                        // Update progress in background
                                        progressMutation.mutateAsync({
                                          courseId,
                                          contentType: 'reading',
                                          contentId: reading.id,
                                          completed: true,
                                        }).catch(error => {
                                          console.error('Failed to update reading progress:', error);
                                        });
                                      }}
                                      className="bg-yellow-600 hover:bg-yellow-700 text-white flex items-center justify-center py-2 px-1 text-xs font-medium min-h-[32px] rounded shadow-sm flex-1"
                                      title={`🐋 Jonah Reading Assignment: Please read ${jonahChapter.title} - The Call and the Flight`}
                                    >
                                      <span className="text-sm">🐋</span>
                                    </Button>
                                  )}
                                  {!isAccessible && (
                                    <Button
                                      className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 py-3 px-4 text-base font-semibold min-h-[44px] rounded-lg "
                                    >
                                      <i className="fas fa-lock text-lg"></i>
                                      {getCompletionMessage(weekNumber, 'reading')}
                                    </Button>
                                  )}
                                  </div>
                                </div>
                              );
                            }
                            
                            // Handle Bible-only format for Acts in Action course
                            if (readingData.type === 'bible' && readingData.assignments) {
                              const bibleAssignment = readingData.assignments[0];
                              
                              return (
                                <div className="flex w-full">
                                  {bibleAssignment && isAccessible && (
                                    <Button
                                      onClick={() => {
                                        
                                        // Open Bible Gateway URL
                                        window.open(bibleAssignment.url, '_blank');
                                        
                                        // Update progress in background
                                        progressMutation.mutateAsync({
                                          courseId,
                                          contentType: 'reading',
                                          contentId: reading.id,
                                          completed: true,
                                        }).catch(error => {
                                          console.error('Failed to update reading progress:', error);
                                        });
                                      }}
                                      className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-3 px-4 text-base font-semibold min-h-[44px] rounded-lg shadow-md"
                                      title={`✝️ Bible Reading Assignment: ${bibleAssignment.description}`}
                                    >
                                      <i className="fas fa-bible text-lg"></i>
                                      <span className="hidden sm:inline">Read {bibleAssignment.title}</span>
                                      <span className="sm:hidden">Bible Reading</span>
                                    </Button>
                                  )}
                                  {!isAccessible && (
                                    <Button
                                      className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 py-3 px-4 text-base font-semibold min-h-[44px] rounded-lg "
                                    >
                                      <i className="fas fa-lock text-lg"></i>
                                      {getCompletionMessage(weekNumber, 'reading')}
                                    </Button>
                                  )}
                                </div>
                              );
                            }
                            
                            // Handle old format (direct textbook/bible properties)
                            if (readingData.textbook && readingData.bible) {
                              return (
                                <div className="flex flex-col gap-2 w-full">
                                  {readingData.textbook && readingData.textbook.title && isAccessible && (
                                    <Button
                                      onClick={async () => {
                                        // Automatically mark reading as complete when clicked
                                        try {
                                          await progressMutation.mutateAsync({
                                            courseId,
                                            contentType: 'reading',
                                            contentId: reading.id,
                                            completed: true,
                                          });
                                        } catch (error) {
                                          console.error('Failed to update reading progress:', error);
                                        }
                                        // Navigate to complete book reader with chapter notification
                                        const chapterTitle = encodeURIComponent(readingData.textbook.title);
                                        window.location.href = `/complete-book-reader?courseId=${courseId}&chapterToRead=${chapterTitle}`;
                                      }}
                                      className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-3 px-4 text-base font-semibold min-h-[44px] rounded-lg shadow-md"
                                      title={`📚 Reading Assignment: Please read ${readingData.textbook.title}. Click "SELECT CHAPTER" in the book reader to choose the correct chapter.`}
                                    >
                                      <i className="fas fa-book-open text-lg"></i>
                                      <span className="hidden sm:inline">Go to Book Chapters</span>
                                      <span className="sm:hidden">Book Chapters</span>
                                    </Button>
                                  )}
                                  {readingData.bible && readingData.bible.url && isAccessible && (
                                    <Button
                                      onClick={async () => {
                                        // Automatically mark reading as complete when clicked
                                        try {
                                          await progressMutation.mutateAsync({
                                            courseId,
                                            contentType: 'reading',
                                            contentId: reading.id,
                                            completed: true,
                                          });
                                        } catch (error) {
                                          console.error('Failed to update reading progress:', error);
                                        }
                                        window.open(readingData.bible.url, '_blank');
                                      }}
                                      className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-3 px-4 text-base font-semibold min-h-[44px] rounded-lg shadow-md"
                                    >
                                      <i className="fas fa-book-open text-lg"></i>
                                      <span className="hidden sm:inline">Go to Bible Chapters</span>
                                      <span className="sm:hidden">Bible Chapters</span>
                                    </Button>
                                  )}
                                  {!isAccessible && (
                                    <Button
                                      className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 py-3 px-4 text-base font-semibold min-h-[44px] rounded-lg "
                                    >
                                      <i className="fas fa-lock text-lg"></i>
                                      {getCompletionMessage(weekNumber, 'reading')}
                                    </Button>
                                  )}
                                </div>
                              );
                            }
                            
                            // Fallback for other formats
                            return isAccessible ? (
                              <Button
                                onClick={async () => {
                                  // Automatically mark reading as complete when clicked
                                  try {
                                    await progressMutation.mutateAsync({
                                      courseId,
                                      contentType: 'reading',
                                      contentId: reading.id,
                                      completed: true,
                                    });
                                  } catch (error) {
                                    console.error('Failed to update reading progress:', error);
                                  }
                                  // Navigate to complete book reader for textbook content
                                  window.location.href = `/complete-book-reader?courseId=${courseId}`;
                                }}
                                className="flex items-center gap-2"
                              >
                                <i className="fas fa-book-open"></i>
                                Start Reading
                              </Button>
                            ) : (
                              <Button
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 py-3 px-4 text-base font-semibold min-h-[44px] rounded-lg "
                              >
                                <i className="fas fa-lock text-lg"></i>
                                {getCompletionMessage(weekNumber, 'reading')}
                              </Button>
                            );
                          } catch (e) {
                            return isAccessible ? (
                              <Button
                                onClick={async () => {
                                  // Automatically mark reading as complete when clicked
                                  try {
                                    await progressMutation.mutateAsync({
                                      courseId,
                                      contentType: 'reading',
                                      contentId: reading.id,
                                      completed: true,
                                    });
                                  } catch (error) {
                                    console.error('Failed to update reading progress:', error);
                                  }
                                  // Navigate to complete book reader for textbook content
                                  window.location.href = `/complete-book-reader?courseId=${courseId}`;
                                }}
                                className="flex items-center gap-2"
                              >
                                <i className="fas fa-book-open"></i>
                                Start Reading
                              </Button>
                            ) : (
                              <Button
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 py-3 px-4 text-base font-semibold min-h-[44px] rounded-lg "
                              >
                                <i className="fas fa-lock text-lg"></i>
                                {getCompletionMessage(weekNumber, 'reading')}
                              </Button>
                            );
                          }
                        })()
                      ) : isAccessible && reading.externalUrl ? (
                        <Button
                          onClick={async () => {
                            // Automatically mark reading as complete when clicked
                            try {
                              await progressMutation.mutateAsync({
                                courseId,
                                contentType: 'reading',
                                contentId: reading.id,
                                completed: true,
                              });
                            } catch (error) {
                              console.error('Failed to update reading progress:', error);
                            }
                            window.location.href = reading.externalUrl!;
                          }}
                          className="flex items-center gap-2"
                        >
                          <i className="fas fa-book-open"></i>
                          Open Textbook
                        </Button>
                      ) : isAccessible ? (
                        <Button 
                          onClick={async () => {
                            // Automatically mark reading as complete when clicked
                            try {
                              await progressMutation.mutateAsync({
                                courseId,
                                contentType: 'reading',
                                contentId: reading.id,
                                completed: true,
                              });
                            } catch (error) {
                              console.error('Failed to update reading progress:', error);
                            }
                            // Navigate to complete book reader for textbook content
                            window.location.href = `/complete-book-reader?courseId=${courseId}`;
                          }}
                          className="flex items-center gap-2"
                        >
                          <i className="fas fa-book-open"></i>
                          Start Reading
                        </Button>
                      ) : (
                        <Button
                          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white "
                        >
                          <i className="fas fa-lock"></i>
                          {getCompletionMessage(weekNumber, 'reading')}
                        </Button>
                      )}

                    </div>
                  </CardContent>
                </Card>
                );
              })
          )}
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          {/* Dynamic Quiz Display */}
          {quizzes.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                {courseId === 1 ? 'Acts in Action Week Quizzes' : 'Course Quizzes'}
              </h3>
              
              {/* Dynamic Quiz Cards */}
              {quizzes.sort((a: any, b: any) => {
                // Final exams always go last
                if (a.isFinalExam && !b.isFinalExam) return 1;
                if (!a.isFinalExam && b.isFinalExam) return -1;
                // Sort by week number in title, then by quiz ID
                const aWeek = parseInt(a.title.match(/Week (\d+)/)?.[1] || '0');
                const bWeek = parseInt(b.title.match(/Week (\d+)/)?.[1] || '0');
                if (aWeek !== bWeek) return aWeek - bWeek;
                return a.id - b.id;
              }).map((quiz: any) => {
                const isFinalExam = quiz.isFinalExam;
                const quizNumber = quiz.title.match(/Week (\d+)/)?.[1];
                const weekNumber = isFinalExam ? 11 : parseInt(quizNumber || '1');
                const isAccessible = canAccessQuiz(weekNumber, isFinalExam);
                
                return (
                  <Card 
                    key={quiz.id} 
                    className={`border-l-4 ${isFinalExam ? 'border-red-500 bg-gradient-to-r from-red-50 to-orange-50' : 'border-purple-500'} ${!isAccessible ? 'opacity-60' : ''}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className={`${isFinalExam ? 'text-xl font-bold' : 'text-lg font-semibold'} text-gray-800 flex items-center gap-2`}>
                            <i className={`fas ${isFinalExam ? 'fa-graduation-cap text-red-600' : isAccessible ? 'fa-quiz text-purple-600' : 'fa-quiz text-gray-400'}`}></i>
                            {quiz.title}
                            {quiz.attempts > 0 && (
                              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                                ✅ Completed
                              </Badge>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {isFinalExam 
                              ? `${quiz.questions?.length || 50} questions • 60 minutes • 70% passing score`
                              : `${quiz.questions?.length || (courseId === 1 ? 10 : 20)} questions • 15 minutes • 70% passing score`}
                          </p>
                          {isFinalExam && (
                            <div className="mt-2 text-sm text-gray-700">
                              <p className="font-medium text-red-700">📝 Includes Essay Component</p>
                              <p className="text-xs text-gray-600">• {quiz.questions?.length || 50} multiple choice questions covering all course material</p>
                              <p className="text-xs text-gray-600">• 100-word minimum essay reflection</p>
                              <p className="text-xs text-gray-600">• Essay sent to pastor_rocky@sfgmboston.com for review</p>
                              <p className="text-xs text-gray-600">• Course completion certificate via email after review</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Quiz Status Badges */}
                          {quiz.attempts > 0 && quiz.bestScore !== null && (parseFloat(quiz.bestScore) * 100) >= (quiz.passingScore || 70) && (
                            <Badge className="bg-green-100 text-green-800">
                              <i className="fas fa-check mr-1"></i>
                              Passed
                            </Badge>
                          )}
                          {quiz.attempts > 0 && quiz.bestScore !== null && (parseFloat(quiz.bestScore) * 100) < (quiz.passingScore || 70) && (
                            <Badge className="bg-red-100 text-red-800">
                              <i className="fas fa-times mr-1"></i>
                              Failed
                            </Badge>
                          )}
                          {quiz.attempts === 0 && isAccessible && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <i className="fas fa-clock mr-1"></i>
                              Available
                            </Badge>
                          )}
                          {quiz.attempts === 0 && !isAccessible && (
                            <Badge className="bg-gray-100 text-gray-600">
                              <i className="fas fa-lock mr-1"></i>
                              Available
                            </Badge>
                          )}
                          {quiz.timeLimit && (
                            <span className="text-sm text-gray-500">
                              <i className="fas fa-clock mr-1"></i>
                              {quiz.timeLimit} min
                            </span>
                          )}
                          
                          {/* Quiz Action Buttons */}
                          {quiz.attempts > 0 ? (
                            // Quiz completed - show view previous quiz button
                            <div className="flex flex-col gap-2">
                              <Button
                                onClick={() => {
                              // Generate quiz URL based on courseId
                              let quizUrl;
                              if (courseId === 1) {
                                quizUrl = isFinalExam ? '/quiz/acts-final-exam' : `/quiz/acts-week-${quizNumber}`;
                              } else if (courseId === 2) {
                                quizUrl = isFinalExam ? '/quiz/firestarter-final-exam' : `/quiz/firestarter-week-${quizNumber}`;
                              } else if (courseId === 3) {
                                quizUrl = isFinalExam ? '/quiz/dbaj-final-exam' : `/quiz/dbaj-week-${quizNumber}`;
                                } else if (courseId === 5) {
                                  quizUrl = isFinalExam ? '/quiz/studying-for-service-final-exam' : `/quiz/studying-for-service-week-${quizNumber}`;
                                } else if (courseId === 4) {
                                  quizUrl = isFinalExam ? '/quiz/grow-final-exam' : `/quiz/grow-week-${quizNumber}`;
                                } else if (courseId === 6) {
                                  quizUrl = isFinalExam ? '/quiz/deacon-course-final-exam' : `/quiz/deacon-course-week-${quizNumber}`;
                                } else if (courseId === 8) {
                                  quizUrl = isFinalExam ? '/quiz/youth-ministry-final-exam' : `/quiz/youth-ministry-week-${quizNumber}`;
                                } else {
                                  quizUrl = `/quiz/${quiz.id}`;
                                }
                                window.location.href = `${quizUrl}?review=true`;
                                }}
                                variant="outline"
                                className="border-green-300 text-green-700 hover:bg-green-50"
                              >
                                <i className="fas fa-eye mr-2"></i>
                                View Previous Quiz
                              </Button>
                              <p className="text-xs text-gray-500 text-center">
                                {(parseFloat(quiz.bestScore) * 100) >= (quiz.passingScore || 70) ? '✅ Completed' : '❌ Failed - No Retry'}
                              </p>
                            </div>
                          ) : (
                            // Quiz not taken - show take quiz button or locked state
                            <Button
                              disabled={!isAccessible && isFinalExam}
                              onClick={() => {
                                // Don't allow clicking if final exam is locked
                                if (!isAccessible && isFinalExam) {
                                  return;
                                }
                                
                                // Generate quiz URL based on courseId
                                let quizUrl;
                                if (courseId === 1) {
                                  quizUrl = isFinalExam ? '/quiz/acts-final-exam' : `/quiz/acts-week-${quizNumber}`;
                                } else if (courseId === 2) {
                                  quizUrl = isFinalExam ? '/quiz/firestarter-final-exam' : `/quiz/firestarter-week-${quizNumber}`;
                                } else if (courseId === 3) {
                                  quizUrl = isFinalExam ? '/quiz/dbaj-final-exam' : `/quiz/dbaj-week-${quizNumber}`;
                                } else if (courseId === 5) {
                                  quizUrl = isFinalExam ? '/quiz/studying-for-service-final-exam' : `/quiz/studying-for-service-week-${quizNumber}`;
                                } else if (courseId === 4) {
                                  quizUrl = isFinalExam ? '/quiz/grow-final-exam' : `/quiz/grow-week-${quizNumber}`;
                                } else if (courseId === 6) {
                                  quizUrl = isFinalExam ? '/quiz/deacon-course-final-exam' : `/quiz/deacon-course-week-${quizNumber}`;
                                } else if (courseId === 8) {
                                  quizUrl = isFinalExam ? '/quiz/youth-ministry-final-exam' : `/quiz/youth-ministry-week-${quizNumber}`;
                                } else {
                                  quizUrl = `/quiz/${quiz.id}`;
                                }
                                window.location.href = quizUrl;
                              }}
                              className={`${!isAccessible 
                                ? 'bg-gray-400 text-gray-600 '
                                : isFinalExam 
                                  ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-lg px-6 py-3'
                                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                              }`}
                            >
                              {!isAccessible && isFinalExam
                                ? '🔒 Complete All Course Content First'
                                : isFinalExam 
                                  ? '🎓 Take Final Exam' 
                                  : '📝 Take Quiz'
                              }
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

            </div>
          )}

          {/* No Quizzes Message */}
          {quizzes.length === 0 && courseId !== 1 && (
            <Card>
              <CardContent className="text-center py-8 space-y-4">
                <i className="fas fa-quiz text-4xl text-gray-400"></i>
                <p className="text-gray-600">No quizzes available yet</p>
              </CardContent>
            </Card>
          )}

        </TabsContent>
      </Tabs>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <i className="fas fa-play text-blue-600"></i>
              {currentVideo?.title}
            </DialogTitle>
            <DialogDescription>
              Watch this video to continue your learning journey
            </DialogDescription>
          </DialogHeader>
          {currentVideo && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <iframe
                  src={(() => {
                    if (!currentVideo.videoUrl) return '';
                    const videoId = getYouTubeVideoId(currentVideo.videoUrl);
                    if (videoId) {
                      return `https://www.youtube.com/embed/${videoId}`;
                    }
                    return currentVideo.videoUrl;
                  })()}
                  title={currentVideo.title}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <i className="fas fa-clock mr-1"></i>
                  {currentVideo.duration || 'Duration not available'}
                </div>
                <Button
                  onClick={() => {
                    if (currentVideo.videoUrl) {
                      window.open(currentVideo.videoUrl, '_blank');
                    }
                  }}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <i className="fab fa-youtube mr-2"></i>
                  Open on YouTube
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
