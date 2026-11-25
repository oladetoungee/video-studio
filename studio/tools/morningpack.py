#!/usr/bin/env python3
"""Morning review pack: one page per project of what waits on Gbemi.

python3 -I studio/tools/morningpack.py <decisions.json> <date>
decisions.json: {slug: {"name": str, "rec": "01", "decisions": [str], "done": [str], "links": {label: url}}}
Writes projects/<slug>/outputs/_review/morning-<date>/ (thumbnails.jpg with the recommended one marked, index.html)
and MORNING-<date>.html at the workspace root (links to each page through the studio, http://localhost:7700/p/...).
"""
import html, json, os, re, sys, glob
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
FONT = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
MONO = '/System/Library/Fonts/Menlo.ttc'


def font(p, z):
    try:
        return ImageFont.truetype(p, z)
    except Exception:
        return ImageFont.load_default()


def thumbs_sheet(slug, rec, out):
    d = os.path.join(ROOT, 'projects', slug, 'outputs', 'thumbnails')
    files = sorted(f for f in glob.glob(os.path.join(d, '*.png')) if not os.path.basename(f).startswith('overview'))
    if not files:
        return None, []
    tw, th, pad, lab, cols = 480, 270, 24, 44, 3
    rows = (len(files) + cols - 1) // cols
    W, H = cols * tw + (cols + 1) * pad, rows * (th + lab) + (rows + 1) * pad
    sheet = Image.new('RGB', (W, H), '#EDE9E2'); dr = ImageDraw.Draw(sheet)
    f1, f2 = font(MONO, 18), font(FONT, 20)
    names = []
    for i, f in enumerate(files):
        r, c = divmod(i, cols); x, y = pad + c * (tw + pad), pad + r * (th + lab + pad)
        im = Image.open(f).convert('RGB').resize((tw, th)); sheet.paste(im, (x, y))
        n = os.path.basename(f)[:-4]; names.append(n)
        is_rec = n.split('-')[0] == rec
        is_new = re.match(r'^\d+[b-z]-', n) is not None
        if is_rec:
            for k in range(6):
                dr.rectangle([x - 1 - k, y - 1 - k, x + tw + k, y + th + k], outline='#FF4713')
        tag, col = ('RECOMMENDED', '#FF4713') if is_rec else ('NEW 11-16', '#111114') if is_new else ('', None)
        tx = x
        if tag:   # the tag sits in the label row under the picture, never over the thumbnail's own words
            wtag = int(dr.textlength(tag, font=f2)) + 16; dr.rectangle([x, y + th + 8, x + wtag, y + th + 36], fill=col)
            dr.text((x + 8, y + th + 11), tag, font=f2, fill='#FFFFFF'); tx = x + wtag + 10
        dr.text((tx, y + th + 12), n[:44 if not tag else 30], font=f1, fill='#111114')
    sheet.save(out, quality=88)
    return out, names


def esc(s):
    return html.escape(str(s))


def md_block(path):
    if not os.path.exists(path):
        return '<p>(none)</p>'
    t = open(path, encoding='utf-8').read()
    return '<pre class="md">' + esc(t) + '</pre>'


def main():
    dec = json.load(open(sys.argv[1], encoding='utf-8')); date = sys.argv[2]
    idx = []
    for slug, d in dec.items():
        P = os.path.join(ROOT, 'projects', slug); od = os.path.join(P, 'outputs', '_review', f'morning-{date}'); os.makedirs(od, exist_ok=True)
        sheet, names = thumbs_sheet(slug, d.get('rec', ''), os.path.join(od, 'thumbnails.jpg'))
        rv = os.path.join(P, 'outputs', '_review')
        extra = [os.path.basename(f) for f in sorted(glob.glob(os.path.join(rv, '*2026-11-16*.jpg')))]
        covers = 'covers.jpg' if os.path.exists(os.path.join(rv, 'covers.jpg')) else None
        base = f'/p/{slug}/outputs/_review/'
        h = [f'<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(d["name"])}: morning</title>',
             '<style>body{font:17px/1.5 -apple-system,Helvetica,Arial,sans-serif;background:#EDE9E2;color:#111114;margin:0;padding:24px 16px;max-width:1200px;margin:auto}'
             'h1{font-size:34px;margin:0 0 4px}h2{font-size:22px;margin:36px 0 8px;border-top:1px solid #111;padding-top:14px}img{max-width:100%;display:block;margin:8px 0;border:1px solid #ccc}'
             'li{margin:4px 0}.md{white-space:pre-wrap;background:#FFFDF6;padding:14px;border:1px solid #ddd;font:14px/1.45 Menlo,monospace;overflow-x:auto}a{color:#1B3FD8}</style>',
             f'<h1>{esc(d["name"])}</h1><p>What is waiting on you, made overnight {esc(date)}. Nothing was exported.</p>',
             '<h2>Your decisions</h2><ol>' + ''.join(f'<li>{esc(x)}</li>' for x in d.get('decisions', [])) + '</ol>',
             '<h2>Links</h2><ul>' + ''.join(f'<li><a href="{esc(u)}">{esc(k)}</a></li>' for k, u in d.get('links', {}).items()) + '</ul>']
        if sheet:
            h.append(f'<h2>Thumbnails (recommended one has the orange frame)</h2><img src="{base}morning-{date}/thumbnails.jpg">')
        for e in extra:
            h.append(f'<h2>Before / after: {esc(e)}</h2><img src="{base}{esc(e)}">')
        if covers:
            h.append(f'<h2>Short covers</h2><img src="{base}covers.jpg">')
        h.append('<h2>What we did overnight</h2><ul>' + ''.join(f'<li>{esc(x)}</li>' for x in d.get('done', [])) + '</ul>')
        h.append('<h2>Caption changes (before and after)</h2><p>The full old kit is in archive/captions-2026-11-16/refined-kit-before.md.</p>')
        h.append(md_block(os.path.join(P, 'archive', 'captions-2026-11-16', 'CHANGES.md')))
        open(os.path.join(od, 'index.html'), 'w', encoding='utf-8').write('\n'.join(h))
        idx.append((d['name'], f'http://localhost:7700/p/{slug}/outputs/_review/morning-{date}/index.html', len(d.get('decisions', []))))
        print(slug, 'ok', len(names), 'thumbnails')
    page = ['<!doctype html><meta charset="utf-8"><title>Morning pack</title><style>body{font:18px/1.6 -apple-system,Helvetica,sans-serif;background:#EDE9E2;padding:24px 16px;max-width:900px;margin:auto}a{color:#1B3FD8}</style>',
            f'<h1>Morning pack {esc(date)}</h1><ul>'] + [f'<li><a href="{u}">{esc(n)}</a> ({k} decisions)</li>' for n, u, k in idx] + ['</ul>']
    open(os.path.join(ROOT, f'MORNING-{date}.html'), 'w', encoding='utf-8').write('\n'.join(page))


if __name__ == '__main__':
    main()
