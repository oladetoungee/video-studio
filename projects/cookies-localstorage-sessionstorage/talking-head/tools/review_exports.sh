#!/bin/zsh
# review exports (checks only; moved to outputs/_review and binned after): every short 9:16, then the teaser 16:9
cd /Users/gbemi/Desktop/CODE/videos
M=projects/cookies-localstorage-sessionstorage/talking-head/talking-head.json
L=projects/cookies-localstorage-sessionstorage/talking-head/build
while pgrep -f "composite.mjs export projects/cookies" >/dev/null; do sleep 10; done
for id in sh01 sh02 sh03 sh04 sh05 sh06 sh07 sh08 sh09; do
  node studio/tools/composite.mjs export $M $id --aspect 9x16 > $L/export_$id.log 2>&1; echo "done $id $?"
done
node studio/tools/composite.mjs export $M teaser --aspect 16x9 > $L/export_teaser.log 2>&1; echo "done teaser $?"
