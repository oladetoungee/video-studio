#!/bin/sh
# Stills for one moment in both aspects + two review grids.  tools/grid.sh m01 2.4,5.6,9.2   (run from the workspace root)
# Writes talking-head/build/stills/ (moved to the Trash first) and build/<id>_16x9_grid.jpg, build/<id>_9x16_grid.jpg
set -e
ID=$1; AT=$2; TH=projects/reading-stack/talking-head
[ -d $TH/build/stills ] && mv $TH/build/stills ~/.Trash/th-stills-$(date +%s)
for a in 16x9 9x16; do node studio/tools/composite.mjs stills $TH/talking-head.json $ID --aspect $a --captions --at $AT > /dev/null; done
N=$(ls $TH/build/stills/*_16x9_*.jpg | wc -l | tr -d ' ')
ffmpeg -v error -y -pattern_type glob -i "$TH/build/stills/*_16x9_*.jpg" -vf "scale=960:540,tile=3x$(( (N+2)/3 )):padding=6:color=gray" -frames:v 1 $TH/build/${ID}_16x9_grid.jpg
ffmpeg -v error -y -pattern_type glob -i "$TH/build/stills/*_9x16_*.jpg" -vf "scale=360:640,tile=6x$(( (N+5)/6 )):padding=6:color=gray" -frames:v 1 $TH/build/${ID}_9x16_grid.jpg
echo $TH/build/${ID}_16x9_grid.jpg $TH/build/${ID}_9x16_grid.jpg
