/**
 * CONTENT COLLECTIONS — the 3,000–5,000-word bodies (mandate M1).
 *
 * Keystone 7A "data / body split": src/data/*.ts holds the facts that drive
 * ROUTING and SCHEMA. This layer holds the writing. A page is matched to its data
 * row by `id` (the file slug).
 *
 * ── CONTENT-GATED ROUTING ────────────────────────────────────────────────────
 * Routes enumerate THIS layer, not the data files. A town or service with no
 * markdown body simply has no page. That is deliberate: M1 forbids shipping an
 * indexable page under 3,000 words, and Keystone 6.3 is explicit that a thin geo
 * page is worse than no geo page. The link helpers in src/lib/links.ts only emit
 * links to entries that exist, so the lattice never contains a dead link.
 *
 * Bad data fails fast against these schemas — that is the point.
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faq = z.object({
  question: z.string().min(8),
  answer: z.string().min(40),
});

/** A cited source with a review date — required on compliance and legal claims (T8). */
const source = z.object({
  name: z.string(),
  url: z.string().url(),
  accessed: z.string(),
});

const image = z.object({
  src: z.string(),
  /** M6: alt formula — [what's shown] + [context] + [local], ≤125 chars, judged by sight. */
  alt: z.string().min(15).max(125),
  title: z.string().min(5).max(120),
  width: z.number().optional(),
  height: z.number().optional(),
  caption: z.string().optional(),
});

/** Fields every indexable page carries. Enforces M2/M4/M5 at the data layer. */
const base = {
  title: z.string(),
  /** M5: ≤60 chars, unique sitewide, keyword + city front-loaded. Validated in scripts/seo-audit.mjs. */
  metaTitle: z.string().max(60),
  /** M5: 110–165 chars, benefit + local + CTA, ends on punctuation. */
  metaDescription: z.string().min(110).max(165),
  /**
   * M2/M4: the AEO Quick Answer. 40–60 words, written to be quoted verbatim and
   * spoken aloud. Reused as the meta description source, the first FAQ answer and
   * the Speakable target. Word count is validated by the harness.
   */
  quickAnswer: z.string().min(180).max(520),
  /** 6–8 questions (Keystone 4.1 block 5). Exactly one FAQ block per URL. */
  faqs: z.array(faq).min(6).max(10),
  heroImage: image.optional(),
  images: z.array(image).default([]),
  sources: z.array(source).default([]),
  reviewedDate: z.string().optional(),
  datePublished: z.string(),
  dateModified: z.string().optional(),
  draft: z.boolean().default(false),
};

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    ...base,
    /** Must match a slug in src/data/services.ts */
    service: z.string(),
  }),
});

const problems = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/problems' }),
  schema: z.object({
    ...base,
    /** Parent service slug — drives the breadcrumb and the "up" link (M3). */
    parentService: z.string(),
  }),
});

const towns = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/towns' }),
  schema: z.object({
    ...base,
    /** Must match a slug in src/data/towns.ts */
    town: z.string(),
    /** Keystone Part 11 steal: community-embedded local proof, where it exists. */
    communityProof: z
      .object({
        heading: z.string(),
        body: z.string(),
        images: z.array(image).default([]),
      })
      .optional(),
  }),
});

const neighborhoods = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/neighborhoods' }),
  schema: z.object({
    ...base,
    town: z.string(),
    neighborhood: z.string(),
  }),
});

/** City × service matrix pages — /locations/{city}/{service}/ */
const matrix = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/matrix' }),
  schema: z.object({
    ...base,
    town: z.string(),
    service: z.string(),
  }),
});

const verticals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/verticals' }),
  schema: z.object({ ...base, vertical: z.string() }),
});

const compliance = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/compliance' }),
  schema: z.object({
    ...base,
    topic: z.string(),
    /** T8 requires a source citation AND a visible review date. Not optional here. */
    sources: z.array(source).min(1),
    reviewedDate: z.string(),
  }),
});

/** The materials & methods library — topical-authority backbone (Keystone 3.4 #7). */
const library = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/library' }),
  schema: z.object({
    ...base,
    category: z.enum(['roof-system', 'soil-and-material', 'equipment', 'method']),
    /** The service spoke this profile hangs off. */
    parentService: z.string(),
  }),
});

/** T9 — the highest-trust asset in the system. Honest schema only (Appendix H). */
const casestudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    ...base,
    town: z.string(),
    service: z.string(),
    propertyType: z.string(),
    method: z.string(),
    outcome: z.string(),
    /** Keystone Part 14: no client name published without written permission. */
    clientNamePermitted: z.boolean().default(false),
  }),
});

/** Standalone pages whose body is authored rather than templated. */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ ...base, path: z.string() }),
});

export const collections = {
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
};
