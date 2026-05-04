import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useSeo } from "@/lib/useSeo";
import FleetCard from "@/components/fleet/FleetCard";
import FleetModal from "@/components/fleet/FleetModal";
import { fleet } from "@/data/fleet";

export default function ExoticMiami() {
  const [activeCar, setActiveCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const whatsappMessage = encodeURIComponent(
    "Hi, I'm interested in booking a luxury car with Lussaro Collection."
  );

  useSeo({
    title: "Exotic Car Rental Miami",
    description:
      "Rent Miami exotic cars with Lussaro Collection. Elite supercars, luxury service, and VIP delivery across South Beach and Brickell.",
    url: "https://www.lussarocollection.com/exotic-car-rental-miami",
  });

  return (
    <div className="bg-[#f7f5f0] text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs mb-4">
          Lussaro Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
          Exotic Car Rental Miami
        </h1>

        <p className="text-black/70 max-w-3xl text-base md:text-lg leading-relaxed">
          Discover Miami from behind the wheel of a premium exotic car. Lussaro Collection makes every South Beach drive and Brickell arrival unforgettable with supercar rentals that combine performance, prestige, and concierge-level service.
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
            href="/lamborghini-rental-miami"
            className="inline-flex items-center justify-center border border-white/15 text-white px-8 py-4 rounded-full font-semibold hover:border-[#c9a96e] hover:text-white transition"
          >
            Browse Lamborghini Rentals
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

      <section className="max-w-5xl mx-auto px-6 pb-24 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Miami Exotic Car Rentals for South Beach and Brickell
          </h2>
          <p className="text-black/70 leading-relaxed">
            Miami deserves extraordinary transportation. Our exotic fleet is built for the city’s most iconic destinations, from Ocean Drive’s beachfront energy to Brickell’s refined nightlife and business district. Every rental includes concierge delivery, vehicle orientation, and direct WhatsApp support.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">A Curated Fleet of High-Performance Vehicles</h3>
          <p className="text-black/70 leading-relaxed">
            Choose from Lamborghini, Rolls-Royce, Mercedes-AMG, and other premium supercars that deliver bold Miami style and instant presence. Each vehicle is prepared to exacting standards so you can enjoy a smooth, confident drive.
          </p>
          <p className="text-black/70 leading-relaxed">
            If you want an even more focused experience, see our dedicated <a href="/lamborghini-rental-miami" className="text-[#c9a96e] underline underline-offset-4">Lamborghini rental page</a> and explore the commanding <a href="/g-wagon-rental-miami" className="text-[#c9a96e] underline underline-offset-4">G-Wagon rental page</a> for Miami’s luxury SUV enthusiasts.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Designed for Seamless Miami Travel</h3>
          <p className="text-black/70 leading-relaxed">
            Our process is built for speed and reliability. Book with WhatsApp, receive white-glove delivery anywhere in Miami, and enjoy a premium rental without the usual complexity. We handle the logistics so you can focus on the drive.
          </p>
          <p className="text-black/70 leading-relaxed">
            From short beach trips along Collins Avenue to executive travel in Brickell, Lussaro Collection delivers a polished experience with a personal touch.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Why Exotic Car Rental is the Best Way to Experience Miami</h3>
          <ul className="text-black/70 space-y-3">
            <li>• Instant luxury visibility in South Beach and Miami Beach.</li>
            <li>• VIP-ready vehicles for nightlife, special events, and photo shoots.</li>
            <li>• Premium service, clear pricing, and fast booking without the wait.</li>
            <li>• Full support from booking through return, including insurance verification and delivery details.</li>
          </ul>
        </div>
      </section>

      <section className="bg-black text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">Reserve Your Miami Exotic Rental</h2>
        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Book the perfect exotic car for South Beach, Brickell, or any Miami destination. Fast WhatsApp booking, premium service, and luxury vehicles ready to launch your trip.
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
