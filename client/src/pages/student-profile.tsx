import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { 
  User, Heart, Save, CheckCircle, AlertCircle, Camera, Upload
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function StudentProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    favoriteScripture: '',
    profileImageUrl: ''
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Fetch current user data
  const { data: currentUser } = useQuery<any>({
    queryKey: ['/api/auth/user'],
  });

  // Initialize profile data when user data is loaded
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        dateOfBirth: currentUser.dateOfBirth || '',
        gender: currentUser.gender || '',
        favoriteScripture: currentUser.favoriteScripture || '',
        profileImageUrl: currentUser.profileImageUrl || ''
      });
      setImagePreview(currentUser.profileImageUrl || '');
    }
  }, [currentUser]);

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('PUT', '/api/profile', data);
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      setIsEditing(false);
      setIsSaving(false);
    },
    onError: (error: any) => {
      console.error('Profile update error:', error);
      toast({
        title: "Update Failed",
        description: error?.message || "Please try again.",
        variant: "destructive"
      });
      setIsSaving(false);
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file (JPG, PNG, GIF, etc.)",
          variant: "destructive"
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // If there's a new image, upload it first
      if (profileImage) {
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        
        const uploadResponse = await fetch('/api/upload/profile-image', {
          method: 'POST',
          body: formData,
        });
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          profileData.profileImageUrl = uploadData.imageUrl;
        } else {
          throw new Error('Failed to upload image');
        }
      }
      
      updateProfileMutation.mutate(profileData);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload profile image. Please try again.",
        variant: "destructive"
      });
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isProfileComplete = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'gender', 'phone'];
    return requiredFields.every(field => profileData[field as keyof typeof profileData]?.trim() !== '');
  };

  const completionPercentage = () => {
    const allFields = Object.keys(profileData);
    const completedFields = allFields.filter(field => 
      profileData[field as keyof typeof profileData]?.trim() !== ''
    );
    return Math.round((completedFields.length / allFields.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <Navigation />
      
      <main className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Complete Your Profile</h1>
            <p className="text-xl text-blue-200">
              Help us get to know you better
            </p>
          </div>
        </div>

        {/* Profile Picture Section */}
        <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-white text-lg font-semibold mb-2">Profile Picture</h3>
                <p className="text-blue-200 text-sm mb-4">
                  Add a photo to personalize your profile
                </p>
                {isEditing && (
                  <div className="flex gap-2">
                    <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Choose Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion Status */}
        <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white text-xl font-semibold">Profile Completion</h3>
                <p className="text-blue-200 text-sm">
                  {completionPercentage()}% complete
                </p>
              </div>
              <div className="text-right">
                {isProfileComplete() ? (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Complete!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-semibold">Incomplete</span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage()}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                <User className="h-6 w-6 text-blue-400" />
                Personal Information
              </CardTitle>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-white text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5 text-blue-400" />
                Basic Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white text-sm font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white text-sm font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white text-sm font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth" className="text-white text-sm font-medium">
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="gender" className="text-white text-sm font-medium">
                    Gender *
                  </Label>
                  <Select
                    value={profileData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Favorite Scripture */}
            <div className="space-y-4">
              <h4 className="text-white text-lg font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-blue-400" />
                Spiritual Information
              </h4>
              <div>
                <Label htmlFor="favoriteScripture" className="text-white text-sm font-medium">
                  Favorite Scripture
                </Label>
                <Textarea
                  id="favoriteScripture"
                  value={profileData.favoriteScripture}
                  onChange={(e) => handleInputChange('favoriteScripture', e.target.value)}
                  disabled={!isEditing}
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
                  placeholder="Share your favorite Bible verse or passage"
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
