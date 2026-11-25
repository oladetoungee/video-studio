#!/bin/zsh
# extract real footage frames (never flipped): _tools/frames.sh t1 t2 ...  -> _src/footage/raw_<t>.jpg (1920x1080)
D=${0:A:h:h}; RAW=/Users/gbemi/Desktop/CODE/videos/projects/the-edge-case-you-think-is-impossible/kit/raw-video.mov
for t in "$@"; do ffmpeg -v error -y -ss $t -i $RAW -frames:v 1 -vf scale=1920:1080:flags=lanczos -q:v 2 $D/_src/footage/raw_$t.jpg; echo $t; done
