import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const galleryImages = [
  "/gallery-1.jpg",
  "/gallery-2.jpg",
  "/gallery-3.jpg",
  "/gallery-4.jpg",
  "/gallery-5.jpg",
  "/gallery-6.jpg",
  "/gallery-7.jpg",
  "/gallery-8.jpg",
  "/gallery-9.jpg",
  "/gallery-10.jpg",
  "/gallery-11.jpg",
  "/gallery-12.jpg",
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedImage =
    selectedIndex !== null ? galleryImages[selectedIndex] : null;

  const openViewer = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeViewer = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  };

  const showPrev = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const showNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % galleryImages.length
    );
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const imageCountLabel = useMemo(() => {
    if (selectedIndex === null) return "";
    return `${selectedIndex + 1} / ${galleryImages.length}`;
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section id="top" className="relative pt-28 md:pt-32 pb-10 md:pb-14">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10 md:mb-14"
          >
            <p className="text-[#c9a96e] tracking-[0.32em] uppercase text-[11px] md:text-xs font-medium mb-4">
              Curated Visual Archive
            </p>

            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-none">
                  Gallery
                </h1>
                <p className="text-white/55 text-sm md:text-base mt-5 max-w-2xl leading-relaxed">
                  A closer look at the vehicles, moments, and details that define
                  the Lussaro experience.
                </p>
              </div>

              <p className="text-white/30 text-xs md:text-sm">
                {galleryImages.length} images
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="columns-2 md:columns-3 xl:columns-4 2xl:columns-5 gap-4 md:gap-5 [column-fill:_balance]"
          >
            {galleryImages.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => openViewer(index)}
                className="group relative mb-4 md:mb-5 w-full overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] break-inside-avoid cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-[11px] md:text-xs tracking-wide bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    View
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/92 backdrop-blur-2xl"
          >
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-5 z-20">
              <div className="text-white/60 text-sm tracking-wide">
                {imageCountLabel}
              </div>

              <button
                type="button"
                onClick={closeViewer}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-16">
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt="Expanded gallery image"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28 }}
                className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>

            <button
              type="button"
              onClick={showPrev}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <button
              type="button"
              onClick={closeViewer}
              className="absolute inset-0 -z-10 cursor-default"
              aria-label="Close image viewer backdrop"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
