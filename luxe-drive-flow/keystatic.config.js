// Keystatic — the editing surface for people who do not run a terminal.
//
// JavaScript, not TypeScript: the integration resolves `keystatic.config.*`, so
// the repo's no-.ts rule holds.
//
// The schema is the point. Fields are typed and length-capped, so an editor
// cannot paste a 200-character title or invent a field — the brand and SEO
// rules in CLAUDE.md become validation instead of documentation. That is what
// makes this safe to hand to an agency.
//
// STORAGE IS LOCAL FOR NOW. Every save writes the repo file on this machine and
// shows up in `git diff`. To give an agency logins, switch to:
//
//   storage: { kind: 'github', repo: 'robertacomella-png/Lussaro-Collection' }
//
// which turns each save into a commit attributed to the person who made it —
// the ownership trail content-owners.md depends on.
//
// Only `meta` is exposed. fleet.js is deliberately absent: its prices drive
// schema Offer values, priceRange and nine copy locations, so it stays behind
// the owner's own tooling rather than a form. reviews.js, business.js and
// rental-terms.js are `locked` in content-owners.md for the same reason.

import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'Lussaro Collection' },
    navigation: { SEO: ['meta'] },
  },

  singletons: {
    meta: singleton({
      label: 'Titles & meta descriptions',
      path: 'src/data/meta',
      format: { data: 'json' },
      schema: {
        entries: fields.array(
          fields.object({
            path: fields.text({
              label: 'Page path',
              description:
                'No trailing slash, e.g. /cars/sf90. Must match a real route — an override for a page that does not exist is dead weight.',
              validation: { length: { min: 1 } },
            }),
            title: fields.text({
              label: 'Title',
              description:
                'Around 60 characters, ending with | Lussaro Collection (or | Lussaro where that runs long). Leave empty to keep the generated title.',
              // Capped, not required: Google truncates past ~60 and the longest
              // here is 53. A minimum would block the one car that correctly
              // has no override.
              validation: { length: { max: 60 } },
            }),
            description: fields.text({
              label: 'Meta description',
              multiline: true,
              description:
                'Target 150–160 characters. Eight of the nine here are currently 126–140, which leaves SERP space unused. Capped at 160, where Google clips.',
              validation: { length: { max: 160 } },
            }),
            note: fields.text({
              label: 'Why this override exists',
              multiline: true,
              description:
                'Carried over from the code comments. Reasoning for the next person — not published anywhere.',
            }),
          }),
          {
            label: 'Pages',
            itemLabel: (props) => props.fields.path.value || 'New page',
          },
        ),
      },
    }),
  },
});
