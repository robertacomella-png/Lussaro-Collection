import { useState } from "react";
import FleetCard from "./FleetCard";
import FleetModal from "./FleetModal";
import { cars as allCars } from "@/data/cars";

// Interactive fleet grid (cards + detail modal).
//
// Selection, in precedence order:
//   `only`    array of slugs — an explicit whitelist, in the order given.
//             Preferred for topic pages: unambiguous, and immune to a car
//             being renamed or another car matching the same keyword.
//   `match`   array of keywords matched against name + make. Legacy, kept
//             because keyword pages still use it.
//   neither   the whole fleet.
// `exclude` (slugs or keywords) then removes cars from whatever was selected.
//
// The grid also adapts its columns to the number of cars, so a one- or
// two-car topic page reads as a feature rather than a stranded thumbnail.
export default function FleetGrid({ only, match, exclude }) {
  const [activeCar, setActiveCar] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const hay = (c) => `${c.slug} ${c.name} ${c.make}`.toLowerCase();

  let cars;
  if (only && only.length) {
    // Preserve the order the page asked for.
    cars = only.map((s) => allCars.find((c) => c.slug === s)).filter(Boolean);
  } else if (match && match.length) {
    cars = allCars.filter((c) => match.some((k) => hay(c).includes(k.toLowerCase())));
  } else {
    cars = allCars;
  }

  if (exclude && exclude.length) {
    cars = cars.filter((c) => !exclude.some((k) => hay(c).includes(k.toLowerCase())));
  }

  const cols =
    cars.length === 1 ? "grid-cols-1 max-w-md mx-auto"
    : cars.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
    : "grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <div className={`grid ${cols} gap-4 md:gap-6`}>
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
