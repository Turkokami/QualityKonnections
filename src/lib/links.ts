/**
 * THE SPOKE-AND-WHEEL LATTICE — mandate M3.
 *
 * Every page links UP to its parent, IN to the hub, and LATERALLY to its
 * siblings. Nothing is ever orphaned.
 *
 * Two rules this module enforces mechanically:
 *  1. CONTENT-GATED. A link is only emitted when the destination actually has a
 *     body in the content layer. That is why the dead-link crawler stays at zero
 *     while content arrives in waves (Keystone 9.2 #1).
 *  2. HUB-FIRST. Keystone 3.1 is emphatic: build the hub with real content before
 *     the children, and audit hubs by INBOUND-LINK COUNT, not by how they look.
 *     `inboundCounts()` powers exactly that audit in scripts/seo-audit.mjs.
 */

import { getCollection } from 'astro:content';
import { SERVICES, getService, type Service } from '../data/services';
import { TOWNS, getTown, nearbyTowns, type Town } from '../data/towns';
import { VERTICALS } from '../data/verticals';
import { COMPLIANCE } from '../data/compliance';

export interface Link {
  href: string;
  label: string;
  /** Optional descriptive text used by hub grids. */
  note?: string;
}

const live = <T extends { data: { draft: boolean } }>(entries: T[]) =>
  entries.filter((e) => !e.data.draft);

/** One pass over the content layer; every helper below reads this snapshot. */
export async function buildIndex() {
  const [
    services,
    problems,
    towns,
    neighborhoods,
    matrix,
    verticals,
    compliance,
    library,
    casestudies,
    pages,
  ] = await Promise.all([
    getCollection('services').then(live),
    getCollection('problems').then(live),
    getCollection('towns').then(live),
    getCollection('neighborhoods').then(live),
    getCollection('matrix').then(live),
    getCollection('verticals').then(live),
    getCollection('compliance').then(live),
    getCollection('library').then(live),
    getCollection('casestudies').then(live),
    getCollection('pages').then(live),
  ]);

  return {
    services,
    problems,
    towns,
    neighborhoods,
    matrix,
    verticals,
    compliance,
    library,
    casestudies,
    pages,
    serviceSet: new Set(services.map((e) => e.data.service)),
    problemSet: new Set(problems.map((e) => e.id)),
    townSet: new Set(towns.map((e) => e.data.town)),
    matrixSet: new Set(matrix.map((e) => `${e.data.town}--${e.data.service}`)),
    neighborhoodSet: new Set(
      neighborhoods.map((e) => `${e.data.town}--${e.data.neighborhood}`)
    ),
    verticalSet: new Set(verticals.map((e) => e.data.vertical)),
    complianceSet: new Set(compliance.map((e) => e.data.topic)),
    librarySet: new Set(library.map((e) => e.id)),
  };
}

export type Index = Awaited<ReturnType<typeof buildIndex>>;

// ─── URL builders — one taxonomy per domain (Keystone 3.3) ───────────────────
export const url = {
  home: () => '/',
  servicesHub: () => '/services/',
  service: (s: string) => `/services/${s}/`,
  problem: (service: string, p: string) => `/services/${service}/${p}/`,
  locationsHub: () => '/locations/',
  town: (t: string) => `/locations/${t}/`,
  matrix: (t: string, s: string) => `/locations/${t}/${s}/`,
  neighborhood: (t: string, n: string) => `/locations/${t}/${n}/`,
  commercialHub: () => '/commercial/',
  vertical: (v: string) => `/commercial/${v}/`,
  complianceHub: () => '/compliance/',
  compliance: (c: string) => `/compliance/${c}/`,
  libraryHub: () => '/resources/',
  library: (l: string) => `/resources/${l}/`,
  caseStudiesHub: () => '/case-studies/',
  caseStudy: (c: string) => `/case-studies/${c}/`,
  guarantee: () => '/our-guarantee/',
  financing: () => '/financing/',
  contact: () => '/contact/',
  about: () => '/about/',
};

// ─── Gated link emitters ─────────────────────────────────────────────────────

export function serviceLinks(ix: Index, slugs: string[]): Link[] {
  return slugs
    .filter((s) => ix.serviceSet.has(s))
    .map((s) => {
      const svc = getService(s);
      return svc ? { href: url.service(s), label: svc.name, note: svc.blurb } : null;
    })
    .filter((l): l is Link => l !== null);
}

export function problemLinks(ix: Index, service: Service): Link[] {
  return service.problems
    .filter((p) => ix.problemSet.has(p))
    .map((p) => {
      const entry = ix.problems.find((e) => e.id === p);
      return entry
        ? { href: url.problem(service.slug, p), label: entry.data.title }
        : null;
    })
    .filter((l): l is Link => l !== null);
}

export function townLinks(ix: Index, towns: Town[]): Link[] {
  return towns
    .filter((t) => ix.townSet.has(t.slug))
    .map((t) => ({ href: url.town(t.slug), label: `${t.name}, TX`, note: t.county }));
}

/** Lateral wiring for a city page — real nearest neighbours, gated on content. */
export function siblingTownLinks(ix: Index, t: Town, limit = 5): Link[] {
  return townLinks(ix, nearbyTowns(t, 12)).slice(0, limit);
}

/** The city×service matrix links that actually exist for a market. */
export function matrixLinks(ix: Index, t: Town): Link[] {
  return SERVICES.filter((s) => ix.matrixSet.has(`${t.slug}--${s.slug}`)).map((s) => ({
    href: url.matrix(t.slug, s.slug),
    label: `${s.name} in ${t.name}`,
    note: s.blurb,
  }));
}

export function neighborhoodLinks(ix: Index, t: Town): Link[] {
  return (t.neighborhoods ?? [])
    .filter((n) => ix.neighborhoodSet.has(`${t.slug}--${n.slug}`))
    .map((n) => ({
      href: url.neighborhood(t.slug, n.slug),
      label: n.name,
      note: n.note,
    }));
}

export function verticalLinks(ix: Index, slugs?: string[]): Link[] {
  const list = slugs ? VERTICALS.filter((v) => slugs.includes(v.slug)) : VERTICALS;
  return list
    .filter((v) => ix.verticalSet.has(v.slug))
    .map((v) => ({ href: url.vertical(v.slug), label: v.name, note: v.blurb }));
}

export function complianceLinks(ix: Index, slugs?: string[]): Link[] {
  const list = slugs ? COMPLIANCE.filter((c) => slugs.includes(c.slug)) : COMPLIANCE;
  return list
    .filter((c) => ix.complianceSet.has(c.slug))
    .map((c) => ({ href: url.compliance(c.slug), label: c.name, note: c.rule }));
}

export function libraryLinksFor(ix: Index, serviceSlug: string): Link[] {
  return ix.library
    .filter((l) => l.data.parentService === serviceSlug)
    .map((l) => ({ href: url.library(l.id), label: l.data.title }));
}

export function caseStudyLinksFor(
  ix: Index,
  opts: { town?: string; service?: string }
): Link[] {
  return ix.casestudies
    .filter(
      (c) =>
        (!opts.town || c.data.town === opts.town) &&
        (!opts.service || c.data.service === opts.service)
    )
    .map((c) => ({ href: url.caseStudy(c.id), label: c.data.title }));
}

/**
 * Inbound-link audit (Keystone 3.1): "audit hubs by inbound-link count, not by
 * how they look." Consumed by scripts/seo-audit.mjs against the built dist/.
 */
export function hubRoutes(): string[] {
  return [
    url.home(),
    url.servicesHub(),
    url.locationsHub(),
    url.commercialHub(),
    url.complianceHub(),
    url.libraryHub(),
    url.caseStudiesHub(),
  ];
}

/** Breadcrumb builders — mirror the URL taxonomy EXACTLY (Keystone 5.1 node 7). */
export const crumbs = {
  service: (s: Service) => [
    { name: 'Home', url: url.home() },
    { name: 'Services', url: url.servicesHub() },
    { name: s.name, url: url.service(s.slug) },
  ],
  problem: (s: Service, title: string, slug: string) => [
    { name: 'Home', url: url.home() },
    { name: 'Services', url: url.servicesHub() },
    { name: s.name, url: url.service(s.slug) },
    { name: title, url: url.problem(s.slug, slug) },
  ],
  town: (t: Town) => [
    { name: 'Home', url: url.home() },
    { name: 'Service Areas', url: url.locationsHub() },
    { name: t.name, url: url.town(t.slug) },
  ],
  matrix: (t: Town, s: Service) => [
    { name: 'Home', url: url.home() },
    { name: 'Service Areas', url: url.locationsHub() },
    { name: t.name, url: url.town(t.slug) },
    { name: s.name, url: url.matrix(t.slug, s.slug) },
  ],
  neighborhood: (t: Town, name: string, slug: string) => [
    { name: 'Home', url: url.home() },
    { name: 'Service Areas', url: url.locationsHub() },
    { name: t.name, url: url.town(t.slug) },
    { name, url: url.neighborhood(t.slug, slug) },
  ],
  simple: (name: string, path: string) => [
    { name: 'Home', url: url.home() },
    { name, url: path },
  ],
  child: (hubName: string, hubPath: string, name: string, path: string) => [
    { name: 'Home', url: url.home() },
    { name: hubName, url: hubPath },
    { name, url: path },
  ],
};

export { SERVICES, TOWNS, getService, getTown, nearbyTowns };
