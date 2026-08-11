// Regenerates the favicon set from public/favicon.png (the 512px brand mark).
//
//   node scripts/make-favicon.mjs
//
// Produces:
//   public/favicon.ico   — 16/32/48, the file browsers and Google request by
//                          default at /favicon.ico even with no <link> tag
//   public/favicon-96.png — 96x96, a multiple of 48 as Google's favicon
//                          guidance asks for (the 512px master is not one)
//
// Run this again if the brand mark changes; nothing else regenerates it.

import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'public', 'favicon.png');
const ICO_SIZES = [16, 32, 48];

const png = (size) =>
  sharp(SRC).resize(size, size, { fit: 'cover' }).png({ compressionLevel: 9 }).toBuffer();

/**
 * Wrap PNG buffers in an ICO container. ICO entries may hold PNG data directly
 * (supported by every browser since IE11), so no BMP encoding is needed.
 */
function buildIco(images) {
  const HEADER = 6;
  const ENTRY = 16;
  const header = Buffer.alloc(HEADER);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = HEADER + ENTRY * images.length;
  const entries = [];
  for (const { size, data } of images) {
    const e = Buffer.alloc(ENTRY);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette colours
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const images = [];
for (const size of ICO_SIZES) images.push({ size, data: await png(size) });

writeFileSync(path.join(ROOT, 'public', 'favicon.ico'), buildIco(images));
writeFileSync(path.join(ROOT, 'public', 'favicon-96.png'), await png(96));

console.log(`favicon.ico    ${ICO_SIZES.join('/')}  ${buildIco(images).length} bytes`);
console.log(`favicon-96.png 96x96`);
