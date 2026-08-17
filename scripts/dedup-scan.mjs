/**
 * 3 · DUPLICATE-SENTENCE SCANNER (Keystone 9.2 #3, 6.3).
 * Per markdown body: strip frontmatter and links, split into sentences, keep those
 * ≥10 words, flag any appearing on ≥3 pages. Measures the SOURCE, not rendered
 * HTML, so component boilerplate (CTA, footer, trust strip) is correctly excluded —
 * Keystone 6.3: "keep boilerplate in components, not bodies."
 *
 * Legitimate survivors (the NAP line, a legal statement, headings) are allow-listed;
 * Keystone is explicit that you should not chase those.
 */
import { pathToFileURL } from 'node:url';
import { mdFiles, read, frontmatter, words, makeReport } from './_util.mjs';

const ALLOW = [
  /quality konnection construction/i,
  /^this is not legal advice/i,
  /windstorm certificate of compliance/i,
];

export function run() {
  const r = makeReport('Duplicate-sentence scanner');
  const files = mdFiles();
  if (!files.length) return r.finish('no content files yet');

  const index = new Map();

  for (const f of files) {
    const { body } = frontmatter(read(f));
    const text = body
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/^#{1,6}\s.*$/gm, ' ')
      .replace(/[*_>|`#-]/g, ' ')
      .replace(/\s+/g, ' ');

    for (const raw of text.split(/(?<=[.!?])\s+/)) {
      const s = raw.trim();
      if (words(s) < 10) continue;
      const key = s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
      if (!key) continue;
      if (!index.has(key)) index.set(key, { text: s, files: new Set() });
      index.get(key).files.add(f);
    }
  }

  let flagged = 0;
  for (const [, v] of index) {
    if (v.files.size < 3) continue;
    if (ALLOW.some((re) => re.test(v.text))) continue;
    flagged++;
    r.err(
      `on ${v.files.size} pages: "${v.text.slice(0, 110)}${v.text.length > 110 ? '…' : ''}"`
    );
  }

  return r.finish(
    `${files.length} content files · ${index.size} distinct 10+ word sentences · ${flagged} flagged`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const res = run();
  process.exit(res.errors ? 1 : 0);
}
