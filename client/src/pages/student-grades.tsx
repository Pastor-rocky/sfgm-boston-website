import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ArrowLeft, BarChart3, Trophy, Award, TrendingUp, 
  BookOpen, Clock, Target, Star, CheckCircle, 
  AlertCircle, Calendar, FileText, Download
} from "lucide-react";
import { useState } from "react";

// Grade Card Component
function GradeCard({ 
  course, 
  enrollment, 
  quizAttempts 
}: { 
  course: any; 
  enrollment: any; 
  quizAttempts: any[] 
}) {
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate course statistics
  const totalQuizzes = quizAttempts.length;
  const passedQuizzes = quizAttempts.filter(attempt => 
    (parseFloat(attempt.score || '0') * 100) >= (attempt.passingScore || 70)
  ).length;
  const averageScore = totalQuizzes > 0 
    ? quizAttempts.reduce((sum, attempt) => sum + (parseFloat(attempt.score || '0') * 100), 0) / totalQuizzes
    : 0;
  const highestScore = totalQuizzes > 0 
    ? Math.max(...quizAttempts.map(attempt => parseFloat(attempt.score || '0') * 100))
    : 0;
  const latestScore = totalQuizzes > 0 
    ? parseFloat(quizAttempts[0]?.score || '0') * 100
    : 0;

  const getGradeColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeLetter = (score: number) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-white text-xl font-bold">{course?.name || 'Course Name'}</CardTitle>
            <p className="text-gray-900 text-sm mt-1 font-medium">{course?.description || ''}</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getGradeColor(averageScore)}`}>
              {getGradeLetter(averageScore)}
            </div>
            <div className="text-gray-900 text-sm font-medium">
              {Math.round(averageScore)}% Average
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Course Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{totalQuizzes}</div>
            <div className="text-gray-900 text-xs font-medium">Total Quizzes</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">{passedQuizzes}</div>
            <div className="text-gray-900 text-xs font-medium">Passed</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">{Math.round(highestScore)}%</div>
            <div className="text-gray-900 text-xs font-medium">Highest Score</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">{Math.round(latestScore)}%</div>
            <div className="text-gray-900 text-xs font-medium">Latest Score</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Course Progress</span>
            <span className="text-gray-900 text-sm font-medium">{Math.round(enrollment?.progress || 0)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${enrollment?.progress || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Quiz Details Toggle */}
        {totalQuizzes > 0 && (
          <div>
            <Button
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              {showDetails ? 'Hide' : 'Show'} Quiz Details
              {showDetails ? <TrendingUp className="w-4 h-4 ml-2" /> : <BarChart3 className="w-4 h-4 ml-2" />}
            </Button>

            {showDetails && (
              <div className="mt-4 space-y-3">
                <h4 className="text-white font-semibold text-lg">Quiz History</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {quizAttempts.map((attempt, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-white font-medium text-sm">
                            {attempt.quizTitle || `Quiz ${index + 1}`}
                          </div>
                          <div className="text-gray-900 text-xs font-medium">
                            {attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString() : 'No date'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getGradeColor(parseFloat(attempt.score || '0') * 100)}`}>
                            {Math.round(parseFloat(attempt.score || '0') * 100)}%
                          </div>
                          <div className="text-xs text-gray-900 font-medium">
                            {(parseFloat(attempt.score || '0') * 100) >= (attempt.passingScore || 70) ? 'Passed' : 'Failed'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Course Actions */}
        <div className="flex gap-2 pt-2">
          <Link href={`/course/${course?.id}`}>
            <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Continue Course
            </Button>
          </Link>
          <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            <Download className="w-4 h-4 mr-2" />
            Export Grades
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function StudentGrades() {
  const { user } = useAuth();

  // Fetch student data
  const { data: enrollments = [] } = useQuery({
    queryKey: ['/api/enrollments/student'],
  });

  const { data: gpaData } = useQuery({
    queryKey: ['/api/analytics/gpa'],
  });

  // Fetch quiz attempts for all courses
  const { data: allQuizAttempts = [] } = useQuery({
    queryKey: ['/api/quiz-attempts/student'],
  });

  const activeEnrollments = (enrollments as any[]).filter((e: any) => e.status === 'active');
  const completedEnrollments = (enrollments as any[]).filter((e: any) => e.status === 'completed');
  const currentGPA = (gpaData as any)?.gpa || 0;

  // Calculate overall statistics
  const totalCourses = (enrollments as any[]).length;
  const totalQuizzes = (allQuizAttempts as any[]).length;
  const totalPassed = (allQuizAttempts as any[]).filter((attempt: any) => 
    (parseFloat(attempt.score || '0') * 100) >= (attempt.passingScore || 70)
  ).length;
  const overallAverage = totalQuizzes > 0 
    ? (allQuizAttempts as any[]).reduce((sum: number, attempt: any) => sum + (parseFloat(attempt.score || '0') * 100), 0) / totalQuizzes
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/student-dashboard">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white">My Grades</h1>
              <p className="text-xl text-gray-900 font-medium">
                Comprehensive view of your academic performance
              </p>
            </div>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Trophy className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{currentGPA.toFixed(1)}</div>
              <div className="text-gray-700 text-sm font-medium">Current GPA</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalCourses}</div>
              <div className="text-gray-700 text-sm font-medium">Total Courses</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm border-purple-500/30">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalQuizzes}</div>
              <div className="text-gray-700 text-sm font-medium">Total Quizzes</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-sm border-yellow-500/30">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{Math.round(overallAverage)}%</div>
              <div className="text-gray-700 text-sm font-medium">Overall Average</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Courses */}
        {activeEnrollments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-400" />
              Active Courses
            </h2>
            <div className="grid gap-6">
              {activeEnrollments.map((enrollment: any) => {
                // For now, show all quiz attempts since we don't have courseId in quiz attempts
                // TODO: Add courseId to quiz attempts in the future
                const courseQuizAttempts = (allQuizAttempts as any[]);
                return (
                  <GradeCard
                    key={enrollment.id}
                    course={enrollment.course}
                    enrollment={enrollment}
                    quizAttempts={courseQuizAttempts}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Courses */}
        {completedEnrollments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-400" />
              Completed Courses
            </h2>
            <div className="grid gap-6">
              {completedEnrollments.map((enrollment: any) => {
                // For now, show all quiz attempts since we don't have courseId in quiz attempts
                // TODO: Add courseId to quiz attempts in the future
                const courseQuizAttempts = (allQuizAttempts as any[]);
                return (
                  <GradeCard
                    key={enrollment.id}
                    course={enrollment.course}
                    enrollment={enrollment}
                    quizAttempts={courseQuizAttempts}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* No Courses Message */}
        {totalCourses === 0 && (
          <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Courses Enrolled</h3>
              <p className="text-gray-300 mb-6">Start your academic journey by enrolling in a course</p>
              <Link href="/course-catalog">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}