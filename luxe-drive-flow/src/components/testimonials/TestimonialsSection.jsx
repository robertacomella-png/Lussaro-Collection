import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Francesco F.",
    role: "Toronto, ON",
    text: "I run a private jet charter company and one my clients needed a Maybach on short notice and these guys took care of him and handled it perfectly. Had the vehicle cleaned and ready to go at the FBO in a 1.5 hours. Will definitely be using these guys again",
    rating: 5,
  },
  {
    id: 2,
    name: "Kiarash V.",
    role: "Toronto, ON",
    text: "Had an amazing experience renting from them. Went down with family for the weekend & wanted to experience Miami properly so we got the Lussaro Maybach! The car was awesome! Smooth and easy process from start to finish, highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Chase S.",
    role: "Fort Lauderdale, FL",
    text: "Overall great experience! Robert provided excellent service, communicated properly and assisted with any questions we had. The Lamborghini Urus was delivered on time and as described! Would highly recommend booking with this company.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
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
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c9a96e] text-[#c9a96e]" />
                ))}
              </div>

              <p className="text-white/60 text-sm leading-relaxed font-light mb-8">
                "{testimonial.text}"
              </p>

              <div>
                <p className="text-white font-medium text-sm">
                  {testimonial.name}
                </p>
                <p className="text-white/30 text-xs mt-0.5">
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
