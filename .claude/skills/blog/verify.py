#!/usr/bin/env python3
"""Verify a built Lussaro blog post against the on-page SEO checklist.

Runs against the BUILT HTML, never the source, because half of what matters
(schema output, rendered figures, computed markup) only exists after the build.

    npm run build
    python3 .claude/skills/blog/verify.py <slug>

Exits non-zero if any check fails. A post is not done until this passes.
"""
import json
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))))
APP = os.path.join(REPO, 'luxe-drive-flow')

BANNED_CLAIMS = [
    r'largest fleet', r'#1 ', r'number one', r'best in (miami|florida)',
    r'years of experience', r'decades of', r'long[- ]established',
    r'trusted for years',
]

# Out-of-market geography. See /used-keywords.md.
OUT_OF_MARKET = ['las vegas', 'dallas', 'los angeles', 'new york', 'atlanta']


def main(slug):
    path = os.path.join(APP, 'dist', 'client', 'blog', slug, 'index.html')
    if not os.path.isfile(path):
        sys.exit(f'FATAL: {path} not found. Run `npm run build` first.')
    h = open(path, encoding='utf8').read()

    art_m = re.search(r'<article.*?</article>', h, re.S)
    if not art_m:
        sys.exit('FATAL: no <article> element found.')
    art = art_m.group(0)
    body = ' '.join(re.sub(r'<[^>]+>', ' ', art).split())
    words = len(body.split())

    title = re.search(r'<title>(.*?)</title>', h, re.S).group(1)
    desc = re.search(r'name="description" content="(.*?)"', h, re.S).group(1)

    schemas, types = [], []
    for blob in re.findall(r'application/ld\+json[^>]*>(.*?)</script>', h, re.S):
        try:
            d = json.loads(blob.strip())
        except json.JSONDecodeError:
            types.append('INVALID_JSON')
            continue
        for node in (d if isinstance(d, list) else [d]):
            schemas.append(node)
            types.append(str(node.get('@type')))
            for g in node.get('@graph', []):
                types.append(str(g.get('@type')))

    h2s = re.findall(r'<h2[^>]*id="([^"]+)"', art)
    imgs = re.findall(r'<img[^>]+>', h)
    hero = next((i for i in imgs if 'fetchpriority="high"' in i), '')
    ext = re.findall(r'href="(https?://(?!www\.lussarocollection)[^"]+)"[^>]*target="_blank"', art)
    ext = [e for e in ext if 'wa.me' not in e and 'maps' not in e]
    internal = set(re.findall(r'href="(/[a-z][^"#]*)"', art))
    blank_tags = re.findall(r'<a[^>]+target="_blank"[^>]*>', art)
    nfaq = sum(len(n.get('mainEntity', [])) for n in schemas if n.get('@type') == 'FAQPage')
    charset_at = h.encode().find(b'charset')
    first100 = ' '.join(body.split()[:100]).lower()

    checks = [
        # 1 Head & metadata
        ('title 50-60 chars', 50 <= len(title) <= 60, f'{len(title)}'),
        ('meta description 150-160', 150 <= len(desc) <= 160, f'{len(desc)}'),
        ('canonical present', 'rel="canonical"' in h, ''),
        ('og:image present', 'og:image' in h, ''),
        ('twitter summary_large_image', 'summary_large_image' in h, ''),
        ('html lang set', '<html lang=' in h, ''),
        ('viewport meta', 'name="viewport"' in h, ''),
        ('charset in first 1024 bytes', 0 <= charset_at < 1024, f'byte {charset_at}'),
        ('apple-touch-icon', 'apple-touch-icon' in h, ''),
        # 2 URL
        ('slug under 60 chars', len(slug) < 60, f'{len(slug)}'),
        ('slug lowercase, hyphens only', bool(re.fullmatch(r'[a-z0-9-]+', slug)), slug),
        # 3 Headings
        ('exactly one H1', len(re.findall(r'<h1[^>]*>', h)) == 1, ''),
        ('H2s carry ids for jump links', len(h2s) >= 3, f'{len(h2s)}'),
        # 4 Copy
        ('1500+ words', words >= 1500, f'{words}'),
        ('direct answer bolded near top', '<strong>' in art[:4000], ''),
        # 5 FAQ
        ('FAQPage schema', 'FAQPage' in types, ''),
        ('4-8 FAQ questions', 4 <= nfaq <= 8, f'{nfaq}'),
        # 6 Images
        ('hero has alt text', bool(hero) and re.search(r'alt="[^"]{15,}"', hero), ''),
        ('hero has width+height', 'width=' in hero and 'height=' in hero, ''),
        ('hero has srcset', 'srcset=' in hero, ''),
        ('hero is not lazy-loaded', 'loading="lazy"' not in hero, ''),
        ('below-fold image lazy', any('loading="lazy"' in i for i in imgs), ''),
        ('webp in use', '.webp' in h, ''),
        # 7 Internal links + breadcrumbs
        ('3-8 internal links', 3 <= len(internal) <= 8, f'{len(internal)}'),
        ('BreadcrumbList schema', 'BreadcrumbList' in types, ''),
        ('visible breadcrumb nav', 'aria-label="Breadcrumb"' in h, ''),
        # 8 External links
        ('2-3 authoritative external links', 2 <= len(ext) <= 3, f'{len(ext)}'),
        ('all _blank carry noopener', all('noopener' in b for b in blank_tags), ''),
        # 9 Schema
        ('Article schema', 'Article' in types, ''),
        ('Person schema', 'Person' in types, ''),
        ('Organization schema', 'Organization' in types, ''),
        ('no invalid JSON-LD', 'INVALID_JSON' not in types, ''),
        # 10 E-E-A-T
        ('author byline', 'Robert Comella' in h, ''),
        ('author bio', 'Founder,' in h, ''),
        ('published + updated dates', '<time datetime' in h and 'Updated' in h, ''),
        ('named testimonial', 'verified Google review' in h, ''),
        # 11 Accessibility
        ('<main> landmark', '<main' in h, ''),
        ('skip-to-content link', 'Skip to content' in h, ''),
        ('no failing text-black/40', 'text-black/40' not in h, ''),
        ('inline links underlined', 'prose-a:underline' in h, ''),
        # 12 Mobile
        ('48px touch targets', 'min-h-[48px]' in h, ''),
        # 14 Conversion
        ('CTA above the fold', 'blog_hero' in h, ''),
        ('click-to-call', 'href="tel:' in h, ''),
        ('address + hours', '900 Biscayne' in h and '09:00' in h, ''),
        # 15 Long-form
        ('table of contents', 'Table of contents' in h, ''),
        ('back-to-top', 'Back to top' in h, ''),
        # Performance guards learned the hard way
        ('no .reveal on article body', not re.search(r'class="[^"]*\breveal\b', art), ''),
        ('no third-party iframe', not re.search(r'<iframe(?![^>]*googletagmanager)', h), ''),
        # Brand / legal guards
        ('no tenure or superiority claims',
         not any(re.search(p, body, re.I) for p in BANNED_CLAIMS), ''),
        ('no out-of-market geography',
         not any(g in body.lower() for g in OUT_OF_MARKET), ''),
        ('no exclamation marks', not re.search(r'[a-z]!', body), ''),
        ('no undefined/NaN leaks', not re.search(r'undefined|NaN|\[object Object\]', h), ''),
        ('primary keyword in first 100 words',
         any(k in first100 for k in ['rental', 'rent']), ''),
    ]

    failed = [c for c in checks if not c[1]]
    for name, passed, detail in checks:
        print(f"  {'PASS' if passed else 'FAIL'}  {name}{f'  ({detail})' if detail else ''}")

    print(f"\n{len(checks) - len(failed)}/{len(checks)} passed · {words} words")
    if failed:
        print('\nFAILED:')
        for name, _, detail in failed:
            print(f'  - {name}{f"  ({detail})" if detail else ""}')
        sys.exit(1)
    print('All checks passed.')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('usage: verify.py <slug>')
    main(sys.argv[1])
