import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import sfgmLogoBlue from "@/assets/sfgm-logo-new-blue.png";

interface LoginFormData {
  identifier: string; // Can be email, username, phone
  password: string;
}

export default function Login() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: "",
    password: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated && user) {
    const redirectUrl = (user as any).isDean ? '/dean' :
                       (user as any).roles?.includes('admin') ? '/admin' :
                       (user as any).roles?.includes('instructor') ? '/instructor-home' : '/dashboard';
    window.location.href = redirectUrl;
    return null;
  }

  // Auto-detect login method based on input format
  const detectLoginMethod = (identifier: string): 'email' | 'username' | 'phone' => {
    // Check if it's an email
    if (identifier.includes('@') && identifier.includes('.')) {
      return 'email';
    }
    // Check if it's a phone number (contains only digits, spaces, parentheses, dashes)
    if (/^[\d\s\-\(\)\+]+$/.test(identifier)) {
      return 'phone';
    }
    // Default to username
    return 'username';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Auto-detect the login method
      const loginMethod = detectLoginMethod(formData.identifier);
      
      // Create the login payload based on the detected method
      const loginPayload: any = {
        password: formData.password,
        keepLoggedIn: keepLoggedIn
      };

      // Set the appropriate field based on detected login method
      if (loginMethod === 'email') {
        loginPayload.email = formData.identifier;
      } else if (loginMethod === 'username') {
        loginPayload.username = formData.identifier;
      } else if (loginMethod === 'phone') {
        loginPayload.phone = formData.identifier;
      }

      // Login attempt processing

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Essential for cross-platform session cookies
        body: JSON.stringify(loginPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      toast({
        title: "Login Successful",
        description: "Welcome back to SFGM Bible School!",
      });

      // Store token in localStorage and redirect
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      
      // Use server-provided redirect URL for role-based routing
      const redirectUrl = data.user?.redirectUrl || '/dashboard';
      
      // Force page reload to update authentication state
      window.location.href = redirectUrl;

    } catch (error: any) {
      // Special handling for email verification errors
      if (error.message && error.message.includes("verify your email")) {
        toast({
          title: "Email Verification Required",
          description: "Please check your email and click the verification link before logging in.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Failed",
          description: error.message || "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPlaceholder = () => {
    return 'Email, username, or phone number';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-blue-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Single Login Card */}
        <div className="max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white">
            <CardHeader className="text-center pb-2">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={sfgmLogoBlue} 
                  alt="SFGM Logo" 
                  className="h-20 w-20 object-contain"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Sign In</CardTitle>
              <p className="text-gray-600 text-sm">Access SFGM Bible School</p>
            </CardHeader>
            
            <CardContent className="pt-2">
              {/* OAuth Options */}
              <div className="space-y-3 mb-6">
                <Button
                  onClick={() => window.location.href = '/api/auth/google'}
                  variant="outline"
                  className="w-full"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 opacity-50 cursor-not-allowed"
                  disabled
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Continue with Instagram
                </Button>
                


              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Login Instructions */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 text-center">
                  You can log in using your email, username, or phone number, along with your password.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Login Identifier */}
                <div>
                  <Label htmlFor="identifier" className="text-sm font-medium text-gray-700">
                    Email, Username, or Phone
                  </Label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user text-gray-400"></i>
                    </div>
                    <Input
                      id="identifier"
                      type="text"
                      value={formData.identifier}
                      onChange={(e) => handleInputChange('identifier', e.target.value)}
                      className="pl-10"
                      placeholder={getPlaceholder()}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'} text-gray-400 hover:text-gray-600`}></i>
                    </button>
                  </div>
                  <div className="mt-1 mb-1">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      {showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                  </div>
                  <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded-md border border-amber-200 mt-1">
                    ⚠️ <strong>Remember:</strong> Passwords are case sensitive. Check your caps lock and make sure you're using the correct uppercase and lowercase letters.
                  </p>
                </div>

                {/* Keep me logged in checkbox */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="keep-logged-in"
                      type="checkbox"
                      checked={keepLoggedIn}
                      onChange={(e) => setKeepLoggedIn(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="keep-logged-in" className="ml-2 block text-sm text-gray-700">
                      Keep me logged in
                    </label>
                  </div>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      Sign In
                    </>
                  )}
                </Button>

                {/* Register Link */}
                <div className="text-center text-sm">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link 
                    href="/register" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign up here
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}