import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useSeo } from "@/lib/useSeo";
import FleetCard from "@/components/fleet/FleetCard";
import FleetModal from "@/components/fleet/FleetModal";
import { fleet } from "@/data/fleet";

export default function GWagonMiami() {
  const [activeCar, setActiveCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const whatsappMessage = encodeURIComponent(
    "Hi, I'm interested in booking a luxury car with Lussaro Collection."
  );

  useSeo({
    title: "G-Wagon Rental Miami",
    description:
      "Rent a Mercedes-AMG G63 in Miami from Lussaro Collection. Bold luxury SUV rental for South Beach, Brickell events, nightlife, and elite style.",
    url: "https://www.lussarocollection.com/g-wagon-rental-miami",
  });

  const gwagons = fleet.filter((car) => {
    const nameLower = car.name.toLowerCase();
    const makeLower = car.make.toLowerCase();
    return (
      nameLower.includes("g63") ||
      nameLower.includes("g-wagon") ||
      makeLower.includes("mercedes") ||
      makeLower.includes("mercedes-benz")
    );
  });

  return (
    <div className="bg-[#f7f5f0] text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs mb-4">
          Lussaro Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
          G-Wagon Rental Miami
        </h1>

        <p className="text-black/70 max-w-3xl text-base md:text-lg leading-relaxed">
          Drive Miami in a Mercedes-AMG G63 and own every arrival. The G-Wagon blends commanding luxury with off-road heritage, making it an iconic choice for South Beach, Brickell, and every VIP occasion in the city.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`https://wa.me/16452487305?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#c9a96e] text-black px-8 py-4 rounded-full font-semibold hover:bg-white transition"
          >
            Reserve on WhatsApp
          </a>
          <a
            href="/exotic-car-rental-miami"
            className="inline-flex items-center justify-center border border-white/15 text-white px-8 py-4 rounded-full font-semibold hover:border-[#c9a96e] hover:text-white transition"
          >
            Browse Exotic Fleet
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {gwagons.length > 0 ? (
            gwagons.map((car) => (
              <FleetCard key={car.id} car={car} onOpen={setActiveCar} />
            ))
          ) : (
            <div className="col-span-full rounded-3xl bg-white/5 p-8 text-black/80 text-center">
              <p className="text-lg font-medium">
                No G-Wagon vehicles currently available. Check back soon.
              </p>
              <p className="mt-3 text-sm text-black/60">
                In the meantime, explore our full exotic fleet for other premium Miami options.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Miami’s Premier G-Wagon Rental Experience
          </h2>
          <p className="text-black/70 leading-relaxed">
            The Mercedes-AMG G63 delivers unmatched presence on Miami’s most exclusive streets. From a commanding South Beach arrival to head-turning moments in Brickell, the G-Wagon is a statement of style, performance, and luxury.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Built for VIP Miami Travel</h3>
          <p className="text-black/70 leading-relaxed">
            When you rent with Lussaro Collection, your G-Wagon comes with full support and delivery anywhere in Miami. We handle logistics, insurance checks, and vehicle readiness so you can focus on the experience.
          </p>
          <p className="text-black/70 leading-relaxed">
            If you prefer a high-performance exotic sports car, check our <a href="/lamborghini-rental-miami" className="text-[#c9a96e] underline underline-offset-4">Lamborghini rentals</a> for a different kind of Miami adrenaline.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Why Choose the G-Wagon in Miami</h3>
          <ul className="text-black/70 space-y-3">
            <li>• Unrivaled curb appeal for high-profile events and photo shoots.</li>
            <li>• Powerful twin-turbo V8 performance with iconic AMG engineering.</li>
            <li>• Spacious luxury interior for comfort across every Miami neighborhood.</li>
            <li>• Premium service and fast WhatsApp booking for last-minute plans.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Rental Confidence for South Beach and Brickell</h3>
          <p className="text-black/70 leading-relaxed">
            Lussaro Collection is focused on reliability, transparency, and a high-end customer experience. Your G-Wagon rental includes clear terms, professional delivery, and the support needed for a confident Miami adventure.
          </p>
        </div>
      </section>

      <section className="bg-black text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">Reserve Your G-Wagon Today</h2>
        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Book a Mercedes-AMG G63 with Lussaro Collection and enjoy Miami’s most luxurious SUV experience.
        </p>
        <a
          href={`https://wa.me/16452487305?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#c9a96e] text-black px-10 py-4 rounded-full font-semibold hover:bg-white transition"
        >
          Reserve Now
        </a>
      </section>

      <FleetModal
        car={activeCar}
        setCar={setActiveCar}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
      />
    </div>
  );
}
