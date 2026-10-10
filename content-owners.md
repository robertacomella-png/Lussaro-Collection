# Content Owners

Who owns each piece of content, and what an automated tool is allowed to do to it.

This file exists because more than one hand edits this site — the owner, an SEO
agency, and Claude. Without a register of who owns what, the third one quietly
overwrites the work of the first two and nobody notices until a ranking drops.

**Read this before editing any file listed below.** It is binding on Claude via
the rule in `CLAUDE.md`, and `npm run check:locks` fails if a locked path was
touched.

---

## The three levels

| Level | Meaning |
|---|---|
| `locked` | **Never edit without explicit approval for that specific file.** Propose a diff, say what you want to change and why, and wait. Applies even when a change looks obviously correct. |
| `review` | Edit freely, but say in your summary exactly what changed and why, so the owner can reverse it. |
| `open` | Edit as part of normal work. Generated or mechanical content. |

`locked` is not "ask once and then it's yours". Approval covers the one change
you described.

---

## Why git makes this work

Every edit here lands as a commit with an author and a timestamp. Nothing is
lost — a bad overwrite is one `git checkout` away, which is how `keywords.csv`
was restored on 6 October after a tool rewrote all 75 lines.

That is a real advantage over a hosted CMS, where an overwrite is simply gone.
When an agency asks how edits are tracked, this is the answer.

---

## Pages

| Path | Owner | Level | Why |
|---|---|---|---|
| /blog | Lussaro | review | The guides hub. Lists whatever `posts.js` holds, so the page itself rarely changes. |
| /blog/how-much-is-a-lamborghini-rental | Lussaro | locked | Hand-written SEO post, 2,278 words, built to the blog skill's 53 checks. Regenerating it would discard the work and reset its ranking history. |
| /blog/mercedes-s580-vs-maybach-s580-rental-miami | Lussaro | locked | Published 6 Oct 2026, 1,511 words, 53/53 on the verifier. First post in the comparison cluster. Edit sections, never regenerate. |
| /blog/well-kept-exotic-car-rental-miami | Lussaro | locked | Published 7 Oct 2026, 1,731 words, 53/53. Carries the brand in the H1 **and the `<title>`** for brand-SERP coverage, and the operational detail (ozone after detailing) came from the owner directly. Edit sections, never regenerate. **The title deliberately leads with the brand and carries no `| Lussaro Collection` suffix** — owner's call, 10 Oct 2026. Google strips a trailing brand from the SERP because the site name already prints above the link; a leading one survives. Do not "correct" it to the site-wide title convention. |
| /exotic-car-rental-miami | Lussaro | locked | Head-term landing page. Owns "exotic car rental miami". |
| /best-exotic-car-rental-miami | Lussaro | locked | SEO landing copy. |
| /lamborghini-rental-miami | Lussaro | locked | SEO landing copy. Owns the Lamborghini commercial cluster. |
| /rolls-royce-rental-miami | Lussaro | locked | SEO landing copy. |
| /g-wagon-rental-miami | Lussaro | locked | SEO landing copy. |
| /luxury-suv-rental-miami | Lussaro | locked | SEO landing copy. |
| /exotic-car-rental-brickell | Lussaro | locked | SEO landing copy, neighbourhood targeting. |
| /exotic-car-rental-south-beach | Lussaro | locked | SEO landing copy, neighbourhood targeting. |
| /chauffeur-service-miami | Lussaro | locked | SEO landing copy. Carries Service + FAQPage schema. |
| /about | Lussaro | review | Brand story. Also the author entity target for blog posts. |
| /reviews | Lussaro | locked | Renders real customer quotes. |
| /terms | Lussaro | locked | Commercial terms. A wrong edit here is a contractual problem, not a copy problem. |
| /privacy | Lussaro | locked | Legal. |
| /pricing | Lussaro | review | Rates derive from fleet.js; surrounding copy is editorial. |
| / | Lussaro | review | Homepage. Hero copy is brand-owned; the fleet grid is generated. |
| /fleet | Lussaro | review | Mostly the shared grid, plus editorial intro. |
| /contact | Lussaro | review | |
| /gallery | Lussaro | review | |
| /cars/[slug] | generated | open | Template over fleet.js and car-content.js. Safe to edit — the data behind it is what carries the rules. |
| /404 | generated | open | |

---

## Data files

| File | Owner | Level | Why |
|---|---|---|---|
| src/data/business.js | Lussaro | locked | NAP must match the Google Business Profile exactly. Drift here breaks local SEO and the JSON-LD at once. |
| src/data/rental-terms.js | Lussaro | locked | Deposit, mileage, cancellation, delivery fees. Commercial terms. |
| src/data/reviews.js | Lussaro | locked | Real customer quotes. Never edit the words, including to fix a banned word. |
| src/data/car-content.js | Lussaro | review | `realMoment`, `operatorNotes` and `deliveryNotes` are owner-only and must stay empty unless the owner fills them. |
| src/data/fleet.js | Lussaro | review | Prices, specs and photos. Owner-set, changed often, always say what moved. |
| src/data/meta-titles.js | SEO | review | Hand-written overrides. An agency will want these. |
| src/data/meta-descriptions.js | SEO | review | Same. |
| src/data/neighborhood-content.js | SEO | review | |
| src/data/posts.js | SEO | review | The blog registry. A post missing from here is invisible — never remove an entry for a post that is still published. |
| src/data/meta.json | SEO | review | Titles and meta descriptions, edited through the CMS. The two modules that read it are thin wrappers. |
| src/data/image-alt.js | shared | open | Accessibility text. |
| src/data/booking-steps.js | shared | open | |
| src/data/cars.js | generated | open | Derived from fleet.js. |
| keywords.csv | SEO | open | Working file. Edit through `npm run keywords`. |
| used-keywords.md | SEO | review | The retirement ledger. Append when a primary is used; never delete a row. |

---

## Rules

1. **A locked file needs approval for the specific change.** Describe the diff, wait, then apply it.
2. **A retired keyword is never reused.** See `used-keywords.md`.
3. **Never regenerate a published post.** If a locked post needs work, edit the section that needs it and leave the rest alone.
4. **Record new content here when it ships**, with an owner and a level, in the same commit.
5. **When in doubt, treat it as locked.** The cost of asking is a message. The cost of overwriting a ranking page is months.
