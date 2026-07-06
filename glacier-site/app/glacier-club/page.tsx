import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import Mascot from "@/components/Mascot";
import Reveal from "@/components/Reveal";
import { Check, Snowflake, Star, Shield, Clock, Phone, ChevronRight } from "@/components/Icons";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "The Glacier Club — HVAC Maintenance Membership in San Antonio",
  description: `Join the ${site.membership} for two precision tune-ups a year, priority service, exclusive discounts, and no overtime fees. Protect your comfort and your system in San Antonio's brutal climate.`,
  alternates: { canonical: "/glacier-club" },
};

const HERO_BENEFITS = ["15% Off All Repairs", "2 Precision Tune-Ups / Year", "Front-of-Line Priority Service", "Zero Overtime Fees"];

const benefits = [
  { icon: Snowflake, title: "2 precision tune-ups a year", body: "A spring AC tune-up and a fall heating check keep your system running efficiently through every season." },
  { icon: Clock, title: "Priority scheduling", body: "Members jump to the front of the line — even during peak summer, when everyone else is waiting." },
  { icon: Star, title: "15% off repairs", body: "An exclusive member discount on all repairs and parts, so a breakdown never breaks the bank." },
  { icon: Shield, title: "No overtime charges", body: "Nights, weekends, holidays — members never pay extra for emergency service." },
  { icon: Check, title: "Extended equipment life", body: "Regular maintenance can add years to your system and helps preserve manufacturer warranties." },
  { icon: Snowflake, title: "Priceless peace of mind", body: "We catch small problems before they become expensive emergencies. That's the whole point." },
];

const tiers = [
  { name: "Comfort", price: "$14", per: "/mo", highlight: false,
    features: ["1 system", "2 tune-ups per year", "Priority scheduling", "10% repair discount", "No overtime fees"] },
  { name: "Comfort Plus", price: "$21", per: "/mo", highlight: true,
    features: ["1 system", "2 tune-ups per year", "Front-of-line priority", "15% repair discount", "No overtime fees", "Waived diagnostic fee", "Filters included"] },
  { name: "Whole Home", price: "$34", per: "/mo", highlight: false,
    features: ["Up to 2 systems", "2 tune-ups per system", "Front-of-line priority", "20% repair discount", "No overtime fees", "Waived diagnostic fee", "Filters included"] },
];

const faqs = [
  { q: "What is the Glacier Club?", a: `The ${site.membership} is our annual maintenance membership. For a low monthly rate, you get two professional tune-ups a year, priority scheduling, discounted repairs, and no overtime fees — everything you need to keep your system healthy and your costs predictable.` },
  { q: "Why does maintenance matter in San Antonio?", a: "Our AC systems run hard for much of the year in South Texas heat. Regular maintenance keeps efficiency high (lowering your energy bills), catches worn parts before they fail on the hottest day, and helps protect your manufacturer warranty — many of which require documented annual service." },
  { q: "Can I cancel anytime?", a: "Yes. There are no long-term contracts. You can cancel your membership at any time, though most members stay because the discounts and priority service more than pay for themselves." },
  { q: "What's included in a tune-up?", a: "A multi-point inspection: checking refrigerant levels, electrical connections, capacitors, the condensate drain, airflow, thermostat calibration, and a full system cleaning. We fix small issues on the spot and flag anything that needs attention — with no pressure." },
  { q: "How do I join?", a: `Call us at ${site.phoneDisplay} or request service online and ask about the ${site.membership}. We'll get you enrolled and schedule your first tune-up right away.` },
];

export default function GlacierClubPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Glacier Club", url: "/glacier-club" }]} />
      <FaqJsonLd faqs={faqs} />

      {/* ---------------- Immersive hero ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice-500 via-ice-700 to-navy-800 pt-24 pb-14">
        <div className="hero-mountains absolute inset-0 opacity-50" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-40 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-turquoise/25 blur-[100px]" aria-hidden />

        <div className="container-x relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1 text-sm text-ice-200/90">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><ChevronRight className="h-3.5 w-3.5 text-ice-300" /></li>
              <li className="font-semibold text-white">Glacier Club</li>
            </ol>
          </nav>

          <div className="mx-auto max-w-2xl text-center">
            <p className="font-[family-name:var(--font-montserrat)] text-sm font-bold uppercase tracking-[0.2em] text-ice-100">Save money by joining the</p>
            <h1 className="iced iced-light mt-2 text-5xl sm:text-6xl lg:text-7xl">Glacier Club</h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">
              Expert HVAC maintenance and member-only perks that protect your comfort — and your wallet — through every San Antonio season.
            </p>

            <ul className="mx-auto mt-8 flex max-w-md flex-col gap-3">
              {HERO_BENEFITS.map((b) => (
                <li key={b} className="flex items-center justify-center gap-3 font-[family-name:var(--font-montserrat)] text-lg font-extrabold uppercase tracking-wide text-white sm:text-xl">
                  <Snowflake className="h-5 w-5 shrink-0 text-turquoise" /> {b}
                </li>
              ))}
              <li className="mt-1 font-[family-name:var(--font-montserrat)] text-lg font-extrabold uppercase tracking-wide text-turquoise">…and more!</li>
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="#plans" className="btn btn-primary text-base">Join the Club</Link>
              <Link href={site.phoneHref} className="btn btn-outline-light text-base"><Phone className="h-4 w-4" /> Call {site.phoneDisplay}</Link>
            </div>
          </div>

          <div className="relative mt-6 flex justify-center">
            <div className="pointer-events-none absolute bottom-4 h-8 w-56 rounded-[50%] bg-black/30 blur-2xl" aria-hidden />
            <Mascot alt="Glacier Club yeti mascot" width={520} height={700} priority
              sizes="(max-width:640px) 60vw, 320px"
              className="relative h-auto w-56 animate-float object-contain sm:w-72" />
          </div>
        </div>
      </section>

      {/* ---------------- Why join / perks ---------------- */}
      <section className="bg-gradient-to-b from-ice-50 to-white py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-ice-600">Why join the Glacier Club</p>
            <h2 className="iced iced-dark mt-2 text-3xl sm:text-4xl">Membership that pays for itself</h2>
            <p className="mt-4 text-slate-600">One avoided breakdown covers a year of dues. Here&apos;s everything you get.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} from="up" delay={i * 60}
                  className="group rounded-2xl bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,43,88,0.4)] ring-1 ring-ice-100 transition hover:-translate-y-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ice-400 to-ice-600 text-white shadow-md">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-montserrat)] text-lg font-bold text-navy-800">{b.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{b.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Pricing ---------------- */}
      <section id="plans" className="relative overflow-hidden bg-gradient-to-b from-navy-800 to-[#001a36] py-16 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-ice-500/20 blur-[90px]" aria-hidden />
        <div className="container-x relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="iced iced-light text-3xl sm:text-4xl">Choose your plan</h2>
            <p className="mt-4 text-ice-100/85">Simple monthly pricing. No contracts. Cancel anytime.</p>
          </div>
          <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.name}
                className={`relative rounded-3xl p-7 transition ${
                  t.highlight
                    ? "bg-gradient-to-b from-ice-500 to-ice-700 text-white shadow-[0_30px_70px_-20px_rgba(31,143,214,0.6)] ring-2 ring-turquoise lg:-mt-5 lg:mb-5"
                    : "bg-white text-navy-800 shadow-xl ring-1 ring-white/10"
                }`}>
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-navy-800 shadow">Most Popular</span>
                )}
                <h3 className={`font-[family-name:var(--font-montserrat)] text-xl font-extrabold ${t.highlight ? "text-white" : "text-navy-800"}`}>{t.name}</h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className={`font-[family-name:var(--font-montserrat)] text-5xl font-black ${t.highlight ? "text-white" : "text-navy-800"}`}>{t.price}</span>
                  <span className={`pb-1.5 text-sm ${t.highlight ? "text-white/80" : "text-slate-500"}`}>{t.per}</span>
                </div>
                <ul className={`mt-6 space-y-2.5 text-sm ${t.highlight ? "text-white/95" : "text-slate-600"}`}>
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${t.highlight ? "bg-white/20" : "bg-ice-500"}`}>
                        <Check className={`h-3.5 w-3.5 ${t.highlight ? "text-white" : "text-white"}`} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className={`btn mt-7 w-full ${t.highlight ? "btn-primary" : "btn-outline-navy"}`}>
                  Join {t.name}
                </Link>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-ice-200/60">
            Pricing shown is representative for illustration. Final membership pricing is confirmed at enrollment and may vary by system type and home size.
          </p>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="bg-white py-16">
        <div className="container-x">
          <h2 className="iced iced-dark text-center text-2xl sm:text-3xl">Glacier Club — Common Questions</h2>
          <div className="mx-auto mt-8 max-w-4xl"><Faq items={faqs} /></div>
        </div>
      </section>

      <section className="bg-red-brand py-10">
        <div className="container-x flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-white">Ready to join the coolest club in San Antonio?</p>
            <p className="text-white/90">Enroll today and schedule your first tune-up.</p>
          </div>
          <Link href={site.phoneHref} className="btn bg-white text-red-brand hover:bg-ice-50">
            <Phone className="h-4 w-4" /> {site.phoneDisplay}
          </Link>
        </div>
      </section>

      <CtaBand title="Protect your comfort year-round" text="Two tune-ups, priority service, and member-only savings await." />
    </>
  );
}
