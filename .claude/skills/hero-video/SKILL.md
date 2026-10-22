---
name: hero-video
description: Put a video behind the hero on lussarocollection.com, or replace one already there. Covers encoding from a phone/camera export, choosing the crop against where the CTAs sit, wiring it so it never costs LCP, and verifying quality and performance. Use when asked to add, change, re-crop, re-compress or remove a hero video, for mobile or desktop.
---

# Hero video

The mobile hero video shipped on 22 October 2026 and took several hours, almost
all of it spent on two things: **getting the crop right**, and **chasing a
flicker that was a poster-attribute problem**. Both are solved below. Follow
this and a new video is one pass.

**ffmpeg is required and installed** (`brew install ffmpeg`, 22 Oct 2026).
macOS `avconvert` cannot target a bitrate and cannot crop — it produced
360×640 at 3.8 MB where ffmpeg gives 1080×1920 at 1.1 MB. Never use it here.

---

## What is already live

| | |
|---|---|
| File | `luxe-drive-flow/public/hero/hero-mobile.mp4` |
| Encode | 1080×1920, 30 fps, 12.57 s, H.264, **1,128 KB** |
| Crop | `1850:3288:155:500` from a 2160×3840 source |
| Stills | `hero-vertical-{800,1200,1600}.webp`, **same crop, same source, 6 s mark** |
| Desktop | **no video yet** — keeps `hero-perf-rims-1920.webp` |
| Source | `~/Downloads/roller test.mov` (2160×3840, 30 Mbps, 45 MB) |

---

## 1. Probe the source first

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,duration,bit_rate \
  -of default=nw=1 "SOURCE"
```

Write down width, height and duration. Every crop below is arithmetic on those
numbers, and guessing wastes an encode cycle.

## 2. Decide the crop by LOOKING, not by maths alone

**This is where the hours went. Do not skip to encoding.**

Extract candidate frames first — they take seconds, a full encode takes minutes:

```bash
ffmpeg -y -v error -ss 6 -i "SOURCE" -frames:v 1 \
  -vf "crop=W:H:X:Y" /tmp/frame-A.png
```

Then **open the image and look at it.** Judge two things:

1. **Where the subject sits vertically.** The CTA stack occupies roughly the
   bottom 40% of a phone hero. A car centred at 60% of frame lands behind the
   buttons; at 41% it floats with a dead band of road beneath it. **48–66% was
   the accepted answer** after three rejected attempts.
2. **Whether the subject clips at the edges** when it comes closest to camera.
   A 1.33× crop clipped the car's nose; 1.17× did not.

### object-position cannot save a bad crop

On a tall phone the maths rules it out, and this was worked out the hard way:

```
source 2160×3840 (9:16)  → rendered height = 1.78 × width
phone hero ~19.5:9       → box height      = 2.17 × width
1.78 < 2.17  →  object-cover scales by HEIGHT and crops left/right
```

The full vertical frame is already visible, so there is no hidden sky to shift
into view. **Vertical framing must be baked into the encode.**

### The subject drifts

The camera tracks the car, so framing that is right at 6 s is wrong at 2 s. No
crop is correct for a whole clip. Tune to the midpoint, and if the owner keeps
rejecting crops, **propose trimming to a window where the framing holds** —
that fixes composition and halves the file at once.

## 3. Encode

Tuned for this footage specifically: a dark car against a smooth sunset sky,
where the failure mode is **banding, not blockiness**.

```bash
ffmpeg -y -v error -i "SOURCE" \
  -vf "crop=W:H:X:Y,scale=1080:1920:flags=lanczos" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 34 -preset veryslow -tune film \
  -x264-params "aq-mode=3:aq-strength=1.1:psy-rd=1.0,0.15:bframes=8:ref=6" \
  -g 60 -an -movflags +faststart \
  luxe-drive-flow/public/hero/hero-mobile.mp4
```

Every flag earns its place:

| Flag | Why |
|---|---|
| `aq-mode=3 aq-strength=1.1` | Biases bits to dark regions and flat gradients. **This is what lets crf34 hold** — untuned, crf30 was already larger AND scored lower |
| `-preset veryslow` | 5% smaller than `slow` at identical quality. Free |
| `-tune film` | Live action, not animation |
| `-an` | The hero is muted. The source carried 143 kbps of AAC — pure waste |
| `-movflags +faststart` | Moves the index to the front so playback starts before the full download |
| `-g 60` | Keyframe every 2 s, for clean looping |

### Measured, so nobody re-derives it

| | Size | SSIM |
|---|---|---|
| crf26 `slow` (first ship) | 2,447 KB | 0.9883 |
| crf30 tuned | 1,719 KB | 0.9866 |
| crf32 tuned | 1,381 KB | 0.9849 |
| **crf34 tuned — shipped** | **1,128 KB** | **0.9827** |

**Rejected, with reasons:** VP9 (1,972 KB at comparable quality — worse than
H.264 here and needs a second `<source>`); `hqdn3d` denoise (45 KB saved, cost
quality); 24 fps (138 KB, but changes the motion the owner shot).

## 4. Cut the stills from the SAME frame

The photo that paints first **must be a frame of the video.** It was a
different shoot until 22 Oct and the handover read as a cut between two
unrelated images.

```bash
ffmpeg -y -v error -ss 6 -i "SOURCE" -frames:v 1 -vf "crop=W:H:X:Y" /tmp/still.png
node -e "
const sharp=require('sharp');
Promise.all([800,1200,1600].map(w =>
  sharp('/tmp/still.png').resize(w).webp({quality:80,effort:6})
    .toFile('public/hero/hero-vertical-'+w+'.webp')
)).then(r=>r.forEach(i=>console.log(i.width+'x'+i.height, Math.round(i.size/1024)+' KB')));
"
```

Same crop, same timestamp, same source. Regenerate both together or they drift.

## 5. Wire it — the parts that are load-bearing

Current markup is in `src/pages/index.astro`. Do not simplify any of this.

| Rule | Why |
|---|---|
| **The `<picture>` stays and keeps `fetchpriority="high"`** | A `<video>` can never be the LCP element. Remove the image and the first paint is blank |
| **No `poster` attribute** | A poster plus a later `.src` assignment causes a **three-way flicker**: photo → poster → element reloads and goes transparent so the photo shows again → video. This is the bug that ate an afternoon |
| **`opacity-0`, reveal on `playing`** | Not `canplay`. `playing` is the first moment real frames exist. A stalled decode then just keeps the photograph |
| **`muted` property set in JS**, not only the attribute | Safari and Chrome check the property before permitting autoplay |
| **`matchMedia`, not `<source media>`** | WebKit ignores `media` on `<source>` inside `<video>`. It works in `<picture>`, which is why the images use it |
| **`preload="none"` + src attached in JS** | Desktop never downloads the file at all |
| **Attach on `window.load`** | At parse time the download competes with the LCP image for bandwidth |
| **Honour `prefers-reduced-motion`** | `index.css` respects it in three other places |
| **`?video=1` forces it on at any width** | Review aid. Without it you cannot see the mobile hero on a desktop browser |

## 6. Verify — all three, in order

**Quality.** Encode a lossless reference of the same crop, then compare:

```bash
ffmpeg -y -v error -i "SOURCE" -vf "crop=W:H:X:Y,scale=1080:1920" \
  -c:v libx264 -qp 0 -preset ultrafast -an /tmp/ref.mp4
ffmpeg -nostats -hide_banner -i NEW.mp4 -i /tmp/ref.mp4 -lavfi "ssim" -f null - 2>&1 | grep All:
```

Target **SSIM ≥ 0.98**.

**Banding.** SSIM does not catch it and it is the real failure mode here. Crop
the sky and stretch contrast — if it is going to band, this shows it:

```bash
ffmpeg -y -v error -ss 6 -i NEW.mp4 -frames:v 1 \
  -vf "crop=1080:700:0:150,eq=contrast=2.2:brightness=0.06,scale=760:-1" /tmp/band.png
```

Open it. Smooth gradients and a clean lamp-post edge = ship it.

**Performance.** Headless, never the owner's Chrome:

```bash
npx --yes lighthouse https://www.lussarocollection.com/ \
  --only-categories=performance --form-factor=mobile --screenEmulation.mobile \
  --chrome-flags="--headless=new --no-sandbox --disable-extensions --disable-gpu" \
  --output=json --output-path=/tmp/lh.json --quiet
```

**His Chrome extensions cost 23 points and ~900 ms of TBT.** Three of his runs
gave 65, 71, 65 while headless gave 88, 89, 91 on the identical page. If a
report shows "Chrome extensions negatively affected this page's load
performance", the numbers are unusable — say so rather than acting on them.

Expect **88–91, TBT 300–430 ms**. Lighthouse swings ±3–4 points even headless,
so one low run is not a regression. Run it three times before concluding
anything.

---

## Doing the desktop version

Not built yet. The landscape source has not been supplied. What changes:

- **Breakpoint flips.** Mobile is `md:hidden` + `max-width: 767px`. Desktop is
  `hidden md:block` + `min-width: 768px`. Both gates must flip together.
- **The desktop still is `hero-perf-rims-1920.webp`** (1920×1280). Replace it
  with a frame of the landscape video, same rule as step 4.
- **Resolution target is 1920×1080**, not 1080×1920. Scale accordingly; the
  encode flags are unchanged.
- **The crop problem inverts.** A landscape hero is short and wide, so
  `object-cover` crops top and bottom and `object-position` *does* work
  vertically. Still extract frames and look before encoding.
- **Both videos can coexist.** One `<video>` element, source chosen by the same
  `matchMedia` call — do not add a second element.

## What is deliberately NOT done

- **No `<source>` fallback chain.** VP9 and AV1 were measured and are not worth
  the complexity at this size.
- **No cellular detection.** The Network Information API could skip the video
  on a metered connection. Raised, not built. 1.1 MB after `window.load` was
  judged acceptable.
- **The clip is the full 12.57 s export.** Owner's call — he wants it as shot.
  Trimming is the largest remaining lever: 6 s would roughly halve it again.
