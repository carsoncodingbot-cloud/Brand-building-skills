import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { Check, Phone, FileText, Shield } from "@/components/Icons";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "The Daylight Standard — 10 Written Commitments on Every Solar Quote",
  description:
    "The 10 commitments every Daylight Solar quote follows — whole price on page one, no escalators, no lien surprises, honest no-sale verdicts — plus the 10 questions to ask ANY solar company.",
  alternates: { canonical: "/our-promise" },
};

const COMMITMENTS = [
  { t: "The whole price on page one.", b: "System cost, cash and financed, before signatures. The gap between those two numbers is where this industry hides its dealer fees — ours is printed." },
  { t: "No escalator by default.", b: "Payments that climb every year for 25 years belong in bold print, not page 11. If you knowingly choose an escalating structure, you'll see the year-20 payment first." },
  { t: "Designed off your real usage.", b: "Twelve months of your actual utility data — never a template, never a quota. Oversized systems are how neighbors end up with panels AND a bill." },
  { t: "Matched to your actual utility.", b: "SCE's NEM 3.0, Riverside's RPU, Moreno Valley Utility, Colton, Banning — different rules, different math, different right answer. We quote to whoever really bills you." },
  { t: "The honest no-sale verdict.", b: "Small bill, shaded roof, a move coming — sometimes solar doesn't pencil. We'll say so in writing and you'll keep the analysis. A company that can't say no can't be trusted saying yes." },
  { t: "Current law only.", b: "The federal residential credit expired for owned systems placed in service after 2025. We will never quote you a dead incentive — and a company that does has told you who they are." },
  { t: "One accountable warranty chain.", b: "You'll know exactly which company answers for workmanship, roof penetrations, and equipment — in writing, with the CSLB number to verify." },
  { t: "Your title, in plain English.", b: "Before signing you'll know exactly what — if anything — gets recorded against your home. Lien surprises at resale are this industry's signature move. Not ours." },
  { t: "Savings math with visible assumptions.", b: "Every projection states its assumed utility rates, year by year. 'Up to' is not a number. A curve that assumes 8% rate hikes forever is not a forecast — it's a sales tool." },
  { t: "No countdown clocks.", b: "Real offers survive the night. Our quote is good tomorrow, next week, and next month. Anyone pressuring you to sign tonight is telling you the deal can't survive daylight." },
];

const TEN_QUESTIONS = [
  "What is the cash price, and what is the financed price?",
  "What is my exact payment in year 20? Write it here.",
  "Who owns the system, and what do I owe in year 25?",
  "Which single company holds my workmanship warranty? Write its CSLB number.",
  "Will anything be recorded against my title? Show me the document first.",
  "What utility rates does your savings projection assume, year by year?",
  "Which utility bills me, and which program governs my exports?",
  "What tax code section makes me eligible for any credit you quoted?",
  "What happens to this offer if I decide next week instead of tonight?",
  "What does my system produce in year one — and who pays if it doesn't?",
];

export default function PromisePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "The Daylight Standard", url: "/our-promise" }]} />
      <PageHero
        title="The Daylight Standard"
        subtitle="Ten written commitments on every quote we produce — and the ten questions we invite you to aim at any solar company in the Inland Empire. Especially us."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "The Daylight Standard", href: "/our-promise" }]}
      />

      {/* Commitments */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-ice-600">Our end of the deal</p>
            <h2 className="iced iced-dark mt-2 text-2xl sm:text-3xl">Ten commitments, in writing, every time</h2>
            <p className="mt-4 text-slate-600">
              Each one exists because we&apos;ve seen the contract that needed it. Together they make a solar
              deal readable — which is the entire brand.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.t} from="up" delay={Math.min(i, 6) * 50}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-ice-100 bg-gradient-to-b from-white to-ice-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ice-500 to-navy-800 font-[family-name:var(--font-montserrat)] text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-navy-800">{c.t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{c.b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The 10 questions */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-800 to-navy-950 py-16 sm:py-20">
        <div className="hero-mountains absolute inset-0 opacity-40" aria-hidden />
        <div className="container-x relative">
          <div className="mx-auto max-w-2xl text-center text-white">
            <p className="text-sm font-bold uppercase tracking-wide text-ice-300">Your end of the deal</p>
            <h2 className="iced iced-light mt-2 text-2xl sm:text-3xl">The ten questions that kill bad deals</h2>
            <p className="mt-4 text-white/85">
              Print this list. Hand it to every company that quotes your roof. A legitimate offer answers
              all ten in writing without flinching — ours does, and any that can&apos;t has answered a
              bigger question for you.
            </p>
          </div>
          <ol className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {TEN_QUESTIONS.map((q, i) => (
              <li key={q} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-turquoise font-[family-name:var(--font-montserrat)] text-xs font-extrabold text-navy-900">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold leading-snug text-white/95">{q}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/quote" className="btn btn-primary">
              <FileText className="h-4 w-4" /> Get a Quote That Answers All Ten
            </Link>
            <Link href={site.phoneHref} className="btn btn-outline-light">
              <Phone className="h-4 w-4" /> {site.phoneDisplay}
            </Link>
          </div>
        </div>
      </section>

      {/* Why we can afford to operate this way */}
      <section className="bg-ice-100 py-16 sm:py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="iced iced-dark text-2xl sm:text-3xl">Why we can afford to work this way</h2>
            <div className="mt-5 space-y-4 text-slate-600">
              <p>
                Transparency isn&apos;t charity — it&apos;s our business model. Companies that hide numbers
                need commission structures, pressure tactics, and churn to survive. Companies that show
                numbers get something better: referrals, reviews, and neighbors who hand our quote to
                their friends as the benchmark.
              </p>
              <p>
                Our consultants are paid for accuracy, not tonnage. Nobody here earns more by putting a
                bigger system on your roof than your usage supports — which means the person at your
                kitchen table has no reason to bend the math. Incentives explain behavior. We built ours
                on purpose.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Shield, t: "Verifiable, always", b: `${site.license} — check it at the CSLB before signing anything, from anyone.` },
              { icon: Check, t: "The benchmark quote", b: "Homeowners use our written numbers to pressure-test other bids. Good. That's the point." },
            ].map(({ icon: Icon, t, b }) => (
              <div key={t} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ice-100">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500 to-navy-800 text-white"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-3 font-[family-name:var(--font-montserrat)] font-bold text-navy-800">{t}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Hold us to all ten" text="Run the 60-second check and get a quote built to this standard." />
    </>
  );
}
