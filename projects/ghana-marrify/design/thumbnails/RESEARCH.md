# Thumbnail research: "Ghana's Marrify" (tech news + opinion)

Written 2026-10-01. The full 2025-26 study (Thumbnail Bench, vidIQ, 1of10, YouTube Test & Compare, her 69 saved thumbnails) is in
`projects/reading-stack/design/thumbnails/RESEARCH.md` and still applies. This file only adds what is specific to this video's niche:
tech news explainers, opinion/commentary, African tech. **Evidence** = data or platform statement, **opinion** = practitioner advice.

## 1. What people will search for (evidence: how the story was reported)
The launch was covered as text news, and almost every headline frames it the same way: *an app to check whether someone is married*.
- "Ghana launches app to expose secret marriages, protect singles" ([Guardian Nigeria](https://guardian.ng/breakingnews/ghana-launches-app-to-expose-secret-marriages-protect-singles/))
- "Ghana Gets Marrify App to Help People Verify Marital Status of Prospective Partners" ([Yen.com.gh](https://yen.com.gh/ghana/311329-ghana-launches-marrify-app-people-verify-marital-status-prospective-partners/))
- "App launched to help Ghanaians verify prospective partners' marital status before marriage" ([Graphic Online](https://www.graphic.com.gh/lifestyle/life/marrify-app-launched-to-help-ghanaians-verify-prospective-partners-marital-status-before-marriage.html), [Adom Online](https://www.adomonline.com/app-launched-to-help-ghanaians-verify-prospective-partners-marital-status-before-marriage/))
- "Ghana launches Marrify to make marriage and divorce records searchable online" ([Technext](https://technext24.com/news/marrify-digitises-marriage-verification-ghana/)); "Ghana gets app to check marriage, divorce status" ([Metro Daily](https://metrodailyng.com/ghana-gets-app-to-check-marriage-divorce-status/))

**So:** a search-led title should use the plain words people already met in those headlines ("Ghana", "app", "check if someone is married",
"divorce records"). The name "Marrify" alone means nothing to a cold viewer and is shared with unrelated matrimony apps on Google Play,
so it belongs in the description and tags, not in the thumbnail.

## 2. The open lane (evidence: what exists)
A search on 2026-10-01 found **no YouTube explainer or opinion video** on Marrify, only news articles (and an unrelated "Marrify" matrimony
channel). Nobody else in this feed will have *her* angle: someone living in Estonia, the place people point to for digital government.
Her saved thumbnails and her decks give her a look nobody in African tech news uses (flat colour grounds, heavy type).

## 3. Tech news and commentary thumbnails now (opinion, consistent across 2026 guides)
- **Real faces with real micro-expressions beat polished or shocked ones** in tech, finance and education ("proof of human"); exaggerated
  shock faces are losing effectiveness there ([vidIQ 2026](https://vidiq.com/blog/post/youtube-thumbnail-design-tips/),
  [Brightbean](https://brightbean.xyz/blog/youtube-thumbnail-best-practices/)). Her footage has plenty: a worried frown, a side-eye, a
  hand over the mouth, wide eyes. All are real moments from the recording, never generated.
- **3-5 words, one focal point, open a gap the title closes, never repeat the title**
  ([vidIQ](https://vidiq.com/blog/post/youtube-thumbnail-design-tips/), [thumbnailtest.com](https://thumbnailtest.com/guides/best-practices-youtube-thumbnail/)).
- **Avoid red/white/black-only palettes**: they blend into YouTube's own interface; orange, blue and teal separate from it (vidIQ). Her
  house accents (electric blue, safety orange, green) already do this.
- **Over 70% of watch time is on phones**: test at 320x180 and 168x94 (vidIQ). We do, with the duration badge drawn in.
- **Explainer convention: show the object.** News explainers win when the thumbnail shows the thing being explained (here: a search
  box and a record). Because we don't have her permission or screenshots of the real Marrify app, any interface is a generic mockup
  marked `ILLUSTRATION`, with no Marrify name or logo (BRIEF.md).

## 4. Rules applied here
1. Thumbnail = the **stakes or the question** (your divorce is searchable / is that fair / only say yes or no); title = **the news** (Ghana
   launched an app to check if someone is married). Or the reverse. Never both the same words.
2. Max ~4 words of headline, plus at most a one-word country label or a two-row illustration.
3. Her face, never flipped, from the 4K recording, cut out with macOS Vision (`studio/tools/cutout.swift`), chair removed by hand
   (`tools/clean.py`). Expressions chosen from a 2-frames-per-second scan of all 5:12 (see NOTES.md for the times).
4. One accent per thumbnail. Flags are flat stripes (Ghana red/gold/green with the black star, Estonia blue/black/white).
5. Balanced, like her: she wants this built. No thumbnail implies she is against Marrify, and none says anything she doesn't
   (no "1886", no "empty screen", no "aunties").
6. Bottom-right 150x70 px stays clear for the duration badge.
