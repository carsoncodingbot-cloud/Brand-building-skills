export type PostSection = {
  h2: string;
  body: string[];
  list?: string[];
};

export type Post = {
  slug: string;
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

export const posts: Post[] = [
  {
    slug: "ac-running-but-not-cooling-san-antonio",
    title: "AC Running But Not Cooling? A San Antonio Homeowner's Guide",
    h1: "Why Is My AC Running But Not Cooling?",
    description:
      "Your AC runs all day but the house stays warm? Here are the 6 most common causes in San Antonio homes — what you can check yourself, and when to call a pro.",
    date: "2026-07-10",
    readMinutes: 6,
    intro:
      "It's one of the most common calls we get all summer: the system never stops running, the air from the vents feels weak or barely cool, and the house sits at 78° while the thermostat begs for 72°. The good news — in San Antonio, this problem usually comes down to one of six causes, and two of them you can check yourself before anyone rolls a truck.",
    sections: [
      {
        h2: "1. A clogged air filter (check this first — it's free)",
        body: [
          "A 1-inch filter in a Texas summer can load up in 30–45 days, not the 90 the box promises. When the filter chokes, airflow across the indoor coil drops, the coil can ice over, and the system runs endlessly while moving almost no cold air.",
          "Pull the filter and hold it up to a light. If you can't see light through it, swap it and give the system a few hours. This single check resolves a surprising share of 'not cooling' calls — and it costs a few dollars.",
        ],
      },
      {
        h2: "2. A dirty outdoor coil",
        body: [
          "Your outdoor unit has to dump the heat it pulls from your house into 95°+ air. If the coil is coated in dust, pollen, and grass clippings, it can't shed heat, and cooling capacity falls off a cliff.",
          "The fix is a gentle rinse: kill the power at the outdoor disconnect, then hose the coil top to bottom with a garden hose — never a pressure washer, the fins bend easily. Keep two feet of clearance around the unit while you're at it.",
        ],
      },
      {
        h2: "3. Low refrigerant (this one needs a pro)",
        body: [
          "Refrigerant doesn't get 'used up' — if it's low, it leaked. Telltale signs: ice on the copper lines, a hissing sound, air that's cool-ish but never cold, and a system that runs constantly on hot afternoons.",
          "Topping it off without fixing the leak is renting a solution. A proper repair finds the leak, fixes it, and weighs in the correct charge. If your system uses discontinued R-22 refrigerant, a leak is usually the moment to talk replacement math instead.",
        ],
      },
      {
        h2: "4. A weak or failed capacitor",
        body: [
          "The capacitor is a small, cheap part that gives your compressor and fan motors their starting kick. In our heat, capacitors are one of the most common summer failures. A weak one can leave the outdoor fan running while the compressor never truly engages — so the system 'runs' but nothing gets cold.",
          "This is a fast, inexpensive fix for a technician, and one of the best-value repairs in the trade.",
        ],
      },
      {
        h2: "5. Leaky or crushed ductwork",
        body: [
          "In many San Antonio homes the ducts run through a 130°+ attic. If joints are unsealed or a flex duct is crushed, you can lose a big share of your cold air into the attic before it ever reaches a bedroom. The classic symptom: one or two rooms stay hot while the rest of the house is fine.",
          "Duct sealing isn't glamorous, but it's some of the highest-return work we do — cold air belongs in your rooms, not your attic.",
        ],
      },
      {
        h2: "6. A system that's simply out of capacity",
        body: [
          "If your AC is 12–15+ years old, cools fine in May but can't hold temperature in August, and your electric bill keeps climbing, the system may just be past its prime. Compression weakens with age, and every summer asks more of it.",
          "The honest test is math, not sales pressure: if a repair costs more than about a third of a new system's price on a unit past 12 years, replacement usually wins — especially with today's high-efficiency units cutting cooling costs meaningfully.",
        ],
      },
      {
        h2: "What to do right now",
        body: [
          "Check the filter, rinse the coil, and give it a few hours. If the house still won't cool, it's time for a diagnosis — and it shouldn't cost you a mystery invoice to find out what's wrong.",
          "At Glacier, the price goes in writing before a single tool comes out, and it doesn't move. Free exact-price estimates, straight answers, and 24/7 availability across greater San Antonio.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is my AC blowing air but it's not cold?",
        a: "Most often: a clogged filter, a dirty outdoor coil, low refrigerant from a leak, or a weak capacitor keeping the compressor from engaging. The first two you can check yourself; the last two need a technician with gauges and a meter.",
      },
      {
        q: "Should I keep running my AC if it isn't cooling?",
        a: "If you see ice on the unit or the copper lines, switch the system to OFF (fan ON is okay) and let it thaw — running it iced-up can damage the compressor, the most expensive part of the system.",
      },
      {
        q: "How fast can someone look at it in San Antonio?",
        a: "During summer we prioritize no-cool calls and offer 24/7 emergency availability. Call or text (866) 665-2210 and we'll get you an arrival window — often same-day.",
      },
    ],
    related: [
      { label: "Air Conditioning Repair & Installation", href: "/services/air-conditioning" },
      { label: "AC Replacement Cost in San Antonio", href: "/blog/ac-replacement-cost-san-antonio" },
      { label: "Serving San Antonio", href: "/service-areas/san-antonio" },
    ],
  },
  {
    slug: "ac-replacement-cost-san-antonio",
    title: "How Much Does AC Replacement Cost in San Antonio? (2026 Guide)",
    h1: "How Much Does AC Replacement Cost in San Antonio?",
    description:
      "Real numbers for AC replacement in San Antonio: typical price ranges, what drives the cost up or down, the repair-vs-replace rule, and how financing changes the math.",
    date: "2026-07-10",
    readMinutes: 7,
    intro:
      "Nobody wakes up wanting to buy an air conditioner. By the time you're pricing one, you're usually hot, frustrated, and worried about getting taken for a ride. So here are straight numbers and the honest framework — the same one we walk homeowners through in person.",
    sections: [
      {
        h2: "The short answer: most full replacements land between $6,000 and $14,000",
        body: [
          "For a typical San Antonio single-family home, a complete system replacement (outdoor condenser + indoor coil/air handler or furnace, installed) generally runs $6,000–$14,000. Smaller homes with simple installs can come in under that; large homes, high-efficiency variable-speed equipment, or jobs needing duct corrections can go above it.",
          "Any company quoting you a precise price without seeing your home is guessing. What a real quote requires: your home's size and layout, the equipment tier you choose, and the condition of what the new system connects to — ducts, electrical, and the plenum.",
        ],
      },
      {
        h2: "What actually drives the price",
        body: ["Five factors explain most of the spread between a $6k install and a $14k one:"],
        list: [
          "System size (tonnage) — matched to your home by a load calculation, not guesswork. Oversized systems short-cycle and dehumidify poorly; undersized ones never catch up in August.",
          "Efficiency tier (SEER2) — base-efficiency equipment costs less up front; high-efficiency variable-speed systems cost more and give some of it back every month on your electric bill.",
          "Ductwork condition — leaky or undersized ducts can waste a big share of the new system's output. Sometimes sealing or corrections belong in the job; a good estimate separates that line item honestly.",
          "Installation quality — the unglamorous stuff (correct refrigerant charge, sealed plenum, proper airflow) determines whether the equipment ever delivers its rated efficiency. This is where cheap installs get expensive.",
          "Brand and warranty — reputable equipment with a real parts warranty and registered installation costs more than bargain-bin gear, and is nearly always worth it over a 15-year life.",
        ],
      },
      {
        h2: "The repair-or-replace rule we actually use",
        body: [
          "If your system is under 10 years old and the repair is routine — repair it. If it's past 12 years and the repair costs more than about a third of replacement — or it uses discontinued R-22 refrigerant — replacement usually wins the math.",
          "One more input people forget: the electric bill. An aging system that 'works' can quietly cost you $50–150+ extra per month in peak summer versus a modern high-efficiency unit. Over a Texas cooling season, that's real money that belongs in the comparison.",
        ],
      },
      {
        h2: "How financing changes the picture",
        body: [
          "Most homeowners don't pay cash for a replacement. With approved financing, a typical system lands in the range of a monthly car-insurance payment — and the energy savings on a high-efficiency unit offset part of that note every month the AC runs.",
          "We offer financing on qualifying installs and we'll show you the actual monthly math side-by-side with your current bill, in writing, before you decide anything.",
        ],
      },
      {
        h2: "How to not get burned (from people who see the aftermath)",
        body: ["A few rules that protect you no matter who you hire:"],
        list: [
          "Get the price in writing before work starts — and treat 'starting at...' pricing as a red flag.",
          "Ask for the load calculation. If they sized your system by eyeballing the old one, they skipped the most important step.",
          "Ask what happens to the ducts. A new system on leaky ducts is a sports car on flat tires.",
          "Confirm license and insurance. In Texas, HVAC contractors must be licensed — verify, don't assume.",
          "Same-day pressure discounts ('this price only if you sign now') are a walk-away signal. Real quotes survive a night's sleep.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does an AC replacement take?",
        a: "Most residential replacements are completed in a single day. Complex jobs with duct corrections can run longer — your written estimate should say so up front.",
      },
      {
        q: "Is it cheaper to replace the AC in winter?",
        a: "Sometimes — demand drops, schedules open up, and promotions appear. But if your system is failing in July, waiting can cost you repairs, high bills, and misery. The best time is before it dies on the hottest week of the year.",
      },
      {
        q: "Do you offer free estimates on replacements in San Antonio?",
        a: "Yes — free exact-price estimates, in writing, before any work begins. The number we quote is the number you pay. Call or text (866) 665-2210.",
      },
    ],
    related: [
      { label: "Air Conditioning Repair & Installation", href: "/services/air-conditioning" },
      { label: "Financing Options", href: "/financing" },
      { label: "Why Is My AC Running But Not Cooling?", href: "/blog/ac-running-but-not-cooling-san-antonio" },
    ],
  },
  {
    slug: "texas-summer-ac-survival-checklist",
    title: "The Texas Summer AC Survival Checklist (10 Things Before the Next Heat Wave)",
    h1: "The Texas Summer AC Survival Checklist",
    description:
      "Ten things San Antonio homeowners can do — most free, none requiring tools — to help an AC survive triple-digit stretches and keep electric bills in check.",
    date: "2026-07-10",
    readMinutes: 5,
    intro:
      "When the forecast parks in the upper 90s, every air conditioner in San Antonio runs flat-out for days with no recovery time. That's when tired systems quit — always on the worst possible afternoon. Here's the checklist we'd run in our own homes before the next stretch of heat, in order of bang-for-effort.",
    sections: [
      {
        h2: "The free five (do these this weekend)",
        body: [""],
        list: [
          "Swap the air filter — in summer, treat 1-inch filters as a monthly item, not quarterly. Can't see light through it? It's done.",
          "Set the thermostat at 78° and leave it alone. Big up-and-down swings cost more than holding steady, and 'crank it to 65 to cool faster' is a myth — it cools at the same speed, just longer.",
          "Switch the fan from ON to AUTO. ON runs the blower 24/7 and pulls humidity back into the house; AUTO runs only while cooling — drier air, lower bill.",
          "Close blinds on west-facing windows after lunch. Afternoon sun is half the battle in Texas.",
          "Clear two feet around the outdoor unit — trim shrubs, blow away clippings after mowing, never stack anything on top.",
        ],
      },
      {
        h2: "The fifteen-minute jobs",
        body: [""],
        list: [
          "Rinse the outdoor coil: power off at the disconnect, garden hose on gentle, top to bottom. Never a pressure washer — the fins bend easily.",
          "Pour a cup of white vinegar down the condensate drain line. Clogged drains are one of the most common summer shutdowns, and this two-minute habit prevents most of them.",
          "Check supply vents room by room — open them all, even in unused rooms. Closing vents doesn't save money; it builds pressure and strains the blower.",
          "Feel the two copper lines at the outdoor unit (carefully): the larger one should feel cold and sweat slightly. Ice anywhere = shut the system off and make a call.",
          "Test the system on a mild morning, not the first 100° afternoon. If it struggles to hold temperature when it's 85°, it will lose the fight at 98° — and you want that answer while repair schedules are still open.",
        ],
      },
      {
        h2: "When to stop DIY-ing and call",
        body: [
          "Warm air from the vents, ice on the lines, breakers that keep tripping, a system that runs all day without holding temperature, or an outdoor unit that hums but won't start — those are technician territory. They're also exactly the failures that get worse (and pricier) when pushed through a heat wave.",
          "Whoever you call — us or anyone else — get the price in writing before work starts. At Glacier that's not a promise, it's the process: free exact-price estimates, straight answers, 24/7 across greater San Antonio.",
        ],
      },
    ],
    faqs: [
      {
        q: "What temperature should I set my AC in a Texas heat wave?",
        a: "78° while home is the efficiency sweet spot; a few degrees higher when away. Every degree below 78 adds meaningfully to cooling costs during triple-digit stretches, and giant swings cost more than holding steady.",
      },
      {
        q: "How often should AC filters be changed in Texas?",
        a: "In summer, check 1-inch filters monthly — with pets and long run-times they can load up in 30–45 days. Thicker media filters (4–5 inch) last several months.",
      },
      {
        q: "Does closing vents in unused rooms save money?",
        a: "No — it raises pressure in the ducts, strains the blower, and can create leaks you pay for all year. Your system was sized for the whole house; let it breathe.",
      },
    ],
    related: [
      { label: "Air Conditioning Services", href: "/services/air-conditioning" },
      { label: "Indoor Air Quality", href: "/services/indoor-air-quality" },
      { label: "Why Is My AC Running But Not Cooling?", href: "/blog/ac-running-but-not-cooling-san-antonio" },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
