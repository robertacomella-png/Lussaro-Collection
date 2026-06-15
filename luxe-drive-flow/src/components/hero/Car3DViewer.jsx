import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { detectAR, launchAR as launchARFor } from "@/lib/ar";

// The heavy 3D scene loads only when the viewer is opened.
const UrusHero = lazy(() => import("@/components/hero/UrusHero.jsx"));

export default function Car3DViewer() {
  const [open, setOpen] = useState(false);
  const [arMode, setArMode] = useState("none"); // "none" | "ios" | "android"

  // detect AR capability (client only) — feature-based so iPad works too
  useEffect(() => { setArMode(detectAR()); }, []);

  const launchAR = () => launchARFor(arMode);

  useEffect(() => {
    const openIt = () => setOpen(true);
    const onClick = (e) => {
      const trigger = e.target.closest?.("[data-open-3d]");
      if (trigger) { e.preventDefault(); setOpen(true); }
    };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("open-3d", openIt);
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-3d", openIt);
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[3000] flex items-center justify-center p-3 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setOpen(false)} />

          <motion.div
            className="relative w-full max-w-5xl h-[78svh] rounded-[28px] overflow-hidden bg-[#0b0b0d] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.7)] flex flex-col"
            initial={{ scale: 0.94, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <div className="flex items-center justify-between px-5 md:px-7 h-14 shrink-0 border-b border-white/[0.06]">
              <p className="text-[#c9a96e] tracking-[0.25em] uppercase text-[11px]">Lamborghini Urus · 3D</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close 3D viewer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative flex-1">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(58% 60% at 50% 52%, rgba(201,169,110,0.18), transparent 70%)" }} />
              <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center"><div className="w-10 h-10 border-2 border-white/20 border-t-[#c9a96e] rounded-full animate-spin" /></div>}>
                <UrusHero />
              </Suspense>
            </div>

            <div className="flex items-center justify-center gap-4 py-3 shrink-0 border-t border-white/[0.06]">
              <span className="text-white/35 text-[11px] tracking-[0.25em] uppercase">↻ Drag to spin</span>
              {arMode !== "none" && (
                <button
                  type="button"
                  onClick={launchAR}
                  className="inline-flex items-center gap-1.5 bg-[#c9a96e] text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-white transition"
                >
                  ◆ View in AR
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
