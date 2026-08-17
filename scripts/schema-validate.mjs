/**
 * 5 · JSON-LD GRAPH VALIDATOR (Keystone 5.3 — the injection trap + hard rules).
 *
 * Parses the RENDERED output of every built page to confirm the graph is real
 * markup (not double-escaped text), connected, node-complete, single-emitter, and
 * free of the fabricated-trust nodes doctrine #6 forbids.
 */
import { pathToFileURL } from 'node:url';
import { htmlFiles, routeOf, read, makeReport } from './_util.mjs';

const REQUIRED = ['WebSite', 'WebPage', 'ImageObject', 'BreadcrumbList'];
const BUSINESS_SUBTYPES = new Set([
  'LocalBusiness',
  'GeneralContractor',
  'RoofingContractor',
  'HomeAndConstructionBusiness',
  'Organization',
]);

const typesOf = (n) => (Array.isArray(n['@type']) ? n['@type'] : [n['@type']]).filter(Boolean);

export function run() {
  const r = makeReport('JSON-LD graph validator');
  const files = htmlFiles();
  if (!files.length) {
    r.err('No built HTML found — run `npm run build` first.');
    return r.finish();
  }

  let pages = 0;
  for (const f of files) {
    const route = routeOf(f);
    const html = read(f);
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];

    if (blocks.length === 0) {
      r.err(`${route} — no JSON-LD emitted`);
      continue;
    }
    // Keystone 5.3: one emitter wins. More than one script is the duplicate-node
    // failure that made 8 Service / 7 Offer / 28 City nodes on a prior build.
    if (blocks.length > 1) r.err(`${route} — ${blocks.length} JSON-LD emitters (must be exactly 1)`);

    const raw = blocks[0][1];
    if (/&quot;|&#34;|&amp;quot;/.test(raw)) {
      r.err(`${route} — JSON-LD is ESCAPED (the set:html pseudo-element trap, Keystone 5.3)`);
      continue;
    }

    let graph;
    try {
      graph = JSON.parse(raw);
    } catch (e) {
      r.err(`${route} — JSON-LD does not parse: ${e.message}`);
      continue;
    }
    const nodes = graph['@graph'] ?? [];
    if (!nodes.length) {
      r.err(`${route} — empty @graph`);
      continue;
    }
    pages++;

    const allTypes = new Set(nodes.flatMap(typesOf));
    for (const t of REQUIRED)
      if (!allTypes.has(t)) r.err(`${route} — missing required node: ${t}`);

    // Subtype-matched business node — never grep for the literal string.
    if (!nodes.some((n) => typesOf(n).some((t) => BUSINESS_SUBTYPES.has(t))))
      r.err(`${route} — no LocalBusiness-family node`);

    // Exactly one FAQPage per URL.
    const faqCount = nodes.filter((n) => typesOf(n).includes('FAQPage')).length;
    if (faqCount > 1) r.err(`${route} — ${faqCount} FAQPage nodes (must be 0 or 1)`);

    // @id collisions.
    const ids = nodes.map((n) => n['@id']).filter(Boolean);
    const dupes = ids.filter((v, i) => ids.indexOf(v) !== i);
    if (dupes.length) r.err(`${route} — duplicate @id: ${[...new Set(dupes)].join(', ')}`);

    // Every reference must resolve inside the graph.
    const idSet = new Set(ids);
    const refs = [];
    const walk = (v) => {
      if (Array.isArray(v)) return v.forEach(walk);
      if (v && typeof v === 'object') {
        const keys = Object.keys(v);
        if (keys.length === 1 && keys[0] === '@id') refs.push(v['@id']);
        else Object.values(v).forEach(walk);
      }
    };
    nodes.forEach(walk);
    for (const ref of new Set(refs))
      if (!idSet.has(ref)) r.err(`${route} — dangling @id reference: ${ref}`);

    // Doctrine #6 — fabricated trust signals are a build failure, not a warning.
    const json = JSON.stringify(graph);
    if (/"aggregateRating"/.test(json) && !process.env.QK_VERIFIED_GBP)
      r.err(`${route} — aggregateRating emitted without QK_VERIFIED_GBP set (doctrine #6)`);
    if (/"@type":"Review"/.test(json) || /"reviewRating"/.test(json))
      r.err(`${route} — Review/reviewRating markup on our own site is ineligible (Keystone 5.3)`);
    if (/"priceRange"|"offers"/.test(json))
      r.warn(`${route} — pricing emitted in schema; confirm it is real and current`);

    // Speakable (M4) must be present and point at the two hooks.
    if (!/SpeakableSpecification/.test(json)) r.err(`${route} — no SpeakableSpecification (M4)`);
    else if (!/data-speakable/.test(json) || !/faq-speakable/.test(json))
      r.warn(`${route} — Speakable cssSelector does not target both hooks`);
  }

  return r.finish(`${pages} graphs parsed and validated`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const res = run();
  process.exit(res.errors ? 1 : 0);
}
