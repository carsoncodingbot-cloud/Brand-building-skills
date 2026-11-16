import { SITE, PHOTOS, TYPES, SIZES, STATES, STATES_INDEXABLE, STEPS, FAQ_CORE, POSTS } from './data.mjs';
import { esc, vf, abs, num, ARROW, elev, photo, planSVG, page, breadcrumbs, crumbLD, faqLD, faqBlock, quizCard, ctaBand, sizeRow, localBusinessLD } from './lib.mjs';

const veh = (s) => Math.floor(s.l / 20) * Math.floor(s.w / 10);
const widthPreset = (s) => (s.w >= 40 ? 'Commercial (40′+)' : 'Triple (26–30′ wide)');
const typeBySlug = (slug) => TYPES.find((t) => t.slug === slug);
const rv = ' rv';

// ---------- Shared sections ----------
const ICON = {
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h10M7 17h6"/></svg>',
  crew: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17V9l9-5 9 5v8"/><path d="M3 17h18M8 17v-4h8v4"/></svg>',
  coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.7-1 1.5-2.5 1.8-2.5.8-2.5 1.8 1 1.7 2.5 1.7 2.5-.7 2.5-1.7"/></svg>',
};
const strip = () => `<div class="strip"><div class="wrap strip__grid">
<div class="strip__it">${ICON.shield}<div><b>Price locked ${SITE.priceLockMonths} months</b><span>In writing, before you commit</span></div></div>
<div class="strip__it">${ICON.doc}<div><b>One invoice</b><span>Slab, steel, delivery, install</span></div></div>
<div class="strip__it">${ICON.crew}<div><b>Our crew installs</b><span>Not a hand-off to a stranger</span></div></div>
<div class="strip__it">${ICON.coin}<div><b>Financing available</b><span>${vf('as low as $[—]/mo*')}</span></div></div></div></div>`;

function pickerSection(defaultSlug = '30x50') {
  const chips = SIZES.map((s) => `<button class="chip" type="button" data-size="${s.slug}" aria-pressed="${s.slug === defaultSlug}">${s.w}×${s.l}</button>`).join('');
  const plans = SIZES.map((s) => `<div class="plan-wrap" data-plan="${s.slug}" ${s.slug === defaultSlug ? '' : 'hidden'}>${planSVG(s)}</div>`).join('');
  const data = JSON.stringify(Object.fromEntries(SIZES.map((s) => [s.slug, { size: `${s.w}′×${s.l}′<small>×${s.h}′</small>`, sqft: `${num(s.w * s.l)} sq ft`, veh: `${veh(s)} vehicles`, doors: s.doors, preset: widthPreset(s), href: `/steel-buildings/${s.slug}/` }])));
  const d = SIZES.find((s) => s.slug === defaultSlug);
  return `<section class="sec" id="sizes"><div class="wrap">
<div class="sh${rv}"><div><div class="eyebrow">Sizes &amp; prices</div><h2>See it to scale.<br>Then see the number.</h2></div><p class="lead">Pick a footprint. We draw it to scale, show what fits inside, and send the whole price in writing.</p></div>
<div class="picker${rv}" id="picker" data-sizes='${esc(data)}'>
<div class="picker__stage"><div class="chips" role="group" aria-label="Choose a size">${chips}</div><div class="plans">${plans}</div><p class="picker__cap">Plan view, drawn to scale. Vehicles shown at 10′ × 20′ each — approximate.</p></div>
<div class="readout"><div class="readout__size n" data-r="size">${d.w}′×${d.l}′<small>×${d.h}′</small></div>
<dl><div><dt>Floor area</dt><dd class="n" data-r="sqft">${num(d.w * d.l)} sq ft</dd></div><div><dt>Fits roughly</dt><dd class="n" data-r="veh">${veh(d)} vehicles</dd></div><div><dt>Doors in package</dt><dd data-r="doors">${d.doors}</dd></div><div><dt>Frame / panels</dt><dd>14-gauge / 29-gauge</dd></div><div><dt>Whole number</dt><dd>${vf('$[price] + tax')}</dd></div><div><dt>Monthly</dt><dd>${vf('as low as $[—]/mo*')}</dd></div></dl>
<a class="btn" data-r="cta" href="/#sg-quote">Get this price ${ARROW}</a><p class="readout__fine">${vf('*With approved financing — payment varies. Prices effective [date].')}</p></div></div></div></section>`;
}

const typeTiles = () => `<div class="tiles">${TYPES.map((t) => `<a class="tile${rv}" href="/${t.slug}/">${t.photo ? photo(t.photo, { ratio: '3/2' }) : `<div class="tile__draw">${elev(t.slug)}</div>`}<div class="tile__bd"><h3>${t.name}</h3><p>${t.lead.split(' — ')[0].replace(/\.$/, '')}.</p><span class="tile__go">View ${t.short.toLowerCase()} ${ARROW}</span></div></a>`).join('')}</div>`;

const ANAT = `<svg viewBox="-90 0 1040 380" role="img" aria-label="Cross-section of a steel building showing roof panels, frame, trusses, doors, slab and turn-down footing"><g fill="none" stroke-linecap="round" stroke-linejoin="round">
<line x1="150" y1="300" x2="710" y2="300" stroke="#5a4c3f" stroke-width="2"/><rect x="190" y="300" width="480" height="9" fill="rgba(250,95,30,.28)" stroke="#FA5F1E" stroke-width="2"/><rect x="190" y="309" width="18" height="24" fill="rgba(250,95,30,.28)" stroke="#FA5F1E" stroke-width="2"/><rect x="652" y="309" width="18" height="24" fill="rgba(250,95,30,.28)" stroke="#FA5F1E" stroke-width="2"/>
<rect x="190" y="150" width="480" height="150" fill="#16120e" stroke="#e9e1d8" stroke-width="2"/><path d="M178 152L430 82L682 152" stroke="#e9e1d8" stroke-width="3"/><path d="M190 150L430 84L670 150" stroke="#FA5F1E" stroke-width="2" opacity=".9"/>
<path d="M190 150L430 84L670 150M190 150H670M310 150L370 117M550 150L490 117M430 150V84M310 150L430 100M550 150L430 100" stroke="#8d8176" stroke-width="1.5"/><line x1="196" y1="150" x2="196" y2="300" stroke="#e9e1d8" stroke-width="5"/><line x1="664" y1="150" x2="664" y2="300" stroke="#e9e1d8" stroke-width="5"/>
<rect x="290" y="206" width="120" height="94" fill="#1f1a15" stroke="#e9e1d8" stroke-width="1.5"/><path d="M290 224H410M290 242H410M290 260H410M290 278H410" stroke="#5a4c3f" stroke-width="1.2"/><rect x="470" y="237" width="38" height="63" fill="#1f1a15" stroke="#e9e1d8" stroke-width="1.5"/><circle cx="500" cy="270" r="2" fill="#e9e1d8"/></g>
<g font-size="13" font-weight="700" fill="#E4DDD5"><g text-anchor="end"><text x="128" y="106" font-weight="800" fill="#fff">Roof panels</text><text x="128" y="124" fill="#9a9087" font-size="12">29-gauge · 26-gauge commercial</text><text x="128" y="220" font-weight="800" fill="#fff">Steel frame</text><text x="128" y="238" fill="#9a9087" font-size="12">14-gauge · 12-gauge upgrade</text><text x="128" y="325" font-weight="800" fill="#fff">Turn-down footing</text><text x="128" y="343" fill="#9a9087" font-size="12">8″ × 8″ · poured with the slab</text></g>
<g><text x="732" y="106" font-weight="800" fill="#fff">Roof load</text><text x="732" y="124" fill="#9a9087" font-size="12">35 PSF standard</text><text x="732" y="241" font-weight="800" fill="#fff">Doors included</text><text x="732" y="259" fill="#9a9087" font-size="12">(2) 10′×10′ + walk-in</text><text x="732" y="308" font-weight="800" fill="#fff">4″ concrete slab</text><text x="732" y="326" fill="#9a9087" font-size="12">3,000 PSI · monolithic</text></g></g>
<g stroke="#FA5F1E" stroke-width="1.5" fill="#FA5F1E"><line x1="136" y1="110" x2="329" y2="110"/><circle cx="329" cy="110" r="4"/><line x1="136" y1="216" x2="196" y2="216"/><circle cx="196" cy="216" r="4"/><line x1="136" y1="321" x2="208" y2="321"/><circle cx="208" cy="321" r="4"/><line x1="724" y1="110" x2="531" y2="110"/><circle cx="531" cy="110" r="4"/><line x1="724" y1="237" x2="508" y2="237"/><circle cx="508" cy="237" r="4"/><line x1="724" y1="304" x2="670" y2="304"/><circle cx="670" cy="304" r="4"/></g></svg>`;

const insideNumber = (paper = true) => `<section class="sec${paper ? ' sec--paper' : ''}" id="inside"><div class="wrap">
<div class="split"><div class="${rv.trim()}"><div class="eyebrow">What’s inside the number</div><h2>Ours ends finished.<br>Doors, delivery, install.</h2><p class="lead" style="margin-top:18px">Most quotes stop at the steel. Ask any builder what’s not in theirs. Ours is one number plus local sales tax.</p></div>
<ul class="checks${rv}"><li><span><b>Galvanized steel frame</b> — 14-gauge standard, 12-gauge upgrade</span></li><li><span><b>29-gauge panels</b> — 26-gauge for commercial buildings</span></li><li><span><b>Doors</b> — (2) 10′×10′ garage doors and a walk-in door in the package</span></li><li><span><b>Delivery and professional install</b> by our crew</span></li><li><span><b>4″ concrete slab</b> — 3,000 PSI, monolithic, 8″×8″ turn-down footing, when you bundle it</span></li><li><span><b>Price locked in writing</b> for ${SITE.priceLockMonths} months</span></li></ul></div>
<div class="anat${rv}" style="margin-top:clamp(32px,4vw,56px)">${ANAT}</div></div></section>`;

const processSection = (dark2 = false) => `<section class="sec${dark2 ? ' sec--dark2' : ''}"><div class="wrap"><div class="sh${rv}"><div><div class="eyebrow">How it works</div><h2>Six steps. You can sit out most of them.</h2></div></div>
<div class="steps${rv}">${STEPS.map(([h, p]) => `<div class="step"><h3>${h}</h3><p>${h === 'Delivered & installed' ? `${p} Typical lead time ${vf('[4–6 / 6–8] weeks')}.` : p}</p></div>`).join('')}</div></div></section>`;

const areasSection = () => `<section class="sec sec--dark2" id="areas"><div class="wrap areas"><div class="${rv.trim()}"><div class="eyebrow">Service areas</div><h2>Do we install where you are?</h2><p class="lead" style="margin-top:18px">Type your ZIP. We’ll tell you straight — yes or no — before you fill out anything.</p>
<div class="zip" data-zip-main><label for="zipin">Your ZIP code</label><form class="zip__row" data-zip><input id="zipin" inputmode="numeric" maxlength="5" placeholder="e.g. 35045" autocomplete="postal-code"><button class="btn" type="submit">Check</button></form><div class="zip__res" aria-live="polite"></div></div></div>
<div class="${rv.trim()}"><div class="states">${STATES.map((s) => `<a class="st" data-state="${s.ab}" href="/service-areas/#${s.slug}"><span>${s.name}<small>Steel buildings in ${s.name}</small></span>${ARROW}</a>`).join('')}</div><p class="note">${vf('State list is from the current site — confirm against where you actually install.')}</p></div></div></section>`;

const reviewsSlot = () => `<section class="sec"><div class="wrap"><div class="sh${rv}"><div><div class="eyebrow">Proof</div><h2>What owners say, in their own words.</h2></div></div>
<div class="slot${rv}"><h3>Real Google reviews go here</h3><p>This section shows your actual Google reviews, pulled live from your Business Profile — name, stars, date and text exactly as posted. Nothing here is written, rewritten or rotated by us. The current site’s hard-coded review list and “just ordered” alerts are not carried over.</p></div></div></section>`;

const postsTeaser = () => `<section class="sec sec--dark2"><div class="wrap"><div class="sh${rv}"><div><div class="eyebrow">Learn before you buy</div><h2>Straight answers on steel buildings.</h2></div><a class="btn btn--ghost" href="/blog/">All articles ${ARROW}</a></div>
<div class="posts">${POSTS.slice(0, 3).map(postCard).join('')}</div></div></section>`;
const POST_ICON = ['steel-garages', 'steel-workshops', 'rv-covers', 'steel-barns', 'steel-carports', 'commercial-steel-buildings'];
const postCard = (p, i) => { const k = POSTS.indexOf(p); return `<a class="post${rv}" href="/blog/${p.slug}/"><div class="post__top">${elev(POST_ICON[k % 6])}</div><div class="post__bd"><h3>${p.title}</h3><p>${p.desc}</p><span class="post__meta">${p.read} min read</span></div></a>`; };

const faqSection = (items = FAQ_CORE, paper = true, h = 'Questions we get every day.') => `<section class="sec${paper ? ' sec--paper' : ''}" id="faq"><div class="wrap split"><div class="${rv.trim()}"><div class="eyebrow">Straight answers</div><h2>${h}</h2><p class="lead" style="margin-top:18px">Can’t find yours? Call <a href="${SITE.phoneHref}" class="o" style="font-weight:800">${SITE.phone}</a> — you’ll reach a person.</p></div><div class="${rv.trim()}">${faqBlock(items)}</div></div></section>`;

const heroPhoto = (key) => `style="background-image:url('${PHOTOS[key].src}');background-position:${PHOTOS[key].fp}"`;

function interiorHero({ trail, h1, lead, quiz = false, aside = '', cta = '' }) {
  return `<section class="phero${quiz || aside ? '' : ' phero--solo'}"><div class="wrap phero__grid"><div>${breadcrumbs(trail)}<h1>${h1}</h1><p class="lead">${lead}</p>${cta ? `<div class="phero__cta">${cta}</div>` : ''}</div>${quiz ? quizCard() : aside}</div></section>`;
}

// ================= PAGES =================
export const pages = [];
const add = (p) => pages.push(p);

// ---- Home ----
add({ path: '/', quiz: true, ld: [localBusinessLD(), { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: abs('/') }, faqLD(FAQ_CORE)],
  title: 'Custom Steel Garages, Shops & Barns | Southern Garage Co.', ogImage: PHOTOS.hero.src,
  desc: 'Custom steel garages, shops and barns — slab, steel, delivery and install on one invoice. Price locked in writing for 6 months. Clanton, AL.',
  body: `<section class="hero" ${heroPhoto('hero')}><div class="wrap hero__grid"><div><div class="eyebrow">American Steel Builders · Clanton, AL</div><h1>Custom steel garages &amp; shops. <span class="o">One number, in writing.</span></h1>
<p class="lead">Garages, shops, barns and carports — slab, steel, delivery and install on one invoice, built by one crew.</p>
<div class="hero__facts"><div><b class="n">${SITE.priceLockMonths} mo</b><small>Price locked in writing</small></div><div><b>1 crew</b><small>Slab to install</small></div><div><b>1 invoice</b><small>One whole number</small></div></div></div>${quizCard()}</div></section>
${strip()}${pickerSection('30x50')}
<section class="sec sec--dark2" id="buildings"><div class="wrap"><div class="sh${rv}"><div><div class="eyebrow">What we build</div><h2>Steel built for how you use it.</h2></div><p class="lead">Six building types, each drawn up for your site and delivered by our own crew.</p></div>${typeTiles()}</div></section>
${insideNumber(true)}${processSection(false)}${areasSection()}${reviewsSlot()}${postsTeaser()}${faqSection(FAQ_CORE, true)}${ctaBand()}` });

// ---- Buildings hub ----
add({ path: '/steel-buildings/', quiz: true, ld: [crumbLD([['Home', '/'], ['Steel buildings', '/steel-buildings/']])],
  title: 'Custom Steel Buildings & Garages | Southern Garage Co.', desc: 'Browse steel garages, workshops, barns, carports, RV covers and commercial buildings. Every size priced as one whole number and installed by our crew.',
  body: `${interiorHero({ trail: [['Home', '/'], ['Steel buildings', '/steel-buildings/']], h1: 'Steel buildings, built your way.', lead: 'Pick a building type or a size. Every one is priced as one whole number — slab, steel, delivery and install.', quiz: true })}
<section class="sec"><div class="wrap">${typeTiles()}</div></section>
<section class="sec sec--dark2"><div class="wrap"><div class="sh"><div><div class="eyebrow">By size</div><h2>Every size, one whole number.</h2></div></div><div class="stable"><div class="srow srow--h"><span>Size</span><span>Floor area</span><span>Doors in package</span><span>Whole number</span><span></span></div>${SIZES.map(sizeRow).join('')}</div></div></section>${ctaBand()}` });

// ---- Type pages ----
for (const t of TYPES) {
  const related = t.sizes.map((sl) => SIZES.find((s) => s.slug === sl)).filter(Boolean);
  add({ path: `/${t.slug}/`, quiz: true, preset: { building_type: t.quiz }, ld: [crumbLD([['Home', '/'], ['Steel buildings', '/steel-buildings/'], [t.name, `/${t.slug}/`]]), faqLD([...t.faq, ...FAQ_CORE.slice(0, 2)])],
    title: `${t.h1} | Southern Garage Co.`, desc: `${t.h1} from Southern Garage Co.: slab, steel, delivery and install on one invoice. Price locked in writing for 6 months.`, ogImage: t.photo ? PHOTOS[t.photo].src : undefined,
    body: `${interiorHero({ trail: [['Home', '/'], ['Steel buildings', '/steel-buildings/'], [t.name, `/${t.slug}/`]], h1: t.h1, lead: t.lead, quiz: true })}
<section class="sec"><div class="wrap split"><div class="${rv.trim()}">${t.photo ? photo(t.photo, { ratio: '4/3', eager: false }) : `<div class="anat" style="padding:48px"><div class="tile__draw" style="border:0;background:none">${elev(t.slug)}</div></div>`}</div>
<div class="${rv.trim()}"><div class="eyebrow">Why steel</div><h2>${t.short === 'Garages' ? 'Built to park, work and last.' : `Built for ${t.short.toLowerCase()}.`}</h2><ul class="checks">${t.why.map((w) => `<li><span>${w}</span></li>`).join('')}</ul></div></div></section>
${related.length ? `<section class="sec sec--dark2"><div class="wrap"><div class="sh${rv}"><div><div class="eyebrow">Popular sizes</div><h2>Common ${t.short.toLowerCase()} sizes.</h2></div><a class="btn btn--ghost" href="/sizes-and-prices/">All sizes ${ARROW}</a></div><div class="stable${rv}">${related.map(sizeRow).join('')}</div></div></section>` : ''}
${insideNumber(true)}${faqSection([...t.faq, ...FAQ_CORE.slice(0, 3)], false, `${t.short}: your questions.`)}${ctaBand()}` });
}

// ---- Size pages ----
for (const s of SIZES) {
  const idx = SIZES.indexOf(s), rel = [SIZES[idx - 1], SIZES[idx + 1]].filter(Boolean);
  const faq = [
    [`How many vehicles fit in a ${s.w} by ${s.l} steel garage?`, `Roughly ${veh(s)} — at about 10 by 20 feet per vehicle — with no room left to walk around. Leave space if you want a workbench, storage or a lift.`],
    [`What size doors come with a ${s.w}×${s.l} building?`, `${s.doors}${s.okDoors ? '' : ' (confirm for this size)'}. More doors, taller doors and different placements are quoted on the same sheet.`],
    ['Is the slab included?', 'You can bundle a 4″ concrete slab with an 8″ × 8″ turn-down footing into the same invoice, so one crew handles the concrete and the steel.'],
  ];
  add({ path: `/steel-buildings/${s.slug}/`, quiz: true, preset: { size: widthPreset(s) }, ld: [crumbLD([['Home', '/'], ['Steel buildings', '/steel-buildings/'], [`${s.w}×${s.l}`, `/steel-buildings/${s.slug}/`]]), faqLD(faq)],
    title: `${s.w}x${s.l} Steel Garage: Specs & Price | Southern Garage Co.`, ogImage: PHOTOS[s.photo].src,
    desc: `${s.w}′ × ${s.l}′ × ${s.h}′ steel building — ${num(s.w * s.l)} sq ft, fits about ${veh(s)} vehicles. Slab, steel, delivery and install on one invoice. Price locked in writing for 6 months.`,
    body: `${interiorHero({ trail: [['Home', '/'], ['Steel buildings', '/steel-buildings/'], [`${s.w}×${s.l}`, `/steel-buildings/${s.slug}/`]], h1: `${s.w}×${s.l} steel garage &amp; workshop`, lead: s.use, quiz: true })}
<section class="sec"><div class="wrap split"><div class="${rv.trim()}">${photo(s.photo, { ratio: '3/2' })}</div><div class="${rv.trim()}"><div class="eyebrow">Spec sheet</div><h2 class="n">${s.w}′ × ${s.l}′ × ${s.h}′</h2>
<dl class="kv" style="margin-top:24px"><div><dt>Floor area</dt><dd class="n">${num(s.w * s.l)} sq ft</dd></div><div><dt>Fits roughly</dt><dd class="n">${veh(s)} vehicles</dd></div><div><dt>Doors in package</dt><dd>${s.okDoors ? s.doors : vf(s.doors)}</dd></div><div><dt>Frame / panels</dt><dd>14-gauge / 29-gauge</dd></div><div><dt>Roof load</dt><dd>${vf('35 PSF standard')}</dd></div><div><dt>Whole number</dt><dd>${vf('$[price] + tax')}</dd></div><div><dt>Monthly</dt><dd>${vf('as low as $[—]/mo*')}</dd></div></dl>
<p class="note">${vf('*With approved financing — payment varies. Prices effective [date].')}</p></div></div></section>
<section class="sec sec--paper"><div class="wrap split"><div class="${rv.trim()}"><div class="eyebrow">Drawn to scale</div><h2>What fits inside ${s.w}′ × ${s.l}′.</h2><p class="lead" style="margin-top:18px">${s.use}</p><p class="note">Plan view, drawn to scale. Vehicles shown at 10′ × 20′ each — approximate.</p></div><div class="anat${rv}" style="padding:20px">${planSVG(s)}</div></div></section>
${insideNumber(false)}
${rel.length ? `<section class="sec sec--dark2"><div class="wrap"><div class="sh${rv}"><div><div class="eyebrow">Compare</div><h2>Next sizes.</h2></div><a class="btn btn--ghost" href="/sizes-and-prices/">All sizes ${ARROW}</a></div><div class="stable${rv}">${rel.map(sizeRow).join('')}</div></div></section>` : ''}
${faqSection(faq, true, `${s.w}×${s.l}: your questions.`)}${ctaBand()}` });
}

// ---- Sizes & prices ----
add({ path: '/sizes-and-prices/', quiz: true, ld: [crumbLD([['Home', '/'], ['Sizes & Prices', '/sizes-and-prices/']])],
  title: 'Steel Building Sizes & Prices | Southern Garage Co.', desc: 'Every steel building size we build — 30×35 to 30×100 and 40×60 — priced as one whole number with slab, steel, doors, delivery and install.',
  body: `${interiorHero({ trail: [['Home', '/'], ['Sizes & Prices', '/sizes-and-prices/']], h1: 'Sizes &amp; prices.', lead: 'One whole number per size — slab, steel, doors, delivery and install — with the monthly beside it.', quiz: true })}
${pickerSection('30x50')}<section class="sec sec--dark2"><div class="wrap"><div class="stable${rv}"><div class="srow srow--h"><span>Size</span><span>Floor area</span><span>Doors in package</span><span>Whole number</span><span></span></div>${SIZES.map(sizeRow).join('')}</div><p class="note">${vf('Prices effective [date]. Publish from the same sheet your ads use so no stale number ships. *As low as $[—]/mo with approved financing — payment varies.')}</p><p class="note">Need another size, height, roof style or door setup? Every building is custom. <a href="/#sg-quote" class="o" style="font-weight:800">Get the whole number →</a></p></div></section>${insideNumber(true)}${ctaBand()}` });

// ---- How it's built ----
const specs = [['What does “gauge” mean?', FAQ_CORE[0][1]], ['What is a clear-span building?', FAQ_CORE[1][1]], ['What’s a turn-down footing?', FAQ_CORE[2][1]], ['Regular, A-frame or vertical roof?', FAQ_CORE[3][1]],
  ['How much snow or wind can it take?', `Standard is a ${vf('35 PSF')} roof load, built to ${vf('145 mph wind')} ratings per the current site. Tell us your ZIP and we confirm what your site requires — your plans are engineered to it.`]];
add({ path: '/how-its-built/', quiz: true, ld: [crumbLD([['Home', '/'], ['How it’s built', '/how-its-built/']]), faqLD(specs.slice(0, 4))],
  title: 'How Our Steel Buildings Are Built | Southern Garage Co.', desc: 'Slab, footing, frame, trusses, panels and doors — how a Southern Garage steel building goes together, and what is inside the number.',
  body: `${interiorHero({ trail: [['Home', '/'], ['How it’s built', '/how-its-built/']], h1: 'How it’s built.', lead: 'From the footing up: slab, frame, trusses, panels and doors — and exactly what is inside your number.', quiz: true })}${insideNumber(true)}${processSection(false)}${faqSection(specs, false, 'The specs, in plain English.')}${ctaBand()}` });

// ---- Financing ----
add({ path: '/financing/', ld: [crumbLD([['Home', '/'], ['Financing', '/financing/']])], title: 'Steel Building Financing & Rent-to-Own | Southern Garage Co.', desc: 'Finance or rent-to-own your steel building with approved credit. Whole number first, monthly beside it.',
  body: `${interiorHero({ trail: [['Home', '/'], ['Financing', '/financing/']], h1: 'Financing &amp; rent-to-own.', lead: 'The whole number comes first and the monthly sits beside it. Programs below are subject to approved credit.', cta: `<a class="btn" href="/#sg-quote">Get my price ${ARROW}</a>` })}
<section class="sec"><div class="wrap split"><div class="panel${rv}"><div class="eyebrow">Financing</div><h3>Finance your building</h3><p>Spread the cost with monthly payments through our financing partner.</p><p>${vf('As low as $[—]/mo with approved financing — payment varies.')}</p><a class="btn" style="margin-top:22px" href="${SITE.financingUrl}" rel="noopener">Check my financing ${ARROW}</a></div>
<div class="panel${rv}"><div class="eyebrow">Rent-to-own</div><h3>Rent-to-own</h3><p>No-credit-needed style options may be available. Terms are set by the program provider.</p><p>${vf('[Confirm RTO terms before publishing any claim about credit requirements.]')}</p><a class="btn btn--ghost" style="margin-top:22px" href="${SITE.rtoUrl}" rel="noopener">See rent-to-own ${ARROW}</a></div></div></section>
<section class="sec sec--dark2"><div class="wrap"><div class="sh"><div><div class="eyebrow">How payment works</div><h2>When you pay.</h2></div></div><dl class="kv"><div><dt>To order</dt><dd>${vf('10–17% deposit')}</dd></div><div><dt>After install</dt><dd>${vf('Final payment once installed')}</dd></div><div><dt>Price lock</dt><dd>${SITE.priceLockMonths} months, in writing</dd></div></dl><p class="note">${vf('Deposit and payment-timing terms are from the current site’s contact page — confirm before publishing.')}</p></div></section>${ctaBand()}` });

// ---- Service areas ----
add({ path: '/service-areas/', quiz: false, ld: [crumbLD([['Home', '/'], ['Service areas', '/service-areas/']])], title: 'Steel Building Service Areas | Southern Garage Co.', desc: `Southern Garage delivers and installs steel buildings across ${STATES.map((s) => s.name).join(', ')}. Check your ZIP.`,
  body: `${interiorHero({ trail: [['Home', '/'], ['Service areas', '/service-areas/']], h1: 'Where we install.', lead: 'We deliver and install steel buildings across the states below. Type your ZIP to find out for sure.' })}${areasSection()}
<section class="sec"><div class="wrap">${STATES.map((s) => `<div class="split rv" id="${s.slug}" style="padding:28px 0;border-top:1px solid var(--line)"><div><h3>${s.name}</h3></div><div><p>Steel garages, workshops, barns and carports delivered and installed in ${s.name}. ${vf('[Add real local detail here: counties served, recent job cities, local photos.]')}</p><a href="/steel-buildings/${s.slug}/" class="o" style="font-weight:800">${s.name} steel buildings →</a></div></div>`).join('')}</div></section>${ctaBand()}` });

// ---- State pages (noindex until real local content exists) ----
for (const st of STATES) {
  const faq = [[`Do I need a permit for a steel building in ${st.name}?`, 'Permit rules are set by your county or city. Ask what is required for a building of your size, and whether engineered plans are needed. We supply engineered plans and can tell you what to ask.'], [`Do you install in my part of ${st.name}?`, 'Type your ZIP on the service areas page and we’ll tell you straight.'], ...FAQ_CORE.slice(0, 2)];
  add({ path: `/steel-buildings/${st.slug}/`, quiz: true, noindex: !STATES_INDEXABLE, ld: [crumbLD([['Home', '/'], ['Service areas', '/service-areas/'], [st.name, `/steel-buildings/${st.slug}/`]]), faqLD(faq)],
    title: `Steel Buildings in ${st.name} | Southern Garage Co.`, desc: `Custom steel garages, workshops and barns delivered and installed in ${st.name}. One crew, one invoice, one number in writing.`,
    body: `${interiorHero({ trail: [['Home', '/'], ['Service areas', '/service-areas/'], [st.name, `/steel-buildings/${st.slug}/`]], h1: `Steel buildings in ${st.name}.`, lead: `Custom steel garages, workshops, barns and carports delivered and installed in ${st.name} — slab, steel and install on one invoice.`, quiz: true })}
<section class="sec"><div class="wrap split"><div class="${rv.trim()}"><div class="eyebrow">In ${st.name}</div><h2>Local detail goes here.</h2><p class="lead" style="margin-top:18px">${vf(`[Real ${st.name} content: counties and cities served, recent job photos with size/city/date, local permit notes. This page is set to noindex until that is added, so thin copy never hurts your rankings.]`)}</p></div><div class="${rv.trim()}"><ul class="checks"><li><span><b>Engineered for your site</b> — plans for your exact ZIP</span></li><li><span><b>One crew, one invoice</b> — slab to install</span></li><li><span><b>Price locked ${SITE.priceLockMonths} months</b> — in writing</span></li></ul></div></div></section>${typeTiles().replace('<div class="tiles">', '<section class="sec sec--dark2"><div class="wrap"><div class="tiles">') + '</div></section>'}${faqSection(faq, true, `${st.name}: your questions.`)}${ctaBand()}` });
}

// ---- About ----
add({ path: '/about/', ld: [crumbLD([['Home', '/'], ['About', '/about/']]), localBusinessLD()], title: 'About Southern Garage Co. | American Steel Builders', desc: 'Southern Garage Co. builds custom steel garages, shops and barns from Clanton, Alabama — one crew, one invoice, one number in writing.',
  body: `${interiorHero({ trail: [['Home', '/'], ['About', '/about/']], h1: 'We build steel buildings. And we put the number in writing.', lead: 'Southern Garage Co. is a steel building company in Clanton, Alabama. We design, deliver and install custom steel garages, shops, barns and carports for homeowners, landowners and businesses.', cta: `<a class="btn" href="/#sg-quote">Get my price ${ARROW}</a><a class="btn btn--ghost" href="${SITE.phoneHref}">Call ${SITE.phone}</a>` })}
<section class="sec"><div class="wrap split"><div class="${rv.trim()}"><div class="eyebrow">How we work</div><h2>No call centers. No surprises.</h2></div><ul class="checks${rv}"><li><span><b>You talk to a person.</b> When you reach out, you reach someone who knows steel buildings and your area.</span></li><li><span><b>One crew, one invoice.</b> Design, engineering, delivery and install — we handle it, so you don’t coordinate contractors.</span></li><li><span><b>Engineered for your site.</b> ${vf('Plans designed to your ZIP code’s wind and load requirements.')}</span></li><li><span><b>The number doesn’t move.</b> Your price is locked in writing for ${SITE.priceLockMonths} months.</span></li></ul></div></section>
<section class="sec sec--dark2"><div class="wrap split"><div class="${rv.trim()}"><div class="eyebrow">Our team</div><h2>The people you’ll talk to.</h2></div><div class="slot${rv}"><h3>Real team photos and names go here</h3><p>${vf('Only real staff photos and accurate titles will appear here. The current About page shows team members whose details conflict across the site (for example the name and the bio under one photo) — we’ll rebuild this section from your confirmed roster.')}</p></div></div></section>
<section class="sec"><div class="wrap split"><div class="${rv.trim()}"><div class="eyebrow">Our promise</div><h2>If it’s on this site, it’s true.</h2></div><div class="${rv.trim()}"><p class="lead">Every photo on this site is an unedited Southern Garage build or it says “concept only.” Every price carries an effective date. Every review is a real one. If we can’t prove it in writing, it doesn’t ship.</p></div></div></section>${ctaBand()}` });

// ---- Contact ----
add({ path: '/contact/', quiz: true, popup: false, ld: [crumbLD([['Home', '/'], ['Contact', '/contact/']]), localBusinessLD()], title: 'Contact Southern Garage Co. | Get Your Price', desc: `Call ${SITE.phone}, text us, or get your whole number online. ${SITE.street}, ${SITE.city}, ${SITE.region}.`,
  body: `${interiorHero({ trail: [['Home', '/'], ['Contact', '/contact/']], h1: 'Talk to a builder.', lead: 'Get your whole number online in about 30 seconds, or call or text. You’ll reach a person.', quiz: true })}
<section class="sec"><div class="wrap split"><div class="${rv.trim()}"><div class="eyebrow">Reach us</div><dl class="kv"><div><dt>Phone</dt><dd><a href="${SITE.phoneHref}">${SITE.phone}</a></dd></div><div><dt>Text</dt><dd><a href="${SITE.smsHref}">${SITE.phone}</a></dd></div><div><dt>Address</dt><dd><a href="${SITE.mapUrl}" rel="noopener">${SITE.street}, ${SITE.city}, ${SITE.region}</a></dd></div><div><dt>Hours</dt><dd>${vf(SITE.hours)}</dd></div></dl></div>
<div class="${rv.trim()}"><div class="panel"><h3>What happens next</h3><p>A specialist reaches out ${vf('within 1 business day')} with your custom price, locked in writing for ${SITE.priceLockMonths} months. No harm if it just sits in a drawer.</p></div></div></div></section>` });

// ---- Dealer program ----
add({ path: '/dealer-program/', quiz: false, ld: [crumbLD([['Home', '/'], ['Dealer program', '/dealer-program/']])], title: 'Steel Building Dealer Program | Southern Garage Co.', desc: 'Sell custom steel buildings with no inventory and no franchise fee. We engineer, deliver and install. Apply to become a Southern Garage dealer.',
  body: `${interiorHero({ trail: [['Home', '/'], ['Dealer program', '/dealer-program/']], h1: 'Become a Southern Garage dealer.', lead: 'Sell a full catalog of custom steel buildings with zero inventory. You sell. We engineer, deliver and install.', cta: `<a class="btn" href="/contact/">Apply — takes 2 minutes ${ARROW}</a>` })}
<section class="sec"><div class="wrap split"><div class="${rv.trim()}"><div class="eyebrow">Why it works</div><h2>A second revenue line, without the stock.</h2></div><ul class="checks${rv}"><li><span><b>Zero inventory.</b> Every building is fabricated to order. Nothing sits on your books.</span></li><li><span><b>We handle the hard part.</b> Engineered drawings, delivery and professional install crews are on us.</span></li><li><span><b>Financing and rent-to-own</b> to close buyers who can’t write a check today.</span></li><li><span><b>A direct line to our team.</b> Dealers don’t wait in a customer-service queue.</span></li></ul></div></section>
<section class="sec sec--dark2"><div class="wrap"><div class="sh"><div><div class="eyebrow">The process</div><h2>From application to your first sale.</h2></div></div><div class="steps">${[['Apply', 'Four quick questions, about two minutes. No documents, no commitment.'], ['Review call', 'If the area and fit look right, we schedule a call within two business days.'], ['Onboard & train', 'Pricing, quoting, the product line, and how orders flow from sale to install.'], ['Sell with backup', 'Your first deals aren’t alone — we work them with you.']].map(([h, p]) => `<div class="step"><h3>${h}</h3><p>${p}</p></div>`).join('')}</div><p class="note">${vf('No franchise fee and no inventory purchase, per the current dealer page — confirm terms in writing.')}</p></div></section>${ctaBand('Ready to talk dealer terms?', 'Tell us where you’d sell and we’ll take it from there.')}` });

// ---- Blog ----
add({ path: '/blog/', ld: [crumbLD([['Home', '/'], ['Blog', '/blog/']])], title: 'Steel Building Guides & Advice | Southern Garage Co.', desc: 'Plain-English guides on steel garage costs, gauge, slabs, permits and sizing — from the crew that builds them.',
  body: `${interiorHero({ trail: [['Home', '/'], ['Blog', '/blog/']], h1: 'Straight answers on steel buildings.', lead: 'No jargon, no fluff. What things cost, what the specs mean, and what to ask before you order.' })}<section class="sec"><div class="wrap"><div class="posts">${POSTS.map(postCard).join('')}</div></div></section>${ctaBand()}` });
for (const p of POSTS) {
  add({ path: `/blog/${p.slug}/`, quiz: true, ld: [crumbLD([['Home', '/'], ['Blog', '/blog/'], [p.title, `/blog/${p.slug}/`]]), { '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.desc, datePublished: p.date, dateModified: p.date, author: { '@type': 'Organization', name: SITE.name }, publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: abs('/') } }, mainEntityOfPage: abs(`/blog/${p.slug}/`) }],
    title: p.seo, desc: p.desc,
    body: `<section class="phero phero--solo"><div class="wrap phero__grid"><div>${breadcrumbs([['Home', '/'], ['Blog', '/blog/'], [p.title, `/blog/${p.slug}/`]])}<h1 style="font-size:clamp(32px,4vw,50px)">${p.title}</h1><div class="article-meta"><span>${p.read} min read</span><span>Updated ${p.date}</span></div></div></div></section>
<section class="sec"><div class="wrap split" style="grid-template-columns:minmax(0,720px) minmax(0,1fr)"><article class="prose">${p.body}</article><aside class="aside">${quizCard()}</aside></div></section>${postsTeaser()}` });
}

// ---- Legal / utility ----
const legal = (title, h1, body) => ({ path: `/${title}/`, popup: false, ld: [], title: `${h1} | Southern Garage Co.`, desc: `${h1} for southerngarage.com, the website of Southern Garage Co. in Clanton, Alabama.`, body: `${interiorHero({ trail: [['Home', '/'], [h1, `/${title}/`]], h1, lead: vf('Draft for legal review before launch.') })}<section class="sec"><div class="wrap"><div class="prose">${body}</div></div></section>` });
add(legal('privacy', 'Privacy policy', `<p>This policy explains what ${SITE.name} collects through southerngarage.com and how it is used.</p><h2>What we collect</h2><p>Information you enter in our forms — name, phone number, email address, ZIP code, and what you are looking to build — plus basic analytics such as pages visited and the ad or link that brought you here.</p><h2>How we use it</h2><p>To prepare and send your quote, to contact you by phone, text or email about it, and to improve the site and our advertising. Consent to be contacted is not a condition of purchase. Reply STOP to any text to opt out.</p><h2>Who we share it with</h2><p>Service providers that help us run our business (such as our customer-management and messaging tools and financing partners you choose to apply with). We do not sell your personal information.</p><h2>Your choices</h2><p>To see, correct or delete your information, call ${SITE.phone}.</p>`));
add(legal('terms', 'Terms of use', `<p>By using southerngarage.com you agree to these terms.</p><h2>Prices and quotes</h2><p>Prices shown are effective on the date listed and are not an offer until confirmed in a written quote. Financing is subject to approved credit.</p><h2>Photos and content</h2><p>Photos labeled as real builds show work we performed. Images labeled “concept only” are illustrations.</p><h2>Limitation</h2><p>This site is provided as is. Nothing here is a substitute for a written quote and engineered plans for your site.</p>`));
add({ path: '/thank-you/', noindex: true, quiz: false, popup: false, ld: [], title: 'Thank you | Southern Garage Co.', desc: 'Your request was received. A Southern Garage building specialist will reach out shortly with your price.', body: `<section class="sec"><div class="wrap"><div class="eyebrow">Received</div><h1>You’re all set.</h1><p class="lead" style="margin:18px 0 28px">A building specialist will reach out shortly with your custom price — locked in writing for ${SITE.priceLockMonths} months.</p><a class="btn" href="${SITE.phoneHref}">Need it faster? Call ${SITE.phone}</a></div></section>` });
export const notFound = { path: '/404.html', popup: false, noindex: true, ld: [], title: 'Page not found | Southern Garage Co.', desc: 'That page moved or never existed. Try the sizes and prices page, or call Southern Garage Co. and we will point you right.', body: `<section class="sec"><div class="wrap"><div class="eyebrow">404</div><h1>That page moved.</h1><p class="lead" style="margin:18px 0 28px">Try the sizes page, or call and we’ll point you right.</p><div class="phero__cta"><a class="btn" href="/sizes-and-prices/">Sizes &amp; prices</a><a class="btn btn--ghost" href="/">Home</a></div></div></section>` };
