import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { useSeo } from "@/lib/useSeo";
import HeroSection from "../components/hero/HeroSection";

const FleetSection = lazy(() => import("../components/fleet/FleetSection"));
const ExperienceSection = lazy(() => import("../components/experience/ExperienceSection"));
const ProcessSection = lazy(() => import("../components/process/ProcessSection"));
const TestimonialsSection = lazy(() => import("../components/testimonials/TestimonialsSection"));
const CTASection = lazy(() => import("../components/cta/CTASection"));

function SectionSkeleton({ className = "" }) {
  return <div className={`min-h-[520px] bg-[#f7f5f0] ${className}`} />;
}

function LazyOnView({ children, fallback }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || show) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [show]);

  return <div ref={ref}>{show ? children : fallback}</div>;
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

      <Suspense fallback={<SectionSkeleton />}>
        <div id="fleet">
          <FleetSection />
        </div>
      </Suspense>

      <LazyOnView fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <ExperienceSection />
        </Suspense>
      </LazyOnView>

      <LazyOnView fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <div id="process">
            <ProcessSection />
          </div>
        </Suspense>
      </LazyOnView>

      <LazyOnView fallback={<SectionSkeleton />}>
        <Suspense fallback={<SectionSkeleton />}>
          <div id="testimonials">
            <TestimonialsSection />
          </div>
        </Suspense>
      </LazyOnView>

      <LazyOnView fallback={<SectionSkeleton className="bg-black" />}>
        <Suspense fallback={<SectionSkeleton className="bg-black" />}>
          <div id="cta">
            <CTASection />
          </div>
        </Suspense>
      </LazyOnView>
    </main>
  );
}
