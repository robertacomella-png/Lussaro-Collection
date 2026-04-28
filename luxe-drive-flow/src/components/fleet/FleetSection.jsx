import { useState } from "react";
import { motion } from "framer-motion";
import FleetCard from "./FleetCard";
import { fleet } from "@/data/fleet";

export default function FleetSection() {
  const [sortBy, setSortBy] = useState("price");
  const [activeCar, setActiveCar] = useState(null);

  const sortedFleet = [...fleet].sort((a, b) => {
    if (sortBy === "price") return b.price - a.price;
    if (sortBy === "year") return b.year - a.year;
    if (sortBy === "make") return a.make.localeCompare(b.make);
    return 0;
  });

  return (
    <section id="fleet" className="bg-[#f7f5f0] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs font-medium mb-4">
            Curated Luxury Fleet
          </p>

          <h2 className="text-[#0a0a0a] text-4xl md:text-6xl font-semibold tracking-tight">
            Our Fleet
          </h2>

          <p className="text-[#0a0a0a]/50 mt-4 text-base md:text-lg font-light max-w-xl mx-auto">
            Each vehicle in our collection is meticulously maintained and detailed
            to showroom standards.
          </p>
        </motion.div>

        {/* FILTER */}
        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-3 gap-3 w-full max-w-2xl">
            {["price", "make", "year"].map((item) => (
              <button
                key={item}
                onClick={() => setSortBy(item)}
                className={`rounded-full border px-4 py-3 text-sm transition ${
                  sortBy === item
                    ? "bg-black text-white border-black"
                    : "border-black/10 text-black hover:bg-black hover:text-white"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sortedFleet.map((car) => (
            <FleetCard key={car.id} car={car} onOpen={setActiveCar} />
          ))}
        </div>
      </div>

      {/* FULL SCREEN MODAL */}
      {activeCar && (
        <div className="fixed inset-0 z-[2000] bg-black/95 flex flex-col">
          
          {/* CLOSE */}
          <button
            onClick={() => setActiveCar(null)}
            className="absolute top-4 right-4 text-white text-xl z-10"
          >
            ✕
          </button>

          {/* IMAGE */}
          <img
            src={activeCar.image}
            alt={activeCar.name}
            className="w-full h-[45vh] md:h-[55vh] object-cover"
          />

          {/* CONTENT */}
          <div className="p-5 md:p-8 text-white flex-1 overflow-y-auto max-w-4xl mx-auto w-full">
            <h2 className="text-3xl md:text-5xl font-semibold mb-3">
              {activeCar.name}
            </h2>

            <p className="text-[#c9a96e] text-2xl md:text-3xl mb-5">
              ${activeCar.price} / day
            </p>

            <p className="text-white/70 mb-8 leading-relaxed">
              {activeCar.description}
            </p>

            {/* METRICS */}
            <div className="grid grid-cols-3 text-center mb-8">
              <div>
                <p className="text-xl md:text-2xl font-semibold">
                  {activeCar.zeroToSixty}
                </p>
                <p className="text-xs text-white/40">(0–60)</p>
              </div>

              <div>
                <p className="text-xl md:text-2xl font-semibold">
                  {activeCar.power}hp
                </p>
                <p className="text-xs text-white/40">Power</p>
              </div>

              <div>
                <p className="text-xl md:text-2xl font-semibold">
                  {activeCar.miles}
                </p>
                <p className="text-xs text-white/40">Miles/day</p>
              </div>
            </div>

            {/* BOOK */}
            <a
              href={`https://wa.me/16452487305?text=Hi I'm interested in ${activeCar.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#c9a96e] text-black py-4 rounded-xl text-center font-semibold hover:bg-white transition"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
