import { motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";

export default function HeroSection() {
  const scrollToFleet = () => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[90vh] md:h-[95vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet="https://ik.imagekit.io/8i3ae7fac/cars-14.jpg" />
          <img
            src="https://ik.imagekit.io/8i3ae7fac/cars-11.jpg"
            alt="Luxury Fleet"
            className="w-full h-full object-cover opacity-60"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
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
          className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-xs sm:max-w-none mt-32 md:mt-0"
        >
          <button
            onClick={scrollToFleet}
            className="w-full sm:w-auto bg-white text-black px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#c9a96e] hover:text-white transition-all duration-500"
          >
            Explore the Fleet
          </button>
          <a
            href="https://wa.me/16452487305"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#25D366]/40 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
             Book via WhatsApp
        </a>
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
  );
}
