#!/bin/bash
# clip.sh <slug> <k> t0 t1 [t0 t1 ...] : turbo + small.en on short clips of the raw voice
SLUG=$1; K=$2; shift 2
S=/private/tmp/claude-501/-Users-gbemi-Desktop-CODE-videos/ad1388fa-744f-4ad0-8d5a-5127432f42b4/scratchpad/captions-all/$K
W=/Users/gbemi/Desktop/CODE/videos/projects/$SLUG/kit/transcripts/voice16k.wav
mkdir -p $S/clips
while [ $# -ge 2 ]; do a=$1; b=$2; shift 2
 f=$S/clips/c_$a.wav; ffmpeg -v error -y -ss $a -to $b -i $W -ar 16000 -ac 1 $f
 for m in large-v3-turbo small.en; do
  t=$(whisper-cli -m ~/.cache/whisper/ggml-$m.bin -f $f -l en -np -nt -bs 5 2>/dev/null | tr '\n' ' ')
  echo "$a-$b [$m] $t"
 done
done
