#!/bin/bash
# For each frame in assets/frames: person mask (Vision, full frame, aligned) + the light warm grade on both, at 2560x1440.
#   -> assets/scene/warm/s_<t>.jpg  and  assets/scene/warm/mask/s_<t>.png   (her image never flipped or retouched)
cd "$(dirname "$0")/.."
S=${TMPDIR:-/tmp}/pd-prep; mkdir -p $S
for f in assets/frames/f_*.jpg; do n=$(basename $f .jpg); t=${n#f_}
  [ -f assets/scene/warm/mask/s_$t.png ] && continue
  swift tools/cutout_full.swift $f $S/m_$t.png auto | tail -1
  sips -Z 2560 $f --out $S/s_$t.jpg >/dev/null; sips -Z 2560 $S/m_$t.png --out $S/m2_$t.png >/dev/null
  python3 tools/warm.py $S/s_$t.jpg assets/scene/warm/s_$t.jpg
  python3 tools/warm.py $S/m2_$t.png assets/scene/warm/mask/s_$t.png
  mv $S/m_$t.png $S/m2_$t.png $S/s_$t.jpg ~/.Trash/ 2>/dev/null
done
echo prepped
