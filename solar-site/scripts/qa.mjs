// Daylight Solar QA harness
// 1. Every route in the sitemap loads (status 200, no Next error page)
// 2. Funnel v2 (6 questions) exercised end-to-end:
//    - full 144-path matrix over bill × goal × timing × own (utility=sce, shade=full)
//    - 16-path sweep over utility × shade (fixed strong-lead answers)
//    - a real utility-bill upload path (file attach → echo "Attached")
//    Each path: questions → form (correct segment) → submit → confirmation
//    echoes answers + contact, localStorage payload sane.
// 3. Desktop + mobile screenshots of the money pages.
import { chromium } from "playwright";
import http from "http";
import { createReadStream, existsSync, statSync, writeFileSync } from "fs";
import { join, extname } from "path";

const ROOT = "/home/user/Brand-building-skills/solar-site/out";
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".svg": "image/svg+xml", ".txt": "text/plain", ".xml": "text/xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".json": "application/json", ".webp": "image/webp" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let f = join(ROOT, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  if (!existsSync(f)) f = f + ".html";
  if (!existsSync(f)) { res.writeHead(404); res.end("nf"); return; }
  res.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" });
  createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(4173, r));
const BASE = "http://localhost:4173";

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let failures = [];

// ---------- 1. route sweep ----------
const page = await browser.newPage();
const routes = ["/", "/about/", "/contact/", "/quote/", "/reviews/", "/financing/", "/our-promise/", "/service-areas/", "/blog/", "/privacy/",
  ...["residential-solar","battery-storage","solar-plus-roof","ev-charger-installation","main-panel-upgrade","solar-repair-service"].map(s=>`/services/${s}/`),
  ...["riverside","moreno-valley","corona","fontana","menifee","temecula","murrieta","eastvale","perris","hemet","lake-elsinore","jurupa-valley","rialto","san-bernardino","redlands","rancho-cucamonga","ontario","beaumont","norco","wildomar","canyon-lake","colton","highland","yucaipa","banning","grand-terrace","loma-linda","san-jacinto"].map(s=>`/service-areas/${s}/`),
  ...["nem-3-explained-inland-empire","solar-panel-cost-inland-empire-2026","solar-scams-inland-empire-red-flags","do-you-need-a-battery-sce","sce-rate-increases-inland-empire","riverside-rpu-solar-advantage"].map(s=>`/blog/${s}/`)];
for (const r of routes) {
  const resp = await page.goto(BASE + r, { waitUntil: "domcontentloaded" });
  const ok = resp.status() === 200;
  const title = await page.title();
  const hasErr = (await page.content()).includes("Application error");
  if (!ok || hasErr || !title) failures.push(`ROUTE ${r}: status=${resp.status()} err=${hasErr} title=${title}`);
}
console.log(`routes: ${routes.length} checked, ${failures.length} failures`);

// ---------- 2. funnel matrix ----------
const expectedSegment = (a) => {
  if (a.own === "rent") return "rent";
  if (a.shade === "heavy") return "shade";
  if (a.bill === "under150") return "small";
  if (a.timing === "asap") return "priority";
  if (a.goal === "backup" || a.goal === "both") return "battery";
  return "planner";
};
const SEG_HEAD = {
  rent: "Renting? Solar's your landlord's call",
  shade: "Heavy shade changes the math",
  small: "solar might not pencil",
  priority: "priority lane",
  battery: "Backup power changes the design",
  planner: "Get the math now",
};
// question option index by key — order: bill, utility, shade, goal, timing, own
const OPT = {
  bill: { under150: 0, "150to300": 1, "300to500": 2, over500: 3 },
  utility: { sce: 0, rpu: 1, muni: 2, notsure: 3 },
  shade: { full: 0, some: 1, heavy: 2, notsure: 3 },
  goal: { bill: 0, backup: 1, both: 2, curious: 3 },
  timing: { asap: 0, months: 1, research: 2 },
  own: { own: 0, rent: 1, manage: 2 },
};
const CHIP = {
  bill: { under150: "under $150/mo", "150to300": "$150-300/mo", "300to500": "$300-500/mo", over500: "$500+/mo" },
  utility: { sce: "SCE", rpu: "Riverside RPU", muni: "MoVal/Colton/Banning utility", notsure: "utility unsure" },
  shade: { full: "full sun", some: "some shade", heavy: "heavy shade", notsure: "shade unchecked" },
  goal: { bill: "kill the bill", backup: "outage backup", both: "bill + backup", curious: "just exploring" },
  timing: { asap: "ASAP", months: "next few months", research: "researching" },
  own: { own: "homeowner", rent: "renter", manage: "property manager" },
};

const fpage = await browser.newPage();
const runPath = async (a, opts = {}) => {
  await fpage.goto(BASE + "/quote/", { waitUntil: "domcontentloaded" });
  const card = fpage.locator("section .max-w-xl").first();
  const clickOpt = async (idx) => {
    const btns = card.locator("div.quiz-enter .grid > button");
    await btns.nth(idx).click();
  };
  await clickOpt(OPT.bill[a.bill]);
  await clickOpt(OPT.utility[a.utility]);
  await clickOpt(OPT.shade[a.shade]);
  await clickOpt(OPT.goal[a.goal]);
  await clickOpt(OPT.timing[a.timing]);
  await clickOpt(OPT.own[a.own]);
  // form page: verify segment headline
  const h = await card.locator("h3").first().textContent();
  const seg = expectedSegment(a);
  if (!h.toLowerCase().includes(SEG_HEAD[seg].toLowerCase())) {
    failures.push(`FUNNEL ${JSON.stringify(a)}: seg=${seg} but headline="${h}"`);
    return;
  }
  await fpage.fill("#dls-name", "Test Homeowner");
  await fpage.fill("#dls-email", "test@example.com");
  await fpage.fill("#dls-address", "4100 Main St");
  await fpage.fill("#dls-phone", "(951) 555-0100");
  await fpage.fill("#dls-zip", "92503");
  if (opts.uploadFile) {
    await fpage.setInputFiles('input[type="file"]', opts.uploadFile);
    await fpage.waitForSelector("text=" + opts.uploadName, { timeout: 4000 });
  }
  await card.locator('button[type="submit"]').click();
  await fpage.waitForSelector("text=you're in", { timeout: 4000 });
  const conf = await card.textContent();
  for (const q of ["bill", "utility", "shade", "goal", "timing", "own"]) {
    const want = CHIP[q][a[q]];
    if (!conf.toLowerCase().includes(want.toLowerCase())) {
      failures.push(`ECHO ${JSON.stringify(a)}: missing "${want}"`);
    }
  }
  if (!conf.includes("4100 Main St")) failures.push(`ECHO ${JSON.stringify(a)}: missing street address`);
  if (opts.uploadFile && !conf.includes("Attached")) failures.push(`ECHO ${JSON.stringify(a)}: bill upload not echoed`);
  const stored = await fpage.evaluate(() => JSON.parse(localStorage.getItem("dls-leads") || "[]"));
  const last = stored[stored.length - 1];
  if (!last || last.segment !== seg || last.zip !== "92503" || last.street_address !== "4100 Main St") {
    failures.push(`PAYLOAD ${JSON.stringify(a)}: ${JSON.stringify(last)}`);
  }
  if (opts.uploadFile) {
    if (last.utility_bill_attached !== "yes") failures.push(`PAYLOAD upload flag: ${JSON.stringify(last)}`);
    if ("utility_bill_base64" in last) failures.push(`PAYLOAD: base64 leaked into localStorage`);
  }
  await fpage.evaluate(() => localStorage.clear());
  return true;
};

let tested = 0, total = 0;
// full matrix over the original four dimensions
for (const bill of Object.keys(OPT.bill)) for (const goal of Object.keys(OPT.goal))
for (const timing of Object.keys(OPT.timing)) for (const own of Object.keys(OPT.own)) {
  total++;
  try { if (await runPath({ bill, utility: "sce", shade: "full", goal, timing, own })) tested++; }
  catch (e) { failures.push(`FUNNEL ${bill}/${goal}/${timing}/${own}: ${e.message.split("\n")[0]}`); }
}
// utility × shade sweep on a strong lead
for (const utility of Object.keys(OPT.utility)) for (const shade of Object.keys(OPT.shade)) {
  total++;
  try { if (await runPath({ bill: "300to500", utility, shade, goal: "both", timing: "months", own: "own" })) tested++; }
  catch (e) { failures.push(`FUNNEL utility=${utility} shade=${shade}: ${e.message.split("\n")[0]}`); }
}
// bill-upload path
const tmpBill = "/tmp/claude-0/-home-user-Brand-building-skills/0f9620df-4d2c-581d-82ac-c0f49a3f1175/scratchpad/fake-bill.png";
writeFileSync(tmpBill, Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAFElEQVR4nGP8//8/AzbAxIALjEwJAKCoAxL4ZtcSAAAAAElFTkSuQmCC", "base64"));
total++;
try { if (await runPath({ bill: "over500", utility: "sce", shade: "full", goal: "bill", timing: "asap", own: "own" }, { uploadFile: tmpBill, uploadName: "fake-bill.png" })) tested++; }
catch (e) { failures.push(`FUNNEL upload path: ${e.message.split("\n")[0]}`); }

console.log(`funnel paths: ${tested}/${total} passed end-to-end`);

// ---------- 3. screenshots ----------
const SHOTS = "/tmp/claude-0/-home-user-Brand-building-skills/0f9620df-4d2c-581d-82ac-c0f49a3f1175/scratchpad/shots";
for (const [name, vp] of [["desktop", { width: 1440, height: 960 }], ["mobile", { width: 390, height: 844 }]]) {
  const sp = await browser.newPage({ viewport: vp });
  for (const [label, route] of [["home", "/"], ["quote", "/quote/"], ["promise", "/our-promise/"], ["city-riverside", "/service-areas/riverside/"], ["service-battery", "/services/battery-storage/"], ["financing", "/financing/"]]) {
    await sp.goto(BASE + route, { waitUntil: "networkidle" });
    await sp.screenshot({ path: `${SHOTS}/${name}-${label}.png`, fullPage: label === "home" });
  }
  await sp.close();
}
console.log("screenshots done");

if (failures.length) { console.log("FAILURES:"); failures.slice(0, 30).forEach((f) => console.log(" -", f)); }
else console.log("ALL GREEN");
await browser.close(); server.close();
process.exit(failures.length ? 1 : 0);
