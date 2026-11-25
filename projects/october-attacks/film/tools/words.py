#!/usr/bin/env python3
"""Word timings on the EDITED voice + whisper fixes -> data/words.json, data/captions.srt

Source: build/edit_dtw.json = whisper-cli -m ggml-small.en.bin -dtw small.en -nfa -ojf on build/voice_edit16k.wav
(16 kHz copy of audio/voice_edit.flac). DTW lands ~0.12 s late: starts move back 0.12 s, then snap to an energy onset
just before when one exists. Fixes: kit/refined-kit.md 7e "Whisper mishearings" (normalised words, left to right).
Run after tools/edit_voice.py:  python3 tools/words.py
"""
import json, os, re, subprocess, numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INTRO = json.load(open(os.path.join(ROOT, "film.json")))["intro"]

FIXES = [
    ("HP, which", "PHP, which"), ("security roles.", "security holes."), ("Hapsun,", "apps,"), ("secrets keys.", "secret keys."),
    ("Zebra,", "Zeabur,"), ("PHP 2 show.", "PHP2Shell."), ("the show part", "the shell part"), ("Getting a show", "Getting a shell"),
    ("PHP 2 show", "PHP2Shell"), ("that each should", "that it should"), ("this loop all is", "this loophole is"),
    ("on-import servers", "honeypot servers,"), ("just for this before", "just four days before"),
    ("railway", "Railway"), ("post deployment", "paused deployments"), ("the ads asked", "they asked"),
    ("how the attack has gotten.", "how the attackers got in."), ("January 24th.", "January 2024."), ("pass services", "pause services"),
    ("open code console", "OpenCode Console"), ("open code", "OpenCode"), ("from their views.", "from their bills."),
    ("open AI and Tropic Google", "OpenAI, Anthropic, Google,"), ("distillation account.", "distillation attack."),
    ("the railways, the borough and open codes incident", "the Railway, Zeabur and OpenCode incidents"),
    ("Emudra", "eMudhra"), ("sign-in keys", "signing keys"), ("sees it is.", "says it is."), ("affect the website", "fake a website"),
    ("shark name jay commies", "SharkNinja, Cummins,"), ("successful arc.", "successful hack."), ("to arc into", "to hack into"),
    ("fifty dollars", "$50"), ("our AI is literally", "how AI is literally"), ("PHP social loop holes", "PHP2Shell loopholes"),
    ("find the box", "find the bugs"), ("working companies", "working in companies"),
    ("literally been dealing", "literally been stuck over dealing"), ("Zebra", "Zeabur"), ("cybersecurity awareness month", "Cybersecurity Awareness Month"),
    ("restart your Apache", "restart your Apache"),
]


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
    return [w for w in W if w["dtw"] >= 0]


def main():
    W = load_dtw()
    x = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", os.path.join(ROOT, "audio/voice_edit.flac"), "-ar", "48000", "-ac", "1", "-f", "f32le", "-"],
                                     capture_output=True, check=True).stdout, np.float32)
    nn = len(x) // 480
    db = 20 * np.log10(np.sqrt((x[: nn * 480].reshape(nn, 480) ** 2).mean(1) + 1e-12))
    n = len(db)
    onsets = np.array([i / 100 for i in range(10, n) if db[i] > -30 and (db[i - 6:i] < -36).all()])
    for w in W:
        t = w["dtw"] - 0.12
        c = onsets[(onsets > w["dtw"] - 0.35) & (onsets < w["dtw"] + 0.03)] if len(onsets) else []
        if len(c):
            t = float(c[-1])
        w["t"] = round(max(0, t), 3)
    for i in range(1, len(W)):
        W[i]["t"] = max(W[i]["t"], W[i - 1]["t"] + 0.04)
    for i, w in enumerate(W):
        nxt = W[i + 1]["t"] if i + 1 < len(W) else w["t"] + 0.6
        e = w["t"] + 0.08
        lim = min(nxt, w["t"] + 1.2)
        j = int(e * 100)
        while j < int(lim * 100) and j < n and db[j] > -36:
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
                if len(dw) == len(sw):
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
    print(len(out), "words, last at", out[-1]["e"])
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
        if text and (k == 0 or merged[k - 1][-1]["w"][-1] in ".?!"):
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
