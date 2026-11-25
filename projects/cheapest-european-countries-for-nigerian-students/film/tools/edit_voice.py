#!/usr/bin/env python3
"""cheapest-countries film: build the tightened voice track from her original recording.

Input : ../kit/transcripts/voice.m4a (her raw narration; decoded in memory to 48 kHz stereo float)
Output: audio/voice_edit.flac (48 kHz mono, 24 bit), data/cutlist.json, and film.json "voiceDuration"
Then: python3 tools/words.py, node studio/tools/render.mjs meta october-attacks, python3 studio/tools/stems.py october-attacks (or "Rebuild audio" in the studio)

Two kinds of edits, both recorded in data/cutlist.json:
  1. MANUAL_CUTS  - retakes / false starts / dead air, chosen by hand (original-time seconds)
  2. auto pause tightening - any silence longer than MIN_PAUSE is shortened to a natural gap
Every join gets a short equal-power crossfade so cuts are inaudible.
"""
import json, os, subprocess, numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(os.path.dirname(ROOT), "kit", "transcripts", "voice.m4a")
SR = 48000
HOP = 480  # 10 ms

# (start, end, reason) in ORIGINAL seconds. Boundaries sit in silence (checked on the energy envelope).
MANUAL_CUTS = [
    (5.36, 7.37, "opening trim (kit Q1): 'countries that are affordable for studying' says the topic twice"),
    (31.37, 32.40, "CLEANUP 1 stumble: 'these official studies, official sources rather'"),
    (137.27, 144.25, "CLEANUP 2 placeholder: 'like this and this and this, there are new universities like this' (examples go on screen)"),
    (349.48, 352.66, "CLEANUP 3 retake: 'you have to check the university before you are,'"),
    (361.38, 371.20, "CLEANUP 4 stumble: 'for a study research ... we always call it proof of'"),
    (502.08, 504.85, "kit Q7 / her correction list: drop 'which is about $6,000 US dollars' (no official USD figure)"),
]
SNAP = 0.04

SIL_DB = -40.0       # below this (10 ms RMS, dBFS) counts as silence
MIN_PAUSE = 0.55     # silences longer than this get tightened
PAD_OUT = 0.22       # keep this much after the previous word
PAD_IN = 0.20        # keep this much before the next word
XF = 0.035           # crossfade length (s)


def target_pause(L):
    """Natural rhythm: short pauses stay, long ones compress to 0.5-0.85 s."""
    return min(L, 0.42 + 0.12 * min(L - MIN_PAUSE, 2.8))


def main():
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", SRC, "-ar", str(SR), "-ac", "2", "-f", "f32le", "-"], capture_output=True, check=True).stdout
    x = np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).mean(1)
    n = len(x) // HOP
    rms = np.sqrt((x[: n * HOP].reshape(n, HOP) ** 2).mean(1) + 1e-12)
    db = 20 * np.log10(rms)
    dur = len(x) / SR

    # --- snap manual cut boundaries to the quietest 10 ms frame nearby ---------------
    def snap(t):
        i0, i1 = int(round((t - SNAP) * 100)), int(round((t + SNAP) * 100))
        k = i0 + int(np.argmin(db[i0:i1 + 1])); return round(k / 100, 2)
    global MANUAL_CUTS
    MANUAL_CUTS = [(snap(a), snap(b), r) for a, b, r in MANUAL_CUTS]

    # --- keep mask on a 10 ms grid ------------------------------------------------
    keep = np.ones(n, bool)
    for a, b, _ in MANUAL_CUTS:
        keep[int(round(a * 100)): int(round(b * 100))] = False

    # silence runs (computed on the audio that survives the manual cuts)
    sil = (db < SIL_DB) & keep
    pauses = []
    i = 0
    while i < n:
        if sil[i]:
            j = i
            while j < n and sil[j]:
                j += 1
            L = (j - i) / 100
            if L > MIN_PAUSE and i > 0 and j < n:
                tgt = target_pause(L)
                remove = L - tgt
                # remove the middle part, leaving PAD_OUT/PAD_IN around speech (scaled if needed)
                a = i / 100 + max(PAD_OUT, (tgt - PAD_IN) * 0.55)
                b = a + remove
                keep[int(round(a * 100)): int(round(b * 100))] = False
                pauses.append((round(i / 100, 2), round(L, 2), round(tgt, 2)))
            i = j
        else:
            i += 1

    # --- kept segments --------------------------------------------------------------
    segs = []
    i = 0
    while i < n:
        if keep[i]:
            j = i
            while j < n and keep[j]:
                j += 1
            segs.append([i / 100, min(j / 100, dur)])
            i = j
        else:
            i += 1
    # merge tiny gaps / drop tiny islands (< 60 ms) that can only be noise
    segs = [s for s in segs if s[1] - s[0] >= 0.06]

    # --- render with equal-power crossfades -------------------------------------------
    xf = int(XF * SR)
    out = []
    table = []
    t_edit = 0.0
    fade_in = np.sin(np.linspace(0, np.pi / 2, xf)) ** 2
    fade_out = 1 - fade_in
    acc = np.zeros(0, np.float32)
    for k, (a, b) in enumerate(segs):
        sa, sb = int(a * SR), int(b * SR)
        # extend each segment by half a crossfade on each side (taken from the audio, still silence-ish)
        ea = max(0, sa - xf // 2)
        eb = min(len(x), sb + xf // 2)
        seg = x[ea:eb].copy()
        if len(acc) == 0:
            start_in_out = 0
            acc = seg
        else:
            start_in_out = len(acc) - xf
            head = seg[:xf] * fade_in + acc[-xf:] * fade_out
            acc = np.concatenate([acc[:-xf], head, seg[xf:]])
        table.append({"orig_start": round(ea / SR, 4), "orig_end": round(eb / SR, 4),
                      "edit_start": round(start_in_out / SR, 4)})
    acc = acc.astype(np.float32)
    fi = int(0.012 * SR); acc[:fi] *= np.linspace(0, 1, fi, dtype=np.float32)   # the recording starts mid-word: no click
    fo = int(0.25 * SR); acc[-fo:] *= np.linspace(1, 0, fo, dtype=np.float32)
    os.makedirs(os.path.join(ROOT, "audio"), exist_ok=True)
    os.makedirs(os.path.join(ROOT, "data"), exist_ok=True)
    if os.environ.get("VOICE_F32"):  # debugging: also dump raw float samples
        acc.tofile(os.environ["VOICE_F32"])
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "flac", "-sample_fmt", "s32", "-bits_per_raw_sample", "24",
                    os.path.join(ROOT, "audio/voice_edit.flac")], input=acc.tobytes(), check=True)

    removed_manual = sum(b - a for a, b, _ in MANUAL_CUTS)
    info = {
        "sample_rate": SR,
        "original_duration": round(dur, 3),
        "edited_duration": round(len(acc) / SR, 3),
        "manual_cuts": [{"start": a, "end": b, "seconds": round(b - a, 2), "reason": r} for a, b, r in MANUAL_CUTS],
        "manual_seconds_removed": round(removed_manual, 2),
        "pauses_tightened": len(pauses),
        "pause_seconds_removed": round(sum(L - t for _, L, t in pauses), 2),
        "pauses": [{"orig_at": p[0], "was": p[1], "now": p[2]} for p in pauses],
        "segments": table,
    }
    json.dump(info, open(os.path.join(ROOT, "data/cutlist.json"), "w"), indent=1)
    mf = os.path.join(ROOT, "film.json"); man = json.load(open(mf))
    if abs(man.get("voiceDuration", 0) - info["edited_duration"]) > 1e-6:
        man["voiceDuration"] = info["edited_duration"]; json.dump(man, open(mf, "w"), indent=2, ensure_ascii=False)
        print("film.json voiceDuration ->", info["edited_duration"], "(word timings in data/words.json must match the new edit: re-run tools/words.py)")
    print(f"original {dur:.1f}s -> edited {len(acc)/SR:.1f}s; manual {removed_manual:.1f}s, "
          f"{len(pauses)} pauses tightened ({info['pause_seconds_removed']:.1f}s), {len(segs)} segments")


if __name__ == "__main__":
    main()
