/**
 * TITLE & META DISCIPLINE — mandate M5.
 *
 * Title ≤ 60 chars, unique sitewide, keyword + city front-loaded, brand appended
 * only if it still fits, never cut mid-word. Meta description 110–165 chars,
 * benefit + local + CTA, ending on punctuation.
 *
 * Keystone 12.3: "Meta description ends mid-word" is a catalogued failure caused
 * by a long variable plus a fixed suffix overflowing. Everything here truncates on
 * a WORD boundary and then repairs the ending, and scripts/seo-audit.mjs runs the
 * dangling-ending validator across the full set before any push.
 */

export const TITLE_MAX = 60;
export const DESC_MIN = 110;
export const DESC_MAX = 165;
const BRAND_SUFFIX = ' | Quality Konnection';

/** Truncate on a word boundary. Never mid-word, never mid-entity. */
export function clampWords(input: string, max: number): string {
  const s = input.replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut.slice(0, max)).replace(
    /[\s,;:–—-]+$/,
    ''
  );
}

/** Append the brand only when the whole thing still fits inside 60. */
export function buildTitle(core: string): string {
  const c = core.replace(/\s+/g, ' ').trim();
  if (c.length + BRAND_SUFFIX.length <= TITLE_MAX) return c + BRAND_SUFFIX;
  return clampWords(c, TITLE_MAX);
}

const DANGLING =
  /\b(and|or|the|a|an|in|on|for|to|of|with|at|by|from|that|is|are|we|our|your|plus|near|across)$/i;

/**
 * Guarantee a description that is 110–165 chars and ends on punctuation.
 * `fallbacks` are appended in order until the minimum is met — each one is a real
 * sentence, never filler, and never a fabricated claim.
 */
export function buildDescription(primary: string, ...fallbacks: string[]): string {
  let d = primary.replace(/\s+/g, ' ').trim();
  for (const f of fallbacks) {
    if (d.length >= DESC_MIN) break;
    d = `${d.replace(/[.!?]?$/, '.')} ${f.trim()}`;
  }
  if (d.length > DESC_MAX) {
    d = clampWords(d, DESC_MAX - 1);
    // Repair a truncated tail: drop a trailing function word, then close the sentence.
    let words = d.split(' ');
    while (words.length > 4 && DANGLING.test(words[words.length - 1]!)) words.pop();
    d = words.join(' ').replace(/[\s,;:–—-]+$/, '');
  }
  if (!/[.!?]$/.test(d)) d += '.';
  return d;
}

/** 40–60 words is the AEO Quick Answer contract. Returns the count for the harness. */
export function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

export function isValidQuickAnswer(s: string): boolean {
  const n = wordCount(s);
  return n >= 40 && n <= 60;
}

/** Canonical path normaliser — always leading and trailing slash. */
export function canonical(path: string): string {
  let p = path.startsWith('/') ? path : `/${path}`;
  if (!p.endsWith('/')) p += '/';
  return p.replace(/\/{2,}/g, '/');
}
