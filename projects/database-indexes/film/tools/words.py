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
    # whisper (small.en + DTW, run on audio/voice_edit.flac) -> what she says (BRIEF.md "Whisper corrections")
    ("a bookstores and the books table", "a bookstore, and the books table"),
    ("It starts as the first row", "It starts at the first row"),
    ("has maybe 10 hundred rows,", "has maybe 10, 100 rows,"),
    ("read the old book", "read the whole book"),
    ("that starts the value from a column", "that stores the values from a column"),
    ("it only starts the column", "it only stores the column"),
    ("Now it sees Alice at email.com.", "Now it sees alice@email.com."),
    ("so he moves to the right,", "so it moves to the right,"),
    ("in the index as a pointer", "in the index has a pointer"),
    ("a million check in the worst", "a million checks in the worst"),
    ("called a b3, and a b3 works", "called a B-tree, and a B-tree works"),
    ("Adding a database query will literally up your query optimization goal,", "Adding a database index will literally up your query optimisation game,"),
    ("In SKA,", "In SQL,"),
    ("search books by hotel,", "search books by author,"),
    ("finds auto 42, and go straight", "finds author 42, and goes straight"),
    ('the word "explain" in', "the word EXPLAIN in"),
    ('In Postgres SQL, you will see "quen scan".', 'In PostgreSQL, you will see "Seq Scan".'),
    ('if you see "index scan",', 'if you see "Index Scan",'),
    ('"Sequence scan", "sequential scan".', '"Seq Scan", "sequential scan".'),
    ('If it says "all",', 'If it says "ALL",'),
    ('like "ref or range",', 'like "ref" or "range",'),
    ("talk about B3, ASH, bitmap,", "talk about B-tree, hash, bitmap,"),
    ("The first one is B3. B3. The B3 is", "The first one is B-tree. B-tree. The B-tree is"),
    ('starts with "ari".', 'starts with "Harry".'),
    ('start with "ari" slip next to', 'start with "Harry" sit next to'),
    ("Your primary query already", "Your primary key already"),
    ("the composites index on", "the composite index on"),
    ("the composites index,", "the composite index,"),
    ("So say your index, last name, and first name together", "So say you index last name and first name together"),
    ("sorted by son name first.", "sorted by surname first."),
    ("sorted by son name.", "sorted by surname."),
    ("All the adder enemies are together, and for that, along all the ocafos are together.", "All the Adeyemis are together, and all the Okafors are together."),
    ("inside each son name,", "inside each surname,"),
    ("So in the ocafos, adder ocafo will come before shitty ocafo.", "So in the Okafors, Ada Okafor will come before Chidi Okafor."),
    ("looking for adder ocafo,", "looking for Ada Okafor,"),
    ("I find ocafo, and then I find adder.", "I find Okafor, and then I find Ada."),
    ("first name is adder?", "first name is Ada?"),
    ("There's probably adder addemi in the front, and adder ocafo in the middle, and adder williams", "There's probably Ada Adeyemi in the front, and Ada Okafor in the middle, and Ada Williams"),
    ("across the old phone book", "across the whole phone book"),
    ("groups the adders together,", "groups the Adas together,"),
    ("kinds of like searches for the rest of the database index types,", "kinds of searches. For the rest of the database index types,"),
    ("exact matches, only, you know,", "exact matches only, you know,"),
    ("just use b3.", "just use B-tree."),
    ("we have special index down is mostly for location data,", "we have spatial index, that one is mostly for location data,"),
    ("search restaurants name a coffee shop near me,", "search a restaurant name, a coffee shop near me,"),
    ("when a right app", "when a ride app"),
    ("each other on the app. So on the map,", "each other on the map,"),
    ("full test index", "full-text index"),
    ("each word in the test instead of the old value.", "each word in the text instead of the whole value."),
    ("covering index and the spatial index, you also hear", "covering index and partial index. You also hear"),
    ("non clustered", "non-clustered"),
    ("The cluster index decides the order the tables rules are actually stored.", "The clustered index decides the order the table's rows are actually stored."),
    ("sorted by sonin. So once you find the name, you find everything a table", "sorted by surname. So once you find the name, you find everything. A table"),
    ("because the rules can only be stored in one holder.", "because the rows can only be stored in one order."),
    ("points back to the rule.", "points back to the row."),
    ("So if your other table has six indexes,", "So if your orders table has six indexes,"),
    ("updating the old table", "updating the whole table"),
    ("So the more in database indexes", "So the more database indexes"),
    ("for a smart table, the index, the database", "for a small table, the database"),
    ("just count the table anyway,", "just scan the table anyway,"),
    ("the database too wouldn't use it.", "the database still won't use it."),
    ("wrapping your colon in a function.", "wrapping your column in a function."),
    ("The lower case versions are not in that budget.", "The lowercase versions are not in that index."),
    ("So the database can use it here unless", "So the database can't use it here, unless"),
    ("be having a wildcard at the start of a like the data, the index is sorted", "be adding a wildcard at the start of a LIKE. The index is sorted"),
    ("when you had a foreign key,", "when you add a foreign key,"),
    ("automatically, there isn't one already.", "automatically, if there isn't one already."),
    ("But in Postgres SQL, it doesn't.", "But in PostgreSQL, it doesn't."),
    ("why it joins suddenly will get slow.", "why joins suddenly get slow."),
    ("in your where, classes, your joins or your order by.", "in your WHERE clauses, your joins or your ORDER BY."),
    ("the database has to do look at a million", "the database has to look at a million"),
    ("it read them in order and starts after the first 10.", "it reads them in order and stops after the first 10."),
    ("when you use explain,", "when you use EXPLAIN,"),
    ("constantly reaching to or really search,", "constantly written to and rarely searched,"),
    ("So that's it to its database indexes.", "So that's it with database indexes."),
    ("every index has a cost every time you insert,", "every index has a cost. Every time you insert,"),
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
        nlen = len(text) + 1 + len(nxt["w"]) if nxt else 999
        if (not nxt or gap > 0.6 or nlen > 70 or (end_sentence and len(text) > 14)
                or (clause and len(text) > 40) or dur > 5.0):
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
