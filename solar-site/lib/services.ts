/** Service catalog — drives the nav, homepage grid, /services/[slug] pages and schema. */
export type ServiceIcon =
  | "home" | "sun" | "battery" | "roof" | "bolt" | "panel" | "wrench" | "shield" | "building";

export interface Service {
  slug: string;
  name: string;      // marketing name
  h1: string;        // page H1
  short: string;     // one-liner for the card
  icon: ServiceIcon;
  /** Real job photo backing the homepage card (in /public/services).
   *  Only set when the library has a genuine match — the site launches
   *  photo-free until the real install library exists. No photo beats a
   *  fake photo, every time. */
  photo?: string;
  intro: string;     // page intro paragraph
  features: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "residential-solar",
    name: "Residential Solar",
    h1: "Home Solar Panel Installation in Riverside & the Inland Empire",
    short: "Right-sized rooftop systems designed off your actual usage — with every number in writing before you sign.",
    icon: "sun",
    intro:
      "Inland Empire summers run the AC five months a year, and SCE bills the hottest hours of the day at the highest rates in the company's history. A properly designed solar system flips that math: you generate power in the exact hours you burn it. We size every system off twelve months of your real usage — never a guess, never a template — and you see the full price, the payment, and the year-one savings in writing before anything gets signed.",
    features: [
      { title: "Designed Off Your Real Usage", body: "We pull your actual interval data from your utility account and design to it. A system sized to a sales quota instead of your usage is how neighbors end up with panels and a bill." },
      { title: "The Whole Price, In Writing", body: "System cost, monthly payment, rate assumptions, and payback math on one page — before you sign. No escalator unless you choose one knowingly, and it'll be printed in bold, not buried on page 11." },
      { title: "Owned, Not Rented", body: "We'll walk you through cash, loan, and third-party-ownership honestly — including the resale headaches a 25-year lease can bolt to your title. Then you choose. It's your roof." },
      { title: "Built for NEM 3.0 Reality", body: "California changed the rules in 2023. Systems designed like it's still 2022 leave money on the table every evening. We design for self-consumption first — that usually means talking batteries." },
    ],
    faqs: [
      { q: "Is solar still worth it in California after NEM 3.0?", a: "Often yes — but the honest answer depends on your bill, your utility, and whether you pair storage. Under NEM 3.0, power you export earns a fraction of what you pay to import, so solar-only paybacks stretched while solar-plus-battery stayed strong. If your bill is small, we may tell you solar doesn't pencil. We'd rather lose the sale than put a bad system on your roof." },
      { q: "How big a system do I need?", a: "Whatever your last twelve months of usage says you need — usually somewhere in the 6–12 kW range for an Inland Empire home running AC all summer. We design from your utility data, and we'll show you the production model behind the number." },
      { q: "What happens to my SCE bill after solar?", a: "You'll still get a bill — anyone who says otherwise is setting up a bad surprise. Fixed charges stay, and evening usage the system doesn't cover gets billed at your rate. A well-designed system shrinks the bill dramatically; the design conversation is about how much and how fast it pays back." },
      { q: "Do you use subcontractors?", a: "We tell you exactly who is responsible for your install, your permits, and your warranty before you sign — in writing. That accountability chain is one of the first things we ask you to compare between quotes, including ours." },
    ],
  },
  {
    slug: "battery-storage",
    name: "Battery Storage",
    h1: "Home Battery Storage for SCE Customers — Riverside, Moreno Valley & Beyond",
    short: "Store your midday solar, spend it during 4–9pm peak rates, and keep the lights on when the grid goes down.",
    icon: "battery",
    intro:
      "Under NEM 3.0, the power your panels export at noon earns pennies while the power you buy back at 6pm costs a quarter or more per kilowatt-hour. A battery closes that gap: your own midday production covers your own expensive evening. It's the single biggest reason solar math still works in SCE territory — and it's why we design storage-first, not as an afterthought upsell at the kitchen table.",
    features: [
      { title: "Beat the 4–9pm Peak", body: "SCE's time-of-use plans bill the early evening — exactly when IE homes run hardest — at the day's highest rates. The battery shifts your cheap midday sun into that window automatically." },
      { title: "Real Outage Backup", body: "When the grid drops during a heat wave or a PSPS event, backed-up circuits keep running: fridge, lights, Wi-Fi, medical equipment — and with the right design, the AC. We spec what actually stays on, in writing." },
      { title: "Sized to Your Evenings", body: "Storage is sized from your actual evening usage curve, not a one-size quote. Some homes need one battery. Some need two. Some don't need one at all — and we'll say so." },
      { title: "Add to Existing Solar", body: "Already have panels under an older net-metering deal? A retrofit battery can protect what you have and cover what it doesn't. We'll check your current agreement before recommending anything." },
    ],
    faqs: [
      { q: "Do I need a battery to go solar?", a: "Not always — but in SCE territory under NEM 3.0, storage is usually what makes the math work, because export credits are low while evening rates are high. City of Riverside homes on RPU are a different story: RPU still runs its own net-metering program, so solar-only can pencil there. This is exactly the kind of thing we put in writing before you decide." },
      { q: "Will the battery run my AC in an outage?", a: "Depends on the battery, the AC, and the design — a properly specced system with enough capacity and surge rating can. We list exactly which circuits stay live in your backup design. If a salesperson just says 'everything stays on,' ask them to write it down." },
      { q: "How long does a battery last in a blackout?", a: "A typical home battery stores 10–13.5 kWh. Backing up essentials, that's easily overnight and into the next day — and it recharges from your panels each morning. Whole-home with AC drains far faster, which is why the honest answer starts with a load calculation, not a slogan." },
      { q: "What does a battery add to the price?", a: "It's a real cost — typically five figures installed — which is why nobody should buy one on vibes. We show the with-battery and without-battery math side by side, and you pick the column you like." },
    ],
  },
  {
    slug: "solar-plus-roof",
    name: "Solar + New Roof",
    h1: "Solar and Roof Replacement Together — One Crew, One Permit Cycle, One Warranty Conversation",
    short: "If your roof has under 10 good years left, re-roofing under the panels now beats paying to remove and reinstall later.",
    icon: "roof",
    intro:
      "Panels last 25+ years. If the roof under them has ten years left, you're scheduling an expensive de-and-re — removing and reinstalling the entire array — halfway through the system's life. Doing roof and solar together costs less than doing them apart, keeps one crew accountable for both layers, and means the penetrations are flashed by the same people who warranty the roof. It's the least glamorous, most financially sane pairing in this business.",
    features: [
      { title: "One Accountability Chain", body: "When the roofer and the solar installer are the same accountable party, 'the leak is the other guy's fault' stops being possible. That sentence alone has paid for a lot of our customers' decisions." },
      { title: "The De-and-Re Math, Up Front", body: "We'll show you what a mid-life panel removal and reinstall runs versus re-roofing now. If your roof genuinely has 15+ years left, we'll tell you to keep it — that's most roofs we look at." },
      { title: "Composition, Tile & Flat", body: "IE housing stock runs from 1950s ranch homes to brand-new stucco-and-tile. We design mounting and flashing to the actual roof type, not a catalog default." },
      { title: "Financed Together", body: "One combined project, one payment, instead of a roof loan stacked on a solar loan with two interest clocks running." },
    ],
    faqs: [
      { q: "How do I know if my roof needs replacing before solar?", a: "Age is the first signal — a composition shingle roof past year 15 in Inland Empire sun deserves a hard look. We inspect and give you a written verdict either way. Most roofs pass; when one doesn't, you'll get the reasoning and photos, not pressure." },
      { q: "Does the roof warranty cover the solar penetrations?", a: "When we do both, yes — one warranty conversation covers the roof and every penetration through it. That's the point of pairing them. If you use separate companies, get the flashing responsibility in writing from each." },
      { q: "Can you install solar on a tile roof?", a: "Yes — tile is everywhere in the IE and we mount on it constantly. It takes tile-specific hooks and flashing done carefully; broken-and-hidden tiles are the classic shortcut of a rushed crew, which is why we photograph the work." },
    ],
  },
  {
    slug: "ev-charger-installation",
    name: "EV Charger Install",
    h1: "Home EV Charger Installation in the Inland Empire",
    short: "Level 2 charging installed right — permitted, load-calculated, and timed to charge on your cheapest rate hours.",
    icon: "bolt",
    intro:
      "The IE commute is real, and so is charging a car every night on SCE rates. A Level 2 charger installed with an actual load calculation — not a handyman special off a 15-amp circuit — charges your car 5–8× faster and lets you schedule charging into the cheapest overnight hours. Pair it with solar and midday charging on weekends becomes nearly free driving.",
    features: [
      { title: "Permitted & Load-Calculated", body: "A 40–60 amp continuous load is not a plug-and-pray project. We run the load calc, pull the permit, and leave you paperwork an insurance adjuster will respect." },
      { title: "Rate-Schedule Smart", body: "We set up scheduled charging around your actual SCE (or RPU) rate plan so the car fills up on the cheapest kilowatt-hours of the day, automatically." },
      { title: "Solar-Ready", body: "Adding panels later? We wire and place the charger so solar integration is a settings change, not a rework." },
      { title: "Any Brand", body: "Tesla Wall Connector, ChargePoint, Emporia, or the universal J1772 route — we install what fits your car and your panel, not whatever's in the van." },
    ],
    faqs: [
      { q: "Do I need a panel upgrade for an EV charger?", a: "Sometimes. Many IE homes built before the 1990s run 100-amp panels that are already near capacity with AC and a pool pump. The load calculation answers it definitively — and if you do need an upgrade, you'll get that number before any work starts, not as a surprise mid-install." },
      { q: "How fast is Level 2 charging?", a: "Typically 25–40 miles of range per hour depending on the car and circuit size — versus 3–5 on a wall outlet. For a Moreno Valley or Temecula commuter, that's the difference between 'charged by dinner' and 'charged by Thursday.'" },
    ],
  },
  {
    slug: "main-panel-upgrade",
    name: "Main Panel Upgrade",
    h1: "Main Electrical Panel Upgrades — 200-Amp Service for Solar, Batteries & EVs",
    short: "Older 100-amp panels can't carry a modern electric home. We upgrade, permit, and coordinate with SCE.",
    icon: "panel",
    intro:
      "A lot of Inland Empire homes — especially the 1960s–1980s housing stock in Riverside, San Bernardino, and Fontana — still run 100-amp main panels. Add central AC, an EV charger, a battery, and an induction range, and that panel becomes the bottleneck for everything you want to do next. A 200-amp upgrade is the unglamorous foundation under every other electrification project, and it's the item most solar quotes conveniently forget to mention until after you've signed.",
    features: [
      { title: "Quoted Up Front, Not Discovered Later", body: "If your project needs a panel upgrade, it's in the initial written price. A four-figure 'discovery' after signing is a classic of the genre — not ours." },
      { title: "Utility Coordination Handled", body: "Panel upgrades mean coordinating a service disconnect with SCE (or RPU) and a city inspection. We run that calendar so you don't." },
      { title: "Room to Grow", body: "We spec breaker space for what's next — the second EV, the battery expansion, the ADU — so the panel you buy once is the last one you buy." },
      { title: "Code-Current Safety", body: "Modern panels bring modern protection: proper grounding, AFCI/GFCI where code requires, and no more scorched fuse-era guesswork behind the cover." },
    ],
    faqs: [
      { q: "How do I know if my panel needs upgrading?", a: "If your home is pre-1990 and still on its original 100-amp panel, it's worth a look before any solar, battery, or EV project. A load calculation gives the real answer. Certain legacy brands with documented failure histories also earn an automatic recommendation to replace." },
      { q: "How long does a panel upgrade take?", a: "The install itself is typically a day, with a planned power shutoff of several hours. The calendar time is mostly permitting and utility scheduling, which we manage — expect a few weeks end to end depending on the city." },
    ],
  },
  {
    slug: "solar-repair-service",
    name: "Solar Repair & Rescue",
    h1: "Solar Repair, Service & Orphaned-System Rescue in the Inland Empire",
    short: "Installer disappeared? Production down? Inverter dark? We service systems we didn't install — no lectures, just fixes.",
    icon: "wrench",
    intro:
      "Thousands of California homeowners are solar orphans: the company that installed their system has gone under, stopped answering, or sold their contract three times. Meanwhile the inverter's showing a red light and the 'monitoring app' hasn't updated since spring. We diagnose and repair systems we didn't install — panels, inverters, optimizers, monitoring, wiring — and we'll give you a straight written assessment of what your system is actually producing versus what it should.",
    features: [
      { title: "Orphan-Friendly, On Purpose", body: "Original installer gone? Bring us the paperwork you have — or nothing at all. We'll reverse-engineer the system, get monitoring back online, and become the phone number that answers." },
      { title: "Production Audits", body: "We compare your system's real output against its design model and your roof's potential. If you've been quietly down 30% for two years, you'll finally know — and know what it cost." },
      { title: "Inverter & Component Swaps", body: "Failed string inverters, dead optimizers, chewed wiring, tripping breakers — diagnosed with instruments, quoted in writing, fixed by licensed techs." },
      { title: "Honest Verdicts", body: "Sometimes the right answer is a $400 repair, not a new system. Sometimes it's a warranty claim you didn't know you had. You get the verdict either way — we're not here to sell panels to someone who owns working panels." },
    ],
    faqs: [
      { q: "My solar company went out of business. Am I stuck?", a: "No. Equipment warranties from the panel and inverter manufacturers usually survive the installer's death, and a licensed solar contractor can service the hardware regardless of who installed it. We handle the diagnosis and, where manufacturer warranties apply, the claim paperwork." },
      { q: "How do I know if my system is underproducing?", a: "The fastest tell: compare this summer's production to the same month in its first year, if you have monitoring history. No history? We audit against the design math for your roof. Dirty panels, a failed optimizer, or a half-dead inverter can quietly eat a third of your production while the app just… stops mentioning it." },
      { q: "Do you service leased systems?", a: "Leased and PPA systems are usually the leasing company's contractual responsibility to maintain — and we'll tell you that for free rather than bill you for their job. If they're not responding, we can document the underproduction to strengthen your case with them." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
