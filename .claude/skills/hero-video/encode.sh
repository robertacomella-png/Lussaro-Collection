#!/usr/bin/env bash
# Hero video pipeline — encode, cut matching stills, verify quality.
#
#   ./encode.sh SOURCE CROP OUT_W OUT_H NAME [TIMESTAMP]
#
#   ./encode.sh ~/Downloads/roller\ test.mov 1850:3288:155:500 1080 1920 mobile 6
#   ./encode.sh ~/Downloads/landscape.mov    3840:2160:0:0      1920 1080 desktop 6
#
# Writes into luxe-drive-flow/public/hero/ and prints size, SSIM and the path
# to a contrast-stretched sky crop for the banding check. LOOK AT THAT IMAGE.
set -euo pipefail

SRC="${1:?source video}"; CROP="${2:?crop W:H:X:Y}"
OW="${3:?output width}"; OH="${4:?output height}"
NAME="${5:?mobile|desktop}"; TS="${6:-6}"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
PUB="$ROOT/luxe-drive-flow/public/hero"
TMP="$(mktemp -d)"
VF="crop=$CROP,scale=$OW:$OH:flags=lanczos"

command -v ffmpeg >/dev/null || { echo "ffmpeg missing — brew install ffmpeg"; exit 1; }

echo "→ encoding $NAME at ${OW}x${OH}"
ffmpeg -y -v error -i "$SRC" -vf "$VF" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 34 -preset veryslow -tune film \
  -x264-params "aq-mode=3:aq-strength=1.1:psy-rd=1.0,0.15:bframes=8:ref=6" \
  -g 60 -an -movflags +faststart "$PUB/hero-$NAME.mp4"
printf "   %s KB\n" "$(( $(wc -c < "$PUB/hero-$NAME.mp4") / 1024 ))"

# The still that paints first MUST be a frame of this video, same crop, same
# timestamp — otherwise the handover reads as a cut between two photographs.
echo "→ cutting matching stills at ${TS}s"
ffmpeg -y -v error -ss "$TS" -i "$SRC" -frames:v 1 -vf "crop=$CROP" "$TMP/still.png"
if [ "$NAME" = "mobile" ]; then
  node -e "
  const sharp=require('$ROOT/luxe-drive-flow/node_modules/sharp');
  Promise.all([800,1200,1600].map(w =>
    sharp('$TMP/still.png').resize(w).webp({quality:80,effort:6})
      .toFile('$PUB/hero-vertical-'+w+'.webp')
  )).then(r=>r.forEach(i=>console.log('   '+i.width+'x'+i.height+'  '+Math.round(i.size/1024)+' KB')));
  "
else
  node -e "
  const sharp=require('$ROOT/luxe-drive-flow/node_modules/sharp');
  sharp('$TMP/still.png').resize(1920).webp({quality:80,effort:6})
    .toFile('$PUB/hero-perf-rims-1920.webp')
    .then(i=>console.log('   '+i.width+'x'+i.height+'  '+Math.round(i.size/1024)+' KB'));
  "
fi

echo "→ SSIM against a lossless encode of the same crop (target >= 0.98)"
ffmpeg -y -v error -i "$SRC" -vf "$VF" -c:v libx264 -qp 0 -preset ultrafast -an "$TMP/ref.mp4"
ffmpeg -nostats -hide_banner -i "$PUB/hero-$NAME.mp4" -i "$TMP/ref.mp4" \
  -lavfi "ssim" -f null - 2>&1 | grep -o "All:[0-9.]*" | tail -1 | sed 's/^/   /'

# SSIM does not catch banding, and on a sunset gradient that is the real
# failure mode. Stretch the contrast until it would be obvious.
echo "→ banding check — OPEN THIS IMAGE:"
ffmpeg -y -v error -ss "$TS" -i "$PUB/hero-$NAME.mp4" -frames:v 1 \
  -vf "crop=iw:ih*0.36:0:ih*0.08,eq=contrast=2.2:brightness=0.06,scale=760:-1" "$TMP/band.png"
echo "   $TMP/band.png"
echo
echo "Next: npm run build, then verify headless —"
echo "  npx lighthouse https://www.lussarocollection.com/ --only-categories=performance \\"
echo "    --form-factor=mobile --screenEmulation.mobile --quiet \\"
echo "    --chrome-flags=\"--headless=new --no-sandbox --disable-extensions --disable-gpu\""
