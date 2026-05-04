import Navbar from "../components/navbar/Navbar";
import { useSeo } from "@/lib/useSeo";
import HeroSection from "../components/hero/HeroSection";
import FleetSection from "../components/fleet/FleetSection";
import ExperienceSection from "../components/experience/ExperienceSection";
import ProcessSection from "../components/process/ProcessSection";
import TestimonialsSection from "../components/testimonials/TestimonialsSection";
import CTASection from "../components/cta/CTASection";

export default function Home() {
  useSeo({
    title: "Miami Luxury Car Rentals",
    description:
      "Lussaro Collection offers Miami luxury car rentals with exotic vehicles, premium delivery, and fast WhatsApp booking across South Beach and Brickell.",
    url: "https://www.lussarocollection.com/",
  });

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
    </div>
  );
}
