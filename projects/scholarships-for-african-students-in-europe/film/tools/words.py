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
    ("To be a Nigerian", "…a Nigerian"), ("all these scholarship works", "how these scholarships work"), ("highest difference", "biggest difference"),
    ("university for us you get", "university first to get"), ("Chevenin", "Chevening"), ("Chevnan", "Chevening"), ("child needs scholarship", "Chevening scholarship"),
    ("world if they are Erasmus", "world. Erasmus"), ("first day in one", "first year in one"), ("2027 stat", "2027 start"),
    ("catalog as scholarships", "catalogue has scholarships"), ("One of our advices is", "What I'd advise is"),
    ("DAAD EPPOS", "DAAD EPOS"), ("EPPOS", "EPOS"), ("Broom Cure", "brochure"), ("that's what only works for specific costs", "that one only works for specific courses."),
    ("The lease for 2020-28", "The list for 2027-28,"), ("through the cost by that cost's deadline", "through the course, by that course's deadline."),
    ("We are looking to start", "If you're looking to start"), ("they are even said", "they have even said"), ("the other you apply", "the order you apply"),
    ("8/24/2027", "8 to 24 February 2027."), ("Ulland scholarship", "Holland Scholarship"), ("which is to be called", "which used to be called"),
    ("first aid", "first year."), ("orange knowledge program", "Orange Knowledge Programme."), ("university LE because", "university, because"),
    ("Stependium Hungarykam", "Stipendium Hungaricum"), ("two elementary students rather", "tuition, your monthly stipend rather,"),
    ("You're placing the dorm", "your place in the dorm"), ("temple's public foundation", "Tempus Public Foundation"), ("act as extra documents", "ask for extra documents"),
    ("federal scholarship board", "Federal Scholarship Board."), ("Police citizens", "Only citizens"), ("Erasmus Mondos", "Erasmus Mundus"),
    ("artificial intelligence in sustainable societies", "Artificial Intelligence for Sustainable Societies,"), ("artificial intelligence for sustainable societies", "Artificial Intelligence for Sustainable Societies"),
    ("We are thinking about studying", "If you're thinking about studying"), ("Nigerians getting really well", "Nigerians get in really well."),
    ("closed out of October", "closed as of October,"), ("scholarship for 2020", "scholarship for 2028,"), ("up to day CV", "up-to-date CV,"),
    ("university admissions", "University Admissions,"), ("swedish institute", "Swedish Institute"), ("global professionals", "Global Professionals"),
    ("NL scholarship", "NL Scholarship"), ("Erasmus Mundus masters", "Erasmus Mundus master's"),
    ("2020/2027 start", "2027 start"), ("each program space", "each programme's page"), ("Epos", "EPOS"), ("without insurance", "with health insurance,"),
    ("ask courses", "has courses"), ("through the cost by that courses deadline", "through the course, by that course's deadline."),
    ("scholarship you're Nigerian is a full", "scholarship if you're Nigerian. It's a full"), ("8-24th of February 2027", "8 to 24 February 2027."),
    ("five thousand euros for your first day", "5,000 euros for your first year."), ("in Hungary, it's the Hungarian", "in Hungary, Stipendium Hungaricum. It's the Hungarian"),
    ("covers your two monthly stipend rather", "covers your tuition, your monthly stipend rather,"), ("goes along already", "goes a long way already."),
    ("temples public foundation", "Tempus Public Foundation"), ("actually extract documents", "ask for extra documents,"),
    ("discount and there are some of those programs that includes an Estonian university like artificial intelligence sustainable societies and there are some of those programs that my school",
     "discount and Erasmus Mundus programmes that include an Estonian university, like Artificial Intelligence for Sustainable Societies, an Erasmus Mundus programme that my school"),
    ("the year before you go", "a year before you go."), ("If you like the program you know if you won't", "If you like the program enough, you won't"),
    ("and I hope If you get in, I'm", "and I hope you get in. I'm"), ("catalog of all", "catalogue of all"),
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
