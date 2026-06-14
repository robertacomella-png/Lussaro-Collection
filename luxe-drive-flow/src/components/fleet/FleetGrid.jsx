import { useState } from "react";
import FleetCard from "./FleetCard";
import FleetModal from "./FleetModal";
import { fleet } from "@/data/fleet";

// Interactive fleet grid (cards + detail modal).
// `match` = array of keywords; a car shows if its name or make contains any. Omit = all.
export default function FleetGrid({ match }) {
  const [activeCar, setActiveCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const cars = match && match.length
    ? fleet.filter((c) =>
        match.some((k) => `${c.name} ${c.make}`.toLowerCase().includes(k.toLowerCase()))
      )
    : fleet;

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cars.map((car) => (
          <FleetCard key={car.id} car={car} onOpen={setActiveCar} />
        ))}
      </div>

      <FleetModal
        car={activeCar}
        setCar={setActiveCar}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
      />
    </>
  );
}
