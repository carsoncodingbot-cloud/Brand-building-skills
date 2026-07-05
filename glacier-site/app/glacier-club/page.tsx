import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import { Check, Snowflake, Star, Shield, Clock, Phone } from "@/components/Icons";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "The Glacier Club — HVAC Maintenance Membership in San Antonio",
  description: `Join the ${site.membership} for two precision tune-ups a year, priority service, exclusive discounts, and no overtime fees. Protect your comfort and your system in San Antonio's brutal climate.`,
  alternates: { canonical: "/glacier-club" },
};

const benefits = [
  { icon: Snowflake, title: "2 precision tune-ups a year", body: "A spring AC tune-up and a fall heating check keep your system running efficiently through every season." },
  { icon: Clock, title: "Priority scheduling", body: "Members jump to the front of the line — even during peak summer, when everyone else is waiting." },
  { icon: Star, title: "15% off repairs", body: "An exclusive member discount on all repairs and parts, so a breakdown never breaks the bank." },
  { icon: Shield, title: "No overtime charges", body: "Nights, weekends, holidays — members never pay extra for emergency service." },
  { icon: Check, title: "Extended equipment life", body: "Regular maintenance can add years to your system and helps preserve manufacturer warranties." },
  { icon: Snowflake, title: "Priceless peace of mind", body: "We catch small problems before they become expensive emergencies. That's the whole point." },
];

const tiers = [
  {
    name: "Comfort",
    price: "$14", per: "/mo",
    highlight: false,
    features: ["1 system", "2 tune-ups per year", "Priority scheduling", "10% repair discount", "No overtime fees"],
  },
  {
    name: "Comfort Plus",
    price: "$21", per: "/mo",
    highlight: true,
    features: ["1 system", "2 tune-ups per year", "Front-of-line priority", "15% repair discount", "No overtime fees", "Waived diagnostic fee", "Filters included"],
  },
  {
    name: "Whole Home",
    price: "$34", per: "/mo",
    highlight: false,
    features: ["Up to 2 systems", "2 tune-ups per system", "Front-of-line priority", "20% repair discount", "No overtime fees", "Waived diagnostic fee", "Filters included"],
  },
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
      <PageHero
        title="Join the Glacier Club"
        subtitle="Two tune-ups a year, priority service, exclusive discounts, and zero overtime fees. Membership that pays for itself — and protects your comfort year-round."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Glacier Club", href: "/glacier-club" }]}
      />

      {/* Benefits */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-ice-600">Membership perks</p>
            <h2 className="iced iced-dark mt-2 text-2xl sm:text-3xl">Everything a member gets</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="rounded-2xl border border-ice-100 bg-ice-50 p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-500 text-white"><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-[family-name:var(--font-montserrat)] text-lg font-bold text-navy-800">{b.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="bg-ice-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="iced iced-dark text-2xl sm:text-3xl">Choose your plan</h2>
            <p className="mt-4 text-slate-600">Simple monthly pricing. No contracts. Cancel anytime.</p>
          </div>
          <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.name}
                className={`relative rounded-3xl p-7 shadow-sm ${t.highlight ? "bg-navy-800 text-white ring-2 ring-turquoise shadow-xl lg:-mt-4 lg:mb-4" : "border border-ice-100 bg-white"}`}>
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-turquoise px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-navy-800">Most popular</span>
                )}
                <h3 className={`font-[family-name:var(--font-montserrat)] text-xl font-extrabold ${t.highlight ? "text-white" : "text-navy-800"}`}>{t.name}</h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className={`iced text-4xl font-extrabold ${t.highlight ? "iced-light" : "iced-dark"}`}>{t.price}</span>
                  <span className={`pb-1 text-sm ${t.highlight ? "text-white/70" : "text-slate-500"}`}>{t.per}</span>
                </div>
                <ul className={`mt-6 space-y-2.5 text-sm ${t.highlight ? "text-white/90" : "text-slate-600"}`}>
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className={`h-4 w-4 ${t.highlight ? "text-turquoise" : "text-ice-600"}`} /> {f}
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
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs text-slate-500">
            Pricing shown is representative for illustration. Final membership pricing is confirmed at enrollment
            and may vary by system type and home size.
          </p>
        </div>
      </section>

      {/* FAQ */}
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
