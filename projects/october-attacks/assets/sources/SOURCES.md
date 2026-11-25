# October attacks: real sources (screenshots + scroll recordings)

Captured 26 Oct 2026 for the october-attacks film, talking-head edit, shorts, thumbnails and carousels. Every page below is a real, live page, captured as it loaded (cookie banners and ads removed, nothing else touched). Show the credit line on screen whenever a capture is used. Exact boxes for drawing highlights are in `sources.json`.

## Facts to flag (read before the edit)

1. **Railway has now said more about how they got in** (Segment 5, "There's still no full detail from Railway on how the attackers got in"). Railway's *Preliminary Report* (22 Oct, `railway/railway-prelim-report_*`) gives a timeline: the attacker escalated privileges in Railway's build system, then got credentials for its CI environment, then decrypted a subset of environment variables. At most 1.85% of workspaces (about 100,000) had variables potentially exposed. Railway says the attacker was hunting AI provider API keys "to perform distillation attacks". It still has not shared the exact exploit, and a final report is promised. Suggested line: "Railway's early report says the attacker got in through their build system and was hunting for AI keys, but the full details aren't out yet."
2. **Railway and OpenCode are now linked by the companies themselves** (Segment 8). OpenCode called its breach a "distillation attack"; Railway's report says its attacker wanted AI keys for distillation attacks too. That makes the "same pattern" point stronger. Zeabur's report does not mention AI keys, so keep Zeabur's link to the pattern as "they went for the place where developers keep their secrets" (which is what the script says).
3. **PHP2Shell: lots of attempts, no confirmed mass hacking yet.** As of 24 Oct, TechCrunch says the world "so far broadly avoided mass internet exploitation"; Paperjam says no major infrastructure has documented a successful break-in. AWS calls it "broad exploitation attempts in the wild". The script's "people have already tried to exploit" is exactly right; don't upgrade it to "thousands of sites were hacked".
4. **New PHP advice since recording** (Segment 4). On 23 Oct php.net posted an informational advisory: keep `session.upload_progress.enabled=0` until the next regular release (a further, unlikely RCE path, CVE-2026-115560). Optional on-screen note under the version numbers.
5. **"break into more than a hundred companies"** (Segment 1). Reuters says the hacker broke into *websites belonging to* more than 100 companies; SharkNinja says only a standalone product-support site was hit and Cummins says it was a website run by one of its vendors. Segment 10 already says "company websites"; consider the same words in Segment 1.
6. **OpenCode refunds and key blocks** (Segment 7). Anthropic and Google blocked the exposed keys; OpenAI restored access and is refunding its API customers; OpenCode said refunds are underway. "The AI companies have blocked the stolen keys" is slightly broad. Also, OpenCode's wording is that keys "may have been exposed", so "took those keys" is a fair reading of the surprise bills but not their exact claim.
7. **"$50 per successful hack" is one researcher's rough estimate** (Snorre Fagerland, NorForge, to Reuters). NorForge's own report puts it at about $5 per attempt and says the uncertainty is considerable. The script's "estimated at about fifty dollars" is right; keep the word "estimated".
8. **Amazon timing: 4 days is right.** AWS's own post (`php2shell/aws-blog_*`) says 17 Oct, four days before disclosure. TechCrunch's later explainer says "about a week before"; trust AWS.
9. **European government websites going offline was precautionary.** Netherlands, Finland, Luxembourg (CTIE), UK councils and the Met Police took sites down to patch; none reported a breach. The script's wording ("went offline while they patched") is accurate.
10. **eMudhra has newer news** (Segment 9, optional). On 22 Oct eMudhra said it will leave the global SSL/TLS certificate business; Chrome removes the eMudhra root on 27 Oct; Microsoft blocked on 20 Oct; Apple's date differs by source (19 Oct per The Hacker News / Help Net, 22 Oct per BleepingComputer and the Mozilla incident site). "Chrome and Firefox blocked those keys as soon as it was found" is correct (17 Oct, within hours).
11. **Node.js ties into eMudhra** (Segment 4). The Node.js 21 Oct security release also removed trust in the eMudhra certificates, and reports no exploitation in the wild. Fixed versions: 22.23.4, 24.22.1, 26.12.1.
12. **Kit note now outdated:** section 11 says Node.js and eMudhra were "only reported in roundup blogs". Both are now confirmed by primary sources (nodejs.org; Google Chrome Security blog; Mozilla's incident site; Scott Helme). No change needed to the script, just to that note.

## Script check, claim by claim (Section 1)

| Seg | Claim in her script | Verdict | Where to show it |
|---|---|---|---|
| 1 | PHP had two critical security holes | Supported | php.net advisory; BleepingComputer |
| 1 | Railway told users to change their secret keys | Supported | Railway blog; TechCrunch |
| 1 | Zeabur is shutting down after being hacked twice | Supported (Aug + 14-15 Oct) | Zeabur blog; BleepingComputer |
| 1 | A hacker used AI agents to break into 100+ companies | Supported, but it was their **websites** (see flag 5) | Reuters via Star-Advertiser |
| 2 | PHP runs nearly three quarters of websites | Supported (Reuters/W3Techs "nearly three-quarters"; others say ~70%) | Deseret (Reuters) |
| 2 | WordPress and Laravel run on PHP | Supported | Paperjam lists Laravel, WordPress |
| 2 | Called PHP2Shell, CVE-2026-109618 + 109619, rated 9.2 | Supported (CVSS v4.0) | Datadog; GitHub advisories; Insurance Business ("9.2 out of 10") |
| 2 | Bug 1: out of memory mid-request leaves half-finished data, clean-up treats it as real | Supported | php.net; Datadog |
| 2 | Bug 2: leftover state from previous requests on PHP workers | Supported | php.net; Datadog ("reuse stale state from a previous request") |
| 2 | People have already tried to exploit them | Supported | AWS; SecurityWeek; Vercel |
| 3 | It happens before your code runs; login/middleware can't stop it | Supported | php.net ("before any application code runs"); Datadog; The Hacker News (CrowdStrike quote) |
| 3 | Amazon honeypot saw an attempt 4 days before it was announced | Supported (17 Oct) | AWS blog; The Hacker News; Help Net |
| 3 | Government websites in Europe went offline while they patched | Supported (precaution, flag 9) | Deseret (Reuters); Insurance Business; Newsweek; Paperjam |
| 4 | Fixed: 8.5.12, 8.4.27, 8.3.36, 8.2.35 | Supported | php.net; Datadog table |
| 4 | 8.1 or older: upgrade | Supported (PHP gave minimal source backports for 7.4/8.0/8.1; vendors may backport) | php.net; BleepingComputer |
| 4 | Restart PHP-FPM / Apache, rebuild Docker images | Supported | Datadog remediation steps; Paperjam (CIRCL) |
| 4 | Laravel version doesn't protect you | Supported (only the PHP runtime update fixes it) | Vercel; Paperjam |
| 4 | Node.js had a security release the same day | Supported (21 Oct) | nodejs.org; SecurityOnline |
| 5 | Railway happened the same day | Supported (disclosure 21 Oct; attack began 20 Oct) | Railway blog; Railway report |
| 5 | Someone may have accessed encrypted environment variables | Supported, and "for some of them, obtained the decrypted contents" | Railway blog; TechCrunch |
| 5 | Railway paused deployments | Supported (restored 22 Oct) | Railway blog; GitGuardian; Railway report |
| 5 | Users told to revoke API keys and cloud keys | Supported | Railway blog; TechCrunch |
| 5 | No full detail on how attackers got in | **Newer info** (flag 1) | Railway preliminary report |
| 5 | Part of a series of attacks aiming at AI companies | Supported ("compromising AI inference providers") | Railway blog |
| 6 | Breached in August, again 14-15 Oct with leaked internal credentials | Supported | Zeabur incident report; BleepingComputer |
| 6 | ~321,810 accounts, ~3.2M environment variable records | Supported | BleepingComputer; Zeabur report |
| 6 | Admin tokens had no expiry, unchanged since January 2024, missed in the post-August rotation | Supported (Zeabur's own words) | BleepingComputer quote; Zeabur report |
| 6 | Pause services and shut down by end of December | Supported (1 Dec: shared-cluster services paused, renewals off; 31 Dec: everything stops) | Zeabur blog |
| 7 | OpenCode Console stores AI API keys; older system broken into | Supported ("legacy system ... being decommissioned") | TechCrunch; Infosecurity |
| 7 | About 1.4% of Console users | Supported | OpenCode on X; TechCrunch |
| 7 | Alerts from OpenAI, Anthropic and Google | Supported (developer quote) | TechCrunch |
| 7 | Charges in the hundreds, a few over $1,000 | Supported (BleepingComputer: up to $1,700) | TechCrunch; BleepingComputer |
| 7 | OpenCode calls it a distillation attack | Supported; skeptics question it (script says "may have been", good) | OpenCode on X; TechCrunch |
| 7 | Keys blocked, refunds going out | Mostly (flag 6) | TechCrunch |
| 9 | Eight signing keys so weak one was the number 4 | Supported | Scott Helme; BleepingComputer; The Next Web |
| 9 | Script error in April 2025 made a second set of weak keys | Supported (eMudhra's explanation, ceremony on 30 Apr 2025) | BleepingComputer; The Hacker News |
| 9 | Someone could have faked a website with the padlock | Supported (no evidence it happened) | Google Chrome Security blog |
| 9 | Chrome and Firefox blocked them as soon as it was found | Supported (17 Oct) | Mozilla incident site; Google blog |
| 10 | Reuters: one hacker, AI agents, 100+ company websites | Supported | Star-Advertiser (Reuters); SBS; The Next Web |
| 10 | Deere, SharkNinja, Cummins | Supported (with their statements) | Star-Advertiser (Reuters) |
| 10 | Short instructions, agents ran for hours | Supported (under 100 Chinese characters; ~23 h per success) | Star-Advertiser; SBS |
| 10 | ~$50 in tokens per successful hack | Supported as an estimate (flag 7) | Star-Advertiser; The Next Web |
| 10 | PHP2Shell was found with help from AI | Supported (Calif with OpenAI's model; Wiz: "frontier AI") | Wiz blog; Deseret; Help Net |
| 10 | "The GitHub situation earlier this year" | Not checked (her own earlier video) | |

## All captures

Files sit next to this file: `<story>/<slug>_fold.png` (1920x1080 first screen), `<slug>_full.jpg` (1440 wide, whole article, max 6000 px tall), `<slug>_scroll.mp4` (1920x1080, 30 fps, smooth scroll that stops on each key line). Every key line has a box for the full image and a box + time for the scroll video (exact numbers in `sources.json`; a box is x, y, width, height in pixels). Ads and cookie banners were removed before capture; nothing on any page was edited.

Total size of the captures: 176 MB.

### php2shell

- **Datadog Security Labs**: "PHP2Shell - Critical vulnerabilities in PHP (CVE-2026-109618, CVE-2026-109619): detection, analysis, and remediation" (21 Oct 2026). Status: loaded
  - URL: https://securitylabs.datadoghq.com/articles/php2shell-critical-vulnerabilities-in-php/
  - Files: `php2shell/datadog_fold.png`, `php2shell/datadog_full.jpg`, `php2shell/datadog_scroll.mp4` (9.1 s)
  - On-screen credit: **Source: Datadog Security Labs, 21 Oct 2026 (updated 23 Oct)**
  - Key line: "each with a CVSS v4.0 score of 9.2" | full.jpg box 64,1613,830,54 | scroll.mp4 at 2.98 s box 276,410,897,54
  - Key line: "application-level authentication can't block an attack: PHP processes the malicious request before any application code runs" | full.jpg box 64,1641,849,54 | scroll.mp4 at 2.98 s box 276,438,853,54
  - Key line: "AWS reported PHP2Shell exploitation attempts in the wild as early as October 17, 2026, four days before public disclosure and the release of patches" | full.jpg box 63,1713,819,54 | scroll.mp4 at 2.98 s box 275,510,873,54
  - Key line: "After a memory allocation fails, PHP leaves invalid data behind for its cleanup routine to process" | full.jpg box 64,2543,855,54 | scroll.mp4 at 5.45 s box 276,410,855,54
  - Key line: "A PHP worker can reuse stale state from a previous request" | full.jpg box 221,2615,468,26 | scroll.mp4 at 5.45 s box 433,482,468,26
  - Key line: "Restart or replace every worker that still runs the old runtime" | full.jpg box 68,3709,487,26 | scroll.mp4 at 8.27 s box 280,410,487,26
- **BleepingComputer**: "PHP ships emergency patches for critical PHP2Shell flaws" (21 Oct 2026). Status: loaded
  - URL: https://www.bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws/
  - Files: `php2shell/bleepingcomputer_fold.png`, `php2shell/bleepingcomputer_full.jpg`, `php2shell/bleepingcomputer_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: BleepingComputer, 21 Oct 2026**
  - Key line: "The PHP security team released emergency security patches for two critical remote code execution (RCE) vulnerabilities" | full.jpg box 135,1078,832,46 | scroll.mp4 at 2.55 s box 375,410,832,46
  - Key line: "discovered by Calif, OpenAI, and Wiz security researchers" | full.jpg box 466,1143,459,21 | scroll.mp4 at 2.55 s box 706,475,459,21
  - Key line: "Admins should install PHP 8.5.12, 8.4.27, 8.3.36, or 8.2.35 as soon as possible" | full.jpg box 135,1481,620,21 | scroll.mp4 at 6.05 s box 375,410,620,21
- **The Hacker News**: "Someone Tried to Exploit PHP2Shell 4 Days Before the Vulnerabilities Were Publicly Disclosed" (22 Oct 2026). Status: loaded
  - URL: https://thehackernews.com/2026/10/someone-tried-to-exploit-php2shell-4.html
  - Files: `php2shell/thehackernews_fold.png`, `php2shell/thehackernews_full.jpg`, `php2shell/thehackernews_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: The Hacker News, 22 Oct 2026**
  - Key line: "detected an attempt to exploit the newly disclosed PHP2Shell vulnerabilities dating back to October 17, 2026, against its MadPot honeypot service" | full.jpg box 176,877,679,74 | scroll.mp4 at 2.5 s box 416,410,679,74
  - Key line: "There is no authentication to bypass, no session to steal, and no vulnerable endpoint to discover" | full.jpg box 181,1649,666,19 | scroll.mp4 at 6.13 s box 421,410,666,19
- **Deseret News (Reuters)**: "A just-revealed security flaw is hitting computer systems around the world" (21 Oct 2026). Status: loaded. Deseret News story citing Reuters and the Wall Street Journal
  - URL: https://www.deseret.com/business/2026/10/21/website-computer-server-security-flaw-artificial-intelligence-hackers-cybersecurity-php-programming-language/
  - Files: `php2shell/deseret-reuters_fold.png`, `php2shell/deseret-reuters_full.jpg`, `php2shell/deseret-reuters_scroll.mp4` (10.7 s)
  - On-screen credit: **Source: Deseret News (citing Reuters), 21 Oct 2026**
  - Key line: "numerous government websites across Europe that went dark Wednesday, to execute fixes" | full.jpg box 182,1577,659,50 | scroll.mp4 at 2.98 s box 422,410,659,50
  - Key line: "PHP powers nearly three-quarters of the world's websites" | full.jpg box 182,2919,707,50 | scroll.mp4 at 5.62 s box 422,410,707,50
  - Key line: "The PHP2Shell flaws are rated 9.2 out of 10" | full.jpg box 182,3053,350,22 | scroll.mp4 at 7.5 s box 422,410,350,22
  - Key line: "uncovered the PHP problems with assistance from OpenAI's GPT-5.6 Sol platform" | full.jpg box 182,3372,689,51 | scroll.mp4 at 9.87 s box 422,410,689,51
- **PHP.net**: "Security advisory: Critical remote code execution vulnerabilities, update now" (21 Oct 2026). Status: loaded. php.net home page news column; the 21 Oct advisory sits below a newer 23 Oct informational advisory
  - URL: https://www.php.net/
  - Files: `php2shell/php-net_fold.png`, `php2shell/php-net_full.jpg`, `php2shell/php-net_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: php.net, 21 Oct 2026**
  - Key line: "Security advisory: Critical remote code execution vulnerabilities, update now" | full.jpg box 159,991,697,76 | scroll.mp4 at 2.68 s box 264,410,832,28
  - Key line: "PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35 fix two critical vulnerabilities that can allow unauthenticated remote code execution" | full.jpg box 159,1106,789,46 | scroll.mp4 at 2.68 s box 264,477,864,19
  - Key line: "We consider the risk highest for mod_php, with a demonstrated exploit where an unauthenticated request can trigger the attack before any application code runs" | full.jpg box 159,1212,788,46 | scroll.mp4 at 4.57 s box 264,410,1018,73
  - Key line: "PHP 8.1 and older no longer receive updates from the PHP project" | full.jpg box 183,1654,474,19 | scroll.mp4 at 7.07 s box 288,410,474,19
- **GitHub (php-src advisory)**: "RCE via OOM corruption (CVE-2026-109618)" (21 Oct 2026). Status: loaded
  - URL: https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w
  - Files: `php2shell/github-advisory-109618_fold.png`, `php2shell/github-advisory-109618_full.jpg`, `php2shell/github-advisory-109618_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: PHP security advisory on GitHub, 21 Oct 2026**
  - Key line: "RCE via OOM corruption" | full.jpg box 112,248,336,38 | scroll.mp4 at 0.53 s box 352,139,336,38
- **GitHub (php-src advisory)**: "RCE via stale global state (CVE-2026-109619)" (21 Oct 2026). Status: loaded
  - URL: https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp
  - Files: `php2shell/github-advisory-109619_fold.png`, `php2shell/github-advisory-109619_full.jpg`, `php2shell/github-advisory-109619_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: PHP security advisory on GitHub, 21 Oct 2026**
  - Key line: "RCE via stale global state" | full.jpg box 112,248,344,38 | scroll.mp4 at 0.53 s box 352,139,344,38
- **Vercel**: "PHP security advisory: php2shell (CVE-2026-109618, CVE-2026-109619)" (21 Oct 2026). Status: loaded
  - URL: https://vercel.com/kb/bulletin/php2shell-security-bulletin
  - Files: `php2shell/vercel_fold.png`, `php2shell/vercel_full.jpg`, `php2shell/vercel_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Vercel, 21 Oct 2026**
  - Key line: "Working public exploits are already available, and exploitation attempts have been reported across the industry" | full.jpg box 378,670,669,51 | scroll.mp4 at 4.92 s box 616,410,669,51
- **Help Net Security**: "PHP2Shell: Critical PHP vulnerabilities patched, update now!" (21 Oct 2026). Status: loaded
  - URL: https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/
  - Files: `php2shell/helpnetsecurity_fold.png`, `php2shell/helpnetsecurity_full.jpg`, `php2shell/helpnetsecurity_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Help Net Security, 21 Oct 2026**
  - Key line: "These findings rank among the most severe vulnerabilities discovered in PHP, and arguably in software history" | full.jpg box 215,1048,621,48 | scroll.mp4 at 2.6 s box 455,410,621,48
  - Key line: "its MadPot honeypot network recorded a PHP2Shell exploitation attempt on Oct. 17, 2026, four days before" | full.jpg box 215,3224,643,48 | scroll.mp4 at 6.47 s box 455,410,643,48
- **SecurityWeek**: "PHP2Shell Patches Land as First Exploitation Attempts Hit Sensors" (21 Oct 2026). Status: loaded
  - URL: https://www.securityweek.com/php2shell-patches-land-as-first-exploitation-attempts-hit-sensors/
  - Files: `php2shell/securityweek_fold.png`, `php2shell/securityweek_full.jpg`, `php2shell/securityweek_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: SecurityWeek, 21 Oct 2026**
  - Key line: "Several cybersecurity companies saw exploitation attempts of CVE-2026-109618 and CVE-2026-109619 before PHP released the patches" | full.jpg box 100,458,1170,31 | scroll.mp4 at 0.53 s box 340,284,1170,31
  - Key line: "We are now seeing php2shell exploited in the wild at scale" | full.jpg box 107,1745,438,27 | scroll.mp4 at 5.2 s box 347,410,438,27
- **Dark Reading**: "'PHP2Shell' Bugs Signal Red Alert for Security Industry" (21 Oct 2026). Status: loaded
  - URL: https://www.darkreading.com/application-security/php2shell-bugs-red-alert-security-industry
  - Files: `php2shell/darkreading_fold.png`, `php2shell/darkreading_full.jpg`, `php2shell/darkreading_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Dark Reading, 21 Oct 2026**
  - Key line: "Security teams are scrambling to remediate two critical PHP vulnerabilities following leaked details and reports of exploitation attempts" | full.jpg box 202,402,962,48 | scroll.mp4 at 0.53 s box 442,200,962,48
- **Newsweek**: "Critical PHP Flaws Threaten Millions of Websites in New AI Security Test" (21 Oct 2026). Status: loaded. long page; key lines are far down (full image extended to 8600 px)
  - URL: https://www.newsweek.com/php-vunerability-php2shell-issue-websites-hack-server-12601225
  - Files: `php2shell/newsweek_fold.png`, `php2shell/newsweek_full.jpg`, `php2shell/newsweek_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Newsweek, 21 Oct 2026**
  - Key line: "government websites in the Netherlands and Finland were taken offline" | full.jpg box 380,5787,607,52 | scroll.mp4 at 5.58 s box 620,725,607,52
  - Key line: "Some organizations have temporarily taken websites and online services offline rather than leave potentially vulnerable systems exposed while fixes are installed" | full.jpg box 380,5472,648,80 | scroll.mp4 at 5.58 s box 620,410,648,80
- **Insurance Business UK**: "UK councils and Met Police among sites pulled offline after NCSC alert" (21 Oct 2026). Status: loaded
  - URL: https://www.insurancebusinessmag.com/uk/news/cyber/uk-councils-and-met-police-among-sites-pulled-offline-after-ncsc-alert-594424.aspx
  - Files: `php2shell/insurancebusiness_fold.png`, `php2shell/insurancebusiness_full.jpg`, `php2shell/insurancebusiness_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Insurance Business UK, 21 Oct 2026**
  - Key line: "Websites belonging to UK councils, the Metropolitan Police and governments across Europe went dark on Wednesday" | full.jpg box 335,1575,713,54 | scroll.mp4 at 2.85 s box 370,410,713,54
  - Key line: "Both are rated 9.2 out of 10 for severity" | full.jpg box 509,1895,362,24 | scroll.mp4 at 6.17 s box 544,410,362,24
- **Paperjam**: "PHP2Shell: thousands of websites exposed in Luxembourg" (21 Oct 2026). Status: loaded
  - URL: https://en.paperjam.lu/article/php2shell-thousands-of-websites-exposed-in-luxembourg
  - Files: `php2shell/paperjam_fold.png`, `php2shell/paperjam_full.jpg`, `php2shell/paperjam_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Paperjam, 21 Oct 2026**
  - Key line: "temporarily taken certain services offline as a precautionary measure" | full.jpg box 236,3382,558,56 | scroll.mp4 at 3.55 s box 476,410,558,56
  - Key line: "So far, no major infrastructure has publicly documented a successful intrusion conclusively attributed to PHP2Shell" | full.jpg box 236,4688,601,56 | scroll.mp4 at 6.78 s box 476,410,601,56
- **Wiz**: "CVE-2026-109618: 
PHP vulnerability analysis and mitigation" (date not shown). Status: loaded. Wiz vulnerability database entry (reference page, no article date)
  - URL: https://www.wiz.io/vulnerability-database/cve/cve-2026-109618
  - Files: `php2shell/wiz_fold.png`, `php2shell/wiz_full.jpg`, `php2shell/wiz_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Wiz vulnerability database**
- **TechCrunch**: "PHP-ocalypse: How two critical web bugs almost broke the internet" (24 Oct 2026). Status: loaded
  - URL: https://techcrunch.com/2026/10/24/php-ocalypse-how-two-critical-web-bugs-almost-broke-the-internet/
  - Files: `php2shell/techcrunch-phpocalypse_fold.png`, `php2shell/techcrunch-phpocalypse_full.jpg`, `php2shell/techcrunch-phpocalypse_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: TechCrunch, 24 Oct 2026**
  - Key line: "On Wednesday, a decades-old open-source web technology called PHP almost broke the internet" | full.jpg box 226,811,612,46 | scroll.mp4 at 2.4 s box 466,410,612,46
  - Key line: "the world — so far — broadly avoided mass internet exploitation" | full.jpg box 304,1359,538,19 | scroll.mp4 at 6.02 s box 544,410,538,19
  - Key line: "Banks, retailers, gaming sites, online stores, hospitals, and some government agencies took down their servers to prevent attacks" | full.jpg box 226,1465,633,46 | scroll.mp4 at 6.02 s box 466,516,633,46
- **Wiz**: "PHP2Shell: AI uncovers critical RCE vulnerabilities affecting 70% of the Internet" (21 Oct 2026). Status: loaded
  - URL: https://www.wiz.io/blog/php2shell-php-rce
  - Files: `php2shell/wiz-blog_fold.png`, `php2shell/wiz-blog_full.jpg`, `php2shell/wiz-blog_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Wiz Research, 21 Oct 2026**
  - Key line: "These findings rank among the most severe vulnerabilities discovered in PHP, and arguably in software history" | full.jpg box 98,1565,905,24 | scroll.mp4 at 3 s box 338,410,905,24
  - Key line: "how frontier AI helped us find and fix vulnerabilities that had remained hidden in the PHP codebase for more than a decade" | full.jpg box 65,1821,1013,56 | scroll.mp4 at 6.22 s box 305,410,1013,56
- **AWS Security Blog**: "Amazon Threat Intelligence identifies PHP2Shell exploitation prior to public disclosure in MadPot" (21 Oct 2026). Status: loaded
  - URL: https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/
  - Files: `php2shell/aws-blog_fold.png`, `php2shell/aws-blog_full.jpg`, `php2shell/aws-blog_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: AWS Security Blog, 21 Oct 2026**
  - Key line: "Amazon Threat Intelligence identified a PHP2Shell exploitation attempt dating to Oct. 17, 2026, in MadPot telemetry, four days before public disclosure" | full.jpg box 135,425,748,39 | scroll.mp4 at 0.53 s box 375,294,748,39
  - Key line: "PHP2Shell is now seeing broad exploitation attempts in the wild" | full.jpg box 221,754,408,17 | scroll.mp4 at 2.43 s box 461,410,408,17
  - Key line: "AI-assisted analysis makes it cheaper to turn a patch diff or advisory into a working exploit" | full.jpg box 157,949,741,40 | scroll.mp4 at 5.9 s box 397,410,741,40
- **Hacker News (thread)**: "PHP2Shell: AI uncovers critical RCE in PHP (454 points, 185 comments)" (21 Oct 2026). Status: loaded. Hacker News discussion of the Wiz blog post
  - URL: https://news.ycombinator.com/item?id=50180836
  - Files: `php2shell/hn-thread_fold.png`, `php2shell/hn-thread_full.jpg`, `php2shell/hn-thread_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Hacker News, 21 Oct 2026**
  - Key line: "PHP2Shell: AI uncovers critical RCE in PHP" | full.jpg box 68,82,499,28 | scroll.mp4 at 0.53 s box 200,82,499,28
- **php2shell.com (discoverers' site)**: "PHP2Shell" (date not shown). Status: loaded. the discoverers' explainer site
  - URL: https://www.php2shell.com/
  - Files: `php2shell/php2shell-site_fold.png`, `php2shell/php2shell-site_full.jpg`, `php2shell/php2shell-site_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: php2shell.com (discoverers' site)**
- **Wikipedia**: "PHP2Shell" (date not shown). Status: loaded
  - URL: https://en.wikipedia.org/wiki/PHP2Shell
  - Files: `php2shell/wikipedia_fold.png`, `php2shell/wikipedia_full.jpg`, `php2shell/wikipedia_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Wikipedia, PHP2Shell article (viewed 26 Oct 2026)**

### railway

- **Railway (official blog)**: "Security Disclosure: Wednesday October 21st" (21 Oct 2026). Status: loaded
  - URL: https://blog.railway.com/p/security-disclosure-wednesday-october-21st
  - Files: `railway/railway-blog_fold.png`, `railway/railway-blog_full.jpg`, `railway/railway-blog_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Railway, 21 Oct 2026**
  - Key line: "Security Disclosure: Wednesday October 21st" | full.jpg box 368,218,548,118 | scroll.mp4 at 0.53 s box 608,137,548,118
  - Key line: "an unauthorized third party may have accessed encrypted environment variables and, for some of them, obtained the decrypted contents" | full.jpg box 368,454,679,48 | scroll.mp4 at 0.53 s box 608,373,679,48
  - Key line: "We believe this is part of a series of attacks recently targeting platform companies with the aim of compromising AI inference providers" | full.jpg box 368,578,699,48 | scroll.mp4 at 0.53 s box 608,497,699,48
  - Key line: "we strongly recommend that you immediately roll all environment variables" | full.jpg box 368,799,680,48 | scroll.mp4 at 4.97 s box 608,410,680,48
  - Key line: "All deployments are paused while we investigate" | full.jpg box 368,896,413,21 | scroll.mp4 at 4.97 s box 608,507,413,21
- **TechCrunch**: "Developer platform Railway urges ‘all users’ to revoke secret keys after cyberattack" (22 Oct 2026). Status: loaded
  - URL: https://techcrunch.com/2026/10/22/developer-platform-railway-urges-all-users-to-revoke-secret-keys-after-cyberattack/
  - Files: `railway/techcrunch_fold.png`, `railway/techcrunch_full.jpg`, `railway/techcrunch_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: TechCrunch, 22 Oct 2026**
  - Key line: "Developer platform Railway urges 'all users' to revoke secret keys after cyberattack" | full.jpg box 729,362,539,128 | scroll.mp4 at 0.53 s box 936,142,539,128
  - Key line: "may have accessed encrypted environment variables and, for some of them, obtained the decrypted contents" | full.jpg box 226,995,658,45 | scroll.mp4 at 2.57 s box 466,410,658,45
  - Key line: "Railway did not say how many specific users were affected, or what was identified as the root cause" | full.jpg box 226,1383,609,46 | scroll.mp4 at 6.05 s box 466,410,609,46
  - Key line: "the company plans to publish a post-mortem on the incident" | full.jpg box 226,1489,588,46 | scroll.mp4 at 6.05 s box 466,516,588,46
- **GitGuardian**: "Railway October 2026 Incident: Treat Every Environment Variable as Exposed" (22 Oct 2026). Status: loaded
  - URL: https://blog.gitguardian.com/railway-october-2026-incident-environment-variables/
  - Files: `railway/gitguardian_fold.png`, `railway/gitguardian_full.jpg`, `railway/gitguardian_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: GitGuardian, 22 Oct 2026**
  - Key line: "Treat every secret stored in Railway as at risk until investigated" | full.jpg box 200,1870,545,24 | scroll.mp4 at 6.23 s box 440,410,545,24
  - Key line: "has paused deployments during the investigation" | full.jpg box 237,1550,427,24 | scroll.mp4 at 2.98 s box 477,410,427,24
- **Railway Station (community)**: not captured (off-topic (2-month-old community thread about Zeabur, not this incident)). https://station.railway.com/community/security-practices-after-a-recent-cloud-0bf3bdea
- **Railway Status**: "Railway Status page" (23 Oct 2026). Status: loaded. live status page as of 26 Oct 2026; shows the 23 Oct notice that new account signups remain paused
  - URL: https://status.railway.com/
  - Files: `railway/railway-status_fold.png`, `railway/railway-status_full.jpg`, `railway/railway-status_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: status.railway.com, viewed 26 Oct 2026**
  - Key line: "New account signups remain paused" | full.jpg box 363,324,270,18 | scroll.mp4 at 0.53 s box 603,324,270,18
- **Railway (preliminary report)**: "Preliminary Report: Oct 21st Security Incident" (22 Oct 2026). Status: loaded
  - URL: https://blog.railway.com/p/preliminary-report-october-security-incident
  - Files: `railway/railway-prelim-report_fold.png`, `railway/railway-prelim-report_full.jpg`, `railway/railway-prelim-report_scroll.mp4` (10.6 s)
  - On-screen credit: **Source: Railway, 22 Oct 2026**
  - Key line: "Early investigations tell us this attack was attempting to obtain AI provider API keys to perform distillation attacks" | full.jpg box 368,757,697,48 | scroll.mp4 at 2.48 s box 608,410,697,48
  - Key line: "we are not yet able to share the specific details and scale of the exploits" | full.jpg box 368,924,699,48 | scroll.mp4 at 4.4 s box 608,410,699,48
  - Key line: "at most 1.85% of all workspaces had some environment variables potentially compromised" | full.jpg box 368,3379,684,48 | scroll.mp4 at 9.72 s box 608,410,684,48
  - Key line: "This represents, numerically, about 100,000 workspaces" | full.jpg box 368,3406,669,48 | scroll.mp4 at 9.72 s box 608,437,669,48
  - Key line: "We recommend that all customers who signed up prior to October 21 rotate their keys stored on Railway" | full.jpg box 368,1339,694,75 | scroll.mp4 at 6.55 s box 608,410,694,75
- **Hacker News (thread)**: "Security Disclosure (Railway) (602 points, 340 comments)" (21 Oct 2026). Status: loaded
  - URL: https://news.ycombinator.com/item?id=50188228
  - Files: `railway/hn-thread_fold.png`, `railway/hn-thread_full.jpg`, `railway/hn-thread_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Hacker News, 21 Oct 2026**
  - Key line: "Security Disclosure" | full.jpg box 68,82,224,28 | scroll.mp4 at 0.53 s box 200,82,224,28
- **RuntimeWire**: not captured (browser-verification wall + AI-assisted news site; Railway's own posts and TechCrunch cover the same facts). https://runtimewire.com/article/railway-security-disclosure-environment-variables-october-2026

### zeabur

- **Zeabur (official blog)**: "Zeabur is shutting down: what happens next" (17 Oct 2026). Status: loaded
  - URL: https://zeabur.com/blogs/zeabur-is-shutting-down
  - Files: `zeabur/zeabur-blog_fold.png`, `zeabur/zeabur-blog_full.jpg`, `zeabur/zeabur-blog_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Zeabur, 17 Oct 2026**
  - Key line: "Zeabur is shutting down: what happens next" | full.jpg box 302,231,835,120 | scroll.mp4 at 0.53 s box 542,137,835,120
  - Key line: "all dedicated servers and shared clusters will be shut down by December 31" | full.jpg box 513,368,583,50 | scroll.mp4 at 0.53 s box 753,274,583,50
  - Key line: "Today, I have a difficult decision to share: we will be winding down Zeabur" | full.jpg box 272,1121,542,21 | scroll.mp4 at 2.73 s box 512,410,542,21
  - Key line: "We ultimately decided to wind down" | full.jpg box 272,2313,884,53 | scroll.mp4 at 6.35 s box 512,410,884,53
- **BleepingComputer**: "Zeabur shutting down after second security breach in two months" (20 Oct 2026). Status: loaded
  - URL: https://www.bleepingcomputer.com/news/security/zeabur-shutting-down-after-second-security-breach-in-two-months/
  - Files: `zeabur/bleepingcomputer_fold.png`, `zeabur/bleepingcomputer_full.jpg`, `zeabur/bleepingcomputer_scroll.mp4` (9.0 s)
  - On-screen credit: **Source: BleepingComputer, 20 Oct 2026**
  - Key line: "Zeabur shutting down after second security breach in two months" | full.jpg box 135,456,810,27 | scroll.mp4 at 0.53 s box 375,144,810,27
  - Key line: "steal over 3.2 million environment variable records and information for 321,810 accounts" | full.jpg box 135,1103,828,46 | scroll.mp4 at 2.58 s box 375,410,828,46
  - Key line: "The admin tokens had no expiry, had not been rotated since they were created in January 2024, and were not included in the post-August rotation" | full.jpg box 135,3149,800,46 | scroll.mp4 at 5.45 s box 375,410,800,46
  - Key line: "it will shut down its services starting December 1, 2026, and finish by December 31, 2026" | full.jpg box 135,3939,824,46 | scroll.mp4 at 8.1 s box 375,410,824,46
- **SC Media**: "Zeabur to shut down following major security breach" (21 Oct 2026). Status: loaded
  - URL: https://www.scworld.com/brief/zeabur-to-shut-down-following-major-security-breach
  - Files: `zeabur/scworld_fold.png`, `zeabur/scworld_full.jpg`, `zeabur/scworld_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: SC Media, 21 Oct 2026**
  - Key line: "The company failed to rotate administrator tokens, which had remained unchanged since January 2024" | full.jpg box 188,1123,690,78 | scroll.mp4 at 5.1 s box 428,410,690,78
- **Start With Identity**: "Zeabur to shut down after a non-expiring admin token opened its shared cluster" (19 Oct 2026). Status: loaded
  - URL: https://startwithidentity.com/blog/2026-10-19-zeabur-to-shut-down-after-a-non-expiring-admin-token-opened-its-shared-cluster/
  - Files: `zeabur/startwithidentity_fold.png`, `zeabur/startwithidentity_full.jpg`, `zeabur/startwithidentity_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Start With Identity, 19 Oct 2026**
  - Key line: "a shared-cluster admin token created in January 2024 with no expiry" | full.jpg box 360,391,661,57 | scroll.mp4 at 0.53 s box 600,340,661,57
- **Ray's blog**: "Zeabur Is Shutting Down: A Taiwanese Startup's Growing Pains" (18 Oct 2026). Status: loaded
  - URL: https://israynotarray.com/en/misc/2026/10/18/zeabur-shutting-down-taiwanese-startup-growing-pains/
  - Files: `zeabur/israynotarray_fold.png`, `zeabur/israynotarray_full.jpg`, `zeabur/israynotarray_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Ray's blog, 18 Oct 2026**
- **Zeabur (incident report)**: "Zeabur October 2026 security incident (preliminary report)" (19 Oct 2026). Status: loaded
  - URL: https://zeabur.com/blogs/october-2026-security-incident
  - Files: `zeabur/zeabur-incident-report_fold.png`, `zeabur/zeabur-incident-report_full.jpg`, `zeabur/zeabur-incident-report_scroll.mp4` (11.2 s)
  - On-screen credit: **Source: Zeabur, 19 Oct 2026**
  - Key line: "On October 14–15, 2026, an attacker used leaked Zeabur internal credentials to break into the shared cluster" | full.jpg box 312,834,811,53 | scroll.mp4 at 2.53 s box 552,410,811,53
  - Key line: "long-lived admin credentials were stored in plaintext and could be used from the public internet" | full.jpg box 312,1202,825,53 | scroll.mp4 at 4.65 s box 552,410,825,53
  - Key line: "The shared cluster's admin interface was open to the public internet at the time, and the admin tokens had no expiry" | full.jpg box 312,1866,845,21 | scroll.mp4 at 6.95 s box 552,410,845,21
  - Key line: "321,810 accounts" | full.jpg box 761,4539,110,18 | scroll.mp4 at 10.3 s box 1001,410,110,18

### opencode

- **TechCrunch**: "Hackers hit AI coding tool OpenCode, running up charges on users’ AI accounts" (19 Oct 2026). Status: loaded
  - URL: https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/
  - Files: `opencode/techcrunch_fold.png`, `opencode/techcrunch_full.jpg`, `opencode/techcrunch_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: TechCrunch, 19 Oct 2026**
  - Key line: "Hackers hit AI coding tool OpenCode, running up charges on users' AI accounts" | full.jpg box 729,362,577,128 | scroll.mp4 at 0.53 s box 936,142,577,128
  - Key line: "attackers broke into an older system overnight, affecting 1.4% of users of its online platform, OpenCode Console" | full.jpg box 226,864,657,46 | scroll.mp4 at 2.45 s box 466,410,657,46
  - Key line: "I saw my Open AI, Anthropic, and Google AI spend alerts all fire off before going to bed" | full.jpg box 226,1412,646,46 | scroll.mp4 at 4.68 s box 466,410,646,46
  - Key line: "Other users reported charges in the hundreds of dollars on individual accounts; a few described totals above $1,000" | full.jpg box 226,1516,589,46 | scroll.mp4 at 4.68 s box 466,514,589,46
  - Key line: "OpenCode said refunds for unauthorized charges are underway" | full.jpg box 226,1646,610,46 | scroll.mp4 at 7.05 s box 466,410,610,46
- **BleepingComputer**: "OpenCode hack exposes API keys amid AI distillation attacks" (19 Oct 2026). Status: loaded
  - URL: https://www.bleepingcomputer.com/news/security/opencode-hack-exposes-api-keys-amid-ai-distillation-attacks/
  - Files: `opencode/bleepingcomputer_fold.png`, `opencode/bleepingcomputer_full.jpg`, `opencode/bleepingcomputer_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: BleepingComputer, 19 Oct 2026**
  - Key line: "OpenCode hack exposes API keys amid AI distillation attacks" | full.jpg box 135,456,748,27 | scroll.mp4 at 0.53 s box 375,144,748,27
  - Key line: "the breach affected 1.4% of OpenCode Console users, with some reporting more than $1,700 in unauthorized charges overnight" | full.jpg box 135,1209,798,46 | scroll.mp4 at 2.65 s box 375,410,798,46
  - Key line: "Distillation is a legitimate machine-learning technique that trains smaller AI models using responses generated by more powerful models" | full.jpg box 135,1655,799,46 | scroll.mp4 at 6.12 s box 375,410,799,46
- **Infosecurity Magazine**: "OpenCode Breach Could Affect OpenAI, Anthropic and Google" (19 Oct 2026). Status: loaded
  - URL: https://www.infosecurity-magazine.com/news/opencode-breach-openai-anthropic/
  - Files: `opencode/infosecurity_fold.png`, `opencode/infosecurity_full.jpg`, `opencode/infosecurity_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Infosecurity Magazine, 19 Oct 2026**
  - Key line: "identified unauthorized access to a legacy system that we were in the process of decommissioning" | full.jpg box 222,1462,660,43 | scroll.mp4 at 5.1 s box 462,410,660,43
- **DevOps.com**: "OpenCode Breach Puts Spotlight on AI Distillation Threats" (19 Oct 2026). Status: loaded
  - URL: https://devops.com/opencode-breach-puts-spotlight-on-ai-distillation-threats/
  - Files: `opencode/devops_fold.png`, `opencode/devops_full.jpg`, `opencode/devops_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: DevOps.com, 19 Oct 2026**
  - Key line: "Stolen keys can lead to unexpected bills and greater risk" | full.jpg box 132,917,392,19 | scroll.mp4 at 4.97 s box 372,410,392,19
- **OfficeChai**: "OpenCode Discloses Security Breach, Says Attackers May Have Accessed Users’ OpenAI, Anthropic And Google API Keys" (17 Oct 2026). Status: loaded
  - URL: https://officechai.com/ai/opencode-discloses-security-breach-says-attackers-may-have-accessed-users-openai-anthropic-and-google-api-keys/
  - Files: `opencode/officechai_fold.png`, `opencode/officechai_full.jpg`, `opencode/officechai_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: OfficeChai, 17 Oct 2026**
  - Key line: "Whole new world with AI-powered hacking" | full.jpg box 274,1224,355,20 | scroll.mp4 at 5.1 s box 514,410,355,20
- **OpenCode on X**: "OpenCode on X: "We had a security breach last night..."" (17 Oct 2026). Status: loaded. logged-out view of the post; replies below it include one with a swear word, so crop to the post
  - URL: https://x.com/opencode/status/2111519637049319818
  - Files: `opencode/x-opencode_fold.png`, `opencode/x-opencode_full.jpg`, `opencode/x-opencode_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: @opencode on X, 17 Oct 2026**
  - Key line: "We had a security breach last night related to a large scale distillation attack that impacted 1.4% of OpenCode Console users" | full.jpg box 348,179,810,66 | scroll.mp4 at 0.53 s box 441,179,810,66
- **Hacker News (thread)**: "OpenCode has a security breach ... impacted 1.4% of console users (55 points)" (18 Oct 2026). Status: loaded
  - URL: https://news.ycombinator.com/item?id=50139083
  - Files: `opencode/hn-thread_fold.png`, `opencode/hn-thread_full.jpg`, `opencode/hn-thread_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Hacker News, 18 Oct 2026**
  - Key line: "OpenCode has a security breach" | full.jpg box 68,82,380,28 | scroll.mp4 at 0.53 s box 200,82,380,28

### emudhra

- **BleepingComputer**: "Mozilla, Google, Apple block compromised eMudhra CA certificates" (20 Oct 2026). Status: loaded
  - URL: https://www.bleepingcomputer.com/news/security/mozilla-google-apple-block-compromised-emudhra-ca-certificates/
  - Files: `emudhra/bleepingcomputer_fold.png`, `emudhra/bleepingcomputer_full.jpg`, `emudhra/bleepingcomputer_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: BleepingComputer, 20 Oct 2026**
  - Key line: "Mozilla, Google, Apple block compromised eMudhra CA certificates" | full.jpg box 135,456,832,27 | scroll.mp4 at 0.53 s box 375,144,832,27
  - Key line: "the private key for eMudhra's "EM OV TLS CA - G3C" certificate had a value of just 4" | full.jpg box 135,1415,823,46 | scroll.mp4 at 5.1 s box 375,410,823,46
  - Key line: "eMudhra blamed the issue on an error in a script used to generate the certificates in April 2025" | full.jpg box 135,1521,751,46 | scroll.mp4 at 5.1 s box 375,516,751,46
- **The Hacker News**: "Eight eMudhra CA Keys Compromised, Triggering Emergency Fixes Across Browsers and Software" (20 Oct 2026). Status: loaded
  - URL: https://thehackernews.com/2026/10/eight-emudhra-ca-keys-compromised.html
  - Files: `emudhra/thehackernews_fold.png`, `emudhra/thehackernews_full.jpg`, `emudhra/thehackernews_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: The Hacker News, 20 Oct 2026**
  - Key line: "Chrome and Firefox blocked the eight certificates within hours" | full.jpg box 176,1064,432,19 | scroll.mp4 at 5.03 s box 416,410,432,19
- **The Next Web**: "eMudhra certificates blocked: one private key was the number 4" (21 Oct 2026). Status: loaded
  - URL: https://thenextweb.com/news/emudhra-certificates-weak-keys-browsers-block
  - Files: `emudhra/thenextweb_fold.png`, `emudhra/thenextweb_full.jpg`, `emudhra/thenextweb_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: The Next Web, 21 Oct 2026**
  - Key line: "Eight eMudhra certificate keys were so weak that one was the number 4" | full.jpg box 145,186,1151,116 | scroll.mp4 at 0.53 s box 385,186,1151,116
  - Key line: "Chrome, Firefox, Apple and Microsoft have blocked the eMudhra certificates" | full.jpg box 114,331,856,29 | scroll.mp4 at 0.53 s box 354,331,856,29
- **Help Net Security**: "eMudhra security blunder left trusted CA signing keys exposed to anyone" (21 Oct 2026). Status: loaded
  - URL: https://www.helpnetsecurity.com/?p=388647
  - Files: `emudhra/helpnetsecurity_fold.png`, `emudhra/helpnetsecurity_full.jpg`, `emudhra/helpnetsecurity_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Help Net Security, 21 Oct 2026**
  - Key line: "eMudhra announced it will leave the global SSL/TLS certificate business" | full.jpg box 215,3699,574,48 | scroll.mp4 at 5.52 s box 455,410,574,48
- **Cybersecurity Dive**: "Don’t miss tomorrow’s Cybersecurity industry news" (21 Oct 2026). Status: loaded
  - URL: https://www.cybersecuritydive.com/news/website-encryption-security-certificates-emudhra-incident/833622/
  - Files: `emudhra/cybersecuritydive_fold.png`, `emudhra/cybersecuritydive_full.jpg`, `emudhra/cybersecuritydive_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Cybersecurity Dive, 21 Oct 2026**
  - Key line: "Weak encryption certificates could have let hackers easily spoof websites" | full.jpg box 135,179,746,109 | scroll.mp4 at 0.53 s box 375,179,746,109
- **oss-security (Openwall)**: "NSS 3.131.1 Release - Important Security Updates (Mozilla, via oss-security)" (20 Oct 2026). Status: loaded
  - URL: https://www.openwall.com/lists/oss-security/2026/10/20/30
  - Files: `emudhra/openwall_fold.png`, `emudhra/openwall_full.jpg`, `emudhra/openwall_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Mozilla NSS release notice (oss-security), 20 Oct 2026**
  - Key line: "This release removes trust in the following root certificates" | full.jpg box 36,710,716,23 | scroll.mp4 at 4.92 s box 36,411,716,23
- **Inc42**: "eMudhra’s Security Key Flaw: What Went Wrong And Why Google, Mozilla Stepped In" (21 Oct 2026). Status: loaded
  - URL: https://inc42.com/buzz/emudhras-security-key-flaw-what-went-wrong-and-why-google-mozilla-stepped-in/
  - Files: `emudhra/inc42_fold.png`, `emudhra/inc42_full.jpg`, `emudhra/inc42_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Inc42, 21 Oct 2026**
- **Incident site (Dennis Jackson, Mozilla)**: "eMudhra Intermediate CA Compromise" (20 Oct 2026). Status: loaded
  - URL: https://emudhra.we-have-a-problem.com/
  - Files: `emudhra/we-have-a-problem_fold.png`, `emudhra/we-have-a-problem_full.jpg`, `emudhra/we-have-a-problem_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: emudhra.we-have-a-problem.com (Mozilla's Dennis Jackson), 20 Oct 2026**
  - Key line: "The private keys of eight eMudhra intermediate CA certificates have been compromised" | full.jpg box 270,228,706,21 | scroll.mp4 at 0.53 s box 510,228,706,21
  - Key line: "We have a problem here - Wayne" | full.jpg box 292,592,266,21 | scroll.mp4 at 2.4 s box 532,410,266,21
  - Key line: "The certificates have been blocked in Firefox and Chrome since the 17th of October" | full.jpg box 270,854,886,48 | scroll.mp4 at 5.92 s box 510,410,886,48
- **eMudhra (press release)**: "eMudhra to Exit global SSL/TLS Certificate Business" (22 Oct 2026). Status: loaded
  - URL: https://emudhra.com/en/press-release/emudhra-to-exit-global-ssl-tls-certificate-business
  - Files: `emudhra/emudhra-press_fold.png`, `emudhra/emudhra-press_full.jpg`, `emudhra/emudhra-press_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: eMudhra, 22 Oct 2026**
  - Key line: "eMudhra to Exit global SSL/TLS Certificate Business" | full.jpg box 92,230,921,52 | scroll.mp4 at 0.53 s box 332,138,921,52
- **Scott Helme**: "Eight Bits of Trust; eMudhra's CA keys cracked in milliseconds" (20 Oct 2026). Status: loaded
  - URL: https://scotthelme.co.uk/eight-bits-of-trust-emudhras-ca-keys-cracked-in-milliseconds/
  - Files: `emudhra/scotthelme_fold.png`, `emudhra/scotthelme_full.jpg`, `emudhra/scotthelme_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Scott Helme, 20 Oct 2026**
  - Key line: "One of eMudhra's certificate authority private keys is the number 4." | full.jpg box 190,736,596,22 | scroll.mp4 at 4.02 s box 350,413,596,22
  - Key line: "Not a number that starts with 4, or the number 4 followed by a few hundred random digits, just, 4..." | full.jpg box 190,800,587,56 | scroll.mp4 at 4.02 s box 350,477,802,56
- **Google (Chrome Security)**: "Protecting Chrome and Android Users from Compromised eMudhra Intermediate CA Certificates" (20 Oct 2026). Status: loaded
  - URL: https://blog.google/security/protecting-chrome-and-android-users-from-compromised-emudhra-intermediate-ca-certificates/
  - Files: `emudhra/google-blog_fold.png`, `emudhra/google-blog_full.jpg`, `emudhra/google-blog_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Google Chrome Security blog, 20 Oct 2026**
  - Key line: "Protecting Chrome and Android Users from Compromised eMudhra Intermediate CA Certificates" | full.jpg box 292,178,771,291 | scroll.mp4 at 0.53 s box 532,138,771,291
  - Key line: "enabling anyone to forge trusted HTTPS certificates to impersonate any website" | full.jpg box 402,913,566,46 | scroll.mp4 at 5.02 s box 642,410,566,46
- **Hacker News (thread)**: "eMudhra intermediate CA compromise (1,281 points, 504 comments)" (20 Oct 2026). Status: loaded
  - URL: https://news.ycombinator.com/item?id=50166579
  - Files: `emudhra/hn-thread_fold.png`, `emudhra/hn-thread_full.jpg`, `emudhra/hn-thread_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Hacker News, 20 Oct 2026**
  - Key line: "eMudhra intermediate CA compromise" | full.jpg box 58,82,450,28 | scroll.mp4 at 0.53 s box 200,82,450,28

### nodejs

- **SecurityOnline**: "Node.js Fixes 10 Flaws, Including Brotli RCE and TLS Hostname Bypasses" (21 Oct 2026). Status: loaded
  - URL: https://securityonline.info/nodejs-security-release-october-2026/
  - Files: `nodejs/securityonline_fold.png`, `nodejs/securityonline_full.jpg`, `nodejs/securityonline_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: SecurityOnline, 21 Oct 2026**
  - Key line: "On October 21, 2026, the Node.js project shipped versions 22.23.4, 24.22.1 and 26.12.1 to fix 10 vulnerabilities" | full.jpg box 127,1312,745,53 | scroll.mp4 at 2.72 s box 367,410,745,53
  - Key line: "The Node.js team does not report exploitation in the wild" | full.jpg box 127,2607,482,24 | scroll.mp4 at 6.37 s box 367,410,482,24
- **Node.js (official blog)**: "Wednesday, October 21, 2026 Security Releases" (21 Oct 2026). Status: loaded
  - URL: https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
  - Files: `nodejs/nodejs-blog_fold.png`, `nodejs/nodejs-blog_full.jpg`, `nodejs/nodejs-blog_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: nodejs.org, 21 Oct 2026**
  - Key line: "Wednesday, October 21, 2026 Security Releases" | full.jpg box 337,281,667,41 | scroll.mp4 at 0.53 s box 513,137,667,41
  - Key line: "ca-cert (eMudhra Intermediate CA Compromise) on 26.x, 24.x, 22.x" | full.jpg box 361,972,495,22 | scroll.mp4 at 5.03 s box 537,410,495,22
- **Konfirmity**: "Node.js October 2026 Security Releases" (21 Oct 2026). Status: loaded
  - URL: https://www.konfirmity.com/advisories/nodejs-october-2026-security-releases
  - Files: `nodejs/konfirmity_fold.png`, `nodejs/konfirmity_full.jpg`, `nodejs/konfirmity_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Konfirmity, 21 Oct 2026**
- **FourWeekMBA**: not captured (blocked (HTTP 403)). https://fourweekmba.com/ai-node-js-fixes-10-flaws-4-high-on-the-same-day-as-php/

### ai-agents

- **Honolulu Star-Advertiser (Reuters)**: "How one hacker used AI agents to break into over 100 company websites" (19 Oct 2026). Status: loaded. Reuters story by Raphael Satter, syndicated; reuters.com itself blocks automated browsers
  - URL: https://www.staradvertiser.com/2026/10/19/breaking-news/how-one-hacker-used-ai-agents-to-break-into-over-100-company-websites/
  - Files: `ai-agents/staradvertiser-reuters_fold.png`, `ai-agents/staradvertiser-reuters_full.jpg`, `ai-agents/staradvertiser-reuters_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: Reuters (via Honolulu Star-Advertiser), 19 Oct 2026**
  - Key line: "How one hacker used AI agents to break into over 100 company websites" | full.jpg box 72,368,724,90 | scroll.mp4 at 0.53 s box 312,135,724,90
  - Key line: "broke into websites belonging to more than 100 companies, including farm equipment maker Deere & Co., home appliance company SharkNinja Inc. and engine manufacturer Cummins Inc." | full.jpg box 140,1252,702,75 | scroll.mp4 at 2.72 s box 380,410,702,75
  - Key line: "Yet the hacker did almost none of the work." | full.jpg box 140,1353,345,21 | scroll.mp4 at 2.72 s box 380,511,345,21
  - Key line: "about $50 per successful hack" | full.jpg box 417,2777,243,21 | scroll.mp4 at 6.42 s box 657,410,243,21
- **The Next Web**: "‘It’s not script kiddie stuff’: AI agents hack 100+ sites for one hacker" (19 Oct 2026). Status: loaded
  - URL: https://thenextweb.com/news/ai-agents-hacker-cairn-100-sites-deere-norforge
  - Files: `ai-agents/thenextweb_fold.png`, `ai-agents/thenextweb_full.jpg`, `ai-agents/thenextweb_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: The Next Web, 19 Oct 2026**
  - Key line: "AI agents broke into 100+ sites for one hacker at $50 each, researcher says" | full.jpg box 156,186,1128,116 | scroll.mp4 at 0.53 s box 396,186,1128,116
  - Key line: "Successful attacks took a little under 23 hours on average" | full.jpg box 304,2549,661,54 | scroll.mp4 at 5.38 s box 544,410,661,54
- **SBS News (Reuters)**: ""A Single Hacker Successfully Hacks 100 Companies Using AI Agents"" (20 Oct 2026). Status: loaded. AI-translated Korean article (the page says so)
  - URL: https://news.sbs.co.kr/english/article.do?news_id=N1008805974
  - Files: `ai-agents/sbs-reuters_fold.png`, `ai-agents/sbs-reuters_full.jpg`, `ai-agents/sbs-reuters_scroll.mp4` (8.0 s)
  - On-screen credit: **Source: SBS News citing Reuters, 20 Oct 2026**
  - Key line: "The instructions were given in Chinese text consisting of fewer than 100 characters" | full.jpg box 270,1566,577,54 | scroll.mp4 at 2.95 s box 510,410,577,54
  - Key line: "This breaks down to about 50 dollars spent per successful hack" | full.jpg box 270,1962,512,21 | scroll.mp4 at 6.25 s box 510,410,512,21
- **OECD.AI incident monitor**: not captured (AI-generated summary that claims data theft Reuters could not confirm). https://oecd.ai/en/incidents/2026-10-19-4666
- **Let's Data Science**: not captured (AI-written news aggregator, adds nothing over Reuters/TNW). https://letsdatascience.com/news/hacker-uses-autonomous-ai-agents-to-breach-100-company-websi-6f2900ba
- **Reuters**: not captured (blocked (HTTP 401, Reuters bot wall); use the Star-Advertiser / SBS syndicated copies of the same Reuters story). https://www.reuters.com/legal/government/how-one-hacker-used-ai-agents-few-thousand-dollars-break-into-scores-sites-2026-10-19/

