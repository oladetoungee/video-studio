#!/usr/bin/env python3
"""One still per beat (shot) of every moment, both formats, on one sheet -> <out>/overview.jpg

    python3 projects/reading-stack/talking-head/tools/overview.py      (run from the workspace root)
"""
import json, os, subprocess, tempfile
from PIL import Image, ImageDraw, ImageFont

H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); ROOT = os.path.dirname(os.path.dirname(os.path.dirname(H)))
MAN = os.path.join(H, 'talking-head.json'); man = json.load(open(MAN)); OUT = os.path.join(H, man['out'])
COMP = os.path.join(ROOT, 'studio', 'tools', 'composite.mjs')


def meta(mid):
    out = subprocess.run(['node', COMP, 'meta', MAN, mid, '--aspect', '16x9'], capture_output=True, text=True, check=True).stdout
    return json.loads(out[out.index('{'):])


def stills(mid, aspect, ts, d):
    subprocess.run(['node', COMP, 'stills', MAN, mid, '--aspect', aspect, '--captions', '--at', ','.join(f'{t:.2f}' for t in ts), '--out', d], check=True, capture_output=True)
    return sorted(os.path.join(d, f) for f in os.listdir(d) if f.endswith('.jpg') and f'_{aspect}_' in f)


def main():
    rows = []
    try: font = ImageFont.truetype(os.path.join(ROOT, 'library', 'fonts', 'DMMono-Medium.ttf'), 22)
    except Exception: font = None
    with tempfile.TemporaryDirectory(dir=os.path.join(H, 'build')) as td:
        for i, m in enumerate(man['moments']):
            mt = meta(m['id'])
            ts = [max(s['start'] + 0.3, s['end'] - 0.35) for s in mt['SCENES']]
            for asp in ('16x9', '9x16'):
                d = os.path.join(td, f"{m['id']}_{asp}"); os.makedirs(d)
                rows.append((f"{i + 1:02d} {m['slug']} · {asp} · {mt['TOTAL']:.1f}s", asp, stills(m['id'], asp, ts, d)))
        cw = {'16x9': (320, 180), '9x16': (153, 272)}
        width = max(len(fs) * (cw[a][0] + 6) for _, a, fs in rows) + 20
        height = sum(cw[a][1] + 44 for _, a, _ in rows) + 20
        sheet = Image.new('RGB', (width, height), (17, 17, 20)); dr = ImageDraw.Draw(sheet); y = 10
        for label, a, fs in rows:
            dr.text((10, y + 4), label.upper(), fill=(237, 233, 226), font=font); y += 34
            for j, f in enumerate(fs):
                sheet.paste(Image.open(f).convert('RGB').resize(cw[a]), (10 + j * (cw[a][0] + 6), y))
            y += cw[a][1] + 10
        sheet.save(os.path.join(OUT, 'overview.jpg'), quality=85)
        print(os.path.join(OUT, 'overview.jpg'), sheet.size)


if __name__ == '__main__':
    main()
