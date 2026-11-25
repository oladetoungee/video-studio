#!/usr/bin/env python3
"""doomscrolling film: her cleaned voice = exactly the full talking-head edit's cut (talking-head/data/edl.json "full": the
CLEANUP retakes + the "number eight" slip + pauses tightened), so the film and the full edit say the same words at the same
rhythm. Writes audio/voice_edit.flac (48 kHz mono 24 bit, 35 ms equal-power crossfades), data/cutlist.json (segments, for
studio/tools/thsetup.py), data/words.json (her corrected words, talking-head/data/raw_words.json, on the edited voice),
data/captions.srt, and film.json voiceDuration.  Run: python3 film/tools/voice.py"""
import json, os, re, subprocess, numpy as np
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); P = os.path.dirname(R)
SR = 48000; XF = int(0.035 * SR)
# 2026-11-19: the film's own cut = the full edit's cuts (CLEANUP retakes, the 11-07 'number eight' re-cut, the stray 'Yeah.', 0.8 s before
# each new item) with the tight 0.55 s pauses (footedl, maxPause 0.55) in data/edl-film.json; the full edit itself uses 1.2 only because
# of an ffmpeg clip limit. Falls back to the talking-head edl.
EF = os.path.join(R, 'data/edl-film.json')
clips = json.load(open(EF if os.path.exists(EF) else os.path.join(P, 'talking-head/data/edl.json')))['full']['clips']
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(P, 'kit/transcripts/voice.m4a'), '-ar', str(SR), '-ac', '1', '-f', 'f32le', '-'], capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.float32)
fin = np.sin(np.linspace(0, np.pi / 2, XF)) ** 2; fout = 1 - fin
acc = np.zeros(0, np.float32); segs = []; cum = 0.0
for a, b in clips:
    seg = x[int(a * SR):int(b * SR)].copy()
    if len(acc) == 0: acc = seg; st = 0.0
    else:
        st = (len(acc) - XF) / SR
        acc = np.concatenate([acc[:-XF], seg[:XF] * fin + acc[-XF:] * fout, seg[XF:]])
    segs.append({'orig_start': a, 'orig_end': b, 'edit_start': round(st, 4)})
acc = acc.astype(np.float32); fo = int(0.25 * SR); acc[-fo:] *= np.linspace(1, 0, fo, dtype=np.float32)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'flac', '-sample_fmt', 's32', '-bits_per_raw_sample', '24',
                os.path.join(R, 'audio/voice_edit.flac')], input=acc.tobytes(), check=True)
dur = round(len(acc) / SR, 3)
json.dump({'sample_rate': SR, 'source': 'data/edl-film.json full' if os.path.exists(EF) else 'talking-head/data/edl.json full', 'edited_duration': dur, 'segments': segs}, open(os.path.join(R, 'data/cutlist.json'), 'w'), indent=1)
W = json.load(open(os.path.join(P, 'talking-head/data/raw_words.json'))); out = []
for w in W:
    for s in segs:
        if s['orig_start'] - 0.02 <= w['t'] < s['orig_end']:
            d = s['edit_start'] - s['orig_start']; out.append({'w': w['w'], 't': round(w['t'] + d, 3), 'e': round(min(w['e'], s['orig_end']) + d, 3)}); break
for i in range(1, len(out)): out[i]['t'] = max(out[i]['t'], out[i - 1]['t'] + 0.02)
json.dump(out, open(os.path.join(R, 'data/words.json'), 'w'), indent=0)
fj = os.path.join(R, 'film.json')
if os.path.exists(fj):
    m = json.load(open(fj)); m['voiceDuration'] = dur; json.dump(m, open(fj, 'w'), indent=2, ensure_ascii=False)
INTRO = json.load(open(fj))['intro'] if os.path.exists(fj) else 0
def fmt(t): ms = int(round(t * 1000)); return f"{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d},{ms%1000:03d}"
cues, cur = [], []
for i, w in enumerate(out):
    cur.append(w); text = ' '.join(q['w'] for q in cur); nx = out[i + 1] if i + 1 < len(out) else None
    if not nx or nx['t'] - w['e'] > 0.6 or len(text) > 74 or (w['w'][-1] in '.?!' and len(text) > 30) or (w['w'][-1] in ',;:' and len(text) > 50): cues.append(cur); cur = []
lines = []
for k, c in enumerate(cues):
    t0 = c[0]['t'] + INTRO; t1 = max(c[-1]['e'] + 0.25, c[0]['t'] + 1.0) + INTRO
    if k + 1 < len(cues): t1 = min(t1, cues[k + 1][0]['t'] + INTRO - 0.02)
    text = ' '.join(q['w'] for q in c)
    if len(text) > 42: mid = len(text) // 2; sp = min((i for i, ch in enumerate(text) if ch == ' '), key=lambda i: abs(i - mid)); text = text[:sp] + '\n' + text[sp + 1:]
    lines.append(f"{k+1}\n{fmt(t0)} --> {fmt(t1)}\n{text}\n")
open(os.path.join(R, 'data/captions.srt'), 'w').write('\n'.join(lines))
open(os.path.join(R, 'scenes/rawmap.js'), 'w').write('/* her raw recording -> edited voice (written by tools/voice.py) */\nconst RAWSEG = ' + json.dumps([[s_['orig_start'], s_['orig_end'], s_['edit_start']] for s_ in segs]) + ';\n')
print('voice', dur, 's,', len(segs), 'segments,', len(out), 'words,', len(cues), 'captions')
