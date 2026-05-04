import { useState } from "react";
import { motion } from "framer-motion";
import FleetCard from "./FleetCard";
import FleetModal from "./FleetModal";
import { fleet } from "@/data/fleet";

export default function FleetSection() {
  const [activeCar, setActiveCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

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
            Each vehicle in our collection is meticulously maintained and detailed to showroom standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {fleet.map((car) => (
            <FleetCard key={car.id} car={car} onOpen={setActiveCar} />
          ))}
        </div>
      </div>

      <FleetModal
        car={activeCar}
        setCar={setActiveCar}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
      />
    </section>
  );
}
