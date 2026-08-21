import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import { Check, Shield, Clock, Phone, FileText } from "@/components/Icons";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Solar Financing, Honestly — Cash vs. Loan vs. Lease in the Inland Empire",
  description: `How solar financing actually works in 2026: dealer fees, escalators, cash vs. financed pricing, and lease vs. own — compared honestly by ${site.name}. No games, every number in writing.`,
  alternates: { canonical: "/financing" },
};

const perks = [
  { icon: FileText, title: "Cash AND financed price, side by side", body: "The gap between those two numbers is the dealer fee most companies hide inside a 'low monthly payment.' On our quotes, it's printed. Ask every competitor for the same two numbers." },
  { icon: Shield, title: "No escalator by default", body: "Payments that climb every year for 25 years belong in bold print, not page 11. Our default structures don't escalate — and if you choose one that does, you'll see the year-20 payment first." },
  { icon: Clock, title: "Your title, protected", body: "Before anything is signed you'll know exactly what — if anything — gets recorded against your home, in plain English. Lien surprises at resale time are how solar gets its bad name." },
];

const steps = [
  { n: "1", t: "Get your written numbers", b: "System design from your real usage, with the full price — cash and financed — payment, and payback math on one page." },
  { n: "2", t: "Compare the three paths", b: "Cash, loan, and third-party ownership, each with its true 25-year cost. We'll tell you which we'd pick in your seat, and why." },
  { n: "3", t: "Sleep on it", b: "A real offer survives the night. Our numbers are good tomorrow, next week, and next month — pressure isn't part of the process." },
  { n: "4", t: "Decide in daylight", b: "Sign only when you can explain your own deal back to us. That's our bar — for your protection and ours." },
];

const faqs = [
  { q: "What's a solar dealer fee?", a: "A markup baked into the financed system price in exchange for a low advertised interest rate — often thousands of dollars. It's why the same system can have a 'cheap' loan and an expensive price. Comparing cash price to financed price exposes it instantly, which is why we show both." },
  { q: "Is the 30% federal tax credit available?", a: "Not for homeowner-owned systems placed in service after December 31, 2025 — the residential credit expired. Anyone quoting it on a 2026 owned system is misinformed or worse. Third-party-owned arrangements have separate rules; if one applies to your situation, you'll see it explained in writing." },
  { q: "Should I lease, get a PPA, or own?", a: "Owning usually wins the 25-year math when you can finance sensibly, and it avoids the resale complications a lease can bolt to your title. Third-party ownership can still fit some situations. We put all three side by side with true lifetime costs — then it's your call, made in daylight." },
  { q: "What about escalator clauses?", a: "An escalator raises your payment every year — commonly around 3% — for the life of a lease or PPA. Compounded over 25 years, the ending payment is dramatically higher than the starting one. We don't use them by default, and any quote that includes one should show you the final-year payment in bold." },
  { q: "Will applying affect my credit?", a: "Pre-qualification typically uses a soft check that doesn't affect your score; a full application may involve a hard inquiry. You'll know which is which before anything is run." },
];

export default function FinancingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Financing", url: "/financing" }]} />
      <FaqJsonLd faqs={faqs} />
      <PageHero
        title="Financing, In Plain Daylight"
        subtitle="Every homeowner already has a power payment — the only question is whether it ever ends. Financing is where good solar deals go bad, so here's how we do it instead: every structure compared honestly, every number in writing, no pressure clock."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Financing", href: "/financing" }]}
      />

      {/* Perks */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-ice-600">The Daylight difference</p>
            <h2 className="iced iced-dark mt-2 text-2xl sm:text-3xl">Three protections, standard on every quote</h2>
            <p className="mt-4 text-slate-600">These aren&apos;t upgrades. They&apos;re the baseline — because each one closes off the specific trick that generates most solar horror stories.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {perks.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} from="up" delay={i * 80}>
                  <div className="h-full rounded-2xl border border-ice-100 bg-gradient-to-b from-white to-ice-50 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500 to-navy-800 text-white shadow-lg"><Icon className="h-6 w-6" /></span>
                    <h3 className="mt-4 font-[family-name:var(--font-montserrat)] text-lg font-bold text-navy-800">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{p.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-3xl bg-navy-800 p-8 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <h3 className="iced iced-light text-xl sm:text-2xl">Want your two numbers?</h3>
              <p className="mt-2 text-white/85">Cash price and financed price for your actual house — the comparison that exposes every hidden fee in this industry.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="btn btn-primary">Get My Written Numbers</Link>
              <Link href={site.phoneHref} className="btn btn-outline-light"><Phone className="h-4 w-4" /> {site.phoneDisplay}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-ice-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="iced iced-dark text-2xl sm:text-3xl">How deciding works here</h2>
            <p className="mt-4 text-slate-600">Four steps, zero countdown timers.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} from="up" delay={i * 70}>
                <div className="relative h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ice-100 transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-red-brand to-[#a34a06] font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-white shadow-lg">{s.n}</span>
                  <h3 className="mt-4 font-[family-name:var(--font-montserrat)] font-bold text-navy-800">{s.t}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-slate-500">
            Financing is provided by third-party lenders on approved credit. Terms and rates vary and are
            subject to lender approval. Tax and title matters can carry individual consequences — we&apos;ll
            put everything in writing and encourage you to have your own advisor look at anything you&apos;d like.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="container-x">
          <h2 className="iced iced-dark text-center text-2xl sm:text-3xl">Financing — Straight Answers</h2>
          <div className="mx-auto mt-8 max-w-4xl"><Faq items={faqs} /></div>
        </div>
      </section>

      <CtaBand title="Two numbers. One page. Zero games." text="Get the cash price and the financed price for your house — and see what honest looks like." />
    </>
  );
}
