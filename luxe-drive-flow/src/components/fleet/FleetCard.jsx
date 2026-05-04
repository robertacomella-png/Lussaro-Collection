import { MessageCircle } from "lucide-react";
import { getImageKitSrc } from "@/lib/imageKit";

export default function FleetCard({ car, onOpen }) {
  const message = encodeURIComponent(
    `Hi, I'm interested in booking the ${car.name}.`
  );

  const imageSrc = getImageKitSrc(car.images?.[0] || car.image, 700);

  return (
    <button
      type="button"
      onClick={() => onOpen(car)}
      className="group text-left rounded-[22px] md:rounded-[28px] bg-[#111] overflow-hidden shadow-xl border border-[#c9a96e]/25 hover:border-[#c9a96e]/50 transition-all duration-300"
    >
      <div className="relative m-2.5 md:m-4 overflow-hidden rounded-[16px] md:rounded-[22px]">
        <img
          src={imageSrc}
          alt={car.name}
          width="700"
          height="520"
          loading="lazy"
          decoding="async"
          className="w-full aspect-[1.2/1] md:aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white text-[17px] md:text-2xl leading-tight font-semibold tracking-tight">
            {car.name}
          </h3>
        </div>
      </div>

      <div className="px-3.5 md:px-5 pb-3.5 md:pb-5 text-white">
        <div className="mb-3">
          <p className="text-[#c9a96e] text-[20px] md:text-3xl leading-none font-semibold tracking-tight">
            ${car.price.toLocaleString()}
            <span className="text-white/45 text-xs md:text-sm font-normal ml-1">
              /day
            </span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-1.5 mb-3.5">
          <div className="rounded-xl bg-white/[0.04] px-1.5 py-2 text-center">
            <p className="text-white text-[12px] md:text-sm font-medium">
              {car.zeroToSixty}
            </p>
            <p className="text-white/35 text-[9px] md:text-[11px] mt-0.5">
              0–60
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.04] px-1.5 py-2 text-center">
            <p className="text-white text-[12px] md:text-sm font-medium">
              {car.power}
            </p>
            <p className="text-white/35 text-[9px] md:text-[11px] mt-0.5">
              HP
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.04] px-1.5 py-2 text-center">
            <p className="text-white text-[12px] md:text-sm font-medium">
              {car.miles}
            </p>
            <p className="text-white/35 text-[9px] md:text-[11px] mt-0.5">
              mi/day
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/16452487305?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 w-full bg-[#c9a96e] text-black py-2.5 md:py-3 rounded-xl text-sm md:text-base font-semibold hover:bg-white transition"
        >
          Reserve Now
        </a>
      </div>
    </button>
  );
}
