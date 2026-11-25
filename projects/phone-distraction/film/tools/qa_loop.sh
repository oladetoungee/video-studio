#!/bin/bash
# the film's measure-and-fix loop: meta -> stems -> sound QA -> audit -> nudges (drops, holds, cue sync) ; twice ; then board + contrast
cd /Users/gbemi/Desktop/CODE/videos
for i in 1 2; do
  node studio/tools/render.mjs meta phone-distraction 2>&1 | grep -i "error\|TOTAL"
  projects/phone-distraction/film/tools/lock.sh python3 studio/tools/stems.py phone-distraction >/dev/null 2>&1
  python3 studio/tools/soundqa.py phone-distraction 2>&1 | grep -E "^timing|^over_bed|^aac" | cut -c1-230
  node studio/tools/lab.mjs audit phone-distraction 2>&1 | grep '"frames"'
  python3 projects/phone-distraction/film/tools/nudges.py
done
node studio/tools/render.mjs meta phone-distraction 2>&1 | grep -i "error\|TOTAL"
projects/phone-distraction/film/tools/lock.sh python3 studio/tools/stems.py phone-distraction >/dev/null 2>&1
python3 studio/tools/soundqa.py phone-distraction 2>&1 | grep -E "^timing|^over_bed|^aac|^music|^phone|^dc" | cut -c1-230
node studio/tools/lab.mjs audit phone-distraction 2>&1 | grep '"frames"'
node studio/tools/lab.mjs board phone-distraction 2>&1 | tail -1
echo DONE
