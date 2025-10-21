
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CourseCard from "@/components/course-card";
import Certificate from "@/components/certificate";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, BookOpen } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { FaBook } from "react-icons/fa";

// Import course cover images - commented out due to missing files
// import growCover from "@assets/image_1753296696582.png";
// import jonahCover from "@assets/Image_1753137060328.jpg";
// import serviceCover from "@assets/Image 2_1753137106145.jpg";
// import fireStarterCover from "@assets/IMG_3701_1753137083261.jpeg";
// import actsCover from "@assets/IMG_3751_1753328106169.jpg";
// import watchmenCover from "@assets/lightstock_66018_medium_byrene_haney.jpg_1753137206264.webp";
// import prophecyCover from "@assets/Introduction_to_Prophecy_1753137251919.jpg";
// import theologyCover from "@assets/rs=w-1200,h-600,cg-true_1753137236330.webp";
// import manOfGodCover from "@assets/rs=w-1200,cg-true_1753137220943.webp";
// import levelUpLeadershipCover from "@assets/IMG_71A7B1E06669-1_1753328914119.jpeg";
// import watchmenProjectCover from "@assets/image_1753329726336.png";
// import newProphecyCover from "@assets/image_1753330427185.png";
// import newTheologyCover from "@assets/image_1753330614352.png";
// import newManOfGodCover from "@assets/image_1753330714244.png";
// import powerOfPreachingCover from "@assets/81bGwIcnEHL_1753329077040.jpg";

export default function BibleSchool() {
  const { isAuthenticated, user } = useAuth();
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [unenrollDialogOpen, setUnenrollDialogOpen] = useState<number | null>(null);
  const { toast } = useToast();

  // Fetch user enrollments to check enrollment status
  const { data: enrollments = [] } = useQuery({
    queryKey: ['/api/enrollments/student'],
    enabled: isAuthenticated,
  });

  // Simple enrollment mutation - all courses freely accessible
  const enrollMutation = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await apiRequest('POST', '/api/enrollments', {
        courseId: courseId,
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

  // Unenroll mutation with complete progress deletion
  const unenrollMutation = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await apiRequest('DELETE', `/api/enrollments/${courseId}`, {});
      return response;
    },
    onSuccess: (_, courseId) => {
      toast({
        title: "Unenrolled Successfully",
        description: "You have been unenrolled from the course and all progress has been deleted.",
      });
      setUnenrollDialogOpen(null);
      queryClient.invalidateQueries({ queryKey: ['/api/enrollments/student'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to unenroll from course",
        variant: "destructive",
      });
      setUnenrollDialogOpen(null);
    },
  });

  // Check if user is enrolled in a specific course
  const isEnrolledInCourse = (courseId: number) => {
    return (enrollments as any[])?.some((enrollment: any) => enrollment.courseId === courseId) || false;
  };

  // Handle enrollment click
  const handleEnroll = (courseId: number, courseName: string) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Check if already enrolled
    if (isEnrolledInCourse(courseId)) {
      // If enrolled, go to course content
      window.location.href = `/course/${courseId}`;
      return;
    }

    // Perform enrollment
    enrollMutation.mutate(courseId);
  };
  
  // Calculate points based on new system: weeks × 20 points per quiz + 100 points for final exam
  const calculatePoints = (weeks: number) => (weeks * 20) + 100;
  
  // Calculate total points across all courses
  const getTotalPoints = () => {
    return courses.reduce((total, course) => total + course.points, 0);
  };

  // SFGM Bible School Course Catalog - All courses freely accessible
  const courses = [
    {
      id: 0,
      name: "G.R.O.W Beginner Course",
      description: "Welcome orientation and practice course for new Bible school students. Learn how the platform works while exploring G.R.O.W ministry principles: Give, Read, Obey, Win Souls. This ungraded course introduces you to taking quizzes, watching videos, and reading materials before starting your real academic coursework.",
      overview: "Welcome orientation and practice course designed to familiarize new students with the Bible school platform while introducing SFGM Boston's ministry philosophy. This ungraded course serves as training before accessing real academic coursework.",
      weeks: 4,
      points: calculatePoints(4), // 180 points
      category: "Foundation",
      difficulty: "Beginner",
      bookCoverUrl: "/grow-cover.png",

    },
    {
      id: 1,
      name: "Don't Be a Jonah",
      description: "Bishop Anthony Lee's sixth book is filled with compassion and urgency to encourage all those who are running from the call that God has for their life, so they would submit to the plans God has for them and no longer deal with the unnecessary storms that plague us when we rebel against the will of God. He uses the story of the famous character of Jonah to bring about practical life applications for God's people so they won't be swallowed up by the deception of this world.",
      overview: "An intensive study on obedience to God's calling, using the prophet Jonah as a case study for understanding the consequences of running from divine purpose.",
      weeks: 11,
      points: calculatePoints(11), // 320 points
      category: "Biblical Studies",
      difficulty: "Intermediate",
      bookCoverUrl: "/dont-be-a-jonah-cover.jpg"
    },
    {
      id: 2,
      name: "Studying for Service",
      description: "Introduction to studying Scripture and understanding the importance of knowing your text thoroughly before preaching. Learn the Five Ws method and staying in context.",
      overview: "A comprehensive approach to biblical study methodology that transforms how students read, understand, and minister God's Word with greater effectiveness and depth.",
      weeks: 12,
      points: calculatePoints(12), // 340 points
      category: "Biblical Studies",
      difficulty: "Intermediate",
      bookCoverUrl: "/studying-for-service-cover.jpg",
      beingUpdated: true
    },
    {
      id: 3,
      name: "Becoming a Fire Starter",
      description: "If you are tired of burning low and burning out, this is the book for you. Becoming a Fire Starter will instill in your walk of discipleship seven powerful principles that will enable you to not only be filled with the fire of the Holy Spirit, but to remain burning with passion for the Gospel of Jesus Christ and lost people. You should only read this book if you want your life changed by the fire of God!",
      overview: "A comprehensive study of spiritual fire and passion, exploring seven essential principles for maintaining Holy Spirit empowerment and Gospel passion. Includes progressive Luke Gospel study (chapters 1-24) with 250 total assessment questions ensuring thorough mastery of both textbook and biblical content.",
      weeks: 10,
      points: calculatePoints(10), // 300 points
      category: "Ministry",
      difficulty: "Intermediate",
      bookCoverUrl: "/becoming-a-fire-starter-cover.jpeg"
    },
    {
      id: 4,
      name: "Acts in Action Course",
      description: "This Bible School semester we will be studying the first century church, reading through the book of Acts and paying close attention to what they did, so we can get what they got - signs, wonders, miracles and the empowering of the Holy Spirit to proclaim the Gospel like never before!",
      overview: "This transformative semester focuses on the power and practices of the early church as recorded in Acts, equipping students to operate in supernatural ministry with signs, wonders, and miracles.",
      weeks: 10,
      points: calculatePoints(10), // 300 points
      category: "Biblical Studies",
      difficulty: "Intermediate",
      bookCoverUrl: "/acts-in-action-cover.png"
    },
    {
      id: 7,
      name: "Level Up Leadership",
      description: "The SFGM Level Up leadership class is an in depth 7 week course that will teach you how to lead better by serving more. This course will be taught by Bishop Anthony Lee as he breaks down each level of leadership with all its biblical principles, application and truths. Each week you will be reading the Bible along side the book 5 Levels of Leadership by John Maxwell. As you read through each of the 5 Levels of leadership, Bishop Anthony will bring to light the Biblical foundation in each level.",
      overview: "A leadership development course that combines proven leadership principles with solid biblical foundation, preparing students for effective Christian leadership roles.",
      weeks: 7,
      points: calculatePoints(7), // 240 points
      category: "Leadership Development",
      difficulty: "Advanced",
      bookCoverUrl: "/level-up-leadership-cover.png"
    },
    {
      id: 6,
      name: "Power of Preaching",
      description: "Master the art of biblical preaching with insights from Dr. Tony Evans and practical sermon preparation techniques.",
      overview: "An advanced preaching course that combines biblical exposition principles with practical sermon development skills for effective pulpit ministry.",
      weeks: 5,
      points: calculatePoints(5), // 200 points
      category: "Ministry",
      difficulty: "Advanced",
      bookCoverUrl: "/power-of-preaching-cover.jpg", // Correct Tony Evans preaching book cover
      beingUpdated: true
    },
    {
      id: 7,
      name: "Introduction to Prophecy",
      description: "A comprehensive introduction to biblical prophecy and end times events. Students will explore prophetic literature, understand different eschatological viewpoints, and learn to interpret apocalyptic texts with sound hermeneutical principles.",
      overview: "An introductory course designed to give students a solid foundation in biblical prophecy, covering major prophetic themes and preparing them for deeper eschatological study.",
      weeks: 5,
      points: calculatePoints(5), // 200 points
      category: "Prophecy",
      difficulty: "Intermediate",
      bookCoverUrl: "/introduction-to-prophecy-cover.png",
      beingUpdated: true
    },
    {
      id: 8,
      name: "The Watchmen Project",
      description: "An in-depth study of biblical prophecy, covering detailed analysis of prophetic texts, chronological frameworks, and contemporary relevance of biblical prophecy. Students will examine complex prophetic passages and their fulfillment patterns.",
      overview: "Advanced prophetic studies for students ready to engage with complex eschatological themes, detailed prophetic chronologies, and contemporary prophetic applications.",
      weeks: 10,
      points: calculatePoints(10), // 300 points
      category: "Prophecy",
      difficulty: "Advanced",
      bookCoverUrl: "/the-watchmen-project-cover.png",
      beingUpdated: true
    },
    {
      id: 9,
      name: "Theology 101",
      description: "Welcome to our 10-week theology semester! Within this course we'll dive into various aspects of theology, each teaching will explore multiple topics and subjects, which will bring us to the conclusions of Why we believe What we believe, as outlined by the Word of God.",
      overview: "Foundational theological education covering essential Christian doctrines, providing students with a solid biblical framework for understanding core beliefs.",
      weeks: 10,
      points: calculatePoints(10), // 300 points
      category: "Theology",
      difficulty: "Beginner",
      bookCoverUrl: "/theology-101-cover.png",
      beingUpdated: true
    },

    {
      id: 16,
      name: "SFGM Man of God Course",
      description: "The Man of God course is an 8-week Bible study designed to challenge, equip, and empower men to walk boldly in their God-given purpose. This course is taught by two pastors from different SFGM locations, each bringing unique insights to help you grow spiritually and practically. Weeks 1–4: Led by Pastor Kevin from SFGM Columbus. Weeks 5–8: Led by Bishop Anthony Lee from SFGM Orlando. Each week focuses on key biblical principles that build your identity, character, and leadership as a man of God. Lessons cover vital topics such as God's glory, honoring relationships, faithful stewardship, and using your spiritual gifts with humility.",
      overview: "An intensive 8-week men's discipleship course combining biblical teaching with practical application for developing godly character and leadership.",
      weeks: 8,
      points: calculatePoints(8), // 260 points
      category: "Character Development",
      difficulty: "Intermediate",
      bookCoverUrl: "/man-of-god-course-cover.webp",
      comingSoon: true // Badge coming soon
    }
  ];



  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50">
        <Navigation />
      
      {/* Header Section */}
      <div className="ministry-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              SFGM Boston Bible School
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Deepen your understanding of Scripture and strengthen your faith through our comprehensive Bible courses designed for spiritual growth and leadership development.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-video text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Video Learning</h3>
              <p className="text-slate-600">Weekly instructional videos and interactive content tailored to each course.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-certificate text-secondary text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Certificates</h3>
              <p className="text-slate-600">Receive certificates of completion for all finished courses and programs.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users-class text-accent text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Instructors</h3>
              <p className="text-slate-600">Learn from experienced ministry leaders and biblical scholars.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Course Overview for Public View */}
      <div className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Course Overview</h2>
              <p className="text-slate-700">
                Welcome orientation and practice course designed to familiarize new students with the Bible school platform while introducing SFGM Boston's ministry philosophy. This ungraded course serves as training before accessing real academic coursework.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Course Assignments</h3>
              <ol className="list-decimal ml-6 space-y-1 text-slate-700">
                <li>Read the Bible chapters assigned for each unit, using the translation provided by your instructor</li>
                <li>Read the book chapters or articles (or listen to audio) for each unit</li>
                <li>View online video lectures</li>
                <li>Use the discussion forum to ask questions and exchange ideas with others</li>
                <li>Take the online quiz for each unit (75 minutes for 20 multiple-choice questions, 1 point per correct answer = 20 points per quiz)</li>
                <li>Complete the final exam (90 minute limit, 50 questions, 2 points per correct answer = 100 points)</li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Grading System</h3>
              <p className="text-slate-700 mb-2">Total Points: 180 points (4 quizzes × 20 points + 100 points for final exam)</p>
              <div className="grid grid-cols-2 gap-1 text-sm text-slate-600">
                <div>A: 95-100% | A-: 90-94%</div>
                <div>B+: 87-89% | B: 83-86%</div>
                <div>B-: 80-82% | C+: 77-79%</div>
                <div>C: 73-76% | C-: 70-72%</div>
                <div>D+: 67-69% | D: 63-66%</div>
                <div>D-: 60-62% | F: 0-59%</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Minimum 60% average required to pass. Complete all assignments within 6 weeks or be automatically unenrolled.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Course Forum</h3>
              <p className="text-slate-700">
                Access the course forum to post questions, share insights, and connect with other students. The forum is available at the beginning of each course and provides a great way to engage with the learning community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Course Catalog</h2>
            <p className="text-xl text-slate-600">
              Choose from our comprehensive selection of Bible courses
            </p>
            
            {/* All courses freely accessible */}
            {isAuthenticated && (
              <Alert className="max-w-4xl mx-auto mt-8 bg-green-50 border-green-200">
                <BookOpen className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Welcome to SFGM Boston Bible School!</strong> All courses are freely accessible - choose any course you'd like to start your spiritual education journey.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer">
                <CardHeader className="pb-4">
                <div className="relative">
                  {/* All courses freely accessible */}
                  {/* Book Cover */}
                  <div className="mb-3 md:grid md:grid-cols-2 md:gap-3">
                    {/* Badges removed for public view */}
                    <div className="aspect-[3/4] max-h-56 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg overflow-hidden">
                      {course.bookCoverUrl && !course.bookCoverUrl.includes('placeholder') && course.bookCoverUrl !== 'content-coming-soon' ? (
                        <img 
                          src={course.bookCoverUrl} 
                          alt={course.name}
                          className="w-full h-full object-contain"
                        />
                      ) : course.bookCoverUrl === 'content-coming-soon' ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                          <FaBook className="text-4xl text-gray-400 mb-2" />
                          <div className="text-center px-2">
                            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">CONTENT</div>
                            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">COMING SOON</div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaBook className="text-6xl text-blue-500 opacity-50" />
                        </div>
                      )}
                    </div>
                    {/* Inline description next to image on larger screens */}
                    <div className="hidden md:block text-slate-600 dark:text-slate-300 text-xs leading-snug">
                      {course.description}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-3 text-center">
                    {course.name}
                  </h3>

                  {/* Weeks/Points removed for streamlined public view */}
                  
                  <div className="flex gap-2 mb-3">
                    {/* Enrollment/View Course Button */}
                    <Button 
                      onClick={() => handleEnroll(course.id, course.name)}
                      disabled={enrollMutation.isPending}
                      className="flex-1 font-semibold py-1.5 px-3 text-sm rounded-lg transition-colors bg-primary hover:bg-primary/90 text-white"
                    >
                      {enrollMutation.isPending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Enrolling...
                        </>
                      ) : isAuthenticated && isEnrolledInCourse(course.id) ? (
                        <>
                          <i className="fas fa-play mr-2"></i>
                          Continue Course
                        </>
                      ) : (
                        <>
                          <i className="fas fa-user-plus mr-2"></i>
                          Join
                        </>
                      )}
                    </Button>

                    {/* Unenroll Button - Only show if enrolled */}
                    {false && isAuthenticated && isEnrolledInCourse(course.id) && !course.comingSoon && !course.beingUpdated && (
                      <AlertDialog open={unenrollDialogOpen === course.id} onOpenChange={(open) => setUnenrollDialogOpen(open ? course.id : null)}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="px-3 py-2 text-xs"
                            disabled={unenrollMutation.isPending}
                          >
                            {unenrollMutation.isPending ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <i className="fas fa-user-minus"></i>
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                              <AlertCircle className="w-5 h-5" />
                              Confirm Unenrollment
                            </AlertDialogTitle>
                            <AlertDialogDescription asChild>
                              <div className="space-y-2">
                                <p className="font-semibold">
                                  Are you sure you want to unenroll from "{course.name}"?
                                </p>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                  <p className="text-red-800 font-medium text-sm">
                                    ⚠️ WARNING: This action cannot be undone!
                                  </p>
                                  <ul className="text-red-700 text-sm mt-2 space-y-1 list-disc ml-4">
                                    <li>All your course progress will be permanently deleted</li>
                                    <li>All quiz attempts and scores will be removed</li>
                                    <li>All completed assignments will be lost</li>
                                    <li>You will need to start over if you re-enroll later</li>
                                  </ul>
                                </div>
                              </div>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => unenrollMutation.mutate(course.id)}
                              className="bg-red-600 hover:bg-red-700"
                              disabled={unenrollMutation.isPending}
                            >
                              {unenrollMutation.isPending ? (
                                <>
                                  <i className="fas fa-spinner fa-spin mr-2"></i>
                                  Unenrolling...
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-user-minus mr-2"></i>
                                  Yes, Unenroll Me
                                </>
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}

                    {/* Expand Details Button removed for simplified public view */}
                  </div>
                </div>
                
                </CardHeader>
                </Card>
            ))}
          </div>

          {!isAuthenticated && (
            <div className="text-center mt-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border max-w-md mx-auto">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Ready to Start Learning?
                </h3>
                <p className="text-slate-600 mb-6">
                  Create an account to enroll in courses and begin your spiritual education journey.
                </p>
                <Button 
                  onClick={() => window.location.href = '/login'}
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Sample Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Certificate of Completion</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Upon successful completion of any course, students receive a beautiful certificate 
              that can be downloaded and printed for their records.
            </p>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-center text-slate-900 mb-6">Sample Certificate</h3>
            <Certificate 
              studentName="John Smith" 
              courseName="Acts in Action Course" 
              completionDate="July 2, 2025"
              instructorName="Bishop Anthony Lee"
            />
            <div className="text-center mt-6 text-slate-600">
              <p className="text-sm">
                * This is a sample certificate. Actual certificates will include the student's name and completed course information.
              </p>
            </div>
          </div>
        </div>
      </div>

        <Footer />
      </div>
    </TooltipProvider>
  );
}
