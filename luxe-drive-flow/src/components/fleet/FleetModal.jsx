import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function FleetModal({ car, setCar, activeImage, setActiveImage }) {
  useEffect(() => {
    if (car) {
      document.body.style.overflow = "hidden";
      setActiveImage(0);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [car, setActiveImage]);

  const getImages = (vehicle) => vehicle?.images || [vehicle?.image];

  if (!car) {
    return null;
  }

  const images = getImages(car);
  const whatsappText = encodeURIComponent(
    `Hi, I'm interested in booking the ${car.name} with Lussaro Collection.`
  );

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/70 backdrop-blur-xl px-3 py-5 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCar(null)}
        >
          <motion.div
            className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-[30px] md:rounded-[36px] bg-[#111] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCar(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8 p-3 md:p-6">
              <div>
                <div className="overflow-hidden rounded-[24px] bg-black">
                  <motion.img
                    key={images[activeImage]}
                    src={images[activeImage]}
                    alt={car.name}
                    initial={{ opacity: 0.65, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.28 }}
                    className="w-full aspect-[4/3] md:aspect-[16/10] object-cover"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2 md:gap-3 mt-3">
                  {images.map((img, index) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`overflow-hidden rounded-2xl border ${
                        activeImage === index
                          ? "border-[#c9a96e]"
                          : "border-white/10 opacity-60"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${car.name} thumbnail ${index + 1}`}
                        className="w-full aspect-[4/3] object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-white flex flex-col justify-center">
                <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-xs mb-3">
                  {car.make}
                </p>

                <h3 className="text-3xl md:text-5xl font-semibold mb-5">
                  {car.name}
                </h3>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-[0.22em] mb-2">
                      Starting At
                    </p>
                    <p className="text-[#c9a96e] text-3xl md:text-4xl font-semibold">
                      ${car.price.toLocaleString()}
                      <span className="text-white/45 text-sm ml-1">/day</span>
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/16452487305?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[#c9a96e] text-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white transition"
                  >
                    Reserve Now
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-white/5 p-3 rounded-xl text-center">
                    <p>{car.zeroToSixty}</p>
                    <p className="text-xs text-white/40">0–60</p>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl text-center">
                    <p>{car.power}</p>
                    <p className="text-xs text-white/40">HP</p>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl text-center">
                    <p>{car.miles}</p>
                    <p className="text-xs text-white/40">Miles/day</p>
                  </div>
                </div>

                <div className="max-w-md">
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {car.description}
                  </p>

                  <p className="text-white/40 text-xs border-t border-white/10 pt-3">
                    Must be 21+ with a valid driver’s license and full coverage insurance. Security deposit required.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
