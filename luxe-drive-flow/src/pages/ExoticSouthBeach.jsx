import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useSeo } from "@/lib/useSeo";
import FleetCard from "@/components/fleet/FleetCard";
import FleetModal from "@/components/fleet/FleetModal";
import { fleet } from "@/data/fleet";

export default function ExoticSouthBeach() {
  const [activeCar, setActiveCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const whatsappMessage = encodeURIComponent(
    "Hi, I'm interested in booking a luxury car with Lussaro Collection."
  );

  useSeo({
    title: "Exotic Car Rental South Beach",
    description:
      "Rent exotic cars in South Beach with Lussaro Collection. Premium supercars and luxury vehicles available for Miami’s most iconic beachfront destinations.",
    url: "https://www.lussarocollection.com/exotic-car-rental-south-beach",
  });

  return (
    <div className="bg-[#f7f5f0] text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs mb-4">
          Lussaro Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
          Exotic Car Rental South Beach
        </h1>

        <p className="text-black/70 max-w-3xl text-base md:text-lg leading-relaxed">
          Cruise South Beach in a premium exotic rental. Lussaro Collection delivers the best supercars and luxury vehicles to Miami’s most glamorous beachfront destinations.
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
            See All Exotic Cars
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {fleet.map((car) => (
            <FleetCard key={car.id} car={car} onOpen={setActiveCar} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">South Beach Exotic Rentals</h2>

        <p className="text-black/70 leading-relaxed">
          From Ocean Drive to Collins Avenue, South Beach deserves a vehicle that matches its energy. Our exotic rentals are designed to make every arrival unforgettable.
        </p>

        <p className="text-black/70 leading-relaxed">
          Enjoy same-day delivery, white-glove service, and the flexibility to rent the top exotic vehicles Miami has to offer.
        </p>

        <h3 className="text-xl font-semibold mt-10">Why Choose South Beach Rentals</h3>
        <ul className="text-black/70 space-y-2">
          <li>• Fast delivery to South Beach destinations</li>
          <li>• Curated fleet of premium vehicles</li>
          <li>• Dedicated support for VIP experiences</li>
          <li>• Easy booking through WhatsApp</li>
        </ul>
      </section>

      <section className="bg-black text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">Book Your South Beach Exotic</h2>

        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Reserve the perfect exotic car for South Beach with our Miami concierge service.
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
