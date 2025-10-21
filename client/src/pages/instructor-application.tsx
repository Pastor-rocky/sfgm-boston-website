import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function InstructorApplication() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    teachingExperience: "",
    subjectsOfInterest: "",
    ministry_background: "",
    motivation: "",
    availability: "",
    additionalComments: ""
  });

  const applicationMutation = useMutation({
    mutationFn: async (applicationData: any) => {
      const response = await fetch('/api/instructor-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
      if (!response.ok) throw new Error('Failed to submit application');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your instructor application has been submitted successfully. We'll review it and get back to you soon.",
      });
      setFormData({
        teachingExperience: "",
        subjectsOfInterest: "",
        ministry_background: "",
        motivation: "",
        availability: "",
        additionalComments: ""
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit an instructor application",
        variant: "destructive"
      });
      return;
    }
    
    applicationMutation.mutate({
      ...formData,
      userId: user?.id,
      userEmail: user?.email,
      userName: `${user?.firstName} ${user?.lastName}`.trim()
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-8">
              <i className="fas fa-lock text-4xl text-gray-400 mb-4"></i>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
              <p className="text-gray-600 mb-6">Please log in to access the instructor application.</p>
              <Button onClick={() => window.location.href = '/api/login'}>
                <i className="fas fa-sign-in-alt mr-2"></i>
                Log In
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <i className="fas fa-chalkboard-teacher text-orange-600 mr-3"></i>
            Instructor Application
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our ministry team as an instructor and help spread God's word through education. 
            Share your knowledge and passion for biblical teaching with our students.
          </p>
        </div>

        {/* Application Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <i className="fas fa-info-circle text-blue-600"></i>
              Application Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Badge className="bg-green-100 text-green-800">
                  <i className="fas fa-check mr-1"></i>
                </Badge>
                <div>
                  <h4 className="font-semibold">Ministry Experience</h4>
                  <p className="text-sm text-gray-600">Active involvement in Christian ministry</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-800">
                  <i className="fas fa-book mr-1"></i>
                </Badge>
                <div>
                  <h4 className="font-semibold">Biblical Knowledge</h4>
                  <p className="text-sm text-gray-600">Strong understanding of biblical principles</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Badge className="bg-purple-100 text-purple-800">
                  <i className="fas fa-heart mr-1"></i>
                </Badge>
                <div>
                  <h4 className="font-semibold">Passion for Teaching</h4>
                  <p className="text-sm text-gray-600">Desire to educate and mentor students</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Badge className="bg-orange-100 text-orange-800">
                  <i className="fas fa-clock mr-1"></i>
                </Badge>
                <div>
                  <h4 className="font-semibold">Time Commitment</h4>
                  <p className="text-sm text-gray-600">Available to create and teach courses</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
            <p className="text-gray-600">Please fill out all fields to help us understand your qualifications and interests.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="teachingExperience">Teaching Experience</Label>
                  <Textarea
                    id="teachingExperience"
                    placeholder="Describe your previous teaching or training experience..."
                    value={formData.teachingExperience}
                    onChange={(e) => handleInputChange('teachingExperience', e.target.value)}
                    required
                    className="min-h-24"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subjectsOfInterest">Subjects of Interest</Label>
                  <Textarea
                    id="subjectsOfInterest"
                    placeholder="What biblical topics or courses would you like to teach?"
                    value={formData.subjectsOfInterest}
                    onChange={(e) => handleInputChange('subjectsOfInterest', e.target.value)}
                    required
                    className="min-h-24"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ministry_background">Ministry Background</Label>
                <Textarea
                  id="ministry_background"
                  placeholder="Tell us about your involvement in Christian ministry and church leadership..."
                  value={formData.ministry_background}
                  onChange={(e) => handleInputChange('ministry_background', e.target.value)}
                  required
                  className="min-h-32"
                />
              </div>

              <div>
                <Label htmlFor="motivation">Motivation for Teaching</Label>
                <Textarea
                  id="motivation"
                  placeholder="Why do you want to become an instructor at SFGM Boston Bible School?"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  required
                  className="min-h-32"
                />
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <Textarea
                  id="availability"
                  placeholder="When are you available to create content and interact with students?"
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  required
                  className="min-h-24"
                />
              </div>

              <div>
                <Label htmlFor="additionalComments">Additional Comments</Label>
                <Textarea
                  id="additionalComments"
                  placeholder="Anything else you'd like us to know about your application..."
                  value={formData.additionalComments}
                  onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div className="flex justify-between items-center pt-6">
                <Link href="/dashboard">
                  <Button type="button" variant="outline">
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Dashboard
                  </Button>
                </Link>
                
                <Button 
                  type="submit" 
                  disabled={applicationMutation.isPending}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {applicationMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}