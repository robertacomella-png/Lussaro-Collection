export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-[#c9a96e] text-xl font-semibold mb-3">
            Lussaro Collection
          </h3>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Luxury car rental experience in Miami. Designed for those who expect more.
          </p>
        </div>

        {/* NAV */}
        <div>
          <h4 className="text-white text-sm uppercase tracking-[0.2em] mb-4">
            Explore
          </h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li><a href="#fleet" className="hover:text-white">Fleet</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white text-sm uppercase tracking-[0.2em] mb-4">
            Contact
          </h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>Miami, Florida</li>
            <li>
              <a
                href="https://wa.me/16452487305"
                target="_blank"
                className="hover:text-white"
              >
                WhatsApp Booking
              </a>
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="text-white text-sm uppercase tracking-[0.2em] mb-4">
            Follow Us
          </h4>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>
              <a
                href="https://instagram.com/lussarocollection"
                target="_blank"
                className="hover:text-white"
              >
                Instagram
              </a>
            </li>

            <li>
              <a
                href="https://maps.app.goo.gl/9nEuwbuyZzhGTQscA"
                target="_blank"
                className="hover:text-white"
              >
                Google Reviews
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* LEGAL */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-white/40 text-xs">
        <p>© {new Date().getFullYear()} Lussaro Collection. All rights reserved.</p>

        <div className="flex gap-6">
          <a href="/terms" className="hover:text-white">Terms of Service</a>
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
