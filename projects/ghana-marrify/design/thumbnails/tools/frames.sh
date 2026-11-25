#!/bin/zsh
# Re-extract the 4K frames listed in tools/frames.json from her recording (never flipped), then cut them out and clean them.
#   zsh tools/frames.sh        (heavy: takes the shared /tmp/gm-render.lock while ffmpeg reads the 4K file)
cd "${0:A:h}/.."
V=../../kit/ghana-marrify.mov
while ! mkdir /tmp/gm-render.lock 2>/dev/null; do sleep 5; done; echo thumbnails > /tmp/gm-render.lock/owner
for t in $(python3 -c "import json;print(' '.join(f['t'] for f in json.load(open('tools/frames.json'))))"); do
  ffmpeg -v error -y -ss $t -i $V -frames:v 1 -pix_fmt yuvj444p -q:v 1 assets/frames/f_$t.jpg
done
unlink /tmp/gm-render.lock/owner; rmdir /tmp/gm-render.lock
for f in assets/frames/f_*.jpg; do n=${f:t:r}; [[ -f assets/cut/raw/$n.png ]] || swift ../../../../studio/tools/cutout.swift $f assets/cut/raw/$n.png auto | tail -1; done
python3 tools/clean.py
