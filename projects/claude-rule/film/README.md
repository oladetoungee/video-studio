# claude-rule: the motion film ("The Thread")

Her narration, 4:29, 57 screens. About half is one chat on screen: her lines arrive as her messages, Anthropic's real pages arrive from the other
side as cards (highlighted as she reads them), the model never speaks, and each chapter ends with "This conversation has
ended". Her pick 2026-10-13: direction A, with B's two voices (Anthropic's and Mustafa Suleyman's words in Newsreader serif,
hers in her bubbles) and C's plank as one set piece (2:16-2:32) in A's palette. Open it in the studio: `/edit/claude-rule/`.

| What | Where |
|---|---|
| Visual system (fonts, palette, light/dark, chat engine, breakouts, big type, sound roles) | `scenes/thread.js` |
| Screens 1-17 (0:00-2:12) / 18-34 (2:12-end) | `scenes/scenes1.js`, `scenes/scenes2.js` |
| Voice edit + cutlist | `tools/edit_voice.py` -> `audio/voice_edit.flac`, `data/cutlist.json` |
| Word times + captions | whisper DTW (`build/edit_dtw.json`) + `tools/words.py` -> `data/words.json`, `data/captions.srt` |
| Cut board | `data/transitions.json` |
| QA | `build/qa/` (sheets, audit, soundqa, contact sheets), `build/contrast.json` |

## Look (numbers)
- Grounds: lilac `#CDBFF3` (her top in this recording); night `#141119` for the big-type screens and the end card.
- Her bubbles: ink `#15131D`, text `#F4F1FA`, Schibsted Grotesk 500, 58 px (16:9) / 56 px (9:16), radius 34 with a 10 px tail corner.
  Key words turn lilac as she says them. Source cards: white, 2 px `#A99BD6` edge, IBM Plex Mono 30 px credit
  ("Screenshot · anthropic.com · 8 Oct 2026"), highlighter `#B9A5F5` multiplied over the exact phrase box (`assets/sources/anthropic/*_capture.json`).
- Breakouts: Schibsted 800, up to 560 px, from the spoken word at its bubble size to the centre, outExpo 15 f, white marker after 10 f.
- Big type: Schibsted 700/800, words rise 0.18 em on their spoken time (outQuint 9 f). Labels IBM Plex Mono >= 30 px.
- Everything chat-shaped is labelled ILLUSTRATION (input row); her 9 pm what-if is labelled "her what-if · not a real reply";
  the meter is labelled "Anthropic, as she reads it"; the "long day" requests are labelled ILLUSTRATION. No Claude/Anthropic logo.

## Voice edit (272.3 s -> 262.2 s)
Retakes cut: "I don't even," (1:50), "And I don't think that, so" (1:59), "This," (2:34), and the trailing
"If you follow through with the formula, it's just... I can't place it, but if you somehow..." (3:46-3:52). Two long pauses
tightened. Every join checked by re-transcribing the edited voice.

## Sound
Music (Mixkit, Stock Music Free License): 480 "Curiosity" (Diego Nava), 722 "Odd Beats 01" (Lily J), 167 "Brainiac"
(Alejandro Magaña), ducked about 15 dB under her voice. Sound effects (Mixkit, Sound Effects Free License): message pops,
camera shutter when a real page lands, highlighter, soft bass hits on breakouts, tape stop on "This conversation has ended",
a riser into the slope tilt, falling hit, light switch for day/night, ticks, paper, a ding, one whoosh. Master -14 LUFS.

## Full-frame screens between the chats
"cruel." / "No, it's not." / "an offender?" / "Hey, I'm tired." / "This conversation has ended" breakouts (75 % width); her three
questions struck through; the meter (Anthropic "not sure / might be conscious", her reading); the real pages zoomed with the
phrase highlighted (policy rule, constitution title + "moral status is deeply uncertain", Suleyman's essay); serif lifts of
their words; "Claude" with her human words stuck on and falling off; "Claude is a tool."; the sum (illustration); night type
(living organisms, living things, guard your heart, 9pm or 10pm, I don't know); her numbered list; the plank (powerful, the
slope tilt, and the callback at the end); the if-then chain; day and night (the ground flips on her words); end card.

## Critic rounds (fresh critic agent, harsh, default reject, bar 8)
| Round | Score | Main notes | What changed |
|---|---|---|---|
| 1 | 6.3 | 84 % one chat layout, small breakouts, dead holds, quiet sounds, sticker collision, no Suleyman source, small ending | rebuilt ~40 % into full-frame screens; breakouts 75 % width; slow push on chats; stickers fall with gravity, label moved; Suleyman essay captured; ending rebuilt |
| 2 | 6.9 | chat runs 51-66 s and 72-87 s, sparse type screens, double text at the end, 9:16 crops, sync early | "This conversation has ended" break-out at 54 s; stickers on her words from 80 s; bigger centred type; "I don't know" full frame; per-role sound timing |
| 3 | 7.0 | chat runs 54-67, 96-106, 190-201 s; 9:16 page crops; 9:16 lead-in type small; sync of ticks/hits; top bubble cut by the frame edge | constitution page full frame at 62 s; the sum full frame at 101 s; "9pm or 10pm" night screen at 196 s; 9:16 pages show whole lines; bubbles leave before the top margin; ticks/hits aligned to their start; impose list and chain centred |

## Open (after round 3, not re-scored: the brief allows 3 rounds)
- The critic's bar of 8 was not reached (7.0). Her review decides; the taste notes still open: "more image-led screens" (the film
  uses her words, real pages and drawn objects; no stock pictures), and plain chat stretches of 8-10 s remain.
- 9:16 real-page zooms show whole lines, so the page text is about 26 px at 1080 wide (the highlighted phrase is then set large
  in the serif lift right after).
- soundqa still finds about a quarter of the cues' first peak more than 1 frame early: files whose first transient precedes
  their loudest peak (peak alignment). lab.mjs audit: 0 cues off the picture.

## After the main session's review (2026-10-13, 11:40)
- Chats are bigger and centred in 16:9: bubbles 66 px (was 58), column 1340 px wide (70 % of the frame), and a short chat
  sits centred in the frame until it fills it (then the newest message rests on the input row as before).
- Centred mono lines wrap onto two balanced lines inside the margins (the sum's ILLUSTRATION line was clipped in 9:16).
- Re-exported film 16:9 + 9:16, the full talking-head edit (both sizes, music back to 480 "Curiosity" after the footmix fix)
  and all 6 shorts.
