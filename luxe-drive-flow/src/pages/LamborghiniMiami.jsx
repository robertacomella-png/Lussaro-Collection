import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import { useSeo } from "@/lib/useSeo";
import FleetCard from "@/components/fleet/FleetCard";
import FleetModal from "@/components/fleet/FleetModal";
import { fleet } from "@/data/fleet";

export default function LamborghiniMiami() {
  const [activeCar, setActiveCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const whatsappMessage = encodeURIComponent(
    "Hi, I'm interested in booking a luxury car with Lussaro Collection."
  );

  useSeo({
    title: "Lamborghini Rental Miami",
    description:
      "Rent Lamborghinis in Miami with Lussaro Collection. Select from Huracán, STO, Urus and more for premium exotic car experiences.",
    url: "https://www.lussarocollection.com/lamborghini-rental-miami",
  });

  const lambos = fleet.filter((car) =>
    car.make.toLowerCase().includes("lamborghini")
  );

  return (
    <div className="bg-[#f7f5f0] text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs mb-4">
          Lussaro Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
          Lamborghini Rental Miami
        </h1>

        <p className="text-black/70 max-w-3xl text-base md:text-lg leading-relaxed">
          From South Beach to Brickell, Miami is the perfect stage for Lamborghini performance and design. Lussaro Collection brings top-level Lamborghini rentals to the city with a fleet curated for elegance, speed, and unforgettable presence.
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
          {lambos.map((car) => (
            <FleetCard key={car.id} car={car} onOpen={setActiveCar} />
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            High-Performance Lamborghini Rentals in Miami
          </h2>
          <p className="text-black/70 leading-relaxed">
            A Lamborghini rental in Miami means more than a powerful drive — it means amplifying every moment. Our collection includes models like the Huracán EVO, Huracán STO, and Urus so you can tailor your rental to the exact level of performance and luxury you want.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Miami Luxury Made Effortless</h3>
          <p className="text-black/70 leading-relaxed">
            We simplify the Lamborghini rental process with responsive WhatsApp booking, hand-delivery to your Miami destination, and full support from reservation to return. Whether you’re heading to a South Beach dinner or a Brickell event, your Lamborghini arrives ready.
          </p>
          <p className="text-black/70 leading-relaxed">
            If you want a different kind of premium presence, our <a href="/g-wagon-rental-miami" className="text-[#c9a96e] underline underline-offset-4">G-Wagon rentals</a> offer commanding SUV style for Miami’s most elite settings.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Why Lamborghini is the Right Miami Choice</h3>
          <ul className="text-black/70 space-y-3">
            <li>• Exceptional acceleration and handling for Miami’s open roads.</li>
            <li>• Bold design that matches South Beach nightlife and Brickell sophistication.</li>
            <li>• Fully serviced vehicles with premium interiors and modern technology.</li>
            <li>• Concierge rental support and flexible delivery across the city.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Available Lamborghini Models</h3>
          <p className="text-black/70 leading-relaxed">
            Each Lamborghini is prepared for Miami’s lifestyle and performance needs. Drive the Huracán EVO for razor-sharp precision, the STO for race-inspired dynamics, or the Urus for thrilling luxury SUV capability.
          </p>
        </div>
      </section>

      <section className="bg-black text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">Reserve Your Lamborghini Today</h2>
        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Book a Lamborghini rental with fast WhatsApp support and Miami delivery. Your luxury experience starts with a single message.
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
