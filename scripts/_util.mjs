import fs from 'node:fs';
import path from 'node:path';

export const DIST = 'dist';
export const CONTENT = 'src/content';

export function walk(dir, ext, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, out);
    else if (!ext || p.endsWith(ext)) out.push(p);
  }
  return out;
}

export const htmlFiles = () => walk(DIST, '.html');
export const mdFiles = () => walk(CONTENT, '.md');

/** dist/services/roofing/index.html → /services/roofing/ */
export function routeOf(file) {
  // walk() builds paths with path.join, so separators are \ on Windows. Routes are
  // compared against root-relative hrefs, which are always /. Normalize or every
  // page reads as an orphan on Windows and the gate passes on Linux only.
  let r = file.replace(/\\/g, '/').replace(/^dist/, '').replace(/index\.html$/, '');
  if (!r.endsWith('/')) r = r.replace(/\.html$/, '/');
  return r || '/';
}

export const read = (f) => fs.readFileSync(f, 'utf8');

/** Strip <head>, nav, header and footer so body-copy checks are not polluted. */
export function bodyOnly(html) {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
}

export const stripTags = (s) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

export function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, 'i'));
  return m ? m[1] : null;
}

/** Split frontmatter from a markdown file. */
export function frontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { fm: '', body: src };
  return { fm: m[1], body: m[2] };
}

export const words = (s) => s.split(/\s+/).filter(Boolean).length;

// ─── Reporting ───────────────────────────────────────────────────────────────
const C = { red: '\x1b[31m', yellow: '\x1b[33m', green: '\x1b[32m', dim: '\x1b[2m', off: '\x1b[0m' };

export function makeReport(name) {
  const errors = [];
  const warnings = [];
  return {
    name,
    err: (msg) => errors.push(msg),
    warn: (msg) => warnings.push(msg),
    errors,
    warnings,
    finish(summary) {
      const head = `\n${C.dim}──${C.off} ${name}`;
      console.log(head);
      if (summary) console.log(`   ${C.dim}${summary}${C.off}`);
      for (const w of warnings.slice(0, 60)) console.log(`   ${C.yellow}warn${C.off}  ${w}`);
      if (warnings.length > 60) console.log(`   ${C.dim}…${warnings.length - 60} more warnings${C.off}`);
      for (const e of errors.slice(0, 60)) console.log(`   ${C.red}FAIL${C.off}  ${e}`);
      if (errors.length > 60) console.log(`   ${C.dim}…${errors.length - 60} more failures${C.off}`);
      if (!errors.length && !warnings.length) console.log(`   ${C.green}pass${C.off}`);
      return { name, errors: errors.length, warnings: warnings.length };
    },
  };
}
