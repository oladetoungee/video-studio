#!/bin/zsh
# extract frames (1920 wide, never flipped) from her recording: frames.sh <sec> ...
cd "$(dirname $0)/../../.."
for t in "$@"; do ffmpeg -v error -y -ss $t -i kit/raw-video.mov -frames:v 1 -vf scale=1920:-2 -q:v 2 design/thumbnails/assets/frames/f_$t.jpg; done
