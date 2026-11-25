import sys, json, urllib.request, urllib.parse, re
q = sys.argv[1]; n = int(sys.argv[2]) if len(sys.argv) > 2 else 12
u = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({"action":"query","format":"json","generator":"search","gsrsearch":"filetype:bitmap "+q,"gsrnamespace":6,"gsrlimit":n,"prop":"imageinfo","iiprop":"url|size|extmetadata","iiurlwidth":1600})
r = json.load(urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent":"gbemi-video-studio/1.0"})))
for p in (r.get("query",{}).get("pages",{}) or {}).values():
    ii = p["imageinfo"][0]; m = ii.get("extmetadata",{})
    lic = m.get("LicenseShortName",{}).get("value",""); art = re.sub("<[^>]+>","",m.get("Artist",{}).get("value",""))[:60]
    print(f'{ii["width"]}x{ii["height"]} | {lic} | {art} | {p["title"]} | {ii.get("thumburl")}')
