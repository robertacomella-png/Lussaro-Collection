import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Fleet", href: "#fleet" },
  { label: "How It Works", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);

    if (location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }

    const el = document.querySelector(href);

    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-white text-lg font-semibold tracking-tight cursor-pointer"
          >
            LUSSARO<span className="text-[#c9a96e]">COLLECTION</span>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 rounded-full text-white/60 hover:text-white text-sm font-light transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <Link
              to="/gallery"
              className="px-4 py-2 rounded-full text-white/60 hover:text-white text-sm font-light transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              Gallery
            </Link>

            <button
              type="button"
              onClick={() => setLocationOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-black text-sm px-5 py-2 rounded-full font-medium hover:bg-[#c9a96e] hover:text-white transition-all duration-500"
            >
              Find Us
              <MapPin className="w-4 h-4 text-[#c9a96e]" />
            </button>

            <a
              href="https://wa.me/16452487305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black text-sm px-5 py-2 rounded-full font-medium hover:bg-[#c9a96e] hover:text-white transition-all duration-500 relative z-[1000]"
            >
              Contact Us
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[998] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleNav(link.href)}
                className="text-white text-2xl font-light tracking-tight cursor-pointer px-4 py-2"
              >
                {link.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: navLinks.length * 0.08 }}
            >
              <Link
                to="/gallery"
                onClick={() => setMobileOpen(false)}
                className="text-white text-2xl font-light tracking-tight cursor-pointer px-4 py-2"
              >
                Gallery
              </Link>
            </motion.div>

            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: (navLinks.length + 1) * 0.08 }}
              onClick={() => {
                setMobileOpen(false);
                setLocationOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-white text-black text-lg px-8 py-3 rounded-full font-medium mt-2"
            >
              Find Us
              <MapPin className="w-5 h-5 text-[#c9a96e]" />
            </motion.button>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: (navLinks.length + 2) * 0.08 }}
              href="https://wa.me/16452487305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a96e] text-white text-lg px-8 py-3 rounded-full font-medium mt-2 cursor-pointer"
            >
              Contact Us
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {locationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setLocationOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl rounded-3xl bg-[#111] border border-white/10 p-6 md:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-[11px] font-medium mb-3">
                    Location
                  </p>
                  <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
                    Find Us
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setLocationOpen(false)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10 mb-5">
                <iframe
                  title="Lussaro Collection Location"
                  src="https://www.google.com/maps?q=900%20Biscayne%20Blvd%20Miami%20FL%2033132&z=15&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                900 Biscayne Blvd, Miami, FL 33132
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=900+Biscayne+Blvd+Miami+FL+33132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-[#c9a96e] hover:text-white transition-all duration-300"
                >
                  Open in Google Maps
                  <MapPin className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setLocationOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-white border border-white/15 hover:bg-white/5 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
