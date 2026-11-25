#!/usr/bin/env python3
"""Contact sheets for every MP4/MOV under projects/<slug>/outputs -> projects/<slug>/reference/sheets/.
Keyframe-only decode (outputs have a keyframe every 0.4 s), streamed through ffmpeg select+tile, one JPEG per video."""
import json, math, os, subprocess, sys, tempfile

FONT = "/System/Library/Fonts/Helvetica.ttc"
ROOT = "/Users/gbemi/Desktop/CODE/videos/projects"

def probe(f):
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                          "stream=width,height:format=duration", "-of", "json", f], capture_output=True, text=True).stdout
    j = json.loads(out)
    s = j["streams"][0]
    return float(j["format"]["duration"]), int(s["width"]), int(s["height"])

def mmss(d):
    d = int(round(d)); return f"{d//60}:{d%60:02d}"

def sheet(slug, f):
    d, w, h = probe(f)
    rel = os.path.relpath(f, os.path.join(ROOT, slug, "outputs"))
    name = rel.replace("/", "__").rsplit(".", 1)[0] + ".jpg"
    outdir = os.path.join(ROOT, slug, "reference", "sheets")
    os.makedirs(outdir, exist_ok=True)
    out = os.path.join(outdir, name)
    ar = w / h
    if ar >= 1.2: tw, cols = 384, 6
    elif ar <= 0.7: tw, cols = 216, 10
    else: tw, cols = 288, 8
    th = int(round(tw / ar / 2) * 2)
    iv = 3.0 if d <= 360 else 6.0
    if d < 12: iv = max(1.0, d / 4)
    if d / iv + 1 > 120: iv = d / 119
    n = int(d // iv) + 1
    cols = min(cols, n)
    rows = math.ceil(n / cols)
    tf = tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False)
    tf.write(f"{slug}  /  {rel}   length {mmss(d)}   {w}x{h}   one frame every {iv:.1f} s ({n} frames)")
    tf.close()
    fs = 16 if tw < 300 else 18
    vf = (f"select='isnan(prev_selected_t)+gte(t-prev_selected_t\\,{iv - 0.2:.3f})',"
          f"scale={tw}:{th},"
          f"drawtext=fontfile={FONT}:text='%{{pts\\:hms}}':fontsize={fs}:fontcolor=white:box=1:boxcolor=black@0.7:boxborderw=4:x=6:y=h-th-10,"
          f"tile={cols}x{rows}:padding=4:margin=4:color=0x222222,"
          f"pad=iw:ih+56:0:56:color=0x111114,"
          f"drawtext=fontfile={FONT}:textfile='{tf.name}':fontsize=26:fontcolor=0xEDE9E2:x=12:y=16")
    cmd = ["/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg", "-v", "error", "-y", "-skip_frame", "nokey", "-i", f, "-an", "-vf", vf,
           "-frames:v", "1", "-q:v", "5", out]
    r = subprocess.run(cmd, capture_output=True, text=True)
    os.unlink(tf.name)
    ok = r.returncode == 0 and os.path.exists(out)
    print(("OK " if ok else "FAIL ") + out + ("" if ok else " :: " + r.stderr[-400:]), flush=True)

if __name__ == "__main__":
    slug = sys.argv[1]
    files = []
    for dp, dn, fn in os.walk(os.path.join(ROOT, slug, "outputs")):
        for x in fn:
            if x.lower().endswith((".mp4", ".mov")): files.append(os.path.join(dp, x))
    for f in sorted(files):
        out_name = os.path.relpath(f, os.path.join(ROOT, slug, "outputs")).replace("/", "__").rsplit(".", 1)[0] + ".jpg"
        if os.path.exists(os.path.join(ROOT, slug, "reference", "sheets", out_name)) and "--force" not in sys.argv:
            print("SKIP " + out_name, flush=True); continue
        sheet(slug, f)
    print("DONE " + slug, flush=True)
