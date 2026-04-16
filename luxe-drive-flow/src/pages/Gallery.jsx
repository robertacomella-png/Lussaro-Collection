import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";

const galleryImages = [
  "/gallery/gallery-1.jpg",
  "/gallery/gallery-2.jpg",
  "/gallery/gallery-3.jpg",
  "/gallery/gallery-4.jpg",
  "/gallery/gallery-5.jpg",
  "/gallery/gallery-6.jpg",
  "/gallery/gallery-7.jpg",
  "/gallery/gallery-8.jpg",
  "/gallery/gallery-9.jpg",
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const thumbnailStripRef = useRef(null);

  const selectedImage =
    selectedIndex !== null ? galleryImages[selectedIndex] : null;

  const openViewer = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const closeViewer = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + galleryImages.length) % galleryImages.length;
    });
  }, []);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % galleryImages.length;
    });
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [selectedIndex]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, closeViewer, showPrev, showNext]);

  useEffect(() => {
    if (selectedIndex === null || !thumbnailStripRef.current) return;

    const activeThumb = thumbnailStripRef.current.querySelector(
      `[data-thumb-index="${selectedIndex}"]`
    );

    activeThumb?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedIndex]);

  const imageCountLabel = useMemo(() => {
    if (selectedIndex === null) return "";
    return `${selectedIndex + 1} / ${galleryImages.length}`;
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section id="top" className="relative pt-28 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="columns-2 md:columns-3 xl:columns-4 2xl:columns-5 gap-4 md:gap-5 [column-fill:_balance]"
          >
            {galleryImages.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => openViewer(index)}
                className="group mb-4 md:mb-5 block w-full break-inside-avoid cursor-pointer"
              >
                <div className="overflow-hidden rounded-[24px] bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-500 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                  <img
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-[24px] transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:brightness-105"
                    loading="lazy"
                  />
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {selectedImage && (
          <motion.div
            key="viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl"
          >
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50"
              onClick={closeViewer}
            />

            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-5">
              <div className="text-white/65 text-sm tracking-wide">
                {imageCountLabel}
              </div>

              <button
                type="button"
                onClick={closeViewer}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 md:px-16 pb-28 md:pb-36">
              <motion.div
                key={selectedImage}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) showNext();
                  if (info.offset.x > 80) showPrev();
                }}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="max-w-full max-h-[82vh] md:max-h-[84vh] touch-pan-y"
              >
                <img
                  src={selectedImage}
                  alt="Expanded gallery image"
                  className="max-w-full max-h-[82vh] md:max-h-[84vh] object-contain rounded-[26px] shadow-[0_20px_80px_rgba(0,0,0,0.55)] select-none"
                  draggable={false}
                />
              </motion.div>
            </div>

            <button
              type="button"
              onClick={showPrev}
              className="hidden md:inline-flex absolute left-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-colors backdrop-blur-md"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              type="button"
              onClick={showNext}
              className="hidden md:inline-flex absolute right-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-colors backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: "easeOut", delay: 0.06 }}
              className="absolute left-0 right-0 bottom-0 z-20 px-4 md:px-8 pb-4 md:pb-6"
            >
              <div className="mx-auto max-w-6xl rounded-[24px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl px-3 py-3 md:px-4 md:py-4">
                <div
                  ref={thumbnailStripRef}
                  className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth"
                >
                  {galleryImages.map((src, index) => {
                    const isActive = index === selectedIndex;

                    return (
                      <button
                        key={src}
                        type="button"
                        data-thumb-index={index}
                        onClick={() => setSelectedIndex(index)}
                        className={`relative shrink-0 overflow-hidden rounded-2xl transition-all duration-300 ${
                          isActive
                            ? "opacity-100 ring-1 ring-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                            : "opacity-45 hover:opacity-75"
                        }`}
                      >
                        <img
                          src={src}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-2xl"
                          draggable={false}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
