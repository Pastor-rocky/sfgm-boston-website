import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Trophy, Users, Star, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface MiniCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedDuration: string;
  coverImageUrl?: string;
  features: string[];
  highlights: string[];
}

export default function MiniCourses() {
  // Static mini course catalog data
  const miniCourses: MiniCourse[] = [
    {
      id: 1,
      title: "Genesis to Revelation Study",
      description: "Journey through the entire Bible with our comprehensive Genesis to Revelation study program. Discover the continuous thread of God's redemptive plan from creation to the new heavens and earth.",
      category: "Bible Study",
      difficulty: "Intermediate",
      estimatedDuration: "52 weeks",
      features: [
        "Weekly video teachings",
        "Interactive quizzes and assessments", 
        "Gender-based competition leaderboards",
        "Monthly prizes for top performers",
        "Community discussion forums",
        "Progress tracking and certificates"
      ],
      highlights: [
        "🏆 Competition-based learning with prizes",
        "📚 Complete Bible overview in 52 weeks",
        "👥 Separate male and female leaderboards",
        "⭐ Monthly awards for top students",
        "📊 Real-time progress tracking"
      ]
    },
    {
      id: 2,
      title: "Power of Preaching",
      description: "Master the art of powerful, biblical preaching with this comprehensive 5-week course based on Dr. Tony Evans' acclaimed book 'The Power of Preaching: Crafting a Creative Expository Sermon.' Learn from one of today's most effective preachers how to bring the Word to people and people to the Word through transformative expository preaching.",
      category: "Ministry Training",
      difficulty: "Advanced",
      estimatedDuration: "5 weeks",
      features: [
        "Foundation: Divine call to preach and passion from God",
        "Organization: Spiritual preparation and sermon planning",
        "Preparation: Biblical hermeneutics and word studies",
        "Presentation: Delivery techniques and audience engagement",
        "Integration: Illustrations, creative methods, and practice",
        "Based on Tony Evans' proven preaching methodology"
      ],
      highlights: [
        "📚 Based on Dr. Tony Evans' acclaimed preaching book",
        "🎤 Learn from one of today's most effective preachers",
        "📖 Master expository preaching and biblical hermeneutics",
        "🔥 Develop powerful, transformative sermon delivery",
        "⚡ 5-week intensive training for maximum impact"
      ]
    }
  ];

  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleExpanded = (courseId: number) => {
    setExpandedCard(expandedCard === courseId ? null : courseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">
            Mini Course Catalog
          </h1>
          <p className="text-xl text-blue-200 max-w-4xl mx-auto mb-4">
            Explore our specialized mini courses designed to complement your spiritual education journey. 
            These focused studies provide in-depth exploration of specific biblical topics and ministry skills.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-100 text-sm">
              <i className="fas fa-info-circle mr-2"></i>
              Mini courses are available exclusively to enrolled Bible School students. 
              <Link href="/bible-school" className="text-yellow-300 hover:text-yellow-200 underline ml-1">
                Join our Bible School
              </Link> to access these specialized studies.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {miniCourses.map((course) => (
            <Card key={course.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                {/* Course Cover Image */}
                <div className="flex justify-center mb-6">
                  <img 
                    src={course.id === 1 ? "/genesis-revelation-cover.png" : "/power-of-preaching-cover.jpg"} 
                    alt={`${course.title} Cover`}
                    className="w-32 h-40 object-cover rounded-lg shadow-xl border-2 border-white/20"
                  />
                </div>
                
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className="text-xs border-blue-300 text-blue-100">
                    {course.category}
                  </Badge>
                  <Badge 
                    variant={course.difficulty === 'Beginner' ? 'default' : 
                            course.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {course.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-white leading-tight mb-3">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-blue-200 text-base leading-relaxed">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-200">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">{course.estimatedDuration}</span>
                  </div>

                  {/* Course Highlights */}
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold text-sm">Course Highlights:</h4>
                    <div className="space-y-1">
                      {course.highlights.slice(0, 3).map((highlight, index) => (
                        <div key={index} className="text-blue-200 text-sm">
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Features Section */}
                  <div className="border-t border-white/20 pt-4">
                    <Button
                      variant="ghost"
                      onClick={() => toggleExpanded(course.id)}
                      className="w-full text-blue-200 hover:text-white hover:bg-white/10 p-2"
                    >
                      <span className="flex items-center justify-between w-full">
                        <span className="font-medium">
                          {expandedCard === course.id ? 'Hide Details' : 'View Full Details'}
                        </span>
                        {expandedCard === course.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    </Button>

                    {expandedCard === course.id && (
                      <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                        {/* Complete Highlights */}
                        <div>
                          <h5 className="text-white font-semibold text-sm mb-2">Complete Highlights:</h5>
                          <div className="space-y-1">
                            {course.highlights.map((highlight, index) => (
                              <div key={index} className="text-blue-200 text-sm">
                                {highlight}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Course Features */}
                        <div>
                          <h5 className="text-white font-semibold text-sm mb-2">Course Features:</h5>
                          <div className="grid gap-2">
                            {course.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-2 text-blue-200 text-sm">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Access Information */}
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <h5 className="text-white font-semibold text-sm mb-2">How to Access:</h5>
                          <p className="text-blue-200 text-sm">
                            This mini course is available to all enrolled Bible School students. 
                            Access it directly from your student dashboard after enrolling in our Bible School program.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Join Bible School CTA */}
                  <div className="pt-2">
                    <Link href="/bible-school">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Join Bible School to Access
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-xl text-center">
                <Trophy className="w-6 h-6 inline mr-2 text-yellow-400" />
                Why Choose Our Mini Courses?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Users className="w-8 h-8 mx-auto text-blue-400" />
                  <h3 className="text-white font-semibold">Community Learning</h3>
                  <p className="text-blue-200 text-sm">
                    Learn alongside fellow believers in an encouraging, competitive environment
                  </p>
                </div>
                <div className="space-y-2">
                  <Star className="w-8 h-8 mx-auto text-yellow-400" />
                  <h3 className="text-white font-semibold">Expert Instruction</h3>
                  <p className="text-blue-200 text-sm">
                    Receive guidance from experienced pastors and biblical scholars
                  </p>
                </div>
                <div className="space-y-2">
                  <Trophy className="w-8 h-8 mx-auto text-green-400" />
                  <h3 className="text-white font-semibold">Achievement Recognition</h3>
                  <p className="text-blue-200 text-sm">
                    Earn certificates and compete for monthly prizes and recognition
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}