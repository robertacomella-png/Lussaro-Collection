export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-[#c9a96e] text-xl font-semibold tracking-tight">
            Lussaro Collection
          </h3>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Miami luxury and exotic car rentals with premium delivery, insider service, and first-class attention.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm uppercase tracking-[0.25em] mb-4">
            Explore
          </h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li>
              <a href="/#fleet" className="hover:text-white transition-colors">
                Fleet
              </a>
            </li>
            <li>
              <a href="/gallery" className="hover:text-white transition-colors">
                Gallery
              </a>
            </li>
            <li>
              <a href="/exotic-car-rental-miami" className="hover:text-white transition-colors">
                Exotic Car Rental Miami
              </a>
            </li>
            <li>
              <a href="/lamborghini-rental-miami" className="hover:text-white transition-colors">
                Lamborghini Rental Miami
              </a>
            </li>
            <li>
              <a href="/g-wagon-rental-miami" className="hover:text-white transition-colors">
                G-Wagon Rental Miami
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm uppercase tracking-[0.25em] mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li>Miami, Florida</li>
            <li>
              <a
                href="https://wa.me/16452487305"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                WhatsApp Booking
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/9nEuwbuyZzhGTQscA"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Google Business
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm uppercase tracking-[0.25em] mb-4">
            Social
          </h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li>
              <a
                href="https://instagram.com/lussarocollection"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/9nEuwbuyZzhGTQscA"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Google Reviews
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col gap-4 text-white/40 text-xs md:flex-row md:justify-between md:items-center">
        <p>© {new Date().getFullYear()} Lussaro Collection. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          <a href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
