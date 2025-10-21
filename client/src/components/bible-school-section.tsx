import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { useState } from "react";

export default function BibleSchoolSection() {
  const { isAuthenticated } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const features = [
    {
      icon: "fas fa-video",
      title: "Video Learning",
      description: "Weekly instructional videos and interactive content tailored to each course.",
      color: "primary"
    },
    {
      icon: "fas fa-certificate",
      title: "Certificates",
      description: "Receive certificates of completion for all finished courses and programs.",
      color: "secondary"
    },
    {
      icon: "fas fa-users-class",
      title: "Expert Instructors",
      description: "Learn from experienced ministry leaders and biblical scholars.",
      color: "accent"
    }
  ];

  const sampleCourses = [
    {
      id: 0,
      name: "G.R.O.W Beginner Course",
      duration: "4 Weeks",
      points: 180,
      description: "Welcome orientation and practice course for new Bible school students. Learn how the platform works while exploring G.R.O.W ministry principles: Give, Read, Obey, Win Souls. This ungraded course introduces you to taking quizzes, watching videos, and reading materials before starting your real academic coursework.",
      color: "green",
      category: "Foundation",
      difficulty: "Beginner",
      overview: "Welcome orientation and practice course designed to familiarize new students with the Bible school platform while introducing SFGM Boston's ministry philosophy. This ungraded course serves as training before accessing real academic coursework.",
      assignments: "Weekly spiritual growth exercises, discipleship practices, and ministry application projects",
      grading: "Practice quizzes and activities - No grades recorded (orientation course only)",
      forum: "Share growth testimonies, discuss discipleship challenges, and encourage spiritual development"
    },
    {
      id: 1,
      name: "Don't Be a Jonah",
      duration: "11 Weeks",
      points: 320,
      description: "Bishop Anthony Lee's sixth book is filled with compassion and urgency to encourage all those who are running from the call that God has for their life, so they would submit to the plans God has for them and no longer deal with the unnecessary storms that plague us when we rebel against the will of God.",
      color: "primary",
      category: "Biblical Studies",
      difficulty: "Intermediate",
      overview: "An intensive study on obedience to God's calling, using the prophet Jonah as a case study for understanding the consequences of running from divine purpose.",
      assignments: "Reflection papers, obedience action plans, and ministry calling assessments",
      grading: "11 weekly quizzes (20 points each) + Final exam (100 points) = 320 total points",
      forum: "Share calling testimonies, discuss obedience challenges, and support fellow students"
    },
    {
      id: 2,
      name: "Studying for Service",
      duration: "11 Weeks",
      points: 320,
      description: "The More You Know Your Text, The More People Will Know Their God. Master effective Bible study methods and develop skills for lifelong spiritual growth and ministry preparation.",
      color: "secondary",
      category: "Biblical Studies",
      difficulty: "Intermediate",
      overview: "Learn proven techniques for personal Bible study, including hermeneutics, exegesis, and practical application. This foundational course equips students with tools for independent study and prepares them for deeper theological exploration.",
      assignments: "Bible study reports, method practice exercises, and teaching demonstrations",
      grading: "11 weekly quizzes (20 points each) + Final exam (100 points) = 320 total points",
      forum: "Share study insights, discuss interpretation methods, and practice teaching techniques"
    },
    {
      id: 3,
      name: "Becoming a Fire Starter",
      duration: "10 Weeks",
      points: 300,
      description: "If you are tired of burning low and burning out, this is the book for you. Becoming a Fire Starter will instill in your walk of discipleship seven powerful principles that will enable you to not only be filled with the fire of the Holy Spirit, but to remain burning with passion for the Gospel of Jesus Christ and lost people.",
      color: "accent",
      category: "Ministry",
      difficulty: "Intermediate",
      overview: "Seven powerful principles that will enable you to not only be filled with the fire of the Holy Spirit, but to remain burning with passion for the Gospel of Jesus Christ and lost people.",
      assignments: "Personal testimony development, ministry project planning, and peer mentoring exercises",
      grading: "10 weekly quizzes (20 points each) + Final exam (100 points) = 300 total points",
      forum: "Share testimonies, discuss ministry challenges, and encourage spiritual growth"
    },
    {
      id: 5,
      name: "Level Up Leadership",
      duration: "5 Weeks",
      points: 200,
      description: "Develop essential leadership skills for ministry and life through biblical principles based on John Maxwell's 5 Levels of Leadership adapted for Christian ministry context.",
      color: "purple",
      category: "Leadership",
      difficulty: "Intermediate",
      overview: "Based on John Maxwell's leadership principles adapted for Christian ministry. Students will explore the 5 levels of leadership and learn practical skills for leading teams, making decisions, and influencing others for kingdom purposes.",
      assignments: "Leadership assessments, team projects, and practical leadership exercises",
      grading: "5 weekly quizzes (20 points each) + Final exam (100 points) = 200 total points",
      forum: "Discuss leadership challenges, share success stories, and mentor emerging leaders"
    },
    {
      id: 7,
      name: "Introduction to Prophecy",
      duration: "5 Weeks",
      points: 200,
      description: "A comprehensive introduction to biblical prophecy and end times events. Students will explore prophetic literature, understand different eschatological viewpoints, and learn to interpret apocalyptic texts with sound hermeneutical principles.",
      color: "indigo",
      category: "Prophecy",
      difficulty: "Intermediate",
      overview: "An introductory course designed to give students a solid foundation in biblical prophecy, covering major prophetic themes and preparing them for deeper eschatological study.",
      assignments: "Prophecy charts, comparative analysis papers, and application essays",
      grading: "5 weekly quizzes (20 points each) + Final exam (100 points) = 200 total points",
      forum: "Discuss prophetic passages, compare interpretations, and explore practical applications",
      comingSoon: true
    },
    {
      id: 8,
      name: "The Watchmen Project",
      duration: "10 Weeks",
      points: 300,
      description: "An in-depth study of biblical prophecy, covering detailed analysis of prophetic texts, chronological frameworks, and contemporary relevance of biblical prophecy. Students will examine complex prophetic passages and their fulfillment patterns.",
      color: "red",
      category: "Prophecy",
      difficulty: "Advanced",
      overview: "Advanced prophetic studies for students ready to engage with complex eschatological themes, detailed prophetic chronologies, and contemporary prophetic applications.",
      assignments: "Comprehensive prophecy research projects, detailed exegetical studies, and teaching presentations",
      grading: "10 weekly quizzes (20 points each) + Final exam (100 points) = 300 total points",
      forum: "Engage in advanced prophetic discussions, share research findings, and debate interpretations",
      comingSoon: true
    },
    {
      id: 9,
      name: "Theology 101",
      duration: "10 Weeks",
      points: 300,
      description: "Welcome to our 10-week theology semester! Within this course we'll dive into various aspects of theology, each teaching will explore multiple topics and subjects, which will bring us to the conclusions of Why we believe What we believe, as outlined by the Word of God.",
      color: "orange",
      category: "Theology",
      difficulty: "Beginner",
      overview: "Foundational theological education covering essential Christian doctrines, providing students with a solid biblical framework for understanding core beliefs.",
      assignments: "Doctrinal essays, theological position papers, and comparative analysis projects",
      grading: "10 weekly quizzes (20 points each) + Final exam (100 points) = 300 total points",
      forum: "Engage in theological discussions, debate doctrinal positions, and deepen understanding",
      comingSoon: true
    },
    {
      id: 16,
      name: "SFGM Man of God Course",
      duration: "8 Weeks",
      points: 260,
      description: "The Man of God course is an 8-week Bible study designed to challenge, equip, and empower men to walk boldly in their God-given purpose. This course is taught by two pastors from different SFGM locations, each bringing unique insights to help you grow spiritually and practically.",
      color: "emerald",
      category: "Character Development",
      difficulty: "Intermediate",
      overview: "An intensive 8-week men's discipleship course combining biblical teaching with practical application for developing godly character and leadership.",
      assignments: "Character assessments, leadership exercises, and practical ministry applications",
      grading: "8 weekly quizzes (20 points each) + Final exam (100 points) = 260 total points",
      forum: "Share testimonies, discuss character development, and encourage Christian brotherhood",
      comingSoon: true
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      primary: "bg-primary/10 text-primary",
      secondary: "bg-secondary/10 text-secondary",
      accent: "bg-accent/10 text-accent",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      indigo: "bg-indigo-100 text-indigo-600",
      blue: "bg-blue-100 text-blue-600",
      red: "bg-red-100 text-red-600",
      orange: "bg-orange-100 text-orange-600",
      emerald: "bg-emerald-100 text-emerald-600"
    };
    return colorMap[color] || "bg-slate-100 text-slate-600";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalPoints = sampleCourses.reduce((sum, course) => sum + course.points, 0);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">SFGM Boston Bible School</h2>
          <div className="mt-4">
            <p className="text-lg text-slate-600 italic">
              "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth." 
              <span className="text-blue-600 font-semibold ml-2">— 2 Timothy 2:15 KJV</span>
            </p>
          </div>
        </div>

        {/* Course Catalog Preview */}
        <div className="bg-slate-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Course Catalog</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCourses.map((course) => (
              <Card key={course.id} className="bg-white border hover:shadow-md transition-shadow card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getColorClasses(course.color)}>
                      {course.duration}
                    </Badge>
                    {(course as any).comingSoon ? (
                      <Badge className="bg-amber-100 text-amber-800 text-xs font-bold">
                        COMING SOON
                      </Badge>
                    ) : (
                      <i className="fas fa-bookmark text-slate-400"></i>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{course.name}</h4>
                  <p className="text-slate-600 text-sm mb-4">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(course.difficulty)} variant="secondary">
                        {course.difficulty}
                      </Badge>
                      <span className="text-xs text-slate-500">{course.points} pts</span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                          Learn More <i className="fas fa-arrow-right ml-1"></i>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-center mb-4">
                            {course.name}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Course Overview */}
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{course.duration}</div>
                                <div className="text-sm text-gray-600">Duration</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{course.points}</div>
                                <div className="text-sm text-gray-600">Total Points</div>
                              </div>
                              <div className="text-center">
                                <Badge className={getDifficultyColor(course.difficulty)} variant="secondary">
                                  {course.difficulty}
                                </Badge>
                                <div className="text-sm text-gray-600 mt-1">Level</div>
                              </div>
                            </div>
                            <div className="text-center">
                              <Badge className={getColorClasses(course.color)} variant="secondary">
                                {course.category}
                              </Badge>
                            </div>
                          </div>

                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="grading">Grading</TabsTrigger>
                              <TabsTrigger value="assignments">Assignments</TabsTrigger>
                              <TabsTrigger value="forum">Forum</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="overview" className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-lg mb-2">Course Overview</h4>
                                <p className="text-gray-700 leading-relaxed">{course.overview}</p>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="grading" className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-lg mb-2">Grading Structure</h4>
                                <p className="text-gray-700 leading-relaxed">{course.grading}</p>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="assignments" className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-lg mb-2">Course Assignments</h4>
                                <p className="text-gray-700 leading-relaxed">{course.assignments}</p>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="forum" className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-lg mb-2">Discussion Forum</h4>
                                <p className="text-gray-700 leading-relaxed">{course.forum}</p>
                              </div>
                            </TabsContent>
                          </Tabs>

                          <Separator />
                          
                          <div className="text-center">
                            {isAuthenticated ? (
                              <Link href="/bible-school">
                                <Button className="btn-primary px-8 py-3">
                                  <i className="fas fa-graduation-cap mr-2"></i>
                                  Enroll in This Course
                                </Button>
                              </Link>
                            ) : (
                              <Button 
                                onClick={() => window.location.href = '/login'}
                                className="btn-primary px-8 py-3"
                              >
                                <i className="fas fa-sign-in-alt mr-2"></i>
                                Login to Enroll
                              </Button>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Course Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mt-8 mb-8">
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Complete Course Catalog</h4>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{sampleCourses.length}</div>
                  <div className="text-sm text-gray-600">Total Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{totalPoints}</div>
                  <div className="text-sm text-gray-600">Total Points Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">6</div>
                  <div className="text-sm text-gray-600">Study Categories</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Foundation • Biblical Studies • Ministry • Leadership • Prophecy • Theology • Character Development
              </p>
            </div>
          </div>

          <div className="text-center">
            {isAuthenticated ? (
              <Link href="/bible-school">
                <Button className="btn-primary px-8 py-4 text-lg shadow-lg">
                  <i className="fas fa-graduation-cap mr-3"></i>Browse All Courses
                </Button>
              </Link>
            ) : (
              <Button 
                onClick={() => window.location.href = '/login'}
                className="btn-primary px-8 py-4 text-lg shadow-lg"
              >
                <i className="fas fa-graduation-cap mr-3"></i>Enroll in Bible School
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}