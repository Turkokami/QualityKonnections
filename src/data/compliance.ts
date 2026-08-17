/**
 * COMPLIANCE & CODE PAGES — /compliance/{topic}/
 * Keystone Part 3.4 #5 and T8: "Enormous trust signal; almost no competitor
 * builds it." This is the blue-ocean cluster for the South Texas Gulf Coast,
 * where windstorm certification and flood elevation genuinely govern the work.
 *
 * ⚠ Keystone doctrine #6 + T8: every one of these pages must state the rule
 * plainly, cite its primary source, and carry a visible review date. NOTHING on
 * these pages may imply Quality Konnection issues certificates, performs
 * regulatory inspections, or holds a credential it does not hold
 * (Keystone Part 14 — credentials are hard boundaries).
 */

export interface ComplianceTopic {
  slug: string;
  name: string;
  navLabel: string;
  /** One-line statement of the rule. */
  rule: string;
  /** Who it applies to. */
  appliesTo: string;
  /** Primary source that MUST be cited and linked on the page. */
  source: { name: string; url: string };
  /** Service slugs this topic governs. */
  services: string[];
  /** Markets where it bites hardest. */
  markets: string[];
  /** Hard boundary the copy may not cross. */
  boundary: string;
}

export const COMPLIANCE: ComplianceTopic[] = [
  {
    slug: 'windstorm-certification-wpi-8',
    name: 'Windstorm Certification (WPI-8) on the Texas Coast',
    navLabel: 'Windstorm Certification',
    rule:
      'In the Texas designated catastrophe area, a WPI-1 application must be filed with the Texas Department of Insurance BEFORE work begins, and the completed work must be inspected and certified before TDI will issue a Certificate of Compliance (WPI-8). Roof repairs under 100 square feet that do not touch decking or framing members are exempt; a full roof replacement is not.',
    appliesTo:
      'Property owners in Cameron and Willacy counties who need or want Texas Windstorm Insurance Association coverage.',
    source: {
      name: 'Texas Department of Insurance — Windstorm inspections',
      url: 'https://www.tdi.texas.gov/wind/index.html',
    },
    services: ['roof-replacement', 'residential-roofing', 'commercial-roofing', 'metal-roofing'],
    markets: ['brownsville', 'south-padre-island', 'port-isabel', 'harlingen', 'san-benito', 'los-fresnos'],
    boundary:
      'Quality Konnection installs to the certifiable specification and coordinates the inspection. The certificate is issued by TDI, on the certification of a TDI-employed inspector, a TDI appointed qualified inspector, or a Texas-licensed professional engineer — never by the contractor. A contractor cannot self-certify, and no page on this site may suggest otherwise.',
  },
  {
    slug: 'twia-coverage-requirements',
    name: 'TWIA Coverage Requirements for Coastal Roofs',
    navLabel: 'TWIA Requirements',
    rule:
      'The Texas Windstorm Insurance Association requires evidence of compliant construction before it will write or continue windstorm coverage on a structure in the designated catastrophe area.',
    appliesTo:
      'Owners and buyers of coastal property who cannot obtain windstorm coverage on the standard market.',
    source: {
      name: 'Texas Windstorm Insurance Association',
      url: 'https://www.twia.org/',
    },
    services: ['roof-replacement', 'residential-roofing', 'storm-and-wind-damage-repairs'],
    markets: ['south-padre-island', 'port-isabel', 'laguna-vista', 'bayview', 'port-mansfield'],
    boundary:
      'We are a roofing contractor, not an insurance agent or adjuster. Coverage decisions, claim outcomes and policy terms are between the owner, their agent and TWIA.',
  },
  {
    slug: 'seaward-vs-inland-wind-zones',
    name: 'Seaward vs. Inland Wind Zones — What Changes in the Spec',
    navLabel: 'Wind Zones',
    rule:
      'The designated catastrophe area is divided into Seaward, Inland I and Inland II zones along a legally defined boundary line — not a distance from the water. In Cameron County the line runs along U.S. Highway 77, and the City of Brownsville is assigned Inland I status regardless of which side of it the city falls on.',
    appliesTo: 'Anyone building or reroofing in Cameron or Willacy County.',
    source: {
      name: 'Texas Department of Insurance — Windstorm building code requirements',
      url: 'https://www.tdi.texas.gov/wind/documents/wind-zones.pdf',
    },
    services: ['roof-replacement', 'metal-roofing', 'asphalt-shingle-roofing', 'flat-and-low-slope-roofing'],
    markets: ['south-padre-island', 'port-isabel', 'laguna-vista', 'brownsville', 'harlingen'],
    boundary:
      'Zone boundaries are set by TDI. The three-zone scheme and its familiar 110/120/130 mph figures come from the 2003 and 2006 code cycles; for work permitted today the design wind speed is determined per structure under ASCE 7. This page explains the framework — it does not assign a design speed to your building, and no number on this site should be used in place of the engineer of record.',
  },
  {
    slug: 'fema-flood-elevation-and-pad-height',
    name: 'FEMA Flood Elevation & How High Your Pad Has to Be',
    navLabel: 'Flood Elevation',
    rule:
      'In a mapped Special Flood Hazard Area, the lowest floor of a new or substantially improved structure must be elevated to or above the base flood elevation, plus any local freeboard the community requires.',
    appliesTo:
      'Anyone building on low ground in Cameron, Willacy or eastern Hidalgo County — which is most of it.',
    source: {
      name: 'FEMA Flood Map Service Center',
      url: 'https://msc.fema.gov/portal/home',
    },
    services: ['building-pads', 'fill-dirt-hauling', 'compaction', 'drainage-and-site-shaping'],
    markets: ['brownsville', 'port-isabel', 'south-padre-island', 'bayview', 'los-fresnos', 'laguna-heights'],
    boundary:
      'We build the pad to the elevation the surveyor and the floodplain administrator specify. We do not set base flood elevations, issue elevation certificates, or make floodplain determinations.',
  },
  {
    slug: 'cameron-county-permits',
    name: 'Cameron County Permits for Sitework & Roofing',
    navLabel: 'Cameron County Permits',
    rule:
      'Construction in unincorporated Cameron County, and in each incorporated city, requires permitting through the applicable authority before work begins — including floodplain development permits where they apply.',
    appliesTo: 'Owners and builders anywhere in Cameron County.',
    source: {
      name: 'Cameron County, Texas',
      url: 'https://www.cameroncountytx.gov/',
    },
    services: ['site-preparation', 'building-pads', 'roof-replacement', 'commercial-site-development'],
    markets: ['brownsville', 'los-fresnos', 'bayview', 'indian-lake', 'olmito'],
    boundary:
      'Permit requirements change. Confirm current requirements with the county or city before relying on anything on this page; this page carries a review date for that reason.',
  },
  {
    slug: 'drainage-district-and-irrigation-canal-crossings',
    name: 'Drainage District & Irrigation Canal Rules in the Valley',
    navLabel: 'Drainage & Canals',
    rule:
      'Discharging site drainage into, or crossing, a drainage-district or irrigation-district facility requires that district’s approval, and the district controls the elevation and method of the connection.',
    appliesTo:
      'Anyone developing land in the Valley — the canal and drain grid is nearly everywhere.',
    source: {
      name: 'Cameron County Drainage District No. 1',
      url: 'https://www.ccdd1.org/',
    },
    services: ['drainage-and-site-shaping', 'commercial-site-development', 'grading-and-leveling', 'trenching'],
    markets: ['harlingen', 'san-benito', 'la-feria', 'rio-hondo', 'weslaco', 'mercedes'],
    boundary:
      'District approvals are issued by the district. We design the site work around them and coordinate the submittal.',
  },
  {
    slug: 'texas-roofing-contractor-rules',
    name: 'How Texas Regulates Roofing Contractors — and What That Means for You',
    navLabel: 'Contractor Rules',
    rule:
      'Texas does not require a statewide license to perform roofing work, which puts the burden of vetting insurance, certification and track record on the property owner.',
    appliesTo: 'Every Texas property owner hiring a roofer, especially after a storm.',
    source: {
      name: 'Texas Department of Licensing and Regulation',
      url: 'https://www.tdlr.texas.gov/',
    },
    services: ['roof-replacement', 'storm-and-wind-damage-repairs', 'roof-repair'],
    markets: ['brownsville', 'harlingen', 'san-benito', 'weslaco'],
    boundary:
      'This page explains the regulatory landscape as of its review date. It is not legal advice, and it must not imply that Quality Konnection holds a state roofing license that Texas does not issue.',
  },
  {
    slug: 'stormwater-and-erosion-control',
    name: 'Stormwater Permits & Erosion Control on Texas Job Sites',
    navLabel: 'Stormwater & Erosion',
    rule:
      'Construction disturbing one or more acres generally requires authorization under the TCEQ construction general permit, along with a stormwater pollution prevention plan and erosion controls maintained on site.',
    appliesTo: 'Commercial and industrial site development, and larger residential subdivisions.',
    source: {
      name: 'Texas Commission on Environmental Quality — Construction Stormwater',
      url: 'https://www.tceq.texas.gov/permitting/stormwater/construction',
    },
    services: ['commercial-site-development', 'land-clearing', 'large-scale-earthmoving', 'drainage-and-site-shaping'],
    markets: ['brownsville', 'olmito', 'harlingen', 'los-fresnos'],
    boundary:
      'Permit authorization is the operator’s and owner’s legal responsibility. We install and maintain controls to the approved plan.',
  },
];

export const getCompliance = (slug: string) => COMPLIANCE.find((c) => c.slug === slug);
