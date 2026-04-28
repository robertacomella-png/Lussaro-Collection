import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
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

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sortedFleet.map((car) => (
            <FleetCard key={car.id} car={car} onOpen={setActiveCar} />
          ))}
        </div>
      </div>

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
              <button
                type="button"
                onClick={() => setActiveCar(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 backdrop-blur-md flex items-center justify-center transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8 p-3 md:p-6">
                <div>
                  <div className="overflow-hidden rounded-[24px] bg-black">
                    <motion.img
                      key={(activeCar.images?.[activeImage] || activeCar.image)}
                      src={activeCar.images?.[activeImage] || activeCar.image}
                      alt={activeCar.name}
                      initial={{ opacity: 0.65, scale: 1.015 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.28 }}
                      className="w-full aspect-[4/3] md:aspect-[16/10] object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-2 md:gap-3 mt-3">
                    {(activeCar.images || [activeCar.image]).map((img, index) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={`overflow-hidden rounded-2xl border transition ${
                          activeImage === index
                            ? "border-[#c9a96e] opacity-100"
                            : "border-white/10 opacity-55 hover:opacity-85"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full aspect-[4/3] object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-white px-1 md:px-0 pb-2 md:py-4 flex flex-col justify-center">
                  <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-[10px] md:text-xs mb-3">
                    {activeCar.make} • {activeCar.year}
                  </p>

                  <h3 className="text-3xl md:text-5xl font-semibold tracking-tight leading-none mb-4">
                    {activeCar.name}
                  </h3>

                  <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                    {activeCar.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-white/40 text-xs uppercase tracking-[0.22em] mb-2">
                      Starting At
                    </p>

                    <p className="text-[#c9a96e] text-4xl md:text-5xl font-semibold tracking-tight">
                      ${activeCar.price}
                      <span className="text-white/45 text-sm font-normal ml-1">
                        /day
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
                    <div className="rounded-2xl bg-white/[0.045] px-2 py-3 text-center">
                      <p className="text-white text-lg md:text-2xl font-semibold">
                        {activeCar.zeroToSixty}
                      </p>
                      <p className="text-white/35 text-[10px] md:text-xs mt-1">
                        0–60
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/[0.045] px-2 py-3 text-center">
                      <p className="text-white text-lg md:text-2xl font-semibold">
                        {activeCar.power}
                      </p>
                      <p className="text-white/35 text-[10px] md:text-xs mt-1">
                        HP
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/[0.045] px-2 py-3 text-center">
                      <p className="text-white text-lg md:text-2xl font-semibold">
                        {activeCar.miles}
                      </p>
                      <p className="text-white/35 text-[10px] md:text-xs mt-1">
                        mi/day
                      </p>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/16452487305?text=${encodeURIComponent(
                      `Hi, I'm interested in booking the ${activeCar.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#c9a96e] text-black py-4 rounded-full text-sm font-semibold hover:bg-white transition"
                  >
                    Book Now
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
