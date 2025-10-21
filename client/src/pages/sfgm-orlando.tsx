import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Users, Phone, Mail, Clock, BookOpen, Award } from "lucide-react";
import sfgmOrlandoLogo from "@/assets/sfgm-orlando-hero-logo.jpg";

export default function SFGMOrlando() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Fetch available courses
  const { data: courses = [] } = useQuery({
    queryKey: ['/api/courses'],
  });

  const { data: enrollments = [] } = useQuery({
    queryKey: ['/api/enrollments/student'],
    enabled: isAuthenticated,
  });

  // Course enrollment mutation
  const enrollMutation = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await apiRequest('POST', '/api/enrollments', {
        courseId: courseId,
      });
      return response;
    },
    onSuccess: (_, courseId) => {
      toast({
        title: "Success",
        description: "Successfully enrolled in the course!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/enrollments/student'] });
      // Navigate to the course page after successful enrollment
      window.location.href = `/course/${courseId}`;
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to enroll in course",
        variant: "destructive",
      });
    },
  });

  const availableCourses = (courses as any[]).filter((course: any) => course.isActive && course.id !== 6 && course.id !== 8); // Exclude Deacon Course and Youth Ministry (Boston only)
  const userEnrollments = (enrollments as any[]).map((e: any) => e.courseId);
  const unenrolledCourses = availableCourses.filter((course: any) => !userEnrollments.includes(course.id));
  const enrolledCourses = availableCourses.filter((course: any) => userEnrollments.includes(course.id));

  const handleEnroll = (courseId: number, courseName: string) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Check if already enrolled
    if (userEnrollments.includes(courseId)) {
      // If enrolled, go to course content
      window.location.href = `/course/${courseId}`;
      return;
    }

    // Perform enrollment
    enrollMutation.mutate(courseId);
  };

  const isEnrolledInCourse = (courseId: number) => {
    return userEnrollments.includes(courseId);
  };

  const campusInfo = {
    address: "1234 Bible Way, Orlando, FL 32801",
    phone: "(407) 555-BIBLE",
    email: "orlando@sfgm.org",
    hours: "Monday-Friday: 9AM-9PM, Saturday: 9AM-5PM, Sunday: 1PM-6PM"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-900 to-green-800">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* SFGM Orlando Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={sfgmOrlandoLogo} 
              alt="SFGM Orlando Logo" 
              className="w-auto h-72 md:h-80 object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            SFGM Orlando Bible School
          </h1>
          <p className="text-xl text-green-200 mb-8 max-w-3xl mx-auto">
            Soldiers For God Ministries offers several Bible school courses. Please click one of our Biblical Curriculum Studies below.
          </p>
        </div>

        {/* Available Courses */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Available Courses
          </h2>
          {availableCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map((course: any) => (
                <Card key={course.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white text-xl">{course.name}</CardTitle>
                      <Badge variant="outline" className={`border-green-400 ${isEnrolledInCourse(course.id) ? 'text-yellow-400 border-yellow-400' : 'text-green-400'}`}>
                        {isEnrolledInCourse(course.id) ? 'Enrolled' : 'Available'}
                      </Badge>
                    </div>
                    <p className="text-green-200 text-sm">{course.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Duration:</span>
                        <span>{course.duration || 0} weeks</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Format:</span>
                        <span>In-Person (Orlando)</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Schedule:</span>
                        <span>Evenings & Weekends</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleEnroll(course.id, course.name)}
                      disabled={enrollMutation.isPending}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
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
                          Enroll Now
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏫</div>
              <h3 className="text-2xl font-semibold text-white mb-4">No Courses Available</h3>
              <p className="text-green-200 mb-6">
                Check back soon for new courses at our Orlando campus!
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                  Contact Campus
                </Button>
              </Link>
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
