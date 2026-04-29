import FleetCard from "@/components/fleet/FleetCard";
import { fleet } from "@/data/fleet";

export default function LamborghiniMiami() {
  const lambos = fleet.filter((car) =>
    car.make.toLowerCase().includes("lamborghini")
  );

  return (
    <div className="bg-[#f7f5f0] text-black">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs mb-4">
          Lussaro Collection
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
          Lamborghini Rental Miami
        </h1>

        <p className="text-black/60 max-w-2xl text-base md:text-lg leading-relaxed">
          Turn every moment in Miami into an experience with a Lamborghini. From the aggressive Huracán EVO to the track-inspired STO and the commanding Urus, our fleet delivers unmatched performance and presence.
        </p>
      </section>

      {/* LAMBO CARS ONLY */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {lambos.map((car) => (
            <FleetCard key={car.id} car={car} onOpen={() => {}} />
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Rent a Lamborghini in Miami
        </h2>

        <p className="text-black/70 leading-relaxed">
          Miami and Lamborghini go hand in hand. From Ocean Drive to Brickell, nothing turns heads like the sound and presence of a V10 engine. Renting a Lamborghini isn’t just transportation — it’s a statement.
        </p>

        <p className="text-black/70 leading-relaxed">
          Lussaro Collection offers a curated selection of Lamborghini models, each maintained to the highest standard. Whether you’re visiting for the weekend or celebrating something special, our team delivers a seamless luxury experience.
        </p>

        <p className="text-black/70 leading-relaxed">
          With instant booking and flexible delivery, getting behind the wheel has never been easier.
        </p>

        <h3 className="text-xl font-semibold mt-10">
          Available Lamborghini Models
        </h3>

        <ul className="text-black/70 space-y-2">
          <li>• Lamborghini Huracán EVO</li>
          <li>• Lamborghini Huracán STO</li>
          <li>• Lamborghini Urus</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Reserve Your Lamborghini
        </h2>

        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Select your model and book instantly. Miami is waiting.
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
