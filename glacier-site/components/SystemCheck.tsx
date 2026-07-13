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
 * Psychology built in:
 *  - Q1 on screen at page load (zero-friction first micro-commitment)
 *  - One question at a time + segmented progress (progress principle)
 *  - Tap-cards, zero typing until the result (minimal effort)
 *  - Answers persist in localStorage (save & continue)
 *  - Result = personalized read-back + exact-price promise, then a
 *    name/phone/ZIP capture that posts the fully-labeled lead into the
 *    GHL inbound webhook (site.ghlWebhook) so automations fire the
 *    follow-up text instantly — the customer types three fields and is
 *    done. If the webhook isn't configured yet, it falls back to the
 *    prefilled-SMS handoff so no lead is ever lost.
 */

export default function SystemCheck() {
  // qi = 0..3 question index, 4 = result
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [touched, setTouched] = useState(false);

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

  const phoneDigits = phone.replace(/\D/g, "");
  const nameOk = name.trim().length >= 2;
  const phoneOk = phoneDigits.length >= 10;
  const zipOk = /^\d{5}$/.test(zip.trim());
  const formOk = nameOk && phoneOk && zipOk;

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!formOk || status !== "idle") return;
    const contact = { name: name.trim(), phone: phoneDigits, zip: zip.trim() };
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
    setQi(0); setAnswers({}); setStatus("idle"); setTouched(false);
    setName(""); setPhone(""); setZip("");
  };

  const inputCls = (ok: boolean) =>
    `w-full rounded-xl border bg-ice-50 px-4 py-3 text-sm font-semibold text-navy-800 placeholder:font-normal placeholder:text-slate-400 outline-none transition focus:border-turquoise focus:bg-white ${
      touched && !ok ? "border-red-brand/60" : "border-ice-100"
    }`;

  return (
    <div className="w-full overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-24px_rgba(0,20,44,0.6)] ring-1 ring-white/40">
      {/* header strip */}
      <div className="flex items-center justify-between gap-3 bg-navy-800 px-5 py-3 sm:px-6">
        <p className="font-[family-name:var(--font-montserrat)] text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-white sm:text-xs">
          Free 60-Second System Check
        </p>
        <p className="shrink-0 text-[0.65rem] font-bold uppercase tracking-wider text-turquoise sm:text-xs">
          {done ? "Your result" : `${qi + 1} of ${QUIZ_QUESTIONS.length}`}
        </p>
      </div>
      {/* segmented progress */}
      <div className="flex gap-1 bg-navy-800 px-5 pb-3 sm:px-6" aria-hidden>
        {QUIZ_QUESTIONS.map((_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${done || i <= qi ? "bg-turquoise" : "bg-white/20"}`} />
        ))}
      </div>

      <div className="p-5 sm:p-6">
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

        {done && status !== "sent" && (
          <div className="quiz-enter">
            {segment === "rent" ? (
              <>
                <h3 className="font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-navy-800 sm:text-xl">
                  Straight answer: this one&apos;s your landlord&apos;s call.
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  In Texas, repairs on a rental are the owner&apos;s to approve. Fastest fix: send your landlord or property
                  manager our number — we&apos;ll give them an exact price in writing and keep you in the loop.
                </p>
                <div className="mt-4 rounded-xl bg-ice-50 p-4 text-sm text-slate-600">
                  <b className="text-navy-800">Copy-paste for your landlord:</b><br />
                  &quot;AC issue at the house — Glacier Heating &amp; Air gives exact prices in writing before work starts.
                  (866) 665-2210 · CallGlacier.com&quot;
                </div>
                <button onClick={reset} className="mx-auto mt-4 block text-xs font-semibold text-slate-400 hover:text-navy-800">
                  ↺ Start over
                </button>
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-wider text-ice-600">Here&apos;s our honest read</p>
                <h3 className="mt-1.5 font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-navy-800 sm:text-xl">
                  {segment === "emergency" && "You're in the priority lane."}
                  {segment === "repair" && "This sounds fixable — let's confirm it cheap."}
                  {segment === "replace" && "Time to do the replacement math — honestly."}
                  {segment === "plumbing" && "Plumbing's in the family too — let's handle it."}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {segment === "emergency" &&
                    "No-cool calls jump the line, 24/7. Drop your info below and we're on it — arrival window plus your exact price in writing before any work begins."}
                  {segment === "repair" &&
                    "Running-but-not-cooling is usually one of a handful of causes — several are quick, inexpensive fixes. Drop your info below and we'll name the real problem and your exact price, in writing, before a single tool comes out."}
                  {segment === "replace" &&
                    "With a system that age (or bills doing what yours are doing), the honest move is the math: repair vs. replace, side by side, in writing, free. Drop your info below and we'll run both numbers for you."}
                  {segment === "plumbing" &&
                    "From water heaters to leaks and drains — same promise as our HVAC side. Drop your info below and we'll get you straight answers and your exact price in writing before work starts."}
                </p>
                <form onSubmit={submitLead} className="mt-4" noValidate>
                  <div className="grid gap-2.5">
                    <input
                      type="text" name="name" autoComplete="name" placeholder="First & last name"
                      value={name} onChange={(e) => setName(e.target.value)} className={inputCls(nameOk)} aria-label="Your name"
                    />
                    <div className="grid grid-cols-[1.6fr_1fr] gap-2.5">
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
                  {touched && !formOk && (
                    <p className="mt-2 text-xs font-semibold text-red-brand">
                      {!nameOk ? "Add your name" : !phoneOk ? "That phone number looks short" : "ZIP should be 5 digits"} — takes two seconds.
                    </p>
                  )}
                  <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-3 w-full !py-3.5 text-sm disabled:opacity-70 sm:text-base">
                    {status === "sending" ? "Sending…" : segment === "emergency" ? "Get my priority window →" : "Get my exact price path →"}
                  </button>
                </form>
                <p className="mt-2.5 text-center text-xs text-slate-500">
                  Instant text confirmation · A real person follows up fast · No spam, ever
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <button onClick={reset} className="text-xs font-semibold text-slate-400 hover:text-navy-800">↺ Start over</button>
                  <a href={site.phoneHref} className={`inline-flex items-center gap-1.5 text-xs font-bold ${segment === "emergency" ? "text-red-brand" : "text-ice-600"} hover:underline`}>
                    <Phone className="h-3.5 w-3.5" /> Melting right now? {site.phoneDisplay}
                  </a>
                </div>
              </>
            )}
          </div>
        )}

        {done && status === "sent" && (
          <div className="quiz-enter text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-turquoise/15">
              <Check className="h-7 w-7 text-turquoise" />
            </span>
            <h3 className="mt-4 font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-navy-800">
              {site.ghlWebhook ? `You're in, ${name.trim().split(" ")[0] || "neighbor"}.` : "One tap left."}
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">
              {site.ghlWebhook
                ? "Watch your phone — your confirmation text is on the way, and a real person follows up fast with your exact-price path."
                : "We just opened a text with your check results pre-filled — hit send and a real person replies fast."}
            </p>
            <ul className="mx-auto mt-4 max-w-xs space-y-1.5 text-left text-sm text-slate-600">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-turquoise" /> Exact price in writing — the number doesn&apos;t move</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-turquoise" /> Licensed, insured, background-checked</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-turquoise" /> {segment === "emergency" ? "No-cool calls prioritized, 24/7" : "Fast scheduling — often same-day"}</li>
            </ul>
            <a href={site.phoneHref} className="btn mt-5 w-full !bg-navy-800 !py-3.5 text-sm !text-white hover:!bg-navy-900 sm:text-base">
              <Phone className="h-4 w-4" /> Can&apos;t wait? Call {site.phoneDisplay}
            </a>
            <button onClick={reset} className="mx-auto mt-3 block text-xs font-semibold text-slate-400 hover:text-navy-800">
              ↺ Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
