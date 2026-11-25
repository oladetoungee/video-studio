# Conference slides playbook (senior engineering audience)

Research done 2026-11-03, before designing her architecture talk deck. Audience: engineering managers, staff+/principal engineers, CTOs. Talk type: software architecture, few code snippets. Read this before any slide work for the talk.

## 1. What this audience is like
- **They have read the books.** CTO-level call-for-talks pages say it plainly: the room knows the basics cold and wants new information from real, recent experience. Generic principles ("microservices have trade-offs") lose them in the first minute.
- **They think in impact and trade-offs, not features.** Say the "so what" early. Every big claim needs its cost: what it bought, what it broke, what you would do differently.
- **They are sceptical of polish without substance.** Stock photos, AI-generated art, logo walls and buzzwords read as marketing. Real diagrams, real numbers, real decisions read as credible.
- **They are judging the speaker's judgement.** The deck should show clear thinking: one claim per slide, evidence under it, honest limits.

## 2. The core rules (agreed across every serious source)
1. **One idea per slide.** If three ideas matter, give them three slides (AWS Builder Center, TED, Duarte).
2. **Headline is a full sentence that states the point** (assertion-evidence, Michael Alley / Penn State). "The queue hid a 9-second lag for two years" beats "Queue latency". Studies (Garner et al. 2009/2013) found audiences understood and remembered more than with topic-heading + bullets slides. Under the sentence: visual evidence (a diagram, a number, a screenshot), not bullets.
3. **Glance test: about 3 seconds** (Nancy Duarte). If a person can't get the point in a glance, they read instead of listening. Count signal vs noise on each slide.
4. **Slides support the speaker, they don't repeat her.** No paragraphs on screen. The key phrase or visual goes up, the explanation is spoken. People read faster than you talk, so text on screen competes with you.
5. **Bullets are where evidence goes to die** (Tufte, *The Cognitive Style of PowerPoint*: the Columbia shuttle slide buried the critical "640× larger than the test data" line in a nested bullet). Relationships between ideas don't fit indented lists: draw them.
6. **Remove more than you think.** Test for every element: "does this help explain the idea, or is it here because I like it?"
7. **Rhythm: simple slides between dense ones.** Equal-weight dense slides make nothing feel important. Breathing slides (one sentence, one number) reset attention.

## 3. Styles worth borrowing from
- **Takahashi** (huge text, a few words, many slides, invented by a Ruby programmer for RubyConf): great for punchlines and section turns.
- **Lessig** (fast slides in step with every phrase, one word / quote / image each, 200+ slides): great for a high-energy opening or a story told in beats.
- **Presentation Zen** (Garr Reynolds: restraint, empty space, strong visuals): the overall attitude.
- **Assertion-evidence** (Alley): the default for the technical body of the talk.
- Mix them: Takahashi/Lessig for the open, the section turns and the close; assertion-evidence for the architecture.

## 4. Architecture diagrams on slides (the heart of this talk)
- **One canonical diagram, reused all talk.** Draw the system once, keep every box in the same coordinates, then *build* it up and *zoom* into parts. The audience learns the map once and then follows you. Changing layout between slides makes them re-read everything.
- **Progressive disclosure** (C4 levels: context → containers → components; code level almost never on a slide). Start at the highest level, reveal detail only when you talk about it. Never show all levels at once.
- **Dim everything that isn't the subject.** Grey out the rest, put the one accent colour on the part under discussion. One focal point per slide.
- **Builds land on her words**: a box or arrow appears when she names it, not before.
- **Label everything that matters, explain nothing obvious** (Simon Brown, IcePanel): every box has a plain name (expand acronyms), every arrow says what flows ("orders, async") and has a clear direction; avoid bidirectional arrows. If colour or line style carries meaning, keep it consistent all talk and say it once (a tiny key, or say it aloud).
- **Hide the long descriptions** that a written diagram needs: on stage, the speaker is the description.
- **No vendor icon soup.** Twenty AWS icons say "cloud" and nothing else. Plain boxes with clear names beat logos. Keep a real product name only where the choice of product is the point.
- **Show change, not just state**: before → after on the same layout; the failure path drawn in red over the happy path; the migration in steps.
- **Trade-offs get their own visual forms**: a 2×2 (Neal Ford's "Modern Trade-off Analysis" plots decisions by effort vs trade-off weight), a see-saw / two-column "what we gained / what we paid", a timeline of decisions, a decision record slide (context → decision → consequence) in big type.
- **Numbers as heroes**: one huge number + one sentence of meaning ("9 s" / "p99 lag nobody saw for two years"). Real numbers only; round them; say the unit.

## 5. Code on slides (rare in this talk)
- Only when the code *is* the point. 5-10 lines max, large mono (≥ 32 px at 1080 tall... aim 36-44 px), highlight the one line that matters, dim the rest. Never a screenshot of an IDE.

## 6. Built for the room
- **16:9, 1920×1080.** Scale down is easy, scale up is not. Don't count on a great projector.
- **Text sizes** (at 1920×1080): body text never below ~40 px (≈ 30 pt); aim higher. Headlines 80-140 px. Mono labels ≥ 32 px. Sources agree: 18 pt is an absolute floor, 30-34 pt is the minimum for conference halls. "If you have to ask whether the text is big enough, it isn't."
- **Words**: aim for ≤ 15 words on most slides; a sentence headline of ≤ 2 lines, left-aligned.
- **Contrast**: strong dark + strong light + one accent. Projectors wash out colour and thin weights vanish: use regular/bold weights, never light/thin; never dark-on-dark or mid-grey text.
- **Bottom of the screen is often hidden** behind heads in a flat room: keep key content in the top two-thirds.
- **Dark vs light**: a dark stage with an LED wall suits dark grounds; a bright room with a projector suits light grounds. Ask the organisers; build both versions from the same tokens if unsure. Warm off-whites used by experienced speakers: #FDFBF2, #FAF9F6, #F5F4EF (close to her paper #EDE9E2 / card #FFFDF6).
- **Colour marks structure**: a different ground for section turns, intro and close.
- **Back-row test**: shrink the slide to thumbnail size or step back from the screen; if it doesn't read, simplify. Better: sit in the back row of the same room before the talk.
- **Accessibility**: don't rely on red/green alone; check contrast; also helps people with colour-blindness (common among engineers, mostly men).

## 7. Motion and transitions
- Motion should explain (a box moving into a new place, a request travelling a path, a part zooming open), never decorate. Use "magic move / morph" style continuity between builds of the same diagram.
- Kinetic type sparingly: the opening, a section turn, the closing line.
- Over-animation is the 2026 tell of a template deck. Same entry effect on everything is banned (see CLAUDE.md Banned list).

## 8. Structure of a talk that lands with leaders
- **Open with tension in under 60 s**: a concrete moment (an incident, a number, a decision that went wrong), not an agenda slide or a bio slide. One small "who I am" line is enough.
- **The promise**: what they'll be able to decide or do differently after.
- **Body**: 3 parts at most, each a claim with evidence and a cost. War stories with real stakes, then the general lesson pulled out of them.
- **Show where it failed or doesn't apply.** Honest limits are what make senior people trust the rest.
- **Close with one sentence they can repeat to their team**, plus a slide with how to reach her (@WithGbemi / LinkedIn) and the deck link, left up during Q&A.
- **Pacing**: Lessig-style builds mean many slides; plan around 1 slide per 20-60 s (a 30-minute talk might run 50-90 slides including builds).

## 9. Practical stage checks
- Fonts embedded / outlined; export a PDF backup; videos embedded, not streamed; no live internet dependency.
- Speaker notes with the line for each slide; rehearse with the clicker; know which slides can be skipped if time runs short.
- A shareable version after the talk: the sentence headlines make the deck readable without her voice.

## 10. Where it fits her house style
Her rules already match the best practice here: flat solid grounds, type as the design, one accent per scene, lots of empty space, one idea per frame, DM Mono labels used sparingly, no gradients/glow/particles. The new parts for a stage deck: sentence headlines, one reusable architecture diagram with builds and dimming, back-of-room sizes, light/dark venue versions, and a fresh look for this talk (her rule: every piece gets its own look; propose 2-3 directions first).

## Sources
- Michael Alley, assertion-evidence research: https://writing.engr.psu.edu/research.html ; critique by David Farkas: https://faculty.washington.edu/farkas/dfpubs/Farkas-Assessment%20Of%20Alleys%20Slide%20Design.pdf
- Nancy Duarte, Glance Test: https://www.duarte.com/resources/guides-tools/the-glance-test/
- Edward Tufte, The Cognitive Style of PowerPoint (Columbia slide): https://www.edwardtufte.com
- AWS Builder Center, "A few things I've learned about making good conference decks" (2026): https://builder.aws.com/content/3K8ZaJKTuxMNmQ8P9sGqcrHWma4/a-few-things-ive-learned-about-making-good-conference-decks
- Zach Holman, speaking.io (typography, colour, dimensions): https://speaking.io/design/typography/
- Peter Hilton, tips for conference organisers (8H rule, back row): https://hilton.org.uk/blog/conference-organiser-tips-slides
- Simon Brown, how to review an architecture diagram: https://dev.to/simonbrown/how-to-review-a-software-architecture-diagram-6p0
- IcePanel, common diagramming mistakes: https://icepanel.io/blog/common-diagramming-mistakes
- C4 model and progressive disclosure: https://deviq.com/principles/progressive-disclosure/
- Neal Ford, Modern Trade-off Analysis (deck): https://speakerdeck.com/findyinc/modern-trade-off-analysis
- Gregor Hohpe, The Software Architect Elevator, ch. 22 "Diagram-Driven Design" (not readable online; worth buying)
- Takahashi method: https://en.wikipedia.org/wiki/Takahashi_method ; Lessig method: https://ethos3.com/designstyles-and-approachespresenting-lessig-way/
- CTO audiences want new, experience-based content: https://voltagecontrol.com/blog/austin-cto-summit-call-for-presentations/
- Font size guidance: https://www.pptfaq.com/FAQ00125_How_big_should_text_be-_What-s_the_ideal_font_size-.htm ; https://www.cctl.cam.ac.uk/slide-accessibility-guidance
- 2026 trend roundups (vendor blogs, treat with care): https://elements.envato.com/learn/presentation-design-trends-ppt
