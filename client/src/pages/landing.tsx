import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import EventsSection from "@/components/events-section";
import AboutSection from "@/components/about-section";
import BibleSchoolSection from "@/components/bible-school-section";
import Footer from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <BibleSchoolSection />

      <Footer />
    </div>
  );
}
