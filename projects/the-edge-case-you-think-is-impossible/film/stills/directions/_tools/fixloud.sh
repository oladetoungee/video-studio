#!/bin/zsh
# second loudness pass on a motion test (video copied): _tools/fixloud.sh <X>
cd ${0:A:h:h}; f=$1/motion-test.mp4
ffmpeg -v error -y -i $f -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k -movflags +faststart $1/_l.mp4 && mv $f ~/.Trash/ec-$1-old-$$.mp4 && mv $1/_l.mp4 $f
ffmpeg -hide_banner -i $f -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+I:|Peak:" | tail -2
