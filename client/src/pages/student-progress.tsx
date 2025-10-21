import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Award, 
  Target,
  BookOpen,
  Users,
  Star,
  ChevronRight,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

export default function StudentProgress() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("progress");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch student academic data - only when authenticated
  const { data: gpaData, isLoading: gpaLoading } = useQuery({
    queryKey: ['/api/analytics/gpa'],
    enabled: isAuthenticated,
  });

  const { data: enrollments = [], isLoading: enrollmentsLoading } = useQuery({
    queryKey: ['/api/enrollments/student'],
    enabled: isAuthenticated,
  });

  const { data: quizData = [], isLoading: quizLoading } = useQuery({
    queryKey: ['/api/student/quizzes/all'],
    enabled: isAuthenticated,
  });

  const { data: certificates = [], isLoading: certificatesLoading } = useQuery({
    queryKey: ['/api/certificates'],
    enabled: isAuthenticated,
  });

  const currentGPA = (gpaData as any)?.gpa || 0;
  const activeEnrollments = (enrollments as any[]).filter((e: any) => e.status === 'active');
  const completedEnrollments = (enrollments as any[]).filter((e: any) => e.status === 'completed');
  const totalEnrollments = (enrollments as any[]).length;

  // Calculate letter grade and academic status
  const getLetterGrade = (gpa: number) => {
    if (gpa >= 3.7) return 'A';
    if (gpa >= 3.3) return 'A-';
    if (gpa >= 3.0) return 'B+';
    if (gpa >= 2.7) return 'B';
    if (gpa >= 2.3) return 'B-';
    if (gpa >= 2.0) return 'C+';
    if (gpa >= 1.7) return 'C';
    if (gpa >= 1.3) return 'C-';
    if (gpa >= 1.0) return 'D';
    return 'F';
  };

  const getAcademicStatus = (gpa: number) => {
    if (gpa >= 3.5) return { status: "Dean's List", color: "text-yellow-400" };
    if (gpa >= 3.0) return { status: "Good Academic Standing", color: "text-green-400" };
    if (gpa >= 2.5) return { status: "Satisfactory Progress", color: "text-blue-400" };
    if (gpa >= 2.0) return { status: "Academic Warning", color: "text-orange-400" };
    return { status: "Academic Probation", color: "text-red-400" };
  };

  const academicStatus = getAcademicStatus(currentGPA);
  const letterGrade = getLetterGrade(currentGPA);

  // Filter and sort enrollments
  const filteredEnrollments = useMemo(() => {
    let filtered = (enrollments as any[]).filter((enrollment: any) => {
      const matchesSearch = !searchTerm || 
        (enrollment.course?.name || enrollment.courseName || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || enrollment.status === selectedFilter;
      return matchesSearch && matchesFilter;
    });

    // Sort enrollments
    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'progress':
          return (b.progress || 0) - (a.progress || 0);
        case 'name':
          return (a.course?.name || a.courseName || '').localeCompare(b.course?.name || b.courseName || '');
        case 'status':
          return a.status.localeCompare(b.status);
        case 'grade':
          return (b.finalGrade || 0) - (a.finalGrade || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [enrollments, searchTerm, selectedFilter, sortBy]);

  // Calculate additional statistics
  const totalStudyTime = (enrollments as any[]).reduce((total: number, enrollment: any) => 
    total + (enrollment.studyTime || 0), 0);
  const averageCourseProgress = (enrollments as any[]).length > 0 
    ? (enrollments as any[]).reduce((sum: number, enrollment: any) => sum + (enrollment.progress || 0), 0) / (enrollments as any[]).length 
    : 0;
  const streakDays = (gpaData as any)?.streakDays || 0;
  const weeklyGoal = (gpaData as any)?.weeklyGoal || 5;
  const weeklyProgress = (gpaData as any)?.weeklyProgress || 0;

  // Calculate quiz statistics
  const completedQuizzes = (quizData as any[]).filter((quiz: any) => quiz.completed);
  const passedQuizzes = completedQuizzes.filter((quiz: any) => quiz.bestScore >= (quiz.passingScore || 75));
  const averageQuizScore = completedQuizzes.length > 0 
    ? completedQuizzes.reduce((sum: number, quiz: any) => sum + (quiz.bestScore || 0), 0) / completedQuizzes.length 
    : 0;

  // Show loading state if queries are still loading
  if (isAuthenticated && (gpaLoading || enrollmentsLoading || quizLoading || certificatesLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading your academic progress...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-white text-center">Authentication Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-blue-200 mb-4">
                Please log in to view your academic progress and track your spiritual education journey.
              </p>
              <a 
                href="/login" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Log In
              </a>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              My Academic Progress
            </h1>
          </div>
          <p className="text-xl text-blue-200 mb-6">
            Track your spiritual education journey and academic performance
          </p>
          
          {/* Quick Stats Bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="text-white text-sm">Streak: {streakDays} days</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-400" />
                <span className="text-white text-sm">Study Time: {Math.round(totalStudyTime)}h</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-400" />
                <span className="text-white text-sm">Weekly Goal: {weeklyProgress}/{weeklyGoal}</span>
              </div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
                >
                  <option value="all">All Courses</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
                >
                  <option value="progress">Sort by Progress</option>
                  <option value="name">Sort by Name</option>
                  <option value="status">Sort by Status</option>
                  <option value="grade">Sort by Grade</option>
                </select>
                <Button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {viewMode === 'grid' ? <BarChart3 className="h-4 w-4" /> : <PieChart className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Academic Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
              </div>
              <CardTitle className="text-white text-lg">Current GPA</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {currentGPA.toFixed(2)}
              </div>
              <Badge variant="outline" className="border-blue-400 text-blue-400 mb-2">
                {letterGrade} Grade
              </Badge>
              <div className={`text-sm ${academicStatus.color} font-medium`}>
                {academicStatus.status}
              </div>
              <div className="mt-2">
                <Progress value={currentGPA * 25} className="h-2 bg-blue-900/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
              </div>
              <CardTitle className="text-white text-lg">Total Courses</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {totalEnrollments}
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex justify-between">
                  <span>Active:</span>
                  <span className="text-green-400 font-medium">{activeEnrollments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span className="text-green-400 font-medium">{completedEnrollments.length}</span>
                </div>
              </div>
              <div className="mt-2">
                <Progress value={averageCourseProgress} className="h-2 bg-green-900/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
              </div>
              <CardTitle className="text-white text-lg">Quiz Performance</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {averageQuizScore.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex justify-between">
                  <span>Passed:</span>
                  <span className="text-purple-400 font-medium">{passedQuizzes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="text-purple-400 font-medium">{completedQuizzes.length}</span>
                </div>
              </div>
              <div className="mt-2">
                <Progress value={averageQuizScore} className="h-2 bg-purple-900/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-white" />
                </div>
              </div>
              <CardTitle className="text-white text-lg">Certificates</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {(certificates as any[]).length}
              </div>
              <div className="text-sm text-gray-300">
                Earned Certificates
              </div>
              <div className="mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white text-xs"
                >
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Detailed Progress Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <TabsList className="grid w-full sm:w-auto grid-cols-3 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="courses" className="text-white data-[state=active]:bg-blue-600 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Course Progress
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="text-white data-[state=active]:bg-blue-600 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Quiz History
              </TabsTrigger>
              <TabsTrigger value="achievements" className="text-white data-[state=active]:bg-blue-600 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Achievements
              </TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Course Progress Tab */}
          <TabsContent value="courses" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  <i className="fas fa-graduation-cap mr-3"></i>
                  Course Enrollment Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredEnrollments.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-book-open text-4xl text-gray-500 mb-4"></i>
                    <p className="text-white mb-2">
                      {searchTerm || selectedFilter !== 'all' 
                        ? 'No courses match your filters' 
                        : 'No course enrollments yet'
                      }
                    </p>
                    <p className="text-gray-400">
                      {searchTerm || selectedFilter !== 'all' 
                        ? 'Try adjusting your search or filter criteria' 
                        : 'Visit Bible School to enroll in courses'
                      }
                    </p>
                    {(searchTerm || selectedFilter !== 'all') && (
                      <Button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedFilter('all');
                        }}
                        variant="outline"
                        className="mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    {filteredEnrollments.map((enrollment: any) => (
                      <div key={enrollment.id} className={`bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 ${viewMode === 'grid' ? 'h-full' : ''}`}>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <h4 className="font-semibold text-white text-lg">
                                {enrollment.course?.name || enrollment.courseName || 'Course Name Not Available'}
                              </h4>
                            </div>
                            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                              {enrollment.course?.description || enrollment.courseDescription || 'Course description not available'}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{enrollment.duration || 'N/A'} weeks</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{enrollment.enrolledStudents || 0} students</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge 
                              variant="outline" 
                              className={`border-white/30 ${
                                enrollment.status === 'completed' ? 'text-green-400 border-green-400' : 
                                enrollment.status === 'active' ? 'text-blue-400 border-blue-400' : 
                                'text-gray-400 border-gray-400'
                              }`}
                            >
                              {enrollment.status === 'completed' ? 'Completed' : 
                               enrollment.status === 'active' ? 'Active' : 'Enrolled'}
                            </Badge>
                            {enrollment.finalGrade && (
                              <div className="text-right">
                                <div className="text-xs text-gray-400">Final Grade</div>
                                <div className="text-lg font-bold text-green-400">{enrollment.finalGrade}%</div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Progress</span>
                            <span className="text-white font-medium">{enrollment.progress || 0}%</span>
                          </div>
                          <Progress 
                            value={enrollment.progress || 0} 
                            className="h-3 bg-gray-700"
                          />
                          
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                              >
                                Continue Course
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                              >
                                View Details
                              </Button>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quiz History Tab */}
          <TabsContent value="quizzes" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  <i className="fas fa-clipboard-check mr-3"></i>
                  Quiz Performance History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(quizData as any[]).length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-clipboard-list text-4xl text-gray-500 mb-4"></i>
                    <p className="text-white mb-2">No quiz attempts yet</p>
                    <p className="text-gray-400">Complete course quizzes to see your performance</p>
                  </div>
                ) : (
                  (quizData as any[]).map((quiz: any) => (
                    <div key={quiz.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{quiz.title}</h4>
                          <p className="text-sm text-gray-400">{quiz.courseName}</p>
                        </div>
                        <div className="text-right">
                          {quiz.completed ? (
                            <Badge 
                              variant="outline" 
                              className={`${
                                (quiz.bestScore || 0) >= (quiz.passingScore || 75) 
                                  ? 'text-green-400 border-green-400' 
                                  : 'text-red-400 border-red-400'
                              }`}
                            >
                              {quiz.bestScore}% - {(quiz.bestScore || 0) >= (quiz.passingScore || 75) ? 'PASSED' : 'FAILED'}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-gray-400 border-gray-400">
                              Not Attempted
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Questions:</span>
                          <span className="text-white ml-2">{quiz.totalQuestions || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Passing Score:</span>
                          <span className="text-white ml-2">{quiz.passingScore || 75}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Time Limit:</span>
                          <span className="text-white ml-2">{quiz.timeLimit || 'N/A'} min</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Attempts:</span>
                          <span className="text-white ml-2">{quiz.attempts || 0}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-xl">
                  <i className="fas fa-trophy mr-3"></i>
                  Academic Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* GPA Scale Reference */}
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h4 className="font-semibold text-white mb-3">GPA Scale Reference</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-yellow-400 font-bold">A (3.7-4.0)</div>
                      <div className="text-gray-300">Excellent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-bold">B (2.7-3.6)</div>
                      <div className="text-gray-300">Good</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">C (1.7-2.6)</div>
                      <div className="text-gray-300">Satisfactory</div>
                    </div>
                    <div className="text-center">
                      <div className="text-red-400 font-bold">D/F (0-1.6)</div>
                      <div className="text-gray-300">Needs Improvement</div>
                    </div>
                  </div>
                </div>

                {/* Certificates */}
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Earned Certificates</h4>
                  {(certificates as any[]).length === 0 ? (
                    <div className="text-center py-4">
                      <i className="fas fa-certificate text-2xl text-gray-500 mb-2"></i>
                      <p className="text-gray-400">Complete courses to earn certificates</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {(certificates as any[]).map((cert: any) => (
                        <div key={cert.id} className="flex justify-between items-center p-2 bg-white/5 rounded">
                          <div>
                            <span className="text-white font-medium">{cert.courseName}</span>
                            <span className="text-gray-400 ml-2">• {cert.completionDate}</span>
                          </div>
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                            {cert.finalGrade}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Academic Milestones */}
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Academic Milestones</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <i className={`fas fa-star mr-3 ${currentGPA >= 3.5 ? 'text-yellow-400' : 'text-gray-500'}`}></i>
                        <span className="text-white">Dean's List (3.5+ GPA)</span>
                      </div>
                      <Badge variant={currentGPA >= 3.5 ? "default" : "outline"} className={currentGPA >= 3.5 ? "bg-yellow-600" : "border-gray-500 text-gray-500"}>
                        {currentGPA >= 3.5 ? "Achieved" : "Locked"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <i className={`fas fa-graduation-cap mr-3 ${completedEnrollments.length >= 1 ? 'text-green-400' : 'text-gray-500'}`}></i>
                        <span className="text-white">First Course Completed</span>
                      </div>
                      <Badge variant={completedEnrollments.length >= 1 ? "default" : "outline"} className={completedEnrollments.length >= 1 ? "bg-green-600" : "border-gray-500 text-gray-500"}>
                        {completedEnrollments.length >= 1 ? "Achieved" : "Locked"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <i className={`fas fa-medal mr-3 ${passedQuizzes.length >= 10 ? 'text-purple-400' : 'text-gray-500'}`}></i>
                        <span className="text-white">Quiz Master (10+ Passed)</span>
                      </div>
                      <Badge variant={passedQuizzes.length >= 10 ? "default" : "outline"} className={passedQuizzes.length >= 10 ? "bg-purple-600" : "border-gray-500 text-gray-500"}>
                        {passedQuizzes.length >= 10 ? "Achieved" : `${passedQuizzes.length}/10`}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}