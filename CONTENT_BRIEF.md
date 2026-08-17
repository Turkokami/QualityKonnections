# CONTENT_BRIEF — Quality Konnection Construction

**Read this file completely before writing a single word.** It is the anti-slop engine. Every writer on this build reads it first, then reads the gold-standard exemplar, then writes.

- **Client:** Quality Konnection Construction — a Texas construction company doing dirt work / site preparation and complete roofing.
- **Territory:** Brownsville, Port Isabel, South Padre Island and the South Texas Gulf Coast — Cameron County, Willacy County, eastern Hidalgo County.
- **Standard:** Keystone v1 (August 2026). Mandates M1–M7 apply to every indexable page.
- **Brief version:** 1.0 · issued 2026-08-17 · research verified 2026-08-17.

---

## 1 · The five rules that get a draft rejected

1. **Under 3,000 words → rejected.** M1. Target band 3,000–5,000 words of unique, hyper-local body copy. Not padding. If you cannot find 3,000 words of real, specific material for a page, say so and the page does not get published. A thin geo page is worse than no geo page.
2. **A fabricated fact → rejected, and the whole batch gets re-audited.** No invented review counts, ratings, prices, years in business, job counts, crew sizes, awards, certifications, client names or statistics. If you did not verify it, do not write it. See §3.
3. **Templated copy → rejected.** If a sentence would read identically with the city name swapped, it is slop. Every page is derived from its own row in `src/data/towns.ts` / `services.ts`. Ten substantive differentiated pages beat eighty templated near-duplicates that never get indexed.
4. **The page title appearing verbatim inside a body sentence → rejected.** No template variables in prose. Write like a person who has been on that street.
5. **Missing the frontmatter contract → build failure.** The content schema in `src/content.config.ts` rejects the file. Quick Answer must be 40–60 words; FAQs must be 6–8; meta title ≤60; meta description 110–165 ending on punctuation.

---

## 2 · Verbatim business facts

These come from the client's own QK CORE brief. Use them; do not embellish them.

- Quality Konnection Construction is a Texas construction company specializing in **dirt work, site preparation, and complete roofing solutions** for residential, commercial, and industrial projects.
- The goal: *"do the job right, build it to last, and be the contractor our customers can depend on."*
- **On price, in the client's own words:** *"We may not always be the cheapest option—and we don't try to be. We compete on quality, reliability, communication, and delivering a finished product we're proud to put our name on."* Also: *"We're not trying to win every project by being the lowest bidder. We're trying to be the best value."*
- Positioning line: *"From the ground underneath your building to the roof protecting everything inside it."*
- Tagline: **DIRT WORK. ROOFING. DONE RIGHT.**
- Roofing positioning: **single-source roofing solution** — *"Instead of limiting ourselves to one type of roof, we work across a wide range of residential and commercial roofing systems."*
- Structural positioning: **One Contractor. Two Core Capabilities. Built Around Quality.**

**The confirmed service list is in `src/data/services.ts` and is closed.** Every row traces to the client's brief. Do not invent a service — no concrete, no framing, no plumbing, no solar, no inspections, no engineering. Keystone Part 14: a service page for work the owner doesn't do is a liability, not an asset.

### What is PENDING and must never be invented

Phone, address, email, founding year, license/entity numbers, insurance limits, manufacturer certifications, owner/expert name and bio, hours, GBP, social profiles, ratings, warranty terms, financing, CRM form URL. All are guarded in `src/data/business.ts`. **If a sentence needs one of these, restructure the sentence.** Run `node scripts/pending.mjs` for the live list.

---

## 3 · Verified regional facts — the research spine

Everything in this section was verified against a primary source on **2026-08-17**. The confidence marker governs how you may use it.

- **CONFIRMED** — write it, cite it.
- **PARTIAL** — write it only with the hedge shown, and cite it.
- **DO NOT PUBLISH** — the fact is unverified. Write around it. There is no penalty for a gap and a real penalty for a wrong number on a page carrying a review date.

### 3.1 Windstorm — the single biggest local differentiator

| Fact | Use |
|---|---|
| The designated catastrophe area covers 14 first-tier coastal counties, **including Cameron and Willacy**. **Hidalgo County is NOT included** — it is second-tier, which is not the same thing. | CONFIRMED. This is the county-line story: a roof in San Benito is in the program, a roof in Weslaco is not. Never write "the Valley is in the windstorm area." Write the county names. |
| **WPI-8 is a Certificate of Compliance issued by TDI** — not by the contractor, not the city, not TWIA. Certification comes from a TDI inspector, a TDI **appointed qualified inspector (AQI)**, or a **Texas-licensed professional engineer**. | CONFIRMED. A contractor cannot self-certify. Say this plainly and often — it is a trust signal and a legal boundary. |
| A **WPI-1 application must be filed with TDI before work begins.** | CONFIRMED (Tex. Ins. Code §2210.2515). |
| **Roof repairs under 100 square feet that do not involve decking or framing members do not require inspection.** A full roof replacement does. | CONFIRMED. Commonly misquoted online as "100 squares" (10,000 sq ft) or as a dollar threshold. Both are wrong. |
| Once work is **closed in**, TDI/AQI inspectors can no longer inspect it — only a Texas-licensed PE can certify, via **WPI-2E → WPI-8-E**. | CONFIRMED. This is the strongest argument in the whole build for calling before the work starts. |
| **WPI-3 is dead.** TWIA stopped accepting it 2020-05-31. | CONFIRMED. **Never publish WPI-3 as live advice.** Many Texas roofing sites still do. |
| TDI may not rescind a certificate once issued. TDI inspectors charge no fee. | CONFIRMED. |
| Without a certificate, TWIA "lacks evidence that the structure conforms to applicable building codes, and it **may be considered uninsurable and ineligible for coverage with TWIA**." | CONFIRMED — quote TWIA's hedge ("may be considered"), do not upgrade it to "your policy will be cancelled." |
| Cameron County zones: **Seaward = South Padre Island only. Inland I = Brownsville, Port Isabel, Los Fresnos, Laguna Vista, Laguna Heights, Rio Hondo, Bayview, Arroyo City, Boca Chica, Indian Lake, Lozano, Southmost, Port Brownsville. Inland II = Harlingen, San Benito, La Feria, Combes, Primera, Palm Valley, Rancho Viejo, Olmito, Santa Rosa, Los Indios, Santa Maria, Stuart Place.** | CONFIRMED (TDI Cameron map). **Port Isabel is Inland I, not Seaward** — the zone line is U.S. 77, not a distance from water. Brownsville gets Inland I by special rule regardless of the line. |
| Legacy design speeds (2006 code / ASCE 7-05 nominal): Seaward **130**, Inland I **120**, Inland II **110** mph. ASCE 7-10 *ultimate* equivalents for the same buildings: **168 / 155 / 143** mph. | CONFIRMED — **but only with the explanation.** These are the same buildings in two different units. Never publish a bare mph number. |
| **Current design wind speed for a project permitted today** | **DO NOT PUBLISH A NUMBER.** TDI no longer publishes per-zone mph; design speed is determined per structure under ASCE 7. Say that. |
| Work begun **on or after 2026-04-01** is certified to the **2024 IRC / 2024 IBC**; 2020-09-01 to 2026-04-01 was the 2018 codes. | CONFIRMED. |
| Willacy County wind zones (Raymondville, Lyford, Sebastian, San Perlita, Port Mansfield) | **DO NOT PUBLISH A ZONE.** The TDI Willacy map was not retrieved. Willacy is in the catastrophe area — that much is confirmed — but the specific zone is not. |
| Brownsville's / SPI's / unincorporated Cameron County's adopted IRC/IBC edition | **DO NOT PUBLISH.** Sources were machine-unreadable. **Port Isabel = 2018 I-codes (CONFIRMED).** SPI adopted 2015 I-codes in Ord. 18-02 (2018) — PARTIAL, may be superseded. |
| TWIA 15% surcharge on uncertified 1988–2009-06-18 residences | PARTIAL — stated by TWIA, rate rule not located. Hedge or omit. |

**The genuinely differentiating structural point, fully supported:** the **city building permit** and the **TDI windstorm certificate** are two separate compliance tracks. Port Isabel's 2018 I-codes govern the permit; the 2024 IRC/IBC governs the WPI-8. A project can satisfy the city and still fail the windstorm certificate. Almost no competitor says this.

### 3.2 Contractor licensing — a legal-exposure item

- **Texas does not license roofing contractors.** TDLR's 41 regulated programs do not include roofing. CONFIRMED.
- **RCAT** = Roofing Contractors Association of Texas. Its "Licensed Roofing Contractor" program is a **voluntary industry credential**, not a state licence. Two trade categories (residential / commercial), two tiers (Principal / Manager), insurance minimums $300k residential / $500k commercial, 70% exam pass mark, 8 CEUs annually. CONFIRMED.
- **Writing rule:** never let the word "licensed" stand unqualified beside the company name. If and when the client confirms RCAT status, the only acceptable phrasing is *"RCAT Licensed Roofing Contractor, a voluntary certification from the Roofing Contractors Association of Texas; Texas does not issue a state roofing licence."* Cities may still require local registration — that is separate.

### 3.3 Ground — soils, fill and compaction

| Fact | Use |
|---|---|
| **Harlingen clay** — very-fine smectitic **Sodic Haplusterts** (a Vertisol). Moderately well drained, **very slow permeability**, cracks open 150–210 cumulative days most years, EC 16–20 dS/m in the lower part. | CONFIRMED (NRCS OSD). |
| **Benito clay** — Sodic Haplusterts, **poorly drained**, runoff very slow to ponded, slickensides 8–63 in, cracks 0.4–3.0 in wide to 20 in, **seasonal high water table 4–6 ft Sept–May**. | CONFIRMED. |
| **Lomalta clay** — **Typic Natraquerts**, poorly drained, **EC 12–50 dS/m, ESP >15% in all horizons**, semi-marshy, slightly above sea level. The bay-margin soil. | CONFIRMED. |
| **Chargo silty clay** — COLE 0.09–0.14 → very high shrink-swell. **Olmito silty clay** COLE 0.07–0.15. **Raymondville clay loam** COLE 0.07–0.17. | CONFIRMED (COLE from OSD; the shrink-swell class is a derivation — say "very high shrink-swell," don't publish a bare LEP figure). |
| **Laredo silty clay loam, Willacy fine sandy loam, Hidalgo sandy clay loam** — well drained, moderate permeability, non-vertic, low shrink-swell. The "easy" Valley soils. | CONFIRMED. |
| **Mustang fine sand** — barrier island, Typic Psammaquents, poorly drained, **seasonal water table 11–30 inches**, nonsaline. This is South Padre Island. | CONFIRMED. |
| **Point Isabel is a CLAY, not a sand** — fine, mixed, active, hyperthermic Typic Calciustepts on vegetated dunes, EC 4–40 dS/m, SAR 11–95, slow permeability. | CONFIRMED. **Writing "Point Isabel fine sand" is a factual error.** |
| The **Rio Grande** series is *coarse-silty* — phases are silt loam / very fine sandy loam. "Rio Grande silty clay loam" is not a real phase. | CONFIRMED. |
| **Texas Section ASCE defines expansive clay as weighted PI > 15** with potential volume change > 1%. PVR per TxDOT Tex-124-E over a 15-ft column. *"Foundations shall not be supported by non-engineered fill."* | CONFIRMED. |
| **"95% standard Proctor"** = 95% of the maximum dry density from ASTM D698. FEMA TB-10 treats **95% standard ≈ 90% modified (ASTM D1557)** for fill supporting buildings; max 12-in lifts. | CONFIRMED — FEMA TB-10 is the clean citation. |
| **Caliche** = secondary calcium carbonate, forms by leaching and reprecipitation; developed through six morphologic stages; in the Valley it is "commercially quarried and crushed as a base material to improve drainage and traction on unpaved roads." Mapped as USGS unit **Tc**. | CONFIRMED (USGS OFR 77-794; UTRGV; USGS OFR 2005-1409). |
| **TxDOT Item 247 flexible base** — Grade 1: LL ≤35, **PI ≤10**, wet ball mill ≤40. Grade 2: LL ≤40, **PI ≤12**, WBM ≤45. Compact to **not less than 100% density per Tex-113-E**. Caliche is normally supplied as Type B. | PARTIAL — figures verified from an adopted municipal copy of the spec, not TxDOT's own PDF (robots-blocked). Hedge as "the TxDOT flexible base specification" rather than quoting a table verbatim. |
| **"Select fill" has no statewide codified definition.** In Texas Gulf Coast geotech practice it means low-plasticity sandy clay or imported caliche blend, **PI roughly 8–18**, in ≤8-in loose lifts. | PARTIAL — from one representative Texas Gulf Coast geotechnical report (Matagorda County), not a Cameron County standard. Say "typically" and attribute to engineering practice, not to code. |
| Valley-specific PI ranges · Valley-specific PVR ranges · a code-mandated select-fill cap depth · a standards definition of "bank sand" · ASTM compaction energies · named active caliche pits · % of Cameron County in any soil series | **DO NOT PUBLISH.** None could be verified. There is **no** code-mandated select fill depth in Texas — it is engineer-specified per project. Say that; it is itself a good, true, differentiating statement. |

### 3.4 Water — resacas, flood, drainage districts

| Fact | Use |
|---|---|
| **Resacas are former channels of the Rio Grande**, cut off by Falcon Dam and flood-control works, which also **prevented new resaca formation**. USACE evaluated **66 resacas near Brownsville**, "less than one to over 50 acres, average 18 acres." Three cross urban Brownsville: **Resaca de la Guerra, Resaca del Rancho Viejo, Town Resaca** — ~3,500 acres remaining against an estimated 70,000 acres before 1870s agricultural expansion. | CONFIRMED (USACE Galveston). **Do not write "there are 66 resacas in Cameron County"** — 66 is the number evaluated near Brownsville. |
| **BPUB manages "over 50 miles of Brownsville's historic resaca waterways,"** ~4 million cubic yards of sediment, 75-year maintenance plan begun 2013. Resacas are used for irrigation, raw water supply, stormwater drainage and recreation. | CONFIRMED. |
| Other named resacas: **Resaca de los Fresnos** (San Benito), **Resaca de los Cuates** (Los Fresnos–Bayview), **Resaca de la Palma**. | CONFIRMED (TSHA; USACE). Note **Resaca de la Palma Battlefield** (an NPS unit) is distinct from **Resaca de la Palma State Park** (TPWD). |
| Underlying geology: Holocene **Qam** muddy flood-plain alluvium and **Qbm** low-permeability Beaumont mud and clay. | CONFIRMED (USGS OFR 2005-1409). |
| **FEMA V/VE zones: communities must "prohibit the use of fill for structural support of buildings."** Lowest horizontal structural member elevated to or above BFE, on piles/columns, breakaway walls below. A/AE: lowest floor at or above BFE. | CONFIRMED (44 CFR 60.3). **This is the single most important dirt-work fact for South Padre Island** — on the Gulf side you cannot build a fill pad for structural support. |
| **Freeboard** = "a factor of safety usually expressed in feet above a flood level." Most communities choose 1–3 ft. | CONFIRMED (FEMA glossary; FEMA Region VI guide). |
| **Harlingen has a real, citable local standard:** foundations in Zone X no less than **18 inches above top of curb**; in a Special Flood Hazard Area **a minimum of 24 inches above top of curb**; lots within 100 ft of a drainage inlet finished floor **6 inches higher** than neighbouring lots. | CONFIRMED (Harlingen Subdivision Ordinance 2022). Use this — it is concrete, local and almost nobody publishes it. |
| SPI's VE-vs-AE extents · SPI's freeboard number · Cameron County's freeboard number · % of Brownsville or Cameron County in the SFHA | **DO NOT PUBLISH.** myspi.org returns 403 to fetch; the County's floodplain PDF is a non-OCR'd scan; only a region-wide "over 15 percent" figure exists and only in a *draft* plan. |
| **Arroyo Colorado** — an ancient distributary of the Rio Grande, ~**90 miles from Mission to the Laguna Madre**, watershed **706 sq mi**; "an integral part of a major floodway system"; of 105,000 cfs diverted at Anzalduas, **21,000 cfs goes to the Arroyo**. Segment 2201 (tidal) has a **dissolved oxygen** impairment; segment 2202 a **bacteria** impairment. | CONFIRMED (TCEQ; IBWC). |
| **CCDD No. 1** covers ~**81,126 acres**. Run-out rate **0.63 cfs/acre**; net increase allowance 0.25 cfs/acre for single-family on ≥0.5-acre lots, **0.88 cfs/acre** higher density. Utility crossings must cross **within 20° of perpendicular**, **≥5 ft below existing flowline**, concrete-protected; application fee **$1,000**. **"Open ditch connections to existing channels are prohibited."** Plat: **$150**, minimum **100-ft fee-simple right-of-way**, submit ≥**14 days** before the regular meeting, approval **expires if not developed within one year**. | CONFIRMED (CCDD1 Master Drainage Plan) — **but a 2024-25 updated plan exists on the same site. Re-verify every figure against it before publishing, and cite the plan you actually read.** |
| Cameron County drainage districts **1, 3, 4, 5, 6**; irrigation districts **Bayview, Brownsville, CCID No. 2, No. 6, No. 16, Harlingen, Hidalgo & Cameron Counties No. 9, La Feria**. Texas Water Code Ch. 58 gives districts rulemaking power over their easements. | CONFIRMED. |
| Near the bay margins: ponded, sodic, hypersaline clays, water table within 1–3 ft. Groundwater in the LRGV "is mostly brackish." The **Laguna Madre is a hypersaline lagoon**, ~280,910 acres, average depth 4.5 ft. | CONFIRMED. Corollaries about sulfate attack on concrete and buried-metal corrosion are **engineering inference — DO NOT PUBLISH** without a Cameron County geotech source. |

### 3.5 Weather and roof assemblies

| Fact | Use |
|---|---|
| **Beulah (1967)** — Cat 3 landfall between the Rio Grande mouth and Brownsville; 136 mph measured at the Port of Brownsville; 109 mph gust at NWS Brownsville before the anemometer failed; 31 new cuts across South Padre Island; ~115 tornadoes. | CONFIRMED (NWS). |
| **Allen (1980)** — NWS Brownsville: **Cat 3 near Port Mansfield**, 138 mph gust at Port Mansfield, 12 ft surge, 68 new cuts on Padre Island, 4 ft of water in Brownsville buildings. | CONFIRMED (NWS Brownsville). **NOAA/AOML's blog conflicts (Cat 4 at Brownsville). Use NWS Brownsville and avoid a precise mph.** |
| **Dolly (2008)** — NHC final: **Category 1, 70 kt (~81 mph)** at mainland landfall; **~$1.05 B US damage**; "mainly moderate structural damage, primarily to roofs, on South Padre Island"; Brownsville 13.20 in rain. | CONFIRMED. **Do not repeat the common "Category 2 / 100 mph" claim — that was the operational estimate, not the final report.** |
| **Hanna (2020)** — **Category 1, 80 kt (92 mph)** at Padre Island landfall; ~$1.2 B damage; peak gust **103 mph** at Rincon del San Jose; 15.49 in at Santa Rosa; ≥250,000 without power; "hundreds of poorly built structures suffered roof damage." | CONFIRMED. |
| **The documented Valley failure mode across all three storms is roof-covering loss on lower-quality construction** — shingles, siding and cladding stripped, roofs blown down on light-frame and warehouse-type buildings, mobile homes destroyed — not catastrophic collapse of engineered buildings. | CONFIRMED synthesis. This is the honest, powerful argument for spending on the assembly. |
| The Valley averages **fewer than 30 thunderstorm days a year**, severe on under a third of those. 1996–2021: **540 hail and wind events, ~20.9/yr**, peaking in May. **Downbursts are the primary wind threat** and "occur far more frequently than tornado damage." | CONFIRMED (NWS Brownsville Hazardous Weather Guide 2022). |
| The **29 March 2012 mid-Valley hailstorm** hit **McAllen / Edinburg / Mission / Pharr (Hidalgo County)** — baseball hail, >1,000 structures damaged, **~$600 million** insured (NWS 2022 guide; the $260 M figure is the earlier preliminary). Since 2012, regional wind and hail losses exceed **$750 million**. | CONFIRMED — use the $600 M figure and cite the 2022 guide. |
| "Hail is concentrated inland rather than on the coast" | **PARTIAL — do not quantify.** No per-county hail climatology exists. Safe framing: *"the Valley averages fewer than 30 thunderstorm days a year and severe storms on under a third of those; when hail does come it comes hard — the 2012 mid-Valley storm ran to roughly $600 million insured — but on the coast, wind is the everyday driver."* |
| **Cameron County is IECC/ASHRAE Climate Zone 2A, hot-humid.** Zone 2 prescriptive ceiling **R-38**. Low-slope roofs (<2:12) over cooled conditioned space must meet **3-year-aged solar reflectance ≥0.55 and thermal emittance ≥0.75, or aged SRI ≥64**. | CONFIRMED as to zone and values; PARTIAL as to code edition (ICC is paywalled) — write "Climate Zone 2A" and note code exceptions exist. |
| **Vapour drive is inward here.** Class I vapour retarders (≤0.1 perm) are **prohibited on the interior side of air-permeable insulation** in zones 1, 2, 3A. Unvented attics in CZ 1–3 need a **vapour diffusion port** ≥1:600 of ceiling area within 12 in of the ridge, ≥20 perms, slope ≥3:12; rigid board above deck needs **min R-5** for condensation control. | CONFIRMED (DOE Building America). Excellent, genuinely technical, rarely-published material. |
| **Coastal metal — the exclusion distance is 1,500 FEET, not miles.** McElroy's Kynar 500 warranty: *"null and void for any material… installed on property 1,500 feet or fewer from a salt water environment."* Galvalume substrate warranties exclude "goods installed within 1,500 feet of a salt-water or other marine environment." MBCI applies the same rule. | CONFIRMED (primary warranty documents). **Every "within X miles" claim online appears to be drift. Write 1,500 feet and cite.** |
| **Galvalume is NOT the coastal metal — that is backwards.** Galvalume (ASTM A792, 55% Al / 43.4% Zn / 1.6% Si) has no substrate warranty within 1,500 ft of saltwater; neither Galvalume nor galvanized "will stand up to the conditions associated with a coastal environment." **Aluminium is the oceanfront/bayfront substrate** — it holds 25-yr coastal PVDF paint warranties, but expands **roughly twice as much as steel** (expansion clips beyond ~15–20 ft runs), dents more easily, and costs ~15–25% more. | CONFIRMED (Sheffield Metals). |
| **Fasteners: match the fastener to the substrate (MCA).** **300-series / 304 stainless** is the coastal answer for aluminium panels. **410 stainless is explicitly NOT coastal-rated** (ATAS: urban/rural and industrial only). Electroplated zinc screws are not for exterior use. Galvanized fasteners with aluminium cladding are not recommended. Organic-coated steel screws must show no red rust after **500 hours ASTM B117**. MCA defines "highly corrosive" to include coastal marine **within 1,500 feet**. | CONFIRMED. Counter-example worth knowing: **DECRA discourages stainless with its own steel systems** — "always stainless" is not universally right. |
| Corrosion mechanism: airborne chlorides are **hygroscopic** — they hold an electrolyte film long after rain stops and break down the passive oxide layers on zinc and aluminium. So exposure is about **deposition and wash-off**, not just distance: sheltered, unwashed undersides and eaves corrode faster than rain-washed field areas. Fresh-water rinsing is a real maintenance item. | CONFIRMED synthesis. |
| **Wind uplift standards:** UL 580 = pass/fail only. UL 1897 = to failure, ignores deck. FM 4471 = ratings with a **safety factor of 2** (1-90 → 45 psf allowable). **ASTM E1592** = tested to failure including anchors and panel deflection, "considered most reliable for the design of standing seam roof panels." | CONFIRMED (MBCI). |
| **Standing seam vs exposed fastener:** standing seam floats on slider/expansion clips; exposed-fastener panels are pinned, which "limits the amount a roof can expand and contract… which can cause the fasteners to back out." Exposed-fastener roofs need inspection "upwards of two times per year." R-panel is the right choice at 3:12+ on agricultural, structural and simpler residential buildings. | CONFIRMED (Sheffield Metals). **Do not invent fastener-per-square counts or side-by-side lifespan year ranges.** |
| **Standing seam service life:** MCA's field study of 14 low-slope unpainted 55% Al-Zn standing seam roofs (to 35 yrs in service) projects **service life in excess of 60 years**, with **butyl seam sealant the limiting component at ~60 years**. | CONFIRMED (MCA, Oct 2018). |
| **Minimum slopes (IBC 1507):** metal lapped non-soldered seam without sealant **3:12**, with sealant **1/2:12**, **standing seam 1/4:12**; BUR, modified bitumen, thermoset and thermoplastic single-ply all **1/4:12 (2%)**; asphalt shingles **≥2:12**, with **double underlayment 2:12 to <4:12**. | CONFIRMED. |
| **TPO's limiting factor is heat, not UV.** NRCA-published research: utility-grade TPO ≈15 yrs at 160°F sustained; standard ≈25 yrs at 180°F; most heat-stable >35 yrs at ~200°F. *"UV aging does not appear to be an issue for TPO membranes."* TPO "is a varied product" — heat-ageing differs materially by manufacturer. | CONFIRMED. **"UV kills TPO" is wrong.** |
| **Modified bitumen service life** | **DO NOT PUBLISH A NUMBER.** No ARMA/NRCA/IIBEC service-life figure is publicly available; every "20–30 years" online traces to contractor marketing. Write "manufacturer- and system-specific," or cite the specific membrane's warranty term. Argue mod-bit on redundancy, puncture resistance, traffic tolerance and repairability instead. |
| **Ponding = "water that does not drain or dissipate from the roof surface within 48 hours after precipitation ends"** (GAF C-44). **But "ponding voids your warranty" is not universally true** — GAF's EverGuard Diamond Pledge NDL Guarantee *does* cover leaks in ponding areas on TPO/PVC. Ponding **is** an absolute exclusion on Galvalume metal. | CONFIRMED. Attribute the 48-hour rule to manufacturer warranty language, **not** to NRCA. |
| **ASTM D3161** (fan-induced): Class A = 60 mph, D = 90, **F = 110**. **ASTM D7158** (uplift force vs resistance): Class D ≤115 mph, G ≤150, **H ≤190**. The standards state results "do not directly correlate to wind speeds experienced in service." | CONFIRMED (NRCA). |
| **Six-nail pattern:** code requires ≥4 fasteners per strip shingle, **six in high-wind zones (110+ mph)**. Since TDI's lowest Cameron County zone is 110 mph, **the six-nail pattern applies across all of Cameron County.** Nails must penetrate both overlay and underlay portions; no nail within 2 in of a joint or cutout of the underlying shingle; 11–12 gauge, ≥3/8 in head, ≥3/4 in penetration. | CONFIRMED (IBC/IRC + IKO TBR-64). The county-wide conclusion is a sound derivation — a strong, genuinely useful local fact. |
| **UL 2218 Class 4** = 2.00 in steel ball dropped from **20 ft**, twice at the same spot; failure is judged on the **underside** — "cosmetic damage on the top surface doesn't matter." **GAF's own disclaimers say its impact-resistant shingles "are not warranted to withstand hail damage,"** and insurance discounts "vary by state and insurance company." UL 2218 tests **new** material only. | CONFIRMED. **Never write that Class 4 makes a roof hail-proof or that a Texas discount is guaranteed.** Say "many insurers offer a credit — ask yours." |

### 3.6 Economy and growth — write it honestly

| Fact | Use |
|---|---|
| Brownsville **192,957** (1 Jul 2025 est.), +3.6% since 2020. Cameron County **433,946**, +3.0%. County **166,569 housing units**, **65.2% owner-occupied**, median home value **$136,500**; Brownsville median value **$139,900**, owner-occupied 61.7%. | CONFIRMED (Census QuickFacts). |
| **Honest read: growth is real but modest — about 3% over five years, not a boom.** This is a re-roof and repair market on an older, moderate-value, high-owner-occupancy housing stock, plus a genuine commercial/industrial surge. | **Do not oversell "explosive residential growth."** The credibility of the whole site depends on not doing this. |
| **Port of Brownsville:** Brazos Island Harbor Channel Improvement Project **completed 25 June 2026** — main channel **42 ft → 52 ft**, entrance and jetty **44 ft → 54 ft**, ~**$295.2 million**, plus ~$50 M landside planned. Largest land-owning public port authority in the county, **40,000+ acres**, **6,000+ direct jobs**, 458,800 truck movements, 85,216 rail cars. | CONFIRMED. Annual tonnage and dollar economic impact: **DO NOT PUBLISH** — not found. |
| **Starbase incorporated as a city** — election 3 May 2025, 212–6; effective **20 May 2025**; Type C municipality; mayor **Bobby Peden**; population just over 500. **HB 5246 (2025)** moved authority to close Boca Chica Beach and SH 4 to the city; SpaceX authorised for **25 launches/year, up from 5**. | CONFIRMED (well-sourced secondary). |
| Cameron County's Starbase impact figures (3,400+ employees, $3B+ infrastructure, etc.) | **PARTIAL** — the county PDF is dated 2024 but contains 2025 figures. Cite as "Cameron County" without a firm date, or omit. |
| **Rio Grande LNG (NextDecade):** Phase 1 FID Jul 2023, Train 4 FID **9 Sep 2025 (~$6.7 B)**, Train 5 Oct 2025; ~**7,500 construction and trade jobs at peak, ~700 permanent**; first LNG targeted **2027**. **Texas LNG (Glenfarne):** Limited Notice to Proceed **2 July 2026**, EPC contractor **Kiewit** — **has NOT reached FID.** | CONFIRMED / PARTIAL as marked. **Annova LNG cancelled its Brownsville project in March 2021 — do not list it as active.** |

### 3.7 Verified landmark names — use these spellings

Palo Alto Battlefield National Historical Park · Resaca de la Palma Battlefield (NPS unit) · Resaca de la Palma State Park (TPWD — a different place) · Sabal Palm Sanctuary · Gladys Porter Zoo · Historic Brownsville Museum · Stillman House & Heritage Museum · Museo Casa Mata · Brownsville Museum of Fine Art · South Texas Ecotourism Center · Laguna Atascosa National Wildlife Refuge · Lower Rio Grande Valley National Wildlife Refuge · **Port Isabel Lighthouse State Historic Site** (421 E Queen Isabella Blvd, built 1852, 72 ft, THC site, the last Texas lighthouse open to the public, Fresnel lens reinstalled 2022) · Laguna Madre · Isla Blanca Park · Arroyo Colorado · Valley International Airport · Brownsville–South Padre Island International Airport · Gateway International Bridge · Veterans International Bridge at Los Tomates · Brownsville & Matamoros International Bridge · Free Trade International Bridge (Los Indios).

**Careful:** the causeway's formal name is the **Queen Isabella Memorial Bridge**, renamed in 2003 to honour the eight people killed in the 2001 barge strike. "Queen Isabella Causeway" is normal local usage and is fine conversationally — **but never use the collapse as a marketing hook.**

---

## 4 · Voice

Write the way a competent superintendent talks to an owner who is about to spend real money.

**Do:**
- Lead with the answer. Then explain. Then qualify.
- Concrete nouns. "Harlingen clay," "caliche base," "1,500 feet from saltwater," "24 inches above top of curb" — not "challenging soil conditions" and "coastal environments."
- Say what you don't do, and where the reader should ask someone else. It is the most persuasive thing on the page.
- Give the honest counter-case. Where R-panel is the right call. Where a repair beats a replacement. Where Class 4 shingles won't help.
- Second person. "Your pad," "your roof," "what you'll be asked for."
- Sentences of varying length. Short ones land hardest after long ones.

**Don't:**
- No "nestled," "boasts," "premier," "state-of-the-art," "trusted partner," "your go-to," "look no further," "in today's fast-paced world," "when it comes to."
- No stacked adjectives. No exclamation marks.
- No em-dash-heavy rhythm. Vary the punctuation.
- No rhetorical questions as section openers.
- No claim about the company that isn't in §2.
- No "we've been serving the Valley for over 20 years" — the founding year is PENDING.

---

## 5 · The frontmatter contract

Every markdown file starts with this. The schema in `src/content.config.ts` rejects anything that doesn't fit.

```yaml
---
title: "H1 for the page — written for humans, not the keyword tool"
metaTitle: "≤60 chars, keyword + city front-loaded, never cut mid-word"
metaDescription: "110–165 chars. Benefit + local + CTA. Must end on punctuation."
quickAnswer: >-
  Exactly 40–60 words. The direct answer to the page's core question, written to be
  quoted verbatim by an answer engine and read aloud by a voice assistant. This same
  string is the Speakable target and the source of the meta description.
datePublished: "2026-08-17"
dateModified: "2026-08-17"
# page-type key: service | parentService | town | town+service | town+neighborhood |
#                vertical | topic | category+parentService
service: "roof-replacement"
heroImage:
  src: "/images/…/….webp"
  alt: "≤125 chars. [what's shown] + [context] + [local]. Describe the image, not the keyword."
  title: "Descriptive title, 5–120 chars"
  width: 1600
  height: 900
images: []
sources:
  - name: "Texas Department of Insurance — Windstorm inspections"
    url: "https://www.tdi.texas.gov/wind/index.html"
    accessed: "2026-08-17"
reviewedDate: "2026-08-17"   # REQUIRED on every compliance page
faqs:                          # 6–8 items, no more, no fewer
  - question: "…"
    answer: "…"
draft: false
---
```

**Body rules:**
- No H1 in the body — the template renders it from `title`.
- Question-formed H2s. One idea per section, answer-first inside each section.
- Every H2 must be unique across the whole site. The harness flags any H2 appearing on ≥15% of pages as a cannibalization signal.
- Do not write a CTA, a phone number, a NAP line, a trust strip, a guarantee blurb or a "why choose us" section into the body. All of it renders from components. Writing it into a body is exactly what the duplicate-sentence scanner catches.
- Internal links: use the valid slug list in §6. A link to a page that does not exist yet fails the dead-link crawler.

---

## 6 · Internal linking

Every page links **up** to its parent, **in** to the hub, and **laterally** to its siblings (M3). The templates emit most of this automatically. What you write in the body should add 4–8 **contextual** in-sentence links that a reader would actually follow.

**Valid slugs** — do not invent one:

- Services: `src/data/services.ts` → `/services/{slug}/`
- Problems: the `problems[]` array on each service row → `/services/{service}/{problem}/`
- Towns: `src/data/towns.ts` (rows with `deferred: true` are **out of territory — never link them**) → `/locations/{town}/`
- City × service: `/locations/{town}/{service}/`
- Neighborhoods: the `neighborhoods[]` array on a town row → `/locations/{town}/{slug}/`
- Verticals: `src/data/verticals.ts` → `/commercial/{slug}/`
- Compliance: `src/data/compliance.ts` → `/compliance/{slug}/`
- Library: `src/content/library/` → `/resources/{slug}/`
- Fixed: `/`, `/services/`, `/locations/`, `/commercial/`, `/compliance/`, `/resources/`, `/case-studies/`, `/our-guarantee/`, `/contact/`, `/about/`

**Every use of the word "guaranteed" must link to `/our-guarantee/`.** No exceptions, and no unqualified "lifetime" anywhere.

---

## 7 · Section spec by page type

Universal block order is rendered by the template: Quick Answer → named expert → your Q&A body → local proof → FAQ → CTA. **Your job is the body between them.** Aim 3,000–5,000 words.

**T2 · Service spoke** — what's included · how the work actually runs, step by step · what decides the price (drivers, not numbers) · what goes wrong and how it's avoided · what the local conditions do to this service · what you'll be asked to provide · links to the problem pages.

**T3 · Problem micro page** — what's happening and why · what to do right now · how to tell how bad it is · when it's a repair and when it isn't · what a proper fix looks like · what it will cost you to ignore it.

**T4 · City page** — the market in real terms (housing stock, era, who lives there) · what the ground does here, by soil series · what the weather and wind zone do here · the specific permits and districts that apply · neighborhoods and what differs between them · what we most often get called for here · community/local proof where it genuinely exists.

**T5 · Neighborhood page** — the same, tighter, with streets, subdivisions and drainage features named. Never a shrunken city page.

**T6 · Library profile** — what it is · where it belongs · where it does NOT belong · how it fails · what it costs to own over time · the local angle · the service spoke it hangs off.

**T7 · Vertical** — the regulatory or operational stake · what an owner or auditor actually looks for · how the program is structured · documentation and reporting · case proof · commercial CTA.

**T8 · Compliance** — the rule stated plainly · who it applies to · obligations · what happens if you don't · how we help **and where our authority stops** · source citation and review date. Hard boundary line is mandatory.

**T9 · Case study** — property type, market, conditions found, method, outcome. No client name without written permission. No estimated figures.

---

## 8 · Imagery

- **Judge every image by sight, never by filename.** Filenames on these libraries are routinely wrong.
- Alt formula: **[what's shown] + [action/context] + [local where the page is city-specific]**, ≤125 chars, unique, natural, no stuffing. Alt describes the image, not the keyword. Never text baked into an image.
- Every image needs both `alt` and `title`. On any re-edit, **preserve** them — the integrity checker snapshots and compares (M6).
- Placement: hero on-topic, then one inline image per ~300–400 words, optional before/after pair on service pages. Geo-match the photo to the page's city.
- WebP, explicit width and height, lazy-load below the fold.
- **No stock photos of roofs in Colorado.** If real field photography doesn't exist for a page, flag it rather than filling the slot.

---

## 9 · Before you submit

1. Word count 3,000–5,000 (`npm run verify:words`).
2. Quick Answer exactly 40–60 words, and it reads well aloud.
3. 6–8 FAQs, none duplicating a body H2.
4. metaTitle ≤60, metaDescription 110–165 ending on punctuation.
5. Every factual claim traceable to §3 or to a source you list in `sources` with an access date.
6. Nothing from the PENDING list invented.
7. Every internal link resolves to a slug in §6.
8. Read your H2s in a list. If two pages could share the list, you templated it — rewrite.
9. `npm run build && npm run verify` — the gate must be green before the batch is delivered.

---

*CONTENT_BRIEF v1.0 · Quality Konnection Construction · built to Keystone v1 · research verified 2026-08-17. Amendments go in this file, not in conversation.*
