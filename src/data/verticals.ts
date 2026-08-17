/**
 * COMMERCIAL VERTICALS — /commercial/{vertical}/
 * Keystone T7. Keystone Part 14: never invent a vertical the client does not
 * serve. Every row below is a building type covered by the QK CORE scope
 * ("residential, commercial, and industrial projects") and is grounded in a real
 * South Texas Gulf Coast demand driver.
 */

export interface Vertical {
  slug: string;
  name: string;
  navLabel: string;
  /** The regulatory or operational stake — T7 block 1. */
  stake: string;
  blurb: string;
  /** Service slugs this vertical draws on, for lateral wiring. */
  services: string[];
  /** Markets where this vertical actually exists locally. */
  markets: string[];
}

export const VERTICALS: Vertical[] = [
  {
    slug: 'warehouse-and-distribution',
    name: 'Warehouse & Distribution Facilities',
    navLabel: 'Warehouse & Distribution',
    stake:
      'Large-format roofs and truck-court pavement subgrade, where a failure stops freight rather than inconveniencing a tenant.',
    blurb:
      'Site packages and large-format roof systems for cross-dock, cold-chain and freight-corridor facilities.',
    services: ['commercial-site-development', 'commercial-roofing', 'metal-roofing', 'flat-and-low-slope-roofing'],
    markets: ['brownsville', 'olmito', 'los-indios', 'donna', 'harlingen'],
  },
  {
    slug: 'industrial-and-port',
    name: 'Industrial & Port Facilities',
    navLabel: 'Industrial & Port',
    stake:
      'Heavy loading, corrosive atmosphere and continuous operation — specs that ordinary commercial assemblies do not survive.',
    blurb:
      'Heavy-duty pads, laydown yards and corrosion-rated roof assemblies for port and industrial operators.',
    services: ['large-scale-earthmoving', 'commercial-site-development', 'metal-roofing', 'preventative-roof-maintenance'],
    markets: ['brownsville', 'port-isabel', 'olmito'],
  },
  {
    slug: 'retail-and-restaurant',
    name: 'Retail & Restaurant',
    navLabel: 'Retail & Restaurant',
    stake:
      'Roof work over an operating dining room or sales floor, plus parking and drainage that has to pass a city site plan.',
    blurb:
      'Pad sites, parking subgrade and low-slope roofing phased around business hours.',
    services: ['commercial-site-development', 'flat-and-low-slope-roofing', 'tpo-roofing', 'drainage-and-site-shaping'],
    markets: ['brownsville', 'harlingen', 'weslaco', 'mercedes'],
  },
  {
    slug: 'multifamily-and-apartments',
    name: 'Multifamily & Apartments',
    navLabel: 'Multifamily',
    stake:
      'Occupied-building reroofing with residents in place, and a windstorm certificate the insurer will actually accept.',
    blurb:
      'Phased apartment and condominium reroofing plus full site development for new multifamily.',
    services: ['roof-replacement', 'commercial-roofing', 'commercial-site-development', 'asphalt-shingle-roofing'],
    markets: ['brownsville', 'harlingen', 'south-padre-island', 'port-isabel'],
  },
  {
    slug: 'agricultural-and-ranch',
    name: 'Agricultural & Ranch Buildings',
    navLabel: 'Agricultural & Ranch',
    stake:
      'Long spans, exposed-fastener metal and ranch roads that have to survive a wet season without a maintenance crew.',
    blurb:
      'Barns, equipment sheds, grain facilities, ranch roads, pads and stock-water shaping.',
    services: ['road-and-driveway-preparation', 'metal-roofing', 'land-clearing', 'drainage-and-site-shaping'],
    markets: ['los-fresnos', 'rio-hondo', 'raymondville', 'la-feria', 'sebastian', 'lyford'],
  },
  {
    slug: 'hospitality-and-rv-resorts',
    name: 'Hospitality & RV Resorts',
    navLabel: 'Hospitality & RV',
    stake:
      'A seasonal revenue window that closes hard, and coastal exposure that punishes an under-specified assembly.',
    blurb:
      'Hotels, condominium towers, RV resorts and winter-Texan parks — scheduled around the season.',
    services: ['commercial-roofing', 'flat-and-low-slope-roofing', 'roof-replacement', 'commercial-site-development'],
    markets: ['south-padre-island', 'port-isabel', 'laguna-vista', 'mercedes', 'harlingen'],
  },
  {
    slug: 'medical-and-institutional',
    name: 'Medical & Institutional',
    navLabel: 'Medical & Institutional',
    stake:
      'Infection-control and continuity-of-operations requirements on top of the roof itself, with documentation to match.',
    blurb:
      'Clinics, medical office, schools and municipal facilities — documented, phased and inspected.',
    services: ['commercial-roofing', 'preventative-roof-maintenance', 'tpo-roofing', 'commercial-site-development'],
    markets: ['brownsville', 'harlingen', 'weslaco', 'san-benito'],
  },
  {
    slug: 'builders-and-general-contractors',
    name: 'Builders & General Contractors',
    navLabel: 'Builders & GCs',
    stake:
      'Schedule. A pad that is late or a dry-in that slips moves every trade behind it.',
    blurb:
      'Subcontract dirt work and new-construction roofing for builders working to a hard schedule.',
    services: ['building-pads', 'site-preparation', 'new-construction-roofing', 'compaction'],
    markets: ['brownsville', 'harlingen', 'los-fresnos', 'san-benito', 'rancho-viejo'],
  },
];

export const getVertical = (slug: string) => VERTICALS.find((v) => v.slug === slug);
