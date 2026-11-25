#!/usr/bin/env python3
"""Verify the exported moments: duration, size, frame count, loudness (EBU R128 integrated, true peak), and that
her words survived the cuts (whisper transcript of the export vs. the words the EDL keeps).

    python3 tools/verify.py            -> prints a table, writes build/verify.json
"""
import json, os, re, subprocess, difflib, tempfile
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
man = json.load(open(os.path.join(H, 'talking-head.json'))); OUT = os.path.join(H, man['out'])
W = json.load(open(os.path.join(H, 'data/raw_words.json'))); E = json.load(open(os.path.join(H, 'data/edl.json')))
MODEL = os.path.expanduser('~/.cache/whisper/ggml-small.en.bin')
norm = lambda s: re.sub(r"[^a-z0-9' ]", ' ', s.lower().replace('’', "'")).split()


def expected(mid):
    out = []
    for a, b in E[mid]['clips']:
        out += [w['w'] for w in W if a - 0.02 <= w['t'] < b - 0.03]
    return norm(' '.join(out))


rows = []
for i, m in enumerate(man['moments']):
    name = f"moment{i + 1:02d}-{m['slug']}"
    for asp in ('9x16', '16x9'):
        f = os.path.join(OUT, f'{name}_{asp}.mp4')
        if not os.path.exists(f): rows.append({'file': os.path.basename(f), 'missing': True}); continue
        pr = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'stream=codec_type,width,height,nb_frames,duration', '-show_entries', 'format=duration,size', '-of', 'json', f], capture_output=True, text=True).stdout)
        v = next(s for s in pr['streams'] if s['codec_type'] == 'video'); a = next(s for s in pr['streams'] if s['codec_type'] == 'audio')
        e = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-vn', '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
        tail = e[e.rfind('Summary:'):]
        I = float(tail.split('I:')[1].split('LUFS')[0]); tp = float(tail.split('Peak:')[1].split('dBFS')[0])
        row = {'file': os.path.basename(f), 'w': v['width'], 'h': v['height'], 'frames': int(v['nb_frames']), 'dur': round(float(pr['format']['duration']), 2),
               'v_dur': round(float(v['duration']), 3), 'a_dur': round(float(a['duration']), 3), 'MB': round(int(pr['format']['size']) / 1e6, 1), 'lufs': I, 'tp': tp,
               'srt': os.path.exists(f.replace('.mp4', '.srt'))}
        if asp == '9x16':   # transcript check once per moment (same audio in both)
            with tempfile.TemporaryDirectory() as td:
                wav = os.path.join(td, 'a.wav'); subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', f, '-vn', '-ac', '1', '-ar', '16000', wav], check=True)
                txt = subprocess.run(['whisper-cli', '-m', MODEL, '-f', wav, '-np', '-nt'], capture_output=True, text=True).stdout
            got, exp = norm(txt), expected(m['id'])
            sm = difflib.SequenceMatcher(None, exp, got)
            row['words_match'] = round(sm.ratio(), 3)
            row['missing_words'] = [' '.join(exp[i1:i2]) for op, i1, i2, j1, j2 in sm.get_opcodes() if op in ('delete', 'replace') and i2 - i1 >= 1][:12]
        rows.append(row)
json.dump(rows, open(os.path.join(H, 'build', 'verify.json'), 'w'), indent=1)
for r in rows:
    print({k: v for k, v in r.items() if k != 'missing_words'})
    if r.get('missing_words'): print('   differs:', r['missing_words'])
