import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sfgmLogo from "@/assets/sfgm-logo-new-blue.png";

export default function Music() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const musicCategories = [
    {
      title: "Worship & Praise",
      description: "Songs of adoration and reverence to our Lord",
      icon: "fas fa-hands-praying",
      color: "from-purple-600 to-blue-600"
    },
    {
      title: "Gospel Classics",
      description: "Timeless hymns and traditional gospel music",
      icon: "fas fa-music",
      color: "from-blue-600 to-indigo-600"
    },
    {
      title: "Contemporary Christian",
      description: "Modern worship songs for today's generation",
      icon: "fas fa-guitar",
      color: "from-indigo-600 to-purple-600"
    },
    {
      title: "Spiritual Reflection",
      description: "Songs for meditation and quiet worship",
      icon: "fas fa-dove",
      color: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center mb-8">
              <img 
                src={sfgmLogo} 
                alt="SFGM Boston Logo" 
                className="w-32 h-32 md:w-40 md:h-40 mb-6 object-contain opacity-90"
              />
              <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 drop-shadow-2xl">
                <i className="fas fa-music text-amber-300 mr-4"></i>
                Worship & Music
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto mb-8">
                "Praise the Lord with the harp; make music to him on the ten-stringed lyre." - Psalm 33:2
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <h2 className="text-3xl font-bold mb-4 text-amber-300">
                Welcome to Our Music Ministry
              </h2>
              <p className="text-lg leading-relaxed text-center mb-6">
                Music is a powerful expression of our faith and worship. Through song, we lift our voices in 
                praise, find comfort in difficult times, and connect with God's presence. Join us as we celebrate 
                the Lord through music that touches the heart and elevates the spirit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.open('https://soundcloud.com/discover/sets/your-moods:1548844545:1', '_blank')}
                >
                  <i className="fas fa-headphones mr-2"></i>
                  Listen to Music 🎶
                </Button>
                <p className="text-blue-200 text-sm">
                  Experience our curated collection of worship music
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Worship Images Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            <i className="fas fa-praying-hands text-purple-600 mr-3"></i>
            Hearts Lifted in Worship
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            "Let everything that has breath praise the Lord!" - Psalm 150:6
          </p>
        </div>

        {/* Worship Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Worship Image Cards */}
          <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <div className="text-center text-white">
                <i className="fas fa-hands-praying text-6xl mb-4 opacity-80"></i>
                <h3 className="text-xl font-bold">Hands Raised in Praise</h3>
                <p className="text-sm opacity-90 mt-2">Lifting holy hands to the Lord</p>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <div className="text-center text-white">
                <i className="fas fa-users text-6xl mb-4 opacity-80"></i>
                <h3 className="text-xl font-bold">Congregation Worship</h3>
                <p className="text-sm opacity-90 mt-2">United in song and praise</p>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <div className="text-center text-white">
                <i className="fas fa-music text-6xl mb-4 opacity-80"></i>
                <h3 className="text-xl font-bold">Joyful Celebration</h3>
                <p className="text-sm opacity-90 mt-2">Making a joyful noise unto the Lord</p>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64 bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center">
              <div className="text-center text-white">
                <i className="fas fa-dove text-6xl mb-4 opacity-80"></i>
                <h3 className="text-xl font-bold">Spirit-Led Worship</h3>
                <p className="text-sm opacity-90 mt-2">Moving in the presence of God</p>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64 bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
              <div className="text-center text-white">
                <i className="fas fa-heart text-6xl mb-4 opacity-80"></i>
                <h3 className="text-xl font-bold">Hearts of Worship</h3>
                <p className="text-sm opacity-90 mt-2">Worship from the heart</p>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <div className="text-center text-white">
                <i className="fas fa-cross text-6xl mb-4 opacity-80"></i>
                <h3 className="text-xl font-bold">Worship at the Cross</h3>
                <p className="text-sm opacity-90 mt-2">Centered on Christ's sacrifice</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Music Categories */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            <i className="fas fa-list-music text-purple-600 mr-3"></i>
            Our Music Collection
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {musicCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <i className={`${category.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 text-white shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <i className="fas fa-music text-6xl text-amber-300 mb-4"></i>
              <h2 className="text-4xl font-bold mb-4">Join Our Music Ministry</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Whether you're a singer, musician, or just love to worship through music, 
                we invite you to be part of our music ministry. Together, we can create 
                beautiful sounds of praise that honor God and bless His people.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open('https://soundcloud.com/discover/sets/your-moods:1548844545:1', '_blank')}
              >
                <i className="fas fa-headphones mr-2"></i>
                Explore Our Music Library 🎶
              </Button>
              <div className="text-center">
                <p className="text-blue-200 text-lg font-medium">
                  "Sing to the Lord a new song; sing to the Lord, all the earth."
                </p>
                <p className="text-blue-300 text-sm">
                  - Psalm 96:1
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}