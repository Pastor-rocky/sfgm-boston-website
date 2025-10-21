import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Play, Eye, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";

export default function PastServices() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      const videoId = url.includes('youtu.be/') 
        ? url.split('youtu.be/')[1].split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };
  // Watchmen Series sermon collection - YouTube links to be added
  const watchmenSeries = [
    {
      id: "w1",
      title: "The Watchmen Series - Episode 1: Sound the Alarm",
      date: "Sunday, July 6, 2025",
      time: "8:00 PM",
      preacher: "Pastor Rocky",
      series: "The Watchmen Series",
      description: "Sound the alarm! Understanding the biblical calling of watchmen in these last days and the urgency of our spiritual watch.",
      videoUrl: "https://m.youtube.com/watch?v=VpO9OuCTakU&t=10s",
      duration: "45 minutes",
      views: 456,
      categories: ["Prophecy", "End Times", "Vigilance"],
      isWatchmen: true
    },
    {
      id: "w2", 
      title: "The Watchmen Series - Episode 2: The Response",
      date: "Sunday, July 13, 2025",
      time: "8:00 PM",
      preacher: "Pastor Rocky",
      series: "The Watchmen Series", 
      description: "The Response - How the church must respond to the alarm. Preparing God's people for what lies ahead through biblical prophecy.",
      videoUrl: "https://m.youtube.com/watch?v=iddYmHu1uF8&t=15s",
      duration: "42 minutes",
      views: 523,
      categories: ["Prophecy", "Current Events", "Discernment"],
      isWatchmen: true
    },
    {
      id: "w3",
      title: "The Watchmen Series - Episode 3: Clear a Path",
      date: "Sunday, July 20, 2025",
      time: "8:00 PM",
      preacher: "Pastor Rocky",
      series: "The Watchmen Series",
      description: "Clear a Path - Removing obstacles and preparing the way for the Lord's return. Making straight paths in the wilderness.",
      videoUrl: "https://m.youtube.com/watch?v=cDs6LwaAr1g&t=6s&pp=0gcJCccJAYcqIYzv",
      duration: "48 minutes",
      views: 389,
      categories: ["Preparation", "Church", "Return of Christ"],
      isWatchmen: true
    },
    {
      id: "w4",
      title: "The Watchmen Series - Episode 4",
      date: "Sunday, July 27, 2025",
      time: "8:00 PM",
      preacher: "Pastor Rocky",
      series: "The Watchmen Series",
      description: "The urgency of the final hour and end-times preparation.",
      videoUrl: "", // YouTube link to be added
      duration: "50 minutes",
      views: 612,
      categories: ["End Times", "Urgency", "Final Hour"],
      isWatchmen: true
    }
  ];

  const pastServices = [
    {
      id: 1,
      title: "The Power of Prayer in Times of Trial",
      date: "Sunday, June 23, 2025",
      time: "11:00 AM",
      preacher: "Pastor Rocky",
      series: "Faith Under Fire",
      description: "A powerful message about finding strength through prayer during life's most challenging moments. Pastor Rocky shares biblical principles for maintaining faith when circumstances seem overwhelming.",
      thumbnailUrl: "/api/placeholder/400/225",
      videoUrl: "#", // Placeholder for actual video URL
      duration: "45 minutes",
      views: 247,
      categories: ["Prayer", "Faith", "Trials"]
    },
    {
      id: 2,
      title: "Walking in Divine Purpose",
      date: "Sunday, July 14, 2025", 
      time: "11:00 AM",
      preacher: "Pastor Rocky",
      series: "Destiny & Purpose",
      description: "Discovering God's unique calling for your life and having the courage to walk in it. This message explores how to discern divine direction and step boldly into your God-given purpose.",
      thumbnailUrl: "/api/placeholder/400/225",
      videoUrl: "#", // Placeholder for actual video URL
      duration: "52 minutes",
      views: 312,
      categories: ["Purpose", "Calling", "Direction"]
    },
    {
      id: 3,
      title: "The Heart of Worship",
      date: "Sunday, July 7, 2025",
      time: "11:00 AM", 
      preacher: "Pastor Rocky",
      series: "True Worship",
      description: "Understanding what it means to worship God in spirit and truth. A deep dive into the biblical foundation of authentic worship that transforms hearts and lives.",
      thumbnailUrl: "/api/placeholder/400/225",
      videoUrl: "#", // Placeholder for actual video URL
      duration: "41 minutes",
      views: 189,
      categories: ["Worship", "Spirit", "Truth"]
    },
    {
      id: 4,
      title: "Building Strong Foundations",
      date: "Sunday, June 30, 2025",
      time: "11:00 AM",
      preacher: "Pastor Rocky",
      series: "Solid Ground",
      description: "The importance of building your spiritual life on the solid foundation of God's Word. Learn how to establish unshakeable faith that can withstand any storm.",
      thumbnailUrl: "/api/placeholder/400/225",
      videoUrl: "#", // Placeholder for actual video URL
      duration: "48 minutes",
      views: 278,
      categories: ["Foundation", "Faith", "Word"]
    },
    {
      id: 5,
      title: "Love in Action",
      date: "Sunday, June 23, 2025",
      time: "11:00 AM",
      preacher: "Pastor Rocky", 
      series: "Living Love",
      description: "Moving beyond words to demonstrate Christ's love through practical action. This message challenges believers to be the hands and feet of Jesus in their communities.",
      thumbnailUrl: "/api/placeholder/400/225",
      videoUrl: "#", // Placeholder for actual video URL
      duration: "44 minutes",
      views: 203,
      categories: ["Love", "Action", "Service"]
    },
    {
      id: 6,
      title: "The Grace That Transforms",
      date: "Sunday, June 16, 2025",
      time: "11:00 AM",
      preacher: "Pastor Rocky",
      series: "Amazing Grace",
      description: "Exploring the life-changing power of God's grace and how it transforms us from the inside out. A beautiful reminder of God's unconditional love and mercy.",
      thumbnailUrl: "/api/placeholder/400/225", 
      videoUrl: "#", // Placeholder for actual video URL
      duration: "39 minutes",
      views: 195,
      categories: ["Grace", "Transformation", "Mercy"]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Prayer': 'bg-blue-500',
      'Faith': 'bg-green-500',
      'Trials': 'bg-red-500',
      'Purpose': 'bg-purple-500',
      'Calling': 'bg-indigo-500',
      'Direction': 'bg-yellow-500',
      'Worship': 'bg-pink-500',
      'Spirit': 'bg-teal-500',
      'Truth': 'bg-orange-500',
      'Foundation': 'bg-gray-500',
      'Word': 'bg-blue-600',
      'Love': 'bg-red-400',
      'Action': 'bg-green-600',
      'Service': 'bg-amber-500',
      'Grace': 'bg-purple-600',
      'Transformation': 'bg-indigo-600',
      'Mercy': 'bg-pink-600'
    };
    return colors[category] || 'bg-slate-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <i className="fas fa-church mr-4 text-amber-400"></i>
            Previous Sunday Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Catch up on recent Sunday worship services and powerful messages from Pastor Rocky. 
            Each service is filled with biblical truth, inspiration, and practical life application.
          </p>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                <i className="fas fa-info-circle mr-2 text-blue-400"></i>
                Service Information
              </h3>
              <p className="text-gray-300 mb-4">
                Join us live every Sunday at 11:00 AM for worship, fellowship, and powerful biblical teaching.
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

        {/* Watchmen Series */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            <i className="fas fa-eye mr-3 text-amber-400"></i>
            The Watchmen Series
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {watchmenSeries.map((service) => (
              <Card key={service.id} className="bg-amber-900/20 backdrop-blur-sm border-amber-400/30 hover:bg-amber-900/30 transition-all duration-300 overflow-hidden">
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-slate-800 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Play className="h-8 w-8 text-amber-400 ml-1" />
                    </div>
                    <p className="text-amber-200 text-sm font-medium">{service.duration}</p>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-white text-sm leading-tight">
                      {service.title}
                    </CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {service.categories.map((category) => (
                      <Badge 
                        key={category}
                        className="bg-amber-600 text-white border-0 text-xs"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-amber-400 font-medium text-xs">
                    {service.series}
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 pt-0">
                  <div className="flex items-center text-gray-300 text-xs">
                    <Calendar className="h-3 w-3 mr-1 text-blue-400" />
                    <span>{service.date}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300 text-xs">
                    <Clock className="h-3 w-3 mr-1 text-green-400" />
                    <span>{service.time}</span>
                  </div>

                  <p className="text-gray-400 text-xs line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-gray-400 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{service.views} views</span>
                    </div>
                    
                    {service.videoUrl ? (
                      <button
                        onClick={() => setSelectedVideo(service)}
                        className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                      >
                        <Play className="h-3 w-3 inline mr-1" />
                        Watch
                      </button>
                    ) : (
                      <span className="text-gray-500 text-xs">
                        Link Coming Soon
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Regular Past Services */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            <i className="fas fa-church mr-3 text-blue-400"></i>
            Recent Sunday Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastServices.map((service) => (
            <Card key={service.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-slate-800 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <p className="text-white text-sm font-medium">{service.duration}</p>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-white text-lg leading-tight">
                    {service.title}
                  </CardTitle>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {service.categories.map((category) => (
                    <Badge 
                      key={category}
                      className={`${getCategoryColor(category)} text-white border-0 text-xs`}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
                <div className="text-amber-400 font-medium text-sm">
                  {service.series}
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <div className="flex items-center text-gray-300 text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                  <span>{service.date}</span>
                </div>
                
                <div className="flex items-center text-gray-300 text-sm">
                  <Clock className="h-4 w-4 mr-2 text-green-400" />
                  <span>{service.time}</span>
                </div>

                <div className="flex items-center text-gray-300 text-sm">
                  <i className="fas fa-user h-4 w-4 mr-2 text-purple-400"></i>
                  <span>{service.preacher}</span>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-gray-400 text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    <span>{service.views} views</span>
                  </div>
                  
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                    <Play className="h-4 w-4 mr-1" />
                    Watch Service
                  </button>
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
                Join Us This Sunday
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Experience worship, fellowship, and powerful biblical teaching in person. 
                You're welcome at SFGM Boston regardless of where you are in your faith journey.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <a 
                  href="/contact"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Get Directions
                </a>
                <a 
                  href="/bible-school"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <i className="fas fa-graduation-cap mr-2"></i>
                  Join Bible School
                </a>
                <a 
                  href="/events"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <i className="fas fa-calendar mr-2"></i>
                  View All Events  
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* YouTube Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="w-[95vw] max-w-5xl max-h-[95vh] p-0 overflow-hidden bg-black">
          <VisuallyHidden>
            <DialogTitle>
              {selectedVideo?.title}
            </DialogTitle>
          </VisuallyHidden>
          <VisuallyHidden>
            <DialogDescription>
              Watch {selectedVideo?.title} from The Watchmen Series
            </DialogDescription>
          </VisuallyHidden>
          
          {selectedVideo && (
            <div className="relative">
              {/* YouTube Video Player */}
              <div className="aspect-video w-full">
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={selectedVideo.title}
                />
              </div>
              
              {/* Video Information Panel */}
              <div className="p-6 bg-slate-900 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{selectedVideo.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
                      <Badge className="bg-amber-600 text-white border-0">
                        {selectedVideo.series}
                      </Badge>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {selectedVideo.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {selectedVideo.time}
                      </span>
                      <span>{selectedVideo.duration}</span>
                    </div>
                    <p className="text-gray-300 mb-4">{selectedVideo.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedVideo.categories?.map((category: string) => (
                        <Badge key={category} className="bg-gray-700 text-gray-200 border-0">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="ml-4 p-2 hover:bg-slate-800 rounded-full transition-colors"
                    aria-label="Close video"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white py-3 px-4 rounded font-medium transition-colors"
                >
                  Close Video
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}