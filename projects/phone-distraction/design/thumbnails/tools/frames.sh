#!/bin/bash
# Extract the 4K frames listed in tools/frames.json from her recording (never flipped) -> assets/frames/f_<t>.jpg
cd "$(dirname "$0")/.."
for t in $(python3 -c "import json;print(' '.join(f['t'] for f in json.load(open('tools/frames.json'))))"); do
  [ -f assets/frames/f_$t.jpg ] || ffmpeg -v error -y -ss $t -i "../../kit/phone addiction.mov" -frames:v 1 -q:v 2 assets/frames/f_$t.jpg
done
echo done
