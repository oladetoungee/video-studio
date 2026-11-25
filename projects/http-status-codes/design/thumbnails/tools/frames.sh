#!/bin/bash
# Full-size frames of her recording at given times (seconds): bash tools/frames.sh <outdir> <width> t1 t2 ...  (holds the render lock)
O=$1; WD=$2; shift 2; V=/Users/gbemi/Desktop/CODE/videos/projects/http-status-codes/kit/raw-video.mov; mkdir -p "$O"
until mkdir /tmp/gm-render.lock 2>/dev/null; do sleep 0.1; done; echo "design-http frames $$" > /tmp/gm-render.lock/owner
trap 'rm -f /tmp/gm-render.lock/owner; rmdir /tmp/gm-render.lock' EXIT
for t in "$@"; do ffmpeg -v error -y -ss $t -i "$V" -frames:v 1 -vf scale=$WD:-2 -q:v 2 "$O/f_$t.jpg"; done
ls "$O" | wc -l
