import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import CheckWithYeti from "@/components/CheckWithYeti";
import Faq from "@/components/Faq";
import Mascot from "@/components/Mascot";
import Reveal from "@/components/Reveal";
import { Check, Snowflake, Star, Shield, Clock, Phone, ChevronRight, X } from "@/components/Icons";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import clubLogo from "../../public/glacier-club-logo.png";

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

const MEMBER_FEATURES = [
  "Same-day / priority service",
  "Discounted service rate",
  "15% off all repairs",
  "2 Precision Tune-Ups included",
  "2 Safety Inspections included",
  "Reduced breakdown risk",
  "20–30% longer system life",
  "Optimized performance year-round",
  "No overtime fees",
];

const NONMEMBER_FEATURES = [
  "Standard scheduling",
  "Full diagnostic fee",
  "No repair discount",
  "Pay per visit for maintenance",
  "Higher risk of emergency repairs",
  "Shortened system lifespan",
  "System loses efficiency over time",
  "Overtime charges apply",
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
            <p className="font-[family-name:var(--font-montserrat)] text-base font-extrabold uppercase tracking-[0.35em] text-white sm:text-lg">Join the</p>
            <h1 className="sr-only">Glacier Club</h1>
            <Image
              src={clubLogo}
              alt="Glacier Club"
              priority
              sizes="(max-width: 640px) 90vw, 560px"
              className="mx-auto mt-3 h-auto w-full max-w-xl drop-shadow-[0_10px_30px_rgba(0,20,45,0.45)]"
            />
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

      {/* ---------------- Member vs Non-Member ---------------- */}
      <section id="plans" className="relative overflow-hidden bg-gradient-to-b from-navy-800 to-[#001a36] py-16 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-ice-500/20 blur-[90px]" aria-hidden />
        <div className="container-x relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-ice-300">The Glacier Club advantage</p>
            <h2 className="iced iced-light mt-2 text-3xl sm:text-4xl">Member vs. Non-Member</h2>
            <p className="mt-4 text-ice-100/85">See exactly what you unlock the moment you join.</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
            {/* Member */}
            <Reveal from="left"
              className="overflow-hidden rounded-3xl bg-gradient-to-b from-white to-ice-100 p-7 shadow-[0_30px_70px_-20px_rgba(31,143,214,0.55)] ring-1 ring-white/60 sm:p-8">
              <div className="flex items-center gap-2">
                <Snowflake className="h-6 w-6 text-ice-600" />
                <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold uppercase text-navy-800">Glacier Club Member</h3>
              </div>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-ice-600">Features included</p>
              <ul className="mt-6 space-y-3.5">
                {MEMBER_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ice-500 to-ice-700 text-white shadow-sm">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-navy-800">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* VS badge */}
            <div className="mx-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f7941d] to-[#e11f26] font-[family-name:var(--font-montserrat)] text-xl font-black text-white shadow-[0_10px_30px_-6px_rgba(225,31,38,0.6)] ring-4 ring-white/10">
              VS
            </div>

            {/* Non-member */}
            <Reveal from="right"
              className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-sm sm:p-8">
              <div className="flex items-center gap-2">
                <X className="h-6 w-6 text-white/40" />
                <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold uppercase text-white/75">Non-Member</h3>
              </div>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-white/35">Features not included</p>
              <ul className="mt-6 space-y-3.5">
                {NONMEMBER_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-red-brand">
                      <X className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-white/60">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mt-11 text-center">
            <Link href="/contact" className="btn btn-primary text-base">Join the Glacier Club Today</Link>
            <p className="mx-auto mt-4 max-w-xl text-sm text-ice-200/70">
              No contracts. Cancel anytime. Call {site.phoneDisplay} and ask about current membership options.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="bg-white py-16">
        <div className="container-x">
          <h2 className="iced iced-dark text-center text-2xl sm:text-3xl">Glacier Club — Common Questions</h2>
          <div className="mx-auto mt-8 max-w-4xl"><Faq items={faqs} /></div>
        </div>
      </section>

      {/* ---------- The capture closer: the 60-second check ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-800 to-[#001a36] py-14 sm:py-16">
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-14">
          <div className="text-center lg:text-left">
            <h2 className="iced iced-light text-3xl sm:text-4xl">Start with the free 60-second&nbsp;check</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90 lg:mx-0">
              Tell us what&apos;s going on at your place and a real person follows up fast with your
              exact price path and current membership options.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ice-200/90 lg:justify-start">
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" /> No contracts — cancel anytime</span>
              <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" /> Licensed &amp; insured</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> 24/7 in San Antonio</span>
            </div>
            <div className="mt-7 hidden lg:block">
              <Link href={site.phoneHref} className="btn btn-primary">
                <Phone className="h-4 w-4" /> Or call {site.phoneDisplay}
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <CheckWithYeti />
          </div>
        </div>
      </section>

      {/* ---------- The banner: one final, unmistakable phone ask ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#f7941d] via-[#f15a24] to-[#e11f26] py-12 sm:py-14">
        <div className="container-x relative text-center text-white">
          <h2 className="iced iced-light text-2xl sm:text-3xl">Ready to join the coolest club in San&nbsp;Antonio?</h2>
          <p className="mx-auto mt-2.5 max-w-xl text-white/90">Enroll today and schedule your first tune-up.</p>
          <Link href={site.phoneHref} className="btn mt-6 bg-white !px-8 !py-3.5 text-base text-red-brand shadow-lg hover:bg-ice-50">
            <Phone className="h-4 w-4" /> {site.phoneDisplay}
          </Link>
        </div>
      </section>
    </>
  );
}
