# Carousel research (checked 2026-10-01)

Short and sourced. I mark each finding as **data** (a dataset or platform measurement), **official** (a statement from the platform) or **opinion** (practitioner advice with no data behind it). The rules I applied come after the findings.

## Instagram

1. **Carousels lead on engagement rate and saves. Reels lead on reach.** *Data.* Socialinsider's 2025 benchmarks cover 35M posts. Engagement rate: carousels 0.55%, reels 0.52%, images 0.37%. In Q2 2026 those were 0.50%, 0.48% and 0.33%. Carousels earned the most saves at every account size, and Socialinsider credits part of their reach to "double exposure" in the feed. [socialinsider.io/social-media-benchmarks/instagram](https://www.socialinsider.io/social-media-benchmarks/instagram) (2026-02-20)
2. **Buffer's numbers point the same way.** *Data.* Median engagement per reach: carousels 6.90%, images 4.44%, reels 3.31%. Reels reached about 36% more people. The data runs from 2022 to 2024, so it is getting old. [buffer.com: State of social media engagement 2026](https://buffer.com/resources/state-of-social-media-engagement-2026/) (2026-03-05)
3. **Slide 2 is a second cover.** *Official.* Adam Mosseri: "If someone sees your carousel post but they don't swipe, we'll often give that carousel a second chance and automatically move to that second piece of media." I found this through a repost, not the original: [Matt Navarra on Threads](https://www.threads.com/@mattnavarra/post/DBgmZcEoiZb) (Oct 2024)
4. **Sends (shares by DM) are a top ranking signal, especially for reaching non-followers.** *Official, via secondary reports.* In Jan 2025 Mosseri named watch time, likes per reach and sends per reach as the top three signals. [Social Media Today](https://www.socialmediatoday.com/news/instagram-updates-metrics-to-focus-creators-on-views/723645/)
5. **A carousel can have up to 20 slides**, worldwide since 2024-08-08. [MacRumors](https://www.macrumors.com/2024/08/08/instagram-20-photos-carousel-posts/)
6. **Ideal slide count: the evidence is weak.** Socialinsider says carousels with more than 10 slides get more reach, without showing the data behind it ([blog, updated 2026-06-11](https://www.socialinsider.io/blog/instagram-carousel/)). The "8–10 is best" and "engagement drops after slide 3" claims come from blogs, and I could not trace either to a dataset.
7. **Format.** The profile grid has shown 3:4 tiles since Jan 2025 ([Mosseri on Threads](https://www.threads.com/@mosseri/post/DFBmsT0SKO6)), and native 3:4 uploads (1080×1440) arrived around May 2025 ([Forbes](https://www.forbes.com/sites/paulmonckton/2025/05/30/instagram-finally-fixes-a-long-standing-photo-problem/)). A 4:5 post (1080×1350) still fills the feed. On the grid its tile loses a thin strip (about 34 px) from each side.
8. **Hook, words per slide and the end-slide CTA have no platform data behind them.** *Opinion.* The usual advice is one idea per slide, a big high-contrast headline on slide 1 and one clear CTA at the end ([Metricool](https://metricool.com/instagram-carousels/), 2026-01-16). I found no credible study on words per slide.

## LinkedIn document (PDF) posts

1. **Documents are at or near the top for engagement.** *Data.* Socialinsider analysed 1.3M company-page posts (2024–2025). Native documents had the highest engagement rate at 7.00%, ahead of multi-image (6.45%), video (6.00%) and text (4.50%). In Q2 2026 multi-image (6.90%) edged past documents (6.60%). [socialinsider.io/social-media-benchmarks/linkedin](https://www.socialinsider.io/social-media-benchmarks/linkedin) (2026-03-16)
2. **Buffer, measured per reach:** documents and carousels 21.77%, video 7.35%, images 6.52%, text 3.18%. *Data.* [Buffer](https://buffer.com/resources/state-of-social-media-engagement-2026/) (2026-03-05)
3. **Overall reach is falling.** *Data, partly unverified.* Richard van der Blom's 2025 report (1.8M posts) found views down about 50% and engagement down about 25% year on year. The "1.45× reach for documents" number often credited to him actually comes from AuthoredUp's dataset, which also found document reach fell 25% ([AuthoredUp](https://authoredup.com/blog/linkedin-algorithm), updated 2026-08-11). In 2026 van der Blom still names carousels among the strongest formats ([Creator Science podcast](https://podcast.creatorscience.com/richard-van-der-blom-2/), 2026-06-02).
4. **Dwell time is a ranking signal.** *Official.* LinkedIn measures time on a post both in the feed and after a click. A fast scroll-past counts as a negative "skip". [LinkedIn Engineering](https://www.linkedin.com/blog/engineering/feed/understanding-feed-dwell-time). In March 2026 ranking moved to an LLM-based system that matches posts on topic and professional relevance (secondary: [PPC Land](https://ppc.land/linkedin-rebuilds-its-feed-from-scratch-with-llms-and-gpu-powered-ranking/)).
5. **Saves and sends have shown in post analytics since Sept 2025.** *Official.* [Social Media Today](https://www.socialmediatoday.com/news/linkedin-adds-save-and-send-data-to-content-insights/759828/). The claim that "a save is worth 5× a like" is unverified.
6. **PDF posts are still the way to post a carousel.** LinkedIn removed its native *image*-carousel tool in June 2023 but kept document posts ([Social Media Today](https://www.socialmediatoday.com/news/linkedin-removes-native-carousels-profile-videos-in-image-links/653311/)).
7. **Upload limits.** *Official.* 100 MB, 300 pages, one document per post. **A document title is required and shows on the post.** [LinkedIn Help](https://www.linkedin.com/help/linkedin/answer/a523054)
8. **Page size, page count and text per page.** *Opinion.* Guides recommend 1080×1350 portrait (it takes the most mobile feed space), 8–12 pages and a hook on page 1. None of this comes from LinkedIn ([Oktopost](https://www.oktopost.com/blog/linkedin-carousel-pdf-best-practices/)).

## The rules I applied

**Both**
- **The hook is one promise in huge type, with no paragraph.** One supporting line at most, and her book polaroids as proof that the post is real.
- **Slide 2 must work as a cover on its own** (Instagram re-serves it). It names the problem *and* hints at the fix.
- **One idea per slide, at most about 40 words of body text.** Headlines run 90–200 px. Body text is at least 36 px and mono labels at least 32 px on a 1080 px canvas, so at a 390 px phone width body is at least 13 px and labels at least 11.5 px. The build script enforces the label minimum.
- **The best insight comes early.** The method itself appears by slide 3 on Instagram, and the LinkedIn cover promises it ("a few minutes, before page one").
- **Every slide carries the same bottom row:** its number (`03 / 09`) and a segmented progress meter, the meter from her decks and the film. Instagram draws its own counter top-right, so I keep that corner empty.
- **A save-worthy recap slide** (her numbered list with hairlines), then **one end-slide action**: watch the full video, with a clearly marked channel placeholder. The comment question ("what's in your reading stack?", her own outro) goes in the caption, not on the slide.
- **Truth:** chapter titles come from the film's `BARATTA` list, the page counts are as she said them ("about 80 / 50 / over 140"), and the lineage is as she described it. I did not invent results or statistics.

**Instagram (punchy, visual, 8 slides, 1080×1350)**
- More full-bleed and photo moments: ink hook, blue method slide, polaroids, the contents page as a picture, page counts drawn as bars.
- Side margins of at least 88 px (the 3:4 grid crop takes 34 px a side).
- The summary slide's corner says "save for your next book". The caption asks people to send it to a friend with a stack of unread non-fiction, since sends are the reach signal.

**LinkedIn (structured, 10 pages, 1080×1350 PDF)**
- The method framed as a numbered 4-step system, each step on its own page with `STEP 2 OF 4` and a real example from her books.
- The cover leads with the cost and timing ("A few minutes. Before page one.") and names the 4 steps. Professionals save frameworks and checklists.
- A comparison table (read cold vs structure first) in place of the Instagram illustration, plus a page on where the method fits in work and thesis reading. Framed as suggestions, not claims.
- **Document title for the upload:** "Read the structure first: a 4-step method for remembering what you read".
- The PDF is printed at exactly 1080×1350 px per page with live text (sharp, small file).

**Not applied:** 1080×1440 (3:4) for Instagram. The brief fixed 4:5. If she wants the taller format, `"height": 1440` in `instagram/content.json` re-flows every slide (it is a single variable).

## Standalone hooks (added 2026-10-01, after her feedback)

Her rule: the carousel must hit for someone who has never seen the video. New findings on cold audiences:

1. **Most of a post's new reach is strangers.** *Official, via secondary.* Instagram recommends posts from accounts you don't follow in Explore, Reels and the main feed. Mosseri: likes weigh slightly more with followers, **sends weigh slightly more with non-followers**. Hashtags barely help discovery now; keywords in the caption and profile do (Instagram search). [Buffer, 2026-03-24](https://buffer.com/resources/instagram-algorithms/), [Dataslayer](https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers)
2. **LinkedIn ranks by topic interest, not just your network.** *Official + secondary.* Since the March 2026 LLM ranking rebuild, posts are matched to people who show interest in the topic, and dwell time (each swipe) is weighed heavily. A cover only lands with those strangers if it names the topic in their words ([PPC Land](https://ppc.land/linkedin-rebuilds-its-feed-from-scratch-with-llms-and-gpu-powered-ranking/), [Oktopost](https://www.oktopost.com/blog/linkedin-carousel-pdf-best-practices/)).
3. **The cover does most of the work.** *Opinion (no dataset).* Practitioners agree that a cover must state a specific outcome, a relatable problem or a clear promise; a cover that needs context gets scrolled past ([Oktopost](https://www.oktopost.com/blog/linkedin-carousel-pdf-best-practices/), [Storrito](https://storrito.com/resources/how-instagram-carousels-beat-reels-for-engagement-in-2026-and-when-to-use-each/)).

**Rules applied in the rewrite**
- **Slide 1 names the outcome in plain words** a searcher would type: "How to remember what you read", "Remember what you read for work". No phrase that only makes sense after the video ("only the vibe", "a few minutes before page one").
- **Slide 2 is a second cover** (Instagram re-serves it to people who didn't swipe): the problem in one everyday question, plus a hint that the fix exists.
- **Every slide reads on its own.** Worked examples are introduced as examples ("Example: a book on critical writing"); quotes never rely on what was said in the video.
- **The video is an optional extra on the last slide**, after the save/share ask. Nothing earlier depends on it.
- **Keywords in the caption** (Instagram search): "how to remember what you read", "non-fiction", "reading method".
