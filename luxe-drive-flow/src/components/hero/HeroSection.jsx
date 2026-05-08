import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, MapPin, X } from "lucide-react";

export default function HeroSection() {
  const [locationOpen, setLocationOpen] = useState(false);

  const scrollToFleet = () => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  const whatsappLink =
    "https://wa.me/16452487305?text=Hi%2C%20I%27m%20interested%20in%20renting%20the%20Urus.%20What%27s%20availability%3F";

  return (
    <>
      <section
        id="top"
        className="relative min-h-[90vh] md:min-h-[95vh] h-[90vh] md:h-[95vh] w-full overflow-hidden bg-black"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="https://ik.imagekit.io/8i3ae7fac/cars-14.jpg?tr=w-1200,q-70,f-webp"
            />
            <img
              src="https://ik.imagekit.io/8i3ae7fac/cars-11.jpg?tr=w-700,q-65,f-webp"
              alt="Miami luxury exotic car rental fleet"
              className="block w-full h-full object-cover opacity-60"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-[90vh] md:min-h-[95vh] flex-col items-center justify-center px-6 text-center">
          
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs md:text-sm font-medium mb-4"
          >
            MIAMI EXOTIC RENTALS • FROM $795/DAY
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-none mb-6"
          >
            Rent Exotic Cars
            <span className="block text-[#c9a96e]">In Miami</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26 }}
            className="text-white/60 text-base md:text-lg max-w-md mb-6 md:mb-10 font-light"
          >
            Same-day bookings. Seamless experience.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34 }}
            className="w-full max-w-[360px] md:max-w-[300px] mt-32 md:mt-0"
          >
            <div className="flex flex-col gap-3 items-center w-full">

              {/* PRIMARY */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-black px-8 py-3.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#c9a96e] hover:text-white transition-colors duration-300"
              >
                Check Availability
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
              </a>

              {/* SECONDARY */}
              <button
                type="button"
                onClick={scrollToFleet}
                className="w-full border border-white/20 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/5 transition-colors duration-300"
              >
                View Fleet
              </button>

              {/* MOBILE ROW (FIXED) */}
              <div className="grid grid-cols-2 gap-4 w-full md:hidden">
                <button
                  type="button"
                  onClick={() => setLocationOpen(true)}
                  className="flex items-center justify-center gap-2 border border-[#c9a96e]/50 text-white px-3 py-3.5 rounded-full text-sm font-medium hover:bg-[#c9a96e]/10 transition-colors duration-300 backdrop-blur-sm"
                >
                  Find Us
                  <MapPin className="w-4 h-4 text-[#c9a96e]" />
                </button>

                <button
                  type="button"
                  onClick={scrollToFleet}
                  className="flex items-center justify-center gap-2 border border-white/20 text-white px-3 py-3.5 rounded-full text-sm font-medium hover:bg-white/5 transition-colors duration-300 backdrop-blur-sm"
                >
                  View Fleet
                </button>
              </div>

              <p className="text-white/40 text-xs mt-1">
                Instant response on WhatsApp
              </p>

            </div>
          </motion.div>
        </div>

        {/* Scroll */}
        <motion.div
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

      {/* Location Modal */}
      <AnimatePresence>
        {locationOpen && (
          <motion.div
            className="fixed inset-0 z-[2000] bg-black/75 backdrop-blur-md flex items-center justify-center px-4"
            onClick={() => setLocationOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-[28px] overflow-hidden bg-[#111] border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <iframe
                  title="Location"
                  src="https://www.google.com/maps?q=Lussaro%20Collection&z=16&output=embed"
                  className="w-full h-[250px]"
                />
                <button
                  onClick={() => setLocationOpen(false)}
                  className="absolute top-4 right-4"
                >
                  <X className="text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
