import Navbar from "@/components/navbar/Navbar";
import { useSeo } from "@/lib/useSeo";
import FleetCard from "@/components/fleet/FleetCard";
import { fleet } from "@/data/fleet";

export default function RollsRoyceMiami() {
  useSeo({
    title: "Rolls-Royce Rental Miami",
    description:
      "Rent a Rolls-Royce in Miami with Lussaro Collection. Experience ultimate luxury with the Cullinan and other elite vehicles delivered across South Beach and Brickell.",
    url: "https://www.lussarocollection.com/rolls-royce-rental-miami",
  });

  const rollsRoyce = fleet.filter((car) =>
    car.make.toLowerCase().includes("rolls") ||
    car.name.toLowerCase().includes("rolls")
  );

  return (
    <div className="bg-[#f7f5f0] text-black">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs mb-4">
          Lussaro Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
          Rolls-Royce Rental Miami
        </h1>

        <p className="text-black/60 max-w-2xl text-base md:text-lg leading-relaxed">
          Arrive in Miami with uncompromising luxury. Our Rolls-Royce rentals offer a serene ride, lavish cabin, and unmatched presence for weddings, special occasions, and VIP travel.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rollsRoyce.map((car) => (
            <FleetCard key={car.id} car={car} onOpen={() => {}} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Rolls-Royce Rentals in Miami</h2>

        <p className="text-black/70 leading-relaxed">
          Experience the signature Rolls-Royce feeling of quiet power and effortless luxury. The Cullinan delivers a smooth, refined ride while making a powerful statement on Miami’s most prestigious streets.
        </p>

        <p className="text-black/70 leading-relaxed">
          Every rental includes dedicated service, expert delivery, and attention to detail so your Miami arrival feels flawless from start to finish.
        </p>

        <h3 className="text-xl font-semibold mt-10">Why Choose Rolls-Royce with Lussaro Collection</h3>
        <ul className="text-black/70 space-y-2">
          <li>• Exclusive luxury SUV performance</li>
          <li>• Whisper-quiet cabin with handcrafted materials</li>
          <li>• Personalized delivery across Miami</li>
          <li>• Ideal for weddings, VIP events, and executive travel</li>
        </ul>
      </section>

      <section className="bg-black text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Book Your Rolls-Royce
        </h2>

        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Secure your Rolls-Royce rental through WhatsApp and enjoy premium Miami service.
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
