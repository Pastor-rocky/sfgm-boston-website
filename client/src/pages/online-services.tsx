import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import sfgmLogo from "@/assets/sfgm-logo.png";

export default function OnlineServices() {
  const onlineServices = [
    {
      title: "YouTube Channel",
      description: "Watch live worship services, sermons, and Bible study sessions. Subscribe for weekly content and ministry updates.",
      platform: "YouTube",
      icon: "fab fa-youtube",
      color: "red",
      url: "https://youtube.com/@sfgmboston",
      features: ["Live Worship Services", "Weekly Sermons", "Bible Study Videos", "Ministry Testimonies"]
    },
    {
      title: "Facebook Live",
      description: "Join our Facebook community for live services, prayer requests, and interactive ministry discussions.",
      platform: "Facebook",
      icon: "fab fa-facebook",
      color: "blue",
      url: "https://facebook.com/sfgmboston",
      features: ["Live Streaming", "Community Prayer", "Event Updates", "Ministry Photos"]
    },
    {
      title: "Instagram Stories",
      description: "Follow our daily ministry moments, scripture quotes, and behind-the-scenes content.",
      platform: "Instagram",
      icon: "fab fa-instagram",
      color: "purple",
      url: "https://instagram.com/sfgmboston",
      features: ["Daily Scripture", "Ministry Moments", "Prayer Requests", "Event Highlights"]
    },
    {
      title: "Zoom Meetings",
      description: "Interactive Bible study sessions, small group meetings, and personal prayer conferences.",
      platform: "Zoom",
      icon: "fas fa-video",
      color: "blue",
      url: "https://zoom.us/j/sfgmboston",
      features: ["Saturday Bible Study", "Small Groups", "Prayer Conferences", "Counseling Sessions"]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return {
          bg: 'bg-gradient-to-br from-red-50 to-rose-50',
          border: 'border-red-200',
          iconBg: 'bg-gradient-to-r from-red-600 to-rose-600',
          textColor: 'text-red-600',
          buttonColor: 'bg-red-600 hover:bg-red-700'
        };
      case 'blue':
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
          border: 'border-blue-200',
          iconBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
          textColor: 'text-blue-600',
          buttonColor: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'purple':
        return {
          bg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
          border: 'border-purple-200',
          iconBg: 'bg-gradient-to-r from-purple-600 to-indigo-600',
          textColor: 'text-purple-600',
          buttonColor: 'bg-purple-600 hover:bg-purple-700'
        };
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          iconBg: 'bg-slate-500',
          textColor: 'text-slate-600',
          buttonColor: 'bg-slate-600 hover:bg-slate-700'
        };
    }
  };

  const handlePlatformClick = (url: string, platform: string) => {
    // Open external link in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center mb-8">
              <img 
                src={sfgmLogo} 
                alt="SFGM Boston Logo" 
                className="w-24 h-24 md:w-32 md:h-32 mb-6 object-contain"
              />
              <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 drop-shadow-2xl">
                <i className="fas fa-globe mr-4"></i>
                Online Services
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto">
                Connect with SFGM Boston Ministry from Anywhere
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="text-lg leading-relaxed text-center italic">
                "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching."
                <span className="block text-amber-300 font-semibold mt-2">— Hebrews 10:24-25 NIV</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Online Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">
              Stay Connected Digitally
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
              Whether you're traveling, homebound, or joining us from afar, experience SFGM's ministry through our digital platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {onlineServices.map((service, index) => {
              const colors = getColorClasses(service.color);
              return (
                <Card 
                  key={index} 
                  className={`${colors.bg} ${colors.border} border-2 shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start mb-6">
                      <div className={`w-16 h-16 ${colors.iconBg} rounded-xl flex items-center justify-center mr-6 flex-shrink-0`}>
                        <i className={`${service.icon} text-white text-2xl`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <i className="fas fa-circle text-green-500 mr-1 text-xs"></i>
                            Live
                          </Badge>
                        </div>
                        <p className={`${colors.textColor} font-medium text-sm uppercase tracking-wide mb-4`}>
                          {service.platform}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-slate-700 text-lg leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-800 mb-3">Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-slate-600">
                            <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handlePlatformClick(service.url, service.platform)}
                      className={`w-full ${colors.buttonColor} text-white font-semibold py-3 text-lg`}
                    >
                      <i className={`${service.icon} mr-3`}></i>
                      Join on {service.platform}
                      <i className="fas fa-external-link-alt ml-2 text-sm"></i>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Service Schedule */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center text-slate-900 mb-8">
              Online Service Schedule
            </h3>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 max-w-4xl mx-auto text-white">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-4">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    Weekly Schedule
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Sunday Worship</span>
                      <Badge variant="secondary" className="bg-white/20 text-white">7:00 PM</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Thursday Bible Study</span>
                      <Badge variant="secondary" className="bg-white/20 text-white">8:00 PM</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Saturday Zoom Meeting</span>
                      <Badge variant="secondary" className="bg-white/20 text-white">Contact for times</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-4">
                    <i className="fas fa-info-circle mr-2"></i>
                    How to Join
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>• Follow our social media accounts for live notifications</p>
                    <p>• Zoom meeting IDs sent via email to members</p>
                    <p>• YouTube premieres scheduled 15 minutes early</p>
                    <p>• Facebook Live starts automatically at service time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center mt-16">
            <div className="bg-slate-50 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Need Technical Help?</h3>
              <p className="text-lg text-slate-600 mb-6">
                Having trouble accessing our online services? Our ministry team is here to help you stay connected.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = 'tel:617-512-7451'}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  <i className="fas fa-phone mr-2"></i>
                  Call Pastor Rocky
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = 'mailto:pastorrocky1978@gmail.com'}
                  className="text-purple-600 border-purple-600 hover:bg-purple-50"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  Email Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}