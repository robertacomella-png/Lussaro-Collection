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
const locked = register.filter((e) => e.level === 'locked');
const review = register.filter((e) => e.level === 'review');

const hits = [];
const notes = [];
for (const file of changed) {
  for (const e of locked) if (filesFor(e.target).includes(file)) hits.push({ file, ...e });
  for (const e of review) if (filesFor(e.target).includes(file)) notes.push({ file, ...e });
}

if (notes.length) {
  console.log('\n  Review-level changes — say what moved and why in your summary:');
  for (const n of notes) console.log(`    ${n.file}  (${n.owner})`);
}

if (!hits.length) {
  console.log(`\n  No locked content touched. ${changed.length} file(s) changed.\n`);
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
