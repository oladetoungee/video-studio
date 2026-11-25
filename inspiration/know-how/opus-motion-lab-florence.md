# "Opus 5.5 Motion Lab: Make Claude Animate Like a Studio" — Florence (@flxrnc), shared by Gbemi 2026-10-11
(Her paste was truncated by the chat at ~50k chars, ending in "The lab loop" section. Condensed notes of what we received; the article itself is on X.)

## Core claims
- Opus writes code that paints pixels; every frame a pure function of t (we already do this: seek(t)).
- "One prompt" pieces hide the middle part: 4-15 numbered follow-ups citing FRAME NUMBERS and MEASUREMENTS, not feelings.
- Adjectives are where the default look lives: replace every adjective with a number (materials, light, camera, springs, frames).
- Vague prompt ("premium, modern") produced dark navy space, glow ring, bloom, particles, spinning product, made-up tagline = the default AI look. Directed prompt (448 words of numbers) produced a studio film.

## Directed prompt template (fill every line)
GOAL (feel/do, 1 sentence) · OUTPUT (file, W×H) · TIME (s × fps = frames, loop?) · LOOK (hex palette, one accent, type+weight+size+tracking) · MOTION (easing as cubic-bezier, springs as damping ratio, durations in frames) · SHOTS (frame ranges, one hero move per shot, handoff: cut/match cut/mask wipe; default to cut) · BANNED (named defaults) · QA (stills at named frames, contact sheet, fix, then full render). 3D adds MODEL and CAMERA.

## Render contract (paste under any motion prompt)
One self-contained HTML; pinned libraries only; no network except fonts/pinned libs; every frame pure function of t; window.renderAt(t); no Date.now / timers / unseeded Math.random; loops render 0..N-1 and N-1 flows into 0. ?t= URL freeze snippet; window.__ready after fonts/bakes.

## Motion numbers
- Easing: out-expo 0.16,1,0.3,1 (text/logo reveals) · out-quint 0.22,1,0.36,1 (premium entrances) · in-out-quart 0.76,0,0.24,1 (moves, camera) · in-expo 0.7,0,0.84,0 (exits) · out-back 0.34,1.56,0.64,1 (playful pop). Enter ease-out, exit ease-in 40-50% shorter, cross-screen ease-in-out; linear only for rotation/progress/loop phase.
- Springs by damping ratio ζ = d/(2√(k·m)): 1 no bounce, 0.7-0.85 premium, 0.4-0.6 playful, <0.3 cartoon. Position/size may bounce, opacity/colour never. Closed-form spring(t, zeta, f) = 1 - e^(-ζωt)(cos ωd t + ζω/ωd sin ωd t).
- Durations: feedback 100-200 ms, UI moves 200-500, hero reveals 600-900; stagger letters 1 frame, words 60-120 ms, items 40-80 ms; next element starts when previous is 30-50% done.
- Beat grid: frames/beat = fps·60/BPM; compute each beat from time and round (never accumulate). Cut on the beat, change layout on the bar.
- Holds: ≥ 0.3 s per word + 0.5 s; 2% push during holds. Parallax 1.0/0.5/0.2. Text ≥ 4.5:1 contrast every frame; ≤ 3 flashes/s.
- One hero per shot; secondaries travel 50-70% of the hero and start 100-200 ms later; ambient < 5% of hero travel on a slow sine.
- Animation principles as numbers: anticipation (11-frame crouch 1.2×0.75), squash/stretch (0.85×1.28 takeoff, 1.25×0.7 landing), overlapping action (arms lag 4 frames, legs 6), follow-through (2.2 Hz, damping 0.22), arcs; exaggerate key poses 10-30% for phone size.

## Lab loop (render, look, fix)
Stills at named frames; contact sheet every 12th frame (ffmpeg select+tile); onion skin (frames at 25% opacity: spacing should tighten near keys); speed graph (position per frame: corners = dead starts). Follow-ups name frames ("bump pops at frame 85"). A NUMERIC AUDIT read the live scene on every frame and checked the prompt's numbers (71 checks: labels light on their frame, feet touch pads on landing frames). Motion blur: average subframes over half a frame in linear light (180° shutter). Effort: medium by default.

## Sound (all measured, never listened)
- Every hit lands on frame + 1; build tonal hits as buffers whose attack ends on a cosine crest at exactly (F+1)·samplesPerFrame; no waveshaper (it delays peaks); kick: 0.5-1 ms attack, short knock so the FIRST peak is the largest.
- Hits 3-6 dB over the bed (K-weighted, first 60 ms); duck the bed under big hits.
- Check the PHONE BAND (200 Hz-6 kHz) loudness, not only the full mix: one mix had 80% of energy under 60 Hz (phones play nothing there). Raise pads, open bass filters, octave-up bass.
- Remove DC; limiter ≤ 1.5 dB gain reduction; AAC encode lifts true peak ~0.9 dB → limit the WAV to -2.2 dBTP so the MP4 stays under -1 dBTP; decode the muxed MP4 and re-check every hit's timing.
- Loops: AAC adds ~16 ms padding at the seam; keep the WAV as master; 2 ms raised-cosine fade on first/last 96 samples for the single-loop MP4.
