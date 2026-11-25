# Ghana / Marrify: the motion film

This is a motion-graphics film on her own narration: Ghana's Marrify, centralised data, and what Estonia taught her. The folder is a studio project, so open `/edit/ghana-marrify/` in the studio. The engine is `../../../studio/` (see `studio/README.md`).

**State (2026-10-01): phase 1, the look is waiting for her OK.**
- The style frames are in `stills/style-frames/`: 8 kinds of scene, each in 16:9 and 9:16, plus `contact_*.png`.
- The 45 s preview with sound is `../outputs/video/ghana-marrify_preview45_16x9.mp4`.
- What exists so far:
  - The open (0:00-0:50) is complete.
  - Single scenes exist for Estonia, everything online, consent, data minimisation, the yes/no question, what the answer does not require, the minimal answer, Estonia vs Ghana, transparency both ways, and the end card.
- The other spans hold the previous scene until phase 2 fills them.

## Her voice
`tools/edit_voice.py` turns `../kit/transcripts/voice.m4a` (311.8 s) into `audio/voice_edit.flac` (297.2 s). The cutlist is `data/cutlist.json`.
- Five retakes, mumbles and unclear asides are cut:
  - "let me just, let me love up on it"
  - "it's like the eight papers"
  - "something to think about that I've been thinking about"
  - "because I want to believe that divorce information, right? There's a consent part"
  - "I think that that's even [?] drawback"
- One repeated "super, super" is cut.
- Every cut is snapped to the quietest 10 ms and joined with a 35 ms crossfade.
- The recording starts mid-word, so it gets a 12 ms fade-in.

`tools/words.py` produces `data/words.json` and `data/captions.srt` from whisper DTW, which is run on the edited voice with a name prompt.
- Its `FIXES` table applies the BRIEF.md corrections, for example "Ghana just launched", Registrar-General's Department, "I'm not going to lie", syncs, NIN, court, "not neutral", "African context, to a large extent", "paired with you being able to see", "both ways", and Marrify.
- One-word caption orphans are folded into the previous cue.

`film.json` sets `intro` to 0.5 s, so the film opens on the hook and the title is the end card.

## Visual system (`scenes/kit.js`)
- **Grounds:** paper `#EDE9E2`, ink `#111114` and card `#FFFDF6`, plus three full-bleed punchline grounds. Ink text sits on green and orange.
  - Blue `#1B3FD8` is the system and data ("transparency runs both ways").
  - Green `#22E08A` is the "yes" and what works ("centralised data, finally").
  - Orange `#FF4713` is the human cost (drawbacks, consent, stigma).
- **Accent:** one per scene, set by `addS(..., { acc })`.
  - Blue (`#6E8CFF` on ink) is the system.
  - Green (`#0B7A47` on paper, `#22E08A` on ink) is what works.
  - Orange is the cost.
- **Type:**
  - House display face is Bricolage Grotesque 800.
  - Archivo 700 is used for her sentences.
  - DM Mono is used for labels.
  - Instrument Serif italic is used for one word per frame.
- **Recurring objects:**
  - The record card, whose fields are placeholder bars and never invented data.
  - A generic search box, always labelled ILLUSTRATION and never Marrify's UI or logo.
  - Flat flags in official colours: Ghana, Estonia, Nigeria.
  - Source cards with connectors.
  - A folder, a phone, a yes/no answer, redaction bars, a stamp, a calendar tile, and an article excerpt.
- **Entrances vary:**
  - The visual leads.
  - Headlines land as one unit on their key word.
  - Only the big display lines build word by word.
- There is no corner HUD.
- Facts shown on screen and not spoken are from BRIEF.md's verified list: 28 Aug 2026, Accra, and the Ministry's full name.

## Sound
- Voice runs through the house filter.
- Music is Mixkit (Stock Music Free License), from `library/music/`:
  - 175 "Digital Clouds" (Alejandro Magaña)
  - 443 "Serene View" (Arulo)
  - 234 "Thinking About You" (Arulo)
  - It is ducked by about 12 dB under speech.
- SFX are Mixkit (Sound Effects Free License), from `library/sounds/` and `audio/sfx/` (copied from reading-stack): whoosh, pop, card, typing, click, tick, pen, stamp, impact.
- Everything is placed on the visual hits.
- `python3 ../../../studio/tools/stems.py ghana-marrify` masters to -14.0 LUFS integrated, -1.9 dBTP.
- In the preview, SFX peaks sit about 2-5 dB under the voice.

## Heavy jobs
`python3 tools/lockrun.py <command>` runs a command under the machine-wide `/tmp/gm-render.lock` (BRIEF.md).

`tools/styleframes.py <dir>` names the style-frame stills and builds the contact sheets.
