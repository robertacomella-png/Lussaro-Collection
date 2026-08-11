const SITE_HOST = "www.lussarocollection.com";

// Local photos under /cars and /gallery have pre-generated WebP variants in an
// `opt/` subfolder (see scripts/optimize-images.mjs). Route them there so they
// get real resizing, WebP, and a working srcset — none of which the ImageKit
// path can do, because it only rewrites ik.imagekit.io URLs.
const LOCAL_OPT = /^\/(cars|gallery)\/([\w.-]+)\.(?:jpe?g|png)$/i;

function localVariant(url, width) {
  const m = typeof url === "string" && url.match(LOCAL_OPT);
  if (!m) return null;
  const [, dir, base] = m;
  return `/${dir}/opt/${base}-${width <= 700 ? 700 : 1200}.webp`;
}

function localSrcSet(url) {
  const a = localVariant(url, 700);
  const b = localVariant(url, 1200);
  return a && b ? `${a} 700w, ${b} 1200w` : null;
}

function normalizeExternalUrl(originalUrl) {
  if (!originalUrl) return originalUrl;
  if (originalUrl.startsWith("/")) {
    return `https://${SITE_HOST}${originalUrl}`;
  }

  return originalUrl;
}

function getQuality(width) {
  return width === 1200 ? 70 : 65;
}

export function getImageKitSrc(originalUrl, width) {
  const local = localVariant(originalUrl, width);
  if (local) return local;
  if (!originalUrl || !originalUrl.includes("ik.imagekit.io")) {
    return originalUrl;
  }

  const [baseUrl] = originalUrl.split("?");
  const q = getQuality(width);
  return `${baseUrl}?tr=w-${width},q-${q},f-webp`;
}

export function getImageKitSrcSet(originalUrl) {
  const local = localSrcSet(originalUrl);
  if (local) return local;
  if (!originalUrl || !originalUrl.includes("ik.imagekit.io")) {
    // No candidates available — return undefined so no empty srcset is emitted.
    return undefined;
  }

  return `${getImageKitSrc(originalUrl, 700)} 700w, ${getImageKitSrc(originalUrl, 1200)} 1200w`;
}

export function getImageKitSizes() {
  return "(min-width: 768px) 360px, 100vw";
}

export function getRemoteWebpSrc(originalUrl, width) {
  const local = localVariant(originalUrl, width);
  if (local) return local;
  const normalizedUrl = normalizeExternalUrl(originalUrl);
  if (!normalizedUrl) return originalUrl;

  const q = getQuality(width);
  return `https://images.weserv.nl/?url=${encodeURIComponent(normalizedUrl)}&output=webp&w=${width}&q=${q}`;
}

export function getRemoteWebpSrcSet(originalUrl) {
  if (!originalUrl) return undefined;
  const local = localSrcSet(originalUrl);
  if (local) return local;
  return `${getRemoteWebpSrc(originalUrl, 700)} 700w, ${getRemoteWebpSrc(originalUrl, 1200)} 1200w`;
}

export function getRemoteWebpSizes() {
  return "(min-width: 768px) 700px, 100vw";
}
