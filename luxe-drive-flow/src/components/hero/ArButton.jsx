import { useEffect, useState } from "react";
import { detectAR, launchAR } from "@/lib/ar";

// Direct "View in AR" launcher for the inline 3D section. Renders nothing on
// devices without AR (e.g. desktop) — the live model is already interactive there,
// so a fullscreen/AR button would be pointless. On iPhone/iPad it opens Quick Look,
// on Android it opens Scene Viewer.
export default function ArButton({ usdz = "/models/urus.usdz", glb = "/models/urus.glb", title = "Lamborghini Urus" }) {
  const [mode, setMode] = useState("none");
  useEffect(() => { setMode(detectAR()); }, []);

  if (mode === "none") return null;

  return (
    <button
      type="button"
      onClick={() => launchAR(mode, { usdz, glb, title })}
      className="mt-6 inline-flex items-center gap-2 bg-[#c9a96e] text-black px-9 py-4 rounded-full font-semibold hover:bg-white transition"
    >
      ◆ View in AR
    </button>
  );
}
