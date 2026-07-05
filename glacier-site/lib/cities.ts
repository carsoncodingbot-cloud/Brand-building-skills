/**
 * Greater San Antonio service areas — prioritized by real market demand signals
 * (population density, housing age → repair volume; income/new-build growth → install tickets).
 * Tier 1 = highest lead value "money" pages. Each city carries unique local copy to
 * avoid duplicate content and to actually rank + convert.
 */
export interface City {
  slug: string;
  name: string;
  tier: 1 | 2 | 3;
  county: string;
  angle: string;        // unique local hook
  neighborhoods: string[];
}

export const cities: City[] = [
  // ---- Tier 1: core volume + high-ticket suburbs ----
  { slug: "san-antonio", name: "San Antonio", tier: 1, county: "Bexar County",
    angle: "From 1920s bungalows near downtown to new builds on the far North Side, San Antonio homes span a century of HVAC systems — and our heat tests every one of them.",
    neighborhoods: ["Stone Oak", "Alamo Heights", "Monte Vista", "Southtown", "Northwest Side", "Far West Side"] },
  { slug: "stone-oak", name: "Stone Oak", tier: 1, county: "Bexar County",
    angle: "Stone Oak's larger homes and two-story floor plans demand properly zoned, right-sized systems to stay comfortable and efficient in the North San Antonio heat.",
    neighborhoods: ["Sonterra", "The Vineyard", "Encino Park", "Wilderness Oak"] },
  { slug: "alamo-heights", name: "Alamo Heights", tier: 1, county: "Bexar County",
    angle: "The character homes of Alamo Heights, Terrell Hills, and Olmos Park often pair vintage charm with aging ductwork — exactly the kind of retrofit and repair work we specialize in.",
    neighborhoods: ["Terrell Hills", "Olmos Park", "Lincoln Heights"] },
  { slug: "boerne", name: "Boerne", tier: 1, county: "Kendall County",
    angle: "Hill Country homes around Boerne face big temperature swings and sprawling layouts — we design and service systems that handle both without spiking your energy bill.",
    neighborhoods: ["Fair Oaks Ranch", "Cordillera Ranch", "Cascade Caverns"] },
  { slug: "new-braunfels", name: "New Braunfels", tier: 1, county: "Comal County",
    angle: "New Braunfels' rapid growth means a mix of brand-new construction and long-established homes — and we keep both cool through Comal County summers.",
    neighborhoods: ["Gruene", "Vintage Oaks", "Veramendi", "Solms"] },
  { slug: "schertz", name: "Schertz", tier: 1, county: "Guadalupe County",
    angle: "Schertz's growing family neighborhoods rely on dependable cooling — we keep systems running efficiently for homeowners along the I-35 corridor.",
    neighborhoods: ["The Crossvine", "Jonas Woods", "Ashley Park"] },
  { slug: "cibolo", name: "Cibolo", tier: 1, county: "Guadalupe County",
    angle: "Cibolo's newer subdivisions were built fast — and builder-grade systems often need tuning, upgrades, and honest service to reach their full efficiency.",
    neighborhoods: ["Bentwood Ranch", "Falcon Ridge", "Turning Stone"] },
  { slug: "helotes", name: "Helotes", tier: 1, county: "Bexar County",
    angle: "Helotes homes back up to the Hill Country, where dust, cedar, and heat make solid filtration and reliable cooling non-negotiable.",
    neighborhoods: ["Iron Horse Canyon", "Sonoma Ranch", "The Reserve"] },
  { slug: "converse", name: "Converse", tier: 1, county: "Bexar County",
    angle: "Converse's established and new neighborhoods on the northeast side count on us for fast repairs and efficient replacements that fit real family budgets.",
    neighborhoods: ["Willow Springs", "Escondido", "Fox Grove"] },
  { slug: "bulverde", name: "Bulverde", tier: 1, county: "Comal County",
    angle: "Bulverde and Spring Branch homes sit on larger lots with propane and heat-pump systems that benefit from technicians who know Hill Country HVAC.",
    neighborhoods: ["Johnson Ranch", "Copper Canyon", "Singing Hills"] },
  { slug: "fair-oaks-ranch", name: "Fair Oaks Ranch", tier: 1, county: "Bexar County",
    angle: "Fair Oaks Ranch's upscale homes deserve premium, precisely commissioned systems — and the maintenance to keep them running like new.",
    neighborhoods: ["Fair Oaks", "Rolling Acres", "Woodland Hills"] },
  { slug: "universal-city", name: "Universal City", tier: 1, county: "Bexar County",
    angle: "Near Randolph AFB, Universal City's homeowners — many of them military families — count on us for honest, on-time HVAC service.",
    neighborhoods: ["Northview", "Kitty Hawk", "Meadow Wood"] },

  // ---- Tier 2: affluent / high-growth ----
  { slug: "live-oak", name: "Live Oak", tier: 2, county: "Bexar County",
    angle: "Live Oak's tidy northeast-side neighborhoods rely on us for quick, dependable cooling and heating repairs.",
    neighborhoods: ["Woodcrest", "Forest Ridge"] },
  { slug: "timberwood-park", name: "Timberwood Park", tier: 2, county: "Bexar County",
    angle: "Timberwood Park's spacious homes on the far North Side need systems sized for square footage and Texas sun alike.",
    neighborhoods: ["Timberwood", "Menger Springs"] },
  { slug: "shavano-park", name: "Shavano Park", tier: 2, county: "Bexar County",
    angle: "Shavano Park's established estates value quiet, efficient, meticulously maintained comfort systems.",
    neighborhoods: ["Bentley Manor", "Shavano Rogers Ranch"] },
  { slug: "garden-ridge", name: "Garden Ridge", tier: 2, county: "Comal County",
    angle: "Garden Ridge's larger lots and custom homes call for tailored HVAC design and dependable seasonal maintenance.",
    neighborhoods: ["Rockwall Ranch", "Copperfield"] },
  { slug: "selma", name: "Selma", tier: 2, county: "Guadalupe County",
    angle: "Selma's growing neighborhoods near The Forum count on Glacier for efficient installs and fast repairs.",
    neighborhoods: ["Retama Springs", "Stonebrook"] },
  { slug: "canyon-lake", name: "Canyon Lake", tier: 2, county: "Comal County",
    angle: "Canyon Lake homes and getaways need reliable comfort year-round — including the ductless solutions lake properties often require.",
    neighborhoods: ["Canyon Lake Hills", "Startzville"] },

  // ---- Tier 3: outer metro coverage ----
  { slug: "leon-valley", name: "Leon Valley", tier: 3, county: "Bexar County",
    angle: "Leon Valley's central location keeps us close for fast HVAC response.",
    neighborhoods: ["Forest Meadows"] },
  { slug: "windcrest", name: "Windcrest", tier: 3, county: "Bexar County",
    angle: "Windcrest's mid-century homes often need duct and system upgrades we handle every day.",
    neighborhoods: ["Windcrest"] },
  { slug: "floresville", name: "Floresville", tier: 3, county: "Wilson County",
    angle: "We extend dependable HVAC service south to Floresville and the surrounding Wilson County communities.",
    neighborhoods: ["Floresville"] },
  { slug: "la-vernia", name: "La Vernia", tier: 3, county: "Wilson County",
    angle: "La Vernia's country properties get the same fast, honest service as our in-town customers.",
    neighborhoods: ["La Vernia"] },
];

export const tier1Cities = cities.filter((c) => c.tier === 1);
export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
