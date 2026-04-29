import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, MapPin, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [locationOpen, setLocationOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide based on scroll direction
      if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setHidden(false);
      } else if (currentScrollY > 50) {
        // Scrolling down and past threshold - hide navbar
        setHidden(true);
      }
      
      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 50);
    };
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setLocationOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-[999] backdrop-blur-md bg-black/60 border-b border-white/[0.06]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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

            <button
              type="button"
              onClick={() => setLocationOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-black text-sm px-5 py-2 rounded-full font-medium hover:bg-[#c9a96e] hover:text-black transition-all duration-300"
            >
              Find Us
              <MapPin className="w-4 h-4 text-black" />
            </button>

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

          {/* Mobile only: static Gallery button */}
          <div className="md:hidden">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center bg-white text-black text-sm px-5 py-2 rounded-full font-medium hover:bg-[#c9a96e] hover:text-black transition-all duration-300"
            >
              Gallery
            </Link>
          </div>
        </div>
      </motion.nav>

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
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl rounded-[28px] overflow-hidden bg-[#111] border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-[220px] md:h-[280px] w-full overflow-hidden">
                  <iframe
                    title="Lussaro Collection Location"
                    src="https://www.google.com/maps?q=Lussaro%20Collection&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111] to-transparent pointer-events-none" />

                <button
                  type="button"
                  onClick={() => setLocationOpen(false)}
                  className="absolute top-4 right-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/45 hover:bg-black/60 border border-white/10 transition-colors backdrop-blur-md"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="px-6 md:px-8 pb-7 pt-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>

                  <div>
                    <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-[11px] font-medium mb-1">
                      Location
                    </p>
                    <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-tight">
                      Lussaro Collection
                    </h3>
                  </div>
                </div>

                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                  900 Biscayne Blvd, Miami, FL 33132
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://maps.app.goo.gl/RidmvBDNjdWNofCU6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-[#c9a96e] hover:text-black transition-all duration-300"
                  >
                    Open in Google Maps
                    <MapPin className="w-4 h-4 text-black" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setLocationOpen(false)}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-white border border-white/15 hover:bg-white/5 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
