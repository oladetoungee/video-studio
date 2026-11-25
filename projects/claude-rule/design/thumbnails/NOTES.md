# claude-rule thumbnails: notes (2026-10-13)

21 options, 1280×720, editable at http://localhost:7700/design/claude-rule/thumbnails/ . PNGs + `overview.png` in
`outputs/thumbnails/` (copy in `~/Downloads/claude-rule-thumbnails/`). Built by `tools/gen.py` (index.html always rewritten;
content.json keeps her studio edits unless `--reset`), rendered by `node render.mjs`, review sheet `python3 tools/review.py`.

## Recommended 3 (for YouTube Test & Compare; scores confirmed by a fresh round-3 cold critic)
1. **01 TOO RUDE FOR AI?** + "Can You Hurt a Chatbot? Why Claude Ends Cruel Chats" (image 7, pair 8/8, taste 7.5)
2. **20 IS CLAUDE CONSCIOUS? / my answer: no** + "Why I'm Kind to AI, Even Though It Can't Feel" (image 8, pair 8/8, taste 7.5)
3. **22 NEW CLAUDE RULE / DON'T BE CRUEL / FROM NOV 12** + "Is It Okay to Be Mean to AI? Anthropic's New Rule" (image 8, pair 9/8, the top pair). Only before 12 November; after that swap in **02 AI CAN HANG UP** + "Can You Hurt a Chatbot? Why Claude Ends Cruel Chats" (image 7, pair 8/8).
Also 8/8 pairs: 03, 10, 13, 19. Taste favourites: 07 (collage), 21 (her 10b clipping look), 01, 20.
Accuracy note from the critic: don't pair the "new rule" thumbnails (12, 21, 22) with "Claude Can End Your Chat…" titles; chat-ending exists since Aug 2025 and is not the new rule. Titles were reordered so title 1 is the best pair.

## How they were made
- Concepts and titles: `kit/refined-kit.md` sections 2-3 (strategist). "Anthropic Will Ban Cruelty to Claude" (T2) dropped after the gates: strangers read "ban" as account bans.
- Her photos: 4K frames of `kit/anthropic rule for claude.mov`, never flipped, never retouched, warmed lightly (`tools/warm.py`, colour balance only), person matte with macOS Vision (`tools/frames.sh`) so words can sit behind her head. Frames were picked by `tools/expr.swift` (Vision face landmarks every 0.25 s: mouth closed, eyes open; scores in `tools/expr.tsv`) after the taste critic rejected mid-word mouths. The handheld mic sits at her chin in every frame of this recording: **her own photos would beat these** (ask her: phone in hand, sceptical look, hand on heart).
- Look: the film's Thread direction (lilac #CDBFF3, ink #15131C, Schibsted Grotesk 900, IBM Plex Mono), `lib/cr.css`. Fonts OFL (`fonts/`).
- Honesty: every chat window, phone, laptop, message box is a generic drawing marked ILLUSTRATION, never Claude's real interface, no logo; the model never says anything (only system lines "This chat has ended"); cruel user messages are always blurred. Real props: Anthropic's "2026 Usage Policy update" paragraph (8 Oct 2026) and the constitution line "Claude's moral status is deeply uncertain.", cropped from the captures in `film/assets/sources/anthropic/`, each with a source line. No stock photos used.
- References per direction: in each content.json "direction" (viral samples 1, 2, 4, 6, 9; the collage samples; Pinterest "how to be consistent", "COOK", "POV"; outliers from the refined kit).

## Gates (THUMBNAILS.md), 2 rounds + a 3rd fix pass
- Round 1 (22 options): image-only cold critic, title-pair critic, taste critic. Main notes: mouths mid-word (14 of 22), the same "red message + chat ended" card everywhere, three red messages unreadable at 168 px, collage text over her face, "AI LEAVES" awkward, "Will Ban" overstates. Cut 07 (should AI hang up, a near-duplicate of 02) and 09 (talk nice or else); added a second collage (07 is Claude conscious).
- Round 3 (fresh cold critic, after the fix pass): image 4-8, best pairs 7/6 to 9/8.
- Round 2 (21): cold image 4-7, best pairs up to 9/7; taste 5-7.5 (eleven at 7+). Round 3 fixes applied from both reports (listed under each option). Weakest and kept only as options: 05 (a slide), 13 and 18 (off-topic politeness), 14 (plaster), 15 (faceless).

## Options
### 01-too-rude-for-ai  (recommended)
- Words: TOO RUDE FOR AI?
- Titles: "Can You Hurt a Chatbot? Why Claude Ends Cruel Chats" / "Claude Can End Your Chat If You're Cruel. But Why?" / "Is It Okay to Be Mean to AI? Anthropic's New Rule"
- Round 3 (after fixes): cold image 7 · best pair (title 1) clarity 8, click 8 · taste 7.5 (round 2).

### 02-ai-can-hang-up
- Words: AI CAN HANG UP
- Titles: "Can You Hurt a Chatbot? Why Claude Ends Cruel Chats" / "Is It Okay to Be Mean to AI? Anthropic's New Rule" / "Claude Can End Your Chat If You're Cruel. But Why?"
- Round 3: cold 7 · best pair (title 1) 8/8 (a top-3 pair) · taste 7.

### 03-cruel-ai-leaves
- Words: BE CRUEL, AI WALKS OUT
- Titles: "Can You Hurt a Chatbot? Why Claude Ends Cruel Chats" / "Claude Can End Your Chat If You're Cruel. But Why?"
- Round 3: cold 7 · best pair (title 1) 8/8 · taste 6.

### 04-be-rude-get-cut-off
- Words: BE RUDE, GET CUT OFF?
- Titles: "Is It Okay to Be Mean to AI? Anthropic's New Rule" / "Claude Can End Your Chat If You're Cruel. But Why?"
- Round 3: cold 7 · best pair (title 1) 8/7 · taste 6.5.

### 05-frustrated-vs-cruel
- Words: FRUSTRATED VS CRUEL
- Titles: "Is It Okay to Be Mean to AI? Anthropic's New Rule" / "Claude Can End Your Chat If You're Cruel. But Why?"
- Round 3: cold 5 · best pair (title 1) 8/7 (the most accurate about the rule) · taste 5.5.

### 06-mean-to-claude
- Words: MEAN TO AI?
- Titles: "Claude Can Hang Up on You. Should AI Be Allowed To?" / "Is It Okay to Be Mean to AI? Anthropic's New Rule"
- Round 3: cold 5 · best pair (title 1) 7/7 · taste 6.

### 07-is-claude-conscious-collage
- Words: is Claude conscious?
- Titles: "Anthropic Says Claude Might Be Hurt. I Don't Buy It" / "AI Can't Feel. So Why Protect Claude From Cruelty?"
- Round 3: cold 5 · best pair (title 1) 7/7 · taste 7.5 (closest to her collage samples).

### 08-yelling-at-ai
- Words: YELLING AT AI?
- Titles: "Is It Okay to Be Mean to AI? Anthropic's New Rule" / "Should You Be Nice to AI? Yes, But Not for Its Sake"
- Round 3: cold 7 · best pair (title 1) 8/7 · taste 6.5.

### 10-tool-or-person
- Words: IS AI A TOOL OR PERSON?
- Titles: "Why I'm Kind to AI, Even Though It Can't Feel" / "AI Can't Feel. So Why Protect Claude From Cruelty?"
- Round 3: cold 7 · best pair (title 1) 8/8 · taste 6.5.

### 11-ai-that-hangs-up-collage
- Words: the AI that hangs up
- Titles: "Claude Can End Your Chat If You're Cruel. But Why?" / "Is It Okay to Be Mean to AI? Anthropic's New Rule"
- Round 3: cold 5 · best pair 7/6 · taste 7.

### 12-new-rule-for-claude
- Words: NEW RULE FOR CLAUDE
- Titles: "Is It Okay to Be Mean to AI? Anthropic's New Rule" / "Mean to Claude? It Can End the Chat. Is That Right?"
- Round 3: cold 6 · best pair (title 1) 8/7 · taste 7.

### 13-kind-to-a-chatbot
- Words: BE KIND TO A CHATBOT?
- Titles: "Why I'm Kind to AI, Even Though It Can't Feel" / "Should You Be Nice to AI? Yes, But Not for Its Sake"
- Round 3: cold 6 · best pair (title 1) 8/8 · taste 5.

### 14-can-ai-feel-hurt
- Words: CAN AI FEEL HURT?
- Titles: "Can You Hurt a Chatbot? Why Claude Ends Cruel Chats" / "Is Claude Conscious? Why Anthropic Protects It From Users"
- Round 3: cold 6 · best pair (title 1) 8/7 · taste 6.5.

### 15-cruel-to-ai-equals
- Words: CRUEL TO AI = CHAT ENDED
- Titles: "Can You Hurt a Chatbot? Why Claude Ends Cruel Chats" / "Mean to Claude? It Can End the Chat. Is That Right?"
- Round 3: cold 4 · best pair (title 1) 7/6 · taste 6.5.

### 16-being-cruel-ended-this-chat
- Words: BEING CRUEL ENDED THIS CHAT
- Titles: "Is It Okay to Be Mean to AI? Anthropic's New Rule" / "Can You Hurt a Chatbot? Why Claude Ends Cruel Chats"
- Round 3: cold 6 · best pair (title 1) 8/7 · taste 7.

### 17-be-mean-chat-over
- Words: BE MEAN, CHAT OVER
- Titles: "Claude Can Hang Up on You. Should AI Be Allowed To?" / "Is It Okay to Be Mean to AI? Anthropic's New Rule"
- Round 3: cold 6 · best pair (title 1) 8/7 · taste 7.

### 18-say-please-to-ai
- Words: SAY PLEASE TO AI?
- Titles: "Is It Okay to Be Mean to AI? Anthropic's New Rule" / "Should You Be Nice to AI? Yes, But Not for Its Sake"
- Round 3: cold 6 · best pair 7/6 · taste 6.

### 19-protected-from-us
- Words: AI PROTECTED FROM US?
- Titles: "AI Can't Feel. So Why Protect Claude From Cruelty?" / "Should You Be Nice to AI? Yes, But Not for Its Sake"
- Round 3: cold 6 · best pair (title 1) 8/8 · taste 7.

### 20-is-claude-conscious  (recommended)
- Words: IS CLAUDE CONSCIOUS?
- Titles: "Why I'm Kind to AI, Even Though It Can't Feel" / "AI Can't Feel. So Why Protect Claude From Cruelty?"
- Round 3: cold image 8 · best pair (title 1) 8/8 (a top-3 pair) · taste 7.5.

### 21-real-rule-and-phone
- Words: CLAUDE'S NEW RULE
- Titles: "Is It Okay to Be Mean to AI? Anthropic's New Rule" / "Claude Can End Your Chat If You're Cruel. But Why?"
- Round 3: cold 5 · best pair (title 1) 8/7 · taste 7.5.

### 22-new-ai-rule-nov-12  (recommended)
- Words: NEW CLAUDE RULE: DON'T BE CRUEL
- Titles: "Is It Okay to Be Mean to AI? Anthropic's New Rule" / "Claude Can End Your Chat If You're Cruel. But Why?"
- Round 3: cold image 8 · best pair (title 1) 9/8, the top pair · taste 6.5 (round 2, before the closed-mouth frame). Only before 12 November; after that use 02.
