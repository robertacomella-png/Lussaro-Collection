export function getImageKitSrc(originalUrl, width) {
  if (!originalUrl || !originalUrl.includes("ik.imagekit.io")) {
    return originalUrl;
  }

  const [baseUrl] = originalUrl.split("?");
  const q = width === 1200 ? 70 : 65;
  return `${baseUrl}?tr=w-${width},q-${q},f-webp`;
}
