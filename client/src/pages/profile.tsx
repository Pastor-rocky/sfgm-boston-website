import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
// useGrowFlow import removed - complete course freedom per user request
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import sfgmLogoBlue from "@/assets/sfgm-logo-new-blue.png";


interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  bio: string;
  phone: string;
}

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // Complete course freedom - no redirects needed

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    bio: "",
    phone: ""
  });

  const [showPassword, setShowPassword] = useState(false);


  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Force refetch the user data immediately
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      queryClient.refetchQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated!",
      });
      // Mark profile completion and redirect to dashboard
      sessionStorage.setItem('profileCompleted', 'true');
      window.location.href = '/dashboard';
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        username: user.username || "",
        password: "", // Never pre-fill password
        bio: user.bio || "",
        phone: user.phone || ""
      });
    }
  }, [user]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.username) {
      toast({
        title: "Missing Information",
        description: "Please fill in your first name, last name, and username.",
        variant: "destructive",
      });
      return;
    }

    // If password is provided, it should be at least 1 character (no complexity requirements)
    if (formData.password && formData.password.length < 1) {
      toast({
        title: "Password Required",
        description: "Please enter a password.",
        variant: "destructive",
      });
      return;
    }

    updateProfileMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <img 
                src={sfgmLogoBlue} 
                alt="SFGM Logo" 
                className="h-32 w-32 object-contain"
              />
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 max-w-2xl mx-auto">
              <p className="text-blue-800 italic text-lg font-medium">
                "And the one sitting on the throne said, '<span className="text-red-600 font-bold">Look, I am making everything new!</span>'"
              </p>
              <p className="text-blue-600 text-sm mt-2 text-right">— Revelation 21:5 NLT</p>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Welcome to SFGM Bible School! Please complete your profile to get started. 
              This information helps us personalize your learning experience and connect you with our community.
            </p>
            
            <div className="flex justify-center mt-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <i className="fas fa-shield-alt mr-2"></i>
                Your information is secure and private
              </Badge>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Personal Information */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <i className="fas fa-user mr-3"></i>Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="mt-1"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="mt-1"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>


                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Login & Bio */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <i className="fas fa-key mr-3"></i>Login & Bio
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                

                {/* Username */}
                <div>
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username *
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="mt-1"
                    placeholder="Choose a unique username"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    No inappropriate language allowed. Username will be checked for availability.
                  </p>
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="mt-1 pr-10"
                      placeholder="Create a password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fas fa-eye${showPassword ? '-slash' : ''} text-gray-400`}></i>
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    You can use any password you'd like - no complexity requirements.
                  </p>
                </div>

                <div className="border-t border-gray-200 my-6"></div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                    Tell Us About Yourself (Optional)
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="mt-1 min-h-[100px]"
                    placeholder="Share a bit about your faith journey, interests, or what you hope to learn..."
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.bio.length}/500 characters. Content is monitored for appropriateness.
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600">
              <CardContent className="p-6">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-12 py-3 text-lg"
                  disabled={updateProfileMutation.isPending}
                >
                  {updateProfileMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Saving Profile...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i>
                      Complete Profile & Continue
                    </>
                  )}
                </Button>
                
                <p className="text-white text-sm mt-3 opacity-90">
                  Once completed, you'll have access to all Bible School features
                </p>
                
                {/* Dashboard Link */}
                <div className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    <i className="fas fa-tachometer-alt mr-2"></i>
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>

        {/* Info Cards */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl text-green-600"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-600">
                Your information is encrypted and only used for your Bible School experience.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-2xl text-blue-600"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Join Our Community</h3>
              <p className="text-sm text-gray-600">
                Connect with fellow students and grow in faith together.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}