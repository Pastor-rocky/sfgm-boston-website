import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const handlePhoneClick = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const contactLeaders = [
    {
      name: "Pastor Rocky",
      title: "Senior Pastor",
      phone: "617-512-7451",
      email: null,
      isPrimary: true
    }
  ];

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">
            Contact Our Ministry Leaders
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Reach out to our dedicated ministry leaders for spiritual guidance, prayer requests, 
            or any questions about our church community and Bible school programs.
          </p>
        </div>

        {/* Contact Leaders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactLeaders.map((leader, index) => (
            <Card key={index} className={`shadow-lg hover:shadow-xl transition-all duration-300 ${leader.isPrimary ? 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-white' : ''}`}>
              <CardContent className="p-6 text-center">
                {/* Leader Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${leader.isPrimary ? 'ministry-gradient' : 'bg-slate-100'}`}>
                  <i className={`fas ${leader.title === 'Lead Pastor' ? 'fa-cross' : leader.title === 'Elder' ? 'fa-bible' : 'fa-hands-praying'} text-xl ${leader.isPrimary ? 'text-white' : 'text-slate-600'}`}></i>
                </div>
                
                {/* Leader Info */}
                <h3 className="text-lg font-bold text-slate-900 mb-1">{leader.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{leader.title}</p>
                
                {/* Contact Actions */}
                <div className="space-y-3">
                  <p className="text-sm text-slate-600 italic">
                    For immediate prayer or guidance
                  </p>
                  <Button
                    onClick={() => handlePhoneClick(leader.phone)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                    size="sm"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>




      </div>
    </section>
  );
}