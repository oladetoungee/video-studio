#!/usr/bin/env python3
"""Build sources.json + SOURCES.md from tools/urls.json, <story>/<slug>.json captures and tools/facts.md.
Run: python3 -I tools/build_index.py   (from assets/sources)"""
import json, os, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
urls = json.load(open('tools/urls.json'))
manual = json.load(open('tools/manual.json'))  # per "story/slug": {date, headline, status, note}
STORIES = ['overview', 'php2shell', 'railway', 'zeabur', 'opencode', 'emudhra', 'nodejs', 'ai-agents']
MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

def nice_date(s):
    if not s: return ''
    try:
        d = datetime.date.fromisoformat(s[:10]); return f'{d.day} {MON[d.month-1]} {d.year}'
    except Exception: return s

def mb(p):
    return os.path.getsize(p) / 1e6 if os.path.exists(p) else 0

entries = []
for u in urls:
    key = f"{u['story']}/{u['slug']}"; m = manual.get(key, {})
    cap = f"{u['story']}/{u['slug']}.json"
    e = {'story': u['story'], 'outlet': u['outlet'], 'slug': u['slug'], 'url': u['url']}
    if u.get('skip'):
        e.update(status='not captured', note=u['skip'], headline=m.get('headline', ''), date=m.get('date', ''))
        entries.append(e); continue
    if not os.path.exists(cap):
        e.update(status='failed', note=m.get('note', 'capture failed, see full.log'), headline=m.get('headline', ''), date=m.get('date', ''))
        entries.append(e); continue
    c = json.load(open(cap))
    date = m.get('date') or (c.get('published') or '')[:10]
    head = m.get('headline') or c.get('h1') or c.get('title')
    status = m.get('status') or c['status']
    files = c['files']
    e.update(headline=head.strip(), date=date, credit=f"Source: {u['outlet'].split(' (')[0] if not u['outlet'].startswith('Hacker News') else 'Hacker News'}, {nice_date(date)}" if date else f"Source: {u['outlet']}",
             status=status, note=m.get('note', ''), finalUrl=c.get('finalUrl'), files=files,
             sizeMB=round(sum(mb(f) for f in files.values()), 2),
             full={'width': c['full']['width'], 'height': c['full']['height'], 'pageHeight': c['full']['pageHeight']},
             scroll={k: c['scroll'][k] for k in ('width', 'height', 'fps', 'seconds', 'keyframes', 'easing', 'capped', 'formula')},
             quotes=[])
    if m.get('credit'): e['credit'] = m['credit']
    sq = {q['quote']: q for q in c['scroll']['quotes']}
    for fq in c['full']['quotes']:
        q = fq['quote']; s = sq.get(q, {})
        e['quotes'].append({'quote': q, 'fullBox': fq.get('box'), 'fullLines': fq.get('lines'),
                            'video': ({'t': s.get('t'), 'holdWindow': s.get('visibleStill'), 'box': s.get('box'), 'lines': s.get('lines')} if s.get('inVideo') else None),
                            'note': fq.get('note') or s.get('note')})
    entries.append(e)

json.dump({'generated': datetime.datetime.now().isoformat(timespec='minutes'),
           'coordinates': 'fullBox/fullLines: pixels in <slug>_full.jpg (1440 wide). video.box/lines: pixels in the 1920x1080 scroll.mp4 at time video.t (seconds); the page is standing still during holdWindow [start,end] so a highlighter can be drawn there. For other times use scroll.keyframes + formula.',
           'entries': entries}, open('sources.json', 'w'), indent=1, ensure_ascii=False)

# ---------- SOURCES.md
L = [open('tools/facts.md').read().rstrip(), '']
tot = sum(e.get('sizeMB', 0) for e in entries)
L.append('## All captures')
L.append('')
L.append('Files sit next to this file: `<story>/<slug>_fold.png` (1920x1080 first screen), `<slug>_full.jpg` (1440 wide, whole article, max 6000 px tall), '
         '`<slug>_scroll.mp4` (1920x1080, 30 fps, smooth scroll that stops on each key line). Every key line has a box for the full image and a box + time for the scroll video '
         '(exact numbers in `sources.json`; a box is x, y, width, height in pixels). Ads and cookie banners were removed before capture; nothing on any page was edited.')
L.append('')
L.append(f'Total size of the captures: {tot:.0f} MB.')
L.append('')
for st in STORIES:
    es = [e for e in entries if e['story'] == st]
    if not es: continue
    L.append(f'### {st}')
    L.append('')
    for e in es:
        if e['status'] in ('not captured', 'failed'):
            L.append(f"- **{e['outlet']}**: {e['status']} ({e.get('note','')}). {e['url']}")
            continue
        L.append(f"- **{e['outlet']}**: \"{e['headline']}\" ({nice_date(e['date']) or 'date not shown'}). Status: {e['status']}{'. ' + e['note'] if e['note'] else ''}")
        L.append(f"  - URL: {e['url']}")
        L.append(f"  - Files: `{e['files']['fold']}`, `{e['files']['full']}`, `{e['files']['scroll']}` ({e['scroll']['seconds']:.1f} s)")
        L.append(f"  - On-screen credit: **{e['credit']}**")
        for q in e['quotes']:
            if q['video']:
                vb = q['video']['box']; fb = q['fullBox']
                L.append(f"  - Key line: \"{q['quote']}\" | full.jpg box {fb['x']},{fb['y']},{fb['w']},{fb['h']} | scroll.mp4 at {q['video']['t']} s box {vb['x']},{vb['y']},{vb['w']},{vb['h']}")
            elif q['fullBox']:
                fb = q['fullBox']
                L.append(f"  - Key line: \"{q['quote']}\" | full.jpg box {fb['x']},{fb['y']},{fb['w']},{fb['h']} | not in the scroll video ({q.get('note') or 'outside scrolled part'})")
            else:
                L.append(f"  - Key line: \"{q['quote']}\" | not found as visible text ({q.get('note')})")
    L.append('')
open('SOURCES.md', 'w').write('\n'.join(L) + '\n')
print(len(entries), 'entries,', f'{tot:.0f} MB')
