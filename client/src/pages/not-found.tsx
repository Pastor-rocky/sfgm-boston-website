import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Home, Search, BookOpen, Users, Calendar, Mail, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const quickLinks = [
    { name: "Home", path: "/", icon: Home, description: "Return to main page" },
    { name: "Bible School", path: "/bible-school", icon: BookOpen, description: "Browse courses" },
    { name: "Daily Sharpening", path: "/daily-sharpening", icon: Calendar, description: "Daily videos" },
    { name: "Contact", path: "/contact", icon: Mail, description: "Get help" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simple search - redirect to bible school with search query
      setLocation(`/bible-school?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main 404 Card */}
          <Card className="rounded-xl border-0 shadow-2xl bg-white dark:bg-gray-800 mb-8">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                404 Page Not Found
              </CardTitle>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Oops! The page you're looking for doesn't exist.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Search Bar */}
              <div className="max-w-md mx-auto">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Search for courses, content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="px-6">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </form>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleGoBack} variant="outline" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                <Button onClick={() => setLocation("/")} className="flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>

              {/* Quick Links */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  Popular Pages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickLinks.map((link) => (
                    <Button
                      key={link.path}
                      variant="outline"
                      onClick={() => setLocation(link.path)}
                      className="h-auto p-4 flex flex-col items-center text-center hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                    >
                      <link.icon className="h-6 w-6 mb-2 text-blue-600" />
                      <span className="font-medium text-sm">{link.name}</span>
                      <span className="text-xs text-gray-500 mt-1">{link.description}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Need Help?
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-200 mb-3">
                  If you believe this is an error, please contact our support team.
                </p>
                <Button 
                  onClick={() => setLocation("/contact")} 
                  variant="outline" 
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              Error Code: 404 | SFGM Boston Bible School
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
