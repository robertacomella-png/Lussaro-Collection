import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FleetCard from "./FleetCard";
import { fleet } from "@/data/fleet";

export default function FleetSection() {
  const [sortBy, setSortBy] = useState("price");
  const [activeCar, setActiveCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const sortedFleet = [...fleet].sort((a, b) => {
    if (sortBy === "price") return b.price - a.price;
    if (sortBy === "year") return b.year - a.year;
    if (sortBy === "make") return a.make.localeCompare(b.make);
    return 0;
  });

  useEffect(() => {
    if (activeCar) {
      document.body.style.overflow = "hidden";
      setActiveImage(0);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCar]);

  return (
    <section id="fleet" className="bg-[#f7f5f0] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER */}
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
            Each vehicle in our collection is meticulously maintained.
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

      {/* MODAL */}
      <AnimatePresence>
        {activeCar && (
          <motion.div
            className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/70 backdrop-blur-xl px-3 py-5 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCar(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-[30px] md:rounded-[36px] bg-[#111] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
            >

              {/* CLOSE */}
              <button
                onClick={() => setActiveCar(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8 p-4 md:p-6">

                {/* LEFT - IMAGES */}
                <div>
                  <img
                    src={activeCar.images?.[activeImage]}
                    className="w-full rounded-[22px] object-cover"
                  />

                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {activeCar.images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImage(i)}>
                        <img
                          src={img}
                          className={`rounded-xl border ${
                            i === activeImage
                              ? "border-[#c9a96e]"
                              : "border-white/10 opacity-60"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* RIGHT - CONTENT */}
                <div className="text-white flex flex-col">

                  {/* 🔥 TOP CTA */}
                  <a
                    href={`https://wa.me/16452487305?text=${encodeURIComponent(
                      `Hi, I'm interested in booking the ${activeCar.name}.`
                    )}`}
                    target="_blank"
                    className="w-full bg-[#c9a96e] text-black py-4 rounded-full text-sm font-semibold text-center mb-6 hover:bg-white transition"
                  >
                    Reserve Now
                  </a>

                  <p className="text-[#c9a96e] text-xs uppercase mb-2">
                    {activeCar.make} • {activeCar.year}
                  </p>

                  <h3 className="text-3xl md:text-5xl font-semibold mb-4">
                    {activeCar.name}
                  </h3>

                  {/* PRICE */}
                  <p className="text-[#c9a96e] text-4xl md:text-5xl mb-6">
                    ${activeCar.price}
                    <span className="text-white/50 text-sm"> /day</span>
                  </p>

                  {/* SPECS */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="bg-white/5 p-3 rounded-xl text-center">
                      <p>{activeCar.zeroToSixty}</p>
                      <p className="text-xs text-white/40">0–60</p>
                    </div>

                    <div className="bg-white/5 p-3 rounded-xl text-center">
                      <p>{activeCar.power}</p>
                      <p className="text-xs text-white/40">HP</p>
                    </div>

                    <div className="bg-white/5 p-3 rounded-xl text-center">
                      <p>{activeCar.miles}</p>
                      <p className="text-xs text-white/40">Miles/day</p>
                    </div>
                  </div>

                  {/* DESCRIPTION AT BOTTOM */}
                  <p className="text-white/70 text-sm leading-relaxed">
                    {activeCar.description}
                  </p>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
