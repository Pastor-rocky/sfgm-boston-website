import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import shieldImage from "@/assets/certificate-group-small.png";
import blueLogo from "@/assets/sfgm-logo-new-blue.png";

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  const servicesList = [
    {
      title: "Sunday Worship",
      time: "Every Sunday at 7:00 PM",
      icon: "fas fa-church",
      color: "text-blue-600"
    },
    {
      title: "Monday Choir Practice", 
      time: "Mondays - Contact for Times",
      icon: "fas fa-music",
      color: "text-amber-600"
    },
    // Removed Tuesday Family Night and Wednesday Evangelism Night
    {
      title: "Wednesday Midweek Service",
      time: "Wednesdays at 8:00 PM",
      icon: "fas fa-book-open", 
      color: "text-purple-600"
    },

    {
      title: "Saturday Women's Bible Study",
      time: "Saturdays - Contact for Schedule",
      icon: "fas fa-female",
      color: "text-pink-600"
    }
  ];

  return (
    <section className="relative hero-bg text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/60"></div>
      
      {/* Shield Background - Centered */}
      <div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-15"
        style={{
          backgroundImage: `url(${shieldImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '700px',
          height: '700px',
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white" style={{textShadow: '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black, 0px 0px 3px rgba(0, 0, 0, 0.8)'}}>
                Welcome to the <span className="text-red-900 font-extrabold" style={{filter: 'brightness(1.2) contrast(1.1)'}}>House Of Restoration Ministries</span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white mb-8 leading-relaxed font-bold" style={{textShadow: '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black, 0px 0px 3px rgba(0, 0, 0, 0.8)'}}>
                <span className="text-green-500 text-xl sm:text-2xl lg:text-3xl xl:text-4xl">GROW</span>ing ourselves to <span className="text-green-500 text-xl sm:text-2xl lg:text-3xl xl:text-4xl">GROW</span> each other to <span className="text-green-500 text-xl sm:text-2xl lg:text-3xl xl:text-4xl">GROW</span> the KINGDOM!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 lg:gap-6">
              <Button 
                onClick={() => window.location.href = '/bible-school'}
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-4 hover:bg-white/20 transition-all font-semibold text-lg"
              >
                <i className="fas fa-book mr-3"></i>Bible Courses
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/mini-courses'}
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-4 hover:bg-white/20 transition-all font-semibold text-lg"
              >
                <i className="fas fa-seedling mr-3"></i>Weekly Courses
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/daily-sharpening'}
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-4 hover:bg-white/20 transition-all font-semibold text-lg"
              >
                <i className="fas fa-sun mr-3"></i>Daily Sharpening
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/cross-carriers-blog'}
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-4 hover:bg-white/20 transition-all font-semibold text-lg"
              >
                <i className="fas fa-blog mr-3"></i>Cross Carriers Blog
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-4 hover:bg-white/20 transition-all font-semibold text-lg"
                  >
                    <i className="fas fa-calendar-alt mr-3"></i>Attend a Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg w-full mx-auto max-h-[90vh] overflow-y-auto sm:mx-4 bg-white shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-center mb-4 text-gray-900">
                      Service Times
                    </DialogTitle>
                    <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
                      <button
                        className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        data-dialog-close
                      >
                        <i className="fas fa-times h-4 w-4 text-gray-500 hover:text-gray-700"></i>
                        <span className="sr-only">Close</span>
                      </button>
                    </div>
                  </DialogHeader>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {servicesList.map((service, index) => (
                      <div key={index} className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg hover:from-slate-100 hover:to-slate-200 transition-all touch-manipulation shadow-sm">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0`}>
                          <i className={`${service.icon} text-white text-lg sm:text-xl`}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base">{service.title}</h3>
                          <p className={`text-xs sm:text-sm ${service.color} font-medium`}>{service.time}</p>
                          {service.title === "Sunday Worship" && (
                            <div className="mt-2">
                              <Link to="/sunday-messages">
                                <Button size="sm" variant="outline" className="text-xs h-8">
                                  <i className="fas fa-video mr-1"></i>
                                  View Previous Messages
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* Removed phone contact block per request */}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

          </div>

          {/* Blue SFGM Logo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src={blueLogo} 
                alt="SFGM Boston Ministry Logo" 
                className="w-[28rem] h-[28rem] object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
