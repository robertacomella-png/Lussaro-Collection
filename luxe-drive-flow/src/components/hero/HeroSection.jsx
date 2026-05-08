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
        className="relative min-h-[90vh] md:min-h-[95vh] w-full overflow-hidden bg-black"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="https://ik.imagekit.io/8i3ae7fac/cars-14.jpg?tr=w-1600,q-85,f-webp"
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
            transition={{ duration: 0.55 }}
            className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs md:text-sm font-medium mb-4"
          >
            MIAMI EXOTIC RENTALS • FROM $795/DAY
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold leading-none mb-6"
          >
            Rent Exotic Cars
            <span className="block text-[#c9a96e]">In Miami</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/60 text-base md:text-lg max-w-md mb-8 font-light"
          >
            Same-day bookings. Seamless experience.
          </motion.p>

          {/* Buttons */}
          <div className="w-full max-w-[360px] md:max-w-[300px] mt-24 md:mt-0">
            <div className="flex flex-col gap-3 items-center w-full">

              {/* PRIMARY */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-black px-8 py-3.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#c9a96e] hover:text-white transition"
              >
                Check Availability
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
              </a>

              {/* DESKTOP ONLY SECONDARY */}
              <button
                onClick={scrollToFleet}
                className="hidden md:block w-full border border-white/20 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/5 transition"
              >
                View Fleet
              </button>

              {/* MOBILE ROW */}
              <div className="grid grid-cols-2 gap-4 w-full md:hidden">
                
                {/* Find Us (neutral now) */}
                <button
                  onClick={() => setLocationOpen(true)}
                  className="flex items-center justify-center gap-2 border border-white/20 text-white px-3 py-3.5 rounded-full text-sm font-medium hover:bg-white/5 transition backdrop-blur-sm"
                >
                  Find Us
                  <MapPin className="w-4 h-4 text-white/70" />
                </button>

                {/* View Fleet */}
                <button
                  onClick={scrollToFleet}
                  className="flex items-center justify-center gap-2 border border-white/20 text-white px-3 py-3.5 rounded-full text-sm font-medium hover:bg-white/5 transition backdrop-blur-sm"
                >
                  View Fleet
                </button>
              </div>

              <p className="text-white/40 text-xs mt-1">
                Instant response on WhatsApp
              </p>

            </div>
          </div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-6 h-6 text-white/40 cursor-pointer" onClick={scrollToFleet} />
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {locationOpen && (
          <motion.div
            className="fixed inset-0 bg-black/75 flex items-center justify-center z-[2000]"
            onClick={() => setLocationOpen(false)}
          >
            <motion.div
              className="bg-[#111] rounded-2xl overflow-hidden w-full max-w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.google.com/maps?q=Lussaro%20Collection&z=16&output=embed"
                className="w-full h-64"
              />
              <button
                onClick={() => setLocationOpen(false)}
                className="absolute top-4 right-4"
              >
                <X className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
