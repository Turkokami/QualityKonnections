/**
 * 2 · PER-PAGE SEO AUDIT + the full-site sweep (Keystone 9.2 #2, 9.4).
 *
 * Per page: exactly one H1 · unique title ≤60 · description 110–165 ending on
 * punctuation and never mid-word · canonical · OG image · alt on every image ·
 * breadcrumb present · Speakable hooks present.
 *
 * Aggregate (Keystone 9.4): duplicate titles · duplicate H1s · repeated H2s within
 * a page · H2 strings appearing across an unusual number of pages — the
 * cannibalization smoking gun (Keystone 12.1, the #1 recurring killer).
 */
import { pathToFileURL } from 'node:url';
import { htmlFiles, routeOf, read, bodyOnly, stripTags, attr, makeReport } from './_util.mjs';

const DANGLING = /\b(and|or|the|a|an|in|on|for|to|of|with|at|by|from|that|is|are|we|our|your|plus|near|across)$/i;
/** An H2 legitimately shared sitewide — component headings, not cannibalization. */
const ALLOWED_SHARED_H2 = new Set([
  'frequently asked questions',
  'the short answer',
  'conditions here',
  'what is actually at stake',
  'the rule, stated plainly',
  'who it applies to',
  'reach us',
  'request an estimate',
  // Emitted by compliance/[topic].astro on every T8 page — LinkGrid and Cta
  // headings, not body copy. Shared by construction, so they are boilerplate
  // rather than a cannibalization signal.
  'services this affects',
  'markets where this bites hardest',
  'other compliance topics',
  'want this handled correctly the first time?',
]);

export function run() {
  const r = makeReport('Per-page SEO audit + cannibalization sweep');
  const files = htmlFiles();
  if (!files.length) {
    r.err('No built HTML found — run `npm run build` first.');
    return r.finish();
  }

  const titles = new Map();
  const descs = new Map();
  const h1s = new Map();
  const h2Global = new Map();

  for (const f of files) {
    const route = routeOf(f);
    const html = read(f);
    const body = bodyOnly(html);
    const noindex = /name="robots" content="noindex/.test(html);

    // ── Title (M5) ──────────────────────────────────────────────────────────
    const t = html.match(/<title>([\s\S]*?)<\/title>/);
    const title = t ? stripTags(t[1]) : null;
    if (!title) r.err(`${route} — missing <title>`);
    else {
      if (title.length > 60) r.err(`${route} — title ${title.length} chars (>60): "${title}"`);
      if (/\S-$|\s\S{1,2}$/.test(title) && title.length >= 58)
        r.warn(`${route} — title may be cut mid-word: "${title}"`);
      if (!noindex) titles.set(title, [...(titles.get(title) ?? []), route]);
    }

    // ── Description (M5) ────────────────────────────────────────────────────
    const dm = html.match(/name="description" content="([^"]*)"/);
    const desc = dm ? dm[1].replace(/&amp;/g, '&') : null;
    if (!desc) r.err(`${route} — missing meta description`);
    else {
      if (desc.length < 110 || desc.length > 165)
        r.err(`${route} — description ${desc.length} chars (need 110–165)`);
      if (!/[.!?]$/.test(desc.trim()))
        r.err(`${route} — description does not end on punctuation: "…${desc.slice(-40)}"`);
      const lastWord = desc.trim().replace(/[.!?]$/, '').split(/\s+/).pop() ?? '';
      if (DANGLING.test(lastWord))
        r.err(`${route} — description ends on a dangling word "${lastWord}"`);
      if (!noindex) descs.set(desc, [...(descs.get(desc) ?? []), route]);
    }

    // ── Canonical, OG, breadcrumb, speakable ────────────────────────────────
    if (!/<link rel="canonical"/.test(html)) r.err(`${route} — missing canonical`);
    if (!/property="og:image"/.test(html)) r.err(`${route} — missing og:image (M7)`);
    if (!/name="twitter:image"/.test(html)) r.err(`${route} — missing twitter:image (M7)`);
    if (!/aria-label="Breadcrumb"/.test(html)) r.err(`${route} — no visible breadcrumb`);
    if (!/data-speakable/.test(html)) r.err(`${route} — no data-speakable hook (M4)`);
    if (!noindex && !/class="faq-speakable"/.test(html))
      r.err(`${route} — no .faq-speakable region (M4)`);

    // ── Headings ────────────────────────────────────────────────────────────
    const hh1 = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1]));
    if (hh1.length !== 1) r.err(`${route} — ${hh1.length} H1 tags (need exactly 1)`);
    if (hh1[0] && !noindex) h1s.set(hh1[0], [...(h1s.get(hh1[0]) ?? []), route]);

    const hh2 = [...body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
      stripTags(m[1]).toLowerCase()
    );
    const seen = new Set();
    for (const h of hh2) {
      if (seen.has(h)) r.warn(`${route} — repeated H2 within the page: "${h}"`);
      seen.add(h);
      if (!ALLOWED_SHARED_H2.has(h) && !noindex)
        h2Global.set(h, (h2Global.get(h) ?? 0) + 1);
    }

    // ── Images (M6, M7) ─────────────────────────────────────────────────────
    const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    for (const tag of imgs) {
      const alt = attr(tag, 'alt');
      const src = attr(tag, 'src') ?? '?';
      if (alt === null || alt.trim() === '')
        r.err(`${route} — <img> with no alt: ${src}`);
      else if (alt.length > 125) r.warn(`${route} — alt >125 chars: ${src}`);
      if (!attr(tag, 'width') || !attr(tag, 'height'))
        r.warn(`${route} — <img> without explicit width/height (CLS): ${src}`);
    }
    if (!html.includes('qk-logo.svg')) r.err(`${route} — brand logo missing (M7)`);
    if (/\.(jpg|jpeg)"/i.test(html)) r.warn(`${route} — non-WebP raster reference found`);
  }

  // ── Aggregate ─────────────────────────────────────────────────────────────
  for (const [t, routes] of titles)
    if (routes.length > 1) r.err(`DUPLICATE TITLE on ${routes.length} pages: "${t}" → ${routes.join(', ')}`);
  for (const [d, routes] of descs)
    if (routes.length > 1) r.err(`DUPLICATE DESCRIPTION on ${routes.length} pages → ${routes.join(', ')}`);
  for (const [h, routes] of h1s)
    if (routes.length > 1) r.err(`DUPLICATE H1 on ${routes.length} pages: "${h}" → ${routes.join(', ')}`);

  const threshold = Math.max(3, Math.ceil(files.length * 0.15));
  for (const [h, n] of h2Global)
    if (n >= threshold)
      r.warn(`CANNIBALIZATION SIGNAL — H2 "${h}" appears on ${n}/${files.length} pages`);

  return r.finish(`${files.length} pages audited · shared-H2 threshold ${threshold}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const res = run();
  process.exit(res.errors ? 1 : 0);
}
