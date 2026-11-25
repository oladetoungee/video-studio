#!/bin/bash
# Contact sheets of her whole recording at 1 frame per second (10x9 = 90 s per sheet; cell i of sheet k = (k-1)*90 + i s), for picking expressions.
cd "$(dirname "$0")/.."
ffmpeg -v error -y -hwaccel videotoolbox -i "../../kit/phone addiction.mov" -an \
  -vf "fps=1,scale=240:-2,tile=10x9" -q:v 4 assets/scan/sheet_%02d.jpg
echo done
