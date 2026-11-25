#!/usr/bin/env python3
"""Word timings on the EDITED timeline + spelling fixes -> data/words.json, data/captions.srt

build/edit_dtw.json is whisper.cpp (whisper-cli -m ggml-small.en.bin -dtw small.en -ojf --prompt "Ghana, Marrify, TechCabal, ...") (small.en, DTW token timestamps) run on a 16 kHz copy of audio/voice_edit.flac
(build/voice_edit16k.wav); build/edit_env.npy is its 10 ms energy envelope. Both are intermediates: regenerate them first.
DTW times land ~0.13 s after the real onset, so starts are shifted and snapped to energy onsets.
"""
import json, os, re, numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (whisper words) -> (correct words). Matched on normalised words, applied left to right.
FIXES = [
    # whisper (small.en + DTW, run on audio/voice_edit.flac) -> what she says (BRIEF.md corrections; checked against both passes)
    ("licence marriage officials.", "licensed marriage officials."),
    ("registrars, generals department,", "the Registrar-General's Department,"),
    ("a church or a bookstore or a venue", "a church or a pastor and a marriage venue"),
    ("centralised data finally, finally.", "centralised data, finally, finally!"),
    ("drawbacks that we saw.", "drawbacks it cited."),
    ("digital orb of Europe", "digital hub of Europe"),
    ("I'm not going to say like, it's so real.", "I'm not going to lie, it's so real."),
    ("the way it sinks,", "the way it syncs,"),
    ("everything just sinks.", "everything just syncs."),
    ("And I see that I'm doing something in this direction. At least, even though it's so lucky. My first instinct is like,", "And I see Ghana doing something in this direction… my first instinct is like,"),
    ("because he saw so much problem.", "because it solves so many problems."),
    ("There's more reliable record instead", "There's one reliable record instead"),
    ("NIN and this another.", "NIN and this and that."),
    ("is like a drawback that TechCabal reads,", "is the drawback that TechCabal raised,"),
    ("And now that's a record", "And now that record is"),
    ("I'm saying this about someone that likes to open it in Estonia.", "I'm saying this as someone that likes open data. In Estonia,"),
    ("You can search online", "you can search online"),
    ("how much a business. I don't know anything about it.", "how much a business, like, you don't know anything about,"),
    ("made in the year.", "made in a year."),
    ("money, also public accountability.", "money, holds public accountability."),
    ("consensus part", "consent part"),
    ("a divorce paper system in one cut out or somewhere in 2003.", "a divorce record sitting in a courthouse somewhere in 2003,"),
    ("And the difference in that, and somebody just been able", "and somebody just being able"),
    ("data minimization", "data minimisation"),
    ("Could we minimize data", "Could we minimise data"),
    ("which cost granted it,", "which court granted it,"),
    ("Marify", "Marrify"),
    ("technology is non-neutral.", "technology is not neutral."),
    ("African contest to a larger stand divorce,", "African context, to a large extent, divorce,"),
    ("it's pretty stigmatized.", "is pretty stigmatised."),
    ("This is not just a privacy", "It's not just a privacy"),
    ("generally smart", "genuinely smart"),
    ("is also paired, which you've been able to see what's happening today.", "is also paired with you being able to see what's happening to it."),
    ("if you are creating data transversely, open data in Africa,", "if we are creating open data in Africa,"),
    ("because I generally think it's also a problem.", "because I genuinely think it also solves a problem."),
    ("This guy just ran into my age.", "this is just what's been running in my head."),
]
INTRO = json.load(open(os.path.join(ROOT, "film.json")))["intro"]  # title card before her voice


def norm(w):
    return re.sub(r"[^a-z0-9']", "", w.lower().replace("’", "'"))


def load_words():
    d = json.load(open(os.path.join(ROOT, "build/edit_dtw.json")))
    W = []
    for s in d["transcription"]:
        for t in s["tokens"]:
            tx = t["text"]
            if tx.startswith("[_"):
                continue
            dt = t["t_dtw"] / 100 if t["t_dtw"] >= 0 else t["offsets"]["from"] / 1000 + 0.12   # no DTW time: segment offset
            if tx.startswith(" ") or not W:
                W.append({"w": tx.strip(), "dtw": dt})
            else:
                W[-1]["w"] += tx
                if W[-1]["dtw"] is None:
                    W[-1]["dtw"] = dt
    return W


def main():
    W = load_words()
    import subprocess
    x = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", os.path.join(ROOT, "audio/voice_edit.flac"), "-ar", "48000", "-ac", "1", "-f", "f32le", "-"], capture_output=True, check=True).stdout, np.float32)
    nn = len(x) // 480; db = 20 * np.log10(np.sqrt((x[: nn * 480].reshape(nn, 480) ** 2).mean(1) + 1e-12))
    n = len(db)
    onsets = [i / 100 for i in range(30, n) if db[i] > -40 and (db[i - 25:i] < -45).all()]
    oi = np.array(onsets)
    for w in W:
        t = w["dtw"] - 0.12
        c = oi[(oi > w["dtw"] - 0.45) & (oi < w["dtw"] + 0.05)]
        if len(c):
            t = float(c[0])
        w["t"] = round(max(0, t), 3)
    # monotonic
    for i in range(1, len(W)):
        W[i]["t"] = max(W[i]["t"], W[i - 1]["t"] + 0.04)
    # ends: next start, or energy drop
    for i, w in enumerate(W):
        nxt = W[i + 1]["t"] if i + 1 < len(W) else w["t"] + 0.6
        e = w["t"] + 0.08
        lim = min(nxt, w["t"] + 1.2)
        j = int(e * 100)
        while j < int(lim * 100) and j < n and db[j] > -44:
            j += 1
        w["e"] = round(max(e, min(j / 100, lim)), 3)

    # apply fixes
    for src, dst in FIXES:
        sw = [norm(x) for x in src.split()]
        dw = dst.split()
        i = 0
        hits = 0
        while i <= len(W) - len(sw):
            if [norm(W[i + k]["w"]) for k in range(len(sw))] == sw:
                t0, t1 = W[i]["t"], W[i + len(sw) - 1]["e"]
                # keep trailing punctuation of the last source word if the fix has none
                new = []
                for k, x in enumerate(dw):
                    frac0 = k / len(dw)
                    frac1 = (k + 1) / len(dw)
                    new.append({"w": x, "t": round(t0 + (t1 - t0) * frac0, 3), "e": round(t0 + (t1 - t0) * frac1, 3)})
                # carry sentence punctuation that the fix would otherwise drop
                m = re.search(r"[.,?!;:]+$", W[i + len(sw) - 1]["w"])
                if m and not re.search(r"[.,?!;:…]$", new[-1]["w"]):
                    new[-1]["w"] += m.group(0)
                W[i:i + len(sw)] = new
                i += len(dw)
                hits += 1
            else:
                i += 1
        if hits == 0:
            print("  fix not applied:", src)
    out = [{"w": w["w"], "t": w["t"], "e": w["e"]} for w in W]
    json.dump(out, open(os.path.join(ROOT, "data/words.json"), "w"), indent=0)
    print(len(out), "words")
    write_srt(out)


def fmt(t):
    ms = int(round(t * 1000))
    return f"{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d},{ms%1000:03d}"


def write_srt(W):
    cues = []
    cur = []
    for i, w in enumerate(W):
        cur.append(w)
        text = " ".join(x["w"] for x in cur)
        nxt = W[i + 1] if i + 1 < len(W) else None
        gap = (nxt["t"] - w["e"]) if nxt else 9
        end_sentence = w["w"][-1] in ".?!"
        clause = w["w"][-1] in ",;:"
        dur = w["e"] - cur[0]["t"]
        if (not nxt or gap > 0.6 or len(text) > 74 or (end_sentence and len(text) > 30)
                or (clause and len(text) > 50) or dur > 5.5):
            cues.append(cur)
            cur = []
    # no one-word orphan cues: fold them into the previous cue when it stays short
    merged = []
    for c in cues:
        if merged and len(c) == 1 and len(" ".join(x["w"] for x in merged[-1] + c)) <= 84 and c[0]["t"] - merged[-1][-1]["e"] < 0.6:
            merged[-1] = merged[-1] + c
        else:
            merged.append(c)
    cues = merged
    lines = []
    for k, c in enumerate(cues):
        t0 = c[0]["t"] + INTRO
        t1 = max(c[-1]["e"] + 0.25, c[0]["t"] + 1.0) + INTRO
        if k + 1 < len(cues):
            t1 = min(t1, cues[k + 1][0]["t"] + INTRO - 0.02)
        text = " ".join(x["w"] for x in c)
        if len(text) > 42:  # two lines, split near the middle on a space
            mid = len(text) // 2
            sp = min((i for i, ch in enumerate(text) if ch == " "), key=lambda i: abs(i - mid))
            text = text[:sp] + "\n" + text[sp + 1:]
        lines.append(f"{k+1}\n{fmt(t0)} --> {fmt(t1)}\n{text}\n")
    open(os.path.join(ROOT, "data/captions.srt"), "w").write("\n".join(lines))
    print(len(cues), "caption cues")


if __name__ == "__main__":
    main()
