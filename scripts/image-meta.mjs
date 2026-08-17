/**
 * 6 · IMAGE-METADATA INTEGRITY CHECKER — mandates M6 and M7 (Keystone 9.2 #5).
 *
 * Snapshots every image's Title/Alt to _reports/image-meta.json and re-checks on
 * the next run, flagging any image whose Title or Alt was BLANKED or LOST on a
 * re-save. Keystone M6 is explicit that a re-save which strips image metadata is a
 * defect, and this is the only way to catch it across a 190-page set.
 *
 * Also confirms every page carries the shared hero/social image and the logo (M7),
 * and that referenced image files actually exist in public/.
 */
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { htmlFiles, routeOf, read, attr, makeReport } from './_util.mjs';

const SNAPSHOT = '_reports/image-meta.json';

export function run() {
  const r = makeReport('Image-metadata integrity (M6/M7)');
  const files = htmlFiles();
  if (!files.length) {
    r.err('No built HTML found — run `npm run build` first.');
    return r.finish();
  }

  const current = {};
  let imgCount = 0;

  for (const f of files) {
    const route = routeOf(f);
    const html = read(f);

    for (const tag of [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])) {
      const src = attr(tag, 'src');
      if (!src) continue;
      imgCount++;
      const alt = attr(tag, 'alt') ?? '';
      const title = attr(tag, 'title') ?? '';
      current[src] = { alt, title };

      if (!alt.trim()) r.err(`${route} — image has no alt: ${src}`);
      if (!title.trim()) r.warn(`${route} — image has no title attribute (M6): ${src}`);
      if (alt.trim() && alt.trim().toLowerCase() === path.basename(src).toLowerCase())
        r.err(`${route} — alt text is the filename, not a description (M6): ${src}`);

      if (src.startsWith('/') && !src.startsWith('//')) {
        const disk = path.join('public', src);
        const built = path.join('dist', src);
        if (!fs.existsSync(disk) && !fs.existsSync(built))
          r.err(`${route} — image file missing from public/: ${src}`);
      }
    }

    // M7 — both required on every page.
    if (!/qk-social-1200x630\.png/.test(html))
      r.err(`${route} — shared brand social image not referenced (M7)`);
    if (!/qk-logo\.svg/.test(html)) r.err(`${route} — brand logo not rendered (M7)`);
  }

  // ── Drift detection against the previous snapshot ────────────────────────
  if (fs.existsSync(SNAPSHOT)) {
    const prev = JSON.parse(read(SNAPSHOT));
    for (const [src, was] of Object.entries(prev)) {
      const now = current[src];
      if (!now) continue; // image removed — a content decision, not metadata loss
      if (was.alt && !now.alt) r.err(`ALT LOST on re-save (M6): ${src}  ("${was.alt}" → "")`);
      if (was.title && !now.title) r.err(`TITLE LOST on re-save (M6): ${src}`);
    }
  }

  fs.mkdirSync('_reports', { recursive: true });
  fs.writeFileSync(SNAPSHOT, JSON.stringify(current, null, 2));

  return r.finish(
    `${imgCount} image references across ${files.length} pages · snapshot written to ${SNAPSHOT}`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const res = run();
  process.exit(res.errors ? 1 : 0);
}
