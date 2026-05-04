import Navbar from "@/components/navbar/Navbar";
import { useSeo } from "@/lib/useSeo";
import FleetCard from "@/components/fleet/FleetCard";
import { fleet } from "@/data/fleet";

export default function LuxurySuvMiami() {
  useSeo({
    title: "Luxury SUV Rental Miami",
    description:
      "Rent luxury SUVs in Miami with Lussaro Collection. Premium vehicles like the Mercedes-Maybach GLS 600, G63, and Lamborghini Urus for bold arrivals and executive travel.",
    url: "https://www.lussarocollection.com/luxury-suv-rental-miami",
  });

  const suvs = fleet.filter((car) =>
    ["Urus", "G63", "GLS", "Maybach"].some((keyword) =>
      car.name.includes(keyword)
    )
  );

  return (
    <div className="bg-[#f7f5f0] text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs mb-4">
          Lussaro Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
          Luxury SUV Rental Miami
        </h1>

        <p className="text-black/60 max-w-2xl text-base md:text-lg leading-relaxed">
          Drive Miami in a premium luxury SUV that blends performance, comfort, and presence. Our curated SUV fleet is perfect for executives, groups, and anyone who wants to arrive with confidence.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {suvs.map((car) => (
            <FleetCard key={car.id} car={car} onOpen={() => {}} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Premium SUV Rentals in Miami
        </h2>

        <p className="text-black/70 leading-relaxed">
          Miami luxury SUV rentals offer instant style and unmatched versatility. Whether you need a commanding G63 for South Beach, the refined Maybach GLS 600 for Brickell, or the performance-focused Urus, we have the right vehicle for your stay.
        </p>

        <p className="text-black/70 leading-relaxed">
          Each SUV is maintained to the highest standard and delivered with white-glove service. Enjoy flexible pickup options, concierge support, and fast WhatsApp booking.
        </p>

        <h3 className="text-xl font-semibold mt-10">Why Rent an SUV with Lussaro Collection</h3>
        <ul className="text-black/70 space-y-2">
          <li>• Exceptional comfort and spacious interiors</li>
          <li>• Powerful engines with iconic presence</li>
          <li>• Ideal for business travel, family, or premium sightseeing</li>
          <li>• VIP delivery across Miami neighborhoods</li>
        </ul>
      </section>

      <section className="bg-black text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Reserve Your Luxury SUV
        </h2>

        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Browse the available SUVs and book with confidence. Our Miami rental team is ready to help.
        </p>

        <a
          href="https://wa.me/16452487305"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#c9a96e] text-black px-10 py-4 rounded-full font-semibold hover:bg-white transition"
        >
          Reserve Now
        </a>
      </section>
    </div>
  );
}
