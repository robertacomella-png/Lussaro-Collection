import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Fleet", href: "#fleet" },
  { label: "How It Works", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: (navLinks.length + 1) * 0.08 }}
              href="https://wa.me/16452487305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a96e] text-white text-lg px-8 py-3 rounded-full font-medium mt-4 cursor-pointer"
            >
              Contact Us
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
