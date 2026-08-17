/**
 * THE ENTITY GRAPH — Keystone Part 5.
 *
 * One connected @graph per page, @id-anchored. Every page imports these nodes by
 * @id; no page ever redeclares them. There is exactly ONE emitter on this site
 * (this file), so the duplicate-node failure that plagues WordPress builds
 * (Keystone 5.3) cannot occur here.
 *
 * The 7 nodes: WebSite · WebPage · ImageObject · LocalBusiness · Service|Article ·
 * FAQPage · BreadcrumbList. Person (#named-expert) is added wherever the expert
 * exists. Every optional/PENDING field is guarded — a node is emitted without a
 * property rather than with an invented one.
 */

import { BUSINESS, BRAND_IMAGES, TERRITORY, has } from '../data/business';
import { SITE_URL } from '../data/site-url.mjs';

export const ORIGIN = SITE_URL.replace(/\/$/, '');

export const ID = {
  website: `${ORIGIN}/#website`,
  business: `${ORIGIN}/#localbusiness`,
  organization: `${ORIGIN}/#organization`,
  logo: `${ORIGIN}/#logo`,
  social: `${ORIGIN}/#brand-image`,
  expert: `${ORIGIN}/#named-expert`,
} as const;

export const abs = (path: string): string => {
  if (/^https?:\/\//.test(path)) return path;
  return `${ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;
};

export type JsonLdNode = Record<string, unknown>;

export interface FaqItem {
  question: string;
  answer: string;
}
export interface Crumb {
  name: string;
  url: string;
}

/** Drop null/undefined/empty values so no node ever carries a hollow property. */
function clean<T extends JsonLdNode>(node: T): T {
  const out: JsonLdNode = {};
  for (const [k, v] of Object.entries(node)) {
    if (v === null || v === undefined) continue;
    if (typeof v === 'string' && v.trim() === '') continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sitewide nodes — declared once per domain, referenced by @id everywhere else.
// ─────────────────────────────────────────────────────────────────────────────

function postalAddress(): JsonLdNode | null {
  const a = BUSINESS.address;
  if (!has(a.street) || !has(a.city) || !has(a.postalCode)) return null;
  return clean({
    '@type': 'PostalAddress',
    streetAddress: has(a.street2) ? `${a.street} ${a.street2}` : a.street,
    addressLocality: a.city,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  });
}

function sameAs(): string[] {
  const s = BUSINESS.social;
  return [BUSINESS.gbpUrl, s.facebook, s.instagram, s.linkedin, s.youtube].filter(
    (u): u is string => has(u)
  );
}

function openingHours(): JsonLdNode[] | null {
  if (!has(BUSINESS.hours)) return null;
  return BUSINESS.hours.map((h) =>
    clean({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })
  );
}

function credentialNodes(): JsonLdNode[] {
  const c = BUSINESS.credentials;
  const out: JsonLdNode[] = [];
  if (has(c.rcatNumber)) {
    out.push({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'RCAT Certified Contractor',
      identifier: c.rcatNumber,
      recognizedBy: {
        '@type': 'Organization',
        name: 'Roofing Contractors Association of Texas',
      },
    });
  }
  if (has(c.manufacturerCerts)) {
    for (const m of c.manufacturerCerts) {
      out.push({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: m,
      });
    }
  }
  return out;
}

/** areaServed — the confirmed territory only (Keystone Part 14: hard filter). */
function areaServed(): JsonLdNode[] {
  return [
    ...TERRITORY.counties.map((c) => ({
      '@type': 'AdministrativeArea',
      name: c,
      containedInPlace: { '@type': 'State', name: 'Texas' },
    })),
  ];
}

/** The named-expert Person node, or null while the client input is pending. */
export function personNode(): JsonLdNode | null {
  const e = BUSINESS.expert;
  if (!has(e.name)) return null;
  const creds = credentialNodes();
  return clean({
    '@type': 'Person',
    '@id': ID.expert,
    name: e.name,
    jobTitle: has(e.role) ? e.role : undefined,
    description: has(e.bio) ? e.bio : undefined,
    image: has(e.photo) ? abs(e.photo) : undefined,
    url: has(e.slug) ? abs(`/${e.slug}/`) : undefined,
    worksFor: { '@id': ID.business },
    hasCredential: creds.length ? creds : undefined,
    knowsAbout: [
      'Site preparation',
      'Earthwork and grading',
      'Soil compaction',
      'Commercial roofing systems',
      'Windstorm-rated roof assemblies',
    ],
  });
}

/**
 * The sitewide nodes injected on EVERY page: WebSite, LocalBusiness,
 * ImageObject ×2 (logo + shared social image), Person where it exists.
 * Keystone 5.1 — declared once per domain, referenced by @id thereafter.
 */
export function coreNodes(): JsonLdNode[] {
  const addr = postalAddress();
  const hours = openingHours();
  const same = sameAs();
  const person = personNode();

  const business = clean({
    // Subtype-matched, per Keystone 5.3 — never emit a bare "LocalBusiness" and
    // never grep for the literal string when auditing.
    '@type': ['LocalBusiness', 'GeneralContractor', 'RoofingContractor'],
    '@id': ID.business,
    name: BUSINESS.name,
    legalName: has(BUSINESS.legalName) ? BUSINESS.legalName : undefined,
    alternateName: BUSINESS.shortName,
    description: BUSINESS.description,
    slogan: BUSINESS.tagline,
    url: `${ORIGIN}/`,
    logo: { '@id': ID.logo },
    image: { '@id': ID.social },
    telephone: has(BUSINESS.phoneE164) ? BUSINESS.phoneE164 : undefined,
    email: has(BUSINESS.email) ? BUSINESS.email : undefined,
    address: addr ?? undefined,
    geo:
      has(BUSINESS.geo.lat) && has(BUSINESS.geo.lng)
        ? {
            '@type': 'GeoCoordinates',
            latitude: BUSINESS.geo.lat,
            longitude: BUSINESS.geo.lng,
          }
        : undefined,
    areaServed: areaServed(),
    foundingDate: has(BUSINESS.foundingYear) ? String(BUSINESS.foundingYear) : undefined,
    openingHoursSpecification: hours ?? undefined,
    sameAs: same.length ? same : undefined,
    // Keystone doctrine #6: emitted ONLY from a verified platform. Never hand-entered.
    aggregateRating: has(BUSINESS.aggregateRating)
      ? {
          '@type': 'AggregateRating',
          ratingValue: BUSINESS.aggregateRating.ratingValue,
          reviewCount: BUSINESS.aggregateRating.reviewCount,
        }
      : undefined,
    employee: person ? { '@id': ID.expert } : undefined,
    founder: person && has(BUSINESS.expert.role) ? { '@id': ID.expert } : undefined,
    knowsLanguage: ['en-US', 'es-MX'],
  });

  const nodes: JsonLdNode[] = [
    {
      '@type': 'WebSite',
      '@id': ID.website,
      url: `${ORIGIN}/`,
      name: BUSINESS.name,
      description: BUSINESS.description,
      publisher: { '@id': ID.business },
      inLanguage: 'en-US',
    },
    business,
    {
      '@type': 'ImageObject',
      '@id': ID.logo,
      url: abs(BRAND_IMAGES.logo.src),
      width: BRAND_IMAGES.logo.width,
      height: BRAND_IMAGES.logo.height,
      caption: BRAND_IMAGES.logo.alt,
    },
    {
      '@type': 'ImageObject',
      '@id': ID.social,
      url: abs(BRAND_IMAGES.social.src),
      width: BRAND_IMAGES.social.width,
      height: BRAND_IMAGES.social.height,
      caption: BRAND_IMAGES.social.alt,
    },
  ];

  if (person) nodes.push(person);
  return nodes;
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-page nodes
// ─────────────────────────────────────────────────────────────────────────────

export interface PageGraphInput {
  /** Path with leading and trailing slash, e.g. "/services/roofing/" */
  path: string;
  title: string;
  description: string;
  /** The AEO Quick Answer — also the Speakable target and first FAQ answer. */
  quickAnswer?: string;
  crumbs: Crumb[];
  faqs?: FaqItem[];
  /** Page-type dependent node 5 */
  kind?: 'service' | 'article' | 'place' | 'casestudy' | 'page';
  serviceName?: string;
  serviceType?: string;
  /** City name when the page is geo-scoped, for Service.areaServed */
  areaName?: string;
  areaLat?: number;
  areaLng?: number;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}

/** M4 — the explicit "read this aloud" target for voice assistants. */
export const SPEAKABLE = {
  '@type': 'SpeakableSpecification',
  cssSelector: ['[data-speakable]', '.faq-speakable'],
};

export function pageGraph(input: PageGraphInput): JsonLdNode[] {
  const url = abs(input.path);
  const webpageId = `${url}#webpage`;
  const nodes: JsonLdNode[] = [];

  nodes.push(
    clean({
      '@type': 'WebPage',
      '@id': webpageId,
      url,
      name: input.title,
      description: input.description,
      isPartOf: { '@id': ID.website },
      about: { '@id': ID.business },
      primaryImageOfPage: { '@id': ID.social },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      inLanguage: 'en-US',
      datePublished: input.datePublished,
      dateModified: input.dateModified ?? input.datePublished,
      speakable: SPEAKABLE, // M4
    })
  );

  // Node 7 — BreadcrumbList, mirroring the URL taxonomy exactly.
  nodes.push({
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: input.crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.url),
    })),
  });

  // Node 5 — page-type dependent.
  if (input.kind === 'service' && input.serviceName) {
    nodes.push(
      clean({
        '@type': 'Service',
        '@id': `${url}#service`,
        name: input.serviceName,
        serviceType: input.serviceType ?? input.serviceName,
        description: input.quickAnswer ?? input.description,
        provider: { '@id': ID.business },
        areaServed: input.areaName
          ? clean({
              '@type': 'City',
              name: input.areaName,
              containedInPlace: { '@type': 'State', name: 'Texas' },
              geo:
                input.areaLat && input.areaLng
                  ? {
                      '@type': 'GeoCoordinates',
                      latitude: input.areaLat,
                      longitude: input.areaLng,
                    }
                  : undefined,
            })
          : areaServed(),
        mainEntityOfPage: { '@id': webpageId },
        // No `offers` with a price: Keystone doctrine #6 — never fabricate pricing.
        // No `review`/`aggregateRating` on Service: ineligible type (Keystone 5.3).
      })
    );
  } else if (input.kind === 'article' || input.kind === 'casestudy') {
    const person = has(BUSINESS.expert.name);
    nodes.push(
      clean({
        '@type': input.kind === 'casestudy' ? 'CreativeWork' : 'Article',
        '@id': `${url}#${input.kind === 'casestudy' ? 'casestudy' : 'article'}`,
        headline: input.title,
        description: input.description,
        genre: input.kind === 'casestudy' ? 'Case study' : undefined,
        isPartOf: { '@id': webpageId },
        mainEntityOfPage: { '@id': webpageId },
        author: person ? { '@id': ID.expert } : { '@id': ID.business },
        reviewedBy: person ? { '@id': ID.expert } : undefined,
        publisher: { '@id': ID.business },
        image: input.image ? abs(input.image) : { '@id': ID.social },
        datePublished: input.datePublished,
        dateModified: input.dateModified ?? input.datePublished,
        inLanguage: 'en-US',
      })
    );
  } else if (input.kind === 'place' && input.areaName) {
    nodes.push(
      clean({
        '@type': 'Service',
        '@id': `${url}#service`,
        name: input.serviceName ?? `Dirt Work & Roofing in ${input.areaName}, TX`,
        serviceType: input.serviceType ?? 'Construction services',
        description: input.quickAnswer ?? input.description,
        provider: { '@id': ID.business },
        areaServed: clean({
          '@type': 'City',
          name: input.areaName,
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: TERRITORY.primaryCounty,
          },
          geo:
            input.areaLat && input.areaLng
              ? {
                  '@type': 'GeoCoordinates',
                  latitude: input.areaLat,
                  longitude: input.areaLng,
                }
              : undefined,
        }),
        mainEntityOfPage: { '@id': webpageId },
      })
    );
  }

  // Node 6 — exactly ONE FAQPage per URL, built from the same array the visible
  // block renders from (Keystone 4.1 block 5).
  if (input.faqs && input.faqs.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      isPartOf: { '@id': webpageId },
      speakable: SPEAKABLE,
      mainEntity: input.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  return nodes;
}

/** The complete graph string injected into a REAL <script type="application/ld+json">. */
export function buildGraph(input: PageGraphInput): string {
  const graph = [...coreNodes(), ...pageGraph(input)];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}
