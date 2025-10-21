import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import churchImage from "@/assets/church-image.jpg";

export default function AboutSection() {
  const coreValues = [
    { name: "Restoration", color: "bg-primary" },
    { name: "Faith", color: "bg-secondary" },
    { name: "Community", color: "bg-accent" },
    { name: "Growth", color: "bg-green-500" }
  ];

  return (
    <section id="about" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">About Our Ministry</h2>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              For over five years, The House Of Restoration Ministries has been dedicated to restoring lives through faith, community, and spiritual growth. Join us as we walk together on the path of renewal and transformation.
            </p>
            
            {/* Core Values */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {coreValues.map((value) => (
                <div key={value.name} className="flex items-center">
                  <div className={`w-3 h-3 ${value.color} rounded-full mr-3`}></div>
                  <span className="font-semibold text-slate-800">{value.name}</span>
                </div>
              ))}
            </div>

            {/* Scripture */}
            <Card className="border-l-4 border-primary shadow-sm">
              <CardContent className="p-6">
                <p className="text-slate-700 italic text-lg leading-relaxed">
                  "And he who was seated on the throne said, '<span className="text-red-600 font-bold text-xl">Behold, I am making all things new.</span>' Also he said, '<span className="text-red-600 font-bold text-xl">Write this down, for these words are trustworthy and true.</span>'" - <span className="font-bold text-lg">Revelation 21:5</span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            {/* Ministry location image */}
            <img 
              src={churchImage} 
              alt="SFGM Boston Church building" 
              className="rounded-2xl shadow-lg w-full h-80 mb-6 object-cover object-center" 
              style={{ 
                filter: 'contrast(1.1) brightness(1.05)',
                maxWidth: '100%',
                height: 'auto'
              }}
            />
            
            {/* Location and Pastor Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Visit Us Card */}
              <Card className="shadow-sm border-2 border-blue-500">
                <CardContent className="p-3">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    Visit Us
                  </h3>
                  <p className="text-slate-700 mb-3">
                    <strong>6 Bourbon St., Peabody, MA</strong>
                  </p>
                  <div className="flex flex-col gap-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center text-xs py-1"
                      onClick={() => window.open('https://sfgm.org/visit', '_blank')}
                    >
                      <i className="fas fa-church mr-1 text-xs"></i>SFGM Churches
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center text-xs py-1"
                      onClick={() => {
                        const address = "6 Bourbon St., Peabody, MA 01960";
                        const encodedAddress = encodeURIComponent(address);
                        
                        // Check if on mobile device
                        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                        
                        if (isMobile) {
                          // On mobile, open native maps app
                          window.open(`maps://?q=${encodedAddress}`, '_blank');
                        } else {
                          // On desktop, open Google Maps
                          window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
                        }
                      }}
                    >
                      <i className="fas fa-directions mr-1 text-xs"></i>Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pastor Rocky Card */}
              <Card className="shadow-sm border-2 border-blue-500">
                <CardContent className="p-3">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                    <i className="fas fa-user text-primary mr-2"></i>
                    Pastor Rocky
                  </h3>
                  <p className="text-slate-700 mb-3">
                    <strong>Senior Pastor</strong><br />
                    For immediate prayer or guidance
                  </p>
                  <div className="flex flex-col gap-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center text-xs py-1"
                      onClick={() => window.open('tel:+1-617-512-7451', '_self')}
                    >
                      <i className="fas fa-phone mr-1 text-xs"></i>Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
