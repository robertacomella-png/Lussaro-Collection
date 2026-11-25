// Lock check — fails when a file marked `locked` in content-owners.md has been
// modified without approval.
//
//   npm run check:locks              uncommitted work (staged + unstaged)
//   npm run check:locks -- main      everything since a ref
//
// The register is the source of truth; this script only reads it. It is the
// backstop, not the guardrail: the guardrail is the rule in CLAUDE.md, which
// binds Claude before an edit happens. This catches what slipped through.
//
// An approved edit stays locked. The "Approved locked edits" table names the
// git blob Robert accepted. A locked path whose current bytes hash to one of
// those blobs is that approved snapshot and passes. Any other bytes fail.
//
// Exit 1 on a locked change, so it can gate a commit hook or CI.

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = join(HERE, '..');
const REPO_ROOT = join(APP_ROOT, '..');
const REGISTER = join(REPO_ROOT, 'content-owners.md');

const git = (...args) =>
  execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8' }).trim();

/** Rows from both tables: [path-or-file, owner, level, why]. */
function loadRegister() {
  if (!existsSync(REGISTER)) {
    console.error(`  No content-owners.md at ${REGISTER}`);
    process.exit(2);
  }
  const entries = [];
  for (const line of readFileSync(REGISTER, 'utf8').split('\n')) {
    if (!line.trim().startsWith('|')) continue;
    const c = line.split('|').slice(1, -1).map((s) => s.trim());
    if (c.length < 3) continue;
    const [target, owner, level] = c;
    if (!target || /^-+$/.test(target)) continue;
    if (!['locked', 'review', 'open'].includes(level)) continue; // skips the legend table
    entries.push({ target, owner, level, why: c[3] || '' });
  }
  return entries;
}

/** Blobs Robert accepted for a still-locked path. See "Approved locked edits". */
function loadApprovals() {
  const text = readFileSync(REGISTER, 'utf8');
  const approvals = [];
  let inSection = false;
  for (const line of text.split('\n')) {
    if (line.startsWith('## ')) {
      inSection = line.trim() === '## Approved locked edits';
      continue;
    }
    if (!inSection || !line.trim().startsWith('|')) continue;
    const c = line.split('|').slice(1, -1).map((s) => s.trim());
    if (c.length < 2) continue;
    const [path, blob] = c;
    if (!/^[0-9a-f]{40}$/i.test(blob)) continue;
    approvals.push({ path, blob: blob.toLowerCase() });
  }
  return approvals;
}

function currentBlob(file) {
  return git('hash-object', '--', file).toLowerCase();
}

/**
 * A register row names a route or a repo-relative file. Map both onto the
 * actual file a change would land in, so a diff path can be matched against it.
 */
function filesFor(target) {
  if (target.startsWith('src/') || target.endsWith('.csv') || target.endsWith('.md')) {
    // Data files are written relative to the app; csv/md sit at the repo root.
    return [target.startsWith('src/') ? `luxe-drive-flow/${target}` : target];
  }
  if (!target.startsWith('/')) return [];
  if (target.includes('[')) return []; // dynamic route: the data behind it carries the rules
  const base = target === '/' ? 'index' : target.replace(/^\//, '');
  return [
    `luxe-drive-flow/src/pages/${base}.astro`,
    `luxe-drive-flow/src/pages/${base}/index.astro`,
  ];
}

const base = process.argv[2];
const changed = (base ? git('diff', '--name-only', `${base}...HEAD`) : git('diff', '--name-only', 'HEAD'))
  .split('\n')
  .filter(Boolean);

if (!changed.length) {
  console.log('  No changes to check.');
  process.exit(0);
}

const register = loadRegister();
const approvals = loadApprovals();
const locked = register.filter((e) => e.level === 'locked');
const review = register.filter((e) => e.level === 'review');

const hits = [];
const notes = [];
const allowed = [];
for (const file of changed) {
  for (const e of locked) {
    if (!filesFor(e.target).includes(file)) continue;
    const blob = currentBlob(file);
    const match = approvals.find((a) => a.path === file && a.blob === blob);
    if (match) allowed.push({ file, blob });
    else hits.push({ file, ...e });
  }
  for (const e of review) if (filesFor(e.target).includes(file)) notes.push({ file, ...e });
}

if (allowed.length) {
  console.log('\n  Approved locked edits — current bytes match the register:');
  for (const a of allowed) console.log(`    ${a.file}  ${a.blob}`);
}

if (notes.length) {
  console.log('\n  Review-level changes — say what moved and why in your summary:');
  for (const n of notes) console.log(`    ${n.file}  (${n.owner})`);
}

if (!hits.length) {
  const summary = allowed.length
    ? `No unapproved locked content. ${changed.length} file(s) changed.`
    : `No locked content touched. ${changed.length} file(s) changed.`;
  console.log(`\n  ${summary}\n`);
  process.exit(0);
}

console.error('\n  LOCKED CONTENT MODIFIED — this needs explicit approval for this specific change.\n');
for (const h of hits) {
  console.error(`    ${h.file}`);
  console.error(`      owner: ${h.owner}`);
  if (h.why) console.error(`      why locked: ${h.why}`);
  console.error('');
}
console.error('  Describe the diff and wait for approval, or revert with:');
console.error(`    git checkout -- ${hits.map((h) => h.file).join(' ')}\n`);
process.exit(1);
