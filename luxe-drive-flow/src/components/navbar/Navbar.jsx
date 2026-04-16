import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setLocationOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
            <Link
              to="/gallery"
              className="px-4 py-2 rounded-full text-white/60 hover:text-white text-sm font-light transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Gallery
            </Link>

            {/* FIND US BUTTON */}
            <button
              type="button"
              onClick={() => setLocationOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-black text-sm px-5 py-2 rounded-full font-medium hover:bg-[#c9a96e] hover:text-black transition-all duration-300"
            >
              Find Us
              <MapPin className="w-4 h-4 text-[#c9a96e]" />
            </button>

            {/* CONTACT BUTTON */}
            <a
              href="https://wa.me/16452487305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black text-sm px-5 py-2 rounded-full font-medium hover:bg-[#c9a96e] hover:text-black transition-all duration-300"
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[998] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            <Link
              to="/gallery"
              onClick={() => setMobileOpen(false)}
              className="text-white text-2xl font-light tracking-tight"
            >
              Gallery
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setLocationOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-white text-black text-lg px-8 py-3 rounded-full font-medium hover:bg-[#c9a96e] transition-all duration-300"
            >
              Find Us
              <MapPin className="w-5 h-5 text-[#c9a96e]" />
            </button>

            <a
              href="https://wa.me/16452487305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black text-lg px-8 py-3 rounded-full font-medium hover:bg-[#c9a96e] transition-all duration-300"
            >
              Contact Us
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GOOGLE MAP POPUP */}
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
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              className="w-full max-w-2xl rounded-2xl overflow-hidden bg-[#111] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                title="Location"
                src="https://www.google.com/maps?q=900%20Biscayne%20Blvd%20Miami%20FL%2033132&z=15&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
              />

              <div className="p-6">
                <h3 className="text-white text-xl font-semibold mb-2">
                  900 Biscayne Blvd
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Miami, FL 33132
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=900+Biscayne+Blvd+Miami+FL+33132"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-[#c9a96e] transition-all duration-300"
                >
                  Open in Maps
                  <MapPin className="w-4 h-4 text-[#c9a96e]" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
