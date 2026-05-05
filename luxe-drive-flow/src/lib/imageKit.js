const SITE_HOST = "www.lussarocollection.com";

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
  if (!originalUrl || !originalUrl.includes("ik.imagekit.io")) {
    return originalUrl;
  }

  const [baseUrl] = originalUrl.split("?");
  const q = getQuality(width);
  return `${baseUrl}?tr=w-${width},q-${q},f-webp`;
}

export function getImageKitSrcSet(originalUrl) {
  if (!originalUrl || !originalUrl.includes("ik.imagekit.io")) {
    return originalUrl;
  }

  return `${getImageKitSrc(originalUrl, 700)} 700w, ${getImageKitSrc(originalUrl, 1200)} 1200w`;
}

export function getImageKitSizes() {
  return "(min-width: 768px) 360px, 100vw";
}

export function getRemoteWebpSrc(originalUrl, width) {
  const normalizedUrl = normalizeExternalUrl(originalUrl);
  if (!normalizedUrl) return originalUrl;

  const q = getQuality(width);
  return `https://images.weserv.nl/?url=${encodeURIComponent(normalizedUrl)}&output=webp&w=${width}&q=${q}`;
}

export function getRemoteWebpSrcSet(originalUrl) {
  if (!originalUrl) return originalUrl;
  return `${getRemoteWebpSrc(originalUrl, 700)} 700w, ${getRemoteWebpSrc(originalUrl, 1200)} 1200w`;
}

export function getRemoteWebpSizes() {
  return "(min-width: 768px) 700px, 100vw";
}
