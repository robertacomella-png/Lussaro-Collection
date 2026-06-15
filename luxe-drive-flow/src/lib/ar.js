// AR launch helpers. iOS/iPadOS uses Quick Look (USDZ); Android uses Scene Viewer (GLB).
//
// Detection is FEATURE-based, not user-agent based. iPadOS 13+ reports a desktop
// Safari UA ("Macintosh"), so a naive /iPad/ test fails on iPad — which is why AR
// only appeared on iPhone before. `relList.supports("ar")` returns true on every
// AR-capable Apple device (iPhone + iPad) and false on real Macs, so it's the
// reliable signal.

export function detectAR() {
  if (typeof navigator === "undefined" || typeof document === "undefined") return "none";
  const ua = navigator.userAgent || "";
  const a = document.createElement("a");
  const supportsQuickLook = !!(a.relList && a.relList.supports && a.relList.supports("ar"));
  // Treat any Apple mobile device as AR-capable (Quick Look). iPhone/iPod/iPad
  // match the UA directly; iPadOS 13+ masquerades as "Macintosh" but reports
  // touch points, so catch that too. The feature check is an extra safety net.
  const isApple =
    /iPhone|iPad|iPod/i.test(ua) ||
    (/Macintosh/i.test(ua) && typeof navigator.maxTouchPoints === "number" && navigator.maxTouchPoints > 1);
  if (supportsQuickLook || isApple) return "ios";
  if (/android/i.test(ua)) return "android";
  return "none";
}

export function launchAR(mode, { usdz = "/models/urus.usdz", glb = "/models/urus.glb", title = "Lamborghini Urus" } = {}) {
  if (mode === "ios") {
    const a = document.createElement("a");
    a.rel = "ar";
    a.href = usdz;
    a.appendChild(document.createElement("img")); // Quick Look requires an <img> child
    document.body.appendChild(a);
    a.click();
    a.remove();
  } else if (mode === "android") {
    const url = new URL(glb, location.href).href;
    const intent =
      `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(url)}` +
      `&mode=ar_preferred&title=${encodeURIComponent(title)}` +
      `#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;` +
      `S.browser_fallback_url=${encodeURIComponent(location.href)};end;`;
    window.location.href = intent;
  }
}
