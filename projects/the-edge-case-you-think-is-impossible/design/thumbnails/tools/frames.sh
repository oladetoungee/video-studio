#!/bin/zsh
# Grab her frames (never flipped) under the machine-wide render lock:  zsh tools/frames.sh 138.75 251.75 ...  -> assets/frames/f_<t>.jpg
P=/Users/gbemi/Desktop/CODE/videos/projects/the-edge-case-you-think-is-impossible
until mkdir /tmp/gm-render.lock 2>/dev/null; do sleep 0.3; done
echo "edge-case design frames $$" > /tmp/gm-render.lock/owner
trap 'rm -f /tmp/gm-render.lock/owner; rmdir /tmp/gm-render.lock' EXIT
for t in "$@"; do ffmpeg -v error -y -ss $t -i $P/kit/raw-video.mov -frames:v 1 -vf scale=1920:1080:flags=lanczos -q:v 2 $P/design/thumbnails/assets/frames/f_$t.jpg; echo $t; done
