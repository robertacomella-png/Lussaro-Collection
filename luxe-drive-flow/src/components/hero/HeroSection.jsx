import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, MapPin, X } from "lucide-react";

export default function HeroSection() {
  const [locationOpen, setLocationOpen] = useState(false);

  const scrollToFleet = () => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        id="top"
        className="relative h-[90vh] md:h-[95vh] w-full overflow-hidden bg-black"
      >
        <div className="absolute inset-0 pointer-events-none">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="https://ik.imagekit.io/8i3ae7fac/cars-14.jpg"
            />
            <img
              src="https://ik.imagekit.io/8i3ae7fac/cars-11.jpg"
              alt="Luxury Fleet"
              className="w-full h-full object-cover opacity-60"
            />
          </picture>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/20 to-black" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs md:text-sm font-medium mb-4"
          >
            Premium Automotive Experience
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-none mb-6"
          >
            Drive
            <span className="block text-[#c9a96e]">Extraordinary.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/60 text-base md:text-lg max-w-md mb-6 md:mb-10 font-light"
          >
            Curated luxury vehicles for those who demand nothing less than perfection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full max-w-xs sm:max-w-none mt-32 md:mt-0"
          >
            <div className="flex flex-col gap-4 items-center">
              <button
                onClick={scrollToFleet}
                className="w-full sm:w-auto bg-white text-black px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#c9a96e] hover:text-white transition-all duration-500"
              >
                Explore the Fleet
              </button>

              <div className="grid grid-cols-2 gap-4 w-full md:hidden">
                <a
                  href="https://wa.me/16452487305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-[#25D366]/50 text-white px-4 py-3.5 rounded-full text-sm font-medium hover:bg-[#25D366]/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => setLocationOpen(true)}
                  className="flex items-center justify-center gap-2 border border-[#c9a96e]/50 text-white px-4 py-3.5 rounded-full text-sm font-medium hover:bg-[#c9a96e]/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <MapPin className="w-4 h-4 text-[#c9a96e]" />
                  Find Us
                </button>
              </div>

              <a
                href="https://wa.me/16452487305"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex w-full sm:w-auto items-center justify-center gap-2 border border-[#25D366]/40 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Book via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={scrollToFleet}
            className="cursor-pointer"
          >
            <ChevronDown className="w-6 h-6 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {locationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/75 backdrop-blur-md flex items-center justify-center px-4"
            onClick={() => setLocationOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl rounded-[28px] overflow-hidden bg-[#111] border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-[220px] md:h-[280px] w-full overflow-hidden">
                  <iframe
                    title="Lussaro Collection Location"
                    src="https://www.google.com/maps?q=900%20Biscayne%20Blvd%20Miami%20FL%2033132&z=15&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111] to-transparent pointer-events-none" />

                <button
                  type="button"
                  onClick={() => setLocationOpen(false)}
                  className="absolute top-4 right-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/45 hover:bg-black/60 border border-white/10 transition-colors backdrop-blur-md"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="px-6 md:px-8 pb-7 pt-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>

                  <div>
                    <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-[11px] font-medium mb-1">
                      Location
                    </p>
                    <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
                      Find Us
                    </h3>
                  </div>
                </div>

                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                  900 Biscayne Blvd, Miami, FL 33132
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=900+Biscayne+Blvd+Miami+FL+33132"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-[#c9a96e] hover:text-black transition-all duration-300"
                  >
                    Open in Google Maps
                    <MapPin className="w-4 h-4 text-black" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setLocationOpen(false)}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-white border border-white/15 hover:bg-white/5 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
