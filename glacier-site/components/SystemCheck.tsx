"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";
import { Phone, Check } from "@/components/Icons";
import { QUIZ_QUESTIONS, QUIZ_STORE_KEY, quizSegment, quizSmsHref, quizLeadPayload } from "@/lib/quiz";

/**
 * The 60-Second System Check as a self-contained white card.
 * Question 1 is visible the moment the card renders — there is no intro
 * step and nothing to click before answering. Used at the top of the
 * homepage hero and on /quote.
 *
 * The proven three-act funnel:
 *  1. QUESTIONS — one per screen, tap-cards, zero typing, progress bar.
 *  2. FORM PAGE — personalized honest read + name / email / phone / ZIP
 *     with the site-standard red CTA. Submits the fully-labeled lead to
 *     the GHL inbound webhook (site.ghlWebhook) so automations fire the
 *     follow-up instantly; falls back to the prefilled-SMS handoff until
 *     the webhook URL is configured, so no lead is ever lost.
 *  3. CONFIRMATION PAGE — "we received it, a representative will text
 *     you shortly" + what-happens-next timeline + red call CTA for
 *     anyone who can't wait.
 */

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
    const contact = { name: name.trim(), email: email.trim(), phone: phoneDigits, zip: zip.trim() };
    if (site.ghlWebhook) {
      setStatus("sending");
      const body = JSON.stringify(quizLeadPayload(answers, contact, window.location.pathname));
      try {
        await fetch(site.ghlWebhook, { method: "POST", headers: { "Content-Type": "application/json" }, body });
      } catch {
        // CORS/network hiccup — resend opaque so the webhook still receives it
        try { await fetch(site.ghlWebhook, { method: "POST", mode: "no-cors", body }); } catch {}
      }
      setStatus("sent");
    } else {
      // GHL not wired yet — open the prefilled text so the lead still lands
      window.location.href = quizSmsHref(answers, contact);
      setStatus("sent");
    }
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

  const inputCls = (ok: boolean) =>
    `w-full rounded-xl border bg-ice-50 px-4 py-3 text-sm font-semibold text-navy-800 placeholder:font-normal placeholder:text-slate-400 outline-none transition focus:border-turquoise focus:bg-white ${
      touched && !ok ? "border-red-brand/60" : "border-ice-100"
    }`;

  const leadFields = (
    <div className="grid gap-3">
      <input
        type="text" name="name" autoComplete="name" placeholder="First & last name"
        value={name} onChange={(e) => setName(e.target.value)} className={inputCls(nameOk)} aria-label="Your name"
      />
      <input
        type="email" name="email" autoComplete="email" inputMode="email" placeholder="Email address"
        value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls(emailOk)} aria-label="Email address"
      />
      <div className="grid grid-cols-[1.6fr_1fr] gap-3">
        <input
          type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="Mobile number"
          value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls(phoneOk)} aria-label="Mobile number"
        />
        <input
          type="text" name="zip" autoComplete="postal-code" inputMode="numeric" maxLength={5} placeholder="ZIP"
          value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))} className={inputCls(zipOk)} aria-label="ZIP code"
        />
      </div>
    </div>
  );

  const fieldError = touched && !formOk && (
    <p className="mt-2 text-xs font-semibold text-red-brand">
      {!nameOk ? "Add your name" : !emailOk ? "That email doesn't look right" : !phoneOk ? "That phone number looks short" : "ZIP should be 5 digits"} — takes two seconds.
    </p>
  );

  return (
    <div className="w-full overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-24px_rgba(0,20,44,0.6)] ring-1 ring-white/40">
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
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
              {segment === "rent" &&
                "In Texas, repairs on a rental are the owner's to approve. Send your landlord the message below — or leave your info and we'll coordinate with them directly."}
              {segment === "emergency" &&
                "No-cool calls jump the line, 24/7. Drop your info below and we're on it — arrival window plus your exact price in writing before any work begins."}
              {segment === "repair" &&
                "Running-but-not-cooling is usually one of a handful of causes — several are quick, inexpensive fixes. Drop your info below and we'll name the real problem and your exact price, in writing, before a single tool comes out."}
              {segment === "replace" &&
                "With a system that age (or bills doing what yours are doing), the honest move is the math: repair vs. replace, side by side, in writing, free. Drop your info below and we'll run both numbers for you."}
              {segment === "plumbing" &&
                "From water heaters to leaks and drains — same promise as our HVAC side. Drop your info below and we'll get you straight answers and your exact price in writing before work starts."}
            </p>

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

            <form onSubmit={submitLead} className="mt-5" noValidate>
              {segment === "rent" && (
                <p className="mb-3 text-sm leading-relaxed text-slate-600">
                  <b className="text-navy-800">Rather have us handle it?</b>{" "}
                  Leave your info — we&apos;ll reach out and coordinate with your landlord directly.
                </p>
              )}
              {leadFields}
              {fieldError}
              <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-4 w-full !py-4 text-sm disabled:opacity-70 sm:text-base">
                {status === "sending" ? "Sending…"
                  : segment === "rent" ? "Have Glacier handle it →"
                  : segment === "emergency" ? "Get my priority window →"
                  : "Get my exact price path →"}
              </button>
            </form>
            <p className="mt-3 text-center text-xs text-slate-500">
              Instant confirmation · A representative follows up fast · No spam, ever
            </p>
            <p className="mt-4 text-center text-xs font-bold uppercase tracking-wider text-slate-400">Need it sooner?</p>
            <a href={site.phoneHref} className="btn mt-1.5 w-full !bg-navy-800 !py-4 text-sm !text-white hover:!bg-navy-900 sm:text-base">
              <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
            </a>
            <button onClick={reset} className="mx-auto mt-4 block text-xs font-semibold text-slate-400 hover:text-navy-800">
              ↺ Start over
            </button>
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
                {site.ghlWebhook
                  ? "We received your system check. A Glacier representative will message you shortly — keep an eye on your phone."
                  : "One tap left: hit send on the text we just opened, and a Glacier representative will message you shortly."}
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-ice-100 bg-ice-50 p-4">
              <p className="text-[0.65rem] font-extrabold uppercase tracking-wider text-slate-500">What happens next</p>
              <ol className="mt-3 space-y-2.5">
                {[
                  "Your answers are with our team right now",
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
