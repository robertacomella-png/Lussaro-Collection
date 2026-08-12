import { useEffect, useState } from "react";
import { detectAR, launchAR } from "@/lib/ar";

// Direct "View in AR" launcher for the inline 3D section. Renders nothing on
// devices without AR (e.g. desktop) — the live model is already interactive there,
// so a fullscreen/AR button would be pointless. On iPhone/iPad it opens Quick Look,
// on Android it opens Scene Viewer.
export default function ArButton({ usdz = "/models/urus.usdz", glb = "/models/urus.glb", title = "Lamborghini Urus" }) {
  // Render by default (so the button is in the initial HTML on phones/tablets and
  // never depends on hydration timing). Only HIDE it once we confirm there's no AR
  // — i.e. desktop. iOS is the safe default mode; the effect corrects to android.
  const [mode, setMode] = useState("ios");
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const m = detectAR();
    if (m === "none") setHidden(true);
    else setMode(m);
  }, []);

  if (hidden) return null;

  return (
    <button
      type="button"
      onClick={() => launchAR(mode, { usdz, glb, title })}
      className="mt-6 inline-flex items-center gap-2 bg-white text-black px-9 py-4 rounded-full font-semibold hover:bg-[#ff1516] transition"
    >
      ◆ View in AR
    </button>
  );
}
