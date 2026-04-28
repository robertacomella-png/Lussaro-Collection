import { MessageCircle } from "lucide-react";

export default function FleetCard({ car, onOpen }) {
  const message = encodeURIComponent(
    `Hi, I'm interested in booking the ${car.name}.`
  );

  return (
    <button
      type="button"
      onClick={() => onOpen(car)}
      className="group text-left rounded-[22px] bg-[#111] overflow-hidden shadow-xl border border-[#c9a96e]/25 hover:border-[#c9a96e]/50 transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={car.images?.[0] || car.image}
          alt={car.name}
          className="w-full aspect-[1.2/1] object-cover"
        />

        {/* 🔥 GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* 🔥 TITLE OVER IMAGE */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white text-[16px] md:text-xl font-semibold leading-tight">
            {car.name}
          </h3>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-3 pb-3 pt-2 text-white">
        {/* PRICE */}
        <p className="text-[#c9a96e] text-2xl md:text-3xl font-semibold mb-2">
          ${car.price}
          <span className="text-white/50 text-xs ml-1">/day</span>
        </p>

        {/* SPECS */}
        <div className="flex justify-between text-xs text-white/60 mb-3">
          <span>{car.zeroToSixty}</span>
          <span>{car.power}hp</span>
          <span>{car.miles}mi/day</span>
        </div>

        {/* BUTTON */}
        <a
          href={`https://wa.me/16452487305?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 w-full bg-[#c9a96e] text-black py-2.5 rounded-lg font-medium hover:bg-white transition"
        >
          Book Now
      
        </a>
      </div>
    </button>
  );
}
