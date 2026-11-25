#!/bin/sh
# Review stills for one moment in both aspects + two grids (captions on).  tools/grid.sh m01 2.4,5.6,9.2   (run from the workspace root)
# -> talking-head/build/<id>_16x9_grid.jpg, build/<id>_9x16_grid.jpg   (stills go to build/stills/<id>/, replaced each run)
set -e
ID=$1; AT=$2; TH=projects/ghana-marrify/talking-head; D=$TH/build/stills/$ID
[ -d $D ] && mv $D ~/.Trash/gm-stills-$ID-$(date +%s)
for a in 16x9 9x16; do node studio/tools/composite.mjs stills $TH/talking-head.json $ID --aspect $a --captions --at $AT --out $D > /dev/null; done
N=$(ls $D/*_16x9_*.jpg | wc -l | tr -d ' ')
ffmpeg -v error -y -pattern_type glob -i "$D/*_16x9_*.jpg" -vf "scale=640:360,tile=4x$(( (N+3)/4 )):padding=6:color=gray" -frames:v 1 $TH/build/${ID}_16x9_grid.jpg
ffmpeg -v error -y -pattern_type glob -i "$D/*_9x16_*.jpg" -vf "scale=300:533,tile=6x$(( (N+5)/6 )):padding=6:color=gray" -frames:v 1 $TH/build/${ID}_9x16_grid.jpg
echo $TH/build/${ID}_16x9_grid.jpg $TH/build/${ID}_9x16_grid.jpg
