#!/bin/bash
# usage: pass.sh <slug> <short> [stage...]   stages: raw meta sound turbo
cd /Users/gbemi/Desktop/CODE/videos
SLUG=$1; K=$2; shift 2
S=/private/tmp/claude-501/-Users-gbemi-Desktop-CODE-videos/ad1388fa-744f-4ad0-8d5a-5127432f42b4/scratchpad/captions-all/$K
P=projects/$SLUG; M=$P/talking-head/talking-head.json; O=$P/talking-head/build/captioncheck-2026-11-20
mkdir -p $S/mom $O
IDS=${IDS:-$(python3 -c "import json;print(' '.join(m['id'] for m in json.load(open('$M'))['moments']))")}
for st in "$@"; do
case $st in
raw) whisper-cli -m ~/.cache/whisper/ggml-large-v3-turbo.bin -f $P/kit/transcripts/voice16k.wav -l en -ml 1 -sow -oj -of $S/raw_turbo -np > $S/raw_turbo.log 2>&1; echo raw done;;
meta) for id in $IDS; do node studio/tools/composite.mjs meta $M $id > $S/meta_$id.json 2>$S/meta_$id.err; done; echo meta done;;
sound) for id in $IDS; do node studio/tools/composite.mjs sound $M $id --tracks voice --out $O > $S/sound_$id.log 2>&1; done; echo sound done;;
turbo) cd $O; for f in ${FILES:-*_voice.wav}; do b=${f%_voice.wav}; ffmpeg -v error -y -i $f -ar 16000 -ac 1 $S/mom/$b.16k.wav && whisper-cli -m ~/.cache/whisper/ggml-large-v3-turbo.bin -f $S/mom/$b.16k.wav -l en -ml 1 -sow -oj -of $S/mom/$b.turbo -np >/dev/null 2>&1; echo done $b; done; cd - >/dev/null;;
esac; done
