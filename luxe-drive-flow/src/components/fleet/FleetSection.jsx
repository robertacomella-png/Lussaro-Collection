import { useState } from "react";
import { motion } from "framer-motion";
import FleetCard from "./FleetCard";
import { fleet } from "@/data/fleet";

export default function FleetSection() {
  const [sortBy, setSortBy] = useState("price");

  const sortedFleet = [...fleet].sort((a, b) => {
    if (sortBy === "price") return b.price - a.price;
    if (sortBy === "year") return b.year - a.year;
    if (sortBy === "make") return a.make.localeCompare(b.make);
    return 0;
  });

  return (
    <section id="fleet" className="bg-[#f7f5f0] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedFleet.map((car) => (
            <FleetCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
