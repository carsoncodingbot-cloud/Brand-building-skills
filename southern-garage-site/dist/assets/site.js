/* Southern Garage Co. — site behavior (no dependencies). */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var CFG = window.SG_CONFIG || {};

  /* ---- Mega menus: hover on pointer devices, click/tap elsewhere, Esc closes ---- */
  var megas = $$('.nav__item.has-mega');
  function closeAll(except) { megas.forEach(function (li) { if (li !== except) { li.classList.remove('open'); var b = $('button', li); if (b) b.setAttribute('aria-expanded', 'false'); } }); }
  var hoverOK = window.matchMedia('(hover:hover)').matches;
  megas.forEach(function (li) {
    var b = $('button', li), t;
    function open() { clearTimeout(t); closeAll(li); li.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
    function close() { t = setTimeout(function () { li.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }, 120); }
    if (hoverOK) { li.addEventListener('mouseenter', open); li.addEventListener('mouseleave', close); }
    b.addEventListener('click', function () { li.classList.contains('open') ? (li.classList.remove('open'), b.setAttribute('aria-expanded', 'false')) : open(); });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.nav')) closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(); closeDrawer(); } });

  /* ---- Mobile drawer ---- */
  var drawer = $('#drawer'), burger = $('#burger');
  function closeDrawer() { if (!drawer) return; drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); burger && burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  if (burger) burger.addEventListener('click', function () { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); burger.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; });
  var cd = $('#closeDrawer'); if (cd) cd.addEventListener('click', closeDrawer);
  if (drawer) drawer.addEventListener('click', function (e) { if (e.target.closest('a')) closeDrawer(); });

  /* ---- Size picker: plans are pre-rendered; JS only swaps which is visible + the readout ---- */
  var picker = $('#picker');
  if (picker) {
    var data = JSON.parse(picker.getAttribute('data-sizes')), cur = null;
    var set = function (slug) {
      cur = slug; var d = data[slug];
      $$('.chip', picker).forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-size') === slug); });
      $$('.plan-wrap', picker).forEach(function (p) { p.hidden = p.getAttribute('data-plan') !== slug; });
      $('[data-r=size]', picker).innerHTML = d.size; $('[data-r=sqft]', picker).textContent = d.sqft; $('[data-r=veh]', picker).textContent = d.veh; $('[data-r=doors]', picker).textContent = d.doors;
    };
    $$('.chip', picker).forEach(function (c) { c.addEventListener('click', function () { set(c.getAttribute('data-size')); }); if (c.getAttribute('aria-pressed') === 'true') cur = c.getAttribute('data-size'); });
    var cta = $('[data-r=cta]', picker);
    cta.addEventListener('click', function () { if (window.SGQ && cur) window.SGQ.preset({ size: data[cur].preset }); });
    $$('[data-pick]').forEach(function (a) { a.addEventListener('click', function () { set(a.getAttribute('data-pick')); }); });
  }

  /* ---- ZIP coverage check ---- */
  $$('form[data-zip]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('input', f), z = input.value.trim(), root = f.closest('[data-zip-main]') || f.parentNode, res = $('.zip__res, .zipmini__res', root) || $('.zipmini__res', f.parentNode);
      $$('.st').forEach(function (s) { s.classList.remove('hit'); });
      if (!/^\d{5}$/.test(z)) { res.textContent = 'Enter a 5-digit ZIP.'; return; }
      res.textContent = 'Checking…';
      fetch('https://api.zippopotam.us/us/' + z).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
        var p = d && d.places && d.places[0]; if (!p) { res.textContent = 'We couldn’t find that ZIP.'; return; }
        var ab = p['state abbreviation'], city = p['place name'], S = CFG.states || {};
        if (S[ab]) { res.innerHTML = '<b class="yes">Yes</b> — we install in <b>' + city + ', ' + ab + '</b>. <a href="#sg-quote">Get your price →</a>'; var h = $('.st[data-state="' + ab + '"]'); if (h) h.classList.add('hit'); if (window.SGQ) window.SGQ.preset({ zip: z }); }
        else res.innerHTML = 'We don’t list <b>' + p['state'] + '</b> yet. Call <a href="' + (CFG.phoneHref || '#') + '">' + (CFG.phone || '') + '</a> and we’ll tell you straight.';
      }).catch(function () { res.textContent = 'Couldn’t check right now — please call us.'; });
    });
  });

  /* ---- Page preset for the quiz (type / size pages) ---- */
  if (CFG.preset && window.SGQ) window.SGQ.preset(CFG.preset);

  /* ---- Reveal on scroll (once) ---- */
  var rv = $$('.rv'), calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (calm || !('IntersectionObserver' in window)) rv.forEach(function (e) { e.classList.add('in'); });
  else { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .08, rootMargin: '0px 0px -4% 0px' }); rv.forEach(function (e) { io.observe(e); }); }
})();
