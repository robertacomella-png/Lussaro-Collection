import { MessageCircle, ShieldCheck } from "lucide-react";

export default function FleetCard({ car, onOpen }) {
  const message = encodeURIComponent(
    `Hi, I'm interested in booking the ${car.name}.`
  );

  return (
    <button
      type="button"
      onClick={() => onOpen(car)}
      className="group text-left rounded-[24px] bg-[#111] overflow-hidden shadow-xl border border-white/10 hover:border-[#c9a96e]/40 transition-all duration-300"
    >
      <div className="p-3">
        <div className="overflow-hidden rounded-[18px]">
          <img
            src={car.images?.[0] || car.image}
            alt={car.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="px-4 pb-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg md:text-xl font-semibold">{car.name}</h3>
          <ShieldCheck className="w-5 h-5 text-[#c9a96e]" />
        </div>

        <div className="mb-3">
          <p className="text-[#c9a96e] text-2xl md:text-3xl font-semibold">
            ${car.price}
            <span className="text-white/50 text-xs ml-1">/day</span>
          </p>
        </div>

        <div className="flex justify-between text-xs text-white/60 mb-4">
          <span>{car.zeroToSixty}</span>
          <span>{car.power}hp</span>
          <span>{car.miles}mi/day</span>
        </div>

        <a
          href={`https://wa.me/16452487305?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 w-full bg-[#c9a96e] text-black py-2.5 rounded-lg font-medium hover:bg-white transition"
        >
          Book
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>
    </button>
  );
}
