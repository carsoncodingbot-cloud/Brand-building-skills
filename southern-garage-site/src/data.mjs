// Single source of truth for the whole site. Edit facts HERE; every page, schema block and sitemap reads from this file.
// `vf: true` / `vf(...)` marks anything NOT yet verified in writing — it renders with a yellow dashed outline in preview builds.

export const SITE = {
  name: 'Southern Garage Co.',
  legal: 'Southern Garage Co.',            // vf: live footer says "Southern Garage LLC" — confirm legal entity
  tagline: 'American Steel Builders',
  domain: 'https://southerngarage.com',
  phone: '(205) 941-6115',
  phoneHref: 'tel:+12059416115',
  smsHref: 'sms:+12059416115',
  street: '707 Newport Ave',
  city: 'Clanton',
  region: 'AL',
  mapUrl: 'https://maps.app.goo.gl/v5Nz87bbi7nioU128',
  hours: 'Mon–Fri, 8am–6pm',                // from live contact page — vf
  priceLockMonths: 6,
  // Paste the GoHighLevel inbound webhook at deploy time (never commit it). Blank = nothing is sent.
  ghlWebhook: '',
  preview: true,                           // shows the yellow "unverified items" strip; set false to ship
  financingUrl: 'https://www.hfsfinancial.net/promo/68824f87ad37817b6cd4a051/',
  rtoUrl: 'https://ezpaybuildings.net/DealerContractForm.aspx?d=6941',
  designToolUrl: 'https://southerngarageco.sensei3d.com',
  facebook: 'https://www.facebook.com/profile.php?id=61576593310422',
  // Popup extras render ONLY when real: set rating/ratingCount from your Google profile, and installs to real job-photo URLs.
  popup: { rating: null, ratingCount: null, installs: [], autoOpenMs: 7000 },
};

const CDN = 'https://assets.cdn.filesafe.space/u7qOZfVZ1CzSkoPHQviC/media/';
export const LOGO = CDN + '6966f027b912775c887096b0.png';       // white plate lockup, 1200x345
// PHOTO MANIFEST — swap `src` for verified real-job photos (job record: size, city, date) and set verified:true.
// `fp` is the focal point so crops never cut the building. Nothing else in the site needs to change.
const P = (id, fp, alt, extra = {}) => ({ src: CDN + id, fp, alt, verified: false, ...extra });
export const PHOTOS = {
  hero:        P('695754b3c902bf28f7e647ab.png', '50% 62%', 'Gray steel building with black wainscot at sunset'),
  garage:      P('6a2a2477d119f1993ac2e0a7.png', '50% 58%', 'Steel garage with two black carriage-style doors'),
  workshop:    P('68c762f213643f23b5a6a458.jpeg', '50% 55%', 'Large clear-span steel workshop with a roll-up door'),
  barn:        P('6a2a23f961b1ee5d8875bb05.png', '50% 55%', 'Red steel barn with three roll-up doors'),
  carport:     P('6a2b36489bdda92b22da3e1f.webp', '50% 55%', 'Steel carport covering two vehicles', { lowres: true }),
  commercial:  P('6964c69402f1bee1e8d4f065.png', '50% 55%', 'Wide steel commercial building with a large door'),
  rv:          null,   // no matching photo yet — the site shows a drawn elevation instead of a mismatched image
  s30x35:      P('696461a1f8a93b52bfdd8429.png', '50% 58%', '30 by 35 steel garage with two roll-up doors'),
  s30x40:      P('69646f84f13bc3f7b7b26f20.png', '50% 58%', '30 by 40 steel garage with two roll-up doors'),
  s30x50:      P('696462a2f13bc32b8db01080.png', '50% 62%', '30 by 50 steel building'),
  s30x60:      P('69645fc202f1be0951c21a7d.png', '50% 62%', '30 by 60 steel workshop with a lean-to'),
  s30x70:      P('696468a1f13bc30a5db0e2c6.png', '50% 62%', '30 by 70 steel building with multiple bays at sunset'),
  s30x100:     P('69646202c7683b7aeebb44d9.png', '50% 62%', '30 by 100 vertical-roof steel building at sunset'),
  s40x60:      P('6964610b02f1be51f8c248f9.png', '50% 62%', '40 by 60 steel shop with a large roll-up door'),
  barn30x20:   P('69646cfa98efbd0448039ee4.png', '50% 55%', 'Raised-center steel barn'),
};

// ---------- Building types ----------
export const TYPES = [
  { slug: 'steel-garages', name: 'Steel garages', short: 'Garages', blurb: 'Single, double and triple-bay garages', photo: 'garage', quiz: 'Garage',
    h1: 'Custom Steel Garages', lead: 'One-, two- and three-bay steel garages with your choice of doors, windows, roof style and colors — slab, steel, delivery and install on one invoice.',
    why: ['Roll-up or carriage-style garage doors, walk-in doors and windows placed where you want them.', 'Regular, A-frame or vertical roof styles in your choice of colors.', 'Delivered and installed by our crew, with engineered plans for your site.'],
    sizes: ['30x35', '30x40', '30x50'],
    faq: [['How wide is a two-car steel garage?', 'Most two-car garages are 20–24 feet wide; a triple-bay is typically 26–30 feet wide. Length depends on whether you want workshop or storage space behind the vehicles.'], ['Can I add a workshop area to a garage?', 'Yes. Many owners choose a longer building — for example 30 by 50 — so the vehicles park in front and the back third works as a shop.']] },
  { slug: 'steel-workshops', name: 'Steel workshops', short: 'Workshops', blurb: 'Clear-span, work-ready shops', photo: 'workshop', quiz: 'Workshop / Shop',
    h1: 'Custom Steel Workshops & Shops', lead: 'Clear-span steel workshops with no posts in your way — room for lifts, benches, welders and equipment, with the height to use them.',
    why: ['Clear-span framing means the whole floor is usable.', 'Taller walls and larger doors for lifts, equipment and trucks.', 'Insulation-ready, and quoted with the slab so it is one number.'],
    sizes: ['30x50', '30x60', '40x60'],
    faq: [['How tall should a workshop be?', 'Check the clearance your lift or equipment needs, then add room above it. Many two-post lifts need 12 feet or more, so a 14-foot wall is common for shops.'], ['What door size do I need?', 'A 10 by 10 door fits most cars and pickups. Taller trucks, equipment and RVs often need 12 by 12 or larger.']] },
  { slug: 'steel-barns', name: 'Steel barns', short: 'Barns', blurb: 'Raised-center & ag buildings', photo: 'barn', quiz: 'Barn',
    h1: 'Custom Steel Barns', lead: 'Raised-center and vertical-roof steel barns for hay, livestock, tractors and storage — built to your site, delivered and installed.',
    why: ['Raised-center aisle barns with room for tractors and hay.', 'Vertical roofs that shed water and debris quickly.', 'Metal that does not rot or feed termites.'],
    sizes: ['30x20', '30x60', '40x60'],
    faq: [['What is a raised-center barn?', 'A raised-center barn has a taller center aisle with lower side sections, so equipment and hay can move through the middle while stalls or storage sit to the sides.']] },
  { slug: 'steel-carports', name: 'Steel carports', short: 'Carports', blurb: 'Open-air steel cover', photo: 'carport', quiz: 'Carport',
    h1: 'Steel Carports', lead: 'Open-air steel cover for trucks, cars, boats and equipment — installed on your site by our crew.',
    why: ['Open sides for easy access and airflow.', 'Sized for one vehicle up to a full row of equipment.', 'Can be enclosed later as a garage.'],
    sizes: [],
    faq: [['Do I need a concrete slab for a carport?', 'Not always. Many carports are anchored to a prepared gravel or concrete pad. Your plans specify what your site requires.']] },
  { slug: 'rv-covers', name: 'RV & boat covers', short: 'RV & boat covers', blurb: 'Tall, wide, covered', photo: null, quiz: 'Garage',
    h1: 'Steel RV & Boat Covers', lead: 'Extra-tall, extra-wide steel covers sized for motorhomes, trailers and boats — open or enclosed.',
    why: ['Clearance sized to your rig, not a generic default.', 'Open-front or fully enclosed.', 'Steel construction that stands up to sun, rain and hail.'],
    sizes: [],
    faq: [['How tall does an RV cover need to be?', 'Measure the highest point of your RV including roof units, then add at least a foot of clearance. Class A motorhomes often need 14 feet or more of door height.']] },
  { slug: 'commercial-steel-buildings', name: 'Commercial steel buildings', short: 'Commercial', blurb: '40′-and-wider steel buildings', photo: 'commercial', quiz: 'Workshop / Shop',
    h1: 'Commercial Steel Buildings', lead: 'Steel buildings 40 feet wide and up for shops, warehouses, equipment storage and light industrial use.',
    why: ['Wider clear spans and taller walls.', 'Heavier-gauge framing options for commercial loads.', 'Engineered plans for your site and local code.'],
    sizes: ['40x60', '30x100'],
    faq: [['Do commercial buildings need heavier steel?', 'Often, yes. 12-gauge framing and 26-gauge panels are the heavier options, and your engineered plans will state what your site and use require.']] },
];

// ---------- Sizes ----------
// doors: what's in the package. Verified for 30x35 / 30x50 / 40x60 from owner notes; others vf.
export const SIZES = [
  { slug: '30x35', w: 30, l: 35, h: 12, doors: '(2) 10′×10′ + walk-in', photo: 's30x35', use: 'A roomy two-car garage with space for a workbench, or a one-bay shop with storage.', okDoors: true },
  { slug: '30x40', w: 30, l: 40, h: 12, doors: '(2) 10′×10′ + walk-in', photo: 's30x40', use: 'Two to three vehicles, or two vehicles plus a real workshop area at the back.' },
  { slug: '30x50', w: 30, l: 50, h: 12, doors: '(2) 10′×10′ + walk-in', photo: 's30x50', use: 'A three-car garage, or a two-car garage with a full shop, lifts or a side-by-side and trailer bay.', okDoors: true },
  { slug: '30x60', w: 30, l: 60, h: 12, doors: '(2) 10′×10′ + walk-in', photo: 's30x60', use: 'A serious workshop, equipment barn or four-plus vehicle building. Lean-tos extend the covered area.' },
  { slug: '30x70', w: 30, l: 70, h: 12, doors: '(2) 10′×10′ + walk-in', photo: 's30x70', use: 'Multi-bay storage, a fleet or equipment building, or a shop with drive-through lanes.' },
  { slug: '30x100', w: 30, l: 100, h: 12, doors: '(2) 10′×10′ + walk-in', photo: 's30x100', use: 'Long equipment barns, storage rows and light commercial use — often with a vertical roof.' },
  { slug: '40x60', w: 40, l: 60, h: 14, doors: '(2) 12′×12′ + walk-in', photo: 's40x60', use: 'A large workshop or commercial building with room for lifts, equipment and a crane-height ceiling.', okDoors: true },
];
export const BARN = { slug: '30x20-raised-center-barn', name: '30×20 raised-center barn', photo: 'barn30x20' };

// Old live URLs -> new URLs (emit as _redirects for Cloudflare Pages / Netlify; keeps any existing ranking)
export const REDIRECTS = [
  ['/home-page', '/'], ['/30x35-steel-garages', '/steel-buildings/30x35/'], ['/30x40-steel-garage-overview', '/steel-buildings/30x40/'],
  ['/30x50-steel-garages', '/steel-buildings/30x50/'], ['/30x50-steel-building', '/steel-buildings/30x50/'], ['/30x50-steel-garages-overview-867577', '/steel-buildings/30x50/'],
  ['/30x60-steel-garage-overview', '/steel-buildings/30x60/'], ['/30x60-14-steel-garage-overview', '/steel-buildings/30x60/'],
  ['/30x100-steel-garage-overview-', '/steel-buildings/30x100/'], ['/40x60-steel-garages', '/steel-buildings/40x60/'],
  ['/30x30-steel-garages', '/steel-buildings/30x35/'], ['/30x20-raised-center-barn', '/steel-barns/'],
  ['/alabama', '/steel-buildings/alabama/'], ['/alabama-803069', '/steel-buildings/alabama/'], ['/texas', '/steel-buildings/texas/'],
  ['/louisiana', '/steel-buildings/louisiana/'], ['/arkansas', '/steel-buildings/arkansas/'], ['/kansas', '/service-areas/'], ['/location1', '/service-areas/'],
  ['/dealerprogram', '/dealer-program/'], ['/about', '/about/'], ['/contact', '/contact/'],
];

// ---------- States (state pages ship noindex until real local content exists) ----------
export const STATES = [
  { slug: 'alabama', name: 'Alabama', ab: 'AL' }, { slug: 'georgia', name: 'Georgia', ab: 'GA' }, { slug: 'tennessee', name: 'Tennessee', ab: 'TN' },
  { slug: 'texas', name: 'Texas', ab: 'TX' }, { slug: 'oklahoma', name: 'Oklahoma', ab: 'OK' }, { slug: 'louisiana', name: 'Louisiana', ab: 'LA' },
  { slug: 'arkansas', name: 'Arkansas', ab: 'AR' }, { slug: 'north-carolina', name: 'North Carolina', ab: 'NC' },
];
export const STATES_INDEXABLE = false;   // flip to true once each state page has real, state-specific content (jobs, counties, photos)

// ---------- Process (from the live site, tightened) ----------
export const STEPS = [
  ['Design it', 'Use the 3D design tool, or tell us the size and your ZIP. Either works.'],
  ['Get your quote', 'A detailed quote covering the full cost — slab, steel, doors, delivery and install.'],
  ['Lock it in', 'Confirm your order. The price is locked in writing for 6 months.'],
  ['We fabricate', 'Your specs go to the manufacturer and your building is built to order.'],
  ['Delivered & installed', 'Our crew delivers and installs your building.'],
  ['Walk-around', 'We walk it with you before we leave. You tell the truth about it in a review.'],
];

export const FAQ_CORE = [
  ['What does steel gauge mean?', 'Gauge is steel thickness, and a lower number is thicker steel. Our standard frame is 14-gauge (12-gauge is the upgrade) and standard panels are 29-gauge (26-gauge for commercial buildings).'],
  ['What is a clear-span building?', 'A clear-span building has no support posts inside. The roof trusses carry the load across the full width, so the whole floor is usable for parking, work and storage.'],
  ['What is a turn-down footing?', 'The slab is poured thicker along its edge — 8″ × 8″ — as one piece with the slab, so the walls sit on a solid, monolithic edge instead of a thin slab.'],
  ['Regular, A-frame or vertical roof — which is better?', 'Regular and A-frame are the standard styles. A vertical roof runs the panels from peak to eave so water, leaves and debris shed faster. It is the premium option.'],
  ['Do I have to be there for the install?', 'No. Most owners choose turnkey: we handle delivery and install, and you get a walk-around at the end.'],
  ['What if I am just looking?', 'Good. Ask for the number and keep it. No harm if it just sits in a drawer.'],
];

// ---------- Blog (real, defensible content only — no prices, no invented stats) ----------
export const POSTS = [
  { slug: 'how-much-does-a-steel-garage-cost', seo: 'How Much Does a Steel Garage Cost? What Moves the Price', title: 'How much does a steel garage cost? What actually moves the price', date: '2026-11-16', read: 6,
    desc: 'What really drives the price of a steel garage — size, gauge, roof, slab, doors, delivery and code — and the questions that expose an incomplete quote.',
    body: `<p>Two quotes for the “same” steel garage can be thousands of dollars apart, and the cheaper one is often the more expensive one by the time it is built. The price of a steel building is not one number — it is a stack of decisions. Here is what actually moves it.</p>
<h2>1. Size and height</h2><p>Floor area is the biggest driver: more square feet means more steel, more panels and more concrete. Wall height matters too — a 14-foot wall costs more than a 12-foot wall, and it is worth it if you plan on a lift, a tall truck or an RV.</p>
<h2>2. Steel gauge</h2><p>Gauge is thickness, and a lower number is thicker. A 12-gauge frame costs more than a 14-gauge frame because there is more steel in it. Heavier gauge is worth considering for heavy snow, high wind and commercial use. <a href="/blog/steel-gauge-explained/">Here is how to decide.</a></p>
<h2>3. Roof style</h2><p>Regular and A-frame roofs are the standard styles. A vertical roof — panels running peak to eave — sheds water and debris faster and costs more.</p>
<h2>4. Doors, windows and options</h2><p>Garage doors, walk-in doors, windows, insulation and trim all add up. Ask what is in the base price and what is an add-on.</p>
<h2>5. The slab</h2><p>A concrete slab with a turn-down footing is a major part of the total cost of a finished building, and it is the line most quotes leave out. <a href="/blog/slab-footing-or-gravel/">See what goes under a steel building.</a></p>
<h2>6. Delivery, site access and install</h2><p>Distance, terrain and how easily a truck can reach your site all affect cost. So does whether the install is done by the company that sold you the building or by someone you have to find.</p>
<h2>7. Local code</h2><p>Wind and snow loads depend on where you build. Engineered plans for your site cost something, and a building built without them may not pass inspection.</p>
<h2>How to compare quotes honestly</h2><ul><li>Ask for one whole number that includes the slab, steel, doors, delivery, installation and sales tax.</li><li>Ask what is <em>not</em> included.</li><li>Ask how long the price is locked and whether that is in writing.</li><li>Ask when you pay: a small deposit to order and the balance after install is very different from paying most of it up front.</li></ul>
<p>Want to see what a particular size includes? <a href="/sizes-and-prices/">Browse sizes and prices</a>, or <a href="/#sg-quote">get your whole number in about 30 seconds</a>.</p>` },
  { slug: 'steel-gauge-explained', seo: 'Steel Gauge Explained: 14 vs 12 Frames, 29 vs 26 Panels', title: 'Steel gauge explained: 14-gauge vs 12-gauge frames, 29-gauge vs 26-gauge panels', date: '2026-11-16', read: 4,
    desc: 'What steel gauge means, why a lower number is thicker, and when upgrading the frame or panels on a steel building is worth the money.',
    body: `<p>Steel gauge is one of the first specs on any steel building quote, and it is one of the least understood. The rule is simple and backwards: <strong>the lower the gauge number, the thicker the steel.</strong></p>
<h2>Frame: 14-gauge vs 12-gauge</h2><p>The frame is the skeleton — the tubing that carries the load. A 12-gauge frame is made from thicker tubing than a 14-gauge frame. Our standard frame is 14-gauge, with 12-gauge as the upgrade.</p>
<h2>Panels: 29-gauge vs 26-gauge</h2><p>Panels are the roof and wall skin. 26-gauge panels are thicker and stiffer than 29-gauge. Standard panels are 29-gauge; 26-gauge is the heavier option used on commercial buildings.</p>
<h2>When does upgrading make sense?</h2><ul><li><strong>Heavy snow or high wind areas</strong> — your engineered plans specify what your site requires.</li><li><strong>Commercial or shop use</strong> — hanging loads, cranes, frequent door use and bigger spans.</li><li><strong>Long-term ownership</strong> — thicker steel resists dents and flex.</li></ul>
<h2>When is the standard fine?</h2><p>For a typical residential garage or storage building in an ordinary load area, standard gauge built to engineered plans is a sound choice. The right answer comes from your site, not from a sales pitch.</p>
<p>Not sure which you need? <a href="/#sg-quote">Tell us your ZIP and we will tell you what your site calls for.</a></p>` },
  { slug: 'slab-footing-or-gravel', seo: 'Slab, Footing or Gravel: What Goes Under a Steel Building', title: 'Slab, footing or gravel? What goes under a steel building', date: '2026-11-16', read: 5,
    desc: 'A steel building is only as good as what it sits on. Monolithic slabs, turn-down footings, gravel pads and anchoring explained in plain English.',
    body: `<p>A steel building is only as good as what it sits on. The foundation is also the part that most quotes leave out, so it is worth understanding before you compare prices.</p>
<h2>The monolithic slab</h2><p>For garages and shops, the standard answer is a concrete slab poured as one piece. Ours is 4 inches thick, 3,000 PSI concrete, poured monolithically with the footing.</p>
<h2>The turn-down footing</h2><p>Along the edge of the slab, the concrete is poured thicker and deeper — an 8″ × 8″ turn-down — so the walls sit on a solid edge instead of a thin slab. Wedge anchors then tie the steel to the concrete at regular intervals.</p>
<h2>Gravel pads and earth anchors</h2><p>Lighter structures like carports can often be anchored to a compacted gravel pad with earth anchors driven into the ground. Whether that is allowed for your building depends on its size, your soil and local code.</p>
<h2>Site prep matters</h2><p>The ground has to be level, compacted and accessible. Slope, trees, soft soil and tight access all add work before a single anchor goes in.</p>
<h2>Cure time</h2><p>Concrete needs time to cure before heavy loads go on it. Your installer should schedule the building install after the slab has cured as your engineered plans specify.</p>
<h2>Ask this</h2><p>When you compare quotes: is the slab in the number, who pours it, and who is responsible if it is not level? One crew and one invoice for the slab and the steel removes that gap. <a href="/how-its-built/">See how it all goes together.</a></p>` },
  { slug: 'clear-span-vs-post-frame', seo: 'Clear-Span Steel vs Post-Frame Buildings: The Difference', title: 'Clear-span steel vs. post-frame buildings: what is the difference?', date: '2026-11-16', read: 4,
    desc: 'Clear-span steel buildings have no interior posts; post-frame buildings use posts set in the ground. Here is how they compare for garages, shops and barns.',
    body: `<p>If you are shopping for a garage, shop or barn, you will see two common construction styles: clear-span steel and post-frame (often called “pole barn”). They look similar from the road and behave very differently.</p>
<h2>Clear-span steel</h2><p>A clear-span steel building uses a steel frame with trusses that carry the roof across the full width, so there are no support posts inside. You can park, work and store across the whole floor, and place doors almost anywhere.</p>
<h2>Post-frame</h2><p>Post-frame buildings use large posts set into the ground or anchored at intervals, with framing between them. They are common and often cost less up front, but posts can limit how you use the floor and where doors can go.</p>
<h2>How they compare</h2><ul><li><strong>Floor space:</strong> clear-span has no interior posts.</li><li><strong>Materials:</strong> steel does not rot or feed termites the way untreated wood can.</li><li><strong>Foundation:</strong> steel buildings usually sit on a slab with a footing; post-frame can be set in the ground.</li><li><strong>Cost:</strong> comparable on a finished-building basis once the slab, doors and install are counted.</li></ul>
<p>The honest answer depends on your site and your use. If you want a wide-open floor for a shop, lifts or equipment, clear-span steel is hard to beat. <a href="/steel-workshops/">See steel workshops.</a></p>` },
  { slug: 'how-big-a-steel-garage-do-you-need', seo: 'How Big a Steel Garage Do You Need? A Sizing Guide', title: 'How big a steel garage do you need? Sizing by vehicles, tools and space', date: '2026-11-16', read: 5,
    desc: 'A practical way to size a steel garage or shop: parking bays, workbench room, lift clearance and door size — plus common sizes and what fits in them.',
    body: `<p>Most people buy a building that is one size too small. The fix is to plan from what you need to put inside, not from a price.</p>
<h2>Start with vehicles</h2><p>A comfortable parking bay is about 10 feet by 20 feet. A 30′ × 50′ building has 1,500 square feet — roughly six of those bays, before you leave any room to walk around.</p>
<h2>Add workspace</h2><p>If you want a bench, tool storage or a shop area, add 10 to 20 feet of length for it. Many two-car owners choose 30′ × 40′ or 30′ × 50′ for exactly this reason.</p>
<h2>Check the height</h2><p>Standard wall height is 12 feet. If you plan on a vehicle lift, check the clearance it needs — many two-post lifts need 12 feet or more — and consider a 14-foot wall.</p>
<h2>Pick the doors</h2><p>A 10′ × 10′ door fits most cars and pickups. Taller trucks, equipment and RVs often need 12′ × 12′ or larger. Doors on the end wall let you drive straight through.</p>
<h2>Plan for growth</h2><p>Adding length later is possible but not free. It is usually cheaper to buy the extra 10 feet now.</p>
<p>Try it yourself: <a href="/sizes-and-prices/">our size picker draws each building to scale</a> and shows how many vehicles fit.</p>` },
  { slug: 'steel-building-permits', seo: 'Steel Building Permits: What to Ask Your County First', title: 'Do you need a permit for a steel building? What to ask your county', date: '2026-11-16', read: 4,
    desc: 'Permit rules for steel garages, shops and barns vary by county. These are the questions to ask before you order, and what engineered plans have to cover.',
    body: `<p>The honest answer is: <strong>it depends on where you build.</strong> Permit rules for accessory buildings are set by your county or city, not by the building company. Here is what to ask before you order.</p>
<h2>Questions to ask your county or city</h2><ul><li>Do I need a permit for a building this size?</li><li>What are the setback rules from property lines, roads and septic?</li><li>Do you require engineered, stamped plans? Which wind and snow loads?</li><li>Is a foundation inspection required before the building goes up?</li><li>Are there size limits on accessory buildings on my lot?</li></ul>
<h2>Check the private rules too</h2><p>HOA covenants and deed restrictions can limit size, height, color and placement even when the county says yes.</p>
<h2>Call 811 before anyone digs</h2><p>Utility lines need to be marked before slab work or anchors go in. It is free, and it is the law in most places.</p>
<h2>What engineered plans cover</h2><p>Plans for your site should state the wind and snow loads they are designed for and include foundation details. Ask your building company whether plans are included, and whether they are designed for your exact ZIP code.</p>
<p>We can tell you what to ask for your area. <a href="/contact/">Call or text us</a> with your ZIP.</p>` },
];

export const NAV_TYPES = TYPES;
