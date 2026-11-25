#!/bin/bash
# word times (whisper small.en, DTW) for a range of her raw voice: tools/wseg.sh <start> <dur>
SP=${TMPDIR:-/tmp}/uxw; mkdir -p $SP
ffmpeg -v error -y -ss $1 -t $2 -i "$(dirname $0)/../../kit/transcripts/voice.m4a" -ar 16000 -ac 1 $SP/seg.wav
whisper-cli -m ~/.cache/whisper/ggml-small.en.bin -nfa -dtw small.en -ojf -of $SP/seg -f $SP/seg.wav >/dev/null 2>&1
python3 -c "
import json,sys
d=json.load(open('$SP/seg.json'))
o=[]
for s in d['transcription']:
  for t in s['tokens']:
    if t['text'].startswith('[_'): continue
    o.append('%s@%.2f' % (t['text'], $1 + t['t_dtw']/100 if t['t_dtw']>=0 else -1))
print(''.join(o))"
