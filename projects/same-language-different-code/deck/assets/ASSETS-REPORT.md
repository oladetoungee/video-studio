# Assets report: Same Language, Different Code (Øredev 2026)
Prepared 2026-11-04. No deck HTML/JS was edited. Licences and source URLs for every file are in `CREDITS.md`.

## What is in assets/
**vendor/** (offline, plain `<script>` tags, UMD globals; all files checked non-empty, headers correct)
- `d3-array.min.js` 3.2.4, `d3-geo.min.js` 3.1.1 (load d3-array first; both attach to `window.d3`)
- `topojson-client.min.js` 3.1.0 (`window.topojson`)
- `countries-110m.json`, `countries-50m.json` (world-atlas 2.0.2), plus `world-110m.js` → `window.WORLD_110M` and `world-50m.js` → `window.WORLD_50M` (same JSON, parse-checked)
- `qrcode.js` (qrcode-generator 1.4.4, `window.qrcode`)

**img/**
- Jollof photos: `jollof-1.jpg` … `jollof-4.jpg` (all 2400x1600, Pexels)
- Source screenshots (1920 wide PNG, title visible): `src-uber-lite.png`, `src-vogels-ussd.png`, `src-medianama-mastercard.png`, `src-infoq-strachan.png`, `src-qconsf-strachan.png` (bonus: the QCon SF 2023 talk page), `src-toxiproxy.png`, `src-stripe-idempotency.png`, `src-rbi-2018.png`, `src-oredev-volvo.png`, `src-cantrill.png`
- Covers: `cover-bea.jpg` (2nd edition, 381x500, small; fine at cover-thumbnail size), `cover-digital-empires.jpg` (1200x1823)

Screenshot notes: cookie banners dismissed on InfoQ and QCon. MediaNama has a thin yellow event bar at the bottom edge (crop if it bothers you). `src-oredev-volvo.png` is the Øredev 2025 programme with the session modal open; it shows Christian Fredriksson's speaker photo. No YouTube recording of the Volvo talk was found. Cantrill: the screenshot is the Speaker Deck title slide (dated 26 Jul 2017); the video is on Vimeo (Node Summit, vimeo 230142234, mirrored at https://archive.org/details/vimeo-230142234).

## Jollof photos, ranked
1. **jollof-1.jpg** (Keesha's Kitchen): unmistakable orange-red Nigerian jollof in a white dish with chicken skewers and a grilled fish behind. Bright, sharp, landscape native. Best pick.
2. **jollof-2.jpg** (Studio Saiz): jollof mound with fried plantain (dodo) on a white plate, warm and very Nigerian. Cropped to landscape from a portrait; slightly darker, more party-jollof brown-orange; shallow depth of field.
3. **jollof-3.jpg** (Keesha's Kitchen): styled flat lay, a moulded jollof with peas on a square plate plus other West African dishes. Clean and colourful but staged; the rice is a smaller part of the frame.
4. **jollof-4.jpg** (Harrun Muhammad, Abuja cafe): labelled "Jollof rice" by the photographer but it reads darker/browner, close to fried rice. Backup only.

Rejected: Pexels results that were biryani, risotto, fried rice or yellow rice (e.g. 40262791 labelled "jollof" but the rice is yellow).

## Fact-check
### 1. Uber Lite blog (23 Jan 2019) https://www.uber.com/blog/engineering-uber-lite/
| Claim | Verdict | Exact sentence |
|---|---|---|
| 56% of riders on Year Class 2015 or older | **CONFIRMED** (Android riders, "or earlier") | "For example, 56 percent of Global Uber riders used Android phones from Year Class 2015 or earlier." Note: the same post also says (Fig. 1) "40 percent of Uber riders use an Android phone with hardware equivalent to phones from 2015 or earlier" and "40 percent of Uber rides are booked via Android phones with hardware dating from 2014 or earlier". The blog is internally inconsistent; 56% is a real quote. |
| 46 million riders in one of the biggest markets on 2013-class phones | **CONFIRMED**, and the market is named: India | "data shows that in India alone, 46 million Uber riders use Android phones with technology equivalent to a device from 2013 (referred to as a Class 2013 phone) or older." |
| A third of rides on networks slower than 3G | **CONFIRMED** | "…while 33 percent occur over sub-3G data networks." |
| Under 5 MB, "less than three selfies" | **CONFIRMED** | "Keeping the rider app's download size under 5 megabytes (a memory size that amounts to less than three selfies) and the on-device size under 25 megabytes…" |
| Responses under 1 MTU | **CONFIRMED** | "This engineering strategy helps reduce network payloads to less than 1 maximum transmission unit (MTU)." and "Keeping data request and response sizes less than 1 MTU ensures that only one TCP connection needs to be made." |
| One request per screen / one persistent connection | **CONFIRMED** (wording: "single TCP connection", not "persistent") | "Allow only one network request per screen." / "Use a single TCP connection." |
| Backends for Frontends layer | **WORDING NOT IN SOURCE**: the blog never says "Backends for Frontends". It describes the pattern: "a well-orchestrated, light back-end layer specifically serving network calls to our infrastructure" and "Server-driven client: Uber Lite leverages a thin orchestration layer of services and back-end components…". Safe to say "a BFF-style thin backend layer" as your interpretation. |
| Rejected React Native/Flutter because of 6-8 MB runtime | **CONFIRMED** (they say "library", not "runtime") | "React Native/Flutter: While flexible, the size of the library, at 6 to 8 megabytes, made this approach a non-starter." |
| Points of interest instead of typed addresses | **CONFIRMED** (for pick-up) | "Guided pickups: Uber Lite simplifies destination entry by using points of interest (POIs) instead of addresses for pick-up locations." |
| CI checks enforcing size | **PARTLY**: it was work in progress, not done | "We are also enhancing our CI pipelines to throw these errors so that developers can get real-time feedback with every pull request." (tools to "prevent multidexing, generate app size metrics…"). Say "they were building CI checks", not "they had". |

### 2. Year Class
**CONFIRMED.** Facebook's open-source Android library "Device Year Class … maps a device's RAM, CPU cores, and clock speed to the year where those combination of specs were considered high end." https://github.com/facebookarchive/device-year-class

### 3. Werner Vogels, "What is USSD (and who cares)?"
- Title and date: **CONFIRMED**, 29 October 2025. https://allthingsdistributed.com/2025/10/what-is-ussd-and-who-cares.html
- ~182 characters per screen: **NOT IN THE POST.** (The number itself is right, see #12, but cite GSM/Wikipedia, not Vogels.)
- Sessions timing out: **CONFIRMED**: "It's a stateful session with pretty short timeouts."
- Gateway forwards to the server: **CONFIRMED** but **"via HTTP" is NOT in the post**: "the message traverses their mobile network to a USSD gateway that routes the request to the appropriate application server based on the short code (that *123#). The server then responds back through the same path with a menu…" (HTTP callbacks are how aggregators like Africa's Talking work, but Vogels doesn't say it.)

### 4. RBI / Mastercard
- Directive dated **6 April 2018**, RBI/2017-18/153: **CONFIRMED**. Six months to comply: **CONFIRMED**: "System providers shall ensure compliance of (i) above within a period of six months and report compliance … latest by October 15, 2018." https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11244
- Mastercard barred from onboarding new domestic customers **from 22 July 2021** (order dated 14 July 2021): **CONFIRMED** (Business Standard https://www.business-standard.com/article/finance/rbi-restricts-mastercard-from-onboarding-new-domestic-customers-121071400974_1.html). Existing cardholders not affected.
- Lifted **June 2022**: **CONFIRMED**, on **16 June 2022**: "The Reserve Bank of India (RBI) on June 16 lifted the restriction imposed on Mastercard from onboarding new domestic customers" https://www.medianama.com/2022/06/223-rbi-mastercard-ban-lifted/

### 5. Alex Strachan (Rippling)
- Rippling, Staff Software Engineer (Performance & Architecture): **CONFIRMED**. Talk "Understanding Architectures for Multi-Region Data Residency", **QCon San Francisco 2023**, Wed 4 Oct 2023, 2:45 pm, Ballroom BC: **CONFIRMED**. https://qconsf.com/presentation/oct2023/understanding-architectures-multi-region-data-residency ; video + transcript https://www.infoq.com/presentations/architecture-multi-region-storage/ ; article (31 Jan 2024) https://www.infoq.com/articles/understanding-architectures-multiregion-data-residency/
- "Atom": **CONFIRMED**: "Begin by identifying a fundamental unit, an 'atom,' within which all related data resides in one region. This could be … a company, a team, or an organization."
- Residency from customer contracts, not GDPR: **CONFIRMED**: "Contrary to common misconception, data residency is not a GDPR requirement. Instead, the driving force is often the specific needs and concerns of your customers." / "align the technical implementation with contractual promises regarding data residency."
- "Do the same thing every time": **CONFIRMED** (a section heading): "avoid designs that include logical forks like 'if multiregion; then'."
- "A small global layer": **UNVERIFIED as phrased.** The closest is the transcript's "the global datastore that is powering this mapping of thing to region" (atom-to-region routing map at the edge). Fine to paraphrase as "a small global map of which atom lives where", but don't quote "small global layer".

### 6. Volvo Cars, Øredev 2025
**CONFIRMED.** "10 years of Kafka. Tips, tricks and lessons learned from supporting 10 million connected cars", **Christian Fredriksson** ("Volvo Car Cloud Chief Opinion Officer") and **Henrik Lindström** (Volvo Cars, Infrastructure Architect), 5 Nov 2025, 13:00. Abstract: "our Kafka cluster is distributed across multiple cloud providers and almost all continents on earth." Source: Øredev 2025 programme (Sessionize data) https://archive.oredev.org/2025/#/program/feb160de-17c4-4b74-9919-bae886909898 . No YouTube video found.

### 7. Stripe Pix
**CONFIRMED with slightly different wording**: Stripe says "transactions", not "payments": "Accept payments with Pix, Brazil's most popular payment method – used in more than 40% of online transactions." https://stripe.com/payment-method/pix (The docs page https://docs.stripe.com/payments/pix does not carry the 40% figure.)

### 8. Estonian clock change
**CONFIRMED.** 25 Oct 2026 is the last Sunday of October. tz database (Europe/Tallinn): 00:59:59 UTC = 03:59:59 EEST, then 01:00:00 UTC = 03:00:00 EET (clocks go back from 04:00 EEST to 03:00 EET).

### 9. Estonian ID code 37605030299
**CONFIRMED.** 3 = male born 1900-1999; 760503 = 3 May 1976; 029 = serial; 9 = checksum. Checksum recomputed: weights 1,2,3,4,5,6,7,8,9,1 give remainder 9 → valid. It is the worked example on Estonian Wikipedia ("Nii peabki isikukoodi 37605030299 viimane number olema 9") https://et.wikipedia.org/wiki/Isikukood (not on the English Wikipedia page).

### 10. BVN and eIDAS
- BVN is **11 digits**: **CONFIRMED** ("an 11-digit number that is unique to each individual" https://en.wikipedia.org/wiki/Bank_Verification_Number ; CBN/NIBSS).
- eIDAS levels of assurance **low, substantial, high**: **CONFIRMED** (Regulation (EU) No 910/2014, Article 8 https://eur-lex.europa.eu/eli/reg/2014/910/oj).

### 11. Toxiproxy CLI (README https://github.com/Shopify/toxiproxy)
- `toxiproxy-cli create -l localhost:28080 -u localhost:8080 payments_api`: **CONFIRMED** syntax (README: `toxiproxy-cli create -l localhost:26379 -u localhost:6379 redis`).
- `toxiproxy-cli toxic add -t latency -a latency=600 -a jitter=300 payments_api`: **CONFIRMED** (README: `-a latency=1000 -a jitter=500`; "The delay is equal to latency +/- jitter", both in ms).
- `toxiproxy-cli toxic add -t bandwidth -a rate=50 payments_api`: **CONFIRMED**; unit is **KB/s** ("rate: rate in KB/s"), so rate=50 = 50 KB/s.

### 12. USSD ~182 characters
**CONFIRMED.** "USSD messages are up to 182 alphanumeric characters long" https://en.wikipedia.org/wiki/Unstructured_Supplementary_Service_Data (160 octets of GSM 7-bit packed data = 182 characters; 3GPP TS 23.038 / TS 24.090).

## Things to change on the slides
- Vogels does **not** mention 182 characters or HTTP; credit those to GSM / your own experience.
- "Backends for Frontends" is your label, not Uber's words. Uber says "thin orchestration layer" / "server-driven client".
- Uber's CI size checks were "being enhanced" in 2019, not finished.
- Uber says React Native/Flutter "library", not "runtime".
- Stripe: "online transactions", not "online payments".
- The "46 million" market is India (named in the blog).
- Strachan: "small global layer" is a paraphrase, not a quote.
