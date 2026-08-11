// Generates responsive WebP variants for the local photos in public/cars and
// public/gallery, written to an `opt/` subfolder next to each original.
//
// Why this exists: the car photos used to live on ImageKit, which resized and
// converted them on the fly. When they moved to local files, getImageKitSrc()
// started returning them untouched — full-size JPEGs, no WebP, and an empty
// srcset. A single car page was shipping 5.6 MB of images.
//
// The variants are committed, so the build stays dependency-free. Re-run with
// `npm run optimize:images` after adding or replacing photos; existing variants
// that are newer than their source are skipped.

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DIRS = ['public/cars', 'public/gallery'];
const WIDTHS = [700, 1200];
const QUALITY = 72;

let made = 0, skipped = 0, savedFrom = 0, savedTo = 0;

for (const dir of DIRS) {
  if (!existsSync(dir)) continue;
  const outDir = path.join(dir, 'opt');
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  for (const file of files) {
    const src = path.join(dir, file);
    const base = file.replace(/\.[^.]+$/, '');
    const srcStat = await stat(src);

    for (const w of WIDTHS) {
      const out = path.join(outDir, `${base}-${w}.webp`);
      if (existsSync(out) && (await stat(out)).mtimeMs > srcStat.mtimeMs) { skipped++; continue; }
      // withoutEnlargement: never upscale a photo that is already smaller.
      await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out);
      made++;
    }

    savedFrom += srcStat.size;
    const big = path.join(outDir, `${base}-1200.webp`);
    if (existsSync(big)) savedTo += (await stat(big)).size;
  }
}

const mb = (n) => (n / 1048576).toFixed(1);
console.log(`generated ${made} variants, skipped ${skipped} up-to-date`);
console.log(`originals ${mb(savedFrom)} MB -> 1200w webp ${mb(savedTo)} MB`);
