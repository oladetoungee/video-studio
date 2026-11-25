#!/bin/bash
# Grab full-size (3840x2160) frames from her recording: tools/frames.sh <seconds...>  -> assets/frames/f_<t>.jpg
# Never flipped. Run under tools/lock.sh (4K read).
V="$(dirname "$0")/../../../kit/database indexes.mov"; O="$(dirname "$0")/../assets/frames"
for t in "$@"; do ffmpeg -v error -ss $t -i "$V" -frames:v 1 -q:v 2 -y "$O/f_$t.jpg"; done
