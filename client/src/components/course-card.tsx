import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Enrollment } from "@/types/enrollment";

interface CourseCardProps {
  course: {
    id: number;
    name: string;
    description?: string;
    duration: number;
    enrollmentCount?: number;
    isActive: boolean;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Fetch user enrollments to check enrollment status
  const { data: enrollments = [] } = useQuery<Enrollment[]>({
    queryKey: ['/api/enrollments/student'],
    enabled: isAuthenticated,
  });

  // Check if user is enrolled in this course
  const isEnrolled = enrollments.some((enrollment: Enrollment) => enrollment.courseId === course.id);

  const enrollMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/enrollments', {
        courseId: course.id,
      });
      return response.json();
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

  const getColorClass = () => {
    const colors = [
      'bg-primary/10 text-primary border-primary/20',
      'bg-secondary/10 text-secondary border-secondary/20',
      'bg-accent/10 text-accent border-accent/20',
      'bg-green-100 text-green-600 border-green-200',
      'bg-purple-100 text-purple-600 border-purple-200',
      'bg-indigo-100 text-indigo-600 border-indigo-200'
    ];
    return colors[course.id % colors.length];
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    
    if (isEnrolled) {
      // Check if user has seen instructions before
      try {
        const response = await apiRequest('GET', `/api/courses/${course.id}/instructions-viewed`);
        const data = await response.json();
        
        if (data.hasViewed) {
          // Go directly to course content if instructions already viewed
          window.location.href = `/courses/${course.id}`;
        } else {
          // Show instructions first
          window.location.href = `/course-instructions/${course.id}`;
        }
      } catch (error) {
        console.error('Error checking instructions status:', error);
        // Default to instructions page if error
        window.location.href = `/course-instructions/${course.id}`;
      }
      return;
    }
    
    enrollMutation.mutate();
  };

  return (
    <Card className="bg-white border hover:shadow-md transition-all card-hover">
      <CardContent className="p-6">
        {/* Course Cover Image */}
        <div className="flex justify-center mb-4">
          <img 
            src={course.id === 1 ? "/acts-in-action-cover.png" : 
                  course.id === 2 ? "/becoming-a-fire-starter-cover.jpeg" :
                  course.id === 3 ? "/dont-be-a-jonah-cover.jpg" :
                  course.id === 4 ? "/grow-cover.png" :
                  course.id === 5 ? "/studying-for-service-cover.jpg" :
                  "/course-cover-placeholder.png"} 
            alt={`${course.name} Cover`}
            className="w-24 h-32 object-cover rounded-lg shadow-md border border-gray-200"
          />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <Badge className={getColorClass()}>
            {course.duration} Week{course.duration !== 1 ? 's' : ''}
          </Badge>
          <div className="flex items-center text-sm text-slate-500">
            <i className="fas fa-users mr-1"></i>
            {course.enrollmentCount || 0}
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
          {course.name}
        </h3>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {course.description || "Enhance your biblical knowledge and spiritual growth through this comprehensive course."}
        </p>

        {/* Assessment Information for Comprehensive Courses */}
        {course.id === 3 && ( // Becoming a Fire Starter
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between text-xs text-blue-700 mb-1">
              <span className="font-semibold">Comprehensive Assessment System</span>
              <i className="fas fa-clipboard-check"></i>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-blue-600">
              <div className="flex items-center">
                <i className="fas fa-list-check mr-1"></i>
                10 Weekly Quizzes
              </div>
              <div className="flex items-center">
                <i className="fas fa-graduation-cap mr-1"></i>
                50Q Final Exam
              </div>
              <div className="flex items-center">
                <i className="fas fa-question-circle mr-1"></i>
                250 Total Questions
              </div>
              <div className="flex items-center">
                <i className="fas fa-bible mr-1"></i>
                Luke + Textbook
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-slate-500">
            {course.isActive ? 'Available Now' : 'Coming Soon'}
          </span>
          <Badge variant="outline" className="text-xs">
            <i className="fas fa-certificate mr-1"></i>Certificate
          </Badge>
        </div>

        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 w-full"
            onClick={async () => {
              if (!isAuthenticated) {
                window.location.href = '/login';
                return;
              }
              
              try {
                const response = await fetch(`/api/courses/${course.id}/instructions-viewed`);
                const data = await response.json();
                
                if (data.hasViewed) {
                  // Go directly to course content if instructions already viewed
                  window.location.href = `/courses/${course.id}`;
                } else {
                  // Show instructions first
                  window.location.href = `/course-instructions/${course.id}`;
                }
              } catch (error) {
                console.error('Error checking instructions status:', error);
                // Default to instructions page if error
                window.location.href = `/course-instructions/${course.id}`;
              }
            }}
          >
            <i className="fas fa-info-circle mr-1"></i>Course Instructions
          </Button>
          
          {isAuthenticated && user?.role === 'student' && course.isActive && (
            <Button 
              size="sm" 
              className={`flex-1 ${isEnrolled ? 'bg-green-600 hover:bg-green-700' : ''}`}
              onClick={handleEnroll}
              disabled={enrollMutation.isPending}
            >
              {enrollMutation.isPending ? (
                <i className="fas fa-spinner fa-spin mr-1"></i>
              ) : isEnrolled ? (
                <i className="fas fa-check mr-1"></i>
              ) : (
                <i className="fas fa-plus mr-1"></i>
              )}
              {enrollMutation.isPending ? 'Enrolling...' : isEnrolled ? 'Enrolled' : 'Enroll'}
            </Button>
          )}

          {!isAuthenticated && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => window.location.href = '/api/login'}
            >
              <i className="fas fa-sign-in-alt mr-1"></i>Login to Enroll
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
