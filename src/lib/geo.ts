/**
 * GEO HELPER — derives differentiated copy and FAQs from town data so that even a
 * generated fallback is not identical across markets (Keystone 7A, 6.3).
 *
 * Keystone 12.3: "Build stops after a partial page set — a non-null assertion on
 * an optional data field." Nothing here uses `!`. Every path has a real fallback.
 */

import type { Town, WindZone } from '../data/towns';
import { TERRITORY } from '../data/business';

export const DIRECTION_WORD: Record<Town['direction'], string> = {
  N: 'north',
  NE: 'northeast',
  E: 'east',
  SE: 'southeast',
  S: 'south',
  SW: 'southwest',
  W: 'west',
  NW: 'northwest',
};

/** "22 miles northwest of Brownsville" — or the hub's own phrasing. */
export function distancePhrase(t: Town): string {
  if (t.distanceMi === 0) return `our home market`;
  return `${t.distanceMi} miles ${DIRECTION_WORD[t.direction]} of ${TERRITORY.primaryCity}`;
}

export function windZoneLabel(z: WindZone): string {
  switch (z) {
    case 'seaward':
      return 'the Seaward zone of the Texas designated catastrophe area';
    case 'inland-i':
      return 'the Inland I zone of the Texas designated catastrophe area';
    case 'inland-ii':
      return 'the Inland II zone of the Texas designated catastrophe area';
    case 'unverified':
      return 'inside the Texas designated catastrophe area';
    default:
      return 'outside the Texas designated catastrophe area';
  }
}

/** The single sentence that most differentiates a market's roofing story. */
export function windZoneSentence(t: Town): string {
  switch (t.windZone) {
    case 'seaward':
      return `${t.name} sits in ${windZoneLabel(t.windZone)}, which carries the highest design wind pressures in the region and the strictest documentation requirements for a roof assembly.`;
    case 'inland-i':
      return `${t.name} sits in ${windZoneLabel(t.windZone)}, so windstorm-compliant construction and a Certificate of Compliance still apply even though it is off the open water.`;
    case 'inland-ii':
      return `${t.name} sits in ${windZoneLabel(t.windZone)} — the lowest of the three Cameron County design tiers, but still inside the program, so a roof replacement here still needs to be inspected and certified.`;
    case 'unverified':
      return `${t.name} is in ${windZoneLabel(t.windZone)}, so windstorm certification applies. We do not publish a zone designation for this market until we have confirmed it against the Texas Department of Insurance map for ${t.county}.`;
    default:
      return `${t.name} is ${windZoneLabel(t.windZone)}, so the roofing conversation here is driven by hail, straight-line wind and manufacturer warranty terms rather than by windstorm certification.`;
  }
}

export function soilSentence(t: Town): string {
  if (!t.soils.length) {
    return `Soils around ${t.name} vary lot to lot, so the fill and compaction plan is set from the geotechnical report rather than from a rule of thumb.`;
  }
  if (t.soils.length === 1) {
    return `Ground around ${t.name} is dominated by ${t.soils[0]}, and that single fact drives the fill, moisture conditioning and compaction plan on almost every job here.`;
  }
  const list = `${t.soils.slice(0, -1).join(', ')} and ${t.soils[t.soils.length - 1]}`;
  return `Soils mapped around ${t.name} include ${list} — a mix that decides how much material has to be moved, conditioned and rolled before anything gets poured.`;
}

export function landmarkPhrase(t: Town, n = 3): string {
  const l = t.landmarks.slice(0, n);
  if (!l.length) return '';
  if (l.length === 1) return l[0] ?? '';
  return `${l.slice(0, -1).join(', ')} and ${l[l.length - 1]}`;
}

/**
 * Differentiated fallback FAQs. These are a floor, not a substitute for the
 * researched FAQ block a writer authors — every published page overrides them.
 */
export function genericLocal(t: Town): { question: string; answer: string }[] {
  return [
    {
      question: `Do you work in ${t.name}?`,
      answer: `Yes. ${t.name} is ${distancePhrase(t)} in ${t.county}, and it is inside the area we serve for both dirt work and roofing.`,
    },
    {
      question: `Does a roof in ${t.name} need windstorm certification?`,
      answer: windZoneSentence(t),
    },
    {
      question: `What kind of soil will you be working in around ${t.name}?`,
      answer: soilSentence(t),
    },
    {
      question: `What makes drainage difficult in ${t.name}?`,
      answer:
        t.floodContext ||
        `Relief across this part of the Valley is very flat, so site drainage has to be designed rather than assumed.`,
    },
  ];
}

/** Guarded accessors — never assert, always degrade to something true. */
export const siteworkAngle = (t: Town): string =>
  t.siteworkAngle ||
  `Sitework around ${t.name} starts with the soil report and the drainage plan, not with the equipment.`;

export const roofingAngle = (t: Town): string =>
  t.roofingAngle ||
  `Roofing around ${t.name} is specified for the wind zone the property actually sits in.`;

export const housingPhrase = (t: Town): string =>
  t.housing || `Housing stock in ${t.name} is mixed in age and construction type.`;
