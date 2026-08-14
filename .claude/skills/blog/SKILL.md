---
name: blog
description: Generate a complete, publish-ready Lussaro Collection blog post — picks an unused keyword from keywords.csv, builds a cluster, researches the SERP, writes in Robert's voice, applies the locked page template, wires images from the existing photo library, and verifies all 53 on-page SEO checks before declaring done. Use when asked to write, generate, or publish a blog post.
---

# Blog post generator

Produces one blog post, start to finish, to the same standard every time.

**The page structure is already solved.** `template.astro` in this directory produces Accessibility 100, SEO 100 and LCP ~1.5s on mobile, measured on the production build. Do not redesign it, do not "improve" it, do not restructure the schema. Fill in the marked slots and write.

Everything below is a step. Do them in order. Do not skip step 8.

---

## 1. Pick the primary keyword

Read `/keywords.csv` and `/used-keywords.md`.

Choose the highest-priority row where **all** of these hold:

- `status` is `gap` or `needs-work` — never `do-not-target`
- the keyword does **not** appear in `used-keywords.md` as a retired primary, or as a close variant returning the same SERP
- **no existing page in `luxe-drive-flow/src/pages/` already targets it**

That last one is the trap. `lamborghini rental` looks like the obvious pick and is wrong, because `/lamborghini-rental-miami` already owns it — a blog post would split one query across two pages.

**The rule: if a service page owns the commercial term, the blog takes the informational angle.** Prefer `intent = informational` rows. When the user names a commercial keyword, use the informational sibling as primary and carry the commercial term as a secondary.

If the user names a keyword directly, honor it — but if it collides with an existing page, say so in one sentence and propose the informational alternative before writing.

## 2. Build the cluster

One primary plus **4–5 secondaries**. Pull secondaries from `keywords.csv` where they exist; invent close variants where they don't.

Secondaries must be things the post genuinely covers. Do not list a keyword you never address.

**Never include out-of-market geography.** Lussaro serves Miami, South Beach, Brickell, both airports and Fort Lauderdale. Las Vegas, Dallas and Los Angeles are permanently off-limits whatever their volume — see the table in `used-keywords.md`.

## 3. Research the SERP

Search the primary keyword. Fetch the **top 3 ranking pages** and record:

- **Format** — service page, listicle, guide, comparison. Match it.
- **Length** — average the three. Target within 20%. Never below 1,500 words, since the template's table of contents and back-to-top only make sense at that length.
- **Topics all three cover** — the post must cover every one.
- **Topics none of them cover** — pick 1–2 and add them. This is where the post wins.
- **People Also Ask questions** — these become the FAQ.

Note the intent honestly. If the SERP is entirely commercial homepages, say so — the post may rank poorly no matter how good it is, and the user should know before it's written, not after.

## 4. Read the voice files

Read all five before writing a word:

`references/voice.md` · `references/humour.md` · `references/stats.md` · `references/stories.md` · `references/opinions.md`

Non-negotiables from those files:

- **American English. "We" throughout**, with "I" reserved for genuinely personal lines.
- **Polished and aspirational**, with a dry edge underneath. Elegant promise, sharp finish.
- **Open with a joke** — one line, aimed at the industry or at Miami. Never self-deprecating in the opening line. Keep it under ~30 words so the bolded answer still lands inside the first 100.
- **Light dry touches throughout**, one or two bigger lines. Humor shows up when making a point, never as decoration.
- **One story maximum**, from `stories.md`. Never invent one. If you use the Urus story, follow its rules exactly — no identifying detail, alcohol stays vague, the 137 is a consequence not a spectacle.
- **One opinion**, backed by a number, from `opinions.md`.
- **Recommend the cheaper car** where it's genuinely the better call. This is documented behavior, not a pose.
- **No exclamation marks. No emoji. No profanity in site copy.**

## 5. Numbers

**Every figure renders from the data files. Never type a number as a literal.**

`src/data/fleet.js` · `src/data/rental-terms.js` · `src/data/business.js` · `src/data/reviews.js`

Only numbers in `references/stats.md` may appear in copy. If a sentence needs a figure that isn't there, change the sentence.

**Permanently banned claims:** any tenure ("years of experience" — the company was formed December 2025 and registration is public), any fleet-size or ranking superiority ("largest fleet", "#1 in Miami"), any invented customer, review or booking, and any published utilization or revenue figure.

## 6. Images

**Use the existing photo library.** 42 car photos in `public/cars/`, 9 in `public/gallery/`, all with optimized WebP variants.

**Never take images from image search.** Google Image results are overwhelmingly copyrighted and this is a commercial site. If licensed stock is ever needed, use a proper API with attribution — there is no such integration today, so the answer is the existing library.

For each post:

1. **Pick a photo that matches the subject.** A Lamborghini post uses a Lamborghini.
2. **Open the image and look at it** before writing alt text. `src/data/image-alt.js` forbids writing alt from filenames, and only names a Miami location when the photo actually shows one.
3. **Add the alt entry** to `image-alt.js`, keyed on the original path.
4. **Generate the hero variants.** The hero sits at 25% opacity behind a gradient, so it takes heavy compression — target ~60 KB at 1400w and ~30 KB at 800w:

```bash
node -e "
const sharp=require('sharp');
Promise.all([
  sharp('public/cars/SOURCE.jpg').resize(1400).webp({quality:38,effort:6}).toFile('public/blog/SLUG-hero-1400.webp'),
  sharp('public/cars/SOURCE.jpg').resize(800).webp({quality:42,effort:6}).toFile('public/blog/SLUG-hero-800.webp'),
]).then(r=>r.forEach(i=>console.log(i.width+'x'+i.height, Math.round(i.size/1024)+' KB')));
"
```

5. **Generate the OG image** — 1200×630, under 1 MB. Do not reuse `preview.png`; it is 1.11 MB and over the limit:

```bash
node -e "
const sharp=require('sharp');
sharp('public/cars/SOURCE.jpg').resize(1200,630,{fit:'cover',position:'attention'})
  .jpeg({quality:82,mozjpeg:true}).toFile('public/og/SLUG.jpg')
  .then(i=>console.log(i.width+'x'+i.height));
"
```

## 7. Write the post

Copy `.claude/skills/blog/template.astro` to `luxe-drive-flow/src/pages/blog/<slug>.astro` and fill every `>>> FILL`.

Slug rules: lowercase, hyphens, under 60 characters, contains the primary keyword, and matches `PATH` in the frontmatter.

**Structural elements that are load-bearing — do not remove any of them:**

| Element | Why |
|---|---|
| No `reveal` class on the article body | Starts the subtree at `opacity:0`; hides the whole post until scroll and makes the body a hidden LCP element |
| `fetchpriority="high"`, no `loading="lazy"` on hero | It is the LCP element |
| `text-black/60` minimum on light backgrounds | `/40` fails WCAG AA |
| Inline links underlined | Color-only links fail WCAG 1.4.1 |
| `<main id="main">` + skip link on the page | Other routes have no `#main`; a skip link landing nowhere is worse than none |
| No third-party iframes | A Maps embed costs Performance and Best Practices. Link out instead |
| `breadcrumbName` prop passed to Layout | `lib/breadcrumbs.js` emits nothing for `/blog/*` without it |

Also required in the body: 3–5 internal links with descriptive anchors, and **2–3 external links to authoritative sources, each verified to return 200 before use**:

```bash
curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" -L "URL"
```

## 8. Verify — do not skip

```bash
cd luxe-drive-flow && npm run build
cd .. && python3 .claude/skills/blog/verify.py <slug>
```

53 checks against the **built HTML**, not the source. The post is not done until every one passes. If a check fails, fix the post — never loosen the check.

For a real performance number, serve the production build and measure it. The dev server is not a valid target: it ships `@vite/client` and unminified modules, which makes Performance look ~30 points worse than reality.

## 9. Record it

**`/used-keywords.md`** — add the primary to the retired table and a detail block listing the secondaries and the reason for that primary. It can never be used again.

**`/keywords.csv`** — set `target_page` to the new post and `status` to `covered` for the primary and any secondaries the post genuinely covers.

The sitemap needs no action; `@astrojs/sitemap` picks the post up automatically, and `public/robots.txt` already points at it.

## 10. Report

Tell the user:

- Primary and secondaries used
- Format and length matched, against what SERP evidence
- Which voice elements landed — the joke, the opinion, the story if used
- Verifier result
- **Anything you could not satisfy honestly.** An unverified SERP length, a keyword collision left unresolved, a number that had to be omitted. Say it plainly rather than letting it pass as complete.

---

## Files this skill touches

| Path | Action |
|---|---|
| `luxe-drive-flow/src/pages/blog/<slug>.astro` | created |
| `luxe-drive-flow/public/blog/<slug>-hero-{800,1400}.webp` | created |
| `luxe-drive-flow/public/og/<slug>.jpg` | created |
| `luxe-drive-flow/src/data/image-alt.js` | alt entry added |
| `used-keywords.md` | primary retired |
| `keywords.csv` | status and target_page updated |

Never commit or push unless explicitly asked.
