/**
 * 1 · DEAD-LINK CRAWLER (Keystone 9.2 #1, Appendix I).
 * Every internal href must resolve to a built file. Also reports INBOUND LINK
 * COUNT PER HUB — Keystone 3.1: "audit hubs by inbound-link count, not by how
 * they look." A hub with heavy inbound equity and a thin body is the single most
 * expensive architecture defect in the system, and this is how it gets caught.
 */
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { DIST, htmlFiles, routeOf, read, makeReport } from './_util.mjs';

const HUBS = [
  '/',
  '/services/',
  '/locations/',
  '/commercial/',
  '/compliance/',
  '/resources/',
  '/case-studies/',
];

export function run() {
  const r = makeReport('Dead-link crawler + hub inbound audit');
  const files = htmlFiles();
  if (!files.length) {
    r.err('No built HTML found — run `npm run build` first.');
    return r.finish();
  }

  const inbound = new Map();
  const outbound = new Map();
  let checked = 0;

  for (const f of files) {
    const from = routeOf(f);
    const html = read(f);
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    const internal = new Set();

    for (const h of hrefs) {
      if (/^(https?:|tel:|mailto:|#|data:)/.test(h)) continue;
      let t = h.split('#')[0].split('?')[0];
      if (!t) continue;
      if (!t.startsWith('/')) continue; // all internal links are root-relative here
      internal.add(t);
      checked++;

      const target = t.endsWith('/')
        ? path.join(DIST, t, 'index.html')
        : path.extname(t)
          ? path.join(DIST, t)
          : path.join(DIST, t, 'index.html');

      if (!fs.existsSync(target)) {
        r.err(`404 → ${t}   (linked from ${from})`);
      } else if (t !== from) {
        inbound.set(t, (inbound.get(t) ?? 0) + 1);
      }
    }
    outbound.set(from, internal.size);
  }

  // Keystone 12.1 "isolated-page pattern": normal inbound but no outbound links.
  for (const [route, n] of outbound) {
    if (n < 3 && route !== '/404/') {
      r.warn(`isolated page — only ${n} outbound internal link(s): ${route}`);
    }
  }

  // Orphan check (M3: nothing is ever orphaned).
  for (const f of files) {
    const route = routeOf(f);
    if (route === '/' || route === '/404/') continue;
    if (!inbound.get(route)) r.err(`ORPHAN — nothing links to ${route}`);
  }

  const hubTable = HUBS.filter((h) => fs.existsSync(path.join(DIST, h, 'index.html'))).map(
    (h) => `${h} ← ${inbound.get(h) ?? 0}`
  );

  return r.finish(
    `${files.length} pages · ${checked} internal links checked · hub inbound: ${hubTable.join('  ')}`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const res = run();
  process.exit(res.errors ? 1 : 0);
}
