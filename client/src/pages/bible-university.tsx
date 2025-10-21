import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

export default function BibleUniversity() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Fetch enrollments to check if user is enrolled in Deacon Course
  const { data: enrollments = [] } = useQuery({
    queryKey: ['/api/enrollments/student'],
    enabled: isAuthenticated,
  });

  const userEnrollments = (enrollments as any[]).map((e: any) => e.courseId);
  const isEnrolledInDeaconCourse = userEnrollments.includes(6);
  const isEnrolledInYouthMinistryCourse = userEnrollments.includes(8);

  // Enroll in Deacon Course mutation
  const enrollMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/enrollments', {
        courseId: 6,
      });
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successfully enrolled in the Deacon Course!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/enrollments/student'] });
      // Navigate to the course page after successful enrollment
      window.location.href = '/course/6';
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to enroll in course",
        variant: "destructive",
      });
    },
  });

  // Enroll in Youth Ministry Course mutation
  const enrollYouthMinistryMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/enrollments', {
        courseId: 8,
      });
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successfully enrolled in the Youth Ministry Course!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/enrollments/student'] });
      // Navigate to the course page after successful enrollment
      window.location.href = '/course/8';
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to enroll in course",
        variant: "destructive",
      });
    },
  });

  const handleEnroll = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Check if already enrolled
    if (isEnrolledInDeaconCourse) {
      // If enrolled, go to course content
      window.location.href = '/course/6';
      return;
    }

    // Perform enrollment
    enrollMutation.mutate();
  };

  const handleYouthMinistryEnroll = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Check if already enrolled
    if (isEnrolledInYouthMinistryCourse) {
      // If enrolled, go to course content
      window.location.href = '/course/8';
      return;
    }

    // Perform enrollment
    enrollYouthMinistryMutation.mutate();
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            SFGM Boston Bible University
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Transform your spiritual journey with our comprehensive Bible university program. 
            Deepen your understanding of Scripture and prepare for effective ministry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg">
              Start Your Journey Today
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
              Learn More
            </Button>
          </div>
        </div>



        {/* Featured Course - Deacon Course */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Available Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white text-xl">Deacon Course</CardTitle>
                  <Badge variant="outline" className={`border-blue-400 ${isEnrolledInDeaconCourse ? 'text-green-400 border-green-400' : 'text-blue-400'}`}>
                    {isEnrolledInDeaconCourse ? 'Enrolled' : 'Available'}
                  </Badge>
                </div>
                <p className="text-blue-200 text-sm">A comprehensive Spirit-led training program for aspiring deacons. Learn the biblical foundation, practical ministry, and spiritual warfare principles needed for faithful service in the local church.</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Duration:</span>
                    <span>6 weeks</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Format:</span>
                    <span>Online & In-Person</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Schedule:</span>
                    <span>Self-Paced</span>
                  </div>
                </div>
                <Button 
                  onClick={handleEnroll}
                  disabled={enrollMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  {enrollMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Enrolling...
                    </>
                  ) : isAuthenticated && isEnrolledInDeaconCourse ? (
                    <>
                      <i className="fas fa-play mr-2"></i>
                      Continue Course
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus mr-2"></i>
                      Enroll in Deacon Course
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Youth Ministry Course Card */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white text-xl">Youth Ministry Course</CardTitle>
                  <Badge variant="outline" className={`border-blue-400 ${isEnrolledInYouthMinistryCourse ? 'text-green-400 border-green-400' : 'text-blue-400'}`}>
                    {isEnrolledInYouthMinistryCourse ? 'Enrolled' : 'Available'}
                  </Badge>
                </div>
                <p className="text-blue-200 text-sm">A comprehensive 5-chapter foundational course for youth ministry development and discipleship. Learn the calling, requirements, responsibilities, accountability, and disciple-making strategies needed for effective youth ministry.</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Duration:</span>
                    <span>5 weeks</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Format:</span>
                    <span>Online & In-Person</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Schedule:</span>
                    <span>Self-Paced</span>
                  </div>
                </div>
                <Button 
                  onClick={handleYouthMinistryEnroll}
                  disabled={enrollYouthMinistryMutation.isPending}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
                >
                  {enrollYouthMinistryMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Enrolling...
                    </>
                  ) : isAuthenticated && isEnrolledInYouthMinistryCourse ? (
                    <>
                      <i className="fas fa-play mr-2"></i>
                      Continue Course
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus mr-2"></i>
                      Enroll in Youth Ministry Course
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
