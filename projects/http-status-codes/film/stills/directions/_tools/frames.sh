#!/bin/zsh
# extract 4K frames from her raw recording (never flipped): _tools/frames.sh t1 t2 ...
V=/Users/gbemi/Desktop/CODE/videos/projects/http-status-codes/kit/raw-video.mov; O=$(dirname $0)/../_src/footage
for t in "$@"; do ffmpeg -v error -y -ss $t -i $V -frames:v 1 -q:v 3 $O/raw_$t.jpg; echo $t; done
