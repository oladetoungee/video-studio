#!/bin/zsh
# Grab 4K stills from her recording (never flipped), warm them lightly (tools/warm.py), and make a person matte (Vision).
#   zsh tools/frames.sh 13.3 165.3 ...   (run under the machine lock: python3 ../../film/stills/directions/_tools/lockrun.py zsh tools/frames.sh ...)
cd "${0:A:h}/.."
V="../../kit/anthropic rule for claude.mov"
mkdir -p assets/frames assets/scene assets/scene/mask
for t in "$@"; do
  ffmpeg -v error -y -ss $t -i "$V" -frames:v 1 -pix_fmt yuvj444p -q:v 2 assets/frames/f_$t.jpg
  python3 tools/warm.py assets/frames/f_$t.jpg assets/scene/s_$t.jpg
  swift ../../film/stills/directions/_tools/matte.swift assets/scene/s_$t.jpg assets/scene/mask/m_$t.png | tail -1
done
