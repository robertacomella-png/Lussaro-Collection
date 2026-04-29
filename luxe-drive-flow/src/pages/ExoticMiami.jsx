import Navbar from "@/components/navbar/Navbar";
import FleetCard from "@/components/fleet/FleetCard";
import { fleet } from "@/data/fleet";

export default function ExoticMiami() {
  return (
    <div className="bg-[#f7f5f0] text-black">
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs mb-4">
          Lussaro Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
          Exotic Car Rental Miami
        </h1>

        <p className="text-black/60 max-w-2xl text-base md:text-lg leading-relaxed">
          Experience Miami the way it was meant to be seen — behind the wheel of the world’s most exotic vehicles. From Lamborghinis to Rolls-Royce, Lussaro Collection delivers a premium rental experience designed for those who demand more than just transportation.
        </p>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {fleet.map((car) => (
            <FleetCard key={car.id} car={car} onOpen={() => {}} />
          ))}
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Luxury & Exotic Car Rentals in Miami
        </h2>

        <p className="text-black/70 leading-relaxed">
          Miami is built for luxury — from South Beach to Brickell, every moment is about presence, style, and experience. Renting an exotic car isn’t just about getting from point A to point B, it’s about making an entrance wherever you go.
        </p>

        <p className="text-black/70 leading-relaxed">
          At Lussaro Collection, we offer a curated fleet of high-performance and ultra-luxury vehicles including Lamborghini, Rolls-Royce, Mercedes-Benz G-Wagon, and more. Each vehicle is meticulously maintained and delivered in pristine condition.
        </p>

        <p className="text-black/70 leading-relaxed">
          Whether you’re visiting Miami for the weekend, celebrating a special occasion, or simply want to elevate your experience, our team ensures a seamless booking process with premium service from start to finish.
        </p>

        <h3 className="text-xl font-semibold mt-10">
          Why Choose Lussaro Collection
        </h3>

        <ul className="text-black/70 space-y-2">
          <li>• Premium exotic and luxury vehicles</li>
          <li>• Fast, seamless booking process</li>
          <li>• Flexible delivery options across Miami</li>
          <li>• White-glove customer experience</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Reserve Your Experience
        </h2>

        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Browse our fleet and reserve instantly. Miami is waiting.
        </p>

        <a
          href="https://wa.me/16452487305"
          target="_blank"
          className="inline-block bg-[#c9a96e] text-black px-10 py-4 rounded-full font-semibold hover:bg-white transition"
        >
          Reserve Now
        </a>
      </section>
    </div>
  );
}
