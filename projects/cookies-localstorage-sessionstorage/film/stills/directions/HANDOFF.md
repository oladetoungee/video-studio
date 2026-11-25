# cookies-localstorage-sessionstorage directions: progress notes (resume from here)
Agent: directions (2026-11-02, batch 2). Brief: projects/DIRECTIONS-BRIEF-2026-11.md.

## Looks I am trying (other batch-2 agents: please stay clear of these)
(revised after reading http-status-codes = ticket counter, edge-case B = giant form input, cheapest A = yellow price label)
- A-crashtest: CRASH TEST / WHAT SURVIVES. A test lab: login, cart and form are crash-tested against REFRESH / CLOSE TAB /
  CLOSE BROWSER / INCOGNITO; a survive / wiped results board fills in. Concrete off-white #ECEBE6, ink, crash-marker quadrant
  circles (yellow/black), survive green, wiped red. Big Shoulders Display + JetBrains Mono.
- B-tabs: CLOSE THE TAB. Giant browser TABS (the tab strip, the x button, the refresh arrow) are the stage; scene changes
  are tab closes / new tabs / refreshes. Chocolate #2B1A12 ground, cream tabs, one mint. Familjen Grotesk + Red Hat Mono.
- C-cloakroom: THE CLOAKROOM. Her own metaphor: coat rack, hangers, ROUND BRASS coat tags (not paper tickets), Pexels
  coat photos; oxblood velvet #4A1418, brass #C99A3B. Bowlby One numerals + Work Sans + Source Serif italic.

## Pipeline (own, light): _tools/r.mjs (puppeteer + page.html per direction with window.seek/show; video under the render lock),
_tools/mixtest.py (voice + Mixkit bed + cues.json -> -14 LUFS), _tools/capture.mjs (real pages), _tools/sheet.py. _shared/lib.js, _shared/words.json.
Sources: _src/cap -> _src/clips (MDN sessionStorage / Set-Cookie / quotas, RFC 6265, WebKit 7-day). Pexels: _src/pexels (credits film/assets/CREDITS.md).
Motion tests: A 215.0-222.5 (refresh / close tab), B 140.0-147.8 (cart survives), C 41.0-49.0 (ticket).

## Done
- A-crashtest: page + stills a1-a6, p1-p4, motion-test.mp4 (-14.4 LUFS). (stamp timing patched after; re-render test before critic)
- B-tabs: page + stills b1-b5, p1-p3, motion-test (-14.5 LUFS). C-cloakroom: page + stills c1-c5, p1-p2, motion-test (-14.1). Next: TH frames (_src/footage raw_*.jpg), shorts, correction frame, critic.
- TH frames (th1-th5, fix-A-correction, sh6-A-hook/mid, sh6-B-hook, sh6-C-hook) + overview.png done. Next: critic round 1.
- 2026-11-02 critic round 1: A 7.2, B 6.3, C 6.8 (none at 8; A closest; suggested A + cloakroom scene in A's style). Round-2 fixes applied to A (fact on board, grid only on board, 3 different entrances, form locked, cloak scene a7, TH captions, correction uses WebKit localStorage sentence, shorts hook + window 59-62%), B (ring, shrink visible, squared cards, contrast) and C (oxblood ground, rack inside frame, tag cue 43.0). Re-rendering tests; then critic round 2, README.
- critic round 2: A 7.5, B 6.5, C 6.0 (TH: th1-A 8, sh6-A-hook 8). All 8 A fixes applied after (sync 217.73/220.09, ground #D9DCDA, yellow only on marker, mono 44 px, form x1.3 locked, tag one line, correction wording + highlight, GONE smaller, short captions). Not re-scored. README + STATUS written. DONE apart from the final A motion test re-render + overview (running).
