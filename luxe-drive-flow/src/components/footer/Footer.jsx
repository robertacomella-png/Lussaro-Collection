export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white text-lg font-semibold tracking-tight">
            LUSSARO<span className="text-[#c9a96e]">COLLECTION</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="text-white/30 text-sm hover:text-white/60 transition-colors">Instagram</a>
          </div>

          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Lussaro Collection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}