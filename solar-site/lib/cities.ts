/**
 * Inland Empire service areas — prioritized by real solar-market signals
 * (bill size & AC load, housing stock age → panel-upgrade volume, rooftop
 * size, growth). Tier 1 = highest lead value "money" pages. Each city carries
 * unique local copy — including which UTILITY serves it, because that changes
 * the solar math (SCE = NEM 3.0 → battery-first; municipal utilities like
 * Riverside's RPU run their own net-metering programs).
 */
export interface City {
  slug: string;
  name: string;
  tier: 1 | 2 | 3;
  county: string;
  utility: string;      // who bills these homes — drives the honest math copy
  angle: string;        // unique local hook
  neighborhoods: string[];
}

export const cities: City[] = [
  // ---- Tier 1: core volume + high-bill, big-roof suburbs ----
  { slug: "riverside", name: "Riverside", tier: 1, county: "Riverside County",
    utility: "Riverside Public Utilities (RPU)",
    angle: "Riverside is the Inland Empire's quiet solar advantage: homes inside the city limits are served by Riverside Public Utilities, a municipal utility that runs its own net-metering program instead of NEM 3.0 — which changes the payback math in your favor. From Victoria-era bungalows in the Wood Streets to newer builds in Orangecrest, we design to RPU's actual rules, not SCE assumptions.",
    neighborhoods: ["Wood Streets", "Canyon Crest", "Orangecrest", "Mission Grove", "La Sierra", "Arlington Heights"] },
  { slug: "moreno-valley", name: "Moreno Valley", tier: 1, county: "Riverside County",
    utility: "SCE (with Moreno Valley Utility in newer areas)",
    angle: "Moreno Valley summers regularly clear 100°, and most of the city pays SCE's steepest evening rates right when the AC works hardest — while some newer neighborhoods sit on Moreno Valley Utility with different rules. We check which one bills you before we quote, because the right system design depends on it.",
    neighborhoods: ["Rancho Belago", "Sunnymead Ranch", "Towngate", "Moreno Valley Ranch", "Hidden Springs"] },
  { slug: "corona", name: "Corona", tier: 1, county: "Riverside County",
    utility: "SCE",
    angle: "Corona's big two-story stucco homes and 91-commuter households run heavy evening usage — exactly the load SCE's 4–9pm peak pricing punishes. Solar with storage flips that curve, and Corona's newer roofs make for clean, fast installs.",
    neighborhoods: ["Dos Lagos", "Sierra del Oro", "Eagle Glen", "South Corona", "Corona Ranch"] },
  { slug: "fontana", name: "Fontana", tier: 1, county: "San Bernardino County",
    utility: "SCE",
    angle: "Fontana mixes 1950s Steel-Town originals with some of the fastest-growing new-build neighborhoods in the state. Older homes often need the 100-amp panel conversation before solar; newer ones in the north end are practically built for it. We quote both honestly.",
    neighborhoods: ["Southridge", "Sierra Lakes", "Hunters Ridge", "Coyote Canyon", "Village of Heritage"] },
  { slug: "menifee", name: "Menifee", tier: 1, county: "Riverside County",
    utility: "SCE",
    angle: "Menifee is new roofs, big single-story footprints, and all-day sun — mechanically the best solar canvas in the IE. The catch is contract quality, not roof quality: this market gets blanketed by door-knockers, so our whole pitch is the paperwork you can actually read.",
    neighborhoods: ["Sun City", "Heritage Lake", "Audie Murphy Ranch", "Menifee Lakes"] },
  { slug: "temecula", name: "Temecula", tier: 1, county: "Riverside County",
    utility: "SCE",
    angle: "Temecula households run pools, garages full of toys, and serious square footage — big bills with big roofs to fix them. We design for real usage including the pool pump schedule, and we put every number in writing before you sign anything.",
    neighborhoods: ["Redhawk", "Paloma del Sol", "Harveston", "Wolf Creek", "Meadowview"] },
  { slug: "murrieta", name: "Murrieta", tier: 1, county: "Riverside County",
    utility: "SCE",
    angle: "Murrieta's newer housing stock means clean roofs, modern panels, and permits that move — some of the smoothest installs we do. The design question here is almost always storage: commuter households burn their power exactly inside SCE's 4–9pm peak window.",
    neighborhoods: ["Central Park", "Copper Canyon", "Greer Ranch", "California Oaks", "Spencer's Crossing"] },
  { slug: "eastvale", name: "Eastvale", tier: 1, county: "Riverside County",
    utility: "SCE",
    angle: "Eastvale is one of California's youngest cities — big family homes, EV-heavy driveways, and electric bills that show it. Solar plus a charger-ready panel is close to a default here, and the new-build roofs make install day almost boring. Almost.",
    neighborhoods: ["The Enclave", "Providence Ranch", "Cloverdale Farms", "Eastvale Gateway"] },

  // ---- Tier 2: strong volume, mixed housing stock ----
  { slug: "perris", name: "Perris", tier: 2, county: "Riverside County",
    utility: "SCE",
    angle: "Perris homes take the full brunt of inland heat with fewer shade trees than almost anywhere in the county — brutal for bills, ideal for panels. We're straight with every household about what pencils and what doesn't.",
    neighborhoods: ["May Ranch", "Villages of Avalon", "Monument Ranch"] },
  { slug: "hemet", name: "Hemet", tier: 2, county: "Riverside County",
    utility: "SCE",
    angle: "Hemet's mix of retirement communities and working families makes it a prime target for high-pressure solar sales — and we've seen the contracts that result. Our Hemet promise is simple: large-print numbers, no escalators, and we'll tell you if solar doesn't make sense on your fixed budget.",
    neighborhoods: ["Seven Hills", "McSweeny Farms", "Panorama Village", "Valle Vista"] },
  { slug: "lake-elsinore", name: "Lake Elsinore", tier: 2, county: "Riverside County",
    utility: "SCE",
    angle: "Lake Elsinore's growth spurt built thousands of new roofs in the last decade — most of them still waiting for panels while their owners pay SCE's climb year after year. Canyon Hills to Tuscany Hills, we run the real math on the house you actually live in.",
    neighborhoods: ["Canyon Hills", "Tuscany Hills", "Summerly", "Rosetta Canyon"] },
  { slug: "jurupa-valley", name: "Jurupa Valley", tier: 2, county: "Riverside County",
    utility: "SCE",
    angle: "Jurupa Valley's half-acre lots and horse properties mean big roofs, workshops, and well pumps — usage profiles a cookie-cutter quote gets wrong every time. We design to the property, outbuildings included.",
    neighborhoods: ["Eastvale border", "Glen Avon", "Pedley", "Mira Loma", "Rubidoux"] },
  { slug: "rialto", name: "Rialto", tier: 2, county: "San Bernardino County",
    utility: "SCE",
    angle: "Rialto's postwar neighborhoods often carry original electrical panels that need addressing before solar — the four-figure surprise other companies spring after signing. Here it's in the first written quote or it doesn't happen.",
    neighborhoods: ["Las Colinas", "El Rancho Verde", "North Rialto"] },
  { slug: "san-bernardino", name: "San Bernardino", tier: 2, county: "San Bernardino County",
    utility: "SCE",
    angle: "San Bernardino homeowners field more predatory solar pitches than almost any city we serve. We put the contract terms in plain English and large print, explain PACE-style financing traps before you're near one, and never park a lien surprise on anyone's title.",
    neighborhoods: ["Verdemont", "University District", "Arrowview", "Del Rosa"] },
  { slug: "redlands", name: "Redlands", tier: 2, county: "San Bernardino County",
    utility: "SCE",
    angle: "Redlands' historic districts have character roofs that deserve better than a rushed racking job — and its newer east-side homes have bills that deserve better than SCE's escalation. Both get careful, documented work.",
    neighborhoods: ["South Redlands", "University area", "Smiley Heights", "East Valley"] },
  { slug: "rancho-cucamonga", name: "Rancho Cucamonga", tier: 2, county: "San Bernardino County",
    utility: "SCE",
    angle: "Rancho Cucamonga pairs some of the IE's highest household energy use with HOA-conscious neighborhoods — installs here need clean lines, black-on-black panels, and paperwork the architectural committee can approve fast. That's our default spec, not an upgrade.",
    neighborhoods: ["Alta Loma", "Etiwanda", "Victoria", "Terra Vista", "Day Creek"] },
  { slug: "ontario", name: "Ontario", tier: 2, county: "San Bernardino County",
    utility: "SCE",
    angle: "From Ontario Ranch's brand-new neighborhoods to the mature streets near downtown, Ontario spans every roof age and panel vintage in the book. The quote starts with which one you own — not with a one-size monthly payment.",
    neighborhoods: ["Ontario Ranch", "Creekside", "Downtown Ontario", "New Haven"] },
  { slug: "beaumont", name: "Beaumont", tier: 2, county: "Riverside County",
    utility: "SCE",
    angle: "Beaumont's pass-country wind and heat work roofs hard, and its newer communities were built with solar in mind. We design mounting for the San Gorgonio wind zone specifically — hardware that stays put when the gusts come through.",
    neighborhoods: ["Sundance", "Tournament Hills", "Fairway Canyon", "Olivewood"] },

  // ---- Tier 3: surrounding communities we serve ----
  { slug: "norco", name: "Norco", tier: 3, county: "Riverside County",
    utility: "SCE",
    angle: "Horsetown USA runs barns, arenas, and well pumps on top of house loads — rural usage that deserves a designed system, not a subdivision template.",
    neighborhoods: ["Norco Hills", "Old Norco"] },
  { slug: "wildomar", name: "Wildomar", tier: 3, county: "Riverside County",
    utility: "SCE",
    angle: "Wildomar's newer tracts and rural pockets both get the same treatment: real usage data, real math, and a written price that doesn't move.",
    neighborhoods: ["Windsong Valley", "The Farm"] },
  { slug: "canyon-lake", name: "Canyon Lake", tier: 3, county: "Riverside County",
    utility: "SCE",
    angle: "Canyon Lake's gated community has its own rhythm — POA approvals, lake-house rooflines, and golf-cart streets. We've done the paperwork dance and design panels that pass review.",
    neighborhoods: ["East Bay", "North Shore"] },
  { slug: "colton", name: "Colton", tier: 3, county: "San Bernardino County",
    utility: "Colton Electric Utility",
    angle: "Colton runs its own municipal electric utility with its own rates and interconnection rules — different math than SCE next door. We quote to Colton's actual program, which most out-of-town sales teams have never read.",
    neighborhoods: ["Reche Canyon", "Grand Terrace border", "South Colton"] },
  { slug: "highland", name: "Highland", tier: 3, county: "San Bernardino County",
    utility: "SCE",
    angle: "Highland's foothill homes catch full sun and full heat off the San Bernardinos — honest solar territory with roofs that earn their keep.",
    neighborhoods: ["East Highlands Ranch", "Highland Hills"] },
  { slug: "yucaipa", name: "Yucaipa", tier: 3, county: "San Bernardino County",
    utility: "SCE",
    angle: "Yucaipa's mix of ranch properties and newer family neighborhoods spans every system size we build — from modest offset arrays to whole-property designs with storage.",
    neighborhoods: ["Chapman Heights", "Oak Glen border", "North Bench"] },
  { slug: "banning", name: "Banning", tier: 3, county: "Riverside County",
    utility: "Banning Electric Utility",
    angle: "Banning homes are billed by the city's own electric utility — its solar rules differ from SCE's, and the design should too. Pass-country wind loads also mean racking specs that hold.",
    neighborhoods: ["Sun Lakes", "Downtown Banning"] },
  { slug: "grand-terrace", name: "Grand Terrace", tier: 3, county: "San Bernardino County",
    utility: "SCE",
    angle: "Small city, straightforward installs, same standard: usage-based design and the whole price in writing before signatures.",
    neighborhoods: ["Blue Mountain", "Honey Hills"] },
  { slug: "loma-linda", name: "Loma Linda", tier: 3, county: "San Bernardino County",
    utility: "SCE",
    angle: "Loma Linda households think in decades — it's that kind of town. So does a well-built solar system, and the 25-year math is exactly the conversation we like having.",
    neighborhoods: ["South Hills", "Mission district"] },
  { slug: "san-jacinto", name: "San Jacinto", tier: 3, county: "Riverside County",
    utility: "SCE",
    angle: "San Jacinto's valley heat drives some of the county's hardest-working AC compressors. Solar sized to the real cooling load — not the brochure average — is the difference between a dent and a dead bill.",
    neighborhoods: ["The Cove", "Park Hill", "Rancho San Jacinto"] },
];

export const tier1Cities = cities.filter((c) => c.tier === 1);
export const tier2Cities = cities.filter((c) => c.tier === 2);
export const tier3Cities = cities.filter((c) => c.tier === 3);

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
