import { useEffect, useRef } from "react";

const images = [
  "/gallery-slider/slider-1.jpg",
  "/gallery-slider/slider-2.jpg",
  "/gallery-slider/slider-3.jpg",
  "/gallery-slider/slider-4.jpg",
  "/gallery-slider/slider-5.jpg",
  "/gallery-slider/slider-6.jpg",
  "/gallery-slider/slider-7.jpg",
  "/gallery-slider/slider-8.jpg",
  "/gallery-slider/slider-9.jpg",
  "/gallery-slider/slider-10.jpg",
  "/gallery-slider/slider-11.jpg",
  "/gallery-slider/slider-12.jpg",
];

const allImages = [...images, ...images];

export default function PhotoSlider() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5;

    const animate = () => {
      if (!isDraggingRef.current) {
        positionRef.current += speed;
        const halfWidth = track.scrollWidth / 2;
        if (positionRef.current >= halfWidth) positionRef.current = 0;
        if (positionRef.current < 0) positionRef.current = halfWidth - 1;
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = positionRef.current;
    trackRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const delta = dragStartXRef.current - e.clientX;
    const track = trackRef.current;
    const halfWidth = track.scrollWidth / 2;
    let newPos = dragStartPosRef.current + delta;
    if (newPos < 0) newPos = 0;
    if (newPos >= halfWidth) newPos = halfWidth - 1;
    positionRef.current = newPos;
    track.style.transform = `translateX(-${positionRef.current}px)`;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    trackRef.current.style.cursor = "grab";
  };

  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartPosRef.current = positionRef.current;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const delta = dragStartXRef.current - e.touches[0].clientX;
    const track = trackRef.current;
    const halfWidth = track.scrollWidth / 2;
    let newPos = dragStartPosRef.current + delta;
    if (newPos < 0) newPos = 0;
    if (newPos >= halfWidth) newPos = halfWidth - 1;
    positionRef.current = newPos;
    track.style.transform = `translateX(-${positionRef.current}px)`;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        ref={trackRef}
        className="flex gap-3 w-max will-change-transform cursor-grab select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {allImages.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-44 h-44 md:w-56 md:h-56 rounded-xl overflow-hidden"
          >
            <img
              src={src}
              alt={`Car ${(i % images.length) + 1}`}
              width="224"
              height="224"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}