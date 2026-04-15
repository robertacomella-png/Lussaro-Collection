import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useRef } from "react";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    base44.entities.Testimonial.list("order", 10).then(setTestimonials);
  }, []);

  const handleBlur = (id, field, value) => {
    base44.entities.Testimonial.update(id, { [field]: value });
  };

  const handleInput = (id, field, value) => {
    setTestimonials(prev =>
      prev.map(t => t.id === id ? { ...t, [field]: value } : t)
    );
  };

  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs font-medium mb-4">
            Testimonials
          </p>
          <h2 className="text-white text-4xl md:text-6xl font-semibold tracking-tight">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c9a96e] text-[#c9a96e]" />
                ))}
              </div>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={e => handleBlur(testimonial.id, "text", e.currentTarget.textContent)}
                className="text-white/60 text-sm leading-relaxed font-light mb-8 outline-none focus:text-white/80 cursor-text"
              >
                "{testimonial.text}"
              </p>
              <div>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => handleBlur(testimonial.id, "name", e.currentTarget.textContent)}
                  className="text-white font-medium text-sm outline-none focus:opacity-80 cursor-text"
                >
                  {testimonial.name}
                </p>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => handleBlur(testimonial.id, "role", e.currentTarget.textContent)}
                  className="text-white/30 text-xs mt-0.5 outline-none focus:opacity-80 cursor-text"
                >
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}