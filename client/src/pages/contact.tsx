import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Contact() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Contact from ${name || "SFGM Boston site"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:pastor_rocky@sfgmboston.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-rose-50">
      <Navigation />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Contact Us</h1>
            <p className="text-lg text-slate-600">We’re here for prayer, guidance, and ministry questions</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Badge className="bg-emerald-100 text-emerald-800" variant="secondary">Response: within 24 hours</Badge>
              <Badge className="bg-indigo-100 text-indigo-800" variant="secondary">Boston, MA</Badge>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Direct Contact */}
            <Card className="lg:col-span-1 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="mx-auto h-20 w-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mb-4">PR</div>
                  <h2 className="text-xl font-bold text-slate-900">Pastor Rocky</h2>
                  <p className="text-slate-600 mb-6">Senior Pastor</p>
                </div>

                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <a href="tel:617-512-7451">
                      <i className="fas fa-phone mr-2"></i>
                      Call: 617-512-7451
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="sms:+16175127451">
                      <i className="fas fa-sms mr-2"></i>
                      Text Message
                    </a>
                  </Button>
                  <Button asChild variant="secondary" className="w-full">
                    <a href="mailto:pastor_rocky@sfgmboston.com">
                      <i className="fas fa-envelope mr-2"></i>
                      Email Pastor Rocky
                    </a>
                  </Button>
                </div>

                <div className="mt-6 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Office Hours</span>
                    <span className="font-medium text-slate-800">Mon–Fri 9a–5p</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span>Sunday Services</span>
                    <span className="font-medium text-slate-800">10:00 AM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Message Form */}
            <Card className="lg:col-span-2 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Send a Message</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      type="email"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we pray for you or help you today?"
                      rows={5}
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button onClick={handleSendEmail} className="">
                    <i className="fas fa-paper-plane mr-2"></i>
                    Send Message
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:pastor_rocky@sfgmboston.com?subject=Contact%20from%20SFGM%20Boston%20site">
                      Or Email Directly
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}