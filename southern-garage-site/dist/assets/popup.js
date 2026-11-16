/* "Building Experts" lead popup — same mechanics as the live site (auto-open ~7s, once per visit, name/phone/email/ZIP, webhook),
   rebuilt for the new design system. Rating + install photos render ONLY when real values are set in SG_CONFIG.popup. */
(function () {
  var pop = document.getElementById('sg-pop'); if (!pop) return;
  var CFG = window.SG_CONFIG || {}, PC = CFG.popup || {};
  var $ = function (s) { return pop.querySelector(s); }, $$ = function (s) { return [].slice.call(pop.querySelectorAll(s)); };
  var form = $('form'), err = $('.pop__err'), btn = $('.pop__cta'), last = null, opened = false;

  /* optional, real-data-only blocks */
  if (PC.rating && PC.ratingCount) { $('.pop__rate').hidden = false; $('.pop__rate b').textContent = PC.rating; $('.pop__rate span').textContent = 'Based on ' + PC.ratingCount + ' Google reviews'; }
  if (PC.installs && PC.installs.length) { var w = $('.pop__inst'); w.hidden = false; $('.pop__thumbs').innerHTML = PC.installs.slice(0, 5).map(function (u) { return '<i style="background-image:url(\'' + u + '\')"></i>'; }).join(''); }

  function lock(v) { document.documentElement.style.overflow = v ? 'hidden' : ''; }
  function focusables() { return $$('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])').filter(function (e) { return e.offsetParent !== null; }); }
  function open() {
    if (opened) return; opened = true; last = document.activeElement; pop.hidden = false; pop.setAttribute('aria-hidden', 'false'); lock(true);
    requestAnimationFrame(function () { requestAnimationFrame(function () { pop.classList.add('is-on'); var f = $('input'); f && f.focus({ preventScroll: true }); }); });
  }
  function close() {
    if (!opened) return; opened = false; pop.classList.remove('is-on'); pop.setAttribute('aria-hidden', 'true'); lock(false);
    try { sessionStorage.setItem('sgPopClosed', '1'); } catch (e) {}
    setTimeout(function () { pop.hidden = true; }, 260); if (last && last.focus) last.focus({ preventScroll: true });
  }
  window.SGPopup = { open: open, close: close };
  document.addEventListener('click', function (e) { var t = e.target.closest('[data-sg-popup]'); if (t) { e.preventDefault(); open(); } });
  $$('[data-close]').forEach(function (x) { x.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) {
    if (!opened) return; if (e.key === 'Escape') return close();
    if (e.key === 'Tab') { var f = focusables(); if (!f.length) return; var a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
  });

  /* auto-open: once per visit, never while someone is mid-quiz or has a menu open */
  var closed = false; try { closed = sessionStorage.getItem('sgPopClosed') === '1'; } catch (e) {}
  if (!closed && PC.autoOpenMs !== 0) setTimeout(function () {
    var q = document.querySelector('.sgq'); if (q && q.contains(document.activeElement)) return;
    if (document.querySelector('.drawer.open,.nav__item.open')) return; open();
  }, PC.autoOpenMs || 7000);

  /* submit */
  function showErr(m) { err.textContent = m; err.classList.add('is-vis'); }
  $$('input').forEach(function (i) { i.addEventListener('input', function () { i.classList.remove('is-bad'); err.classList.remove('is-vis'); }); });
  function tracking() { var o = {}; try { var q = new URLSearchParams(location.search); ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'].forEach(function (k) { if (q.get(k)) o[k] = q.get(k); }); o.landing_page = location.href.split('?')[0]; } catch (e) {} return o; }
  function lookupZip(zip, cb) { var d = false; function fin(v) { if (!d) { d = true; cb(v || {}); } } try { var t = setTimeout(function () { fin({}); }, 2500); fetch('https://api.zippopotam.us/us/' + zip).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { clearTimeout(t); var p = j && j.places && j.places[0]; fin(p ? { city: p['place name'], state: p['state'], state_abbr: p['state abbreviation'] } : {}); }).catch(function () { clearTimeout(t); fin({}); }); } catch (e) { fin({}); } }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = { name: form.name, phone: form.phone, email: form.email, zip: form.zip }, v = { name: f.name.value.trim(), phone: f.phone.value.replace(/\D/g, ''), email: f.email.value.trim(), zip: f.zip.value.trim() }, bad = null;
    function mark(el, m) { el.classList.add('is-bad'); bad = bad || m; }
    if (v.name.length < 2) mark(f.name, 'Please enter your name.');
    if (v.phone.length < 10) mark(f.phone, 'Please enter a valid phone number.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) mark(f.email, 'Please enter a valid email.');
    if (!/^\d{5}$/.test(v.zip)) mark(f.zip, 'Please enter your 5-digit ZIP.');
    if (bad) return showErr(bad);
    btn.disabled = true; btn.firstChild.textContent = 'Sending… ';
    lookupZip(v.zip, function (geo) {
      var payload = Object.assign({}, v, geo, tracking(), { source: 'Southern Garage Popup — Building Experts' });
      function done() { $('.pop__main').hidden = true; $('.pop__done').hidden = false; try { if (window.fbq) fbq('track', 'Lead'); } catch (e) {} }
      if (!CFG.webhook) return done();
      fetch(CFG.webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(done).catch(done);
    });
  });
})();
