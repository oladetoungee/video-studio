#!/usr/bin/env python3
"""Word timings on the EDITED voice + whisper fixes -> data/words.json, data/captions.srt

Source (first that exists):
  build/edit_dtw.json  whisper-cli -m ggml-small.en.bin -dtw small.en -ojf on build/voice_edit16k.wav (16 kHz copy of
                       audio/voice_edit.flac). DTW lands ~0.12 s late: starts snap to the energy onset just before.
  else the original kit/transcripts/transcript.words.json mapped through data/cutlist.json (coarse, a stand-in only).
Fixes: BRIEF.md "Whisper corrections". Matched on normalised words (no punctuation), applied left to right.
"""
import json, os, re, subprocess, numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJ = os.path.dirname(ROOT)
from fixes import FIXES  # noqa: E402  (tools/fixes.py)

INTRO = json.load(open(os.path.join(ROOT, "film.json")))["intro"]


def norm(w):
    return re.sub(r"[^a-z0-9']", "", w.lower().replace("’", "'"))


def load_dtw():
    d = json.load(open(os.path.join(ROOT, "build/edit_dtw.json")))
    W = []
    for s in d["transcription"]:
        for t in s["tokens"]:
            tx = t["text"]
            if tx.strip().startswith("[_") or not tx.strip():
                continue
            dt = t["t_dtw"] / 100 if t["t_dtw"] >= 0 else -1
            if tx.startswith(" ") or not W:
                W.append({"w": tx.strip(), "dtw": dt})
            else:
                W[-1]["w"] += tx
    return W


def load_mapped():
    d = json.load(open(os.path.join(PROJ, "kit/transcripts/transcript.words.json")))["transcription"]
    cl = json.load(open(os.path.join(ROOT, "data/cutlist.json")))["segments"]
    W = []
    for x in d:
        if not x["text"].strip():
            continue
        t = x["offsets"]["from"] / 1000
        for s in cl:
            if s["orig_start"] <= t < s["orig_end"]:
                W.append({"w": x["text"].strip(), "dtw": s["edit_start"] + (t - s["orig_start"]) + 0.12})
                break
    return W


def load_ml1():
    d = json.load(open(os.path.join(ROOT, "build/edit_ml1.json")))["transcription"]
    W = [{"w": x["text"].strip(), "dtw": x["offsets"]["from"] / 1000 + 0.12} for x in d if x["text"].strip() and not x["text"].strip().startswith("[")]
    # punctuation + capitals from the sentence pass (build/edit_tok.json), aligned on normalised words
    tp = os.path.join(ROOT, "build/edit_tok.json")
    if os.path.exists(tp):
        import difflib
        T = load_dtw_file(tp)
        a = [norm(w["w"]) for w in W]; b = [norm(w["w"]) for w in T]
        sm = difflib.SequenceMatcher(a=a, b=b, autojunk=False)
        for tag, i1, i2, j1, j2 in sm.get_opcodes():
            if tag == "equal":
                for k in range(i2 - i1):
                    W[i1 + k]["w"] = T[j1 + k]["w"]
    return W


def load_dtw_file(path):
    d = json.load(open(path))
    W = []
    for s_ in d["transcription"]:
        for t in s_["tokens"]:
            tx = t["text"]
            if tx.strip().startswith("[_") or not tx.strip():
                continue
            if tx.startswith(" ") or not W:
                W.append({"w": tx.strip()})
            else:
                W[-1]["w"] += tx
    return W


def main():
    OVERRIDE = [(0.0, 3.0), (14.1, 29.0)]   # edit-time stretches where the DTW pass lost the words: use the word-level pass only
    W = [w for w in load_dtw() if w["dtw"] >= 0 and not any(a <= w["dtw"] < b for a, b in OVERRIDE)]
    M = json.load(open(os.path.join(ROOT, "build/edit_ml1.json")))["transcription"]
    M = [{"w": x["text"].strip(), "dtw": x["offsets"]["from"] / 1000 + 0.12} for x in M if x["text"].strip() and not x["text"].strip().startswith("[")]
    out = [m for m in M if m["dtw"] < W[0]["dtw"] - 0.15]   # the start (DTW misplaces the first words)
    for i, w in enumerate(W):   # whisper drops a repeated stretch now and then: fill gaps over 2.5 s from the word-level pass
        out.append(w)
        nx = W[i + 1]["dtw"] if i + 1 < len(W) else None
        if nx is not None and nx - w["dtw"] > 1.7:
            fill = [m for m in M if w["dtw"] + 0.25 < m["dtw"] < nx - 0.15]
            if fill: print(f"  filled {len(fill)} words between {w['dtw']:.2f} and {nx:.2f}: {' '.join(m['w'] for m in fill)}")
            out += fill
    W = out
    print("source: whisper DTW (-nfa) on the edited voice, gaps from the word-level pass")
    x = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", os.path.join(ROOT, "audio/voice_edit.flac"), "-ar", "48000", "-ac", "1", "-f", "f32le", "-"],
                                     capture_output=True, check=True).stdout, np.float32)
    nn = len(x) // 480
    db = 20 * np.log10(np.sqrt((x[: nn * 480].reshape(nn, 480) ** 2).mean(1) + 1e-12))
    n = len(db)
    onsets = np.array([i / 100 for i in range(30, n) if db[i] > -38 and (db[i - 20:i] < -42).all()])
    for w in W:
        t = w["dtw"] - 0.12
        c = onsets[(onsets > w["dtw"] - 0.40) & (onsets < w["dtw"] + 0.05)] if len(onsets) else []
        if len(c):
            t = float(c[0])
        w["t"] = round(max(0, t), 3)
    for i in range(1, len(W)):
        W[i]["t"] = max(W[i]["t"], W[i - 1]["t"] + 0.04)
    for i, w in enumerate(W):
        nxt = W[i + 1]["t"] if i + 1 < len(W) else w["t"] + 0.6
        e = w["t"] + 0.08
        lim = min(nxt, w["t"] + 1.2)
        j = int(e * 100)
        while j < int(lim * 100) and j < n and db[j] > -42:
            j += 1
        w["e"] = round(max(e, min(j / 100, lim)), 3)
    for srcp, dst in FIXES:
        sw = [norm(x) for x in srcp.split()]
        dw = dst.split()
        i = hits = 0
        while i <= len(W) - len(sw):
            if [norm(W[i + k]["w"]) for k in range(len(sw))] == sw:
                old = W[i:i + len(sw)]
                t0, t1 = old[0]["t"], old[-1]["e"]
                if len(dw) == len(sw):   # same count: keep each word's own time
                    new = [{"w": dw[k], "t": old[k]["t"], "e": old[k]["e"]} for k in range(len(dw))]
                else:
                    new = [{"w": x_, "t": round(t0 + (t1 - t0) * k / len(dw), 3), "e": round(t0 + (t1 - t0) * (k + 1) / len(dw), 3)} for k, x_ in enumerate(dw)]
                m = re.search(r"[.,?!;:]+$", old[-1]["w"])
                if new and m and not re.search(r"[.,?!;:…]$", new[-1]["w"]):
                    new[-1]["w"] += m.group(0)
                W[i:i + len(sw)] = new
                i += max(1, len(dw))
                hits += 1
            else:
                i += 1
        if hits == 0:
            print("  fix not applied:", srcp)
    out = [{"w": w["w"], "t": w["t"], "e": w["e"]} for w in W if w["w"]]
    json.dump(out, open(os.path.join(ROOT, "data/words.json"), "w"), indent=0)
    print(len(out), "words")
    write_srt(out)


def fmt(t):
    ms = int(round(t * 1000))
    return f"{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d},{ms%1000:03d}"


def write_srt(W):
    cues, cur = [], []
    for i, w in enumerate(W):
        cur.append(w)
        text = " ".join(x["w"] for x in cur)
        nxt = W[i + 1] if i + 1 < len(W) else None
        gap = (nxt["t"] - w["e"]) if nxt else 9
        end_sentence = w["w"][-1] in ".?!"
        clause = w["w"][-1] in ",;:"
        dur = w["e"] - cur[0]["t"]
        if (not nxt or gap > 0.6 or len(text) > 74 or (end_sentence and len(text) > 30) or (clause and len(text) > 50) or dur > 5.5):
            cues.append(cur)
            cur = []
    merged = []
    for c in cues:
        if merged and len(c) == 1 and len(" ".join(x["w"] for x in merged[-1] + c)) <= 84 and c[0]["t"] - merged[-1][-1]["e"] < 0.6:
            merged[-1] = merged[-1] + c
        else:
            merged.append(c)
    lines = []
    for k, c in enumerate(merged):
        t0 = c[0]["t"] + INTRO
        t1 = max(c[-1]["e"] + 0.25, c[0]["t"] + 1.0) + INTRO
        if k + 1 < len(merged):
            t1 = min(t1, merged[k + 1][0]["t"] + INTRO - 0.02)
        text = " ".join(x["w"] for x in c)
        if text:
            text = text[0].upper() + text[1:]
        if len(text) > 42:
            mid = len(text) // 2
            sp = min((i for i, ch in enumerate(text) if ch == " "), key=lambda i: abs(i - mid))
            text = text[:sp] + "\n" + text[sp + 1:]
        lines.append(f"{k+1}\n{fmt(t0)} --> {fmt(t1)}\n{text}\n")
    open(os.path.join(ROOT, "data/captions.srt"), "w").write("\n".join(lines))
    print(len(merged), "caption cues")


if __name__ == "__main__":
    main()
