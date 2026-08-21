export type PostSection = {
  h2: string;
  body: string[];
  list?: string[];
};

export type Post = {
  slug: string;
  cover: string;
  title: string;
  h1: string;
  description: string;
  date: string; // ISO
  readMinutes: number;
  intro: string;
  sections: PostSection[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
};

/**
 * Content flywheel — every article targets a real buying-intent query for the
 * Inland Empire and tells the truth (Honesty Law): numbers are labeled with
 * their vintage, nothing claims the dead federal credit, and the reader is
 * told when solar DOESN'T pencil. Covers are branded typographic renders in
 * /public/blog (no stock, no fakes).
 */
export const posts: Post[] = [
  {
    slug: "nem-3-explained-inland-empire",
    cover: "/blog/cover-nem-3-explained-inland-empire.png",
    title: "NEM 3.0 in Plain English: What Inland Empire Homeowners Actually Need to Know",
    h1: "NEM 3.0, Explained Like a Neighbor Would",
    description:
      "California changed the solar rules in 2023 and most sales pitches still haven't caught up. Here's what NEM 3.0 really means for Riverside, Moreno Valley, and SCE customers in 2026 — in plain English.",
    date: "2026-08-10",
    readMinutes: 7,
    intro:
      "If a salesperson at your door is quoting solar like it's 2021, they're either behind or hoping you are. In April 2023, California replaced net metering as most people knew it (NEM 2.0) with the Net Billing Tariff — everyone calls it NEM 3.0 — and it changed the math for every new SCE solar customer in the Inland Empire. It didn't kill solar. It changed which systems make sense. Here's the whole thing in plain English.",
    sections: [
      {
        h2: "The old deal vs. the new deal",
        body: [
          "Under the old rules, every kilowatt-hour your panels exported to the grid earned you roughly what you'd have paid to buy it — a clean one-for-one trade. Your meter literally ran backwards at retail value.",
          "Under NEM 3.0, exports are credited at the grid's 'avoided cost' — and for most hours of the year that's on the order of a few cents per kilowatt-hour, while the power you buy back in the evening costs you 30 cents or more. Sell low at noon, buy high at 6pm. That asymmetry is the entire story of modern California solar design.",
        ],
      },
      {
        h2: "Why this makes batteries the main character",
        body: [
          "A battery closes the gap. Instead of exporting your midday production for pennies, you store it and spend it yourself during SCE's 4–9pm peak window — when rates on time-of-use plans run highest, and when an Inland Empire house is running its AC hardest anyway.",
          "That's why solar-with-storage paybacks in Southern California now generally beat solar-only paybacks, commonly landing in the 6–9 year range versus roughly 10–14 for solar alone (2026 figures; your bill, roof, and rate plan move these numbers). It's also why any quote that doesn't at least model a battery for an SCE home isn't really a 2026 quote.",
        ],
      },
      {
        h2: "Who NEM 3.0 does NOT apply to",
        body: [
          "Two groups of readers can relax a little. First: if your system was interconnected under NEM 1.0 or 2.0, you're grandfathered on your old tariff for years to come — one more reason not to let a re-sales pitch talk you into 'upgrading' your agreement casually.",
          "Second: homes billed by municipal utilities instead of SCE. The City of Riverside's RPU runs its own net-metering program with its own rules, and so do Colton and Banning's city utilities. The CPUC's NEM 3.0 decision covers investor-owned utilities like SCE — not the munis. If you're inside Riverside city limits, your math is genuinely different, and usually better.",
        ],
      },
      {
        h2: "The one-sentence takeaway",
        body: [
          "Solar still works in the Inland Empire in 2026 — but it works as a design problem, not a commodity purchase. Size the system to your real usage, aim production at your own evening consumption (usually with storage), verify which utility actually bills you, and demand the whole math in writing before you sign. Anyone who skips those steps is selling you their payment plan, not your savings.",
        ],
      },
    ],
    faqs: [
      { q: "Is solar dead in California under NEM 3.0?", a: "No — installed volume dipped after the rule change, but well-designed systems still pencil, especially with storage or high bills. What died is the lazy, oversized, export-everything system. Good riddance." },
      { q: "I have solar already. Does NEM 3.0 affect me?", a: "If you interconnected under NEM 1.0 or 2.0, you keep your legacy tariff for a multi-year grandfathering period. Be careful: some system changes or agreement rewrites can jeopardize legacy status — get advice before signing anything that modifies your interconnection." },
      { q: "Does the 30% federal tax credit still help?", a: "The federal residential credit (Section 25D) expired for homeowner-owned systems placed in service after December 31, 2025. Any 2026 pitch that quotes you a '30% back from the IRS' discount on a system you own is wrong — walk away from that company on principle." },
    ],
    related: [
      { label: "Do You Actually Need a Battery?", href: "/blog/do-you-need-a-battery-sce" },
      { label: "Battery Storage service", href: "/services/battery-storage" },
      { label: "Riverside's RPU Advantage", href: "/blog/riverside-rpu-solar-advantage" },
    ],
  },
  {
    slug: "solar-panel-cost-inland-empire-2026",
    cover: "/blog/cover-solar-panel-cost-inland-empire-2026.png",
    title: "What Solar Actually Costs in Riverside & the Inland Empire (2026) — Real Numbers",
    h1: "Solar Panel Cost in the Inland Empire: The Real 2026 Numbers",
    description:
      "Straight answers on 2026 solar pricing for Riverside, Moreno Valley, Corona and the IE: cost per watt, what a typical system runs, what changes the price, and the financing traps to dodge.",
    date: "2026-08-03",
    readMinutes: 8,
    intro:
      "Ask five solar companies what a system costs and you'll get five monthly payments and zero prices. Here's the actual anatomy of 2026 solar pricing in the Inland Empire — the same numbers we put in writing on every quote — so you can pressure-test anyone's offer, including ours.",
    sections: [
      {
        h2: "The headline numbers",
        body: [
          "Local market data puts the Riverside area around $2.29 per watt installed in 2026 for a straightforward rooftop system, which lands a typical 8–9 kW home system near $20,000 before any add-ons. Bigger AC loads or pool pumps push system size — and price — up from there.",
          "A home battery adds a real five-figure line item installed. That's not a scare number; it's why the with-battery and without-battery math should be shown side by side on any honest quote, so you can see what the storage actually buys you in evening-rate savings and outage backup.",
        ],
      },
      {
        h2: "What legitimately moves the price",
        body: ["Four things account for most of the spread between quotes on the same house:"],
        list: [
          "System size — driven by your last 12 months of usage, not the installer's mood. Get the design basis in writing.",
          "Roof reality — tile vs. composition, two stories vs. one, a re-roof needed under the array. IE tile roofs take tile-specific mounting done carefully.",
          "Electrical panel — many pre-1990 IE homes need a main panel upgrade before solar, batteries, or an EV charger. It belongs in the first quote, not as a post-signing 'discovery.'",
          "Equipment tier — panels and inverters differ real but modest amounts; a giant price gap between quotes is almost never the hardware. It's usually sales commission and dealer fees.",
        ],
      },
      {
        h2: "The financing trap to check for",
        body: [
          "Solar loans often carry a hidden 'dealer fee' — a markup baked into the system price in exchange for the low advertised APR. Two quotes for the same hardware can differ by thousands purely on this. Ask every company one question: 'What is the cash price, and what is the financed price?' If those two numbers are far apart, you've found the fee.",
          "Also check for payment escalators on leases and PPAs: a payment that rises a few percent every year for 25 years ends up dramatically higher than it started. Escalators aren't automatically evil — but they belong in bold print on page one, not in the appendix.",
        ],
      },
      {
        h2: "What about the tax credit?",
        body: [
          "The 30% federal residential credit expired for homeowner-owned systems placed in service after December 31, 2025. In 2026, a company quoting you that credit on an owned system is either out of date or counting on you being. Commercial and third-party-owned arrangements have their own separate rules — which is exactly the kind of thing to have explained to you in writing, not asserted at your door.",
        ],
      },
    ],
    faqs: [
      { q: "Is a bigger system always better?", a: "No — under NEM 3.0, oversizing an SCE system just donates surplus power to the grid at a few cents per kWh. The right size aims at your own consumption. (RPU customers in Riverside city have more room here — their export credits work differently.)" },
      { q: "Why do quotes vary so much for the same roof?", a: "Mostly sales cost and dealer fees, not hardware. A door-to-door national brand can carry thousands in commission per deal. Compare cash prices and equipment lists, not monthly payments." },
      { q: "What should be in writing before I sign?", a: "The full system price, cash vs. financed, equipment makes and models, system size with the design basis, any escalator, who holds the workmanship and roof-penetration warranty, and the assumed utility rates behind any savings projection. Miss one and you're comparing stories, not offers." },
    ],
    related: [
      { label: "Residential Solar service", href: "/services/residential-solar" },
      { label: "Financing, honestly", href: "/financing" },
      { label: "7 Solar Scams to Spot", href: "/blog/solar-scams-inland-empire-red-flags" },
    ],
  },
  {
    slug: "solar-scams-inland-empire-red-flags",
    cover: "/blog/cover-solar-scams-inland-empire-red-flags.png",
    title: "7 Solar Scams Hitting Inland Empire Doorsteps Right Now — and How to Spot Each One",
    h1: "The 7 Solar Scams Working IE Neighborhoods — Spot Them in One Sentence Each",
    description:
      "'Free solar,' fake utility reps, buried escalators, dead tax credits: the door-to-door plays running in Riverside and San Bernardino counties in 2026, and the one question that kills each of them.",
    date: "2026-07-27",
    readMinutes: 6,
    intro:
      "We're a solar company telling you how solar companies cheat. That's on purpose — every scam below poisons the well for the honest math, and Inland Empire neighborhoods are among the most heavily door-knocked in America. Each scam comes with the one question that makes it fall apart on your doorstep.",
    sections: [
      {
        h2: "The seven plays",
        body: ["Consumer agencies and state regulators log thousands of solar complaints a year in California. Nearly all of them trace back to seven moves:"],
        list: [
          "1. 'FREE solar — a government program covers it.' There is no free-solar government program. This pitch is a 20–25 year lease or PPA wearing a costume. Kill question: 'Who owns the system, and what do I owe in year 25?'",
          "2. 'I'm with SCE / with the utility.' Utilities don't sell rooftop solar door to door — ever. Kill question: 'Show me utility ID, and I'll call SCE to confirm while you wait.'",
          "3. The buried escalator. A payment that climbs ~3% yearly for 25 years, disclosed on page 11. Kill question: 'What's my exact payment in year 20? Write it here.'",
          "4. The dead tax credit. The 30% federal homeowner credit expired end of 2025. Anyone quoting it on a 2026 owned system is disqualified. Kill question: 'Which tax code section, and does it apply to systems placed in service in 2026?'",
          "5. The vanishing installer. The sales brand isn't the install crew isn't the warranty holder. When something leaks, everyone points at everyone. Kill question: 'Which single company holds my workmanship warranty? Write its CSLB number.'",
          "6. The lien surprise. Some financing records a security interest against your home that surfaces when you try to sell. Kill question: 'Will anything be recorded against my title, and can I see the exact document first?'",
          "7. The savings mirage. Projections built on inflated rate-increase assumptions and 'up to' math. Kill question: 'Show me the assumed utility rate for every year of this projection.'",
        ],
      },
      {
        h2: "One paragraph of self-defense",
        body: [
          "California gives you a right to cancel a home solicitation contract — typically three business days, longer for seniors — and every legitimate contract states this. Verify any contractor at the CSLB license lookup before signing. And the most powerful move costs nothing: sleep on it. A real offer survives the night. A fake one gets desperate at 8pm.",
        ],
      },
      {
        h2: "Why we publish this",
        body: [
          "Because the fastest way to prove we're not one of these companies is to hand you the ammunition and invite you to aim it at us. Every kill question above has a written answer in our standard quote. If any solar company's paperwork can't answer them — including ours — don't sign it.",
        ],
      },
    ],
    faqs: [
      { q: "Is door-to-door solar always a scam?", a: "No — some legitimate companies knock. But statistically, the worst contracts in this industry were signed at kitchen tables the same evening a stranger knocked. The filter isn't the doorstep; it's whether the paperwork survives the seven questions." },
      { q: "I think I already signed a bad contract. Now what?", a: "Check your cancellation window first — you may still be inside it. Outside it, document everything, contact the CSLB and the state Attorney General's consumer complaint line, and get the contract in front of someone qualified. If the system underproduces, a production audit creates the paper trail." },
      { q: "Do you pay your salespeople commission?", a: "Our consultants are paid for accuracy, not tonnage — and no one at this company is paid more for selling you a bigger system than your usage supports. That incentive design is on our promise page in writing." },
    ],
    related: [
      { label: "The Daylight Standard", href: "/our-promise" },
      { label: "Solar Repair & Rescue", href: "/services/solar-repair-service" },
      { label: "Real Cost Numbers", href: "/blog/solar-panel-cost-inland-empire-2026" },
    ],
  },
  {
    slug: "do-you-need-a-battery-sce",
    cover: "/blog/cover-do-you-need-a-battery-sce.png",
    title: "Do You Actually Need a Battery? The Honest Answer for SCE Customers",
    h1: "Do You Need a Battery? Depends. Here's the Actual Decision.",
    description:
      "Batteries are the default upsell in every 2026 solar pitch. Sometimes they're right. Here's the honest decision framework for SCE households in Moreno Valley, Corona, Fontana and the rest of the IE.",
    date: "2026-07-19",
    readMinutes: 6,
    intro:
      "Every solar pitch in SCE territory now ends with a battery, and the cynical read is that batteries doubled the ticket. The honest read is more interesting: under NEM 3.0 the battery often IS the product, and the panels are its supply chain. But 'often' is not 'always' — so here's the actual decision, the way we run it on real quotes.",
    sections: [
      {
        h2: "The case FOR the battery (it's strong)",
        body: [
          "Three facts stack up. One: SCE's time-of-use plans price the 4–9pm window at the day's highest rates — summer peaks on common TOU plans run several times the off-peak price, and 2026's tiered plan jumps past 40¢/kWh above baseline. Two: NEM 3.0 credits your exports at a small fraction of those rates. Three: Inland Empire evenings are exactly when your AC works hardest.",
          "A battery converts that triple squeeze into your advantage: charge it free at noon, drain it during the expensive window, repeat daily for a decade. Add outage backup during heat-wave grid events and PSPS shutoffs, and the with-battery payback in Southern California commonly beats solar-only by years.",
        ],
      },
      {
        h2: "The case AGAINST (it exists, and salespeople hate it)",
        body: [
          "If your evening usage is genuinely small — a working couple who runs almost nothing until 9pm — the arbitrage window is thin and the battery is mostly buying backup comfort, which is a fine thing to buy on purpose and a bad thing to buy by default.",
          "And if you're on RPU inside Riverside city limits, the whole NEM 3.0 squeeze doesn't apply to you — RPU's own net-metering program credits exports on retail-adjacent terms, so solar-only pencils there in a way it no longer does next door in SCE territory. Anyone quoting a Riverside-city home a mandatory battery 'because NEM 3.0' has just failed the local-knowledge test.",
        ],
      },
      {
        h2: "The 4-question decision",
        body: [],
        list: [
          "Who bills you — SCE, or a municipal utility (RPU, Colton, Banning)? SCE → battery leans yes. Muni → run solar-only first.",
          "What's your 4–9pm usage? Big AC evenings → yes. Ghost-town evenings → maybe not.",
          "How much do outages cost you — medically, professionally, or in spoiled groceries and misery? Real cost → the backup value is real.",
          "Does the with-battery quote beat the without-battery quote on 10-year math, using honest rate assumptions? Make them show both columns. We always do.",
        ],
      },
    ],
    faqs: [
      { q: "Can I add a battery later instead?", a: "Yes, and sometimes that's the right sequencing — but a battery-ready design (inverter choice, panel capacity, conduit runs) should be baked in now either way. Retrofitting a system that never planned for storage costs meaningfully more." },
      { q: "How long do home batteries last?", a: "Warranties typically run 10 years; usable life often exceeds it with gentle daily cycling. Like panels, they degrade gradually rather than dying at the warranty's stroke of midnight." },
      { q: "Whole-home backup or essentials-only?", a: "Essentials-only (fridge, lights, internet, some plugs) is the honest sweet spot for most budgets. Whole-home with AC takes serious capacity and cost. The right answer is a load calculation, and it should be written into your backup design." },
    ],
    related: [
      { label: "Battery Storage service", href: "/services/battery-storage" },
      { label: "NEM 3.0 in Plain English", href: "/blog/nem-3-explained-inland-empire" },
      { label: "Start the 60-Second Check", href: "/quote" },
    ],
  },
  {
    slug: "sce-rate-increases-inland-empire",
    cover: "/blog/cover-sce-rate-increases-inland-empire.png",
    title: "SCE Keeps Raising Rates: What the 4–9pm Window Actually Costs You Now",
    h1: "Your 4–9pm Problem: SCE's Rates, Explained With Real Numbers",
    description:
      "SCE's average residential rate jumped ~13% in one step in late 2025 and now runs ~34–35¢/kWh, with a fixed monthly charge you can't conserve away. What that means for an Inland Empire home — and what actually fights back.",
    date: "2026-07-12",
    readMinutes: 6,
    intro:
      "You didn't imagine it: the bill really did jump. In October 2025 SCE's average residential rate rose roughly 13% in a single step, from about 31¢ to over 35¢ per kilowatt-hour, and further increases are proposed through 2028. Late 2025 also brought something new: a fixed monthly Base Services Charge of $24.15 that applies no matter how little you use. Here's what the structure of your bill now looks like — and which parts of it you can actually do something about.",
    sections: [
      {
        h2: "The anatomy of a 2026 SCE bill",
        body: [
          "Three layers. First, the fixed charge: $24.15/month, immune to conservation (income-qualified discounts exist). Second, the rate structure: on the tiered plan, usage above your baseline allocation jumps past 40¢/kWh; on time-of-use plans, the 4–9pm window is priced highest, with summer peak rates on some plans reaching well past 50¢/kWh. Third, the trajectory: annual increases are the pattern, not the exception.",
          "For an Inland Empire household, the cruel geometry is that 4–9pm is not optional. It's dinner, laundry, and the AC clawing the house back from a 105° afternoon. The utility priced the exact hours your life happens.",
        ],
      },
      {
        h2: "What doesn't work",
        body: [
          "Conservation theater — the sixth LED swap, the thermostat set to sweaty — nibbles at the middle layer while the fixed charge ignores you completely and the rate trajectory eats your gains annually. Conservation is virtuous; as a strategy against this bill structure, it's bringing a coupon to a rent increase.",
        ],
      },
      {
        h2: "What does work",
        body: [
          "Structural moves that change which rates you pay rather than how virtuously you consume: generating your own daytime power (solar), time-shifting it into the expensive window (storage), and moving big flexible loads — EV charging, pool pumps — into off-peak hours on the right rate plan.",
          "Whether those pencil for your specific house is a design question with a written answer. Sometimes the answer is 'not yet' — a small bill, a shaded roof, a move planned in two years. We put that in writing too, because a company that can't say 'no sale' can't be trusted saying 'yes.'",
        ],
      },
    ],
    faqs: [
      { q: "Which SCE rate plan is best?", a: "Depends entirely on your usage curve — TOU plans reward households that can shift load off-peak; the tiered plan can suit flat, modest usage. With solar and storage the calculus changes again. Rate-plan choice is part of our written design, not an afterthought." },
      { q: "Will rates really keep rising?", a: "SCE has proposed increases through 2028, and wildfire, grid-hardening, and infrastructure costs keep pushing the same direction. We model savings with stated rate assumptions per year — never a magic 'utility rates rise 8% forever' curve. Ask any quoter for their assumed numbers, in writing." },
      { q: "Does moving to a CCA help?", a: "Community choice aggregators change the generation slice of the bill, but SCE still delivers the power and the structural problem — peak-priced evenings plus fixed charges — persists. It's worth checking; it isn't an escape hatch." },
    ],
    related: [
      { label: "Do You Need a Battery?", href: "/blog/do-you-need-a-battery-sce" },
      { label: "Residential Solar", href: "/services/residential-solar" },
      { label: "60-Second Reality Check", href: "/quote" },
    ],
  },
  {
    slug: "riverside-rpu-solar-advantage",
    cover: "/blog/cover-riverside-rpu-solar-advantage.png",
    title: "Riverside's Hidden Solar Advantage: Why RPU Customers Get a Better Deal Than Their SCE Neighbors",
    h1: "Inside Riverside City Limits, the Solar Math Is Different — Better",
    description:
      "City of Riverside homes are billed by Riverside Public Utilities, not SCE — and RPU runs its own net-metering program outside NEM 3.0. What that means for Wood Streets, Canyon Crest, Orangecrest and every RPU rooftop.",
    date: "2026-07-05",
    readMinutes: 5,
    intro:
      "Here's a fact most door-knockers working Riverside don't know about the city they're knocking in: if your electric bill says Riverside Public Utilities, the state's NEM 3.0 rules — the ones that gutted export credits for SCE customers — don't govern your solar deal. Riverside owns its own utility, sets its own rates, and runs its own net-metering program. That's not a loophole; it's a municipal utility doing what municipal utilities do. And it changes the advice.",
    sections: [
      {
        h2: "What's actually different on RPU",
        body: [
          "RPU's self-generation program credits the energy your system exports to the city grid — with export credits on the order of 9¢/kWh (check current program terms when you quote; municipal programs evolve too). That's several times what a typical SCE NEM 3.0 export earns. Your meter arithmetic is simply friendlier inside city limits.",
          "RPU's retail rates also sit below SCE's — which cuts both ways: smaller bills mean solar saves fewer absolute dollars, but better export terms mean a simpler system captures more of what it makes. Net effect: solar-only, without a battery, still pencils in Riverside city in a way it mostly doesn't next door in SCE territory.",
        ],
      },
      {
        h2: "The advice that changes",
        body: [],
        list: [
          "Battery pressure drops. On SCE, storage is usually what rescues the math. On RPU, a battery is a backup-power choice, not a financial necessity. Buy it because you want outage protection — not because a pitch deck said 'NEM 3.0.'",
          "Sizing loosens slightly. SCE design aims tightly at self-consumption; RPU's export credit gives you a little honest headroom.",
          "The utility check comes first. Riverside's borders interleave with SCE territory in spots — Jurupa Valley, Highgrove, county pockets. The first line of any Riverside-area quote should identify your utility. If a quote doesn't, it was written for a different house.",
        ],
      },
      {
        h2: "The catch (there's always one)",
        body: [
          "Municipal programs are set by the city and can change for future customers, the same way the CPUC changed the state's rules. That's an argument for getting your system interconnected under current terms and keeping your paperwork — not for waiting to see if the deal improves. Deals like this don't usually improve.",
        ],
      },
    ],
    faqs: [
      { q: "How do I know if I'm on RPU or SCE?", a: "Look at who sends your electric bill. Roughly: inside Riverside city limits → RPU; unincorporated pockets and neighboring cities → SCE. We verify it from your address before quoting, because the design depends on it." },
      { q: "Does RPU require its own permits and interconnection?", a: "Yes — RPU has its own interconnection process and the city its own permitting. It's routine for us; it's a maze for out-of-area crews, which is why RPU homeowners disproportionately end up with paperwork problems from national installers." },
      { q: "Colton and Banning have city utilities too — same story?", a: "Same species, different details: each muni sets its own program. We quote to the actual program of the actual utility on your actual bill. It's a low bar. You'd be amazed." },
    ],
    related: [
      { label: "Riverside service area", href: "/service-areas/riverside" },
      { label: "NEM 3.0 in Plain English", href: "/blog/nem-3-explained-inland-empire" },
      { label: "Residential Solar", href: "/services/residential-solar" },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
