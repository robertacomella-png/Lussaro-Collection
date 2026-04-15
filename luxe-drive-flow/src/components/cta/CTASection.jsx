import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative bg-black py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80"
          alt="Luxury car on road"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs font-medium mb-4"
        >
          Begin Your Journey
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6"
        >
          Ready to Drive
          <span className="block text-[#c9a96e]">Something Special?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/40 text-base md:text-lg font-light max-w-md mx-auto mb-10"
        >
          Contact our team to reserve your vehicle or curate a bespoke driving experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white text-black px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#c9a96e] hover:text-white transition-all duration-500 inline-flex items-center justify-center gap-2"
          >
            Book Now
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="https://wa.me/16452487305"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-500 inline-flex items-center justify-center"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}