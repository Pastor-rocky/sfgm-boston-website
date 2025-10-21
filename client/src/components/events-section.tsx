import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, Link } from "wouter";
import { SpecialEvent } from "@/types/event";

export default function EventsSection() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to check if an event date has passed
  const isEventPast = (eventDateString: string) => {
    const now = new Date();
    now.setHours(23, 59, 59, 999); // Set to end of today for comparison
    
    // Handle ongoing events
    if (eventDateString.toLowerCase().includes('every')) {
      return false; // Ongoing events never expire
    }
    
    // Handle specific date formats
    try {
      let eventDate;
      
      if (eventDateString.includes('&')) {
        // Multi-day events like "August 11th & 12th" - use the end date
        const endDatePart = eventDateString.split('&')[1].trim();
        const monthPart = eventDateString.split(' ')[0]; // Get "August" from beginning
        eventDate = new Date(`${monthPart} ${endDatePart}, 2025`);
      } else if (eventDateString.includes(',')) {
        // Dates like "Saturday, July 12" or "August 1st, 2025"
        eventDate = new Date(eventDateString);
      } else {
        // Dates like "August 4th" - assume current year
        eventDate = new Date(`${eventDateString}, 2025`);
      }
      
      return eventDate < now;
    } catch (error) {
      console.error('Error parsing date:', eventDateString, error);
      return false; // If we can't parse it, don't hide it
    }
  };

  const getNextEventTime = (eventType: string) => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    let nextEvent = new Date(now);

    switch (eventType) {
      case 'sunday': // Sunday Worship at 7:00 PM
        if (currentDay === 0 && (currentHour < 19 || (currentHour === 19 && currentMinute === 0))) {
          // Today is Sunday and it's before 7:00 PM
          nextEvent.setHours(19, 0, 0, 0);
        } else {
          // Next Sunday
          const daysUntilSunday = currentDay === 0 ? 7 : 7 - currentDay;
          nextEvent.setDate(now.getDate() + daysUntilSunday);
          nextEvent.setHours(19, 0, 0, 0);
        }
        break;
      case 'monday': // Monday Choir Practice
        if (currentDay === 1 && currentHour < 19) {
          // Today is Monday and it's before evening
          nextEvent.setHours(19, 0, 0, 0);
        } else {
          // Next Monday
          const daysUntilMonday = currentDay <= 1 ? 1 - currentDay : 8 - currentDay;
          nextEvent.setDate(now.getDate() + daysUntilMonday);
          nextEvent.setHours(19, 0, 0, 0);
        }
        break;
      case 'wednesday': // Wednesday Midweek Service at 8:00 PM
        if (currentDay === 3 && currentHour < 20) {
          nextEvent.setHours(20, 0, 0, 0);
        } else {
          // Next Wednesday
          const daysUntilWednesday = currentDay < 3 ? 3 - currentDay : 10 - currentDay;
          nextEvent.setDate(now.getDate() + daysUntilWednesday);
          nextEvent.setHours(20, 0, 0, 0);
        }
        break;
      case 'thursday': // Thursday Bible Study at 8:30 PM
        if (currentDay === 4 && (currentHour < 20 || (currentHour === 20 && currentMinute < 30))) {
          // Today is Thursday and it's before 8:30 PM
          nextEvent.setHours(20, 30, 0, 0);
        } else {
          // Next Thursday
          const daysUntilThursday = currentDay < 4 ? 4 - currentDay : 11 - currentDay;
          nextEvent.setDate(now.getDate() + daysUntilThursday);
          nextEvent.setHours(20, 30, 0, 0);
        }
        break;
      case 'saturday': // Saturday Homeless Ministry at 10:00 AM
        if (currentDay === 6 && currentHour < 10) {
          // Today is Saturday and it's before 10:00 AM
          nextEvent.setHours(10, 0, 0, 0);
        } else {
          // Next Saturday
          const daysUntilSaturday = currentDay < 6 ? 6 - currentDay : 7;
          nextEvent.setDate(now.getDate() + daysUntilSaturday);
          nextEvent.setHours(10, 0, 0, 0);
        }
        break;
      default:
        return null;
    }

    return nextEvent;
  };

  const getCountdown = (eventType: string) => {
    const nextEvent = getNextEventTime(eventType);
    if (!nextEvent) return "Contact for schedule";

    const timeDiff = nextEvent.getTime() - currentTime.getTime();
    if (timeDiff <= 0) return "Happening now!";

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const getSpecialEventCountdown = (eventId: number) => {
    const now = new Date();
    let eventDate = new Date();

    switch (eventId) {

      case 5: // SFGM Blog Launch - August 1, 2025
        eventDate = new Date(2025, 7, 1, 0, 0, 0);
        break;
      case 7: // The Wedding Conference - August 27, 2025
        eventDate = new Date(2025, 7, 27, 9, 0, 0);
        break;
      default:
        return "Coming soon";
    }

    const timeDiff = eventDate.getTime() - now.getTime();
    if (timeDiff <= 0) return "Event passed";

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else {
      return `${hours}h`;
    }
  };

  const regularEvents = [
    {
      id: 1,
      title: "Sunday Worship",
      time: "Every Sunday",
      schedule: "7:00 PM",
      description: "Live worship service with inspiring messages and community fellowship.",
      icon: "fas fa-church",
      color: "primary",
      action: "Join Live or Watch Past Services",
      countdownType: "sunday"
    },
    {
      id: 2,
      title: "Monday Choir Practice",
      time: "Mondays",
      schedule: "Contact for Times",
      description: "Join our ministry choir for weekly practice sessions. Contact us for more information about rehearsal times and participation.",
      icon: "fas fa-music",
      color: "choir",
      action: "Contact for Information",
      countdownType: "monday"
    },
    {
      id: 4,
      title: "Wednesday Midweek Service",
      time: "Wednesdays",
      schedule: "8:00 PM",
      description: "Journey through Genesis to Revelation with our comprehensive Bible study. Every week will be doing a weekly quiz.",
      icon: "fas fa-book-open",
      color: "accent",
      countdownType: "wednesday"
    },

    {
      id: 7,
      title: "Saturday Women's Bible Study",
      time: "Saturdays",
      schedule: "Contact for Schedule",
      description: "A dedicated space for women to grow in faith through biblical study, prayer, and fellowship. Contact us for meeting times and location.",
      icon: "fas fa-female",
      color: "women",
      action: "Contact for Information",
      countdownType: "saturday"
    }
  ];

  const specialEvents: SpecialEvent[] = [];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-gradient-to-br from-primary/5 to-primary/10',
          border: 'border-primary/20',
          iconBg: 'bg-primary',
          textColor: 'text-primary'
        };
      case 'secondary':
        return {
          bg: 'bg-gradient-to-br from-secondary/5 to-secondary/10',
          border: 'border-secondary/20',
          iconBg: 'bg-secondary',
          textColor: 'text-secondary'
        };
      case 'accent':
        return {
          bg: 'bg-gradient-to-br from-accent/5 to-accent/10',
          border: 'border-accent/20',
          iconBg: 'bg-accent',
          textColor: 'text-accent'
        };
      case 'success':
        return {
          bg: 'bg-gradient-to-br from-red-50 to-blue-50',
          border: 'border-red-200',
          iconBg: 'bg-gradient-to-r from-red-600 to-blue-700',
          textColor: 'text-red-600'
        };
      case 'blog':
        return {
          bg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
          border: 'border-purple-200',
          iconBg: 'bg-gradient-to-r from-purple-600 to-indigo-600',
          textColor: 'text-purple-600'
        };
      case 'choir':
        return {
          bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
          border: 'border-amber-200',
          iconBg: 'bg-gradient-to-r from-amber-600 to-yellow-600',
          textColor: 'text-amber-600'
        };
      case 'evangelism':
        return {
          bg: 'bg-gradient-to-br from-teal-50 to-cyan-50',
          border: 'border-teal-200',
          iconBg: 'bg-gradient-to-r from-teal-600 to-cyan-600',
          textColor: 'text-teal-600'
        };
      case 'ministry':
        return {
          bg: 'bg-gradient-to-br from-yellow-100 to-amber-100',
          border: 'border-yellow-700',
          iconBg: 'bg-gradient-to-r from-yellow-800 to-amber-800',
          textColor: 'text-yellow-900'
        };
      case 'wedding':
        return {
          bg: 'bg-gradient-to-br from-white to-green-50',
          border: 'border-green-200',
          iconBg: 'bg-gradient-to-r from-green-600 to-green-700',
          textColor: 'text-green-700'
        };
      case 'women':
        return {
          bg: 'bg-gradient-to-br from-pink-50 to-rose-50',
          border: 'border-pink-200',
          iconBg: 'bg-gradient-to-r from-pink-600 to-rose-600',
          textColor: 'text-pink-600'
        };
      case 'revival':
        return {
          bg: 'bg-gradient-to-br from-orange-50 to-red-50',
          border: 'border-orange-200',
          iconBg: 'bg-gradient-to-r from-orange-600 to-red-600',
          textColor: 'text-orange-600'
        };
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          iconBg: 'bg-slate-500',
          textColor: 'text-slate-600'
        };
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Regular Events Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">📅 Worship Services</h3>
            <div className="relative group">
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fas fa-globe mr-2"></i>
                Online Services
                <i className="fas fa-chevron-down ml-2"></i>
              </button>
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-3 text-center">Watch & Connect Online</h4>
                  <div className="space-y-3">
                    <div className="flex items-center p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                        <i className="fab fa-youtube text-white text-xs"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-red-800 text-sm">YouTube Channel</p>
                        <p className="text-red-600 text-xs">Live worship & sermons</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <i className="fab fa-facebook text-white text-xs"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800 text-sm">Facebook Live</p>
                        <p className="text-blue-600 text-xs">Community & prayer</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                        <i className="fab fa-instagram text-white text-xs"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-800 text-sm">Instagram Stories</p>
                        <p className="text-purple-600 text-xs">Daily scripture & moments</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-video text-white text-xs"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-indigo-800 text-sm">Zoom Meetings</p>
                        <p className="text-indigo-600 text-xs">Interactive Bible study</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <a 
                      href="/online-services"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:from-green-700 hover:to-emerald-700 transition-all duration-300 block text-center"
                    >
                      <i className="fas fa-arrow-right mr-2"></i>
                      View All Platforms
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mb-8">
            <p className="text-lg text-slate-600 italic">
              "Let us not neglect our meeting together, as some people do, but encourage one another, especially now that the day of his return is drawing near." 
              <span className="text-blue-600 font-semibold ml-2">— Hebrews 10:25 NLT</span>
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {regularEvents.map((event) => {
              const colors = getColorClasses(event.color);
              return (
                <Card 
                  key={event.id} 
                  className="bg-white/10 backdrop-blur-sm card-hover"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center mr-4`}>
                        <i className={`${event.icon} text-white text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                        <p className={`${colors.textColor} font-medium`}>{event.time}</p>
                        {event.countdownType && (
                          <div className="mt-1">
                            <span className="text-sm font-semibold text-white">Next: </span>
                            <span className={`text-sm font-bold ${colors.textColor}`}>
                              {getCountdown(event.countdownType)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-white mb-4">{event.description}</p>
                    <div className="flex items-center justify-between">
                      {event.title === "Wednesday Midweek Service" ? (
                        <div className="flex flex-col space-y-2 w-full">
                          <span className={`${colors.textColor} font-semibold text-sm`}>Contact for More Info</span>
                        </div>
                      ) : event.title === "Sunday Worship" ? (
                        <div className="flex flex-col space-y-2 w-full">
                          <Link to="/past-services">
                            <button className="w-full inline-flex items-center justify-center px-3 py-1 text-sm font-semibold rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 mb-2">
                              <i className="fas fa-video mr-2"></i>
                              Watch Past Services
                            </button>
                          </Link>
                        </div>
                      ) : event.action && event.action !== "Contact for Information" ? (
                        <span className={`${colors.textColor} font-semibold`}>{event.action}</span>
                      ) : (
                        <span className={`${colors.textColor} font-semibold text-sm`}></span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">🎉 Upcoming Events</h3>
            <div className="relative group">
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl">
                <i className="fas fa-rocket mr-2"></i>
                Coming Soon
                <i className="fas fa-chevron-down ml-2"></i>
              </button>
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-3 text-center">Future Ministries</h4>
                  <div className="space-y-3">
                    <div className="flex items-center p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-cross text-white text-xs"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-emerald-800 text-sm">Ordination Service</p>
                        <p className="text-emerald-600 text-xs">Fall 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-heart text-white text-xs"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-red-800 text-sm">Couples Courses</p>
                        <p className="text-red-600 text-xs">Fall 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-child text-white text-xs"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800 text-sm">Children's Bible School</p>
                        <p className="text-blue-600 text-xs">2026</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <a 
                      href="/coming-soon"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 block text-center"
                    >
                      <i className="fas fa-arrow-right mr-2"></i>
                      All Upcoming Events
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mb-8">
            <p className="text-lg text-slate-600 italic">
              "For everything there is a season, and a time for every matter under heaven." 
              <span className="text-blue-600 font-semibold ml-2">— Ecclesiastes 3:1 ESV</span>
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {specialEvents.filter(event => !isEventPast(event.date)).map((event) => {
              const colors = getColorClasses(event.color);
              return (
                <Card 
                  key={event.id} 
                  className="bg-white/10 backdrop-blur-sm border-white/30 border-2 card-hover relative overflow-hidden"
                  style={event.backgroundImage ? {
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${event.backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  } : {}}
                >
                  <div className={`absolute top-0 right-0 ${colors.iconBg} text-white px-3 py-1 text-sm font-bold`}>
                    {event.highlight}
                  </div>
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center mb-4">
                      <div className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center mr-4`}>
                        <i className={`${event.icon} text-white text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white" style={{textShadow: '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black'}}>{event.title}</h3>
                        <p className={`${colors.textColor} font-medium text-lg`} style={{textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black'}}>{event.date}</p>
                        <p className="text-white" style={{textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black'}}>{event.time}</p>
                        <div className="mt-2">
                          <span className="text-sm font-semibold text-white" style={{textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black'}}>Countdown: </span>
                          <span className={`text-sm font-bold ${colors.textColor}`} style={{textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black'}}>
                            {getSpecialEventCountdown(event.id)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-white mb-6 text-lg" style={{textShadow: '1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black'}}>{event.description}</p>
                    <div className={`${event.id === 5 ? 'flex gap-3' : ''}`}>
                      <Link href={event.link}>
                        <Button className={`${event.id === 5 ? 'flex-1' : 'w-full'} ${colors.iconBg} hover:opacity-90 text-white`}>
                          <i className="fas fa-calendar-plus mr-2"></i>
                          Learn More
                        </Button>
                      </Link>
                      {event.id === 5 && (
                        <Link href="/sfgm-blog">
                          <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                            <i className="fas fa-blog mr-2"></i>
                            Visit SFGM Blog
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>




    </section>
  );
}
