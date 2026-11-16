import { SITE, LOGO, LOGO_ASPECT, PHOTOS, TYPES, SIZES, STATES, STATES_INDEXABLE, REGIONS } from './data.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const vf = (t) => (SITE.preview ? `<span class="vf">${t}</span>` : t);
export const abs = (p) => SITE.domain + p;
export const num = (n) => n.toLocaleString('en-US');
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
export { ARROW };

// ---------- Drawn building elevations (consistent line language; used where no matching real photo exists) ----------
const L = 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
const ELEV = {
  'steel-garages': `<path d="M6 22 36 9l30 13M10 22v20h52V22M10 42h52"/><rect x="16" y="28" width="16" height="14"/><rect x="40" y="28" width="16" height="14"/><path d="M16 33h16M16 38h16M40 33h16M40 38h16"/>`,
  'steel-workshops': `<path d="M4 21 36 13l32 8M8 21v21h56V21M8 42h56"/><rect x="14" y="26" width="26" height="16"/><path d="M14 31h26M14 36h26"/><rect x="46" y="31" width="7" height="11"/><rect x="57" y="27" width="5" height="5"/>`,
  'steel-barns': `<path d="M8 29 22 23 36 9l14 14 14 6v13H8ZM8 42h56"/><rect x="13" y="32" width="11" height="10"/><rect x="30.5" y="29" width="11" height="13"/><rect x="48" y="32" width="11" height="10"/>`,
  'steel-carports': `<path d="M5 15 36 8l31 7M10 15v27M62 15v27M4 42h64"/><rect x="21" y="31" width="30" height="8" rx="3"/><circle cx="28" cy="40" r="2.4"/><circle cx="44" cy="40" r="2.4"/><path d="M26 31l4-5h12l4 5"/>`,
  'rv-covers': `<path d="M6 17 36 6l30 11M12 17v25h48V17M8 42h56"/><path d="M20 42V24q16-8 32 0v18"/><path d="M26 42V28M46 42V28M26 34h20"/>`,
  'commercial-steel-buildings': `<path d="M3 21 36 14l33 7M5 21v21h62V21M3 42h66"/><rect x="10" y="28" width="14" height="14"/><rect x="29" y="28" width="14" height="14"/><rect x="48" y="28" width="14" height="14"/>`,
};
export const elev = (slug, cls = 'elev') => `<svg class="${cls}" viewBox="0 0 72 48" ${L} aria-hidden="true">${ELEV[slug] || ''}</svg>`;

// ---------- Photo block: fixed aspect box + explicit focal point, so crops are always intentional ----------
export function photo(key, { ratio = '3/2', cls = '', eager = false, sizes = '' } = {}) {
  const p = PHOTOS[key];
  if (!p) return '';
  return `<figure class="ph ${cls}" style="--r:${ratio};--fp:${p.fp}"><img src="${p.src}" alt="${esc(p.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}${sizes ? ` sizes="${sizes}"` : ''}></figure>`;
}

// ---------- To-scale plan view (static SVG; JS only toggles which one is visible) ----------
export function planSVG(s, { id = '' } = {}) {
  const W = 800, H = 440, ml = 70, mr = 90, mt = 84, mb = 76, aw = W - ml - mr, ah = H - mt - mb;
  const sc = Math.min(aw / s.l, ah / s.w), bw = s.l * sc, bh = s.w * sc, x = ml + (aw - bw) / 2, y = mt + (ah - bh) / 2;
  const cols = Math.floor(s.l / 20), rows = Math.floor(s.w / 10), ox = x + (bw - cols * 20 * sc) / 2, oy = y + (bh - rows * 10 * sc) / 2;
  let bays = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) bays += `<rect class="p-bay" x="${(ox + c * 20 * sc + 3).toFixed(1)}" y="${(oy + r * 10 * sc + 3).toFixed(1)}" width="${(20 * sc - 6).toFixed(1)}" height="${(10 * sc - 6).toFixed(1)}" rx="3"/>`;
  const dw = (s.w >= 40 ? 12 : 10) * sc, d1 = x + bw * 0.27 - dw / 2, d2 = x + bw * 0.55 - dw / 2, wk = x + bw * 0.84 - 1.5 * sc;
  const t = y - 30, rx = x + bw + 34, tick = 7;
  return `<svg class="plan" ${id ? `id="${id}"` : ''} viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Plan view of a ${s.w} by ${s.l} foot steel building, drawn to scale">
<rect class="p-wall" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="2"/>${bays}
<rect class="p-door" x="${d1.toFixed(1)}" y="${(y + bh - 4).toFixed(1)}" width="${dw.toFixed(1)}" height="8"/><rect class="p-door" x="${d2.toFixed(1)}" y="${(y + bh - 4).toFixed(1)}" width="${dw.toFixed(1)}" height="8"/><rect class="p-walk" x="${wk.toFixed(1)}" y="${(y + bh - 4).toFixed(1)}" width="${(3 * sc).toFixed(1)}" height="8"/>
<g class="p-dim"><line x1="${x.toFixed(1)}" y1="${t}" x2="${(x + bw).toFixed(1)}" y2="${t}"/><line x1="${x.toFixed(1)}" y1="${t - tick}" x2="${x.toFixed(1)}" y2="${t + tick}"/><line x1="${(x + bw).toFixed(1)}" y1="${t - tick}" x2="${(x + bw).toFixed(1)}" y2="${t + tick}"/>
<line x1="${rx.toFixed(1)}" y1="${y.toFixed(1)}" x2="${rx.toFixed(1)}" y2="${(y + bh).toFixed(1)}"/><line x1="${(rx - tick).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(rx + tick).toFixed(1)}" y2="${y.toFixed(1)}"/><line x1="${(rx - tick).toFixed(1)}" y1="${(y + bh).toFixed(1)}" x2="${(rx + tick).toFixed(1)}" y2="${(y + bh).toFixed(1)}"/></g>
<text class="p-lbl" x="${(x + bw / 2).toFixed(1)}" y="${t - 12}" text-anchor="middle">${s.l}′</text><text class="p-lbl" x="${(rx + 14).toFixed(1)}" y="${(y + bh / 2 + 6).toFixed(1)}">${s.w}′</text>
<text class="p-sub" x="${(x + bw / 2).toFixed(1)}" y="${(y + bh + 34).toFixed(1)}" text-anchor="middle">FRONT WALL · DOORS</text></svg>`;
}

// ---------- Header / footer ----------
const nav = [['Sizes & Prices', '/sizes-and-prices/'], ['How It’s Built', '/how-its-built/'], ['Financing', '/financing/']];
const company = [['About', '/about/', 'Who we are and how we work'], ['Blog', '/blog/', 'Plain-English steel building guides'], ['Dealer program', '/dealer-program/', 'Sell steel buildings, zero inventory'], ['Contact', '/contact/', 'Call, text or visit']];
function header(path) {
  const types = TYPES.map((t) => `<a class="mega__link" href="/${t.slug}/"><span class="mega__ico">${elev(t.slug)}</span><span><b>${t.short}</b><small>${t.blurb}</small></span></a>`).join('');
  const sizes = SIZES.map((s) => `<a class="mega__row" href="/steel-buildings/${s.slug}/"><b class="n">${s.w}′ × ${s.l}′ × ${s.h}′</b><span>${num(s.w * s.l)} sq ft</span></a>`).join('');
  const states = STATES.map((s) => `<a href="/service-areas/#${s.slug}">${s.name}</a>`).join('');
  return `<header class="hdr" id="hdr">
${SITE.preview ? `<div class="proto">REDESIGN PREVIEW — photos are from the current site and are <b>not yet verified as real jobs</b>. Items in <span class="vf">dashed yellow</span> need confirming before launch.</div>` : ''}
<div class="wrap hdr__bar">
<a class="logo" href="/" aria-label="${esc(SITE.name)} — home"><img src="${LOGO}" alt="${esc(SITE.name)} — ${esc(SITE.tagline)}" width="${Math.round(50 * LOGO_ASPECT)}" height="50"></a>
<nav class="nav" aria-label="Primary"><ul>
<li class="nav__item has-mega"><button type="button" aria-expanded="false" aria-controls="m-b">Buildings<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg></button>
<div class="mega mega--b" id="m-b"><div class="mega__col"><p class="mega__h">What we build</p><div class="mega__links">${types}</div></div>
<div class="mega__col"><p class="mega__h">By size</p>${sizes}<a class="mega__all" href="/sizes-and-prices/">All sizes &amp; prices ${ARROW}</a></div>
<div class="mega__cta"><p class="mega__h">Not sure what you need?</p><p>Tell us what you’re building and your ZIP. We’ll send the whole number in writing.</p><a class="btn" href="/#sg-quote">Get my price</a></div></div></li>
<li class="nav__item"><a href="/sizes-and-prices/"${path === '/sizes-and-prices/' ? ' aria-current="page"' : ''}>Sizes &amp; Prices</a></li>
<li class="nav__item has-mega"><button type="button" aria-expanded="false" aria-controls="m-a">Service Areas<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg></button>
<div class="mega mega--a" id="m-a"><div class="mega__col"><p class="mega__h">We install in</p><div class="mega__states">${states}</div><a class="mega__all" href="/service-areas/">Service area details ${ARROW}</a></div>
<div class="mega__cta"><p class="mega__h">Check your ZIP</p><p>Yes or no, before you fill out anything.</p><form class="zipmini" data-zip><input inputmode="numeric" maxlength="5" placeholder="ZIP code" aria-label="ZIP code"><button class="btn btn--sm" type="submit">Check</button></form><p class="zipmini__res" aria-live="polite"></p></div></div></li>
${nav.slice(1).map(([n, h]) => `<li class="nav__item"><a href="${h}"${path === h ? ' aria-current="page"' : ''}>${n}</a></li>`).join('')}
<li class="nav__item has-mega is-small"><button type="button" aria-expanded="false" aria-controls="m-c">Company<svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 1l4 4 4-4"/></svg></button>
<div class="mega mega--s" id="m-c">${company.map(([n, h, d]) => `<a class="mega__row mega__row--s" href="${h}"><b>${n}</b><span>${d}</span></a>`).join('')}</div></li>
</ul></nav>
<div class="hdr__cta"><a class="hdr__tel" href="${SITE.phoneHref}"><small>Talk to a builder</small>${SITE.phone}</a><a class="btn btn--sm" href="/#sg-quote">Get My Price</a></div>
<button class="burger" type="button" id="burger" aria-label="Open menu" aria-expanded="false"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
</div></header>
<div class="drawer" id="drawer" aria-hidden="true"><div class="drawer__top"><img src="${LOGO}" alt="${esc(SITE.name)}" width="${Math.round(42 * LOGO_ASPECT)}" height="42"><button type="button" id="closeDrawer" aria-label="Close menu">✕</button></div>
<details><summary>Buildings</summary>${TYPES.map((t) => `<a href="/${t.slug}/">${t.short}</a>`).join('')}</details>
<a class="drawer__big" href="/sizes-and-prices/">Sizes &amp; Prices</a>
<details><summary>Service Areas</summary>${STATES.map((s) => `<a href="/service-areas/#${s.slug}">${s.name}</a>`).join('')}<a href="/service-areas/">All service areas</a></details>
${nav.slice(1).map(([n, h]) => `<a class="drawer__big" href="${h}">${n}</a>`).join('')}
<details><summary>Company</summary>${company.map(([n, h]) => `<a href="${h}">${n}</a>`).join('')}</details>
<a class="btn" href="/#sg-quote">Get My Price</a><a class="btn btn--ghost" href="${SITE.phoneHref}">Call ${SITE.phone}</a></div>`;
}

function footer() {
  const col = (h, links) => `<div><h4>${h}</h4>${links.map(([n, u]) => `<a href="${u}">${n}</a>`).join('')}</div>`;
  return `<footer class="ftr"><div class="wrap">
<div class="ftr__grid">
<div class="ftr__brand"><img src="${LOGO}" alt="${esc(SITE.name)} — ${esc(SITE.tagline)}" width="${Math.round(54 * LOGO_ASPECT)}" height="54" loading="lazy"><a class="ftr__tel" href="${SITE.phoneHref}">${SITE.phone}</a><address>${SITE.street}<br>${SITE.city}, ${SITE.region}<br>${vf(SITE.hours)}</address></div>
${col('Buildings', TYPES.map((t) => [t.short, `/${t.slug}/`]))}
${col('Sizes', [...SIZES.map((s) => [`${s.w}′ × ${s.l}′`, `/steel-buildings/${s.slug}/`]), ['All sizes & prices', '/sizes-and-prices/']])}
${col('Company', [['About', '/about/'], ['How it’s built', '/how-its-built/'], ['Financing', '/financing/'], ['Service areas', '/service-areas/'], ['Blog', '/blog/'], ['Dealer program', '/dealer-program/'], ['Contact', '/contact/']])}
</div>
<div class="ftr__states"><h4>We install in</h4><p>${STATES.map((s) => `<a href="/service-areas/#${s.slug}">${s.name}</a>`).join('')}</p></div>
<div class="ftr__legal"><p>© ${new Date().getFullYear()} ${SITE.legal} All rights reserved. Prices shown are effective on the date listed. Financing is subject to approved credit; payment varies. By requesting a price you agree ${SITE.name} may contact you by phone, text or email about your quote; consent is not a condition of purchase; message and data rates may apply; reply STOP to opt out.</p><p><a href="#" data-sg-popup>Ask a builder</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/sitemap.xml">Sitemap</a></p></div>
</div></footer>`;
}

// ---------- Reusable blocks ----------
export const breadcrumbs = (trail) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map(([n, u], i) => (i < trail.length - 1 ? `<li><a href="${u}">${n}</a></li>` : `<li aria-current="page">${n}</li>`)).join('')}</ol></nav>`;
export const crumbLD = (trail) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: trail.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n.replace(/&amp;/g, '&'), item: abs(u) })) });
export const faqLD = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
export const faqBlock = (items) => `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;

// The quiz card: markup only; logic is /assets/quiz.js (ported from the live site, behavior unchanged).
export const quizCard = () => `<div class="sgq" id="sg-quote"><div class="qcard">
<div class="qhead"><h2>See What Your Building Costs</h2><p class="qsub"><span>Your custom price in ~30 seconds</span><i>·</i><span>locked in writing for ${SITE.priceLockMonths} months</span><i>·</i><span>no pressure</span></p></div>
<div class="qprog"><i id="sgq-bar"></i></div><div class="qbody" id="sgq-body"></div>
<div class="qfoot"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>Your info is secure &amp; never shared.</div></div></div>`;

export const ctaBand = (h = 'Get your whole number — in about 30 seconds.', p = `Four taps, a ZIP and your contact. Locked in writing for ${SITE.priceLockMonths} months.`) =>
  `<section class="band"><div class="wrap band__in"><div><h2>${h}</h2><p>${p}</p></div><div class="band__btns"><a class="btn btn--lg" href="/#sg-quote" data-preset="">See What My Building Costs ${ARROW}</a><a class="btn btn--ghost btn--lg" href="${SITE.phoneHref}">Call ${SITE.phone}</a></div></div></section>`;

export const sizeRow = (s) => `<a class="srow" href="/steel-buildings/${s.slug}/"><b class="n">${s.w}′ × ${s.l}′ × ${s.h}′</b><span class="n">${num(s.w * s.l)} sq ft</span><span>${s.doors}</span><span class="price">${vf('$[price] + tax')}</span><span class="go">View ${ARROW}</span></a>`;

// ---------- "Building Experts" popup (markup; behavior in /assets/popup.js) ----------
export const popupMarkup = () => `<div class="pop" id="sg-pop" role="dialog" aria-modal="true" aria-labelledby="pop-h" aria-hidden="true" hidden>
<div class="pop__scrim" data-close></div>
<div class="pop__card"><div class="pop__hdr"><img src="${LOGO}" alt="${esc(SITE.name)}" width="${Math.round(40 * LOGO_ASPECT)}" height="40"><div><b>Building Experts</b><small>Standing by · Straight answers · Zero pressure</small></div><button type="button" class="pop__x" data-close aria-label="Close">✕</button></div>
<div class="pop__body"><div class="pop__main"><h2 id="pop-h">Got questions about your project?</h2>
<p class="pop__lead">Whether it’s “what size do I need?” or “how does install actually work?” — we’ve got real answers.</p>
<p class="pop__rate" hidden><b></b><span></span></p>
<ul class="pop__benes"><li>Current pricing for your ZIP</li><li>How delivery &amp; install works</li><li>Honest advice, zero pressure</li></ul>
<div class="pop__inst" hidden><p>Recent installs</p><div class="pop__thumbs"></div></div>
<form novalidate><div class="pop__f"><input name="name" placeholder="Name" autocomplete="name"><input name="email" type="email" placeholder="Email" autocomplete="email"><input name="phone" type="tel" inputmode="tel" placeholder="Phone" autocomplete="tel"><input name="zip" inputmode="numeric" maxlength="5" placeholder="ZIP code" autocomplete="postal-code"></div>
<div class="pop__err" role="alert"></div><button class="btn btn--lg pop__cta" type="submit">Secure my quote now <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form>
<p class="pop__ps"><b>P.S.</b> Ask any builder what’s <em>not</em> in their number. Ours covers the slab, steel, delivery and install.</p>
<p class="pop__fine">By submitting, you agree we may call or text you about your quote. Consent is not a condition of purchase.</p></div>
<div class="pop__done" hidden><h3>You’re all set.</h3><p>We’ve got your info and we’ll reach out shortly with your exact pricing. Talk soon.</p><a class="btn" href="${SITE.phoneHref}">Need it faster? Call ${SITE.phone}</a></div></div></div></div>`;

// ---------- Page shell ----------
export function page({ path, title, desc, body, ld = [], noindex = false, quiz = false, ogImage = null, bodyClass = '', preset = null, states = {}, popup = true }) {
  const url = abs(path);
  const robots = noindex ? '<meta name="robots" content="noindex,follow">' : '';
  const ldAll = ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><link rel="canonical" href="${url}">${robots}
<meta property="og:type" content="website"><meta property="og:site_name" content="${esc(SITE.name)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${ogImage || abs('/og.png')}"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#100D0A"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"><link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/montserrat-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css">
${ldAll}
<script>document.documentElement.classList.add('js')</script>
</head><body class="${bodyClass}">
<a class="skip" href="#top">Skip to content</a>
${header(path)}
<main id="top">${body}</main>
${footer()}
${popup ? popupMarkup() : ''}
${quiz ? `<div class="stickybar" id="sgq-sticky"><span>Your price in ~30 seconds — locked ${SITE.priceLockMonths} months</span><a href="#sg-quote" id="sgq-stickybtn">Show My Price</a></div>` : ''}
<script>window.SG_CONFIG=${JSON.stringify({ webhook: SITE.ghlWebhook, phone: SITE.phone, phoneHref: SITE.phoneHref, preset, states, popup: SITE.popup })}</script>
${quiz ? `<script src="/assets/quiz.js" defer></script>` : ''}
${popup ? `<script src="/assets/popup.js" defer></script>` : ''}
<script src="/assets/site.js" defer></script>
</body></html>`.replaceAll(quiz ? 'href="/#sg-quote"' : '\u0000', 'href="#sg-quote"');
}

export const localBusinessLD = () => ({ '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', '@id': abs('/#business'), name: SITE.name, alternateName: `${SITE.name} — ${SITE.tagline}`, url: abs('/'), logo: abs(LOGO), image: abs('/og.png'), telephone: '+1-205-941-6115',
  description: 'Custom steel garages, workshops, barns and carports — slab, steel, delivery and install on one invoice.',
  address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: 'US' }, areaServed: STATES.map((s) => ({ '@type': 'State', name: s.name })), sameAs: [SITE.facebook] });
