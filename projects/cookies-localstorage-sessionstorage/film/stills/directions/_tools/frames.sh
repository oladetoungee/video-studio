#!/bin/zsh
# _tools/frames.sh t1 t2 ...  -> _src/footage/raw_<t>.jpg (1920 wide, from the 4K recording)
D=${0:A:h}/../_src/footage; V=${0:A:h}/../../../../kit/raw-video.mov
for t in "$@"; do ffmpeg -v error -y -ss $t -i $V -frames:v 1 -vf scale=1920:-2 -q:v 2 $D/raw_$t.jpg; done
