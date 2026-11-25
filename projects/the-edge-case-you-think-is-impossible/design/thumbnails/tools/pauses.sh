#!/bin/zsh
# One pass over her recording: a small frame at every pause (closed-mouth candidates), under the render lock.
P=/Users/gbemi/Desktop/CODE/videos/projects/the-edge-case-you-think-is-impossible; D=$P/design/thumbnails
until mkdir /tmp/gm-render.lock 2>/dev/null; do sleep 0.3; done
echo "edge-case design pauses $$" > /tmp/gm-render.lock/owner
trap 'rm -f /tmp/gm-render.lock/owner; rmdir /tmp/gm-render.lock' EXIT
for t in $(cat $D/review/pauses.txt); do ffmpeg -v error -y -ss $t -i $P/kit/raw-video.mov -frames:v 1 -vf scale=640:-2 -q:v 3 $D/review/pauses/p_$t.jpg; done
