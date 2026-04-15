import { motion } from "framer-motion";
import PhotoSlider from "@/components/gallery/PhotoSlider";

const steps = [
  {
    number: "01",
    title: "Choose Your Car",
    description: "Browse our curated collection and select the vehicle that matches your vision."
  },
  {
    number: "02",
    title: "Book Instantly",
    description: "Reserve in seconds with our streamlined booking. Flexible dates, transparent pricing."
  },
  {
    number: "03",
    title: "Drive Away",
    description: "Your vehicle arrives detailed and ready. The road is yours."
  }
];

export default function ProcessSection() {
  return (
    <section className="bg-[#f5f5f7] py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs font-medium mb-4">
            Seamless Process
          </p>
          <h2 className="text-[#0a0a0a] text-4xl md:text-6xl font-semibold tracking-tight">
            How It Works
          </h2>
        </motion.div>

      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl font-bold text-[#0a0a0a]/[0.04] mb-4 select-none">
                {step.number}
              </div>
              <h3 className="text-[#0a0a0a] text-xl font-semibold tracking-tight mb-3 -mt-4">
                {step.title}
              </h3>
              <p className="text-[#0a0a0a]/40 text-sm leading-relaxed font-light max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <PhotoSlider />
      </div>
    </section>
  );
}