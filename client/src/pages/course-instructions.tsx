import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, CheckCircle2, ArrowRight, Play, Users, Clock } from "lucide-react";

export default function CourseInstructions() {
  const { courseId } = useParams();
  
  const { data: course, isLoading } = useQuery<any>({
    queryKey: [`/api/courses/${courseId}`],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Course Not Found</h1>
          <p className="text-gray-600 mt-2">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Course Header */}
      <div className="text-center mb-8">
        {/* Course Cover Image */}
        <div className="flex justify-center mb-6">
          <img 
            src={courseId === "1" ? "/acts-in-action-cover.png" : 
                  courseId === "2" ? "/becoming-a-fire-starter-cover.jpeg" :
                  courseId === "3" ? "/dont-be-a-jonah-cover.jpg" :
                  courseId === "4" ? "/grow-cover.png" :
                  courseId === "5" ? "/studying-for-service-cover.jpg" :
                  "/course-cover-placeholder.png"} 
            alt={`${course?.name || 'Course'} Cover`}
            className="w-32 h-40 object-cover rounded-lg shadow-xl border-2 border-gray-200"
          />
        </div>
        
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-12 w-12 text-blue-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{course?.name || 'Course'}</h1>
            <p className="text-gray-600 mt-2">{course?.description || 'Course description'}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course?.duration || '10'} weeks
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course?.difficulty || 'Intermediate'}
          </Badge>
        </div>
      </div>

      {/* Welcome Message */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-blue-600" />
            Welcome to Your Course!
          </CardTitle>
          <CardDescription>
            Before you begin, please read these important instructions to get the most out of your learning experience.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Week-Based System Explanation */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">How This Course Works</CardTitle>
          <CardDescription>
            This course features <strong>freely accessible content</strong> with completion tracking to help you stay organized.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">📚 Flexible Learning System</h4>
            <p className="text-blue-700">
              All course content is freely accessible from the start. You can watch videos, read materials, 
              and take quizzes in any order you prefer. Completion badges will help you track your progress.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Instructions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-green-600">Recommended Learning Path</CardTitle>
          <CardDescription>
            While all content is freely accessible, we recommend this order for optimal learning experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Video className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold">Watch the Video</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Watch the video lessons to understand the key concepts. Videos are freely accessible and will show completion badges when finished.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold">Complete Reading Assignments</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Access reading materials using the blue and green buttons. All readings are freely accessible:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-blue-100 p-3 rounded border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">📚</span>
                      <span className="font-medium text-blue-700">Blue Button</span>
                    </div>
                    <p className="text-blue-600 text-sm">Textbook chapters with progress saving</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded border-l-4 border-green-500">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">✝️</span>
                      <span className="font-medium text-green-700">Green Button</span>
                    </div>
                    <p className="text-green-600 text-sm">Bible reading assignments</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  <h4 className="font-semibold">Pass the Quiz</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Take quizzes to test your knowledge. All quizzes are freely accessible and will show completion badges when finished.
                  Note: Final exam requires completion of all other course content first.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Structure and Grading System */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-purple-600">📊 Quiz Structure & Grading System</CardTitle>
          <CardDescription>
            Understanding how assessments work and how your grades are calculated.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Quiz Structure */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3">📝 Weekly Quiz Structure</h4>
              {courseId === "1" ? (
                // Special structure for this course: 10 questions total
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-purple-200 text-center">
                    <div className="text-2xl font-bold text-blue-600">10</div>
                    <div className="text-sm text-blue-700">Questions per Quiz</div>
                    <div className="text-xs text-gray-600 mt-1">Based on textbook chapters</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg text-center">
                    <div className="text-lg font-bold">Total: 10 Questions per Weekly Quiz</div>
                    <div className="text-sm text-purple-100">Textbook-based questions</div>
                  </div>
                </div>
              ) : courseId === "2" ? (
                // Special structure for Fire Starter course: 20 readings total
                <div className="space-y-3">
                  <p className="text-purple-700">This course contains:</p>
                  <ul className="text-purple-700 space-y-1 ml-4">
                    <li>• 📚 10 textbook chapter readings</li>
                    <li>• ✝️ 10 Bible reading assignments</li>
                    <li>• 📝 Weekly quizzes based on both readings</li>
                  </ul>
                  <div className="bg-white p-3 rounded border border-purple-200 text-center">
                    <div className="text-lg font-bold text-purple-600">20 Total Readings</div>
                    <div className="text-sm text-gray-600">2 readings per week × 10 weeks</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg text-center">
                    <div className="text-lg font-bold">Total: 20 Required Readings</div>
                    <div className="text-sm text-purple-100">Textbook chapters + Bible readings</div>
                  </div>
                </div>
              ) : (
                // Standard structure for other courses
                <div className="space-y-3">
                  <p className="text-purple-700">Each weekly quiz contains questions based on:</p>
                  <ul className="text-purple-700 space-y-1 ml-4">
                    <li>• 📚 Textbook reading assignments</li>
                    <li>• ✝️ Bible reading assignments</li>
                    <li>• 🎥 Video lesson content</li>
                  </ul>
                  <div className="bg-white p-3 rounded border border-purple-200 text-center">
                    <div className="text-lg font-bold text-purple-600">15-25 Questions per Quiz</div>
                    <div className="text-sm text-gray-600">Varies by course content</div>
                  </div>
                </div>
              )}
            </div>

            {/* Grading System */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">🎯 Grading & GPA System</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-700 mb-2">Passing Requirements:</h5>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• <strong>70% minimum</strong> to pass weekly quizzes</li>
                    <li>• <strong>70% minimum</strong> to pass final exams</li>
                    <li>• <strong>ONE ATTEMPT ONLY</strong> per quiz</li>
                    <li>• Contact instructor for retake permission</li>
                    <li>• Completion badges track your progress</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-700 mb-2">GPA Conversion Scale:</h5>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span>90-100%</span><span className="font-bold">A (4.0)</span></div>
                    <div className="flex justify-between"><span>80-89%</span><span className="font-bold">B (3.0)</span></div>
                    <div className="flex justify-between"><span>70-79%</span><span className="font-bold">C (2.0)</span></div>
                    <div className="flex justify-between"><span>60-69%</span><span className="font-bold">D (1.0)</span></div>
                    <div className="flex justify-between"><span>Below 60%</span><span className="font-bold">F (0.0)</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Exam Info */}
            {courseId === "1" && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3">🎓 Final Examination</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">Exam Structure:</h5>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• <strong>50 multiple choice questions</strong></li>
                      <li>• Based on textbook chapters</li>
                      <li>• <strong>200-word essay requirement</strong></li>
                      <li>• Covers entire course material</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">Requirements:</h5>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• <strong>Must complete all required videos, readings, and quizzes to attempt final exam and essay question</strong></li>
                      <li>• <strong>70% minimum passing score</strong></li>
                      <li>• Essay must be approved by instructor</li>
                      <li>• 1 hour time limit on final exam</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Final Exam Info for Course 3 */}
            {courseId === "3" && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3">🎓 Final Examination</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">Exam Structure:</h5>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• <strong>50 multiple choice questions</strong></li>
                      <li>• Based on textbook chapters</li>
                      <li>• <strong>200-word essay requirement</strong></li>
                      <li>• Covers entire course material</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">Requirements:</h5>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• <strong>Must complete all required videos, readings, and quizzes to attempt final exam and essay question</strong></li>
                      <li>• <strong>70% minimum passing score</strong></li>
                      <li>• Essay must be approved by instructor</li>
                      <li>• 1 hour time limit on final exam</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* One Attempt Policy */}
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-800 mb-3">⚠️ CRITICAL: One Attempt Quiz Policy</h4>
              <div className="space-y-3">
                <p className="text-red-700 font-medium">
                  Each quiz allows <strong>ONE ATTEMPT ONLY</strong>. Choose your answers carefully!
                </p>
                <div className="bg-white p-3 rounded border border-red-200">
                  <h5 className="font-medium text-red-800 mb-2">If you need a retake:</h5>
                  <ul className="text-red-700 space-y-1 text-sm">
                    <li>1. Contact your course instructor immediately</li>
                    <li>2. Explain the reason for the retake request (technical issues, misunderstanding, etc.)</li>
                    <li>3. Only instructors can grant retake permission in the system</li>
                    <li>4. Wait for instructor approval before attempting again</li>
                  </ul>
                </div>
                <div className="bg-yellow-100 p-3 rounded border border-yellow-300">
                  <p className="text-yellow-800 text-sm font-medium">
                    💡 <strong>Study Tip:</strong> Review all reading materials, videos, and take notes before attempting any quiz. 
                    Once you start, you cannot go back!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Assessment Info for Becoming a Fire Starter */}
      {courseId === "3" && (
        <Card className="mb-6 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-xl text-orange-700 flex items-center gap-2">
              🔥 Comprehensive Assessment System
            </CardTitle>
            <CardDescription className="text-orange-600">
              This course features the most comprehensive assessment system in our Bible school!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-orange-800">Weekly Quizzes</h4>
                  <CheckCircle2 className="h-5 w-5 text-orange-600" />
                </div>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• 11 weekly quizzes (20 questions each)</li>
                  <li>• 10 textbook + 10 Bible questions per quiz</li>
                  <li>• Covers both "Don't Be a Jonah" book + Jonah Bible study</li>
                  <li>• 70% required to pass each quiz</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-red-800">🎓 Final Examination</h4>
                  <Badge className="bg-red-600">Final</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">Exam Structure:</h5>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• <strong>50 multiple choice questions</strong></li>
                      <li>• Based on textbook chapters</li>
                      <li>• <strong>200-word essay requirement</strong></li>
                      <li>• Covers entire course material</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">Requirements:</h5>
                    <ul className="text-red-700 space-y-1 text-sm">
                      <li>• <strong>Must complete all required videos, readings, and quizzes to attempt final exam and essay question</strong></li>
                      <li>• <strong>70% minimum passing score</strong></li>
                      <li>• Essay must be approved by instructor</li>
                      <li>• 1 hour time limit on final exam</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg">Total Assessment Challenge</h4>
                  <p className="text-orange-100 text-sm">270 Questions • Progressive Jonah Study • Complete Don't Be a Jonah Mastery</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">270</div>
                  <div className="text-xs text-orange-100">QUESTIONS</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}


      {/* Navigation Tips */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-orange-600">💡 Navigation Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Button Tooltips</h4>
              <p className="text-orange-700 text-sm">
                Hover over blue and green buttons to see specific chapter assignments
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Completion Tracking</h4>
              <p className="text-orange-700 text-sm">
                Green completion badges appear when you finish videos, readings, and quizzes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ready to Start */}
      <div className="text-center">
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          onClick={async () => {
            try {
              // Mark instructions as viewed
              await fetch(`/api/courses/${courseId}/instructions-viewed`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            } catch (error) {
              console.error('Error marking instructions as viewed:', error);
            }
            
            // Navigate to course content
            window.location.href = `/course/${courseId}`;
          }}
        >
          <ArrowRight className="h-5 w-5 mr-2" />
          I Understand - Start Course
        </Button>
        
        <p className="text-gray-500 text-sm mt-3">
          You can return to these instructions anytime from the course page
        </p>
      </div>
    </div>
  );
}