#!/usr/bin/env python3
"""edge cases: her words on the RAW timeline (kit/raw-video.mov) -> talking-head/data/raw_words.json.
Times: whisper tokens' t_dtw (kit/transcripts/transcript.json, whisper-cli small.en -dtw on the raw voice), start = dtw - 0.12 s
snapped to an energy onset just before (kit/transcripts/voice16k.wav), end = where the energy falls (<= next word).
Fixes: kit/transcripts/corrections.json + the mishearings below (kit 7e, CLEANUP 4-5). A replacement with a different word
count spreads the old span over the new words. Run: python3 talking-head/tools/words.py"""
import json, os, re, subprocess, numpy as np
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(os.path.dirname(HERE))
FIX = [
 ("you'd offer", "of"), ("you can type the user twice", "you can charge the user twice"), ("So it retried request", "So a retried request"),
 ("Edgar", "Egor"), ("he sensed the same", "he sent the same"), ("happen in your have", "happen in your app"),
 ("edge cases, situation, and production", "edge case situations in production"),
 ("ends the text le", "ends the text early"), ("And even apostrophe", "And if an apostrophe"),
 ("In China system", "In 2016"), ("In training system", "In 2016"), ("sunning field", "surname field"), ("A sunning is Null", "Her surname is Null"),
 ("Noll", "Null"), ("NOL", "NULL"), ("in fine", "in fines"), ("his plates", "his plate"),
 ("cloud window as all had", "cloud, Windows Azure, had"), ("a deep debug", "a leap year bug"), ("leap year box", "leap year bugs"),
 ("Another hedge case that can cause issues time zone", "Another edge case that can cause issues: time zones"),
 ("3.30", "3:30"), ("ascents", "accents"), ("A lot of your names", "A lot of Yoruba names"),
 ("Take at the bio. At the bio,", "Take Adébáyọ̀. Adébáyọ̀,"), ('like "a" and "o"', 'like é and ọ̀'),
 ("counts character", "counts characters"), ("Irom's law", "Hyrum's law"), ("Iraum's law", "Hyrum's law"), ("Irom Wright", "Hyrum Wright"),
 ("the half will break", "the app will break"), ("you get missed", "they get missed"),
 ("everything that I hope", "everything that I owe"), ("3:30, time.", "3:30, Tallinn time."),   # 2026-11-07 her review: "owe", not "hope"; whisper dropped "Tallinn"
]
n = lambda s: re.sub(r"[^a-z0-9%:'\-]", '', s.lower().replace('’', "'"))
tr = json.load(open(os.path.join(P, 'kit/transcripts/transcript.json')))['transcription']
W = []
for s in tr:
    for tk in s['tokens']:
        tx = tk['text']
        if not tx.strip() or tx.strip().startswith('[_'): continue
        dt = tk.get('t_dtw', -1); dt = dt / 100 if dt is not None and dt >= 0 else -1
        if tx.startswith(' ') or not W: W.append({'w': tx.strip(), 'dtw': dt})
        else: W[-1]['w'] += tx
W = [w for w in W if w['dtw'] >= 0]
x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(P, 'kit/transcripts/voice16k.wav'), '-ar', '16000', '-ac', '1', '-f', 'f32le', '-'], capture_output=True, check=True).stdout, np.float32)
nn = len(x) // 160; db = 20 * np.log10(np.sqrt((x[:nn * 160].reshape(nn, 160) ** 2).mean(1) + 1e-12)); N = len(db)
on = np.array([i / 100 for i in range(10, N) if db[i] > -30 and (db[i - 6:i] < -36).all()])
for w in W:
    t = w['dtw'] - 0.12; c = on[(on > w['dtw'] - 0.35) & (on < w['dtw'] + 0.03)] if len(on) else []
    if len(c): t = float(c[-1])
    w['t'] = round(max(0, t), 3)
for i in range(1, len(W)): W[i]['t'] = max(W[i]['t'], W[i - 1]['t'] + 0.04)
for i, w in enumerate(W):
    nxt = W[i + 1]['t'] if i + 1 < len(W) else w['t'] + 0.6; e = w['t'] + 0.08; lim = min(nxt, w['t'] + 1.2); j = int(e * 100)
    while j < int(lim * 100) and j < N and db[j] > -36: j += 1
    w['e'] = round(max(e, min(j / 100, lim)), 3)
fixes = [tuple(f) for f in json.load(open(os.path.join(P, 'kit/transcripts/corrections.json')))] + FIX
for old, new in fixes:
    ow = [n(q) for q in old.split()]; dw = new.split(); k = hits = 0
    while k <= len(W) - len(ow):
        if [n(q['w']) for q in W[k:k + len(ow)]] == ow:
            seg = W[k:k + len(ow)]; t0, t1 = seg[0]['t'], seg[-1]['e']
            if len(dw) == len(seg): out = [{'w': dw[j], 't': seg[j]['t'], 'e': seg[j]['e']} for j in range(len(dw))]
            else: out = [{'w': q, 't': round(t0 + (t1 - t0) * j / len(dw), 3), 'e': round(t0 + (t1 - t0) * (j + 1) / len(dw), 3)} for j, q in enumerate(dw)]
            m = re.search(r'[.,?!;:]+$', seg[-1]['w'])
            if m and not re.search(r'[.,?!;:]$', out[-1]['w']): out[-1]['w'] += m.group(0)
            W[k:k + len(ow)] = out; k += len(dw); hits += 1
        else: k += 1
    if not hits and old in [f[0] for f in FIX]: print('not applied:', old)
# hand timing fixes (measured on the waveform): word, whisper start, real start, real end
for wd, t0, a_, b_ in [('all', 493.52, 494.0, 494.12)]:
    for q in W:
        if n(q['w']) == wd and abs(q['t'] - t0) < 0.05: q['t'], q['e'] = a_, b_
out = [{'w': w['w'], 't': w['t'], 'e': w['e']} for w in W if w['w']]
json.dump(out, open(os.path.join(P, 'talking-head/data/raw_words.json'), 'w'), indent=0)
print(len(out), 'words, last at', out[-1]['e'])
