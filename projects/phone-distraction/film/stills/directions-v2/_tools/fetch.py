import sys, json, urllib.request, urllib.parse, re, os, time
out = sys.argv[1]; os.makedirs(out, exist_ok=True)
H = {"User-Agent":"gbemi-video-studio/1.0"}
meta = {}
mp = os.path.join(out, "_licences.json")
if os.path.exists(mp): meta = json.load(open(mp))
for line in sys.argv[2:]:
    name, title = line.split("=", 1)
    u = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({"action":"query","format":"json","titles":title,"prop":"imageinfo","iiprop":"url|extmetadata","iiurlwidth":2000})
    p = list(json.load(urllib.request.urlopen(urllib.request.Request(u, headers=H)))["query"]["pages"].values())[0]
    ii = p["imageinfo"][0]; m = ii["extmetadata"]
    src = ii.get("thumburl") or ii["url"]
    ext = os.path.splitext(urllib.parse.urlparse(src).path)[1].lower() or ".jpg"
    fn = name + ext
    data = urllib.request.urlopen(urllib.request.Request(src, headers=H)).read()
    open(os.path.join(out, fn), "wb").write(data)
    meta[fn] = {"title": title, "page": ii["descriptionurl"], "licence": m.get("LicenseShortName",{}).get("value",""), "author": re.sub("<[^>]+>","",m.get("Artist",{}).get("value","")).strip()}
    print(fn, meta[fn]["licence"], len(data)); time.sleep(0.5)
json.dump(meta, open(mp, "w"), indent=1)
