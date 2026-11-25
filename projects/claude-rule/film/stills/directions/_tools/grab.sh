#!/bin/zsh
# grab 1920x1080 stills from her 4K recording (never flipped): grab.sh t1 t2 ...
cd /Users/gbemi/Desktop/CODE/videos/projects/claude-rule
for t in "$@"; do ffmpeg -v error -y -ss $t -i "kit/anthropic rule for claude.mov" -frames:v 1 -vf scale=1920:1080:flags=lanczos -q:v 2 film/stills/directions/_footage/f_${t}.jpg; done
