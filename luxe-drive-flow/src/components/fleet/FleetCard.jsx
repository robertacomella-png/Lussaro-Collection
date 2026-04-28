import { MessageCircle, ShieldCheck } from "lucide-react";

export default function FleetCard({ car }) {
  const message = encodeURIComponent(
    `Hi, I'm interested in booking the ${car.name}.`
  );

  return (
    <div className="group rounded-[28px] bg-[#111] overflow-hidden shadow-xl">
      <div className="p-4">
        <div className="overflow-hidden rounded-[22px]">
          <img
            src={car.image}
            alt={car.name}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="px-5 pb-5 text-white">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="text-2xl font-semibold tracking-tight">{car.name}</h3>
          <ShieldCheck className="w-6 h-6 text-[#c9a96e] shrink-0" />
        </div>

        <div className="mt-5 border-t border-white/10 pt-5">
          <p className="text-white/45 text-xs uppercase tracking-[0.22em] mb-2">
            Starting At
          </p>

          <p className="text-[#c9a96e] text-4xl font-semibold tracking-tight">
            ${car.price}
            <span className="text-white/55 text-sm font-normal"> / day</span>
          </p>

          <p className="text-white/40 text-xs mt-2">
            {car.miles} miles per day included
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 mb-6 text-center">
          <div>
            <p className="text-white text-2xl font-semibold">
              {car.zeroToSixty}
            </p>
            <p className="text-white/40 text-xs mt-1">(0–60)</p>
          </div>

          <div>
            <p className="text-white text-2xl font-semibold">{car.power}hp</p>
            <p className="text-white/40 text-xs mt-1">Power</p>
          </div>

          <div>
            <p className="text-white text-2xl font-semibold">{car.miles}</p>
            <p className="text-white/40 text-xs mt-1">Miles/day</p>
          </div>
        </div>

        <a
          href={`https://wa.me/16452487305?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#c9a96e] text-black py-3 rounded-xl font-semibold hover:bg-white transition"
        >
          Book Now
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
