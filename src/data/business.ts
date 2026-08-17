/**
 * GLOBAL BUSINESS CONSTANTS — Quality Konnection Construction
 * Keystone Part 7A / Part 15: every NAP, phone, license and social string on the
 * site reads from this file. Change the primary phone here and it changes on
 * every page. Nothing below may be duplicated into page bodies or components.
 *
 * ── PENDING CLIENT INPUT PATTERN ──────────────────────────────────────────────
 * Fields the client still owes are set to `PENDING`. Every consumer guards on
 * `has()` so the site NEVER renders a placeholder, a fake number, or an empty
 * schema property. Fill the value here and the feature lights up sitewide with
 * no other edit. Run `npm run verify` to list what is still outstanding.
 *
 * Keystone doctrine #6 (Honesty is architecture): no invented phone numbers,
 * addresses, license numbers, review counts, prices, founding years or awards.
 * A guarded gap is correct. A plausible-looking placeholder is a defect.
 */

export const PENDING = null;
export type Pending<T> = T | null;

/** True when a pending-input field has been filled in. Use to guard every render. */
export const has = <T>(v: Pending<T>): v is T =>
  v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0);

// ─── Identity ────────────────────────────────────────────────────────────────
export const BUSINESS = {
  /** Legal / display name. Used as the LocalBusiness name and the logo's alt text. */
  name: 'Quality Konnection Construction',
  shortName: 'Quality Konnection',
  /** @type {Pending<string>} DBA or legal entity name if different (e.g. "Quality Konnection Construction LLC") */
  legalName: PENDING as Pending<string>,

  tagline: 'Dirt Work. Roofing. Done Right.',
  positioning:
    'From the ground underneath your building to the roof protecting everything inside it.',

  /**
   * The elevator description. Sourced verbatim from the client's QK CORE brief —
   * do not embellish, do not add claims the client did not make.
   */
  description:
    'Quality Konnection Construction is a Texas construction company specializing in dirt work, site preparation, and complete roofing solutions for residential, commercial, and industrial projects.',

  /** @type {Pending<number>} Year founded — omit from schema until the client confirms it. */
  foundingYear: PENDING as Pending<number>,

  // ─── Contact (NAP) ─────────────────────────────────────────────────────────
  // NAP inside schema must match visible NAP character for character, and match
  // the Google Business Profile. Keystone 5.3.
  /** @type {Pending<string>} E.164 for tel: links, e.g. "+19565551234" */
  phoneE164: PENDING as Pending<string>,
  /** @type {Pending<string>} Human display form, e.g. "(956) 555-1234" */
  phoneDisplay: PENDING as Pending<string>,
  /** @type {Pending<string>} Secondary/office line, optional */
  phoneSecondary: PENDING as Pending<string>,
  /** @type {Pending<string>} */
  email: PENDING as Pending<string>,

  address: {
    /** @type {Pending<string>} */
    street: PENDING as Pending<string>,
    /** @type {Pending<string>} */
    street2: PENDING as Pending<string>,
    /** @type {Pending<string>} Physical city of the yard/office */
    city: PENDING as Pending<string>,
    region: 'TX',
    regionName: 'Texas',
    /** @type {Pending<string>} */
    postalCode: PENDING as Pending<string>,
    country: 'US',
  },

  /** Geo of the office/yard. PENDING until the street address is confirmed. */
  geo: {
    /** @type {Pending<number>} */
    lat: PENDING as Pending<number>,
    /** @type {Pending<number>} */
    lng: PENDING as Pending<number>,
  },

  // ─── Credentials ───────────────────────────────────────────────────────────
  // Keystone 5.3: hasCredential is a cheap E-E-A-T win — always ask for the real
  // number. Keystone Part 14: credentials are hard boundaries. If the company
  // does not hold a credential, no page may imply that authority.
  credentials: {
    /** @type {Pending<string>} Texas Secretary of State filing number */
    texasEntityNumber: PENDING as Pending<string>,
    /** @type {Pending<string>} RCAT (Roofing Contractors Association of Texas) certification # */
    rcatNumber: PENDING as Pending<string>,
    /** @type {Pending<string>} TDI-licensed windstorm/QA inspector affiliation, if any */
    tdiAffiliation: PENDING as Pending<string>,
    /** @type {Pending<string>} General liability carrier + limit, if the client wants it shown */
    generalLiability: PENDING as Pending<string>,
    /** @type {Pending<string[]>} Manufacturer certifications (GAF, Owens Corning, Mule-Hide, Carlisle…) */
    manufacturerCerts: PENDING as Pending<string[]>,
    /** @type {Pending<string[]>} DBE/HUB/SBE or similar registrations */
    registrations: PENDING as Pending<string[]>,
  },

  // ─── Named expert (E-E-A-T, Keystone 4.1 block 2 + Part 11) ────────────────
  // The same named voice across the whole site, with a linked Person entity page.
  // NOTHING about this person is published until the client confirms it.
  expert: {
    /** @type {Pending<string>} */
    name: PENDING as Pending<string>,
    /** @type {Pending<string>} e.g. "Owner & Project Superintendent" */
    role: PENDING as Pending<string>,
    /** @type {Pending<string>} URL slug for the Person entity page, e.g. "john-doe" */
    slug: PENDING as Pending<string>,
    /** @type {Pending<string>} 2–4 sentence first-person bio */
    bio: PENDING as Pending<string>,
    /** @type {Pending<number>} */
    yearsExperience: PENDING as Pending<number>,
    /** @type {Pending<string>} Headshot in /public/images/ */
    photo: PENDING as Pending<string>,
  },

  // ─── Hours ─────────────────────────────────────────────────────────────────
  /**
   * @type {Pending<Array<{days: string[]; opens: string; closes: string}>>}
   * Feeds openingHoursSpecification. Omitted from schema entirely until confirmed.
   */
  hours: PENDING as Pending<Array<{ days: string[]; opens: string; closes: string }>>,
  /** @type {Pending<boolean>} Emergency storm-response availability */
  emergencyService: PENDING as Pending<boolean>,

  // ─── Off-page identity ─────────────────────────────────────────────────────
  // sameAs is the entity-connection lever (Keystone 5.3). GBP first.
  /** @type {Pending<string>} Google Business Profile share/maps URL */
  gbpUrl: PENDING as Pending<string>,
  /** @type {Pending<string>} GBP CID / place URL used for the review CTA */
  reviewUrl: PENDING as Pending<string>,
  social: {
    /** @type {Pending<string>} */
    facebook: PENDING as Pending<string>,
    /** @type {Pending<string>} */
    instagram: PENDING as Pending<string>,
    /** @type {Pending<string>} */
    linkedin: PENDING as Pending<string>,
    /** @type {Pending<string>} */
    youtube: PENDING as Pending<string>,
  },

  // ─── Ratings ───────────────────────────────────────────────────────────────
  /**
   * Keystone doctrine #6 + 5.3: aggregateRating comes from a VERIFIED review
   * platform only, never hand-entered. A local business cannot earn star rich
   * results from review markup on its own site — stars come from the GBP.
   * This stays PENDING until real GBP values are pulled, and may legitimately
   * stay PENDING forever. Do not fill it to "look better".
   * @type {Pending<{ratingValue: number; reviewCount: number; source: string}>}
   */
  aggregateRating: PENDING as Pending<{
    ratingValue: number;
    reviewCount: number;
    source: string;
  }>,

  // ─── Warranty (Keystone doctrine #6 / 1.3) ─────────────────────────────────
  // Defined-term warranties ONLY. Never an unqualified "lifetime". Every use of
  // "guaranteed" on the site links to /our-guarantee/.
  warranty: {
    termsUrl: '/our-guarantee/',
    /** @type {Pending<string>} e.g. "2-year workmanship warranty on roof replacements" */
    workmanshipTerm: PENDING as Pending<string>,
    /** @type {Pending<string>} e.g. "1-year warranty on compaction and drainage work" */
    dirtWorkTerm: PENDING as Pending<string>,
  },

  // ─── Financing ─────────────────────────────────────────────────────────────
  /** @type {Pending<{provider: string; url: string; terms: string}>} */
  financing: PENDING as Pending<{ provider: string; url: string; terms: string }>,

  // ─── Lead capture ──────────────────────────────────────────────────────────
  // Keystone 7A: a static site cannot email. Embed the client's existing CRM
  // form so their lead tracking is preserved — never replace it with a new one.
  /** @type {Pending<string>} CRM/embed form URL (JobNimbus, AccuLynx, Jobber, HubSpot…) */
  crmFormEmbedUrl: PENDING as Pending<string>,
  /** @type {Pending<string>} Fallback plain form action endpoint */
  formActionUrl: PENDING as Pending<string>,
} as const;

// ─── Brand system (Keystone 1.3: a real, named palette per site) ─────────────
// "Gulf Coast Industrial" — drawn from the materials and ground of the Lower Rio
// Grande Valley: standing-seam steel, caliche base, resaca water, safety orange.
// A rebrand is a token swap in src/styles/tokens.css, never a component rewrite.
export const BRAND = {
  palette: {
    seam: '#16222E', // Standing Seam — deep steel navy, primary surface
    seamDeep: '#0C141C', // Seam Shadow — footer / overlay
    caliche: '#F4F0E7', // Caliche — warm limestone base, page background
    calicheDeep: '#E3DCCC', // Caliche Cut — borders, rules
    orange: '#E1651C', // Safety Orange — primary CTA, single accent
    orangeDeep: '#B44D11', // hover/active
    resaca: '#1D6C7B', // Resaca Teal — secondary accent, links
    steel: '#5C6B78', // Galvanized — muted text
    ink: '#111A22', // body copy
    white: '#FFFFFF',
    success: '#2E7D4F',
    warn: '#B4550F',
  },
  fonts: {
    // System stack — no external font fetch, so pages render identically headless
    // and there is no render-blocking request against the LCP gate (Keystone 1.1 #4).
    display: `"Archivo Black", "Helvetica Neue", Arial, system-ui, sans-serif`,
    body: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
  },
} as const;

// ─── Shared brand imagery (Keystone mandate M7) ──────────────────────────────
// Every page renders the shared brand social/hero image AND the logo.
export const BRAND_IMAGES = {
  /** OG/Twitter image + consistent visual anchor. 1200×630. */
  social: {
    src: '/images/brand/qk-social-1200x630.png',
    width: 1200,
    height: 630,
    alt: 'Quality Konnection Construction — dirt work, site preparation and roofing across the South Texas Gulf Coast',
  },
  logo: {
    src: '/images/brand/qk-logo.svg',
    width: 320,
    height: 80,
    /** M7: the logo's alt is the business name. */
    alt: BUSINESS.name,
  },
  logoMark: {
    src: '/images/brand/qk-mark.svg',
    width: 64,
    height: 64,
    alt: BUSINESS.name,
  },
} as const;

// ─── Territory (Keystone Part 14: territory is a hard filter) ────────────────
// Build geo pages ONLY inside this area.
export const TERRITORY = {
  primaryCity: 'Brownsville',
  primaryCounty: 'Cameron County',
  counties: ['Cameron County', 'Willacy County', 'Hidalgo County'],
  regionLabel: 'the South Texas Gulf Coast',
  regionLabelLong: 'the Rio Grande Valley and the South Texas Gulf Coast',
  /** Anchor markets that get the deepest build. */
  anchors: ['Brownsville', 'Port Isabel', 'South Padre Island'],
  /** areaServed centroid for schema — the market center, not the (pending) office address. */
  centroid: { lat: 25.9017, lng: -97.4975 },
} as const;

/** Every pending field, for the verification harness + the client checklist. */
export function pendingFields(): string[] {
  const out: string[] = [];
  const walk = (obj: unknown, path: string) => {
    if (obj === null || obj === undefined) {
      out.push(path);
      return;
    }
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
        walk(v, path ? `${path}.${k}` : k);
      }
    }
  };
  walk(BUSINESS, '');
  return out;
}
