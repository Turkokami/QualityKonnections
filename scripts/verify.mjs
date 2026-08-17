#!/usr/bin/env node
/**
 * THE ACCEPTANCE GATE (Keystone Part 9).
 * Run between every content wave and before every push. A non-zero exit means the
 * batch does not ship.
 *
 * Keystone 9.3: "verify third-party audits before acting on them" — and "test your
 * test." Every check here asserts on STRUCTURE (a node exists, a count is 1, a
 * file resolves), never on a clever regex over prose.
 */
import { run as links } from './check-links.mjs';
import { run as seo } from './seo-audit.mjs';
import { run as dedup } from './dedup-scan.mjs';
import { run as wordcount } from './word-count.mjs';
import { run as schema } from './schema-validate.mjs';
import { run as media } from './image-meta.mjs';
import { pending } from './pending.mjs';

const C = { red: '\x1b[31m', yellow: '\x1b[33m', green: '\x1b[32m', bold: '\x1b[1m', dim: '\x1b[2m', off: '\x1b[0m' };

console.log(`${C.bold}\nQuality Konnection Construction — Keystone acceptance gate${C.off}`);

const results = [links(), schema(), seo(), wordcount(), dedup(), media()];
pending();

const errors = results.reduce((a, b) => a + b.errors, 0);
const warnings = results.reduce((a, b) => a + b.warnings, 0);

console.log(`\n${C.bold}── Gate result${C.off}`);
for (const r of results) {
  const mark = r.errors ? `${C.red}FAIL${C.off}` : r.warnings ? `${C.yellow}warn${C.off}` : `${C.green} ok ${C.off}`;
  console.log(`  ${mark}  ${r.name} ${C.dim}(${r.errors} failures, ${r.warnings} warnings)${C.off}`);
}

if (errors) {
  console.log(`\n${C.red}${C.bold}GATE FAILED${C.off} — ${errors} failure(s). This batch does not ship.\n`);
  process.exit(1);
}
console.log(`\n${C.green}${C.bold}GATE PASSED${C.off} — ${warnings} warning(s) to review.\n`);
