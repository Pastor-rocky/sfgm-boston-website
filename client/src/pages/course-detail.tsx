import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CourseContentViewer from "@/components/course-content-viewer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Enrollment } from "@/types/enrollment";


export default function CourseDetail() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Redirect course 18 (G.R.O.W) to proper interface
  useEffect(() => {
    if (id === '18') {
      setLocation('/course/0');
    }
  }, [id, setLocation]);

  const { data: course, isLoading } = useQuery({
    queryKey: [`/api/courses/${id}`],
    enabled: !!id,
  });

  const { data: enrollments = [] } = useQuery<Enrollment[]>({
    queryKey: ['/api/enrollments/student'],
    enabled: isAuthenticated,
  });

  // Course enrollment mutation
  const enrollMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('/api/enrollments', 'POST', {
        courseId: parseInt(id!),
      });
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successfully enrolled in the course!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/enrollments/student'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to enroll in course",
        variant: "destructive",
      });
    },
  });



  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded mb-4"></div>
            <div className="h-4 bg-slate-200 rounded mb-8 w-1/2"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Course Not Found</h2>
              <p className="text-slate-600">The course you're looking for doesn't exist.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isEnrolled = enrollments?.some((e: any) => e.courseId === parseInt(id!) && (e.status === 'active' || e.status === 'completed'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src={id === "1" ? "/acts-in-action-cover.png" : 
                    id === "2" ? "/becoming-a-fire-starter-cover.jpeg" :
                    id === "3" ? "/dont-be-a-jonah-cover.jpg" :
                    id === "4" ? "/grow-cover.png" :
                    id === "5" ? "/studying-for-service-cover.jpg" :
                    id === "6" ? "/deacon-course-cover.png" :
                    id === "7" ? "/level-up-leadership-cover.png" :
                    id === "8" ? "/sfgm-youth-ministry-cover.png" :
                    "/course-cover-placeholder.png"} 
              alt={`${(course as any)?.name || 'Course'} Cover`}
              className={`${id === "6" || id === "7" || id === "8" ? "w-72 h-72" : "w-48 h-64"} object-contain rounded-lg shadow-2xl border-4 border-white/20`}
            />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            {id === '8' ? 'Youth Ministry Course' : (course as any)?.name || 'Course'}
          </h1>
          
          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-8">
            {id === '1' ? (
              "This Bible School semester we will be studying the first century church, reading through the book of Acts and paying close attention to what they did, so we can get what they got - signs, wonders, miracles and the empowering of the Holy Spirit to proclaim the Gospel like never before!"
            ) : id === '0' ? (
              <>
                <span className="text-purple-200">
                  GROWing ourselves to GROW each other to GROW the KINGDOM!
                </span>
                {(course as any)?.description?.replace('Growing ourselves, to Grow others, to Grow the Kingdom', '').trim().startsWith('-') 
                  ? (course as any).description.replace('Growing ourselves, to Grow others, to Grow the Kingdom', '').trim()
                  : ` - ${(course as any)?.description?.replace('Growing ourselves, to Grow others, to Grow the Kingdom', '').trim() || ''}`
                }
              </>
            ) : (
              (course as any)?.description || "No description available"
            )}
          </p>

          {/* Book Purchase Links for Level Up Leadership */}
          {id === '7' && (
            <div className="mb-12">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                  📚 Required Reading: "The 5 Levels of Leadership" by John Maxwell
                </h2>
                <p className="text-purple-200 text-center mb-8">
                  Purchase or listen to the book to enhance your learning experience throughout this course.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Amazon */}
                  <div className="bg-white/5 rounded-lg p-6 text-center hover:bg-white/10 transition-colors">
                    <div className="text-4xl mb-4">📖</div>
                    <h3 className="text-white font-semibold mb-3 text-lg">Amazon</h3>
                    <p className="text-purple-200 text-sm mb-4">Purchase the physical book or Kindle edition</p>
                    <a 
                      href="https://www.amazon.com/Levels-Leadership-Proven-Maximize-Potential/dp/1599953633" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-semibold"
                    >
                      <i className="fas fa-shopping-cart mr-2"></i>
                      Buy on Amazon
                    </a>
                  </div>

                  {/* Audible */}
                  <div className="bg-white/5 rounded-lg p-6 text-center hover:bg-white/10 transition-colors">
                    <div className="text-4xl mb-4">🎧</div>
                    <h3 className="text-white font-semibold mb-3 text-lg">Audible</h3>
                    <p className="text-purple-200 text-sm mb-4">Listen to the audiobook narrated by John Maxwell</p>
                    <a 
                      href="https://www.audible.com/search?keywords=The+5+Levels+of+Leadership+John+Maxwell" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold"
                    >
                      <i className="fas fa-headphones mr-2"></i>
                      Listen on Audible
                    </a>
                  </div>
                </div>

                {/* Audible App Download */}
                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                  <p className="text-purple-200 text-sm mb-3">Don't have Audible yet?</p>
                  <a 
                    href="https://www.audible.com/start-listen" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <i className="fas fa-download mr-2"></i>
                    Download Audible App
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Course Structure for Youth Ministry Course */}
          {id === '8' && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Course Structure</h2>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 justify-items-center">
                  {/* Read Course Chapters */}
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">📖</div>
                      <CardTitle className="text-white text-xl">Read Course Chapters</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-blue-200 text-sm">
                        Comprehensive chapter content covering calling, requirements, responsibilities, accountability, and disciple-making
                      </p>
                    </CardContent>
                  </Card>

                  {/* Listen to Audio */}
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">🎧</div>
                      <CardTitle className="text-white text-xl">Listen to Audio</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-blue-200 text-sm">
                        Audio recordings of each chapter for enhanced learning and flexibility
                      </p>
                    </CardContent>
                  </Card>

                  {/* Take Quizzes */}
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">📝</div>
                      <CardTitle className="text-white text-xl">Take Quizzes</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-blue-200 text-sm">
                        Test your understanding with interactive quizzes and assessments
                      </p>
                    </CardContent>
                  </Card>

                  {/* Access E-Book */}
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">📚</div>
                      <CardTitle className="text-white text-xl">Access Complete E-Book</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-blue-200 text-sm">
                        Full course content in e-book format for comprehensive study
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Required Reading Books for Youth Ministry Course */}
          {id === '8' && (
            <div className="mb-12">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                  📚 Required Reading Books
                </h2>
                <p className="text-orange-200 text-center mb-8">
                  These foundational books will enhance your learning experience throughout the Youth Ministry Course.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* The Awe of God - John Bevere */}
                  <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
                    <h3 className="text-white font-semibold mb-3 text-lg">The Awe of God</h3>
                    <p className="text-orange-200 text-sm mb-4">by John Bevere</p>
                    <div className="flex gap-2">
                      <a 
                        href="https://www.amazon.com/Awe-God-Astounding-Healthy-Transforms/dp/1400336708" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm font-semibold"
                      >
                        <i className="fas fa-shopping-cart mr-2"></i>
                        Amazon
                      </a>
                      <a 
                        href="https://www.audible.com/search?keywords=The+Awe+of+God+John+Bevere" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-semibold"
                      >
                        <i className="fas fa-headphones mr-2"></i>
                        Audible
                      </a>
                    </div>
                  </div>

                  {/* The Five Levels of Leadership - John Maxwell */}
                  <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
                    <h3 className="text-white font-semibold mb-3 text-lg">The Five Levels of Leadership</h3>
                    <p className="text-orange-200 text-sm mb-4">by John Maxwell</p>
                    <div className="flex gap-2">
                      <a 
                        href="https://www.amazon.com/Levels-Leadership-Proven-Maximize-Potential/dp/1599953633" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm font-semibold"
                      >
                        <i className="fas fa-shopping-cart mr-2"></i>
                        Amazon
                      </a>
                      <a 
                        href="https://www.audible.com/search?keywords=The+5+Levels+of+Leadership+John+Maxwell" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-semibold"
                      >
                        <i className="fas fa-headphones mr-2"></i>
                        Audible
                      </a>
                    </div>
                  </div>

                  {/* The 21 Irrefutable Laws of Leadership - John Maxwell */}
                  <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
                    <h3 className="text-white font-semibold mb-3 text-lg">The 21 Irrefutable Laws of Leadership</h3>
                    <p className="text-orange-200 text-sm mb-4">by John Maxwell</p>
                    <div className="flex gap-2">
                      <a 
                        href="https://www.amazon.com/21-Irrefutable-Laws-Leadership-Anniversary/dp/0785288376" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm font-semibold"
                      >
                        <i className="fas fa-shopping-cart mr-2"></i>
                        Amazon
                      </a>
                      <a 
                        href="https://www.audible.com/search?keywords=The+21+Irrefutable+Laws+of+Leadership+John+Maxwell" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-semibold"
                      >
                        <i className="fas fa-headphones mr-2"></i>
                        Audible
                      </a>
                    </div>
                  </div>

                  {/* The Power of Preaching - Tony Evans */}
                  <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
                    <h3 className="text-white font-semibold mb-3 text-lg">The Power of Preaching</h3>
                    <p className="text-orange-200 text-sm mb-4">by Tony Evans</p>
                    <div className="flex gap-2">
                      <a 
                        href="https://www.amazon.com/Power-Preaching-Crafting-Creative-Expository/dp/0802418309" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm font-semibold"
                      >
                        <i className="fas fa-shopping-cart mr-2"></i>
                        Amazon
                      </a>
                      <a 
                        href="https://www.audible.com/search?keywords=The+Power+of+Preaching+Tony+Evans" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-semibold"
                      >
                        <i className="fas fa-headphones mr-2"></i>
                        Audible
                      </a>
                    </div>
                  </div>
                </div>

                {/* Audible App Download */}
                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                  <p className="text-orange-200 text-sm mb-3">Don't have Audible yet?</p>
                  <a 
                    href="https://www.audible.com/start-listen" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <i className="fas fa-download mr-2"></i>
                    Download Audible App
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Course Structure for Acts in Action */}
          {id === '1' && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Course Structure</h2>
              
              {/* Suggested Downloads */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white text-center mb-8">Suggested Downloads to Enhance Page Performance</h3>
                <div className="flex justify-center">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <img 
                        src="https://www.bible.com/_next/image?url=https%3A%2F%2Fweb-assets.youversion.com%2Fapp-icons%2Fen.png&w=256&q=75" 
                        alt="Bible App"
                        className="w-16 h-16 rounded-lg"
                      />
                      <div>
                        <h4 className="text-white text-lg font-semibold mb-2">Bible App</h4>
                        <p className="text-purple-200 text-sm mb-3">Access the Bible anywhere with offline reading and audio</p>
                        <a 
                          href="https://www.bible.com/app" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Download App
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className={`grid grid-cols-1 gap-6 mb-12 justify-items-center ${id === "1" ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                  {/* Watch Videos - Hide for Deacon Course (ID 1) */}
                  {id !== "1" && (
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <CardHeader className="text-center">
                        <div className="text-4xl mb-2">📺</div>
                        <CardTitle className="text-white text-xl">Watch the Videos</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-blue-200 text-sm">
                          Engaging video lessons covering key concepts and biblical teachings from the Book of Acts
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Read Required Bible Chapter */}
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">📖</div>
                      <CardTitle className="text-white text-xl">Read the Required Bible Chapter</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-blue-200 text-sm">
                        Direct study of the biblical text with guided reading and reflection
                      </p>
                    </CardContent>
                  </Card>

                  {/* Take Quiz */}
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">📝</div>
                      <CardTitle className="text-white text-xl">Take the Quiz</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-blue-200 text-sm">
                        Test your understanding with interactive quizzes and assessments
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="border-purple-400 text-purple-400 px-4 py-2">
              <i className="fas fa-clock mr-2"></i>
              8 Weeks
            </Badge>
            <Badge variant="outline" className="border-purple-400 text-purple-400 px-4 py-2">
              <i className="fas fa-users mr-2"></i>
              In-Person Learning
            </Badge>
            <Badge variant="outline" className="border-purple-400 text-purple-400 px-4 py-2">
              <i className="fas fa-trophy mr-2"></i>
              100 Points
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated && (user as any)?.role === 'student' && (
              <>
                {isEnrolled ? (
                  <Badge className="bg-green-600/20 border-green-500/50 text-green-300 px-6 py-3 text-lg">
                    <i className="fas fa-check mr-2"></i>Enrolled
                  </Badge>
                ) : (
                  <Button 
                    onClick={() => enrollMutation.mutate()}
                    disabled={enrollMutation.isPending}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg"
                  >
                    <i className="fas fa-play mr-2"></i>
                    {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now'}
                  </Button>
                )}
              </>
            )}
            {!isAuthenticated && (
              <Button 
                onClick={() => window.location.href = '/login'}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>Login to Enroll
              </Button>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Course Modules */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center">
                    <i className="fas fa-list mr-2 text-purple-400"></i>
                    Course Modules
                  </div>
                  {/* View Instructions Button */}
                  {isEnrolled && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocation(`/course-instructions/${id}`)}
                      className="flex items-center gap-2 text-sm border-purple-400 text-purple-300 hover:bg-purple-600/20"
                    >
                      <i className="fas fa-info-circle text-purple-400"></i>
                      View Instructions
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEnrolled ? (
                  <CourseContentViewer courseId={(course as any)?.id} />
                ) : (
                  <div className="text-center py-8 text-purple-200">
                    <i className="fas fa-lock text-4xl mb-4 text-purple-400"></i>
                    <p>Enroll in this course to access content</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-1">Duration</h4>
                  <p className="text-purple-200">{(course as any)?.duration || 0} weeks</p>
                </div>
                <Separator className="bg-white/20" />
                <div>
                  <h4 className="font-medium text-white mb-1">Format</h4>
                  <p className="text-purple-200">In-person learning with video support</p>
                </div>
                <Separator className="bg-white/20" />
                <div>
                  <h4 className="font-medium text-white mb-1">Certificate</h4>
                  <p className="text-purple-200">Available upon completion</p>
                </div>
                <Separator className="bg-white/20" />
                <div>
                  <h4 className="font-medium text-white mb-1">Prerequisites</h4>
                  <p className="text-purple-200">None required</p>
                </div>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center text-purple-200">
                    <i className="fas fa-check text-green-400 mr-2"></i>
                    Deep biblical understanding
                  </li>
                  <li className="flex items-center text-purple-200">
                    <i className="fas fa-check text-green-400 mr-2"></i>
                    Practical application principles
                  </li>
                  <li className="flex items-center text-purple-200">
                    <i className="fas fa-check text-green-400 mr-2"></i>
                    Spiritual growth techniques
                  </li>
                  <li className="flex items-center text-purple-200">
                    <i className="fas fa-check text-green-400 mr-2"></i>
                    Ministry leadership skills
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200 text-sm mb-4">
                  Have questions about this course? Contact our support team.
                </p>
                <Button variant="outline" className="w-full border-purple-400 text-purple-300 hover:bg-purple-600/20">
                  <i className="fas fa-envelope mr-2"></i>Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
