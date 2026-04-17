import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/hero/HeroSection";
import FleetSection from "../components/fleet/FleetSection";
import ExperienceSection from "../components/experience/ExperienceSection";
import ProcessSection from "../components/process/ProcessSection";
import TestimonialsSection from "../components/testimonials/TestimonialsSection";
import CTASection from "../components/cta/CTASection";
import Footer from "../components/footer/Footer";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <HeroSection />
      <div id="experience">
        <FleetSection />
      </div>
      <ExperienceSection />
      <div id="process">
        <ProcessSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="cta">
        <CTASection />
      </div>
      <Footer />
    </div>
  );
}
