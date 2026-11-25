#!/usr/bin/env python3
"""Edit decision list for footage moments: which frames of the source each moment keeps.

  python3 studio/tools/footedl.py <talking-head.json>        -> <dir>/data/edl.json

For every moment in the manifest: start from [in, out] (seconds on the source video), remove the manual `cuts`
(retakes, asides; [a, b, "exact"] = no snapping), then tighten every pause longer than `edit.maxPause` to `keepBefore + keepAfter` seconds
(jump cuts). `holds: [[a, b, s]]` keeps a pause inside a..b at up to s seconds (comic timing, a breath before a payoff).
Speech is measured from the source audio (10 ms RMS, `edit.silenceDb`); every cut lands on the quietest 10 ms near the
requested point and on a frame boundary (1/fps), so sound and picture cut together.

Full-length edits: a moment's "out" may be "end" (or null): the source's end, so one moment can be the whole video.
Retakes: with "retakes": true on the moment (or manifest "edit"), a phrase she starts and then says again (2-5 words
repeated within a few words, e.g. "the rule is, the rule is that") loses its first attempt, cut in the silences around it
(listed in edl.json "retakes" so you can check them; add a [a, b] to "keep" to undo one: any retake overlapping a keep
range stays).

Teasers ("kind": "teaser"): "bites": [[a, b], ...] in the order they play (any order of the source); see plan_bites.

edl.json: { "<moment id>": { "clips": [[in, out], ...] (source seconds, frame-exact), "dur": output seconds,
                              "removed": seconds removed, "cuts": n } }
"""
import json, os, subprocess, sys
import numpy as np

SR = 48000; HOP = 480  # 10 ms


def rms_db(src, a, b):
    x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{a:.3f}', '-t', f'{b - a:.3f}', '-i', src, '-vn', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                                     capture_output=True, check=True).stdout, dtype=np.float32)
    n = len(x) // HOP
    return 20 * np.log10(np.sqrt((x[:n * HOP].reshape(n, HOP) ** 2).mean(1) + 1e-12))


def norm(w): return ''.join(c for c in w.lower().replace('’', "'") if c.isalnum() or c == "'")


def find_retakes(words, a0, b0, keep=()):
    ws = [w for w in words if a0 <= w['t'] < b0]; out = []; i = 0
    while i < len(ws):
        hit = None
        for k in (5, 4, 3, 2):
            if i + k > len(ws): continue
            q = [norm(w['w']) for w in ws[i:i + k]]
            if not all(q): continue
            for j in range(i + 1, min(len(ws) - k, i + k + 4) + 1):
                if [norm(w['w']) for w in ws[j:j + k]] == q and ws[j]['t'] - ws[i]['t'] < 6.0:
                    hit = (i, j, k); break
            if hit: break
        if hit:
            i0, j0, k = hit; a, b = ws[i0]['t'], ws[j0]['t']
            if not any(a < kb and b > ka for ka, kb in keep):
                out.append([round(a, 3), round(b, 3), ' '.join(w['w'] for w in ws[i0:j0])])
            i = j0
        else: i += 1
    return out


def plan(m, ed, src, fps, words=None):
    a0, b0 = m['in'], m['out']
    if b0 in (None, 'end'):
        b0 = float(json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', src], capture_output=True, check=True).stdout)['format']['duration'])
    retakes = find_retakes(words, a0, b0, m.get('keep', [])) if words and (m.get('retakes', ed.get('retakes', False))) else []
    m = {**m, 'cuts': list(m.get('cuts', [])) + [[a, b] for a, b, _ in retakes]}
    d = rms_db(src, a0, b0); T = lambda i: a0 + i * 0.01; I = lambda t: int(round((t - a0) * 100))
    thr = ed.get('silenceDb', -44)
    act = d > thr
    k = 6  # 60 ms dilation: keep consonant tails and soft onsets
    dil = np.convolve(act.astype(int), np.ones(2 * k + 1, int), mode='same') > 0
    keep = np.ones(len(d), bool)

    def quiet(t, r=0.08):  # quietest 10 ms within +-r of t
        i0, i1 = max(0, I(t - r)), min(len(d), I(t + r) + 1)
        return T(i0 + int(np.argmin(d[i0:i1]))) if i1 > i0 else t
    mp, kb, ka = ed.get('maxPause', 0.42), ed.get('keepBefore', 0.14), ed.get('keepAfter', 0.10)

    def silence_near(t, r=0.22):  # the silent run (after dilation) nearest t: (start, end) in s, or None
        i0, i1 = max(0, I(t - r)), min(len(d), I(t + r)); best = None; i = i0
        while i < i1:
            if dil[i]: i += 1; continue
            j = i
            while j < len(d) and not dil[j]: j += 1
            k0 = i
            while k0 > 0 and not dil[k0 - 1]: k0 -= 1
            run = (T(k0), T(j)); dist = 0 if run[0] <= t <= run[1] else min(abs(run[0] - t), abs(run[1] - t))
            if best is None or dist < best[0]: best = (dist, run)
            i = j
        return best[1] if best else None
    for c in m.get('cuts', []):   # a manual cut removes the speech between a and b and lands in the silences around them
        a, b = c[0], c[1]
        if len(c) > 2 and c[2] == 'exact':   # measured by ear/transcript: cut exactly there (still frame-rounded below)
            keep[I(a):I(b)] = False; continue
        sa, sb = silence_near(a), silence_near(b)
        ca = min(sa[0] + kb, sa[1]) if sa else quiet(a)
        cb = max(sb[1] - ka, sb[0]) if sb else quiet(b)
        if cb > ca: keep[I(ca):I(cb)] = False
    # pauses
    holds = m.get('holds', [])
    i = 0; n = len(d)
    while i < n:
        if dil[i]: i += 1; continue
        j = i
        while j < n and not dil[j]: j += 1
        if i > 0 and j < n:  # an inner pause
            dur = (j - i) / 100; lim = mp; kb_, ka_ = kb, ka
            for ha, hb, hs in holds:
                if T(i) < hb and T(j) > ha: lim = hs; kb_, ka_ = hs * 0.55, hs * 0.45
            if dur > lim:
                keep[i + int(kb_ * 100): j - int(ka_ * 100)] = False
        i = j
    # runs -> clips, frame-exact
    clips = []; i = 0
    while i < n:
        if not keep[i]: i += 1; continue
        j = i
        while j < n and keep[j]: j += 1
        fa, fb = round(T(i) * fps), round(T(j) * fps)
        if fb - fa >= 4: clips.append([fa / fps, fb / fps])
        i = j
    merged = []
    for c in clips:
        if merged and c[0] - merged[-1][1] < 1.5 / fps: merged[-1][1] = c[1]
        else: merged.append(c)
    dur = sum(b - a for a, b in merged)
    r = {'clips': [[round(a, 4), round(b, 4)] for a, b in merged], 'dur': round(dur, 4), 'removed': round(b0 - a0 - dur, 2), 'cuts': len(merged) - 1}
    if retakes: r['retakes'] = retakes
    return r


def plan_bites(m, ed, src, fps, words=None):
    """A teaser ("bites": [[a, b], ...] or [{"in": a, "out": b, "cuts": [...], "holds": [...]}, ...], in the order they
    play, any order of the source): each bite is planned like its own small moment (pauses tightened, its cuts), then the
    clips follow each other in the bites' order. The clips may go back in the source (the exports splice them)."""
    clips, bites, removed = [], [], 0.0
    lead_in = None
    if m.get('lead') and m['bites']:
        b0 = m['bites'][0]; lead_in = b0[0] if isinstance(b0, (list, tuple)) else b0.get('in')
    for b in m['bites']:
        if isinstance(b, dict) and b.get('gap'):   # {"gap": s, "at": source s}: a silent beat between two bites (a title card sits on it)
            at = b.get('at', lead_in)
            if at is None: raise SystemExit('a teaser gap needs "at" (a silent source second) when there is no lead')
            fa = round(at * fps); fb = fa + max(4, round(float(b['gap']) * fps))
            o0 = sum(y - x for x, y in clips); clips.append([fa / fps, fb / fps])
            bites.append({'in': round(fa / fps, 4), 'out': round(fb / fps, 4), 't0': round(o0, 4), 't1': round(o0 + (fb - fa) / fps, 4), 'gap': True}); continue
        bb = {'in': b[0], 'out': b[1]} if isinstance(b, (list, tuple)) else dict(b)
        sub = {'in': bb['in'], 'out': bb['out'], 'cuts': [c for c in bb.get('cuts', [])] + [c for c in m.get('cuts', []) if c[0] < bb['out'] and c[1] > bb['in']],
               'holds': bb.get('holds', m.get('holds', [])), 'retakes': bb.get('retakes', m.get('retakes', False)), 'keep': m.get('keep', [])}
        r = plan(sub, ed, src, fps, words)
        o0 = sum(y - x for x, y in clips); clips += r['clips']; removed += r['removed']
        bites.append({'in': bb['in'], 'out': bb['out'], 't0': round(o0, 4), 't1': round(o0 + r['dur'], 4)})
    dur = sum(y - x for x, y in clips)
    return {'clips': [[round(a, 4), round(b, 4)] for a, b in clips], 'dur': round(dur, 4), 'removed': round(removed, 2), 'cuts': len(clips) - 1, 'bites': bites}


def main():
    man_path = os.path.abspath(sys.argv[1]); base = os.path.dirname(man_path)
    man = json.load(open(man_path)); src = os.path.join(base, man['source']); fps = man.get('fps', 30)
    only = sys.argv[2:] or None
    out_path = os.path.join(base, 'data', 'edl.json')
    out = json.load(open(out_path)) if os.path.exists(out_path) else {}
    words = None
    try: words = json.load(open(os.path.join(base, man['words'])))
    except (OSError, KeyError, ValueError): pass
    for m in man['moments']:
        if only and m['id'] not in only: continue
        out[m['id']] = (plan_bites if m.get('bites') else plan)(m, man.get('edit', {}), src, fps, words)
        o = out[m['id']]; print(f"{m['id']}: {o['dur'] + o['removed']:.1f} s -> {o['dur']:.1f} s, {o['cuts']} cuts" + (f", {len(o['retakes'])} retakes" if o.get('retakes') else ''))
    json.dump(out, open(out_path, 'w'), indent=1)


if __name__ == '__main__':
    main()
