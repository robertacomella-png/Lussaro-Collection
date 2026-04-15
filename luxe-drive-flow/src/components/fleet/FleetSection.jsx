import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FleetSection() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById("fleet-widget-container");
    if (container && mountRef.current) {
      mountRef.current.appendChild(container);
    }
  }, []);

  return (
    <section id="fleet" className="bg-[hsl(var(--background))] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20">
          
          

          
          <h2 className="text-[#0a0a0a] text-4xl md:text-6xl font-semibold tracking-tight">
            Our Fleet
          </h2>
          <p className="text-[#0a0a0a]/40 mt-4 text-base md:text-lg font-light max-w-lg mx-auto">
            Each vehicle in our collection is meticulously maintained and detailed to showroom standards.
          </p>
        </motion.div>

        <div ref={mountRef} className="rounded-[14px] overflow-hidden" />
      </div>
    </section>);

}