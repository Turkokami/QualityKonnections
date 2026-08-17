/**
 * TOWN DATA — the geo routing + differentiation engine.
 *
 * Keystone 6.3: "Differentiation is data-driven." Each row carries the facts the
 * copy is derived FROM, so no two city pages can collapse into the same page even
 * before a writer touches them. `cluster` decides how many pages a town gets,
 * scaling the geo layer without new code.
 *
 * Keystone Part 14: territory is a HARD filter. Rows marked `deferred: true` are
 * excluded from routing and the sitemap by design — they are outside the confirmed
 * South Texas Gulf Coast territory and stay unbuilt until the owner says otherwise.
 *
 * ⚠ windZone values below are taken VERBATIM from the TDI Cameron County wind-zone
 * map (tdi.texas.gov/wind/maps/cameron.html, accessed 2026-08-17). They were WRONG
 * in the first draft of this file — "seaward" is not "near the water," it is a
 * legally defined line, and TDI gives Brownsville Inland I status by special rule
 * regardless of which side of the line it falls on. Willacy County rows are marked
 * `unverified` because the TDI Willacy map was not retrieved; no zone claim may be
 * published for those markets until it is.
 *
 * ⚠ VERIFY-BEFORE-PUBLISH: `soils`, `floodContext` and `landmarks` are
 * research seeds, not gospel. Every writer must confirm them against a primary
 * source (TDI, NRCS Web Soil Survey, FEMA FIRM, the city/county site) before the
 * page ships. See CONTENT_BRIEF.md § Verified regional facts.
 */

export type Cluster = 'full' | 'triple' | 'single' | 'area';
/** TDI designated catastrophe area zoning — drives the windstorm-certification story. */
export type WindZone = 'seaward' | 'inland-i' | 'inland-ii' | 'not-designated' | 'unverified';

export interface Town {
  slug: string;
  name: string;
  county: string;
  /** Miles from the Brownsville hub, road distance, rounded. */
  distanceMi: number;
  direction: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
  lat: number;
  lng: number;
  cluster: Cluster;
  /** Anchor markets carry the deepest build and the community/local-proof block. */
  anchor?: boolean;
  deferred?: boolean;
  windZone: WindZone;
  /** NRCS soil series commonly mapped here — drives the dirt-work angle. */
  soils: string[];
  /** The dominant earthwork challenge in this market. */
  siteworkAngle: string;
  /** The dominant roofing challenge in this market. */
  roofingAngle: string;
  /** Flood / drainage context. */
  floodContext: string;
  /** Predominant housing stock and era. */
  housing: string;
  /** Real, named local landmarks and geography. Never generic. */
  landmarks: string[];
  /** Local economic drivers that generate construction demand. */
  economy: string[];
  /** Neighborhood / subdivision slugs built under this city (cluster 'full' only). */
  neighborhoods?: { slug: string; name: string; note: string }[];
}

export const TOWNS: Town[] = [
  // ── CAMERON COUNTY — the core territory ────────────────────────────────────
  {
    slug: 'brownsville',
    name: 'Brownsville',
    county: 'Cameron County',
    distanceMi: 0,
    direction: 'S',
    lat: 25.9017,
    lng: -97.4975,
    cluster: 'full',
    anchor: true,
    windZone: 'inland-i',
    soils: ['Harlingen clay', 'Benito clay', 'Chargo silty clay', 'Laredo silty clay loam'],
    siteworkAngle:
      'Deep, high-shrink-swell vertisol clay that moves with moisture, laced with abandoned Rio Grande channels (resacas) that dictate where water goes and where a pad can sit.',
    roofingAngle:
      'Inland I windstorm zone: WPI-8 certification required for TWIA coverage, but without the direct salt-spray exposure of the barrier island.',
    floodContext:
      'Resaca network and a flat, low-gradient delta plain; large parts of the city sit in mapped FEMA flood zones where pad elevation is the whole ballgame.',
    housing:
      'Mid-century brick ranch through 1990s–2020s masonry-and-stucco subdivisions, plus a large stock of post-war frame homes near the historic core.',
    landmarks: [
      'Resaca de la Palma',
      'Port of Brownsville',
      'Brownsville–South Padre Island International Airport',
      'Gateway International Bridge',
      'Palo Alto Battlefield National Historical Park',
      'Sabal Palm Sanctuary',
      'Boca Chica Highway (SH 4)',
    ],
    economy: [
      'Port of Brownsville industrial and logistics growth',
      'Aerospace activity out toward Boca Chica',
      'Cross-border manufacturing and warehousing',
      'Healthcare and university expansion',
    ],
    neighborhoods: [
      { slug: 'rancho-viejo-corridor', name: 'Rancho Viejo Corridor', note: 'Golf-course subdivisions on filled resaca ground north of the loop.' },
      { slug: 'southmost', name: 'Southmost', note: 'Low-lying river-adjacent neighborhoods with the oldest drainage infrastructure.' },
      { slug: 'west-brownsville', name: 'West Brownsville', note: 'Newer master-planned tracts on former farmland along FM 802 and FM 1732.' },
      { slug: 'downtown-historic-district', name: 'Downtown & Historic District', note: 'Masonry commercial stock with low-slope built-up and modified-bitumen roofs.' },
      { slug: 'boca-chica-corridor', name: 'Boca Chica Corridor', note: 'Sandy, saline coastal flats east toward the Gulf — the most aggressive exposure in the county.' },
    ],
  },
  {
    slug: 'south-padre-island',
    name: 'South Padre Island',
    county: 'Cameron County',
    distanceMi: 25,
    direction: 'E',
    lat: 26.1118,
    lng: -97.1681,
    cluster: 'full',
    anchor: true,
    windZone: 'seaward',
    soils: ['Mustang fine sand (water table 11–30 in)', 'barrier-island washover sand', 'dredge-placed fill'],
    siteworkAngle:
      'Loose barrier-island sand over a shallow, brackish water table — compaction, dune rules and imported select fill behave nothing like mainland clay.',
    roofingAngle:
      'The only Seaward-zone market in Cameron County — the highest design pressures in the county, plus continuous salt aerosol that rules out ordinary steel substrates and fasteners.',
    floodContext:
      'Barrier island — coastal V and AE zones, storm surge, and finished-floor elevations driven by FEMA rather than by preference.',
    housing:
      'Mid-rise condominium towers, elevated beach houses on piers, and short-term-rental duplexes — very little slab-on-grade.',
    landmarks: [
      'Queen Isabella Memorial Causeway',
      'Laguna Madre',
      'Isla Blanca Park',
      'Padre Island seawall and dune line',
      'South Padre Island Birding and Nature Center',
    ],
    economy: [
      'Tourism, condominium and short-term-rental property management',
      'Hospitality construction and reroofing cycles',
      'Post-storm restoration work',
    ],
    neighborhoods: [
      { slug: 'north-padre-condominiums', name: 'North SPI Condominium District', note: 'Mid-rise towers with large low-slope membrane and coated decks.' },
      { slug: 'laguna-madre-bayside', name: 'Bayside / Laguna Madre Frontage', note: 'Bay-front homes and docks over soft, saturated ground.' },
      { slug: 'beachfront-gulf-side', name: 'Gulf-Side Beachfront', note: 'Full seaward exposure — the hardest assembly spec on the island.' },
    ],
  },
  {
    slug: 'port-isabel',
    name: 'Port Isabel',
    county: 'Cameron County',
    distanceMi: 22,
    direction: 'E',
    lat: 26.0734,
    lng: -97.2086,
    cluster: 'full',
    anchor: true,
    windZone: 'inland-i',
    soils: ['Lomalta clay (saline)', 'Point Isabel clay (saline, vegetated dune)', 'Chargo silty clay'],
    siteworkAngle:
      'Saline, poorly drained coastal clay with a high water table — pads need elevation and drainage before anything is poured.',
    roofingAngle:
      'Inland I zone — not Seaward, despite fronting the bay. Full windstorm compliance applies, and salt aerosol off the Laguna Madre still drives the substrate and fastener spec.',
    floodContext:
      'Bay-front and low-lying; surge exposure from the Laguna Madre and the ship channel drives elevation requirements.',
    housing:
      'Working-waterfront cottages, mid-century frame and block homes, newer canal-front construction and marina commercial buildings.',
    landmarks: [
      'Port Isabel Lighthouse',
      'Laguna Madre',
      'Port Isabel–San Benito Navigation District shrimp basin',
      'Queen Isabella Causeway approach',
    ],
    economy: [
      'Commercial shrimping and the working waterfront',
      'Marine services and boatyards',
      'Tourism spillover from the island',
    ],
    neighborhoods: [
      { slug: 'historic-port-isabel', name: 'Historic Port Isabel', note: 'Older frame and block stock near the lighthouse.' },
      { slug: 'long-island-village', name: 'Long Island Village Area', note: 'Dense waterfront resort community on filled ground.' },
      { slug: 'shrimp-basin-district', name: 'Shrimp Basin & Working Waterfront', note: 'Industrial metal buildings under constant salt load.' },
    ],
  },
  {
    slug: 'harlingen',
    name: 'Harlingen',
    county: 'Cameron County',
    distanceMi: 27,
    direction: 'NW',
    lat: 26.1906,
    lng: -97.6961,
    cluster: 'full',
    anchor: true,
    windZone: 'inland-ii',
    soils: ['Harlingen clay', 'Raymondville clay loam', 'Willacy fine sandy loam'],
    siteworkAngle:
      'The type locality of Harlingen clay — the shrink-swell benchmark for the whole Valley, and the reason moisture-conditioned lifts matter here.',
    roofingAngle:
      'Inland II zone, the lowest of the three Cameron County design tiers, with hail and downburst wind from inland thunderstorm complexes as much a factor as tropical systems.',
    floodContext:
      'Arroyo Colorado floodplain and an irrigation-canal grid that constrains where site drainage can legally discharge.',
    housing:
      'Large 1940s–1970s frame and brick stock, winter-Texan RV and manufactured-home parks, and newer north-side subdivisions.',
    landmarks: [
      'Arroyo Colorado',
      'Valley International Airport',
      'Harlingen Downtown Historic District',
      'Hugh Ramsey Nature Park',
      'Marine Military Academy',
    ],
    economy: [
      'Regional medical and retail hub for the mid-Valley',
      'Distribution and light manufacturing along the expressway',
      'Winter-Texan seasonal housing',
    ],
    neighborhoods: [
      { slug: 'treasure-hills', name: 'Treasure Hills', note: 'Established mid-century homes on mature clay with heavy tree cover.' },
      { slug: 'north-harlingen', name: 'North Harlingen', note: 'Newer subdivision growth on converted farmland.' },
      { slug: 'downtown-harlingen', name: 'Downtown Harlingen', note: 'Historic masonry commercial with low-slope roof systems.' },
    ],
  },
  {
    slug: 'san-benito',
    name: 'San Benito',
    county: 'Cameron County',
    distanceMi: 22,
    direction: 'NW',
    lat: 26.1325,
    lng: -97.6311,
    cluster: 'full',
    anchor: true,
    windZone: 'inland-ii',
    soils: ['Harlingen clay', 'Laredo silty clay loam', 'Olmito silty clay'],
    siteworkAngle:
      'Resaca-threaded farmland converting to subdivisions — old irrigation channels and field ditches have to be dealt with before a pad goes in.',
    roofingAngle:
      'Inland II zone; a large share of pre-code housing means decking and structural repair is often the real scope behind a reroof.',
    floodContext:
      'Resaca de los Fresnos and the San Benito resaca system; low relief and canal-fed drainage.',
    housing:
      'Early-20th-century frame homes near downtown, post-war brick, and rural colonias on the outskirts.',
    landmarks: [
      'Resaca de los Fresnos',
      'San Benito Historical Museum',
      'Freddy Fender Museum',
      'Heavin Resaca Trail',
    ],
    economy: ['Agriculture and produce handling', 'Bedroom community growth between Brownsville and Harlingen'],
    neighborhoods: [
      { slug: 'downtown-san-benito', name: 'Downtown San Benito', note: 'Older masonry commercial and adjacent frame housing.' },
      { slug: 'resaca-district', name: 'Resaca District', note: 'Homes fronting the resaca where drainage and fill are decisive.' },
    ],
  },
  {
    slug: 'los-fresnos',
    name: 'Los Fresnos',
    county: 'Cameron County',
    distanceMi: 14,
    direction: 'NE',
    lat: 26.0714,
    lng: -97.4761,
    cluster: 'full',
    anchor: true,
    windZone: 'inland-i',
    soils: ['Lomalta clay', 'Benito clay', 'Chargo silty clay'],
    siteworkAngle:
      'Fast-growing ranchette and acreage development on heavy, poorly drained clay — private driveways, culverts and pad elevation are the recurring job.',
    roofingAngle:
      'Inland I zone, and close enough to the bay that salt-tolerant substrates are worth the upgrade on agricultural and shop buildings.',
    floodContext:
      'Flat coastal prairie draining slowly toward the Laguna Madre; sheet flow rather than defined channels.',
    housing:
      'Rural acreage homes, metal shop buildings and barndominiums, plus newer subdivisions along FM 1575 and FM 803.',
    landmarks: [
      'Laguna Atascosa National Wildlife Refuge',
      'Los Fresnos Rodeo grounds',
      'FM 100 corridor toward Laguna Vista',
    ],
    economy: ['Agriculture and ranching', 'Acreage residential growth', 'Commuter corridor to Brownsville and the island'],
    neighborhoods: [
      { slug: 'fm-1575-corridor', name: 'FM 1575 Corridor', note: 'Acreage tracts where private drives and culverts are the first build.' },
      { slug: 'olmito-and-north', name: 'Olmito & North', note: 'Transitional farmland becoming residential.' },
    ],
  },

  // ── Cameron County — triple cluster ────────────────────────────────────────
  {
    slug: 'laguna-vista',
    name: 'Laguna Vista',
    county: 'Cameron County',
    distanceMi: 20,
    direction: 'E',
    lat: 26.1006,
    lng: -97.2894,
    cluster: 'triple',
    windZone: 'inland-i',
    soils: ['Lomalta clay (saline)', 'coastal sandy clay'],
    siteworkAngle: 'Saline coastal flats where fill selection and drainage decide whether a pad holds.',
    roofingAngle:
      'Inland I zone — one exit from the causeway but not Seaward. Full windstorm compliance plus bay-side salt exposure.',
    floodContext: 'Bay-adjacent low ground with surge exposure from the Laguna Madre.',
    housing: 'Golf-course and canal subdivisions, retirement housing, and RV resort communities.',
    landmarks: ['South Padre Island Golf Club', 'Laguna Madre', 'SH 100 corridor'],
    economy: ['Retirement and seasonal residential', 'Island commuter housing'],
  },
  {
    slug: 'rio-hondo',
    name: 'Rio Hondo',
    county: 'Cameron County',
    distanceMi: 30,
    direction: 'N',
    lat: 26.235,
    lng: -97.5808,
    cluster: 'triple',
    windZone: 'inland-i',
    soils: ['Harlingen clay', 'Willacy fine sandy loam'],
    siteworkAngle: 'Arroyo Colorado frontage and farmland conversion; drainage rights-of-way govern the grade.',
    roofingAngle:
      'Inland I zone, with heavy agricultural-building metal roofing demand.',
    floodContext: 'Arroyo Colorado floodway and adjacent irrigation district canals.',
    housing: 'Small-town frame and brick homes, farm compounds, metal shop buildings.',
    landmarks: ['Arroyo Colorado', 'Rio Hondo swing bridge', 'Adolph Thomae Jr. County Park'],
    economy: ['Row-crop agriculture', 'Sport fishing access to the Arroyo'],
  },
  {
    slug: 'la-feria',
    name: 'La Feria',
    county: 'Cameron County',
    distanceMi: 36,
    direction: 'NW',
    lat: 26.1517,
    lng: -97.8228,
    cluster: 'triple',
    windZone: 'inland-ii',
    soils: ['Harlingen clay', 'Raymondville clay loam'],
    siteworkAngle: 'Irrigation-district farmland converting to residential; canal crossings and culvert permits shape every site.',
    roofingAngle:
      'Inland II zone; mid-Valley hail is as much a driver here as tropical wind.',
    housing: 'Post-war frame and brick, ag outbuildings, newer subdivisions on former citrus ground.',
    floodContext: 'Arroyo Colorado watershed with a dense irrigation-canal grid.',
    landmarks: ['Arroyo Colorado', 'La Feria Heritage Museum', 'US 83 expressway corridor'],
    economy: ['Citrus, sugarcane and row-crop agriculture', 'Mid-Valley residential growth'],
  },
  {
    slug: 'rancho-viejo',
    name: 'Rancho Viejo',
    county: 'Cameron County',
    distanceMi: 8,
    direction: 'N',
    lat: 26.0292,
    lng: -97.5561,
    cluster: 'triple',
    windZone: 'inland-ii',
    soils: ['Benito clay', 'Olmito silty clay'],
    siteworkAngle: 'Resort-community lots on filled resaca ground where original fill quality varies lot to lot.',
    roofingAngle:
      'Inland II zone, with tile, metal and architectural shingle on higher-value housing stock.',
    floodContext: 'Resaca-fed water features and engineered ponds; drainage is community-managed.',
    housing: 'Upper-bracket golf-course homes, stucco and tile, 1980s through current construction.',
    landmarks: ['Rancho Viejo Resort & Country Club', 'Resaca de la Guerra', 'US 77/83 corridor'],
    economy: ['Resort and golf residential', 'Professional commuter housing for Brownsville'],
  },
  {
    slug: 'raymondville',
    name: 'Raymondville',
    county: 'Willacy County',
    distanceMi: 55,
    direction: 'N',
    lat: 26.4806,
    lng: -97.7833,
    cluster: 'triple',
    windZone: 'unverified',
    soils: ['Raymondville clay loam', 'Willacy fine sandy loam', 'Hidalgo sandy clay loam'],
    siteworkAngle: 'Sandier, better-draining loams than the Cameron clays — different compaction curves and different fill economics.',
    roofingAngle:
      'Willacy County is inside the TDI designated catastrophe area, so windstorm certification applies this far north. The specific zone has not been verified against the TDI Willacy map and is not stated on this site until it is.',
    floodContext: 'Flat coastal prairie draining east toward the Laguna Madre; sheet flow and farm ditches.',
    housing: 'Small-town frame and brick, agricultural buildings, county institutional facilities.',
    landmarks: ['Willacy County Courthouse', 'US 77 corridor', 'Raymondville Drain'],
    economy: ['Agriculture and grain handling', 'County seat institutional work', 'US 77 freight corridor'],
  },
  {
    slug: 'port-mansfield',
    name: 'Port Mansfield',
    county: 'Willacy County',
    distanceMi: 78,
    direction: 'NE',
    lat: 26.5556,
    lng: -97.4258,
    cluster: 'triple',
    windZone: 'unverified',
    soils: ['coastal fine sand', 'Lomalta clay (saline)', 'dredge-placed fill'],
    siteworkAngle: 'Remote bay-front village on dredge fill and sand — every yard of select material is a haul.',
    roofingAngle:
      'Inside the designated catastrophe area with unobstructed Laguna Madre exposure and no shelter from surrounding structures. Zone not yet verified against the TDI Willacy map.',
    floodContext: 'Bay-front with direct surge exposure and a very low base elevation.',
    housing: 'Fishing cabins, elevated stilt homes, boat storage and marina buildings.',
    landmarks: ['Port Mansfield Harbor', 'Laguna Madre', 'Mansfield Channel'],
    economy: ['Sport fishing and guide services', 'Seasonal and second-home property'],
  },

  // ── Cameron County — single-page markets ───────────────────────────────────
  {
    slug: 'santa-rosa',
    name: 'Santa Rosa',
    county: 'Cameron County',
    distanceMi: 38,
    direction: 'NW',
    lat: 26.2564,
    lng: -97.8256,
    cluster: 'single',
    windZone: 'inland-ii',
    soils: ['Harlingen clay', 'Raymondville clay loam'],
    siteworkAngle: 'Farm-to-residential conversion with irrigation infrastructure still in the ground.',
    roofingAngle:
      'Inland II zone; small-town residential and agricultural metal.',
    floodContext: 'Irrigation-district drains and the Arroyo Colorado watershed.',
    housing: 'Small frame homes, farm buildings, manufactured housing.',
    landmarks: ['Arroyo Colorado watershed', 'FM 506 corridor'],
    economy: ['Row-crop agriculture'],
  },
  {
    slug: 'combes',
    name: 'Combes',
    county: 'Cameron County',
    distanceMi: 32,
    direction: 'NW',
    lat: 26.245,
    lng: -97.7297,
    cluster: 'single',
    windZone: 'inland-ii',
    soils: ['Harlingen clay', 'Willacy fine sandy loam'],
    siteworkAngle: 'Expressway-frontage commercial pads on clay with shallow utility conflicts.',
    roofingAngle:
      'Inland II zone; mixed residential and highway commercial.',
    floodContext: 'Arroyo Colorado tributary drainage.',
    housing: 'Modest post-war frame and brick, manufactured housing, highway commercial.',
    landmarks: ['US 77/83 interchange', 'Arroyo Colorado'],
    economy: ['Highway commercial and logistics frontage'],
  },
  {
    slug: 'primera',
    name: 'Primera',
    county: 'Cameron County',
    distanceMi: 30,
    direction: 'NW',
    lat: 26.2064,
    lng: -97.7461,
    cluster: 'single',
    windZone: 'inland-ii',
    soils: ['Harlingen clay', 'Raymondville clay loam'],
    siteworkAngle: 'Suburban expansion off Harlingen onto former farmland; drainage tie-ins to district canals.',
    roofingAngle:
      'Inland II zone; newer residential stock with architectural shingle.',
    floodContext: 'Irrigation canal grid and low relief.',
    housing: 'Newer subdivisions and acreage homes.',
    landmarks: ['FM 800 corridor', 'Arroyo Colorado'],
    economy: ['Harlingen bedroom community growth'],
  },
  {
    slug: 'palm-valley',
    name: 'Palm Valley',
    county: 'Cameron County',
    distanceMi: 29,
    direction: 'NW',
    lat: 26.1856,
    lng: -97.7231,
    cluster: 'single',
    windZone: 'inland-ii',
    soils: ['Harlingen clay', 'Olmito silty clay'],
    siteworkAngle: 'Large-lot residential under mature palms — access and tree protection constrain equipment.',
    roofingAngle:
      'Inland II zone; higher-value homes with tile and standing seam.',
    floodContext: 'Arroyo Colorado adjacency with resaca-style water features.',
    housing: 'Large-lot custom homes on wooded acreage.',
    landmarks: ['Arroyo Colorado', 'Palm Valley municipal area'],
    economy: ['Upper-bracket residential'],
  },
  {
    slug: 'indian-lake',
    name: 'Indian Lake',
    county: 'Cameron County',
    distanceMi: 10,
    direction: 'NE',
    lat: 26.04,
    lng: -97.515,
    cluster: 'single',
    windZone: 'inland-i',
    soils: ['Benito clay', 'Lomalta clay'],
    siteworkAngle: 'Lakefront lots on soft clay where fill depth and settlement control the schedule.',
    roofingAngle:
      'Inland I zone, with bay-influenced humidity and salt drift.',
    floodContext: 'Resaca-lake frontage with managed water levels.',
    housing: 'Lakefront single-family homes, 1980s onward.',
    landmarks: ['Indian Lake', 'FM 1847 corridor'],
    economy: ['Brownsville commuter residential'],
  },
  {
    slug: 'bayview',
    name: 'Bayview',
    county: 'Cameron County',
    distanceMi: 17,
    direction: 'NE',
    lat: 26.1131,
    lng: -97.4083,
    cluster: 'single',
    windZone: 'inland-i',
    soils: ['Lomalta clay (saline)', 'Chargo silty clay'],
    siteworkAngle: 'Saline lowland with a shallow water table; import fill is nearly always required.',
    roofingAngle:
      'Inland I zone — full windstorm compliance on rural residential and agricultural buildings.',
    floodContext: 'Adjacent to Laguna Atascosa wetlands with surge and sheet-flow exposure.',
    housing: 'Rural acreage homes, metal shops, ranch outbuildings.',
    landmarks: ['Laguna Atascosa National Wildlife Refuge', 'FM 1847', 'Resaca de los Cuates'],
    economy: ['Ranching and rural residential'],
  },
  {
    slug: 'los-indios',
    name: 'Los Indios',
    county: 'Cameron County',
    distanceMi: 26,
    direction: 'W',
    lat: 26.0475,
    lng: -97.7422,
    cluster: 'single',
    windZone: 'inland-ii',
    soils: ['Rio Grande silt loam', 'Laredo silty clay loam'],
    siteworkAngle: 'River-terrace alluvium — better draining than the coastal clays, with different bearing behavior.',
    roofingAngle:
      'Inland II zone; port-of-entry commercial and warehouse metal roofing.',
    floodContext: 'Rio Grande floodplain with levee-controlled drainage.',
    housing: 'Small rural community, warehousing and bridge-related commercial.',
    landmarks: ['Free Trade International Bridge', 'Rio Grande levee system'],
    economy: ['Cross-border freight and warehousing'],
  },
  {
    slug: 'olmito',
    name: 'Olmito',
    county: 'Cameron County',
    distanceMi: 7,
    direction: 'N',
    lat: 25.9964,
    lng: -97.5361,
    cluster: 'single',
    windZone: 'inland-ii',
    soils: ['Olmito silty clay', 'Benito clay'],
    siteworkAngle: 'Industrial and distribution pads along the expressway on clay that needs deep moisture conditioning.',
    roofingAngle:
      'Inland II zone; large-format warehouse metal and low-slope membrane.',
    floodContext: 'Resaca-influenced flatland north of Brownsville.',
    housing: 'Rural residential mixed with expressway industrial and distribution.',
    landmarks: ['US 77/83 corridor', 'Resaca de la Guerra'],
    economy: ['Distribution, warehousing and industrial development'],
  },
  {
    slug: 'laguna-heights',
    name: 'Laguna Heights',
    county: 'Cameron County',
    distanceMi: 21,
    direction: 'E',
    lat: 26.0906,
    lng: -97.2361,
    cluster: 'single',
    windZone: 'inland-i',
    soils: ['Lomalta clay (saline)', 'coastal sand'],
    siteworkAngle: 'Low, saline ground where drainage and fill quality decide everything.',
    roofingAngle:
      'Inland I zone with direct bay exposure and older, largely pre-code housing stock.',
    floodContext: 'Bay-front low elevation with surge exposure.',
    housing: 'Modest frame and manufactured homes, older stock.',
    landmarks: ['Laguna Madre', 'SH 100 corridor', 'Port Isabel adjacency'],
    economy: ['Working-waterfront and service housing'],
  },
  {
    slug: 'lyford',
    name: 'Lyford',
    county: 'Willacy County',
    distanceMi: 48,
    direction: 'N',
    lat: 26.4114,
    lng: -97.7867,
    cluster: 'single',
    windZone: 'unverified',
    soils: ['Willacy fine sandy loam', 'Raymondville clay loam'],
    siteworkAngle: 'Sandy loam farmland — easier compaction than Cameron clay, but erosion control matters more.',
    roofingAngle:
      'Inside the designated catastrophe area; heavy agricultural metal demand. Specific zone unverified.',
    floodContext: 'Farm-ditch drainage across flat coastal prairie.',
    housing: 'Small-town frame homes and agricultural buildings.',
    landmarks: ['US 77 corridor', 'Willacy County farmland'],
    economy: ['Agriculture and grain'],
  },
  {
    slug: 'sebastian',
    name: 'Sebastian',
    county: 'Willacy County',
    distanceMi: 45,
    direction: 'N',
    lat: 26.3417,
    lng: -97.7908,
    cluster: 'single',
    windZone: 'unverified',
    soils: ['Willacy fine sandy loam', 'Hidalgo sandy clay loam'],
    siteworkAngle: 'Agricultural pads, grain facilities and farm road base on sandy loam.',
    roofingAngle:
      'Inside the designated catastrophe area; agricultural and light commercial metal. Specific zone unverified.',
    floodContext: 'Flat farmland with district drains.',
    housing: 'Rural residential and farm compounds.',
    landmarks: ['US 77 corridor', 'Sebastian farmland'],
    economy: ['Row-crop agriculture'],
  },
  {
    slug: 'san-perlita',
    name: 'San Perlita',
    county: 'Willacy County',
    distanceMi: 60,
    direction: 'N',
    lat: 26.5006,
    lng: -97.6428,
    cluster: 'single',
    windZone: 'unverified',
    soils: ['Willacy fine sandy loam', 'Lomalta clay'],
    siteworkAngle: 'Remote agricultural sitework where haul distance drives the fill decision.',
    roofingAngle:
      'Inside the designated catastrophe area; farm buildings and small-town residential. Specific zone unverified.',
    floodContext: 'Coastal prairie sheet flow toward the Laguna Madre.',
    housing: 'Small rural community and farm structures.',
    landmarks: ['FM 1761 corridor', 'Laguna Madre approaches'],
    economy: ['Agriculture'],
  },

  // ── Eastern Hidalgo County — edge of territory, NOT in the TDI zone ─────────
  {
    slug: 'mercedes',
    name: 'Mercedes',
    county: 'Hidalgo County',
    distanceMi: 42,
    direction: 'NW',
    lat: 26.1495,
    lng: -97.9139,
    cluster: 'triple',
    windZone: 'not-designated',
    soils: ['Harlingen clay', 'Hidalgo sandy clay loam', 'Raymondville clay loam'],
    siteworkAngle: 'Irrigation-district farmland converting to retail and residential at the county line.',
    roofingAngle:
      'Outside the TDI designated catastrophe area — no WPI-8 requirement, which changes the spec conversation entirely versus Cameron County.',
    floodContext: 'Arroyo Colorado and the Hidalgo County drainage district network.',
    housing: 'Post-war frame and brick, RV resorts, newer subdivisions and outlet-corridor commercial.',
    landmarks: ['Rio Grande Valley Premium Outlets', 'Arroyo Colorado', 'Mercedes Livestock Show grounds'],
    economy: ['Retail corridor', 'Agriculture', 'Winter-Texan RV resorts'],
  },
  {
    slug: 'weslaco',
    name: 'Weslaco',
    county: 'Hidalgo County',
    distanceMi: 48,
    direction: 'NW',
    lat: 26.1595,
    lng: -97.9908,
    cluster: 'triple',
    windZone: 'not-designated',
    soils: ['Hidalgo sandy clay loam', 'Harlingen clay', 'Willacy fine sandy loam'],
    siteworkAngle: 'Mid-Valley commercial growth on mixed loam and clay with dense canal infrastructure.',
    roofingAngle:
      'Outside the designated catastrophe area — hail and straight-line wind, not windstorm certification, drive the spec.',
    floodContext: 'Arroyo Colorado and Hidalgo County Drainage District No. 1 channels.',
    housing: 'Mid-century residential, medical and retail commercial, newer north-side subdivisions.',
    landmarks: ['Arroyo Colorado', 'Estero Llano Grande State Park', 'Valley Nature Center'],
    economy: ['Regional medical and retail', 'Agriculture and produce', 'Expressway commercial'],
  },
  {
    slug: 'donna',
    name: 'Donna',
    county: 'Hidalgo County',
    distanceMi: 54,
    direction: 'NW',
    lat: 26.1687,
    lng: -98.0517,
    cluster: 'single',
    windZone: 'not-designated',
    soils: ['Hidalgo sandy clay loam', 'Rio Grande silt loam'],
    siteworkAngle: 'Port-of-entry industrial and warehouse pads on river-terrace soils.',
    roofingAngle: 'Outside the designated area; large-format warehouse metal and membrane.',
    floodContext: 'Rio Grande floodplain and drainage-district channels.',
    housing: 'Small-town residential, RV parks, and expanding industrial near the international bridge.',
    landmarks: ['Donna–Rio Bravo International Bridge', 'Donna Reservoir', 'US 83 corridor'],
    economy: ['Cross-border freight and warehousing', 'Agriculture'],
  },
  {
    slug: 'progreso',
    name: 'Progreso',
    county: 'Hidalgo County',
    distanceMi: 46,
    direction: 'W',
    lat: 26.0895,
    lng: -97.95,
    cluster: 'single',
    windZone: 'not-designated',
    soils: ['Rio Grande silt loam', 'Laredo silty clay loam'],
    siteworkAngle: 'River-terrace alluvium along the levee with bridge-related commercial pads.',
    roofingAngle: 'Outside the designated area; border commercial and warehouse roofing.',
    floodContext: 'Rio Grande floodplain behind the levee system.',
    housing: 'Border commercial, small residential, and produce warehousing.',
    landmarks: ['Progreso–Nuevo Progreso International Bridge', 'Rio Grande levee'],
    economy: ['Cross-border retail and produce handling'],
  },

  // ── DEFERRED — outside the confirmed Gulf Coast territory ──────────────────
  // Built only on the owner's explicit go-ahead (Keystone Part 14).
  { slug: 'mcallen', name: 'McAllen', county: 'Hidalgo County', distanceMi: 62, direction: 'NW', lat: 26.2034, lng: -98.23, cluster: 'area', deferred: true, windZone: 'not-designated', soils: [], siteworkAngle: '', roofingAngle: '', floodContext: '', housing: '', landmarks: [], economy: [] },
  { slug: 'edinburg', name: 'Edinburg', county: 'Hidalgo County', distanceMi: 68, direction: 'NW', lat: 26.3017, lng: -98.1633, cluster: 'area', deferred: true, windZone: 'not-designated', soils: [], siteworkAngle: '', roofingAngle: '', floodContext: '', housing: '', landmarks: [], economy: [] },
  { slug: 'mission', name: 'Mission', county: 'Hidalgo County', distanceMi: 72, direction: 'NW', lat: 26.2159, lng: -98.3253, cluster: 'area', deferred: true, windZone: 'not-designated', soils: [], siteworkAngle: '', roofingAngle: '', floodContext: '', housing: '', landmarks: [], economy: [] },
  { slug: 'pharr', name: 'Pharr', county: 'Hidalgo County', distanceMi: 58, direction: 'NW', lat: 26.1948, lng: -98.1836, cluster: 'area', deferred: true, windZone: 'not-designated', soils: [], siteworkAngle: '', roofingAngle: '', floodContext: '', housing: '', landmarks: [], economy: [] },
];

// ─── Selectors used by routing, the sitemap and the link lattice ─────────────
export const activeTowns = () => TOWNS.filter((t) => !t.deferred);
export const anchorTowns = () => activeTowns().filter((t) => t.anchor);
export const pageTowns = () => activeTowns().filter((t) => t.cluster !== 'area');
export const getTown = (slug: string) => TOWNS.find((t) => t.slug === slug);
export const townsInCounty = (county: string) =>
  activeTowns().filter((t) => t.county === county);

/** How many money services get a city×service page in this market. */
export const matrixDepth = (t: Town): number =>
  t.cluster === 'full' ? 6 : t.cluster === 'triple' ? 3 : 0;

/** Nearest siblings for lateral wiring (M3) — by real distance, not alphabetical. */
export function nearbyTowns(t: Town, limit = 5): Town[] {
  const d = (a: Town, b: Town) =>
    Math.hypot((a.lat - b.lat) * 69, (a.lng - b.lng) * 62);
  return activeTowns()
    .filter((x) => x.slug !== t.slug && x.cluster !== 'area')
    .sort((a, b) => d(t, a) - d(t, b))
    .slice(0, limit);
}
