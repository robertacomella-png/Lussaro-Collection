import FleetCard from "@/components/fleet/FleetCard";
import { fleet } from "@/data/fleet";

export default function GWagonMiami() {
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

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs mb-4">
          Lussaro Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
          G-Wagon Rental Miami
        </h1>

        <p className="text-black/60 max-w-2xl text-base md:text-lg leading-relaxed">
          Experience the ultimate in luxury SUV performance with a Mercedes-AMG G63. Bold, powerful, and unmistakably iconic, the G-Wagon commands attention wherever you go in Miami. From South Beach to Brickell, feel the roar of a twin-turbo V8 and the presence that only a true legend can deliver.
        </p>
      </section>

      {/* GWAGON CARS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {gwagons.length > 0 ? (
            gwagons.map((car) => (
              <FleetCard key={car.id} car={car} onOpen={() => {}} />
            ))
          ) : (
            <p className="text-black/60 text-lg col-span-full">
              No G-Wagon vehicles currently available. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Rent a Mercedes-AMG G63 in Miami
        </h2>

        <p className="text-black/70 leading-relaxed">
          The Mercedes-AMG G63 is more than a vehicle—it's a statement. Built for those who refuse to blend in, this iconic SUV combines timeless design with raw, twin-turbo performance. In Miami, where luxury and boldness define the city, the G-Wagon stands alone.
        </p>

        <p className="text-black/70 leading-relaxed">
          Whether you're making a power move in Brickell, turning heads on South Beach, or commanding respect at any nightlife destination, the G63 delivers the presence and performance you demand. Lussaro Collection offers meticulously maintained G-Wagons, ready for the ultimate Miami experience.
        </p>

        <p className="text-black/70 leading-relaxed">
          With seamless booking and flexible delivery to any location in Miami, your exotic SUV rental is just a message away. Get behind the wheel of an icon.
        </p>

        <h3 className="text-xl font-semibold mt-10">
          Why Rent a G-Wagon in Miami?
        </h3>

        <ul className="text-black/70 space-y-3">
          <li className="flex items-start">
            <span className="text-[#c9a96e] mr-3 font-bold">•</span>
            <span><strong>Unmistakable Presence:</strong> The G-Wagon's iconic silhouette turns heads everywhere you go—from Ocean Drive to Brickell.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#c9a96e] mr-3 font-bold">•</span>
            <span><strong>Legendary Performance:</strong> Twin-turbo V8 power paired with commanding ride height—feel the difference.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#c9a96e] mr-3 font-bold">•</span>
            <span><strong>Perfect for Every Occasion:</strong> VIP events, nightlife, photo shoots, celebration weekends—the G63 elevates everything.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#c9a96e] mr-3 font-bold">•</span>
            <span><strong>Luxury Comfort:</strong> Premium materials, cutting-edge technology, and a ride engineered for pure comfort.</span>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-10">
          Perfect for South Beach & Miami's Best Spots
        </h3>

        <p className="text-black/70 leading-relaxed">
          Pull up in a G-Wagon and make an entrance that matters. The G63 is designed for Miami's most exclusive venues, from South Beach clubs to Brickell corporate events. Whether it's a weekend getaway or a special celebration, this exotic SUV rental is your ticket to maximum impact.
        </p>

        <h3 className="text-xl font-semibold mt-10">
          The Mercedes-AMG G63 Experience
        </h3>

        <p className="text-black/70 leading-relaxed">
          Every detail of the G-Wagon speaks luxury. The aggressive exterior design, refined interior, advanced infotainment system, and cutting-edge safety features create a driving experience that's both thrilling and sophisticated. This is what premium exotic car rental in Miami looks like.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Reserve Your G-Wagon Today
        </h2>

        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Experience the iconic power of a Mercedes-AMG G63. Book instantly and own Miami's most legendary SUV.
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
