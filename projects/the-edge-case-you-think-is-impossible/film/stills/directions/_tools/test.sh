#!/bin/zsh
# motion test for one direction: _tools/test.sh <X> <t0> <t1>
cd ${0:A:h:h}
node _tools/r.mjs meta $1 && node _tools/r.mjs video $1 $2 $3 $1/_silent.mp4 && _tools/lock.sh python3 _tools/mixtest.py $1 $2 $3 $1/_silent.mp4 $1/motion-test.mp4 && mv $1/_silent.mp4 ~/.Trash/ec-$1-silent-$$.mp4
