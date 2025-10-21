import { Link } from "wouter";

function Footer() {
  const quickLinks = [
    { href: "/bible-school", label: "Bible School" },
    { href: "/contact", label: "Contact" },
    { href: "/statement-of-faith", label: "Statement of Faith" },
    { href: "/genesis-to-revelation", label: "Genesis to Revelation" }
  ];

  const services = [
    "Sunday Worship - 7:00 PM",
    "Thursday Midweek Service - 8:30 PM",
    "Tuesday Family Night - Monthly",
    "Bible School Courses - 9 Available",
    "Ministry Training - Ongoing",
    "Community Outreach - Every Saturday"
  ];

  const socialLinks = [
    { href: "https://instagram.com/sfgm_boston", icon: "fab fa-instagram", label: "Instagram" },
    { href: "https://www.youtube.com/@sfgmbostonma", icon: "fab fa-youtube", label: "YouTube" }
  ];

  const footerLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/contact", label: "Support" }
  ];

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Ministry Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 ministry-gradient rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-cross text-white"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold">SFGM Boston</h3>
                <p className="text-sm text-slate-400">Soldiers for God Ministry</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Restoring lives through faith, community, and spiritual growth for over five years.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/') ? (
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((service, index) => (
                <li key={index} className="text-slate-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt text-primary mr-3"></i>
                <span className="text-slate-400">6 Bourbon St., Peabody, MA</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone text-primary mr-3"></i>
                <a href="tel:617-512-7451" className="text-slate-400 hover:text-white transition-colors">617-512-7451</a>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-primary mr-3"></i>
                <a href="mailto:pastor_rocky@sfgmboston.com" className="text-slate-400 hover:text-white transition-colors">pastor_rocky@sfgmboston.com</a>
              </div>
              <Link href="/contact" className="btn-primary text-sm font-medium mt-4 inline-flex items-center">
                <i className="fas fa-paper-plane mr-2"></i>Send Message
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-slate-400 text-sm">
              © 2024 SFGM, Soldiers for God Ministry. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                <i className="fas fa-home mr-1"></i>Home
              </Link>
              <Link href="/music" className="text-slate-400 hover:text-white transition-colors">
                <i className="fas fa-music mr-1"></i>Music
              </Link>
              <Link href="/bible-school" className="text-slate-400 hover:text-white transition-colors">
                <i className="fas fa-graduation-cap mr-1"></i>Bible School
              </Link>
              <Link href="/discussion-forum" className="text-slate-400 hover:text-white transition-colors">
                <i className="fas fa-comments mr-1"></i>Study Circle
              </Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                <i className="fas fa-envelope mr-1"></i>Contact
              </Link>
              <Link href="/statement-of-faith" className="text-slate-400 hover:text-white transition-colors">
                <i className="fas fa-cross mr-1"></i>Statement of Faith
              </Link>
              
              <Link href="/genesis-to-revelation" className="text-slate-400 hover:text-white transition-colors">
                <i className="fas fa-book mr-1"></i>Genesis to Revelation
              </Link>
              <Link href="/sunday-messages" className="text-slate-400 hover:text-white transition-colors">
                <i className="fas fa-video mr-1"></i>Sunday Messages
              </Link>
            </div>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
