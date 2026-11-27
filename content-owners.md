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
| /blog/no-insurance-rentals-miami | Lussaro | locked | Published 22 Oct 2026, 1,689 words, 54/54. Publishes the daily insurance band, which no competitor on this SERP does. **"No insurance" here means the RENTER has none** — never that the car goes out uninsured, which Florida law forbids and the post says so with a link to the statute. Retargeted to this phrase on the owner's instruction before publication. Edit sections, never regenerate. |
| /exotic-car-rental-miami | Lussaro | locked | Head-term landing page. Owns "exotic car rental miami". |
| /best-exotic-car-rental-miami | Lussaro | locked | SEO landing copy. |
| /blog/lamborghini-huracan-sto-vs-evo-rental-miami | Lussaro | locked | Published 15 Nov 2026, 1,863 words, 54/54 on the verifier. Three-way Huracán comparison that recommends the STO on the owner's instruction while naming where the EVO or Spyder fits better. Prices, deposits and ages render from fleet.js and cars.js. Edit sections, never regenerate. |
| /blog/how-old-do-you-have-to-be-to-rent-an-exotic-car-in-miami | Lussaro | locked | Published 15 Nov 2026, 1,569 words, 54/54 on the verifier. Rental-age guide: 18+ on every car except the STO (21), both derived from rental-terms.js and cars.js. Cites Florida s. 322.38. Edit sections, never regenerate. |
| /blog/luxury-car-rental-miami-beach-art-basel | Lussaro | locked | Published 25 Nov 2026, 2,841 words. Art Basel week on Miami Beach: Urus, Maybach GLS 600, and Mercedes-Benz S580. Specs, age, and the cancellation window render from fleet.js and rental-terms.js. Edit sections, never regenerate. |
| /blog/how-much-to-rent-a-maybach-miami | Lussaro | locked | Published 26 Nov 2026, 1,718 words, 54/54 on the verifier. Pricing guide for how much to rent a Maybach: GLS 600 and S580 Maybach rates from fleet.js and cars.js, with the Mercedes-Benz S580 as the self-drive alternative. Edit sections, never regenerate. |
| /blog/rent-a-lamborghini-for-a-day-miami | Lussaro | locked | Published 27 Nov 2026, 1,641 words, 54/54 on the verifier. Route guide for renting a Lamborghini for a day: Huracán STO, four Miami drives, and the one-day total. Rates, miles, deposit and age render from fleet.js and rental-terms.js. Edit sections, never regenerate. |
| /lamborghini-rental-miami | Lussaro | locked | SEO landing copy. Owns the Lamborghini commercial cluster. |
| /rolls-royce-rental-miami | Lussaro | locked | SEO landing copy. |
| /g-wagon-rental-miami | Lussaro | locked | SEO landing copy. |
| /luxury-suv-rental-miami | Lussaro | locked | SEO landing copy. |
| /exotic-car-rental-brickell | Lussaro | locked | SEO landing copy, neighbourhood targeting. |
| /exotic-car-rental-south-beach | Lussaro | locked | SEO landing copy, neighbourhood targeting. |
| /exotic-car-rental-fort-lauderdale | Public Relations, 26 Nov 2026 | locked | New location page, 26 Nov 2026. Owns "exotic car rental fort lauderdale". Delivery copy stops at the published Fort Lauderdale fee. Snapshot is the blob under Approved locked edits. |
| /wedding-car-rental-miami | Public Relations, 26 Nov 2026 | locked | New occasion page, 26 Nov 2026. Owns "luxury car rental for wedding", geo-qualified to Miami. Does not take maybach rental miami, rolls royce cullinan rental miami, or limousine queries. Snapshot is the blob under Approved locked edits. |
| /porsche-911-turbo-s-rental-miami | Public Relations, 26 Nov 2026 | locked | New money page, 26 Nov 2026. Owns "porsche rental miami". The car page stays the spec and booking URL. Snapshot is the blob under Approved locked edits. |
| /maybach-rental-miami | Lussaro | review | Paid-traffic funnel for the Maybach ads, built 20 Oct 2026. Not on LandingLayout — hook, offer, proof, choice, ask, objections. Owns `maybach rental miami`; deliberately does NOT target "luxury suv rental miami", which /luxury-suv-rental-miami owns. `review` rather than `locked` while the ads are being tuned; lock it once the campaign is stable. |
| /lamborghini-urus-rental-miami | Lussaro | review | Paid-traffic funnel for the Urus ads, built 20 Oct 2026. Same shape as /maybach-rental-miami. Owns `lamborghini urus rental miami`; deliberately does NOT target "lamborghini rental miami" (/lamborghini-rental-miami) or "luxury suv rental miami" (/luxury-suv-rental-miami). `review` while the ads are being tuned. |
| /mercedes-s580-rental-miami | Lussaro | review | Paid-traffic funnel for the Mercedes-Benz S580, built 20 Oct 2026. **This is the Benz S580 at $399, not the Maybach S580 at $899** — the page exists partly to resolve that confusion. Owns `mercedes s class rental miami`. Carries NO aggregateRating: no review names this car, and rating markup without matching on-page quotes is a manual-action risk. |
| /chauffeur-service-miami | Lussaro | locked | SEO landing copy. Carries Service + FAQPage schema. |
| /about | Lussaro | review | Brand story. Also the author entity target for blog posts. |
| /reviews | Lussaro | locked | Renders real customer quotes. |
| /terms | Lussaro | locked | Commercial terms. A wrong edit here is a contractual problem, not a copy problem. |
| /privacy | Lussaro | locked | Legal. Robert approved one sentence on 25 Nov 2026: ad click identifiers and campaign parameters from the visit are stored with the enquiry to measure advertising. That snapshot is listed under Approved locked edits. The page stays locked; a further edit still needs its own approval. |
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
| src/data/google-rating.js | Lussaro | review | Google Business Profile rating and review count, read by hand from the listing (4.8 from 25). The visible count is the stored total with a plus ("25+"). Update when the listing changes; never derive it from reviews.js. |
| src/data/image-alt.js | shared | open | Accessibility text. |
| src/data/booking-steps.js | shared | open | |
| src/data/cars.js | generated | open | Derived from fleet.js and three-day-deals.json. |
| src/data/three-day-deals.json | Lussaro | review | Per-car 3+ day per-day price, typed in Keystatic (3-Day Deals). Empty = standard multi-day discount. Folded into each car's discount ladder in cars.js, so it reaches the car page, booking estimate and /pricing. Added 23 Nov 2026. |
| keywords.csv | SEO | open | Working file. Edit through `npm run keywords`. |
| used-keywords.md | SEO | review | The retirement ledger. Append when a primary is used; never delete a row. |

---

## Rules

1. **A locked file needs approval for the specific change.** Describe the diff, wait, then apply it.
2. **A retired keyword is never reused.** See `used-keywords.md`.
3. **Never regenerate a published post.** If a locked post needs work, edit the section that needs it and leave the rest alone.
4. **Record new content here when it ships**, with an owner and a level, in the same commit.
5. **When in doubt, treat it as locked.** The cost of asking is a message. The cost of overwriting a ranking page is months.

---

## Approved locked edits

A `locked` file stays locked after an approval. Approval covers one snapshot of the file, not every future edit. `npm run check:locks` reads this table and lets a locked path through only when the file's current git blob is listed here. Any other contents still fail the check.

| Path | Blob | Approved | What |
|---|---|---|---|
| luxe-drive-flow/src/pages/privacy.astro | 238227bbcd0eb0d790ce1f2f63e5da0f8ba43b30 | Robert, 25 Nov 2026 | One list item in section 1: ad click identifiers and campaign parameters from the visit are stored with the enquiry to measure advertising. |
| luxe-drive-flow/src/pages/blog/luxury-car-rental-miami-beach-art-basel.astro | c96a9b96302b8cb7231186d73d589f9e4bcfc505 | Reviewer, 25 Nov 2026 | First publication. Title tag uses the short Lussaro suffix. CTA subtitle asks for the car, the dates, and the hotel. |
| luxe-drive-flow/src/pages/blog/luxury-car-rental-miami-beach-art-basel.astro | 7c479fb1797d420aaaa78616449bf15ef5d2afbb | Public Relations, 25 Nov 2026 | Blog CTA change. Hero WhatsApp button replaced with the booking form (no car pre-selected, See all cars). Eight existing car photos added between sections. No copy edits. |
| luxe-drive-flow/src/pages/blog/mercedes-s580-vs-maybach-s580-rental-miami.astro | a7dfa003ab908a7d7626d41dfa9931d2caa59fb8 | Public Relations, 25 Nov 2026 | Blog CTA change. Same hero form, no car pre-selected, See all cars. Copy unchanged. |
| luxe-drive-flow/src/pages/blog/no-insurance-rentals-miami.astro | 6e199c69f8d0f4f4c9b68075e324d0cde5dc2f33 | Public Relations, 25 Nov 2026 | Blog CTA change. Same hero form, no car pre-selected, See all cars. Copy unchanged. |
| luxe-drive-flow/src/pages/blog/well-kept-exotic-car-rental-miami.astro | 85cda92d73a51ea114822c8b3058263eef55aa91 | Public Relations, 25 Nov 2026 | Blog CTA change. Same hero form, no car pre-selected, See all cars. Copy unchanged. |
| luxe-drive-flow/src/pages/blog/how-much-is-a-lamborghini-rental.astro | b963610c05289294c0f5043cc619cf06fe4ddbc8 | Public Relations, 25 Nov 2026 | Blog CTA change. Same hero form, no car pre-selected, See all cars. Copy unchanged. |
| luxe-drive-flow/src/pages/blog/how-much-to-rent-a-maybach-miami.astro | 513cd44c4f764332f756488006600ec1da7aa23e | Public Relations, 26 Nov 2026 | First publication. |
| luxe-drive-flow/src/pages/exotic-car-rental-fort-lauderdale.astro | 7ce2a6aed6fda06efb4c8ee36d46ca81b0688535 | Public Relations, 26 Nov 2026 | PR review: MIA is the Miami delivery rate, and "boot" is "trunk". |
| luxe-drive-flow/src/pages/wedding-car-rental-miami.astro | 85b459072dc6f4935a21f3d1ed8b7b91b0da7cd0 | Public Relations, 26 Nov 2026 | PR review: title is exactly "Luxury Car Rental for a Wedding in Miami | Lussaro" (50 characters), and "boot" is "trunk". |
| luxe-drive-flow/src/pages/porsche-911-turbo-s-rental-miami.astro | 479b53a8a6d2e0a3af26d3d6d817561854cc18f7 | Public Relations, 26 Nov 2026 | First publication. Porsche money page. Copy awaits Public Relations review. |
| luxe-drive-flow/src/pages/lamborghini-rental-miami.astro | 7a2e01953afb1e85e6df6325e39d01421268c864 | Public Relations, 27 Nov 2026 | STO push plus the review pass, and the STO line now says track-bred and homologated for the street. |
| luxe-drive-flow/src/pages/exotic-car-rental-south-beach.astro | d9a4f1bffc019853a558e5f3a0e01496a1a271a0 | Public Relations, 26 Nov 2026 | STO section, fleet counts removed, STO age and deposit exceptions, with Huracán accented in that daily-rate sentence only. |
| luxe-drive-flow/src/pages/exotic-car-rental-brickell.astro | 696496ec7790db151ae8fc6cca53e0a4d8e7f334 | Public Relations, 26 Nov 2026 | STO section, plus the review pass: the low-car list is the low-nosed cars in fleet.js, including the EVO Spyder and the 911 Turbo S. |
| luxe-drive-flow/src/pages/blog/rent-a-lamborghini-for-a-day-miami.astro | 30a06678b7c47bfa9b297f35bca487a56786cf93 | Public Relations, 27 Nov 2026 | First publication. |
| luxe-drive-flow/src/pages/blog/lamborghini-huracan-sto-vs-evo-rental-miami.astro | a9609922e0b196c43fa52c48554878cd851be5d1 | Public Relations, 27 Nov 2026 | Street-only wording: every rental is street-only, and the comfort line says track-bred rather than set up for a track. The race-track heritage sentence is unchanged. |
| luxe-drive-flow/src/pages/blog/how-old-do-you-have-to-be-to-rent-an-exotic-car-in-miami.astro | a98a960717a367ba0b16c9b26fc28c111920c31e | Public Relations, 27 Nov 2026 | Street-only wording: the STO exception says track-bred, street-only, and carries its own terms. |
| luxe-drive-flow/src/data/business.js | fd79fe0670d2f1b00274e143fa9ada41fad498ce | Robert, 27 Nov 2026 | Hours only: Monday–Sunday close moves from 22:00 to 20:00. Visible line is 9 AM–8 PM daily, by appointment only. |
| luxe-drive-flow/src/pages/blog/luxury-car-rental-miami-beach-art-basel.astro | 685aace29752309fd18b597a158543275ce23858 | Robert, 27 Nov 2026 | Hours sentence only. It now reads the shared hours line (9 AM–8 PM daily, by appointment only) instead of a local 10:00 p.m. clock. |
| luxe-drive-flow/src/pages/blog/luxury-car-rental-miami-beach-art-basel.astro | 5a44fe637bda5eb36b9509390474df343ddef6dc | Public Relations, 27 Nov 2026 | Booking FAQ no longer says same-day bookings are often possible. The answer confirms availability and still depends on the car and the date. |
| luxe-drive-flow/src/pages/blog/how-much-is-a-lamborghini-rental.astro | 68574d935505c2994c36e19969b03400b4c34298 | Public Relations, 27 Nov 2026 | Hero star row and "5.0 on Google" replaced with a plain link to the Google reviews. |
| luxe-drive-flow/src/pages/exotic-car-rental-miami.astro | 9562a07df34f5f2f5a860b7f629a21e81f470f6b | Public Relations, 27 Nov 2026 | FAQ and opening paragraph no longer promise a reply in minutes, confirmation within the hour, or same-day booking. |
| luxe-drive-flow/src/pages/best-exotic-car-rental-miami.astro | 4e38d5eedf9ed48cb587bba09373bf90baf1b35b | Public Relations, 27 Nov 2026 | Same-day FAQ and the "same-day bookings are routine" sentence now only confirm availability. The computed "5.0 out of 5" line above the quotes is gone. |
| luxe-drive-flow/src/pages/chauffeur-service-miami.astro | 5e4080457d8327f6d16911a6505e53bc8eb4aa5a | Public Relations, 27 Nov 2026 | Same-day evening line, the 5.0 on Google row, and the 5.0 star stat removed. Evening bookings are asked by date. |
| luxe-drive-flow/src/pages/g-wagon-rental-miami.astro | e75b898534cc368c1cdc3abcb03054aca4077b6d | Public Relations, 27 Nov 2026 | The same-day sentence now says we will confirm availability. The cars are still not sourced in. |
| luxe-drive-flow/src/pages/reviews.astro | c192dda2fc8f372deec1aa1607983f8580c8b1c6 | Public Relations, 27 Nov 2026 | Header is "What renters say". The 5.0 row, the review count, and the stars beside each quote are gone. Quotes, names, and dates are unchanged. |
| luxe-drive-flow/src/pages/about.astro | 60520f6e358be209d0a6c32849df9a4696edfaf1 | Public Relations, 27 Nov 2026 | "driver's licence" is now "driver's license". |
| luxe-drive-flow/src/pages/exotic-car-rental-miami.astro | 51f468900392e3e96f4d1cca46afdd95a9aeef35 | Public Relations, 27 Nov 2026 | "driver's licence" is now "driver's license". |
| luxe-drive-flow/src/pages/best-exotic-car-rental-miami.astro | 6c9a72f695ea47ba0fc174e42dbebc70a3945f80 | Public Relations, 27 Nov 2026 | "driver's licence" is now "driver's license". |
| luxe-drive-flow/src/pages/luxury-suv-rental-miami.astro | c69d4ffb54f41b8e168116cbf0d8cd9f73530952 | Public Relations, 27 Nov 2026 | "616 litres" and "6.75-litre" are now American spelling. |
| luxe-drive-flow/src/pages/rolls-royce-rental-miami.astro | f6cc13ff17622e8ec99f4ef7ac031283dc2e14c5 | Public Relations, 27 Nov 2026 | "licence" and both "6.75-litre" mentions are now American spelling. |
| luxe-drive-flow/src/pages/blog/well-kept-exotic-car-rental-miami.astro | 520b8e5aeccafaec0f7fe2ebed88d2d20c872a02 | Public Relations, 27 Nov 2026 | "licence" is now "license", and the stars beside the quoted review are gone. |
| luxe-drive-flow/src/pages/blog/lamborghini-huracan-sto-vs-evo-rental-miami.astro | d4eba3b4e7b64f78ef2c7a474c8fcc79bdfd082d | Public Relations, 27 Nov 2026 | "5.2-litre" is now "5.2-liter", and the stars beside the quoted review are gone. |
| luxe-drive-flow/src/pages/blog/luxury-car-rental-miami-beach-art-basel.astro | ccaa9a6bec0e133885060ffe0806607833737d3a | Public Relations, 27 Nov 2026 | Stars beside the quoted review are gone, and the off-topic Continue reading link is removed so the article has 8 internal links. |
| luxe-drive-flow/src/pages/blog/how-much-is-a-lamborghini-rental.astro | 3a795a1e241424acc3ea1fe827f157759a7ff0b9 | Public Relations, 27 Nov 2026 | Stars beside the quoted review are gone. |
| luxe-drive-flow/src/pages/blog/how-old-do-you-have-to-be-to-rent-an-exotic-car-in-miami.astro | 1e41c5230c01acc5332b8a739d8219235decd99b | Public Relations, 27 Nov 2026 | Stars beside the quoted review are gone. |
| luxe-drive-flow/src/pages/blog/mercedes-s580-vs-maybach-s580-rental-miami.astro | 528eb23cfd5dea6a63b913f80ba70d6d05532c00 | Public Relations, 27 Nov 2026 | Stars beside the quoted review are gone. |
| luxe-drive-flow/src/pages/blog/no-insurance-rentals-miami.astro | e53e0e844ffc18e472c26613b28ed2104569d68e | Public Relations, 27 Nov 2026 | Stars beside the quoted review are gone. |
| luxe-drive-flow/src/pages/blog/how-much-is-a-lamborghini-rental.astro | e52c95553a69d47a44be0e2f842bbef7e42db8fd | Public Relations, 27 Nov 2026 | Closing band no longer says replies usually take minutes. It asks for details and confirms availability. |
| luxe-drive-flow/src/pages/blog/how-old-do-you-have-to-be-to-rent-an-exotic-car-in-miami.astro | cfe1f8d5afc48750d7a6dc582aaca974d6f2a72a | Public Relations, 27 Nov 2026 | Closing band no longer says replies usually take minutes. It asks for details and confirms availability. |
| luxe-drive-flow/src/pages/blog/lamborghini-huracan-sto-vs-evo-rental-miami.astro | 44be2855a5d376c994b6dc2cfb64e4f5085705fa | Public Relations, 27 Nov 2026 | Closing band no longer says replies usually take minutes. It asks for details and confirms availability. |
| luxe-drive-flow/src/pages/blog/mercedes-s580-vs-maybach-s580-rental-miami.astro | de0ee4ea9a35e05630cfd5fbe4acb298a8eedf2d | Public Relations, 27 Nov 2026 | Closing band no longer says replies usually take minutes. It asks for details and confirms availability. |
| luxe-drive-flow/src/pages/blog/no-insurance-rentals-miami.astro | 97f5d34427624096fb04ca312feb839a23234c3e | Public Relations, 27 Nov 2026 | Closing band no longer says replies usually take minutes. It asks for details and confirms availability. |
| luxe-drive-flow/src/pages/blog/well-kept-exotic-car-rental-miami.astro | 44f7733648d04915efa184e0db959ea318c1e161 | Public Relations, 27 Nov 2026 | Closing band no longer says replies usually take minutes. It asks for details and confirms availability. |
| luxe-drive-flow/src/pages/chauffeur-service-miami.astro | 14d3d23e3c5f4dfa0e2d9358c371a8d3e54b2960 | Public Relations, 27 Nov 2026 | "Booked in minutes" and "confirm your Maybach and chauffeur in minutes" now say we'll confirm availability. |
| luxe-drive-flow/src/pages/index.astro | feaa108b6023d10006f54c4e4a4d3307c1f575a5 | Public Relations, 27 Nov 2026 | The reserve line no longer says we'll confirm your exotic in minutes. |
