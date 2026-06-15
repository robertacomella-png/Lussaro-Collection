import { useEffect, useRef, useState } from "react";
import { getImageKitSrc, getImageKitSrcSet } from "@/lib/imageKit";

// Swipeable photo carousel for a car's images (dots, snap, morph target on first image).
export default function CarGallery({ images = [], name = "", slug = "" }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const imgs = images.length ? images : [];

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    let f = 0;
    const onScroll = () => {
      cancelAnimationFrame(f);
      f = requestAnimationFrame(() => setActive(Math.round(t.scrollLeft / t.clientWidth)));
    };
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => { t.removeEventListener("scroll", onScroll); cancelAnimationFrame(f); };
  }, []);

  const go = (i) => {
    const t = trackRef.current;
    if (t) t.scrollTo({ left: i * t.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative rounded-[24px] overflow-hidden bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div ref={trackRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
        {imgs.map((img, i) => (
          <img
            key={img}
            src={getImageKitSrc(img, 1200)}
            srcSet={getImageKitSrcSet(img)}
            sizes="(min-width:768px) 1000px, 100vw"
            alt={`${name} — photo ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            className="shrink-0 w-full aspect-[16/11] object-cover snap-center"
          />
        ))}
      </div>

      {imgs.length > 1 && (
        <>
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2">
            {imgs.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"}`}
              />
            ))}
          </div>
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur text-white/80 text-[11px] px-2.5 py-1 rounded-full">
            {active + 1} / {imgs.length}
          </div>
        </>
      )}
    </div>
  );
}
