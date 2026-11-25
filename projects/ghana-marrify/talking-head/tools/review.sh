#!/bin/sh
# Review pack for the critic: contact sheets (every 1.5 s, both formats, captions on) + full-size 9:16 stills at chosen times.
# tools/review.sh "m01 m02 ..."   (run from the workspace root) -> talking-head/build/review/
TH=projects/ghana-marrify/talking-head; R=$TH/build/review; mkdir -p $R/stills
AT_m01=1.0,5.0,8.6,12.4,15.6,20.2,26.2,30.6,33.6,37.0,39.8,42.6
AT_m02=1.0,4.6,9.6,12.2,19.9,22.5,26.9,30.6,34.2,40.2,43.0,44.8
AT_m03=0.5,3.0,4.6,8.0,13.6,18.0,22.0,28.2,30.4,33.0,36.0,41.6
AT_m04=1.0,4.6,8.6,11.4,16.0,20.4,27.0,30.4,33.0,36.0,40.0,43.6
AT_m05=1.0,3.6,8.4,12.6,15.6,17.6,19.4,20.4,24.4,27.6,29.0,30.2
AT_m06=1.0,4.6,6.4,8.0,10.6,13.0,15.2,17.0,19.4,20.8,22.0,23.0
AT_m07=1.0,4.0,5.8,10.8,12.6,16.0,19.0,20.5,22.0,23.1,24.0,24.8
for m in $1; do
  eval AT=\$AT_$m
  for a in 9x16 16x9; do node studio/tools/composite.mjs sheet $TH/talking-head.json $m --aspect $a --every 1.5 --captions --out $R/${m}_${a}_sheet.jpg > /dev/null 2>&1 && echo "$m $a sheet"; done
  [ -d $R/stills/$m ] && mv $R/stills/$m ~/.Trash/gm-review-$m-$(date +%s)
  node studio/tools/composite.mjs stills $TH/talking-head.json $m --aspect 9x16 --captions --at $AT --out $R/stills/$m > /dev/null 2>&1 && echo "$m stills"
done
