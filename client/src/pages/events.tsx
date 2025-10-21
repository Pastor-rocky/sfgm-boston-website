import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "Every Sunday",
      time: "7:00 PM",
      location: "SFGM Boston Sanctuary",
      description: "Join us for inspiring worship, powerful preaching, and fellowship with the body of Christ.",
      type: "Weekly Service",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Monday Choir Practice",
      date: "Every Monday",
      time: "7:00 PM - 8:30 PM",
      location: "SFGM Boston Music Room",
      description: "Develop your musical gifts and prepare for Sunday worship with our choir ministry.",
      type: "Ministry Practice",
      color: "bg-amber-500"
    },
    
    {
      id: 4,
      title: "Wednesday Midweek Service",
      date: "Every Wednesday",
      time: "8:00 PM",
      location: "SFGM Boston Main Sanctuary",
      description: "Journey through the Word together and be strengthened midweek with worship, teaching, and prayer.",
      type: "Midweek Service",
      color: "bg-purple-500"
    },
    {
      id: 5,
      title: "Youth Ministry Meeting",
      date: "Coming Soon",
      time: "TBA",
      location: "SFGM Boston Youth Center",
      description: "Dynamic ministry focused on developing young people's relationship with Christ.",
      type: "Coming Soon",
      color: "bg-red-500"
    },
    {
      id: 6,
      title: "Men's Fellowship Breakfast",
      date: "Coming Soon",
      time: "TBA",
      location: "SFGM Boston Fellowship Hall",
      description: "Men's ministry focusing on brotherhood, accountability, and spiritual growth.",
      type: "Coming Soon",
      color: "bg-indigo-500"
    },
    // Removed Women's Day and other special cards per site updates
    {
      id: 8,
      title: "Women's Bible Study",
      date: "Sundays",
      time: "Contact for Schedule",
      location: "SFGM Boston",
      description: "A dedicated time in the Word for women to study, pray, and encourage one another.",
      type: "Coming Soon",
      color: "bg-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <i className="fas fa-calendar-check mr-4 text-pink-400"></i>
            Upcoming Events
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join us for worship, fellowship, and spiritual growth at SFGM Boston. 
            All are welcome to participate in our ministry activities and services.
          </p>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                <i className="fas fa-info-circle mr-2 text-blue-400"></i>
                Event Information & Registration
              </h3>
              <p className="text-gray-300 mb-4">
                For more details about any event or to register for special activities, please contact us:
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <a 
                  href="tel:617-512-7451"
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  <i className="fas fa-phone mr-2"></i>
                  617-512-7451
                </a>
                <a 
                  href="mailto:pastor_rocky@sfgmboston.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  pastor_rocky@sfgmboston.com
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-white text-lg">
                    {event.title}
                  </CardTitle>
                  <Badge className={`${event.color} text-white border-0`}>
                    {event.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                  <span className="text-sm">{event.date}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Clock className="h-4 w-4 mr-2 text-green-400" />
                  <span className="text-sm">{event.time}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-2 text-red-400" />
                  <span className="text-sm">{event.location}</span>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {event.description}
                </p>
                
                <div className="pt-2">
                  <a 
                    href="/contact"
                    className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
                  >
                    <Users className="h-4 w-4 inline mr-1" />
                    Get More Info
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-white text-2xl font-bold mb-4">
                <i className="fas fa-heart mr-2 text-red-400"></i>
                Come As You Are
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Whether you're new to faith or have been walking with Christ for years, 
                you're welcome at SFGM Boston. Join our community of believers as we grow together in God's love.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <a 
                  href="/contact"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Visit Us This Sunday
                </a>
                <a 
                  href="/bible-school"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <i className="fas fa-graduation-cap mr-2"></i>
                  Join Bible School
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}