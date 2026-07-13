"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Phone, Check, Shield } from "@/components/Icons";
import { QUIZ_QUESTIONS, QUIZ_LABELS, QUIZ_STORE_KEY, quizSegment, quizLeadPayload } from "@/lib/quiz";

/**
 * The 60-Second System Check as a self-contained white card.
 * Question 1 is visible the moment the card renders — there is no intro
 * step and nothing to click before answering. Used at the top of the
 * homepage hero and on /quote.
 *
 * The three-act funnel, tuned for lead capture:
 *  1. QUESTIONS — one per screen, tap-cards, zero typing, progress bar.
 *  2. FORM PAGE — personalized honest read + their answers echoed as
 *     chips + name / email / phone / ZIP. ONE exit: the red submit CTA.
 *     No call button here — the system captures first, always. Submits
 *     the fully-labeled lead to the GHL inbound webhook (site.ghlWebhook)
 *     so automations fire instantly, then goes STRAIGHT to confirmation —
 *     the visitor is never bounced into their SMS app. Until the webhook
 *     URL is set, submissions only land in the visitor's localStorage
 *     ("glc-leads") — wire the webhook before driving traffic.
 *  3. CONFIRMATION PAGE — "received" state that echoes EVERYTHING back
 *     (request on file: issue, age, timeline, property, contact, ZIP),
 *     what-happens-next timeline, and only now the red call option.
 */

const cap = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
const fmtPhone = (digits: string) =>
  digits.length >= 10 ? `(${digits.slice(-10, -7)}) ${digits.slice(-7, -4)}-${digits.slice(-4)}` : digits;

export default function SystemCheck() {
  // qi = 0..3 question index, 4 = form page
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  // On each page transition (question → form → confirmation), glide the
  // card back to the top of the screen so the new page lands framed and
  // level — never mid-scroll or keyboard-shifted. Skipped on first paint.
  // Scrolls the window directly: scrollIntoView would also scroll the
  // hero's overflow-hidden section and shear its contents.
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const el = cardRef.current;
    if (!el) return;
    (document.activeElement as HTMLElement | null)?.blur?.();
    // 160px clears the fixed header plus the yeti peeking over the card.
    const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 160);
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [qi, status]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(QUIZ_STORE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.answers && typeof saved.qi === "number" && saved.qi > 0 && saved.qi < QUIZ_QUESTIONS.length) {
          setAnswers(saved.answers);
          setQi(saved.qi);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (qi > 0 && qi < QUIZ_QUESTIONS.length) localStorage.setItem(QUIZ_STORE_KEY, JSON.stringify({ qi, answers }));
      if (qi >= QUIZ_QUESTIONS.length) localStorage.removeItem(QUIZ_STORE_KEY);
    } catch {}
  }, [qi, answers]);

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
  const zipOk = /^\d{5}$/.test(zip.trim());
  const formOk = nameOk && emailOk && phoneOk && zipOk;

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!formOk || status !== "idle") return;
    setStatus("sending");
    const contact = { name: name.trim(), email: email.trim(), phone: phoneDigits, zip: zip.trim() };
    const payload = quizLeadPayload(answers, contact, window.location.pathname);
    if (site.ghlWebhook) {
      const body = JSON.stringify(payload);
      try {
        await fetch(site.ghlWebhook, { method: "POST", headers: { "Content-Type": "application/json" }, body });
      } catch {
        // CORS/network hiccup — resend opaque so the webhook still receives it
        try { await fetch(site.ghlWebhook, { method: "POST", mode: "no-cors", body }); } catch {}
      }
    }
    // Straight to the confirmation page — never bounce the lead into
    // their SMS app. Also keep a local copy as a safety net.
    try {
      const k = "glc-leads";
      const prior = JSON.parse(localStorage.getItem(k) || "[]");
      localStorage.setItem(k, JSON.stringify([...prior, payload].slice(-10)));
    } catch {}
    setStatus("sent");
  };

  const reset = () => {
    setQi(0); setAnswers({}); setStatus("idle"); setTouched(false); setCopied(false);
    setName(""); setEmail(""); setPhone(""); setZip("");
  };

  const LANDLORD_TEXT =
    "AC issue at the house — Glacier Heating & Air gives exact prices in writing before work starts. (866) 665-2210 · CallGlacier.com";

  const copyLandlord = async () => {
    try {
      await navigator.clipboard.writeText(LANDLORD_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  // 16px input font is load-bearing: anything smaller makes iOS Safari
  // auto-zoom on focus, and the zoom sticks through to the confirmation page.
  const inputCls = (ok: boolean) =>
    `w-full rounded-xl border bg-ice-50 px-4 py-3.5 text-base font-semibold text-navy-800 placeholder:font-normal placeholder:text-slate-400 outline-none transition focus:border-turquoise focus:bg-white ${
      touched && !ok ? "border-red-brand/60" : "border-ice-100"
    }`;
  const labelCls = "mb-1.5 block text-[0.65rem] font-extrabold uppercase tracking-wider text-slate-500";

  const answerChips = [QUIZ_LABELS.issue[answers.issue], QUIZ_LABELS.age[answers.age], QUIZ_LABELS.urgency[answers.urgency]]
    .filter(Boolean)
    .map(cap);

  return (
    <div ref={cardRef} className="w-full overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-24px_rgba(0,20,44,0.6)] ring-1 ring-white/40">
      {/* header strip */}
      <div className="flex items-center justify-between gap-3 bg-navy-800 px-5 py-3 sm:px-6">
        <p className="font-[family-name:var(--font-montserrat)] text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-white sm:text-xs">
          Free 60-Second System Check
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
                No spam · Exact price in writing
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------ FORM PAGE */}
        {done && status !== "sent" && (
          <div className="quiz-enter">
            <p className="text-xs font-bold uppercase tracking-wider text-ice-600">Here&apos;s our honest read</p>
            <h3 className="mt-1.5 font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-navy-800 sm:text-xl">
              {segment === "rent" && "Straight answer: this one's your landlord's call."}
              {segment === "emergency" && "You're in the priority lane."}
              {segment === "repair" && "This sounds fixable — let's confirm it cheap."}
              {segment === "replace" && "Time to do the replacement math — honestly."}
              {segment === "plumbing" && "Plumbing's in the family too — let's handle it."}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {segment === "rent" &&
                "In Texas, repairs on a rental are the owner's to approve. Send your landlord the message below — or leave your info and we'll coordinate with them directly."}
              {segment === "emergency" &&
                "No-cool calls jump the line, 24/7 — arrival window plus your exact price in writing before any work begins."}
              {segment === "repair" &&
                "Running-but-not-cooling is usually one of a handful of causes — several are quick, inexpensive fixes. We'll name the real problem and your exact price, in writing, first."}
              {segment === "replace" &&
                "The honest move is the math: repair vs. replace, side by side, in writing, free. We'll run both numbers for you."}
              {segment === "plumbing" &&
                "Water heaters, leaks, drains — same promise as our HVAC side: straight answers and your exact price in writing before work starts."}
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

            {segment === "rent" && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-ice-100 bg-ice-50">
                <div className="flex items-center justify-between gap-3 border-b border-ice-100 bg-white px-4 py-2.5">
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-wider text-slate-500">Ready to send your landlord</p>
                  <button
                    onClick={copyLandlord}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                      copied ? "bg-turquoise/15 text-ice-700" : "bg-navy-800 text-white hover:bg-navy-900"
                    }`}
                  >
                    {copied ? (
                      <><Check className="h-3.5 w-3.5" /> Copied</>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                          <rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" />
                        </svg>
                        Copy text
                      </>
                    )}
                  </button>
                </div>
                <p className="px-4 py-3.5 text-sm leading-relaxed text-slate-600">&quot;{LANDLORD_TEXT}&quot;</p>
              </div>
            )}

            <form onSubmit={submitLead} className="mt-5 rounded-2xl border border-ice-100 bg-ice-50/60 p-4" noValidate>
              <p className="font-[family-name:var(--font-montserrat)] text-sm font-extrabold text-navy-800">
                {segment === "rent" ? "Rather have us handle it? We'll coordinate with your landlord." : "Where should we send your exact price?"}
              </p>
              <div className="mt-3.5 grid gap-3">
                <div>
                  <label htmlFor="glc-name" className={labelCls}>Full name</label>
                  <input
                    id="glc-name" type="text" name="name" autoComplete="name" placeholder="First & last name"
                    value={name} onChange={(e) => setName(e.target.value)} className={inputCls(nameOk)}
                  />
                </div>
                <div>
                  <label htmlFor="glc-email" className={labelCls}>Email</label>
                  <input
                    id="glc-email" type="email" name="email" autoComplete="email" inputMode="email" placeholder="you@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls(emailOk)}
                  />
                </div>
                <div className="grid grid-cols-[1.6fr_1fr] gap-3">
                  <div>
                    <label htmlFor="glc-phone" className={labelCls}>Mobile number</label>
                    <input
                      id="glc-phone" type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="(210) 555-0123"
                      value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls(phoneOk)}
                    />
                  </div>
                  <div>
                    <label htmlFor="glc-zip" className={labelCls}>ZIP code</label>
                    <input
                      id="glc-zip" type="text" name="zip" autoComplete="postal-code" inputMode="numeric" maxLength={5} placeholder="78213"
                      value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))} className={inputCls(zipOk)}
                    />
                  </div>
                </div>
              </div>
              {touched && !formOk && (
                <p className="mt-2 text-xs font-semibold text-red-brand">
                  {!nameOk ? "Add your name" : !emailOk ? "That email doesn't look right" : !phoneOk ? "That phone number looks short" : "ZIP should be 5 digits"} — takes two seconds.
                </p>
              )}
              <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-4 w-full !py-4 text-sm disabled:opacity-70 sm:text-base">
                {status === "sending" ? "Sending…"
                  : segment === "rent" ? "Have Glacier handle it →"
                  : segment === "emergency" ? "Get my priority window →"
                  : "Get my exact price path →"}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
                <Shield className="h-3.5 w-3.5 shrink-0 text-turquoise" />
                Instant confirmation · A representative follows up fast · No spam, ever
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
                Your request is in our system. A Glacier representative will message you shortly at{" "}
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
                  ["Issue", cap(QUIZ_LABELS.issue[answers.issue])],
                  ["System age", cap(QUIZ_LABELS.age[answers.age])],
                  ["Timeline", cap(QUIZ_LABELS.urgency[answers.urgency])],
                  ["Property", cap(QUIZ_LABELS.own[answers.own])],
                  ["Service area", zip ? `${zip} · San Antonio, TX` : "San Antonio, TX"],
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
                  "A representative texts you to confirm details",
                  "You get your exact price in writing — before any work begins",
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
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-turquoise" /> Exact prices in writing</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-turquoise" /> 24/7 in San Antonio</span>
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
