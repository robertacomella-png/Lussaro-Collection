// Keyword admin — a local editor for keywords.csv and a read-only view of the
// retirement ledger in used-keywords.md.
//
// Run it with `npm run keywords`. It serves on localhost only and writes the
// real files at the repo root, so whatever you save here is what the blog skill
// reads on its next run and what `git diff` shows.
//
// There is deliberately no second copy of this data anywhere. The skill loads
// keywords.csv from disk, so a hosted panel would have meant syncing two stores
// by hand — the exact drift the rest of this repo is built to avoid.
//
// No dependencies: node:http and node:fs only.

import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = join(HERE, '..');            // luxe-drive-flow/
const REPO_ROOT = join(APP_ROOT, '..');       // the repo root, where the CSV lives
const CSV = join(REPO_ROOT, 'keywords.csv');
const LEDGER = join(REPO_ROOT, 'used-keywords.md');
const PAGES = join(APP_ROOT, 'src', 'pages');
const PORT = Number(process.env.PORT) || 4330;

// The skill only accepts these. Free text here is how a row ends up silently
// skipped at selection time, so the form offers nothing else.
const STATUSES = ['gap', 'needs-work', 'covered', 'cannibalization-risk', 'do-not-target'];
const INTENTS = ['commercial', 'informational', 'navigational'];
const PRIORITIES = ['high', 'medium', 'low'];

/* ---------------------------------------------------------------- CSV ---- */

// Quote-aware, because `notes` routinely contains commas and the occasional
// quoted phrase. A naive split corrupts every row that has one.
function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; }
        else quoted = false;
      } else cell += c;
      continue;
    }
    if (c === '"') { quoted = true; continue; }
    if (c === ',') { row.push(cell); cell = ''; continue; }
    if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; continue; }
    if (c === '\r') continue;
    cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((v) => v !== ''));
}

const esc = (v) => {
  const s = String(v ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// Preserve the file's own line ending. keywords.csv is CRLF — writing LF
// rewrote all 75 lines on the first save, turning a one-row edit into a diff
// nobody could review. The round trip has to be byte-identical when nothing
// changed, or the git history stops being useful for this file.
const toCSV = (header, objs, eol) =>
  [header.join(','), ...objs.map((o) => header.map((h) => esc(o[h])).join(','))].join(eol) + eol;

function loadKeywords() {
  const raw = readFileSync(CSV, 'utf8');
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const rows = parseCSV(raw);
  const header = rows.shift();
  return {
    header,
    eol,
    rows: rows.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? '']))),
  };
}

/* ------------------------------------------------------------- ledger ---- */

// Both tables in used-keywords.md are read: retired primaries can never be used
// again, and the off-limits list is never eligible at all. The panel surfaces
// them as hard blocks rather than letting a dead keyword into the CSV.
function loadLedger() {
  if (!existsSync(LEDGER)) return { retired: [], offLimits: [] };
  const lines = readFileSync(LEDGER, 'utf8').split('\n');
  const retired = [];
  const offLimits = [];
  let section = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      const h = line.toLowerCase();
      section = h.includes('retired') ? 'retired' : h.includes('off-limits') ? 'off' : null;
      continue;
    }
    if (!section || !line.trim().startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (!cells.length) continue;
    const first = cells[0];
    if (!first || /^-+$/.test(first) || first.toLowerCase() === 'primary keyword' || first.toLowerCase() === 'keyword') continue;
    // The ledger links the post as markdown; show the path, not the syntax.
    const unlink = (s) => s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    if (section === 'retired') retired.push({ keyword: first, usedOn: unlink(cells[1] || ''), date: cells[2] || '' });
    else offLimits.push({ keyword: first, reason: cells[1] || '' });
  }
  return { retired, offLimits };
}

/* -------------------------------------------------------------- pages ---- */

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Every route the site already serves, so the panel can tell you a term is
// spoken for before it goes in the file rather than after a post is written.
function loadPages() {
  const out = [];
  const walk = (dir, prefix = '') => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('[') || entry.name === 'api') continue;
      if (entry.isDirectory()) walk(join(dir, entry.name), `${prefix}/${entry.name}`);
      else if (entry.name.endsWith('.astro')) {
        const base = entry.name.replace(/\.astro$/, '');
        out.push(base === 'index' ? (prefix || '/') : `${prefix}/${base}`);
      }
    }
  };
  walk(PAGES);
  return out.sort();
}

/* ----------------------------------------------------------- analysis ---- */

const norm = (s) => String(s || '').toLowerCase().trim().replace(/\s+/g, ' ');

function analyse(keyword, { rows, retired, offLimits, pages }, ignoreKeyword = null) {
  const k = norm(keyword);
  const problems = [];
  const notes = [];
  if (!k) return { problems: ['Keyword is required.'], notes };

  if (rows.some((r) => norm(r.keyword) === k && norm(r.keyword) !== norm(ignoreKeyword)))
    problems.push('Already in keywords.csv — edit that row instead of adding a second.');

  const dead = offLimits.find((o) => norm(o.keyword) === k);
  if (dead) problems.push(`Permanently off-limits: ${dead.reason}`);

  const used = retired.find((r) => norm(r.keyword) === k);
  if (used) problems.push(`Retired primary — already used on ${used.usedOn}. It never gets a second post.`);

  const slug = `/${slugify(keyword)}`;
  if (pages.includes(slug))
    notes.push(`${slug} already exists and targets this. The blog must take the informational angle, or this stays a service-page keyword.`);

  const owner = rows.find((r) => norm(r.target_page) === norm(slug) && norm(r.keyword) !== k);
  if (owner) notes.push(`${slug} is already the target_page for "${owner.keyword}".`);

  return { problems, notes };
}

/* ------------------------------------------------------------- server ---- */

const json = (res, code, body) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    let b = '';
    req.on('data', (c) => { b += c; if (b.length > 1e6) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(b || '{}')); } catch (e) { reject(e); } });
  });
}

function snapshot() {
  const { header, rows, eol } = loadKeywords();
  const { retired, offLimits } = loadLedger();
  return { header, rows, eol, retired, offLimits, pages: loadPages() };
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');

    if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(readFileSync(join(HERE, 'keyword-admin.html'), 'utf8'));
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/data') {
      const s = snapshot();
      json(res, 200, { ...s, statuses: STATUSES, intents: INTENTS, priorities: PRIORITIES, csvPath: CSV });
      return;
    }

    // Live validation as you type, so a collision shows before you commit to it.
    if (req.method === 'POST' && url.pathname === '/api/check') {
      const { keyword, ignore } = await readBody(req);
      json(res, 200, analyse(keyword, snapshot(), ignore));
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/save') {
      const { row, original } = await readBody(req);
      const s = snapshot();                       // re-read: never write a stale file
      const { problems } = analyse(row.keyword, s, original);
      if (problems.length) return json(res, 400, { ok: false, problems });
      if (!STATUSES.includes(row.status)) return json(res, 400, { ok: false, problems: ['Unknown status.'] });
      if (row.intent && !INTENTS.includes(row.intent)) return json(res, 400, { ok: false, problems: ['Unknown intent.'] });
      if (row.priority && !PRIORITIES.includes(row.priority)) return json(res, 400, { ok: false, problems: ['Unknown priority.'] });

      const next = s.rows.slice();
      const at = original ? next.findIndex((r) => norm(r.keyword) === norm(original)) : -1;
      const clean = Object.fromEntries(s.header.map((h) => [h, row[h] ?? '']));
      if (at > -1) next[at] = clean; else next.push(clean);

      writeFileSync(CSV, toCSV(s.header, next, s.eol));
      json(res, 200, { ok: true, rows: next.length });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/delete') {
      const { keyword } = await readBody(req);
      const s = snapshot();
      const next = s.rows.filter((r) => norm(r.keyword) !== norm(keyword));
      if (next.length === s.rows.length) return json(res, 404, { ok: false, problems: ['No such keyword.'] });
      writeFileSync(CSV, toCSV(s.header, next, s.eol));
      json(res, 200, { ok: true, rows: next.length });
      return;
    }

    res.writeHead(404).end('Not found');
  } catch (err) {
    json(res, 500, { ok: false, problems: [err.message] });
  }
});

// Bound to loopback on purpose: this writes to the repo, so it should not be
// reachable from the network the way `astro dev` deliberately is.
server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  Keyword admin  →  http://localhost:${PORT}`);
  console.log(`  Editing        →  ${CSV}`);
  console.log(`  Ledger         →  ${LEDGER} (read-only)\n`);
});
