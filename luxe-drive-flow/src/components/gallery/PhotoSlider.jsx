import { useEffect, useRef } from "react";

const images = [
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/ecc59a757_IMG_26432.jpg",
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/7ebdf9d30_IMG_26612.jpg",
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/7bb87bf6b_IMG_26712.jpg",
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/d8ca733e4_IMG_26722.jpg",
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/a4c17e667_cars-02.jpg",
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/6df0e2468_cars-04.jpg",
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/158556eca_cars-06.jpg",
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/9cd4fcd1c_IMG_17492.jpg",
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/1484ceb49_IMG_17622.jpg",
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/36741a178_IMG_18042.jpg",
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/9c270b1a5_cars-07.jpg",
  "https://media.base44.com/images/public/69b59b78bb7c4287b9d0e82d/ba2a3644a_cars-08.jpg",
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