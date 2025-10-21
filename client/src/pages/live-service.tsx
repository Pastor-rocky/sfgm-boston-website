import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import sfgmLogo from "@/assets/sfgm-logo-1.png";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/user";

export default function LiveService() {
  const [streamStatus, setStreamStatus] = useState({
    youtube: false,
    facebook: false,
    instagram: false
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toast } = useToast();

  // Check if user is admin/instructor
  const { data: user } = useQuery<User | null>({
    queryKey: ['/api/auth/user'],
    enabled: true
  });

  const isAdmin = user?.role === 'admin' || user?.role === 'instructor' || user?.isDean;

  // Check if it's Sunday around service time (7:00 PM)
  useEffect(() => {
    const checkServiceTime = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = Sunday
      const hour = now.getHours();
      
      // Sunday between 6:30 PM and 9:00 PM (service time buffer)
      const isServiceTime = dayOfWeek === 0 && hour >= 18 && hour <= 21;
      
      setStreamStatus({
        youtube: isServiceTime,
        facebook: isServiceTime,
        instagram: isServiceTime
      });
    };

    checkServiceTime();
    
    // Check every minute
    const interval = setInterval(checkServiceTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Update current time every second for real-time countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Get countdown to next Sunday service
  const getNextSundayCountdown = () => {
    const now = currentTime;
    const nextSunday = new Date();
    
    // Find next Sunday at 7:00 PM
    const daysUntilSunday = (7 - now.getDay()) % 7;
    if (daysUntilSunday === 0 && now.getHours() < 19) {
      // It's Sunday but before 7 PM
      nextSunday.setHours(19, 0, 0, 0);
    } else {
      // Set to next Sunday
      nextSunday.setDate(now.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday));
      nextSunday.setHours(19, 0, 0, 0);
    }

    const timeDiff = nextSunday.getTime() - now.getTime();
    if (timeDiff <= 0) return "Starting soon!";

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-500" : "bg-red-500";
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? "LIVE" : "OFFLINE";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src={sfgmLogo} 
              alt="SFGM Logo" 
              className="w-20 h-20 mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Live Service Streaming</h1>
              <p className="text-gray-600">SFGM Boston Sunday Worship</p>
            </div>
          </div>
          
          {/* Admin Edit Link */}
          {isAdmin && (
            <div className="mt-4 flex space-x-3">
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                >
                  <i className="fas fa-edit mr-2"></i>
                  Edit Live Service Page
                </Button>
              </Link>
              <Link href="/streaming-dashboard">
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <i className="fas fa-broadcast-tower mr-2"></i>
                  Streaming Control
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Service Information & Countdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sunday Worship Service</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <i className="fas fa-calendar text-blue-600"></i>
                <span className="text-gray-700 font-medium">Every Sunday</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="fas fa-clock text-blue-600"></i>
                <span className="text-gray-700 font-medium">7:00 PM</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="fas fa-music text-blue-600"></i>
                <span className="text-gray-700 font-medium">90 minutes</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <i className="fas fa-users text-blue-600"></i>
                <span className="text-gray-700 font-medium">All Welcome</span>
              </div>
            </div>
          </div>

          {/* Countdown & Status */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(streamStatus.youtube || streamStatus.facebook || streamStatus.instagram)}`}></div>
                <span className="text-xl font-bold text-gray-800">
                  {streamStatus.youtube || streamStatus.facebook || streamStatus.instagram ? "STREAMING NOW" : "NEXT SERVICE"}
                </span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {streamStatus.youtube || streamStatus.facebook || streamStatus.instagram ? "LIVE" : getNextSundayCountdown()}
              </div>
              <p className="text-gray-600">
                {streamStatus.youtube || streamStatus.facebook || streamStatus.instagram 
                  ? "Join us for live worship and ministry" 
                  : "Until next Sunday worship service"}
              </p>
            </div>
          </div>
        </div>



        {/* Go Live Controls */}
        {isAdmin && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Go Live Controls</h2>
            
            <div className="space-y-4">
              {/* Top Row - SFGM Blog and SFGM Zoom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SFGM Blog Live */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-blog text-white text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">SFGM Blog</h3>
                    <p className="text-sm text-gray-600">Multi-camera blog control</p>
                  </div>
                  <Button 
                    onClick={() => {
                      window.open('/sfgm-blog', '_blank');
                      toast({
                        title: "SFGM Blog Live",
                        description: "Blog streaming page opened - click scene buttons to control OBS",
                      });
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
                  >
                    Go Live
                  </Button>
                </div>

                {/* SFGM Zoom Live */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <i className="fas fa-video text-white text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">SFGM Zoom</h3>
                    <p className="text-sm text-gray-600">Virtual meeting controls</p>
                  </div>
                  <Button 
                    onClick={() => {
                      window.open('/sfgm-blog', '_blank');
                      toast({
                        title: "Zoom Meeting Live",
                        description: "Zoom controls opened - use virtual camera scenes for meetings",
                      });
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
                  >
                    Go Live
                  </Button>
                </div>
              </div>

              {/* Bottom Row - OBS YouTube (Full Width) */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i className="fab fa-youtube text-white text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">OBS YouTube</h3>
                  <p className="text-sm text-gray-600">Scene control & streaming</p>
                </div>
                <Button 
                  onClick={() => {
                    toast({
                      title: "OBS Remote Control",
                      description: "OBS remote control functionality has been removed. Use OBS Studio directly for streaming controls.",
                      variant: "destructive",
                    });
                  }}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2"
                  disabled
                >
                  OBS Control (Removed)
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Questions about live streaming?</p>
          <p className="text-sm">
            <a href="tel:617-512-7451" className="text-blue-600 hover:underline">
              617-512-7451
            </a> | 
            <a href="mailto:pastorrocky1978@gmail.com" className="text-blue-600 hover:underline ml-1">
              pastorrocky1978@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}