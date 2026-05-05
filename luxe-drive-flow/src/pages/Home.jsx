import { lazy, Suspense } from "react";
import Navbar from "../components/navbar/Navbar";
import { useSeo } from "@/lib/useSeo";
import HeroSection from "../components/hero/HeroSection";

const FleetSection = lazy(() => import("../components/fleet/FleetSection"));
const ExperienceSection = lazy(() => import("../components/experience/ExperienceSection"));
const ProcessSection = lazy(() => import("../components/process/ProcessSection"));
const TestimonialsSection = lazy(() => import("../components/testimonials/TestimonialsSection"));
const CTASection = lazy(() => import("../components/cta/CTASection"));

function SectionFallback() {
  return <div className="bg-[#f7f5f0] min-h-[900px] md:min-h-[760px]" />;
}

export default function Home() {
  useSeo({
    title: "Luxury & Exotic Car Rental Miami | Lussaro Collection",
    description:
      "Lussaro Collection offers Miami luxury and exotic car rentals with Lamborghini, Rolls-Royce, G-Wagon, premium delivery, and instant WhatsApp booking across South Beach and Brickell.",
    url: "https://www.lussarocollection.com/",
  });

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />

      <Suspense fallback={<SectionFallback />}>
        <div id="fleet">
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
      </Suspense>
    </main>
  );
}
