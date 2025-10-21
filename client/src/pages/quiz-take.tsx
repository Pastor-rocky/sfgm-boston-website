import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from "@/components/ui/textarea";
import { FinalExamCompletion } from "@/components/final-exam-completion";

interface Question {
  id: number;
  question: string;
  type: 'multiple_choice' | 'yes_no_with_text';
  options?: string[];
  points: number;
  orderIndex: number;
  isBonus?: boolean;
  parentQuestionId?: number;
  correctAnswer?: string;
}

interface Quiz {
  id: number;
  title: string;
  timeLimit: number;
  passingScore: number;
  isFinalExam: boolean;
  moduleName: string;
  courseName: string;
  questions: Question[];
}

export default function QuizTake() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Check if we're in review mode
  const [isReviewMode, setIsReviewMode] = useState(new URLSearchParams(window.location.search).get('review') === 'true');
  
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFinalExamCompletion, setShowFinalExamCompletion] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState(0.8);
  const [showBonusQuestions, setShowBonusQuestions] = useState(new Set<number>());

  // Session persistence key
  const sessionKey = `quiz_${id}_progress`;

  // Check for speech synthesis support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Text-to-speech functions
  const readQuestion = (questionText: string) => {
    if (!speechSupported) return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(questionText);
    
    // Configure speech settings
    utterance.rate = speechSpeed;
    utterance.pitch = 1.0;
    utterance.volume = 0.9;
    
    // Try to get a quality voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.name.includes('Samantha') ||
      voice.name.includes('Alex')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Speak the question
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (speechSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const readCurrentQuestion = () => {
    if (visibleQuestions && visibleQuestions[currentQuestion]) {
      const currentQ = visibleQuestions[currentQuestion];
      let questionText = `Question ${currentQuestion + 1}. ${currentQ.question}`;
      
      // Add options for multiple choice questions
      if (currentQ.type === 'multiple_choice' && currentQ.options) {
        questionText += '. The answers are: ';
        currentQ.options.forEach((option, index) => {
          // Remove A), B), C), D) prefixes from the option text
          const cleanOption = option.replace(/^[A-D]\)\s*/, '');
          questionText += `Answer ${index + 1}: ${cleanOption}. `;
        });
      }
      
      readQuestion(questionText);
    }
  };

  // Auto-read when question changes
  useEffect(() => {
    if (autoRead && isStarted && visibleQuestions && visibleQuestions[currentQuestion] && speechSupported) {
      // Small delay to ensure UI is updated
      setTimeout(() => {
        readCurrentQuestion();
      }, 500);
    }
  }, [currentQuestion, autoRead, isStarted, speechSupported]);

  // Navigation functions with auto-read support
  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestion < visibleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Load saved progress on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(sessionKey);
    if (savedProgress) {
      try {
        const { answers: savedAnswers, currentQuestion: savedQuestion, timeLeft: savedTime, isStarted: savedStarted } = JSON.parse(savedProgress);
        setAnswers(savedAnswers || {});
        setCurrentQuestion(savedQuestion || 0);
        setTimeLeft(savedTime);
        setIsStarted(savedStarted || false);
      } catch (error) {
        console.error('Error loading saved quiz progress:', error);
      }
    }
  }, [sessionKey]);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    if (isStarted && !isSubmitted) {
      const progressData = {
        answers,
        currentQuestion,
        timeLeft,
        isStarted
      };
      localStorage.setItem(sessionKey, JSON.stringify(progressData));
    }
  }, [answers, currentQuestion, timeLeft, isStarted, isSubmitted, sessionKey]);

  const { data: quiz, isLoading, error } = useQuery<Quiz>({
    queryKey: [`/api/quizzes/${id}`],
    enabled: !!id,
  });

  // Fetch quiz attempt data for review mode
  const { data: quizAttempt } = useQuery({
    queryKey: [`/api/quiz-attempts/${id}/review`],
    enabled: isReviewMode && !!id,
    queryFn: async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('No auth token');
      
      const response = await fetch(`/api/quiz-attempts/${id}/review`, {
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

  // Initialize review mode
  useEffect(() => {
    if (isReviewMode && quizAttempt?.questions) {
      const reviewAnswers: Record<number, string> = {};
      quizAttempt.questions.forEach((question: any) => {
        reviewAnswers[question.id] = question.userAnswer || '';
      });
      setAnswers(reviewAnswers);
      setIsStarted(true);
      setIsSubmitted(true);
    }
  }, [isReviewMode, quizAttempt]);

  // Check course progress if this is a final exam
  const { data: progress } = useQuery({
    queryKey: ['/api/courses/progress', (quiz as any)?.courseId],
    enabled: !!quiz?.isFinalExam && !!(quiz as any)?.courseId,
  });



  // Timer effect
  useEffect(() => {
    if (isStarted && timeLeft !== null && timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Update every minute

      return () => clearInterval(timer);
    }
  }, [isStarted, timeLeft, isSubmitted]);



  const submitQuizMutation = useMutation({
    mutationFn: async (quizAnswers: Record<number, string>) => {
      return await apiRequest('POST', '/api/quiz-attempts', {
        quizId: id ? parseInt(id) : null,
        studentId: (user as any)?.id || 'unknown',
        answers: quizAnswers,
        completedAt: new Date().toISOString(),
        timeSpent: quiz?.timeLimit ? quiz.timeLimit - (timeLeft || 0) : null,
      });
    },
    onSuccess: (result) => {
      setIsSubmitted(true);
      // Clear saved progress when quiz is submitted
      localStorage.removeItem(sessionKey);
      const score = result.score || 0;
      
      // For final exams, show the transition component instead of immediate toast
      if (quiz?.isFinalExam && score >= quiz.passingScore) {
        setShowFinalExamCompletion(true);
      } else {
        // Regular quiz or failed final exam - show normal toast
        toast({
          title: score >= (quiz?.passingScore || 70) ? "Quiz Passed!" : "Quiz Completed",
          description: `Your score: ${Math.round(score * 100)}% ${score >= (quiz?.passingScore || 70) ? '- Well done!' : '- You can retake this quiz.'}`,
        });
      }
      
      queryClient.invalidateQueries({ queryKey: ['/api/student/quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['/api/enrollments/student'] });
      queryClient.invalidateQueries({ queryKey: ['/api/certificates'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to submit quiz",
        variant: "destructive",
      });
    },
  });

  const handleStartQuiz = () => {
    setIsStarted(true);
    if (quiz?.timeLimit) {
      setTimeLeft(quiz.timeLimit);
    }
  };

  const handleAutoSubmit = () => {
    if (!isSubmitted) {
      submitQuizMutation.mutate(answers);
    }
  };

  const handleSubmit = () => {
    setShowSubmitDialog(false);
    submitQuizMutation.mutate(answers);
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

  };

  const getProgress = () => {
    if (!quiz?.questions) return 0;
    const visibleQuestions = quiz.questions.filter(q => 
      !q.isBonus || showBonusQuestions.has(q.id)
    );
    return (Object.keys(answers).length / visibleQuestions.length) * 100;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading quiz...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle reflection essay access denied
  if (error && (error as any).response?.status === 403) {
    const errorData = (error as any).response?.data;
    if (errorData?.requiresCompletion) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
          <Navigation />
          <div className="container mx-auto px-4 pt-24">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-7V6a3 3 0 00-3-3H7a3 3 0 00-3 3v1" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-red-800 mb-2">
                      {errorData?.examType === 'final exam' ? 'Final Exam Locked' : 'Reflection Essay Locked'}
                    </h2>
                    <p className="text-red-700 text-lg leading-relaxed">
                      You must complete all course content before accessing the {errorData?.examType || 'course reflection essay'}. 
                      This includes watching all videos, completing all readings, and passing all quizzes.
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full">
                    <h3 className="font-semibold text-red-800 mb-2">Required Steps:</h3>
                    <ul className="text-red-700 text-left space-y-1">
                      <li>• Complete all course videos</li>
                      <li>• Finish all reading assignments</li>
                      <li>• Pass all course quizzes</li>
                      <li>• Then return to complete your {errorData?.examType || 'reflection essay'}</li>
                    </ul>
                  </div>
                  <Button 
                    onClick={() => setLocation('/dashboard')}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                  >
                    Return to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quiz Not Found</h3>
              <p className="text-gray-600 mb-4">The quiz you're looking for doesn't exist.</p>
              <Button onClick={() => setLocation('/dashboard')}>
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show final exam completion transition
  if (showFinalExamCompletion && quiz?.isFinalExam) {
    // Calculate the multiple choice score
    const mcScore = Math.round((quiz.questions.filter(q => !q.isBonus).length * (quiz.passingScore || 70) / 100));
    const totalMcQuestions = quiz.questions.filter(q => !q.isBonus).length;
    
    // Determine course and essay question based on quiz title
    const isActsCourse = quiz.title.toLowerCase().includes('acts');
    const isJonahCourse = quiz.title.toLowerCase().includes('jonah');
    const isDeaconCourse = quiz.title.toLowerCase().includes('deacon');
    
    // Create appropriate essay question
    let essayQuestion;
    let courseName;
    let courseId;
    
    if (isJonahCourse) {
      courseName = "Don't Be a Jonah Course";
      courseId = 3;
      essayQuestion = {
        id: 999,
        question: "Reflect on your journey through the Don't Be a Jonah course. What specific insights from Jonah's story have most impacted your understanding of obedience and God's mercy? How will you apply these lessons to avoid being a 'Jonah' in your own life and ministry? Please share at least one specific example from the course that resonated with you and explain why it was meaningful."
      };
    } else if (isDeaconCourse) {
      courseName = "Deacon Course";
      courseId = 6;
      essayQuestion = {
        id: 999,
        question: "Reflect on your journey through the Deacon Course. What specific insights from this course have most impacted your understanding of servant leadership and the deacon's calling? How will you apply these lessons in your ministry and service to the local church? Please share at least one specific example from the course that resonated with you and explain why it was meaningful and how it will shape your service as a deacon."
      };
    } else {
      // Default to Acts course
      courseName = "Acts in Action Course";
      courseId = 1;
      essayQuestion = {
        id: 999,
        question: "Reflect on your journey through the book of Acts. What specific insights from this course have most impacted your understanding of the early church and the Holy Spirit's work? How will you apply these lessons in your spiritual life and ministry? Please share at least one specific example from the textbook that resonated with you and explain why it was meaningful."
      };
    }

    return (
      <FinalExamCompletion 
        courseName={courseName}
        courseId={courseId}
        quizId={quiz.id}
        studentId={localStorage.getItem('userId') || 'unknown'}
        mcScore={mcScore}
        totalMcQuestions={totalMcQuestions}
        essayQuestion={essayQuestion}
        onEssaySubmissionComplete={() => {
          setLocation('/dashboard');
        }}
      />
    );
  }

  // Show submission success page only if not in review mode
  if (isSubmitted && !isReviewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <i className="fas fa-check-circle text-green-500 text-6xl mb-6"></i>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your answers have been recorded and your score has been calculated.
              </p>
              <div className="space-y-4">
                <Button onClick={() => setIsReviewMode(true)} className="mr-4 bg-green-600 hover:bg-green-700">
                  <i className="fas fa-eye mr-2"></i>
                  Review Quiz
                </Button>
                <Button variant="outline" onClick={() => {
                  // Determine the correct course path based on quiz ID range
                  if (quiz?.id >= 100 && quiz?.id <= 104) {
                    setLocation('/grow-course'); // G.R.O.W course quizzes (100-104)
                  } else {
                    setLocation('/dashboard'); // Other courses go to dashboard
                  }
                }}>
                  <i className="fas fa-arrow-left mr-2"></i>
                  Return to Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Get all questions sorted by order
  const visibleQuestions = quiz?.questions?.sort((a: any, b: any) => a.orderIndex - b.orderIndex) || [];

  // Check if final exam access is allowed
  if (quiz?.isFinalExam && progress && !(progress as any)?.canTakeFinalExam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">🎓 Final Exam Access Required</CardTitle>
              <p className="text-gray-600">{quiz.courseName} - {quiz.title}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <i className="fas fa-lock text-yellow-600 text-3xl mb-2"></i>
                  <h3 className="font-semibold text-yellow-800 mb-2">Complete Course Requirements First</h3>
                  <p className="text-yellow-700">
                    You must complete all course materials before taking the final exam.
                  </p>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Course Progress</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                      <span className="text-sm font-bold text-blue-600">{(progress as any)?.completionPercentage || 0}%</span>
                    </div>
                    <Progress value={(progress as any)?.completionPercentage || 0} className="h-2" />
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{(progress as any)?.completedQuizzes || 0}</div>
                        <div className="text-xs text-gray-500">of {(progress as any)?.totalQuizzes || 0} Quizzes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{(progress as any)?.completedReadings || 0}</div>
                        <div className="text-xs text-gray-500">of {(progress as any)?.totalReadings || 0} Readings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{(progress as any)?.completedVideos}</div>
                        <div className="text-xs text-gray-500">of {(progress as any)?.totalVideos} Videos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button onClick={() => setLocation('/dashboard')} className="mr-4">
                  Return to Dashboard
                </Button>
                <Button variant="outline" onClick={() => setLocation('/bible-school')}>
                  View Course Materials
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">
                {quiz.isFinalExam ? '🎓 ' : ''}{quiz.title}
              </CardTitle>
              <p className="text-gray-600">{quiz.courseName}</p>
              {quiz.isFinalExam && (
                <Badge variant="secondary" className="mt-2">
                  Final Exam - Course Completion Required
                </Badge>
              )}
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-4">Quiz Instructions</h3>
                  <div className="space-y-3 text-blue-800">
                    <div className="flex items-center">
                      <i className="fas fa-question-circle mr-3"></i>
                      <span>{quiz.questions.length} questions total</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-clock mr-3"></i>
                      <span>Time limit: {formatTime(quiz.timeLimit)} minutes</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-target mr-3"></i>
                      <span>Passing score: {quiz.passingScore}%</span>
                    </div>
                    {quiz.isFinalExam && (
                      <div className="flex items-center">
                        <i className="fas fa-star mr-3"></i>
                        <span>This is a final exam</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Important Notes:</h4>
                  <ul className="text-yellow-800 space-y-1 text-sm">
                    <li>• You can navigate between questions using the Previous/Next buttons</li>
                    <li>• Your answers are automatically saved as you progress</li>
                    <li>• Make sure to submit your quiz before time runs out</li>
                    <li>• Once submitted, you cannot change your answers</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Research Question:</h4>
                  <p className="text-green-800 text-sm">
                    <i className="fas fa-search mr-2"></i>
                    Question 10 requires research outside the Bible. You may leave this quiz to research and return - your progress will be saved automatically. Extra time (45 minutes total) has been provided for research.
                  </p>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={handleStartQuiz}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                  >
                    Start Quiz
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = visibleQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Quiz Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{quiz.title}</h1>
              <p className="text-gray-600">{quiz.courseName}</p>
            </div>
            <div className="flex items-center space-x-6">
              {quiz.isFinalExam && (
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  Final Exam
                </Badge>
              )}
              {speechSupported && (
                <div className="flex items-center gap-4">
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={autoRead}
                      onChange={(e) => setAutoRead(e.target.checked)}
                      className="mr-2"
                    />
                    Auto-read questions
                  </label>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <label>Speed:</label>
                    <select
                      value={speechSpeed}
                      onChange={(e) => setSpeechSpeed(Number(e.target.value))}
                      className="border rounded px-2 py-1 text-xs"
                    >
                      <option value={0.5}>Slow</option>
                      <option value={0.8}>Normal</option>
                      <option value={1.0}>Fast</option>
                      <option value={1.2}>Faster</option>
                    </select>
                  </div>
                </div>
              )}
              {timeLeft !== null && (
                <div className="flex items-center text-gray-700">
                  <i className="fas fa-clock mr-2"></i>
                  <span className={timeLeft <= 5 ? 'text-red-600 font-semibold' : ''}>
                    {formatTime(timeLeft)} remaining
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{Object.keys(answers).length} of {visibleQuestions.length} answered</span>
              </div>
              <Progress value={getProgress()} className="h-2" />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle className="text-lg">
                  Question {currentQuestion + 1} of {visibleQuestions.length}
                </CardTitle>
                {isReviewMode && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Review Mode
                  </Badge>
                )}
              </div>
              <Badge variant="outline">
                {currentQ.points} point{currentQ.points > 1 ? 's' : ''}
              </Badge>
            </div>
            {isReviewMode && quizAttempt && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-800">Quiz Results Summary</h3>
                    <p className="text-blue-700 text-sm">
                      Score: {Math.round(quizAttempt.attempt.score * 100)}% | 
                      Completed: {new Date(quizAttempt.attempt.completedAt).toLocaleDateString()} | 
                      Time: {quizAttempt.attempt.timeSpent || 0} min
                    </p>
                  </div>
                  <Badge variant={quizAttempt.attempt.score >= quizAttempt.quiz.passingScore ? "default" : "destructive"}>
                    {quizAttempt.attempt.score >= quizAttempt.quiz.passingScore ? "Passed" : "Failed"}
                  </Badge>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {/* Special indicator for research question */}
            {currentQ.question.includes('Research outside the Bible') && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-800">
                  <i className="fas fa-search mr-2"></i>
                  <span className="font-medium">Research Question:</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  You may leave this quiz to research and return. Your progress is automatically saved.
                </p>
              </div>
            )}
            
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4">
                <p className="text-gray-900 text-lg leading-relaxed flex-1">{currentQ.question}</p>
                {speechSupported && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={readCurrentQuestion}
                      disabled={isSpeaking}
                      className="flex items-center gap-2 whitespace-nowrap"
                    >
                      <i className={`fas ${isSpeaking ? 'fa-volume-up' : 'fa-volume'}`}></i>
                      {isSpeaking ? 'Speaking...' : 'Read Question'}
                    </Button>
                    {isSpeaking && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={stopSpeech}
                        className="flex items-center gap-2"
                      >
                        <i className="fas fa-stop"></i>
                        Stop
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {currentQ.type === 'multiple_choice' && currentQ.options && (
                <RadioGroup
                  value={answers[currentQ.id] || ''}
                  onValueChange={(value) => !isReviewMode && handleAnswerChange(currentQ.id, value)}
                  className="space-y-3"
                >
                  {currentQ.options.map((option, index) => {
                    // Remove A), B), C), D) prefixes from display
                    const cleanOption = option.replace(/^[A-D]\)\s*/, '');
                    
                    // Review mode styling
                    const isUserAnswer = answers[currentQ.id] === option;
                    // Compare the full option text with the correct answer from the quiz object
                    const isCorrectAnswer = isReviewMode && option === currentQ.correctAnswer;
                    const isIncorrectUserAnswer = isReviewMode && isUserAnswer && !isCorrectAnswer;
                    
                    let optionClass = "flex items-center space-x-3 p-3 rounded-lg border";
                    if (isReviewMode) {
                      if (isCorrectAnswer) {
                        optionClass += " bg-green-50 border-green-200";
                      } else if (isIncorrectUserAnswer) {
                        optionClass += " bg-red-50 border-red-200";
                      } else {
                        optionClass += " bg-gray-50";
                      }
                    } else {
                      optionClass += " hover:bg-gray-50";
                    }
                    
                    return (
                      <div key={index} className={optionClass}>
                        <RadioGroupItem 
                          value={option} 
                          id={`option-${index}`} 
                          disabled={isReviewMode}
                        />
                        <Label 
                          htmlFor={`option-${index}`} 
                          className={`flex-1 ${isReviewMode ? '' : 'cursor-pointer'}`}
                        >
                          {cleanOption}
                          {isReviewMode && isCorrectAnswer && (
                            <span className="ml-2 text-green-600 font-semibold">✓ Correct Answer</span>
                          )}
                          {isReviewMode && isIncorrectUserAnswer && (
                            <span className="ml-2 text-red-600 font-semibold">✗ Your Answer</span>
                          )}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              )}

              {currentQ.type === 'yes_no_with_text' && (
                <div className="space-y-4">
                  <RadioGroup
                    value={answers[currentQ.id]?.split('|')[0] || ''}
                    onValueChange={(value) => {
                      const textResponse = answers[currentQ.id]?.split('|')[1] || '';
                      handleAnswerChange(currentQ.id, `${value}|${textResponse}`);
                    }}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                      <RadioGroupItem value="Yes" id="yes-option" />
                      <Label htmlFor="yes-option" className="flex-1 cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                      <RadioGroupItem value="No" id="no-option" />
                      <Label htmlFor="no-option" className="flex-1 cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {answers[currentQ.id]?.split('|')[0] === 'No' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <Label htmlFor="text-response" className="block text-sm font-medium text-gray-700 mb-2">
                        If no, please explain why you have not been on fire for God:
                      </Label>
                      <Textarea
                        id="text-response"
                        value={answers[currentQ.id]?.split('|')[1] || ''}
                        onChange={(e) => {
                          const yesNoResponse = answers[currentQ.id]?.split('|')[0] || 'No';
                          handleAnswerChange(currentQ.id, `${yesNoResponse}|${e.target.value}`);
                        }}
                        placeholder="Please explain why you have not been on fire for God..."
                        className="min-h-20"
                      />
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if ('webkitSpeechRecognition' in window) {
                              const recognition = new (window as any).webkitSpeechRecognition();
                              recognition.continuous = false;
                              recognition.interimResults = false;
                              recognition.lang = 'en-US';
                              
                              recognition.onresult = (event: any) => {
                                const transcript = event.results[0][0].transcript;
                                const yesNoResponse = answers[currentQ.id]?.split('|')[0] || 'No';
                                const currentText = answers[currentQ.id]?.split('|')[1] || '';
                                handleAnswerChange(currentQ.id, `${yesNoResponse}|${currentText} ${transcript}`);
                              };
                              
                              recognition.start();
                            } else {
                              alert('Speech recognition not supported in this browser');
                            }
                          }}
                        >
                          🎤 Voice Input
                        </Button>
                        <span className="text-sm text-gray-500">Click to add voice input</span>
                      </div>
                    </div>
                  )}
                </div>
              )}


              {((currentQ as any).type === 'essay' || (currentQ as any).type === 'text_with_voice' || (currentQ as any).type === 'subjective') && (
                <div className="space-y-4">
                  {/* Essay Requirements */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-200">
                    <h4 className="font-semibold mb-2">Essay Requirements:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Minimum 100 words required</li>
                      <li>• Use specific examples from the course materials</li>
                      <li>• Explain how principles apply to your spiritual journey</li>
                      <li>• Be thorough and thoughtful in your response</li>
                    </ul>
                  </div>

                  {/* Word Count Display */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant={((answers[currentQ.id] || '').trim().split(/\s+/).filter(word => word.length > 0).length) >= 100 ? "default" : "destructive"} className="text-sm">
                        Word Count: {(answers[currentQ.id] || '').trim().split(/\s+/).filter(word => word.length > 0).length} / 100 minimum
                      </Badge>
                      {((answers[currentQ.id] || '').trim().split(/\s+/).filter(word => word.length > 0).length) >= 100 && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          ✓ Requirement Met
                        </Badge>
                      )}
                    </div>

                    {/* Speech-to-Text Button */}
                    {speechSupported && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if ('webkitSpeechRecognition' in window) {
                            const recognition = new (window as any).webkitSpeechRecognition();
                            recognition.continuous = true;
                            recognition.interimResults = true;
                            recognition.lang = 'en-US';
                            
                            recognition.onresult = (event: any) => {
                              let finalTranscript = '';
                              for (let i = event.resultIndex; i < event.results.length; i++) {
                                if (event.results[i].isFinal) {
                                  finalTranscript += event.results[i][0].transcript + ' ';
                                }
                              }
                              if (finalTranscript) {
                                const currentText = answers[currentQ.id] || '';
                                handleAnswerChange(currentQ.id, currentText + finalTranscript);
                              }
                            };
                            
                            recognition.start();
                            toast({
                              title: "Speech Recognition Started",
                              description: "Start speaking. Your words will be added to the essay."
                            });
                          } else {
                            toast({
                              title: "Speech Recognition Unavailable",
                              description: "Please type your essay response.",
                              variant: "destructive"
                            });
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <i className="fas fa-microphone"></i>
                        Speak to Write
                      </Button>
                    )}
                  </div>

                  {/* Essay Text Area */}
                  <div className="space-y-2">
                    <Label htmlFor="essay-response" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Essay Response:
                    </Label>
                    <Textarea
                      id="essay-response"
                      value={answers[currentQ.id] || ''}
                      onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                      placeholder="Begin typing your essay here... You can also use the 'Speak to Write' button to dictate your response."
                      className="min-h-[300px] text-base leading-relaxed"
                    />
                  </div>

                  {/* Read Aloud Button */}
                  {(answers[currentQ.id] || '').length > 0 && (
                    <div className="flex justify-start">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            const utterance = new SpeechSynthesisUtterance(answers[currentQ.id] || '');
                            utterance.rate = 0.8;
                            utterance.pitch = 1;
                            speechSynthesis.speak(utterance);
                          } else {
                            toast({
                              title: "Text-to-Speech Unavailable",
                              description: "Your browser doesn't support text-to-speech.",
                              variant: "destructive"
                            });
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <i className="fas fa-volume-up"></i>
                        Read Essay Aloud
                      </Button>
                    </div>
                  )}
                </div>
              )}


            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-2 md:gap-4 px-2 py-3 md:px-0 md:py-4">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentQuestion === 0}
            className="px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
          >
            <i className="fas fa-chevron-left mr-1 md:mr-2"></i>
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>

          <div className="flex space-x-1 md:space-x-2 overflow-x-auto">
            {visibleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full text-xs md:text-sm font-medium transition-colors flex-shrink-0 ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[question.id]
                    ? question.isBonus
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {isReviewMode ? (
            <Button
              onClick={() => setLocation('/dashboard')}
              className="px-4 py-2 text-sm md:px-6 md:py-2 md:text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white"
            >
              <i className="fas fa-arrow-left mr-1 md:mr-2"></i>
              <span className="hidden sm:inline">Return to Course</span>
              <span className="sm:hidden">Return</span>
            </Button>
          ) : currentQuestion === visibleQuestions.length - 1 ? (
            <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
              <AlertDialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 px-4 py-2 text-sm md:px-6 md:py-2 md:text-base font-semibold">
                  <i className="fas fa-check mr-1 md:mr-2"></i>
                  <span className="hidden sm:inline">Submit Quiz</span>
                  <span className="sm:hidden">Submit</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to submit your quiz? You have answered {Object.keys(answers).length} out of {quiz.questions.length} questions. 
                    Once submitted, you cannot change your answers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Review Answers</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                    Submit Quiz
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button
              onClick={goToNext}
              disabled={currentQuestion >= visibleQuestions.length - 1}
              className="px-4 py-2 text-sm md:px-6 md:py-2 md:text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <i className="fas fa-chevron-right ml-1 md:ml-2"></i>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}