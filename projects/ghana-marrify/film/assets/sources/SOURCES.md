# Sources shown in the film (real pages, captured as-is)

Captured on 2026-10-01, 23:55 to 2026-10-02, 00:13 local time (EEST, UTC+3), i.e. 2026-10-01 20:55–21:13 UTC. Each JSON has exact ISO timestamps.
Tool: headless Chrome for Testing 148 via puppeteer-core, desktop UA, 1920×1080 viewport at deviceScaleFactor 2 (stills are 3840 px wide). Mobile: 390×844 at 3×, iPhone UA.
Scripts: `film/tools/sources/{common,techcabal,marrify,marrify_meta,marrify_banner,news}.mjs` (re-run any time to refresh).

Rules we followed: no page text was edited, and no page content was hidden. Ads and popups were closed only by clicking their own close buttons (TechCabal ad boxes with "Close advertisement"). No highlight is burned in, so the film adds its own. Recordings were captured frame by frame and piped straight into ffmpeg, so no image sequences were written to disk. The browser address bar is not in the captures (headless), so **credit the URL on screen** with a small DM Mono line. Suggested credits are below.

Never put a fake Marrify interface next to these as if it were real. If the film needs a search mock-up, keep it generic and labelled `ILLUSTRATION`.

---

## 1. TechCabal: the source she cites on camera  (`techcabal/`)

TechCabal didn't publish a standalone article. Marrify was one section of the **TechCabal Daily newsletter (web edition), 8 Sep 2026**.

- **URL:** https://techcabal.com/2026/09/08/techcabal-daily-a-451-million-divestiture/
- **Page headline:** "👨🏿‍🚀TechCabal Daily – A $451 million divestiture" (the newsletter edition is named after its lead story about BPI and Angola)
- **Marrify section:** kicker `GOVERNMENT`, heading **"Ghana Launches Digital Marriage Records Platform"**
- Published 2026-09-08 06:14 UTC. Byline "By Emmanuel Nwosu". Footer: "Written by: Yemi Kareem and Emmanuel Nwosu", "Edited by: Emmanuel Nwosu & Ganiu Oloruntade".
- TechCabal's own link for "launched Marrify" goes to ITWeb Africa (see 3).
- **On-screen credit:** `TECHCABAL DAILY · 8 SEP 2026 · techcabal.com`

### The drawback paragraph (verbatim)
> **But there's a drawback:** Marriage and divorce records are sensitive personal information. Making them easier to access can reduce fraud and bureaucracy, but it can also make stalking, harassment, unwanted disclosure, and other forms of misuse easier if the safeguards are weak.

Other lines in the same section the film may use (verbatim):
> **What happened?** Ghana has launched Marrify, a digital platform that lets people search and verify registered marriage and divorce records. It can also verify marriage officers, licensed venues, churches, pastors, and imams, while an AI assistant provides contextual information on Ghanaian marriage law.

> Marrify says it pulls data from the Registrar-General's Department, courts, local assemblies, and the Ghana Gazette.

> Yet, Marrify cannot be a magic marital-status truth machine. … A person not appearing in the database could mean they were never married. Still, it could also mean their marriage was registered elsewhere, the record has not been digitised or linked yet, or the information entered does not match what is in the registry.

The full section, verbatim, is in `techcabal/techcabal_marrify_quote.txt` (also `tc_text.json`).

| File | What it shows |
|---|---|
| `tc_00_fullpage.png` | Whole newsletter page, 1920×14711 @1× |
| `tc_01_page_headline.png` | Top of page: TechCabal masthead, headline, byline, "8th Sep, 2026" (3840×2160) |
| `tc_02_marrify_heading.png` | Viewport with "GOVERNMENT / Ghana Launches Digital Marriage Records Platform", the section GIF ("We aren't cavemen! We have technology!", credited "Image Source: Make a Gif"), and the "What happened?" paragraph |
| `tc_03_drawback_paragraph.png` | Viewport with the drawback paragraph near the middle (scrollY 7319). **This is the money shot.** |
| `tc_04_launch_paragraphs.png` | Viewport starting at "What happened?" |
| `tc_crop_drawback_paragraph.png` | Tight crop of the drawback paragraph (with the neighbouring lines just visible) |
| `tc_crop_what_happened_paragraph.png`, `tc_crop_section_heading.png`, `tc_crop_page_headline.png` | Tight crops |
| `tc_scroll_heading_to_drawback.mp4` | **Main recording.** 1920×1080, 30 fps, 10 s. Holds 1.5 s on the section heading, eased scroll for 6 s, holds 2.5 s on the drawback paragraph. No highlight. |
| `tc_scroll_top_to_drawback.mp4` | 1920×1080, 30 fps, 12 s. Masthead and headline (1.5 s hold), fast eased scroll through the BPI/DStv stories to the Marrify heading, then on to the drawback paragraph (1.5 s hold) |
| `tc_boxes.json` | Bounding boxes for the highlighter (see below) |
| `techcabal_marrify_quote.txt` | Exact text plus URL, date, credits and capture time |

**Boxes (`tc_boxes.json`)** are given in document CSS px (`elements`, `phrases`). Each screenshot and recording also has ready-made boxes in its own pixel space (`screenshots.<name>.boxes_in_png_px_at_2x`, `recordings.A|B.boxes_in_video_px_during_final_hold`, plus `scrollY_per_frame` for mapping any frame). Phrases are boxed one line at a time:
`drawback_lead` ("But there's a drawback:"), `drawback_sensitive`, `drawback_misuse`, `drawback_misuse_short` ("stalking, harassment, unwanted disclosure, and other forms of misuse"), `launch_sentence`, `verify_officials`, `data_sources`, `searchable_infrastructure`, `not_truth_machine`.
In both recordings the final hold is at scrollY 7319, and the drawback sits at video px y ≈ 511–607, x 634–1186. We drew the boxes on a scratch copy and they sit exactly on the text. The layout was checked after recording and was unchanged. The page's sticky header covers the top 73 px of the viewport once you scroll.

---

## 2. Marrify's own website  (`marrify/`)

- **URL:** https://marrifyapp.com/ (title "Marrify - Ghana National Marriage & Divorce Registry"). Operator: Marry Right Ghana Ltd (company site: https://www.marryrightgh.com/, not captured).
- **On-screen credit:** `marrifyapp.com · captured 1 Oct 2026`
- We found no app-store listing in search. The website is the product.

### Its own disclaimer (verbatim; a scrolling banner on every page)
> STILL UPLOADING RECORDS — CAN'T FIND YOUR CERTIFICATE? THAT DOESN'T MEAN IT'S MISSING. WE'RE ADDING GHANA'S MARRIAGE & DIVORCE RECORDS IN STAGES, AND YOURS MAY NOT BE UPLOADED YET. PLEASE CHECK BACK SOON.

Other homepage copy (verbatim): hero "Every marriage venue. Every Marriage Officer. Since 1886." · "Search Ghana's churches and ministers of religion licensed to celebrate ordinance marriage drawn from the Gold Coast and Ghana Gazette as well as Licensed Imams. Free to search. Built to be trusted." · search placeholder "Search every registry by name, church, town, certificate, licence or Gazette number..." · hint "Try a church, spouse name, officer name, town, denomination, MMDA, certificate number or Gazette number." · stats "1886-2026 GAZETTE COVERAGE SPAN · 16 REGIONAL COORDINATING COUNCILS INDEXED · 261 MMDAS COVERED · 3 LICENSES: VENUES, OFFICERS, IMAMS" · source partners: Ghana Publishing Company Limited, Registrar-General's Department.

| File | What it shows |
|---|---|
| `mf_00_home_fullpage.png` | Whole homepage @1× (1920×7536) |
| `mf_01_home_desktop.png` | Homepage at the top: banner, nav, hero, the empty search box, stats (3840×2160) |
| `mf_02_disclaimer_banner_1..4.png` | Just the top banner (3840×62) at 4 marquee positions (0, 3, 6, 9 s). Together they cover the whole disclaimer: _1 starts "STILL UPLOADING RECORDS — CAN'T FIND YOUR CERTIFICATE?…", _4 ends "…PLEASE CHECK BACK SOON." |
| `mf_03_divorce_records_search.png` | /divorce-records: "Search Ghana's registered divorce records.", the empty search box (placeholder "Search party, case, certificate, or court..."), filters, and "SEARCH RESULTS · 66 divorce records". **Cropped above the result list on purpose** (see warning) |
| `mf_04_marriage_records_search.png` | /marriage-records: "Customary, Islamic and Ordinance marriages, one register.", the empty search box, filters, "232 marriage records". Cropped the same way |
| `mf_05_home_mobile.png` | Homepage on a phone, 390×844 @3× |
| `mf_06_home_mobile_fullpage.png` | Mobile homepage, full length @2× |
| `mf_home_marquee_hold.mp4` | 1920×1080, 30 fps, 10 s. The homepage top held still while the disclaimer banner crawls at its real speed. Zoom or crop to the top 31 px bar to show the disclaimer. |
| `mf_scroll_home.mp4` | 1920×1080, 30 fps, 11 s. Hero (1.5 s hold), eased scroll past the source partners and the "Explore" module to the "Search, verify and connect the record types that matter" grid (Marriage / Divorce Records / Officers / Venues / Imams / Denomination), 2.5 s hold |
| `mf_meta.json` | URLs, capture times, boxes (hero, search input, banner, records heading), and keys plus per-frame scroll for the recordings |

The marquee is a CSS animation (24 s loop). For stills and recordings we paused it and set its clock, so frames are reproducible and the recording plays at real speed. Nothing else on the page was touched.

**WARNING: names of real people.** With no search at all, Marrify's /marriage-records and /divorce-records pages list records with **people's full names** (e.g. "X & Y" couples, "X vs Y" divorce parties, court, date). We did **not** capture any list or record page, and we did not type anything into a search box. Don't record these pages for the film without blurring every name first, and ask Gbemi before showing them at all.

---

## 3. News headlines  (`news/`)

All captured 2026-10-01 ≈ 21:00–21:02 UTC. Each has a viewport shot (`news_<key>.png`, 3840×2160, headline about 300 px from the top) and a tight headline crop (`news_<key>_headline_crop.png`). Text, dates and paragraphs are in `news_meta.json`.

| Key | Outlet | Headline (verbatim) | Date | URL |
|---|---|---|---|---|
| `graphic` | Graphic Online | App launched to help Ghanaians verify prospective partners' marital status before marriage | 3 Sep 2026 (Beatrice Laryea) | https://www.graphic.com.gh/lifestyle/life/marrify-app-launched-to-help-ghanaians-verify-prospective-partners-marital-status-before-marriage.html |
| `ghanaweb` | GhanaWeb | Marrify: What to know about Ghana's new marriage verification platform | 4 Sep 2026 | https://www.ghanaweb.com/GhanaHomePage/NewsArchive/Marrify-What-to-know-about-Ghana-s-new-marriage-verification-platform-2050835 |
| `technext` | Technext | Ghana launches Marrify to make marriage and divorce records searchable online | 4 Sep 2026 (Epiphanus Obia) | https://technext24.com/news/marrify-digitises-marriage-verification-ghana/ |
| `itweb` | ITWeb Africa | Ghana launches digital marriage records platform | 7 Sep 2026 (Samuel Olomu) | https://itweb.africa/article/ghana-launches-digital-marriage-records-platform/VgZeyqJlpyX7djX9 |
| `ghanamma_launch` | Ghanamma ("Ghana News") | Ghana Launches Digital Platform To Verify Marriage, Divorce Records | Sep 4 | https://www.ghanamma.com/2026/09/04/ghana-launches-digital-platform-to-verify-marriage-divorce-records/ |
| `ghanamma_rollout` | Ghanamma ("Ghana News") | Ghana rolls out Marrify to simplify marital-status checks | Sep 10 | https://www.ghanamma.com/2026/09/10/ghana-rolls-out-marrify-to-simplify-marital-status-checks/ |

Useful verbatim lines:
- Ghanamma (4 Sep), which credits YEN ("YEN reports on Friday"): "However, Marrify warns users that its database is still being populated. It therefore advises that the absence of a record in a search should not, on its own, be regarded as confirmation that an individual has never been married."
- ITWeb, quoting Minister Dr Agnes Naa Momo Lartey: "The effectiveness of such a platform will ultimately depend on public confidence in the information it provides and the cooperation of institutions responsible for marriage registration."
- Technext: "The platform says its database includes Gazette records dating from 1886 to 2026 and links records across customary, Islamic and ordinance marriages."
- GhanaWeb: "Known as Marrify, the platform was launched in Accra on August 28, 2026, in partnership with the Ministry of Gender, Children and Social Protection (MoGCSP)."

Note: Graphic, ITWeb and Technext lead with photos of real people: a woman speaking at a podium (Graphic, uncaptioned in our crop), the Minister (ITWeb, captioned), and a couple at a traditional wedding (Technext). Those are their editorial images and fine as part of the page, but prefer the headline crops if a face would compete with Gbemi.

---

## Not captured / limits
- No standalone TechCabal article exists, only the newsletter section above. The page also shows ads; we closed them where they had a close button, so a few empty "Advertisement" slots and TechCabal's own promos (Moonshot, Fincra) stay in the full-page and top-to-drawback scroll.
- No Marrify app-store listing found. marryrightgh.com wasn't captured.
- No URL bar in the captures (headless), so credit the URL on screen.
- GhanaWeb loaded fine, but its ad network never went idle, so `status` is null in `news_meta.json`. The screenshot is good.
