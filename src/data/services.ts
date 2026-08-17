/**
 * SERVICE DATA — the routing + schema spine for /services/.
 *
 * Keystone Part 14: "Never invent services or verticals." Every row below is
 * traceable to the client's QK CORE brief. Nothing has been added.
 *
 * Source list (QK CORE 2):
 *  Dirt work — residential & commercial building pads · dirt pad foundations ·
 *  site clearing and preparation · excavation · grading and leveling · cut and
 *  fill · import/export of fill material · trenching · backfilling · compaction ·
 *  drainage and site shaping · road and driveway preparation · utility
 *  excavation · large-scale earthmoving · commercial and industrial site development
 *  Roofing — asphalt shingle · standing seam metal · R-panel / exposed-fastener
 *  metal · flat and low-slope · TPO · modified bitumen · roof replacements · new
 *  construction roofing · roof repairs · leak detection and repair · storm and
 *  wind damage repairs · roof decking and structural repairs · flashing and
 *  penetration repairs · commercial · residential · preventative maintenance
 */

export type Division = 'dirt-work' | 'roofing';

export interface Service {
  slug: string;
  division: Division;
  /** H1 / page name. City is prepended on city×service pages. */
  name: string;
  /** Short label for nav, grids and internal links. */
  navLabel: string;
  /** schema.org Service.serviceType */
  serviceType: string;
  /** One-line grid blurb. Never used as body copy. */
  blurb: string;
  /** Money service — gets a city×service matrix page in anchor markets. */
  money: boolean;
  /** Sibling slugs for lateral wiring (M3). */
  siblings: string[];
  /** Problem micro-page slugs hanging off this spoke. */
  problems: string[];
  /** Search-intent keyword the Title front-loads (with city). */
  headTerm: string;
}

export const SERVICES: Service[] = [
  // ── DIRT WORK & SITE PREPARATION ───────────────────────────────────────────
  {
    slug: 'site-preparation',
    division: 'dirt-work',
    name: 'Site Preparation',
    navLabel: 'Site Preparation',
    serviceType: 'Construction site preparation',
    blurb:
      'Clearing, stripping, rough grading and staking that turn raw ground into a buildable site.',
    money: true,
    siblings: ['land-clearing', 'building-pads', 'grading-and-leveling', 'commercial-site-development'],
    problems: ['clearing-mesquite-and-brush', 'building-on-a-caliche-lens'],
    headTerm: 'site preparation',
  },
  {
    slug: 'building-pads',
    division: 'dirt-work',
    name: 'Residential & Commercial Building Pads',
    navLabel: 'Building Pads',
    serviceType: 'Building pad construction',
    blurb:
      'Engineered dirt pads built to elevation, moisture-conditioned and compaction-tested before a foundation is poured.',
    money: true,
    siblings: ['compaction', 'cut-and-fill', 'fill-dirt-hauling', 'site-preparation'],
    problems: [
      'building-pad-settlement-in-clay-soil',
      'how-high-should-a-building-pad-be',
      'pad-elevation-and-flood-zones',
    ],
    headTerm: 'building pads',
  },
  {
    slug: 'land-clearing',
    division: 'dirt-work',
    name: 'Land Clearing & Site Clearing',
    navLabel: 'Land Clearing',
    serviceType: 'Land clearing',
    blurb:
      'Brush, mesquite, stumps, slabs and debris removed and hauled so the site is clean to grade.',
    money: true,
    siblings: ['site-preparation', 'excavation', 'grading-and-leveling'],
    problems: ['clearing-mesquite-and-brush', 'demolition-debris-disposal'],
    headTerm: 'land clearing',
  },
  {
    slug: 'excavation',
    division: 'dirt-work',
    name: 'Excavation',
    navLabel: 'Excavation',
    serviceType: 'Excavation',
    blurb:
      'Mass and structural excavation, basements, footings, ponds and detention — cut to line and grade.',
    money: true,
    siblings: ['trenching', 'utility-excavation', 'cut-and-fill', 'large-scale-earthmoving'],
    problems: ['excavating-below-the-water-table', 'trench-safety-and-shoring'],
    headTerm: 'excavation',
  },
  {
    slug: 'grading-and-leveling',
    division: 'dirt-work',
    name: 'Grading & Leveling',
    navLabel: 'Grading & Leveling',
    serviceType: 'Land grading',
    blurb:
      'Rough and finish grading to design slope, so water leaves the site the way the plan says it should.',
    money: true,
    siblings: ['drainage-and-site-shaping', 'site-preparation', 'cut-and-fill'],
    problems: ['negative-drainage-around-a-slab', 'finish-grade-vs-rough-grade'],
    headTerm: 'grading',
  },
  {
    slug: 'cut-and-fill',
    division: 'dirt-work',
    name: 'Cut & Fill',
    navLabel: 'Cut & Fill',
    serviceType: 'Cut and fill earthwork',
    blurb:
      'Balanced earthwork that moves material on site instead of paying to haul it twice.',
    money: false,
    siblings: ['excavation', 'grading-and-leveling', 'fill-dirt-hauling', 'large-scale-earthmoving'],
    problems: ['balancing-a-site-to-avoid-import'],
    headTerm: 'cut and fill',
  },
  {
    slug: 'fill-dirt-hauling',
    division: 'dirt-work',
    name: 'Import & Export of Fill Material',
    navLabel: 'Fill Dirt & Hauling',
    serviceType: 'Fill material supply and hauling',
    blurb:
      'Select fill, caliche base, sand and topsoil hauled in — or spoil hauled out — with the tickets to prove it.',
    money: false,
    siblings: ['building-pads', 'cut-and-fill', 'compaction'],
    problems: ['select-fill-vs-caliche-vs-bank-sand'],
    headTerm: 'fill dirt',
  },
  {
    slug: 'trenching',
    division: 'dirt-work',
    name: 'Trenching',
    navLabel: 'Trenching',
    serviceType: 'Trenching',
    blurb:
      'Straight, spec-depth trenches for water, sewer, storm, electrical, gas and irrigation.',
    money: false,
    siblings: ['utility-excavation', 'backfilling', 'excavation'],
    problems: ['trench-safety-and-shoring'],
    headTerm: 'trenching',
  },
  {
    slug: 'backfilling',
    division: 'dirt-work',
    name: 'Backfilling',
    navLabel: 'Backfilling',
    serviceType: 'Backfilling',
    blurb:
      'Lift-by-lift backfill and compaction around structures, utilities and retaining walls.',
    money: false,
    siblings: ['trenching', 'compaction', 'utility-excavation'],
    problems: ['backfill-settlement-over-utility-lines'],
    headTerm: 'backfilling',
  },
  {
    slug: 'compaction',
    division: 'dirt-work',
    name: 'Compaction & Density Testing',
    navLabel: 'Compaction',
    serviceType: 'Soil compaction',
    blurb:
      'Moisture-conditioned lifts rolled to a specified density — the step that decides whether a slab cracks.',
    money: true,
    siblings: ['building-pads', 'backfilling', 'fill-dirt-hauling'],
    problems: [
      'building-pad-settlement-in-clay-soil',
      'what-is-95-percent-standard-proctor',
    ],
    headTerm: 'soil compaction',
  },
  {
    slug: 'drainage-and-site-shaping',
    division: 'dirt-work',
    name: 'Drainage & Site Shaping',
    navLabel: 'Drainage',
    serviceType: 'Site drainage',
    blurb:
      'Swales, ditches, detention, culverts and positive fall — engineered so the site sheds water.',
    money: true,
    siblings: ['grading-and-leveling', 'excavation', 'commercial-site-development'],
    problems: [
      'negative-drainage-around-a-slab',
      'standing-water-after-heavy-rain',
      'resaca-adjacent-drainage',
    ],
    headTerm: 'drainage',
  },
  {
    slug: 'road-and-driveway-preparation',
    division: 'dirt-work',
    name: 'Road & Driveway Preparation',
    navLabel: 'Roads & Driveways',
    serviceType: 'Road and driveway base preparation',
    blurb:
      'Subgrade, caliche base and crown built for ranch roads, driveways, yards and access routes.',
    money: true,
    siblings: ['compaction', 'site-preparation', 'commercial-site-development'],
    problems: ['caliche-driveway-washboarding', 'ranch-road-that-turns-to-mud'],
    headTerm: 'driveway preparation',
  },
  {
    slug: 'utility-excavation',
    division: 'dirt-work',
    name: 'Utility Excavation',
    navLabel: 'Utility Excavation',
    serviceType: 'Utility excavation',
    blurb:
      'Wet and dry utility trench, bedding, backfill and tie-in — located, marked and inspected.',
    money: false,
    siblings: ['trenching', 'backfilling', 'excavation'],
    problems: ['811-locates-and-hitting-a-line'],
    headTerm: 'utility excavation',
  },
  {
    slug: 'large-scale-earthmoving',
    division: 'dirt-work',
    name: 'Large-Scale Earthmoving',
    navLabel: 'Earthmoving',
    serviceType: 'Bulk earthmoving',
    blurb:
      'Thousands of yards moved on schedule with scrapers, dozers, excavators and haul trucks.',
    money: false,
    siblings: ['cut-and-fill', 'commercial-site-development', 'excavation'],
    problems: ['balancing-a-site-to-avoid-import'],
    headTerm: 'earthmoving',
  },
  {
    slug: 'commercial-site-development',
    division: 'dirt-work',
    name: 'Commercial & Industrial Site Development',
    navLabel: 'Site Development',
    serviceType: 'Commercial site development',
    blurb:
      'Full site packages — clearing through final grade — for warehouses, yards, plants and pads.',
    money: true,
    siblings: [
      'site-preparation',
      'drainage-and-site-shaping',
      'road-and-driveway-preparation',
      'large-scale-earthmoving',
    ],
    problems: ['sequencing-sitework-around-a-construction-schedule'],
    headTerm: 'commercial site development',
  },

  // ── ROOFING ────────────────────────────────────────────────────────────────
  {
    slug: 'roof-replacement',
    division: 'roofing',
    name: 'Roof Replacement',
    navLabel: 'Roof Replacement',
    serviceType: 'Roof replacement',
    blurb:
      'Full tear-off, decking repair and a new assembly installed to the manufacturer and windstorm spec.',
    money: true,
    siblings: ['roof-repair', 'metal-roofing', 'asphalt-shingle-roofing', 'roof-decking-and-structural-repairs'],
    problems: [
      'repair-or-replace-my-roof',
      'how-long-does-a-roof-last-on-the-coast',
      'roof-replacement-and-windstorm-certification',
    ],
    headTerm: 'roof replacement',
  },
  {
    slug: 'roof-repair',
    division: 'roofing',
    name: 'Roof Repairs',
    navLabel: 'Roof Repair',
    serviceType: 'Roof repair',
    blurb:
      'Targeted repairs to shingles, panels, membrane, flashing and penetrations — diagnosed before they are quoted.',
    money: true,
    siblings: ['leak-detection-and-repair', 'storm-and-wind-damage-repairs', 'flashing-and-penetration-repairs'],
    problems: ['repair-or-replace-my-roof', 'roof-leak-only-when-it-rains-hard'],
    headTerm: 'roof repair',
  },
  {
    slug: 'metal-roofing',
    division: 'roofing',
    name: 'Standing Seam & R-Panel Metal Roofing',
    navLabel: 'Metal Roofing',
    serviceType: 'Metal roof installation',
    blurb:
      'Concealed-fastener standing seam and exposed-fastener R-panel, specified for coastal wind and salt.',
    money: true,
    siblings: ['roof-replacement', 'commercial-roofing', 'new-construction-roofing'],
    problems: [
      'standing-seam-vs-r-panel',
      'metal-roof-corrosion-near-salt-water',
      'metal-roof-oil-canning',
    ],
    headTerm: 'metal roofing',
  },
  {
    slug: 'asphalt-shingle-roofing',
    division: 'roofing',
    name: 'Asphalt Shingle Roofing',
    navLabel: 'Shingle Roofing',
    serviceType: 'Asphalt shingle roof installation',
    blurb:
      'Architectural and impact-rated shingle systems installed to the high-wind nailing pattern.',
    money: true,
    siblings: ['roof-replacement', 'residential-roofing', 'storm-and-wind-damage-repairs'],
    problems: [
      'shingles-blowing-off-in-gulf-wind',
      'impact-resistant-shingles-worth-it',
      'high-wind-nailing-pattern',
    ],
    headTerm: 'shingle roofing',
  },
  {
    slug: 'flat-and-low-slope-roofing',
    division: 'roofing',
    name: 'Flat & Low-Slope Roofing',
    navLabel: 'Flat & Low-Slope',
    serviceType: 'Low-slope roof installation',
    blurb:
      'TPO, modified bitumen and coating systems for low-slope commercial and residential decks.',
    money: true,
    siblings: ['tpo-roofing', 'modified-bitumen-roofing', 'commercial-roofing'],
    problems: ['ponding-water-on-a-flat-roof', 'flat-roof-slope-requirements'],
    headTerm: 'flat roofing',
  },
  {
    slug: 'tpo-roofing',
    division: 'roofing',
    name: 'TPO Roofing',
    navLabel: 'TPO',
    serviceType: 'TPO membrane roof installation',
    blurb:
      'Mechanically attached and adhered TPO single-ply — heat-welded seams, reflective in a 2A climate.',
    money: false,
    siblings: ['flat-and-low-slope-roofing', 'modified-bitumen-roofing', 'commercial-roofing'],
    problems: ['tpo-vs-modified-bitumen', 'tpo-seam-failure'],
    headTerm: 'TPO roofing',
  },
  {
    slug: 'modified-bitumen-roofing',
    division: 'roofing',
    name: 'Modified Bitumen Roofing',
    navLabel: 'Modified Bitumen',
    serviceType: 'Modified bitumen roof installation',
    blurb:
      'Two- and three-ply mod-bit systems where a tough, redundant low-slope membrane is the right call.',
    money: false,
    siblings: ['flat-and-low-slope-roofing', 'tpo-roofing', 'commercial-roofing'],
    problems: ['tpo-vs-modified-bitumen'],
    headTerm: 'modified bitumen roofing',
  },
  {
    slug: 'commercial-roofing',
    division: 'roofing',
    name: 'Commercial Roofing',
    navLabel: 'Commercial Roofing',
    serviceType: 'Commercial roofing',
    blurb:
      'Warehouse, retail, institutional and industrial roofs — phased so the building keeps operating.',
    money: true,
    siblings: ['flat-and-low-slope-roofing', 'metal-roofing', 'preventative-roof-maintenance'],
    problems: ['reroofing-an-occupied-building', 'roof-asset-management-plan'],
    headTerm: 'commercial roofing',
  },
  {
    slug: 'residential-roofing',
    division: 'roofing',
    name: 'Residential Roofing',
    navLabel: 'Residential Roofing',
    serviceType: 'Residential roofing',
    blurb:
      'Homes, from a single slope repair to a full windstorm-certified replacement.',
    money: true,
    siblings: ['asphalt-shingle-roofing', 'roof-replacement', 'metal-roofing'],
    problems: ['repair-or-replace-my-roof', 'roof-replacement-and-windstorm-certification'],
    headTerm: 'residential roofing',
  },
  {
    slug: 'storm-and-wind-damage-repairs',
    division: 'roofing',
    name: 'Storm & Wind Damage Repairs',
    navLabel: 'Storm Damage',
    serviceType: 'Storm damage roof repair',
    blurb:
      'Post-storm assessment, documentation and permanent repair — tarps first when the weather demands it.',
    money: true,
    siblings: ['roof-repair', 'roof-decking-and-structural-repairs', 'leak-detection-and-repair'],
    problems: [
      'shingles-blowing-off-in-gulf-wind',
      'hail-damage-or-just-old-roof',
      'what-to-do-after-a-hurricane-damages-your-roof',
    ],
    headTerm: 'storm damage roof repair',
  },
  {
    slug: 'leak-detection-and-repair',
    division: 'roofing',
    name: 'Leak Detection & Repair',
    navLabel: 'Leak Detection',
    serviceType: 'Roof leak detection',
    blurb:
      'Systematic leak tracing — water test, infrared where it helps, and a repair aimed at the actual source.',
    money: true,
    siblings: ['roof-repair', 'flashing-and-penetration-repairs', 'preventative-roof-maintenance'],
    problems: ['roof-leak-only-when-it-rains-hard', 'ceiling-stain-far-from-the-leak'],
    headTerm: 'roof leak repair',
  },
  {
    slug: 'roof-decking-and-structural-repairs',
    division: 'roofing',
    name: 'Roof Decking & Structural Repairs',
    navLabel: 'Decking & Structure',
    serviceType: 'Roof deck and structural repair',
    blurb:
      'Rotted decking, failed fasteners, sagging purlins and damaged framing corrected before the new roof goes on.',
    money: false,
    siblings: ['roof-replacement', 'storm-and-wind-damage-repairs', 'roof-repair'],
    problems: ['soft-spots-in-a-roof-deck'],
    headTerm: 'roof decking repair',
  },
  {
    slug: 'flashing-and-penetration-repairs',
    division: 'roofing',
    name: 'Flashing & Penetration Repairs',
    navLabel: 'Flashing',
    serviceType: 'Roof flashing repair',
    blurb:
      'Walls, curbs, pipes, vents and skylights — where most roofs actually leak.',
    money: false,
    siblings: ['leak-detection-and-repair', 'roof-repair', 'preventative-roof-maintenance'],
    problems: ['most-roof-leaks-start-at-flashing'],
    headTerm: 'roof flashing repair',
  },
  {
    slug: 'new-construction-roofing',
    division: 'roofing',
    name: 'New Construction Roofing',
    navLabel: 'New Construction',
    serviceType: 'New construction roofing',
    blurb:
      'Dry-in through final roof for builders, on the schedule the rest of the trades are working to.',
    money: false,
    siblings: ['metal-roofing', 'commercial-roofing', 'roof-replacement'],
    problems: ['dry-in-timing-on-a-new-build'],
    headTerm: 'new construction roofing',
  },
  {
    slug: 'preventative-roof-maintenance',
    division: 'roofing',
    name: 'Preventative Roof Maintenance',
    navLabel: 'Roof Maintenance',
    serviceType: 'Preventative roof maintenance',
    blurb:
      'Scheduled inspection, sealant renewal, drain clearing and documentation that keeps warranties alive.',
    money: true,
    siblings: ['commercial-roofing', 'leak-detection-and-repair', 'flashing-and-penetration-repairs'],
    problems: ['roof-asset-management-plan', 'does-maintenance-void-or-save-a-warranty'],
    headTerm: 'roof maintenance',
  },
];

export const DIVISIONS = {
  'dirt-work': {
    slug: 'dirt-work',
    name: 'Dirt Work & Site Preparation',
    short: 'Dirt Work',
    blurb:
      'From a single residential pad to large-scale commercial and industrial earthwork.',
  },
  roofing: {
    slug: 'roofing',
    name: 'Complete Roofing Solutions',
    short: 'Roofing',
    blurb:
      'A single-source roofing contractor across residential and commercial systems.',
  },
} as const;

export const byDivision = (d: Division) => SERVICES.filter((s) => s.division === d);
export const moneyServices = () => SERVICES.filter((s) => s.money);
export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const serviceSlugs = () => SERVICES.map((s) => s.slug);
