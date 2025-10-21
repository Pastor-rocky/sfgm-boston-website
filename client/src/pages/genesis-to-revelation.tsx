import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
// import bibleBackground from "@assets/image_1753255181006.png";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Play, Trophy, Users, Award, Star, Lock, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";

interface GenesisVideo {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  scriptureReference?: string;
  sessionNumber: number;
  duration?: number;
  createdAt: string;
}

interface GenesisQuiz {
  id: number;
  title: string;
  description: string;
  sessionNumber: number;
  questions: string;
  createdAt: string;
}

interface StudentProgress {
  id: number;
  userId: string;
  courseId: number;
  sessionNumber: number;
  quizScore: number | null;
  quizTotal: number | null;
  quizPercentage: number | null;
  completedAt: string | null;
}

interface LeaderboardEntry {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  gender: string | null;
  totalScore: number;
  quizzesCompleted: number;
  averageScore: number;
  fastestCompletion: string | null;
}

interface QuizSubmission {
  quizId: number;
  userId: string;
  score: number;
  totalQuestions: number;
  answers: string;
  sessionNumber: number;
}

interface QuizAttempt {
  id: number;
  userId: string;
  sessionNumber: number;
  participantName: string;
  score: number;
  totalQuestions: number;
  createdAt: string;
}

export default function GenesisToRevelation() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [selectedQuiz, setSelectedQuiz] = useState<GenesisQuiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = useState("videos");
  const [collapsedMonths, setCollapsedMonths] = useState<Set<number>>(new Set());
  const [selectedVideo, setSelectedVideo] = useState<GenesisVideo | null>(null);
  const [showGenderDialog, setShowGenderDialog] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>('');

  // Month names for the 12-month study
  const monthNames = [
    "July - Genesis Beginnings", // Month 1 (Weeks 1-4)
    "August - Exodus & Leviticus", // Month 2 (Weeks 5-8)
    "September - Numbers & Deuteronomy", // Month 3 (Weeks 9-12)
    "October - Joshua & Judges", // Month 4 (Weeks 13-16)
    "November - Ruth & Samuel", // Month 5 (Weeks 17-20)
    "December - Kings & Chronicles", // Month 6 (Weeks 21-24)
    "January - Ezra & Esther", // Month 7 (Weeks 25-28)
    "February - Job & Psalms", // Month 8 (Weeks 29-32)
    "March - Proverbs & Ecclesiastes", // Month 9 (Weeks 33-36)
    "April - Isaiah & Jeremiah", // Month 10 (Weeks 37-40)
    "May - Daniel & Minor Prophets", // Month 11 (Weeks 41-44)
    "June - New Testament Journey" // Month 12 (Weeks 45-48)
  ];

  const toggleMonthCollapse = (month: number) => {
    const newCollapsed = new Set(collapsedMonths);
    if (newCollapsed.has(month)) {
      newCollapsed.delete(month);
    } else {
      newCollapsed.add(month);
    }
    setCollapsedMonths(newCollapsed);
  };

  // Fetch videos
  const { data: videos = [], isLoading: videosLoading } = useQuery<GenesisVideo[]>({
    queryKey: ['/api/genesis-videos'],
    enabled: isAuthenticated
  });

  // Fetch quizzes
  const { data: quizzes = [], isLoading: quizzesLoading } = useQuery<GenesisQuiz[]>({
    queryKey: ['/api/genesis-quizzes'],
    enabled: isAuthenticated
  });

  // Fetch student progress
  const { data: studentProgress = [], isLoading: progressLoading } = useQuery<StudentProgress[]>({
    queryKey: ['/api/mini-course-progress', 1], // Course ID 1 for Genesis to Revelation
    enabled: isAuthenticated
  });

  // Fetch leaderboard data (gender-based)
  const { data: leaderboard = [], isLoading: leaderboardLoading, refetch: refetchLeaderboard } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/genesis-leaderboard'],
    enabled: isAuthenticated
  });

  // Fetch enrollment status
  const { data: enrollmentStatus, isLoading: enrollmentLoading } = useQuery<{ enrolled: boolean; enrolledAt?: string }>({
    queryKey: ['/api/mini-course-enrollment-status', 1],
    enabled: isAuthenticated
  });

  // Quiz attempts data (for future implementation)
  const quizAttempts: QuizAttempt[] = [];

  // Auto-enroll student in Genesis to Revelation mini course
  const enrollMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/mini-course-enroll', { courseId: 1 }); // Genesis to Revelation course ID
    },
    onSuccess: () => {
      toast({
        title: "Enrollment Successful!",
        description: "You're now enrolled in Genesis to Revelation study.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/mini-course-progress', 1] });
      queryClient.invalidateQueries({ queryKey: ['/api/mini-course-enrollment-status', 1] });
    },
    onError: (error: any) => {
      console.error('Enrollment error:', error);
      toast({
        title: "Enrollment Failed",
        description: error?.message || "Please try again.",
        variant: "destructive"
      });
    }
  });

  // Unenroll student from Genesis to Revelation mini course
  const unenrollMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/mini-course-unenroll', { courseId: 1 }); // Genesis to Revelation course ID
    },
    onSuccess: () => {
      toast({
        title: "Unenrollment Successful!",
        description: "You have been unenrolled from Genesis to Revelation study.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/mini-course-progress', 1] });
      queryClient.invalidateQueries({ queryKey: ['/api/mini-course-enrollment-status', 1] });
    },
    onError: () => {
      toast({
        title: "Unenrollment Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  });

  // Update user gender mutation
  const updateGenderMutation = useMutation({
    mutationFn: async (gender: string) => {
      return apiRequest('PUT', '/api/profile', { gender });
    },
    onSuccess: () => {
      toast({
        title: "Gender Updated!",
        description: "Your gender has been updated for leaderboard participation.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      setShowGenderDialog(false);
      // Auto-enroll after gender is set
      enrollMutation.mutate();
    },
    onError: (error: any) => {
      console.error('Gender update error:', error);
      toast({
        title: "Update Failed",
        description: error?.message || "Please try again.",
        variant: "destructive"
      });
    }
  });


  // Quiz submission mutation
  const submitQuizMutation = useMutation({
    mutationFn: async (submission: QuizSubmission) => {
      return apiRequest('POST', '/api/mini-course-quiz-submit', submission);
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Quiz Completed!",
        description: `You scored ${variables.score}/${variables.totalQuestions} (${Math.round(variables.score/variables.totalQuestions * 100)}%)`,
      });
      setSelectedQuiz(null);
      setQuizAnswers({});
      queryClient.invalidateQueries({ queryKey: ['/api/mini-course-progress', 1] });
      queryClient.invalidateQueries({ queryKey: ['/api/genesis-leaderboard'] });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleQuizSubmission = () => {
    if (!selectedQuiz || !user) return;
    
    const questions = JSON.parse(selectedQuiz.questions);
    const score = Object.entries(quizAnswers).reduce((total, [questionIndex, answer]) => {
      const question = questions[parseInt(questionIndex)];
      return total + (question.correctAnswer === answer ? 1 : 0);
    }, 0);

    const submission: QuizSubmission = {
      quizId: selectedQuiz.id,
      userId: user?.id || '',
      score,
      totalQuestions: questions.length,
      answers: JSON.stringify(quizAnswers),
      sessionNumber: selectedQuiz.sessionNumber
    };

    submitQuizMutation.mutate(submission);
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('instagram.com/p/')) {
      const postId = url.split('/p/')[1].split('/')[0];
      return `https://www.instagram.com/p/${postId}/embed/`;
    }
    return url;
  };

  // Gender-based leaderboards
  const maleLeaders = leaderboard.filter(entry => entry.gender === 'male')
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 5);
  
  const femaleLeaders = leaderboard.filter(entry => entry.gender === 'female')
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 5);
  
  const overallLeaders = leaderboard
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 10);

  // Monthly progression logic (4 weeks per month)
  const getMonthFromWeek = (weekNumber: number): number => {
    return Math.ceil(weekNumber / 4);
  };

  const getWeekInMonth = (weekNumber: number): number => {
    return ((weekNumber - 1) % 4) + 1;
  };

  const canAccessWeek = (weekNumber: number): boolean => {
    if (!user) return false;
    if (weekNumber === 1) return true; // Week 1 always accessible
    
    // Check if previous week's quiz is completed with passing score (70%)
    const previousWeekProgress = studentProgress.filter(
      progress => progress.sessionNumber === weekNumber - 1
    );
    
    if (previousWeekProgress.length === 0) return false;
    
    const bestScore = Math.max(...previousWeekProgress.map(progress => 
      progress.quizPercentage || 0
    ));
    
    return bestScore >= 70; // 70% passing score required
  };

  const getWeekStatus = (weekNumber: number) => {
    if (!user) return 'locked';
    
    if (canAccessWeek(weekNumber)) {
      const userProgress = studentProgress.filter(
        progress => progress.sessionNumber === weekNumber
      );
      
      if (userProgress.length > 0) {
        const bestScore = Math.max(...userProgress.map(progress => 
          progress.quizPercentage || 0
        ));
        return bestScore >= 70 ? 'completed' : 'attempted';
      }
      return 'available';
    }
    return 'locked';
  };

  // Check if a month has any content (videos or quizzes)
  const isMonthActive = (month: number) => {
    const hasVideos = videos.some(video => getMonthFromWeek(video.sessionNumber) === month);
    const hasQuizzes = quizzes.some(quiz => getMonthFromWeek(quiz.sessionNumber) === month);
    return hasVideos || hasQuizzes;
  };

  // Get month name with fallback
  const getMonthName = (month: number) => {
    return monthNames[month - 1] || `Month ${month}`;
  };

  // Group content by months
  const groupContentByMonths = (items: any[]) => {
    const months: { [key: number]: any[] } = {};
    items.forEach(item => {
      const month = getMonthFromWeek(item.sessionNumber);
      if (!months[month]) months[month] = [];
      months[month].push(item);
    });
    return months;
  };

  const videosByMonth = groupContentByMonths(videos);
  const quizzesByMonth = groupContentByMonths(quizzes);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-yellow-600";
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    return "text-gray-600";
  };

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `linear-gradient(to bottom right, #1e40af, #7c3aed)` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Loading...</h2>
              <p>Checking your authentication status...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show login requirement for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `linear-gradient(to bottom right, #1e40af, #7c3aed)` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                Genesis to Revelation Study
              </CardTitle>
              <p className="text-xl text-gray-600">Student Access Required</p>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Student Login Required</h3>
                <p className="text-lg text-gray-600 mb-6">
                  This Bible study course is now available exclusively to registered SFGM Boston Bible School students. 
                  Please log in with your student account to access videos, quizzes, and compete on the leaderboard.
                </p>
                <div className="space-y-4">
                  <p className="text-gray-500">
                    🏆 <strong>Monthly Competition:</strong> Win beautiful study Bibles
                  </p>
                  <p className="text-gray-500">
                    📚 <strong>Gender-Based Leaderboards:</strong> Top male and female performers
                  </p>
                  <p className="text-gray-500">
                    📖 <strong>Progressive Learning:</strong> Complete weeks 1-4 to earn prizes
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <Link href="/login">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3">
                    Student Login
                  </Button>
                </Link>
                <p className="text-sm text-gray-500">
                  Don't have a student account? Contact Pastor Rocky to enroll in SFGM Boston Bible School.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Bible Background */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to bottom right, #1e40af, #7c3aed)`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
          <div className="relative z-10 container mx-auto px-3 sm:px-4 py-4 sm:py-8">
            {/* Back Button */}
            <div className="mb-4 sm:mb-6">
              <Link href="/dashboard">
                <Button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border border-white border-opacity-50 backdrop-blur-sm text-sm sm:text-base px-3 sm:px-4 py-2">
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg px-2">
                From Genesis to Revelation
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-yellow-300 mb-4 sm:mb-6 drop-shadow-lg px-2">
                Finding Jesus Throughout the Bible - Student Edition
              </p>
              
              {/* Welcome Student Message */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white bg-opacity-95 rounded-lg p-6 shadow-2xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome, {(user as any)?.firstName} {(user as any)?.lastName}!
                  </h2>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                    {enrollmentStatus?.enrolled ? 
                      "You're enrolled in our comprehensive Bible study journey. Complete weekly quizzes to compete for monthly prizes in gender-based competitions." :
                      "Join our comprehensive Bible study journey. Complete weekly quizzes to compete for monthly prizes in gender-based competitions."
                    }
                  </p>
                  
                  {/* Enrollment Section */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-center sm:text-left">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {enrollmentStatus?.enrolled ? "Enrollment Status" : "Course Enrollment"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {enrollmentStatus?.enrolled ? 
                            `Enrolled on ${enrollmentStatus.enrolledAt ? new Date(enrollmentStatus.enrolledAt).toLocaleDateString() : 'Unknown'}` :
                            "Enroll to access all course content and track your progress"
                          }
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        {enrollmentStatus?.enrolled ? (
                          <Button
                            onClick={() => unenrollMutation.mutate()}
                            disabled={unenrollMutation.isPending}
                            variant="outline"
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            {unenrollMutation.isPending ? "Unenrolling..." : "Unenroll"}
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              // Check if user has gender set
                              if (!(user as any)?.gender) {
                                setShowGenderDialog(true);
                              } else {
                                enrollMutation.mutate();
                              }
                            }}
                            disabled={enrollMutation.isPending}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
                          </Button>
                        )}
                        {/* Gender Update Button for enrolled users without gender */}
                        {enrollmentStatus?.enrolled && !(user as any)?.gender && (
                          <Button
                            onClick={() => setShowGenderDialog(true)}
                            variant="outline"
                            className="text-blue-600 border-blue-300 hover:bg-blue-50"
                          >
                            Set Gender for Leaderboard
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-xl text-blue-600">📖 Your Progress:</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Completed Quizzes: {studentProgress.length}</li>
                        <li>• Average Score: {studentProgress.length > 0 ? Math.round(studentProgress.reduce((sum, p) => sum + (p.quizPercentage || 0), 0) / studentProgress.length) : 0}%</li>
                        <li>• Current Week: Week {Math.min(studentProgress.length + 1, 4)}</li>
                        <li>• Competition: {(user as any)?.gender || 'Unspecified'} Division</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-xl text-purple-600">🏆 Monthly Prize Info:</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• This Month's Prize: Beautiful Study Bible</li>
                        <li>• Separate competitions for male and female students</li>
                        <li>• Winner: Highest quiz scores (4 weeks)</li>
                        <li>• Tiebreaker: Fastest completion time</li>
                      </ul>
                    </div>
                  </div>

                  {/* Student Dashboard Section */}
                  {enrollmentStatus?.enrolled && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Your Participation Dashboard
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-sm font-medium text-gray-700">Enrollment Date:</span>
                            <span className="text-sm text-gray-600">
                              {enrollmentStatus.enrolledAt ? new Date(enrollmentStatus.enrolledAt).toLocaleDateString() : 'Unknown'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-sm font-medium text-gray-700">Total Quizzes Taken:</span>
                            <span className="text-sm text-gray-600">{studentProgress.length}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-sm font-medium text-gray-700">Average Score:</span>
                            <span className="text-sm text-gray-600">
                              {studentProgress.length > 0 ? 
                                Math.round(studentProgress.reduce((sum, p) => sum + (p.quizPercentage || 0), 0) / studentProgress.length) + '%' : 
                                '0%'
                              }
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-sm font-medium text-gray-700">Current Division:</span>
                            <span className="text-sm text-gray-600 capitalize">{(user as any)?.gender || 'Unspecified'}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-sm font-medium text-gray-700">Last Quiz Date:</span>
                            <span className="text-sm text-gray-600">
                              {studentProgress.length > 0 ? 
                                new Date(Math.max(...studentProgress.map(p => new Date(p.completedAt || '').getTime()))).toLocaleDateString() : 
                                'No quizzes taken'
                              }
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white rounded">
                            <span className="text-sm font-medium text-gray-700">Course Status:</span>
                            <span className="text-sm text-green-600 font-medium">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center gap-4 text-white text-lg flex-wrap">
                <div className="flex items-center gap-2 bg-blue-600 bg-opacity-80 px-4 py-2 rounded-full">
                  <Play className="h-5 w-5" />
                  <span>{videos.length} Videos</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-600 bg-opacity-80 px-4 py-2 rounded-full">
                  <Trophy className="h-5 w-5" />
                  <span>{quizzes.length} Quizzes</span>
                </div>
                <div className="flex items-center gap-2 bg-green-600 bg-opacity-80 px-4 py-2 rounded-full">
                  <Users className="h-5 w-5" />
                  <span>{leaderboard.length} Students</span>
                </div>
                <Button 
                  onClick={() => setActiveTab("leaderboard")}
                  className="bg-yellow-600 bg-opacity-90 hover:bg-yellow-700 px-4 py-2 rounded-full text-white font-semibold"
                >
                  🏆 View Leaderboard
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section with Different Background */}
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white bg-opacity-90 shadow-lg">
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Weekly Videos
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Weekly Quizzes
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Leaderboard
              </TabsTrigger>
            </TabsList>

            {/* Videos Tab */}
            <TabsContent value="videos">
              {videosLoading ? (
                <div className="text-center py-8">Loading videos...</div>
              ) : (
                <div className="space-y-8">
                  {/* Show all 12 months for videos */}
                  {Array.from({ length: 12 }, (_, index) => {
                    const month = index + 1;
                    const monthVideos = videosByMonth[month] || [];
                    const monthIsActive = isMonthActive(month);
                    const isCollapsed = collapsedMonths.has(month);
                    
                    return (
                      <div key={month} className="space-y-4">
                        <div className="text-left">
                          <div 
                            className={`flex items-center gap-3 mb-4 ${monthIsActive ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed opacity-60'}`}
                            onClick={monthIsActive ? () => toggleMonthCollapse(month) : undefined}
                          >
                            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                              {getMonthName(month)}
                            </h2>
                            {!monthIsActive && (
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                Coming Soon
                              </Badge>
                            )}
                            {monthIsActive && (isCollapsed ? <ChevronDown className="text-white" /> : <ChevronUp className="text-white" />)}
                          </div>
                          <div className="bg-white bg-opacity-20 rounded-lg p-3 inline-block">
                            <p className="text-white text-sm font-medium">
                              4 Weekly Teachings • Complete all quizzes to unlock next month
                            </p>
                          </div>
                        </div>
                        
                        {!isCollapsed && (
                          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {monthIsActive ? (
                              monthVideos.map((video: GenesisVideo) => {
                                const weekStatus = getWeekStatus(video.sessionNumber);
                                const isAccessible = canAccessWeek(video.sessionNumber);
                                const weekInMonth = getWeekInMonth(video.sessionNumber);
                                
                                return (
                                  <Card key={video.id} className={`overflow-hidden ${!isAccessible ? 'opacity-60' : 'cursor-pointer hover:shadow-lg transition-shadow'}`}>
                                    <div className="relative" onClick={() => isAccessible && setSelectedVideo(video)}>
                                      <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
                                        {video.thumbnailUrl ? (
                                          <img 
                                            src={video.thumbnailUrl} 
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <div className="text-center text-gray-500">
                                            <div className="text-4xl mb-2">📹</div>
                                            <p className="text-sm">Video Thumbnail</p>
                                          </div>
                                        )}
                                        {isAccessible && (
                                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition-colors">
                                            <div className="bg-red-600 rounded-full p-4 text-white">
                                              <Play className="h-8 w-8 ml-1" />
                                            </div>
                                          </div>
                                        )}
                                        {!isAccessible && (
                                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <div className="text-center text-white">
                                              <div className="text-2xl mb-2">🔒</div>
                                              <p className="text-sm">Complete Week {video.sessionNumber - 1} Quiz First</p>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <CardContent className="p-4">
                                      <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-lg">{video.title}</h3>
                                        <div className="flex gap-2">
                                          <Badge variant="secondary">Week {weekInMonth}</Badge>
                                          {weekStatus === 'completed' && <Badge className="bg-green-500">✓ Complete</Badge>}
                                          {weekStatus === 'attempted' && <Badge className="bg-yellow-500">Attempted</Badge>}
                                          {weekStatus === 'locked' && <Badge className="bg-gray-500">🔒 Locked</Badge>}
                                        </div>
                                      </div>
                                      {video.description && (
                                        <p className="text-gray-600 text-sm mb-2">{video.description}</p>
                                      )}
                                      {video.scriptureReference && (
                                        <p className="text-blue-600 text-sm font-medium">{video.scriptureReference}</p>
                                      )}
                                      {isAccessible && (
                                        <Button 
                                          className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedVideo(video);
                                          }}
                                        >
                                          <Play className="h-4 w-4 mr-2" />
                                          Watch Video
                                        </Button>
                                      )}
                                    </CardContent>
                                  </Card>
                                );
                              })
                            ) : (
                              // Show placeholder cards for inactive months
                              Array.from({ length: 4 }, (_, weekIndex) => (
                                <Card key={weekIndex} className="overflow-hidden opacity-50 border-dashed">
                                  <div className="relative">
                                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                                      <div className="text-center text-gray-500">
                                        <div className="text-3xl mb-2">📹</div>
                                        <p className="text-sm">Coming Soon</p>
                                      </div>
                                    </div>
                                  </div>
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                      <h3 className="font-semibold text-lg text-gray-400">Week {weekIndex + 1} Teaching</h3>
                                      <Badge className="bg-blue-400">Available</Badge>
                                    </div>
                                    <p className="text-gray-500 text-sm">Video content available</p>
                                  </CardContent>
                                </Card>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* Quizzes Tab */}
            <TabsContent value="quizzes">
              {selectedQuiz ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {selectedQuiz.title}
                      <Badge>Week {selectedQuiz.sessionNumber}</Badge>
                    </CardTitle>
                    {selectedQuiz.description && (
                      <p className="text-gray-600">{selectedQuiz.description}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {JSON.parse(selectedQuiz.questions).map((question: any, index: number) => (
                        <div key={index} className="space-y-3">
                          <h4 className="font-medium">{index + 1}. {question.question}</h4>
                          <div className="space-y-2">
                            {question.options.map((option: string, optionIndex: number) => (
                              <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={`question-${index}`}
                                  value={option}
                                  onChange={(e) => setQuizAnswers({...quizAnswers, [index]: e.target.value})}
                                  className="text-blue-600"
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button onClick={handleQuizSubmission} className="flex-1">
                        Submit Quiz
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedQuiz(null);
                          setQuizAnswers({});
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-8">
                  {quizzesLoading ? (
                    <div className="text-center py-8">Loading quizzes...</div>
                  ) : (
                    // Show all 12 months
                    Array.from({ length: 12 }, (_, index) => {
                      const month = index + 1;
                      const monthQuizzes = quizzesByMonth[month] || [];
                      const monthIsActive = isMonthActive(month);
                      const isCollapsed = collapsedMonths.has(month);
                      
                      return (
                        <div key={month} className="space-y-4">
                          <div className="text-left">
                            <div 
                              className={`flex items-center gap-3 mb-4 ${monthIsActive ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed opacity-60'}`}
                              onClick={monthIsActive ? () => toggleMonthCollapse(month) : undefined}
                            >
                              <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                                {getMonthName(month)}
                              </h2>
                              {!monthIsActive && (
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                  Coming Soon
                                </Badge>
                              )}
                              {monthIsActive && (isCollapsed ? <ChevronDown className="text-white" /> : <ChevronUp className="text-white" />)}
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-3 inline-block">
                              <p className="text-white text-sm font-medium">
                                Complete all 4 quizzes to unlock next month • 70% passing required
                              </p>
                            </div>
                          </div>
                          
                          {!isCollapsed && (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                              {monthIsActive ? (
                                monthQuizzes.map((quiz: GenesisQuiz) => {
                                  const weekStatus = getWeekStatus(quiz.sessionNumber);
                                  const isAccessible = canAccessWeek(quiz.sessionNumber);
                                  const weekInMonth = getWeekInMonth(quiz.sessionNumber);
                                  const hasAttempted = (quizAttempts as QuizAttempt[]).some(
                                    attempt => attempt.sessionNumber === quiz.sessionNumber && 
                                    attempt.userId === user?.id
                                  );
                                  
                                  return (
                                    <Card key={quiz.id} className={`${!isAccessible ? 'opacity-60' : 'cursor-pointer hover:shadow-lg'} transition-shadow`}>
                                      <CardHeader>
                                        <div className="flex items-start justify-between">
                                          <CardTitle className="text-lg">{quiz.title}</CardTitle>
                                          <div className="flex gap-2">
                                            <Badge>Week {weekInMonth}</Badge>
                                            {weekStatus === 'completed' && <Badge className="bg-green-500">✓ Passed</Badge>}
                                            {weekStatus === 'attempted' && <Badge className="bg-yellow-500">Failed</Badge>}
                                            {weekStatus === 'locked' && <Badge className="bg-gray-500">🔒 Locked</Badge>}
                                          </div>
                                        </div>
                                        {quiz.description && (
                                          <p className="text-gray-600 text-sm">{quiz.description}</p>
                                        )}
                                      </CardHeader>
                                      <CardContent>
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm text-gray-500">
                                            {JSON.parse(quiz.questions).length} Questions
                                          </span>
                                          {!isAccessible ? (
                                            <Button disabled className="bg-gray-400">
                                              🔒 Complete Week {quiz.sessionNumber - 1} First
                                            </Button>
                                          ) : hasAttempted ? (
                                            <Button variant="outline" onClick={() => setSelectedQuiz(quiz)}>
                                              Retake Quiz
                                            </Button>
                                          ) : (
                                            <Button onClick={() => setSelectedQuiz(quiz)}>
                                              Take Quiz
                                            </Button>
                                          )}
                                        </div>
                                        {!isAccessible && (
                                          <p className="text-xs text-gray-500 mt-2">
                                            Pass Week {quiz.sessionNumber - 1} quiz with 70% to unlock
                                          </p>
                                        )}
                                      </CardContent>
                                    </Card>
                                  );
                                })
                              ) : (
                                // Show placeholder cards for inactive months
                                Array.from({ length: 4 }, (_, weekIndex) => (
                                  <Card key={weekIndex} className="opacity-50 border-dashed">
                                    <CardHeader>
                                      <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg text-gray-400">Week {weekIndex + 1} Quiz</CardTitle>
                                        <Badge className="bg-gray-400">Coming Soon</Badge>
                                      </div>
                                      <p className="text-gray-500 text-sm">Quiz content will be available soon</p>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">TBD Questions</span>
                                        <Button disabled className="bg-gray-300">
                                          Coming Soon
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </TabsContent>

            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard">
              <div className="space-y-6">
                {/* Overall Competition Leaderboard */}
                <Card className="bg-white bg-opacity-95 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Overall Competition Leaderboard
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      <strong>Prize Winner:</strong> Highest average score wins! In case of tie, fastest completion time determines the winner.
                      <br />
                      <strong>Current Month's Prize:</strong> Beautiful Study Bible 📖
                    </p>
                  </CardHeader>
                  <CardContent>
                    {leaderboardLoading ? (
                      <div className="text-center py-8">Loading leaderboard...</div>
                    ) : overallLeaders.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No quiz attempts yet. Be the first to take a quiz!
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {overallLeaders.map((entry: LeaderboardEntry, index: number) => {
                          const percentage = Math.round(entry.averageScore);
                          return (
                            <div key={entry.userId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                                  {index === 0 && <Star className="h-4 w-4 text-yellow-500" />}
                                  {index > 0 && index + 1}
                                </div>
                                <div>
                                  <p className="font-medium">{entry.firstName} {entry.lastName}</p>
                                  <p className="text-sm text-gray-500">{entry.quizzesCompleted} quizzes completed</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`font-bold ${getScoreColor(percentage)}`}>
                                  {percentage}% avg
                                </p>
                                <p className="text-sm text-gray-500">{entry.totalScore} total points</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Gender-Based Competition */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Male Competition */}
                  <Card className="bg-white bg-opacity-95 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        Male Competition
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        Top 5 male students competing for prizes
                      </p>
                    </CardHeader>
                    <CardContent>
                      {maleLeaders.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          No male participants yet
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {maleLeaders.map((entry: LeaderboardEntry, index: number) => {
                            const percentage = Math.round(entry.averageScore);
                            return (
                              <div key={entry.userId} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                                    {index === 0 && <Star className="h-4 w-4 text-yellow-500" />}
                                    {index > 0 && index + 1}
                                  </div>
                                  <div>
                                    <p className="font-medium">{entry.firstName} {entry.lastName}</p>
                                    <p className="text-sm text-gray-500">{entry.quizzesCompleted} completed</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className={`font-bold ${getScoreColor(percentage)}`}>
                                    {percentage}%
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Female Competition */}
                  <Card className="bg-white bg-opacity-95 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-pink-500" />
                        Female Competition
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        Top 5 female students competing for prizes
                      </p>
                    </CardHeader>
                    <CardContent>
                      {femaleLeaders.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          No female participants yet
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {femaleLeaders.map((entry: LeaderboardEntry, index: number) => {
                            const percentage = Math.round(entry.averageScore);
                            return (
                              <div key={entry.userId} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 font-bold text-sm">
                                    {index === 0 && <Star className="h-4 w-4 text-yellow-500" />}
                                    {index > 0 && index + 1}
                                  </div>
                                  <div>
                                    <p className="font-medium">{entry.firstName} {entry.lastName}</p>
                                    <p className="text-sm text-gray-500">{entry.quizzesCompleted} completed</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className={`font-bold ${getScoreColor(percentage)}`}>
                                    {percentage}%
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Instagram Video Modal - Mobile Optimized */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[95vh] p-0 overflow-hidden">
          <DialogHeader className="p-3 sm:p-4 pb-0 border-b">
            <DialogTitle className="flex items-center justify-between text-base sm:text-lg">
              <span className="truncate mr-2 sm:mr-4 text-sm sm:text-base">{selectedVideo?.title}</span>
              <Badge variant="secondary" className="shrink-0 text-xs">Week {selectedVideo?.sessionNumber}</Badge>
            </DialogTitle>
            <DialogDescription className="sr-only">
              Watch Genesis to Revelation study video content
            </DialogDescription>
            {selectedVideo?.description && (
              <p className="text-gray-600 text-xs sm:text-sm mt-2 overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>{selectedVideo.description}</p>
            )}
            {selectedVideo?.scriptureReference && (
              <p className="text-blue-600 text-xs sm:text-sm font-medium">{selectedVideo.scriptureReference}</p>
            )}
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 sm:p-4">
              <div className="w-full max-w-xs sm:max-w-sm mx-auto">
                {selectedVideo && (
                  <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '9/16', maxHeight: '60vh' }}>
                    <iframe
                      src={getEmbedUrl(selectedVideo.videoUrl)}
                      title={selectedVideo.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      style={{ border: 'none' }}
                    />
                  </div>
                )}
              </div>
              <div className="mt-3 sm:mt-4 text-center">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  Instagram Video Content
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedVideo(null)}
                  className="w-full max-w-xs sm:max-w-md text-sm py-2"
                >
                  Close Video
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gender Selection Dialog */}
      <Dialog open={showGenderDialog} onOpenChange={setShowGenderDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set Your Gender for Leaderboard</DialogTitle>
            <DialogDescription>
              Please select your gender to participate in the monthly leaderboard competition. 
              This helps us organize separate competitions for male and female students.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    checked={selectedGender === "Male"}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <Label htmlFor="male" className="text-sm font-medium">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    checked={selectedGender === "Female"}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <Label htmlFor="female" className="text-sm font-medium">
                    Female
                  </Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowGenderDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedGender) {
                    updateGenderMutation.mutate(selectedGender);
                  }
                }}
                disabled={!selectedGender || updateGenderMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {updateGenderMutation.isPending ? "Enrolling..." : "Enroll"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}