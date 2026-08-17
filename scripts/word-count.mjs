/**
 * 4 · WORD-COUNT AUDITOR — mandate M1 (Keystone 9.2 #4, 6.3).
 * Every indexable page: 3,000–5,000 words of unique hyper-local content.
 * Measures the MARKDOWN SOURCE, not rendered HTML, so nav/footer inflation cannot
 * disguise a thin page.
 *
 * Also validates the AEO Quick Answer at 40–60 words (Keystone 1.1 #3) and the
 * 6–8 FAQ contract, because both live in the same frontmatter.
 */
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { mdFiles, read, frontmatter, words, makeReport } from './_util.mjs';

const FLOOR = 3000;
const CEILING = 5000;

function fmField(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!m) return null;
  let v = m[1].trim();
  if (v === '>-' || v === '>' || v === '|' || v === '|-') {
    // block scalar — collect the indented lines that follow
    const after = fm.slice(fm.indexOf(m[0]) + m[0].length);
    const lines = [];
    for (const line of after.split('\n').slice(1)) {
      if (/^\s{2,}\S/.test(line)) lines.push(line.trim());
      else if (line.trim() === '') continue;
      else break;
    }
    return lines.join(' ');
  }
  return v.replace(/^['"]|['"]$/g, '');
}

export function run() {
  const r = makeReport('Word-count auditor (M1: 3,000–5,000 words)');
  const files = mdFiles();
  if (!files.length) return r.finish('no content files yet');

  const rows = [];
  for (const f of files) {
    const src = read(f);
    const { fm, body } = frontmatter(src);
    if (/^draft:\s*true/m.test(fm)) continue;

    const prose = body
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
    const n = words(prose);
    rows.push({ f, n });

    if (n < FLOOR) r.err(`${n} words — under the ${FLOOR} floor: ${f}`);
    else if (n > CEILING) r.warn(`${n} words — over the ${CEILING} band: ${f}`);

    const qa = fmField(fm, 'quickAnswer');
    if (!qa) r.err(`missing quickAnswer: ${f}`);
    else {
      const qn = words(qa);
      if (qn < 40 || qn > 60)
        r.err(`quickAnswer is ${qn} words (need 40–60): ${path.basename(f)}`);
    }

    const faqCount = (fm.match(/^\s{2}-\s+question:/gm) ?? []).length;
    if (faqCount < 6) r.err(`only ${faqCount} FAQ items (need 6–8): ${path.basename(f)}`);
    if (faqCount > 8) r.warn(`${faqCount} FAQ items (contract is 6–8): ${path.basename(f)}`);

    // Keystone 6.3: no template variables in body copy; the page title must never
    // appear verbatim inside a sentence.
    if (/\{\{|\{%|\$\{/.test(body)) r.err(`template variable visible in body: ${f}`);
  }

  const total = rows.reduce((a, b) => a + b.n, 0);
  const avg = rows.length ? Math.round(total / rows.length) : 0;
  return r.finish(
    `${rows.length} pages · ${total.toLocaleString()} words total · ${avg.toLocaleString()} avg`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const res = run();
  process.exit(res.errors ? 1 : 0);
}
