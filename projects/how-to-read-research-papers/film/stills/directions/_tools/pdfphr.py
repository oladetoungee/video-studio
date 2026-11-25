# find phrases in a gs txtwrite xml; print page, bbox (pt, y top-origin baseline) per line chunk
import re, sys, json
xml = open(sys.argv[1]).read(); phrases = sys.argv[2:]
pages = xml.split('<page>')[1:]
out = {}
for pi, pg in enumerate(pages, 1):
    chars = [(int(a), int(b), int(c), int(d), html) for a, b, c, d, html in re.findall(r'<char bbox="(\d+) (\d+) (\d+) (\d+)" c="(.*?)"/>', pg)]
    # build string with spaces when gaps
    s = ''; idx = []
    for i, ch in enumerate(chars):
        if i and (ch[1] != chars[i-1][1] or ch[0] - chars[i-1][2] > 1.5):
            s += ' '; idx.append(None)
        c = ch[4].replace('&quot;', '"').replace('&amp;', '&').replace('&lt;','<').replace('&gt;','>').replace('&#x2019;', "'").replace('&#xfb01;','fi').replace('&#xfb00;','ff').replace('&#xfb03;','ffi').replace('&#x2018;',"'")
        s += c; idx += [i] * len(c)
    low = re.sub(r'\s+', ' ', s).lower()
    # map collapsed index back: s has single spaces already
    for p in phrases:
        k = s.lower().find(p.lower())
        if k < 0: continue
        sel = [chars[j] for j in idx[k:k+len(p)] if j is not None]
        lines = {}
        for x0, y0, x1, y1, _ in sel: lines.setdefault(y0, []).append((x0, x1))
        out[p] = {'page': pi, 'lines': [[min(a for a, _ in v), y, max(b for _, b in v)] for y, v in sorted(lines.items())]}
print(json.dumps(out, indent=1))
