import React from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import sfgmLogoBlue from "@/assets/sfgm-logo-new-blue.png";
import sfgmOrlandoLogo from "@/assets/sfgm-orlando-small-logo.png";
import sfgmBostonLogo from "@/assets/sfgm-boston-logo-new.png";

export default function CourseCatalog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
      
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-2xl mx-auto border border-white/20">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <img 
                  src={sfgmLogoBlue} 
                  alt="SFGM Logo" 
                  className="h-28 w-28 object-contain drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 -z-10"></div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Course Catalog
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Choose your learning path and explore our comprehensive Bible school courses
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <i className="fas fa-graduation-cap text-green-500 mr-2"></i>
                Bible School Courses
              </div>
              <div className="flex items-center">
                <i className="fas fa-users text-blue-500 mr-2"></i>
                Join 500+ Students
              </div>
            </div>
          </div>
        </div>

        {/* Course Options */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* SFGM Boston Courses */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-8">
              <CardTitle className="flex items-center text-2xl justify-center font-bold">
                <img 
                  src={sfgmBostonLogo} 
                  alt="SFGM Boston Logo" 
                  className="w-28 h-28 object-contain mr-4"
                />
                SFGM Boston Courses
              </CardTitle>
              <p className="text-center text-blue-100 mt-2">Local Boston Ministry Courses</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-map-marker-alt text-blue-500 mr-3"></i>
                  <span>Boston, Massachusetts</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-book text-green-500 mr-3"></i>
                  <span>7 Comprehensive Courses</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-clock text-purple-500 mr-3"></i>
                  <span>Self-Paced Learning</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-certificate text-orange-500 mr-3"></i>
                  <span>Certificates Available</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/bible-university">
                  <Button className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <i className="fas fa-arrow-right mr-3"></i>
                    View Boston Courses
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* SFGM Orlando Courses */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white p-12">
              <CardTitle className="flex items-center text-2xl justify-center font-bold">
                <img 
                  src={sfgmOrlandoLogo} 
                  alt="SFGM Orlando Logo" 
                  className="w-20 h-20 object-contain mr-4"
                />
                SFGM Orlando Courses
              </CardTitle>
              <p className="text-center text-orange-100 mt-0">Florida Ministry Courses</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-map-marker-alt text-orange-500 mr-3"></i>
                  <span>Orlando, Florida</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-book text-green-500 mr-3"></i>
                  <span>6 Comprehensive Courses</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-clock text-purple-500 mr-3"></i>
                  <span>Self-Paced Learning</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-certificate text-orange-500 mr-3"></i>
                  <span>Certificates Available</span>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/sfgm-orlando">
                  <Button className="w-full h-12 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <i className="fas fa-arrow-right mr-3"></i>
                    View Orlando Courses
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose SFGM Bible School?</h3>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-bible text-blue-600 text-2xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Biblical Foundation</h4>
                    <p className="text-sm text-gray-600">Rooted in Scripture with practical ministry application</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-users text-green-600 text-2xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Community Learning</h4>
                    <p className="text-sm text-gray-600">Learn alongside fellow believers and ministry leaders</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-graduation-cap text-purple-600 text-2xl"></i>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Flexible Learning</h4>
                    <p className="text-sm text-gray-600">Study at your own pace with lifetime access</p>
                  </div>
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
