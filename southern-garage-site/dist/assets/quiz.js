
(function(){
/* ══════════════ CONFIG ══════════════ */
var CFG = window.SG_CONFIG || {};
var SG_WEBHOOK_URL = CFG.webhook || '';   /* set at deploy; blank = nothing is sent */
var SG_PHONE = CFG.phone || '(205) 941-6115';
var SG_PHONE_HREF = CFG.phoneHref || 'tel:+12059416115';

/* ══════════════ STATE ══════════════ */
var answers = {building_type:'', size:'', timeline:'', zip:'', name:'', phone:'', email:''};
var step = 0;
var TOTAL = 5;

var body = document.getElementById('sgq-body');
var bar  = document.getElementById('sgq-bar');

/* inline icons */
var ic = {
  garage:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V9l9-6 9 6v12"/><path d="M7 21v-8h10v8"/><path d="M7 16h10"/></svg>',
  carport:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10l10-6 10 6"/><path d="M4 9v12M20 9v12"/><path d="M8 21v-3a4 4 0 018 0v3"/></svg>',
  barn:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V10l4-5h10l4 5v11"/><path d="M9 21v-6h6v6"/><path d="M3 10h18"/></svg>',
  shop:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M8.5 8V6.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5V8"/><path d="M3 13h18"/><path d="M10 13v2.5h4V13"/></svg>',
  check:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  arrow:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
};

function optBtn(value, label, icon, wide){
  return '<button type="button" class="qopt'+(wide?' wide':'')+'" data-v="'+value+'">'+(icon||'')+'<span>'+label+'</span></button>';
}
function backBtn(){
  return step>0 ? '<button type="button" class="qback" id="sgq-back">&#8592; Back</button>' : '';
}
function stepLabel(){
  return '<div class="qstep-label">Step '+(step+1)+' of '+TOTAL+'</div>';
}

/* ══════════════ STEPS ══════════════ */
var steps = [
  function(){
    return backBtn()+stepLabel()+
    '<div class="qq">What are you looking to build?</div>'+
    '<div class="qopts" data-key="building_type">'+
      optBtn('Garage','Garage',ic.garage)+
      optBtn('Carport','Carport',ic.carport)+
      optBtn('Barn','Barn',ic.barn)+
      optBtn('Workshop / Shop','Workshop',ic.shop)+
    '</div>';
  },
  function(){
    return backBtn()+stepLabel()+
    '<div class="qq">Roughly what size? <span style="font-weight:400;font-size:.85rem;color:rgba(255,255,255,.55)">Close is fine \u2014 we\u2019ll dial it in.</span></div>'+
    '<div class="qopts" data-key="size">'+
      optBtn('Single (12\u201318\u2032 wide)','Single &middot; 12\u201318\u2032 wide')+
      optBtn('Double (20\u201324\u2032 wide)','Double &middot; 20\u201324\u2032 wide')+
      optBtn('Triple (26\u201330\u2032 wide)','Triple &middot; 26\u201330\u2032 wide')+
      optBtn('Commercial (40\u2032+)','Commercial &middot; 40\u2032+')+
      optBtn('Not sure yet','Not sure yet \u2014 help me decide',null,true)+
    '</div>';
  },
  function(){
    return backBtn()+stepLabel()+
    '<div class="qq">When do you want it installed? <span style="font-weight:400;font-size:.85rem;color:rgba(255,255,255,.55)">\u201CJust looking\u201D is a fine answer.</span></div>'+
    '<div class="qopts" data-key="timeline">'+
      optBtn('As soon as possible','As soon as possible')+
      optBtn('1\u20133 months','1\u20133 months')+
      optBtn('3\u20136 months','3\u20136 months')+
      optBtn('Just getting prices','Just getting prices')+
    '</div>';
  },
  function(){
    return backBtn()+stepLabel()+
    '<div class="qq">Where will it be installed? <span style="font-weight:400;font-size:.85rem;color:rgba(255,255,255,.55)">Pricing &amp; delivery change by area.</span></div>'+
    '<div class="qfield"><label for="sgq-zip">Installation ZIP code</label>'+
    '<input id="sgq-zip" inputmode="numeric" autocomplete="postal-code" maxlength="5" placeholder="e.g. 35210" value="'+answers.zip+'"></div>'+
    '<div class="qerr" id="sgq-err">Please enter a valid 5-digit ZIP code.</div>'+
    '<button type="button" class="qnext" id="sgq-next">Continue '+ic.arrow+'</button>';
  },
  function(){
    return backBtn()+stepLabel()+
    '<div class="qq">Where should we send your number?</div>'+
    '<div class="qfield"><label for="sgq-name">Full name</label>'+
    '<input id="sgq-name" autocomplete="name" placeholder="First and last name" value="'+answers.name+'"></div>'+
    '<div class="qfield"><label for="sgq-phone">Phone</label>'+
    '<input id="sgq-phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(555) 555-5555" value="'+answers.phone+'"></div>'+
    '<div class="qfield"><label for="sgq-email">Email</label>'+
    '<input id="sgq-email" type="email" autocomplete="email" placeholder="you@example.com" value="'+answers.email+'"></div>'+
    '<div class="qerr" id="sgq-err">Please fill in all three fields with a valid phone and email.</div>'+
    '<button type="button" class="qnext" id="sgq-next">SHOW ME MY PRICE '+ic.arrow+'</button>'+
    '<p class="qconsent">By submitting, you agree Southern Garage may contact you by phone, text, or email about your quote, including via automated technology. Consent is not a condition of purchase. Msg &amp; data rates may apply. Reply STOP to opt out.</p>';
  }
];

function render(){
  bar.style.width = ((step+1)/TOTAL*100)+'%';
  body.innerHTML = '<div class="qpane">'+steps[step]()+'</div>';
  wire();
  var firstInput = body.querySelector('input');
  if(firstInput && step>0) firstInput.focus({preventScroll:true});
}

function wire(){
  var back = document.getElementById('sgq-back');
  if(back) back.addEventListener('click', function(){ step--; render(); });

  var grid = body.querySelector('.qopts');
  if(grid){
    var key = grid.getAttribute('data-key');
    grid.querySelectorAll('.qopt').forEach(function(btn){
      btn.addEventListener('click', function(){
        answers[key] = btn.getAttribute('data-v');
        step++; render();
      });
    });
  }

  var next = document.getElementById('sgq-next');
  if(next){
    next.addEventListener('click', function(){
      if(step === 3){
        var zip = document.getElementById('sgq-zip').value.trim();
        if(!/^\d{5}$/.test(zip)){ showErr('sgq-zip'); return; }
        answers.zip = zip; step++; render();
      } else if(step === 4){
        var n = document.getElementById('sgq-name'), p = document.getElementById('sgq-phone'), e = document.getElementById('sgq-email');
        var digits = p.value.replace(/\D/g,'');
        var ok = true;
        [n,p,e].forEach(function(f){ f.classList.remove('err'); });
        if(n.value.trim().length < 2){ n.classList.add('err'); ok=false; }
        if(digits.length < 10){ p.classList.add('err'); ok=false; }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value.trim())){ e.classList.add('err'); ok=false; }
        if(!ok){ document.getElementById('sgq-err').classList.add('show'); return; }
        answers.name = n.value.trim();
        answers.phone = digits;
        answers.email = e.value.trim();
        submit(next);
      }
    });
    body.querySelectorAll('input').forEach(function(f){
      f.addEventListener('keydown', function(ev){ if(ev.key==='Enter'){ ev.preventDefault(); next.click(); }});
    });
  }
}

function showErr(id){
  var f = document.getElementById(id);
  if(f) f.classList.add('err');
  var er = document.getElementById('sgq-err');
  if(er) er.classList.add('show');
}

/* capture UTMs + click ids for attribution */
function tracking(){
  var out = {};
  try{
    var q = new URLSearchParams(window.location.search);
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','gclid'].forEach(function(k){
      if(q.get(k)) out[k] = q.get(k);
    });
    out.landing_page = window.location.href.split('?')[0];
  }catch(e){}
  return out;
}

/* ZIP -> city/state enrichment: resolves {city,state,state_abbr} from the
   ZIP via a free, no-key lookup. Non-blocking — 2.5s cap, and on any miss
   the lead still fires with city left blank. */
function lookupZip(zip, cb){
  var done = false;
  function finish(v){ if(!done){ done = true; cb(v || {}); } }
  try{
    if(!/^\d{5}$/.test(zip || '')){ finish({}); return; }
    var ctrl = ('AbortController' in window) ? new AbortController() : null;
    var timer = setTimeout(function(){ if(ctrl) ctrl.abort(); finish({}); }, 2500);
    fetch('https://api.zippopotam.us/us/' + zip, ctrl ? {signal: ctrl.signal} : {})
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(d){
        clearTimeout(timer);
        var p = d && d.places && d.places[0];
        finish(p ? {
          city: p['place name'] || '',
          state: p['state'] || '',
          state_abbr: p['state abbreviation'] || ''
        } : {});
      })
      .catch(function(){ clearTimeout(timer); finish({}); });
  }catch(e){ finish({}); }
}

function submit(btn){
  btn.disabled = true;
  btn.innerHTML = 'Sending\u2026';

  lookupZip(answers.zip, function(geo){
    var payload = Object.assign({}, answers, geo, tracking(), {source:'Southern Garage Hero Quote Form'});

    function done(){
      bar.style.width = '100%';
      body.innerHTML =
        '<div class="qpane qdone">'+
          '<div class="ok">'+ic.check+'</div>'+
          '<h3>You\u2019re all set, '+(answers.name.split(' ')[0]||'')+'!</h3>'+
          '<p>We\u2019re pulling your numbers now. A building specialist will reach out shortly with your custom price \u2014 locked in writing for 6 months.</p>'+
          '<a href="'+SG_PHONE_HREF+'">Need it faster? Call '+SG_PHONE+'</a>'+
        '</div>';
      try{ if(window.fbq) fbq('track','Lead'); }catch(e){}
    }

    if(SG_WEBHOOK_URL.indexOf('http') !== 0){ done(); return; }

    fetch(SG_WEBHOOK_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    }).then(done).catch(done);
  });
}

/* sticky bar: smooth-scroll to form, hide once form is on screen */
var sticky = document.getElementById('sgq-sticky');
document.getElementById('sgq-stickybtn').addEventListener('click', function(ev){
  ev.preventDefault();
  document.getElementById('sg-quote').scrollIntoView({behavior:'smooth', block:'start'});
});
if('IntersectionObserver' in window){
  new IntersectionObserver(function(entries){
    sticky.style.display = entries[0].isIntersecting ? 'none' : '';
  },{threshold:.25}).observe(document.getElementById('sg-quote'));
}

/* preset hook (added): lets size/type pages and the size picker pre-answer the first questions */
window.SGQ={preset:function(o){for(var k in o)answers[k]=o[k];
  if(o.size){if(!answers.building_type)answers.building_type=(o.size.indexOf('Commercial')===0)?'Workshop / Shop':'Garage';step=2;}
  else if(o.building_type){step=1;}
  render();}};
render();
})();