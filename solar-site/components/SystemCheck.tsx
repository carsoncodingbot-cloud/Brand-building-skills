"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Phone, Check, Shield, X, FileText } from "@/components/Icons";
import {
  QUIZ_QUESTIONS, QUIZ_LABELS, quizSegment, quizLeadPayload, type BillUpload,
} from "@/lib/quiz";

/**
 * The 60-Second Solar Reality Check as a self-contained white card.
 * Question 1 is visible the moment the card renders — there is no intro
 * step and nothing to click before answering. Used at the top of the
 * homepage hero and on /quote.
 *
 * The three-act funnel, tuned for lead capture:
 *  1. QUESTIONS — one per screen, tap-cards, zero typing, progress bar.
 *     Six NEPQ-ordered micro-commitments: bill → utility → shade → goal
 *     → timing → ownership.
 *  2. FORM PAGE — personalized honest read + their answers echoed as
 *     chips + name / email / phone / street address / ZIP, plus an
 *     OPTIONAL utility-bill upload (photo or PDF). Images are downscaled
 *     client-side and shipped inline in the webhook payload when small
 *     enough; otherwise we flag the upload for manual follow-up. ONE
 *     exit: the orange submit CTA. Until site.ghlWebhook is set,
 *     submissions only land in the visitor's localStorage ("dls-leads").
 *  3. CONFIRMATION PAGE — "received" state that echoes EVERYTHING back,
 *     what-happens-next timeline, and only now the call option.
 */

const cap = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
const fmtPhone = (digits: string) =>
  digits.length >= 10 ? `(${digits.slice(-10, -7)}) ${digits.slice(-7, -4)}-${digits.slice(-4)}` : digits;

/** Downscale an image file to a webhook-friendly JPEG base64 (no prefix). */
async function compressImage(file: File): Promise<string | null> {
  try {
    const url = URL.createObjectURL(file);
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = url;
    });
    const MAX = 1400;
    const scale = Math.min(1, MAX / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.72);
    return dataUrl.split(",")[1] ?? null;
  } catch {
    return null;
  }
}

const readAsBase64 = (file: File) =>
  new Promise<string | null>((res) => {
    const r = new FileReader();
    r.onload = () => res(typeof r.result === "string" ? r.result.split(",")[1] ?? null : null);
    r.onerror = () => res(null);
    r.readAsDataURL(file);
  });

export default function SystemCheck() {
  // qi = 0..5 question index, 6 = form page
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [bill, setBill] = useState<BillUpload | null>(null);
  const [billBusy, setBillBusy] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [touched, setTouched] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const mounted = useRef(false);

  // On each page transition (question → form → confirmation), glide the
  // card back to the top of the screen so the new page lands framed and
  // level — never mid-scroll or keyboard-shifted. Skipped on first paint.
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const el = cardRef.current;
    if (!el) return;
    (document.activeElement as HTMLElement | null)?.blur?.();
    // 160px clears the fixed header.
    const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 160);
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [qi, status]);

  // No resume-from-storage: every page view starts clean at question 1.
  const pick = (qid: string, key: string) => {
    setAnswers((a) => ({ ...a, [qid]: key }));
    setQi((s) => s + 1);
  };

  const segment = useMemo(() => quizSegment(answers), [answers]);
  const done = qi >= QUIZ_QUESTIONS.length;
  const q = QUIZ_QUESTIONS[Math.min(qi, QUIZ_QUESTIONS.length - 1)];
  const firstName = name.trim().split(" ")[0] || "";

  const phoneDigits = phone.replace(/\D/g, "");
  const nameOk = name.trim().length >= 2;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const phoneOk = phoneDigits.length >= 10;
  const addressOk = address.trim().length >= 5;
  const zipOk = /^\d{5}$/.test(zip.trim());
  const formOk = nameOk && emailOk && phoneOk && addressOk && zipOk;

  const onBillFile = async (f: File | undefined | null) => {
    if (!f) return;
    setBillBusy(true);
    const isImage = f.type.startsWith("image/");
    let base64: string | null = null;
    let note = "";
    if (isImage) {
      base64 = await compressImage(f);
      note = base64
        ? "photo attached — compressed in-browser"
        : "photo selected but could not be processed — request it by text";
    } else if (f.type === "application/pdf" && f.size <= 800_000) {
      base64 = await readAsBase64(f);
      note = base64 ? "PDF attached" : "PDF selected but unreadable — request it by text";
    } else {
      note = `file "${f.name}" too large to send inline — request it by text`;
    }
    // ~1MB of base64 is the safe ceiling for a single webhook POST.
    if (base64 && base64.length > 1_400_000) {
      base64 = null;
      note = `file "${f.name}" too large to send inline — request it by text`;
    }
    setBill({ filename: f.name, mime: f.type || "unknown", base64: base64 ?? undefined, note });
    setBillBusy(false);
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!formOk || status !== "idle") return;
    setStatus("sending");
    const contact = {
      name: name.trim(), email: email.trim(), phone: phoneDigits,
      address: address.trim(), zip: zip.trim(),
    };
    const payload = quizLeadPayload(answers, contact, window.location.pathname, bill);
    if (site.ghlWebhook) {
      const body = JSON.stringify(payload);
      try {
        await fetch(site.ghlWebhook, { method: "POST", headers: { "Content-Type": "application/json" }, body });
      } catch {
        // CORS/network hiccup — resend opaque so the webhook still receives it
        try { await fetch(site.ghlWebhook, { method: "POST", mode: "no-cors", body }); } catch {}
      }
    }
    // Straight to the confirmation page. Keep a local copy as a safety net
    // (without the heavy base64 so we never blow the localStorage quota).
    try {
      const k = "dls-leads";
      const { utility_bill_base64: _omit, ...light } = payload as Record<string, unknown>;
      const prior = JSON.parse(localStorage.getItem(k) || "[]");
      localStorage.setItem(k, JSON.stringify([...prior, light].slice(-10)));
    } catch {}
    setStatus("sent");
  };

  const reset = () => {
    setQi(0); setAnswers({}); setStatus("idle"); setTouched(false);
    setName(""); setEmail(""); setPhone(""); setAddress(""); setZip(""); setBill(null);
  };

  // 16px input font is load-bearing: anything smaller makes iOS Safari
  // auto-zoom on focus, and the zoom sticks through to the confirmation page.
  const inputCls = (ok: boolean) =>
    `w-full rounded-xl border bg-ice-50 px-4 py-3.5 text-base font-semibold text-navy-800 placeholder:font-normal placeholder:text-slate-400 outline-none transition focus:border-turquoise focus:bg-white ${
      touched && !ok ? "border-red-brand/60" : "border-ice-100"
    }`;
  const labelCls = "mb-1.5 block text-[0.65rem] font-extrabold uppercase tracking-wider text-slate-500";

  const answerChips = [
    QUIZ_LABELS.bill[answers.bill],
    QUIZ_LABELS.utility[answers.utility],
    QUIZ_LABELS.shade[answers.shade],
    QUIZ_LABELS.goal[answers.goal],
    QUIZ_LABELS.timing[answers.timing],
  ]
    .filter(Boolean)
    .map(cap);

  return (
    <div ref={cardRef} className="w-full overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-24px_rgba(5,14,29,0.6)] ring-1 ring-white/40">
      {/* header strip */}
      <div className="flex items-center justify-between gap-3 bg-navy-800 px-5 py-3 sm:px-6">
        <p className="flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-white sm:text-xs">
          <img src="/brand/mark.webp" alt="" width={40} height={40} className="h-5 w-auto shrink-0" />
          Free 60-Second Solar Reality Check
        </p>
        <p className="shrink-0 text-[0.65rem] font-bold uppercase tracking-wider text-turquoise sm:text-xs">
          {done ? (status === "sent" ? "Received ✓" : "Last step") : `${qi + 1} of ${QUIZ_QUESTIONS.length}`}
        </p>
      </div>
      {/* segmented progress */}
      <div className="flex gap-1 bg-navy-800 px-5 pb-3 sm:px-6" aria-hidden>
        {QUIZ_QUESTIONS.map((_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${done || i <= qi ? "bg-turquoise" : "bg-white/20"}`} />
        ))}
      </div>

      <div className="p-5 sm:p-6">
        {/* ------------------------------------------------ QUESTIONS */}
        {!done && (
          <div key={qi} className="quiz-enter">
            <h3 className="font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-navy-800 sm:text-xl">{q.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{q.caption}</p>
            <div className="mt-4 grid gap-2.5">
              {q.opts.map((o) => (
                <button
                  key={o.key}
                  onClick={() => pick(q.id, o.key)}
                  className="group w-full rounded-xl border border-ice-100 bg-ice-50 px-4 py-3 text-left transition hover:border-turquoise hover:bg-white active:scale-[0.99]"
                >
                  <span className="block font-[family-name:var(--font-montserrat)] text-[0.95rem] font-extrabold text-navy-800 group-hover:text-ice-600">
                    {o.label}
                  </span>
                  {o.sub && <span className="mt-0.5 block text-xs text-slate-500">{o.sub}</span>}
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              {qi > 0 ? (
                <button onClick={() => setQi(qi - 1)} className="text-xs font-semibold text-slate-400 hover:text-navy-800">← Back</button>
              ) : <span />}
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">
                No spam · Every number in writing
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------ FORM PAGE */}
        {done && status !== "sent" && (
          <div className="quiz-enter">
            <p className="text-xs font-bold uppercase tracking-wider text-ice-600">Here&apos;s our honest read</p>
            <h3 className="mt-1.5 font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-navy-800 sm:text-xl">
              {segment === "rent" && "Renting? Solar's your landlord's call — here's your play."}
              {segment === "shade" && "Heavy shade changes the math. Let's find out how much."}
              {segment === "small" && "Straight talk: solar might not pencil for you. Let's check."}
              {segment === "priority" && "You're in the priority lane. Let's run your real numbers."}
              {segment === "battery" && "Backup power changes the design — in a good way."}
              {segment === "planner" && "Smart. Get the math now, decide on your schedule."}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {segment === "rent" &&
                "Panels need the owner's signature, so we'll show you what the numbers look like for your building — something worth forwarding to your landlord. No pressure, no games."}
              {segment === "shade" &&
                "Most companies will sell panels to a shaded roof and let you find out later. We won't. We'll pull satellite imagery of your actual roof, model the shade hour by hour, and tell you in writing whether solar earns its keep — or whether trimming, a different roof plane, or waiting is the smarter call."}
              {segment === "small" &&
                "With a bill under $150, solar is sometimes a great move and sometimes not worth it — it depends on your utility, your rate plan, and where the bill is heading. We'll run the real math and tell you straight, even if the answer is 'keep your money.'"}
              {segment === "priority" &&
                "A bill that size means the 4–9pm peak window is working you over daily. We'll pull your real usage, design to it, and put the full price and payment in writing — before anyone visits your house."}
              {segment === "battery" &&
                "Outage protection means we design storage-first: which circuits stay on, for how long, and what it costs — all in writing. No 'everything stays on' hand-waving; an exact backup plan for your home."}
              {segment === "planner" &&
                "No countdown timers here. You'll get the real numbers for your address — system size, price, payment, payback — in writing, and they'll still be honest whenever you're ready."}
            </p>

            {/* their answers, already working for them */}
            {answerChips.length > 0 && (
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {answerChips.map((v) => (
                  <span key={v} className="inline-flex items-center gap-1.5 rounded-full border border-ice-100 bg-ice-50 px-2.5 py-1 text-[0.68rem] font-bold text-ice-700">
                    <Check className="h-3 w-3 text-turquoise" /> {v}
                  </span>
                ))}
              </div>
            )}

            <form onSubmit={submitLead} className="mt-5 rounded-2xl border border-ice-100 bg-ice-50/60 p-4" noValidate>
              <p className="font-[family-name:var(--font-montserrat)] text-sm font-extrabold text-navy-800">
                {segment === "rent" ? "Where can we send the landlord-ready numbers?" : "Where should we send your real numbers?"}
              </p>
              <div className="mt-3.5 grid gap-3">
                <div>
                  <label htmlFor="dls-name" className={labelCls}>Full name</label>
                  <input
                    id="dls-name" type="text" name="name" autoComplete="name" placeholder="First & last name"
                    value={name} onChange={(e) => setName(e.target.value)} className={inputCls(nameOk)}
                  />
                </div>
                <div>
                  <label htmlFor="dls-email" className={labelCls}>Email</label>
                  <input
                    id="dls-email" type="email" name="email" autoComplete="email" inputMode="email" placeholder="you@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls(emailOk)}
                  />
                </div>
                <div>
                  <label htmlFor="dls-address" className={labelCls}>Street address — the roof we&apos;re running numbers on</label>
                  <input
                    id="dls-address" type="text" name="street-address" autoComplete="street-address" placeholder="123 Magnolia Ave"
                    value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls(addressOk)}
                  />
                </div>
                <div className="grid grid-cols-[1.6fr_1fr] gap-3">
                  <div>
                    <label htmlFor="dls-phone" className={labelCls}>Mobile number</label>
                    <input
                      id="dls-phone" type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="(951) 555-0123"
                      value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls(phoneOk)}
                    />
                  </div>
                  <div>
                    <label htmlFor="dls-zip" className={labelCls}>ZIP code</label>
                    <input
                      id="dls-zip" type="text" name="zip" autoComplete="postal-code" inputMode="numeric" maxLength={5} placeholder="92503"
                      value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))} className={inputCls(zipOk)}
                    />
                  </div>
                </div>

                {/* optional utility-bill upload — the accuracy accelerator */}
                <div>
                  <span className={labelCls}>Utility bill <span className="normal-case text-slate-400">(optional — makes your numbers exact, not estimated)</span></span>
                  <input
                    ref={fileRef} type="file" accept="image/*,.pdf" className="hidden"
                    onChange={(e) => { void onBillFile(e.target.files?.[0]); e.target.value = ""; }}
                  />
                  {!bill ? (
                    <button
                      type="button" onClick={() => fileRef.current?.click()} disabled={billBusy}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ice-300 bg-white px-4 py-3.5 text-sm font-bold text-ice-700 transition hover:border-turquoise hover:text-navy-800 disabled:opacity-60"
                    >
                      <FileText className="h-4 w-4" />
                      {billBusy ? "Processing…" : "Snap or upload a recent bill"}
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-turquoise/50 bg-white px-4 py-3">
                      <span className="flex min-w-0 items-center gap-2 text-sm font-bold text-navy-800">
                        <Check className="h-4 w-4 shrink-0 text-turquoise" />
                        <span className="truncate">{bill.filename}</span>
                      </span>
                      <button type="button" onClick={() => setBill(null)} aria-label="Remove file"
                        className="shrink-0 text-slate-400 hover:text-red-brand">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <p className="mt-1.5 text-[0.68rem] leading-snug text-slate-400">
                    A photo of page 1 is perfect. With your real usage on file, your quote is built on your
                    actual kilowatt-hours — not a guess.
                  </p>
                </div>
              </div>
              {touched && !formOk && (
                <p className="mt-2 text-xs font-semibold text-red-brand">
                  {!nameOk ? "Add your name" : !emailOk ? "That email doesn't look right" : !addressOk ? "Add the street address" : !phoneOk ? "That phone number looks short" : "ZIP should be 5 digits"} — takes two seconds.
                </p>
              )}
              <button type="submit" disabled={status === "sending" || billBusy} className="btn btn-primary mt-4 w-full !py-4 text-sm disabled:opacity-70 sm:text-base">
                {status === "sending" ? "Sending…"
                  : segment === "rent" ? "Send me the numbers →"
                  : segment === "shade" ? "Check my roof honestly →"
                  : segment === "small" ? "Run my honest math →"
                  : segment === "priority" ? "Get my priority numbers →"
                  : segment === "battery" ? "Design my backup plan →"
                  : "Get my written numbers →"}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
                <Shield className="h-3.5 w-3.5 shrink-0 text-turquoise" />
                Instant confirmation · A consultant follows up fast · No spam, ever
              </p>
            </form>

            <div className="mt-4 flex items-center justify-between">
              <button onClick={() => setQi(QUIZ_QUESTIONS.length - 1)} className="text-xs font-semibold text-slate-400 hover:text-navy-800">← Back</button>
              <button onClick={reset} className="text-xs font-semibold text-slate-400 hover:text-navy-800">↺ Start over</button>
            </div>
          </div>
        )}

        {/* ------------------------------------------ CONFIRMATION PAGE */}
        {done && status === "sent" && (
          <div className="quiz-enter">
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-turquoise/15 ring-8 ring-turquoise/5">
                <Check className="h-8 w-8 text-turquoise" />
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-navy-800 sm:text-2xl">
                {firstName ? `Got it, ${firstName} — you're in.` : "Got it — you're in."}
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                Your request is in our system. A {site.shortName} consultant will message you shortly at{" "}
                <b className="text-navy-800">{fmtPhone(phoneDigits)}</b>.
              </p>
            </div>

            {/* everything we captured, echoed back like a logged ticket */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-ice-100">
              <div className="flex items-center justify-between gap-3 border-b border-ice-100 bg-ice-50 px-4 py-2.5">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-wider text-slate-500">Your request — on file</p>
                <span className="inline-flex items-center gap-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-turquoise">
                  <Check className="h-3.5 w-3.5" /> Received
                </span>
              </div>
              <dl className="divide-y divide-ice-100 text-sm">
                {[
                  ["Monthly bill", cap(QUIZ_LABELS.bill[answers.bill])],
                  ["Utility", cap(QUIZ_LABELS.utility[answers.utility])],
                  ["Roof shade", cap(QUIZ_LABELS.shade[answers.shade])],
                  ["Goal", cap(QUIZ_LABELS.goal[answers.goal])],
                  ["Timeline", cap(QUIZ_LABELS.timing[answers.timing])],
                  ["Property", cap(QUIZ_LABELS.own[answers.own])],
                  ["Address", address ? `${address.trim()}, ${zip}` : zip ? `${zip} · Inland Empire, CA` : ""],
                  ["Utility bill", bill ? (bill.base64 ? "Attached ✓ — quote uses your real usage" : "Noted — we'll request it by text") : ""],
                  ["Contact", `${name.trim()} · ${fmtPhone(phoneDigits)}`],
                  ["Email", email.trim()],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
                    <dt className="shrink-0 text-[0.65rem] font-extrabold uppercase tracking-wider text-slate-400">{k}</dt>
                    <dd className="text-right font-semibold text-navy-800">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-4 rounded-2xl border border-ice-100 bg-ice-50 p-4">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-wider text-slate-500">What happens next</p>
              <ol className="mt-3 space-y-2.5">
                {[
                  "Your request is with our team right now",
                  bill?.base64
                    ? "We build your usage profile straight from your bill"
                    : "A consultant texts you to confirm your address & usage",
                  "You get your full numbers in writing — price, payment, payback — before any home visit",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-800 text-[0.65rem] font-extrabold text-white">{i + 1}</span>
                    <span className="text-sm leading-snug text-slate-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-5 text-center text-xs font-bold uppercase tracking-wider text-slate-400">Can&apos;t wait? Talk to us now</p>
            <a href={site.phoneHref} className="btn btn-primary mt-1.5 w-full !py-4 text-sm sm:text-base">
              <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
            </a>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 border-t border-ice-100 pt-4 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-turquoise" /> Licensed &amp; insured</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-turquoise" /> Every number in writing</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-turquoise" /> Inland Empire local</span>
            </div>
            <button onClick={reset} className="mx-auto mt-4 block text-xs font-semibold text-slate-400 hover:text-navy-800">
              ↺ Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
