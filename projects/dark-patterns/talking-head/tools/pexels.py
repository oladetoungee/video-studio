import json, os, sys, urllib.request, urllib.parse
KEY = open(os.path.expanduser('~/.config/pexels/key')).read().strip()
out = sys.argv[1]; rows = []
for q in sys.argv[2:]:
    u = 'https://api.pexels.com/v1/search?' + urllib.parse.urlencode({'query': q, 'per_page': 3, 'orientation': 'landscape'})
    d = json.load(urllib.request.urlopen(urllib.request.Request(u, headers={'Authorization': KEY, 'User-Agent': 'Mozilla/5.0'})))
    for p in d['photos'][:2]:
        fn = f"px-{p['id']}.jpg"; path = os.path.join(out, fn)
        if not os.path.exists(path):
            open(path, 'wb').write(urllib.request.urlopen(urllib.request.Request(p['src']['large2x'], headers={'User-Agent': 'Mozilla/5.0'})).read())
        rows.append((q, fn, p['url'], p['photographer'], p.get('alt', '')[:70]))
for r in rows: print(' | '.join(r))
