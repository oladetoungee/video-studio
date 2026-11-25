#!/usr/bin/env python3
"""Word timings on the RAW video timeline (kit/ghana-marrify.mov), with the BRIEF's whisper corrections applied.

Source: data/whisper_dtw.json = whisper.cpp small.en with DTW token timestamps (-dtw small.en -nfa -ojf), run on
kit/transcripts/voice16k.wav. DTW times are tighter than the plain token offsets in kit/transcripts/transcript.words.json.
Each word starts at its first token's DTW time, then snaps to the nearest sound onset (10 ms RMS of the source audio).

    python3 tools/rawwords.py            -> data/raw_words.json  [{w, t, e}]
    python3 tools/rawwords.py --print    also prints the corrected transcript with times and pauses
"""
import json, os, re, subprocess, sys
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__)); TH = os.path.dirname(HERE); PROJ = os.path.dirname(TH)
SRC = os.path.join(PROJ, 'kit', 'ghana-marrify.mov')

# whisper -> what she says (BRIEF.md "Whisper corrections" + her own .srt for wording). Word sequences, matched in order.
FIX = [
    ("Can I just launch", "Ghana just launched"),
    ("called Marrify?", "called Marrify."),
    ("licence marriage officials", "licensed marriage officials"),
    ("registrars, generals department,", "Registrar-General's Department,"),
    ("a bookstore or a venue", "a pastor and a marriage venue"),
    ("drawbacks that I said.", "drawbacks that were cited."),
    ("digital orb", "digital hub"),
    ("not going to say it's", "not going to lie, it's"),
    ("sinks,", "syncs,"), ("sinks.", "syncs."),
    ("when I got it,", "when I got here,"),
    ("I see Dana doing", "I see Ghana doing"),
    ("first instance", "first instinct"),
    ("Because he solves", "Because it solves"),
    ("There's more reliable records", "There's one reliable record"),
    ("NIN and this another.", "NIN and this and that."),
    ("TechCabal reads.", "TechCabal raised."),
    ("I think that that's even your drawback.", "I think that's a genuine drawback."),
    ("made in India.", "made in a year."),
    ("Because if business", "Because a business"),
    ("holds public accountability.", "owes public accountability."),
    ("consent path", "consent part"),
    ("believe that it was information,", "believe that divorce information,"),
    ("a divorce with a system in one, cut out or somewhere. In 2003, oh,", "your divorce papers sitting in one courthouse or somewhere in 2003,"),
    ("somebody just been able", "somebody just being able"),
    ("which cost granted", "which court granted"),
    ("it's been asked for?", "is being asked for?"),
    ("Marifai", "Marrify"),
    ("access the level", "access a particular level"),
    ("I was only thinking", "I've just been thinking"),
    ("non-neutral.", "not neutral."),
    ("African contest, a larger stand divorce,", "African context, to a large extent, divorce,"),
    ("is pretty stigmatized.", "is still pretty stigmatised."),
    ("generally smart", "genuinely smart"),
    ("is also peered, which you've been able to see what's happening today.", "is also paired with you being able to see what is happening to it."),
    ("because I generally think it's also a problem.", "because I genuinely think it solves the problem."),
    ("this guy just ran into my head.", "basically just running in my head."),
    ("centralised data finally.", "centralised data, finally, finally."),
]


def words_from_dtw():
    d = json.load(open(os.path.join(TH, 'data', 'whisper_dtw.json')))
    out = []
    for seg in d['transcription']:
        for tk in seg['tokens']:
            s = tk['text']
            if s.startswith('[_') or not s.strip(): continue
            t = tk['t_dtw'] / 100 if tk['t_dtw'] >= 0 else tk['offsets']['from'] / 1000
            if s.startswith(' ') or not out: out.append({'w': s.strip(), 't': t, 'e': tk['offsets']['to'] / 1000})
            else: out[-1]['w'] += s; out[-1]['e'] = max(out[-1]['e'], tk['offsets']['to'] / 1000)
    return out


norm = lambda s: re.sub(r"[^a-z0-9']", '', s.lower().replace('’', "'"))


def apply_fixes(ws):
    for a, b in FIX:
        A, B = a.split(), b.split(); i = 0; hit = 0
        while i <= len(ws) - len(A):
            if all(norm(ws[i + k]['w']) == norm(A[k]) for k in range(len(A))) and (a[-1] not in '.,?' or ws[i + len(A) - 1]['w'].endswith(a[-1])):
                t0, t1 = ws[i]['t'], ws[i + len(A) - 1]['e']; ts = [w['t'] for w in ws[i:i + len(A)]]
                new = []
                for k, s in enumerate(B):   # map the new words onto the old words' times (spread when counts differ)
                    u = k * (len(A) - 1) / max(1, len(B) - 1) if len(B) > 1 else 0
                    j = int(u); tt = ts[j] + (u - j) * ((ts[j + 1] if j + 1 < len(ts) else t1) - ts[j])
                    new.append({'w': s, 't': tt, 'e': 0})
                for k in range(len(new)): new[k]['e'] = new[k + 1]['t'] if k + 1 < len(new) else t1
                ws[i:i + len(A)] = new; i += len(B); hit += 1
            else: i += 1
        if not hit: print('fix not applied:', a, file=sys.stderr)
    return ws


def rms():
    p = os.path.join(TH, 'data', 'raw_rms_db.npy')
    if os.path.exists(p): return np.load(p)
    x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', SRC, '-vn', '-ac', '1', '-ar', '48000', '-f', 'f32le', '-'], capture_output=True, check=True).stdout, np.float32)
    n = len(x) // 480; D = 20 * np.log10(np.sqrt((x[:n * 480].reshape(n, 480) ** 2).mean(1) + 1e-12)); np.save(p, D); return D


def main():
    ws = apply_fixes(words_from_dtw()); D = rms(); THR = -44
    def snap(t, lo):
        i0, i1 = int(max(lo, t - 0.35) * 100), int((t + 0.06) * 100); best = None
        for j in range(max(8, i0), min(len(D) - 3, i1 + 1)):
            if (D[j - 8:j] < THR).all() and (D[j:j + 3] > THR).all():
                if best is None or abs(j / 100 - t) < abs(best - t): best = j / 100
        return best if best is not None else t
    out = []; prev = -1; sn = 0
    for i, w in enumerate(ws):
        t = max(0.0, w['t'] - 0.04)   # DTW marks a little after the onset
        t2 = snap(t, prev + 0.1); sn += t2 != t; t = max(t2, prev + 0.03); prev = t
        out.append({'w': w['w'], 't': round(t, 3), 'e': 0})
    for i, w in enumerate(out):   # end = next start, capped (pauses show as gaps), and trimmed to sound
        nxt = out[i + 1]['t'] if i + 1 < len(out) else w['t'] + 0.6
        i0, i1 = int(w['t'] * 100), max(int(w['t'] * 100) + 1, int(nxt * 100))
        seg = D[i0:i1]; on = np.nonzero(seg > THR)[0]
        e = (i0 + on[-1] + 3) / 100 if len(on) else w['t'] + 0.15
        w['e'] = round(min(nxt, max(w['t'] + 0.08, e)), 3)
    # hand-measured onsets where DTW runs late at a clip's first words (checked by transcribing the source from these points)
    TFIX = [('like', 104.24, 103.95), ('a', 104.34, 104.2), ('data', 169.62, 169.22), ('minimization.', 170.12, 169.47)]
    for w_, t_old, t_new in TFIX:
        for w in out:
            if w['w'] == w_ and abs(w['t'] - t_old) < 0.02: w['e'] = round(w['e'] + t_new - w['t'], 3) if w_ != 'like' else round(t_new + 0.2, 3); w['t'] = t_new
    print(f'{len(out)} words, {sn} snapped to a sound onset', file=sys.stderr)
    json.dump(out, open(os.path.join(TH, 'data', 'raw_words.json'), 'w'))
    if '--print' in sys.argv:
        line, t0, prev = [], None, None
        for w in out:
            gap = w['t'] - prev if prev is not None else 0
            if gap > 0.55 or len(line) > 13:
                print(f"{t0:8.2f}  {' '.join(line)}"); line = []; t0 = None
                if gap > 0.55: print(f"          [gap {gap:.1f}s]")
            if t0 is None: t0 = w['t']
            line.append(w['w']); prev = w['e']
        print(f"{t0:8.2f}  {' '.join(line)}")


if __name__ == '__main__':
    main()
