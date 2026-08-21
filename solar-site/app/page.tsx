import Reveal from "@/components/Reveal";
import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { posts } from "@/lib/posts";
import { serviceIcons, Star, Phone, ChevronRight, Sun, Check, Clock, Shield, MapPin, GoogleG, Wrench, FileText, Battery } from "@/components/Icons";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import SystemCheck from "@/components/SystemCheck";
import CostOfDoingNothing from "@/components/CostOfDoingNothing";
import RotatingReviews from "@/components/RotatingReviews";
import { FaqJsonLd } from "@/components/JsonLd";

const HOME_FAQS = [
  { q: "Is solar still worth it in California after NEM 3.0?", a: "Often yes — but the honest answer depends on your bill size, which utility serves you, and whether you pair battery storage. Under NEM 3.0, SCE credits exported power at a fraction of what you pay to buy it back, so storage usually makes the math work. City of Riverside homes on RPU have friendlier rules. We run your real numbers and tell you straight — even when the answer is 'not yet.'" },
  { q: "What does solar cost in the Inland Empire?", a: "Local 2026 market data runs around $2.29 per watt installed — roughly $20,000 for a typical 8–9 kW system before add-ons, with batteries adding a real five-figure line item. Your written quote shows the full cash price, the financed price, and the difference between them, so dealer fees have nowhere to hide." },
  { q: "Do you serve my city?", a: "We serve the entire Inland Empire — Riverside, Moreno Valley, Corona, Fontana, Menifee, Temecula, Murrieta, Eastvale, and the surrounding communities in Riverside and San Bernardino counties." },
  { q: "What's different about your quotes?", a: "Everything is in writing before you sign: system price, monthly payment, escalator (we don't use one), rate assumptions behind the savings math, equipment models, and who holds every warranty. If a number isn't on the page, it doesn't exist." },
  { q: "Do you still get the federal solar tax credit?", a: "The 30% federal credit for homeowner-owned systems expired for installations placed in service after December 31, 2025. Any company quoting it on a 2026 owned system is out of date — and that's worth knowing about them. We quote current law only." },
  { q: "My solar installer disappeared. Can you help?", a: "Yes — orphaned systems are a core service, not a favor. We diagnose and repair systems we didn't install, get monitoring back online, and handle manufacturer warranty claims where they apply." },
  { q: "Do you offer financing?", a: "Yes — cash, loan, and third-party options, compared honestly side by side, including the dealer-fee difference between cash and financed pricing. You pick the column that fits your life; we'll tell you what we'd do in your seat." },
  { q: "How fast can you install?", a: "Design and paperwork take days; the city permit and utility steps set the calendar, which we manage and keep you posted on weekly. The install itself is typically one to two days on your roof." },
];

export default function Home() {
  return (
    <>
      <FaqJsonLd faqs={HOME_FAQS} />
      <Hero />
      <TrustBar />
      <DaylightDeal />
      <RateMath />
      <PhotoBand />
      <ServicesSection />
      <StandardCta />
      <Programs />
      <LocalService />
      <FaqSection />
      <RescueCta />
      <Reviews />
      <HomeBlog />
    </>
  );
}

/* ------------------------------------------------------------------ Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-700 to-navy-950 pt-24">
      <div className="hero-mountains absolute inset-0" aria-hidden />
      <div className="container-x relative grid gap-8 pt-5 pb-12 sm:pt-10 lg:grid-cols-[1fr_minmax(0,26.5rem)] lg:items-center lg:gap-14 lg:py-16 xl:grid-cols-[1fr_minmax(0,28rem)]">
        {/* Left — headline + trust (desktop) */}
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-white/40">
              <GoogleG className="h-4 w-4" />
            </span>
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5" />)}
            </div>
            <span className="font-[family-name:var(--font-montserrat)] text-xs font-bold uppercase tracking-wider text-ice-200 sm:text-sm">
              Riverside · Moreno Valley · The Inland Empire
            </span>
          </div>
          <h1 className="iced iced-light mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Your Power Bill Isn&apos;t Coming Back Down.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            SCE&apos;s rates jumped again — and the 4–9pm window is priced exactly when your AC works hardest.
            Sixty seconds of taps and we&apos;ll run what solar and storage would really do for your house:
            <b className="text-white"> every number in writing, before anyone visits.</b>
          </p>

          {/* desktop-only: CTAs + trust chips (mobile goes straight to the form) */}
          <div className="hidden lg:block">
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={site.phoneHref} className="btn btn-primary">
                <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
              </Link>
              <Link href="/contact" className="btn btn-outline-light">Book a Consult</Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ice-200/90">
              <span className="inline-flex items-center gap-1.5"><Shield className="h-4 w-4" /> Licensed &amp; insured</span>
              <span className="inline-flex items-center gap-1.5"><FileText className="h-4 w-4" /> Every number in writing</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" /> We&apos;ll say &quot;no sale&quot; when it doesn&apos;t pencil</span>
            </div>
          </div>
        </div>

        {/* Right — the 60-second check, reviews right under it */}
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="mb-3 flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-center ring-1 ring-turquoise/40 backdrop-blur-sm">
            <Sun className="h-4 w-4 shrink-0 text-turquoise" />
            <p className="text-[0.7rem] font-bold uppercase tracking-wider text-white sm:text-xs">
              The Daylight Deal: every number in writing · {site.programs.priceLockDays}-day price lock
            </p>
          </div>
          <SystemCheck />
          <div className="mt-4">
            <RotatingReviews />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Trust bar */
function TrustBar() {
  return (
    <div className="bg-gradient-to-r from-[#f5a623] via-[#ef8412] to-[#e8650a] py-3.5">
      <div className="container-x text-center font-[family-name:var(--font-montserrat)] text-sm font-bold uppercase tracking-wide text-white sm:text-base">
        Locally owned &amp; operated&nbsp; | &nbsp;Licensed &amp; insured&nbsp; | &nbsp;Serving the entire Inland&nbsp;Empire
      </div>
    </div>
  );
}

/* ------------------------------------------------- The math, taught first */
function RateMath() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ice-600">Before anyone sells you anything</p>
          <h2 className="iced iced-dark mt-2 text-3xl sm:text-4xl">The Three Numbers On Your Bill</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Solar isn&apos;t magic — it&apos;s arithmetic against a bill built from three parts. Understand them
            and every quote in your inbox (including ours) gets easier to judge.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "≈35¢",
              t: "The average rate — and climbing",
              b: "SCE's average residential rate rose roughly 13% in one step in late 2025, to about 35¢ per kWh, with more increases proposed through 2028. Conservation nibbles; the trajectory bites.",
            },
            {
              n: "4–9pm",
              t: "The window priced against you",
              b: "Time-of-use plans bill early evening — dinner, laundry, and the AC recovering from a 105° afternoon — at the day's highest rates. Summer peaks on some plans run past 50¢/kWh.",
            },
            {
              n: "$24.15",
              t: "The charge you can't conserve away",
              b: "The fixed monthly Base Services Charge applies no matter how little you use. It's the part of the bill your thermostat discipline will never touch.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-[var(--radius-card)] border border-ice-100 bg-ice-50 p-7">
              <p className="font-[family-name:var(--font-montserrat)] text-4xl font-900 font-extrabold text-navy-800">{c.n}</p>
              <p className="mt-2 font-bold text-navy-800">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.b}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-turquoise/30 bg-gold/5 p-5 text-center">
          <p className="text-sm leading-relaxed text-slate-700">
            <b className="text-navy-800">Here&apos;s the reframe that matters:</b> you&apos;re already on a solar
            payment plan — it&apos;s just called an electric bill, it goes up every year, and after 25 years of
            paying it you own nothing. The design question is whether redirecting that same payment into equipment
            you own pencils for <i>your</i> house — and the answer belongs in writing.
            <span className="mt-2 block text-xs text-slate-500">Figures are 2026 SCE residential values and change with rate cases. City-utility customers (Riverside RPU, Colton, Banning) have different — often friendlier — math.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- Cinematic photo band */
function PhotoBand() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/photos/rooftop-golden-hour.webp"
        alt="Illustrative visualization: all-black solar panels on a Spanish-tile Inland Empire home at golden hour"
        className="h-[26rem] w-full object-cover sm:h-[30rem]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/25 to-transparent" />
      <div className="container-x absolute inset-x-0 bottom-0 pb-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise">Tile roofs. Triple-digit summers. This is home.</p>
        <h2 className="iced iced-light mt-2 max-w-2xl text-3xl sm:text-4xl">
          Designed For The Roofs We Grew Up Under
        </h2>
        <p className="mt-3 max-w-xl text-white/85">
          Tile-specific mounts, heat-rated hardware, and layouts drawn from your actual usage —
          because an Inland Empire roof is not a template.
        </p>
      </div>
      <span className="absolute right-4 top-4 rounded-full bg-navy-900/60 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
        Visualization
      </span>
    </section>
  );
}

/* --------------------------------------------------------------- Services */
function ServicesSection() {
  const [feature, ...rest] = services;
  const FeatureIcon = serviceIcons[feature.icon];
  return (
    <section className="bg-gradient-to-b from-ice-50 to-ice-100 py-16 sm:py-24" id="services">
      <div className="container-x">
        <div className="text-center">
          <h2 className="iced iced-dark text-3xl sm:text-4xl">Our Services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            One accountable team for the whole electric side of your home — designed off your real usage, never a template.
          </p>
        </div>

        <Link href={`/services/${feature.slug}`}
          className="group relative mt-10 flex flex-col items-center overflow-hidden rounded-[var(--radius-card)] bg-navy-800 px-6 py-10 text-center text-white shadow-[0_30px_60px_-30px_rgba(11,29,54,0.6)] transition hover:-translate-y-1">
          <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-turquoise to-red-brand text-white shadow-lg">
            <FeatureIcon className="h-8 w-8" />
          </span>
          <h3 className="iced relative mt-5 text-2xl font-extrabold uppercase text-white">{feature.name}</h3>
          <p className="relative mt-3 max-w-2xl text-white/90">{feature.short}</p>
          <span className="relative mt-5 inline-flex items-center gap-1.5 font-bold text-turquoise group-hover:text-white">
            Learn More <ChevronRight className="h-4 w-4" />
          </span>
        </Link>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Link key={s.slug} href={`/services/${s.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white p-7 text-center shadow-sm ring-1 ring-ice-100 transition hover:-translate-y-1">
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ice-500 to-navy-800 text-white shadow-lg">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="iced relative mt-4 text-lg font-extrabold uppercase text-navy-800">{s.name}</h3>
                <p className="relative mt-2 flex-1 text-sm text-slate-600">{s.short}</p>
                <span className="relative mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-bold text-ice-600">
                  Learn More <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}

          <Link href={site.phoneHref}
            className="group flex flex-col items-center justify-center rounded-[var(--radius-card)] bg-red-brand p-7 text-center text-white shadow-sm transition hover:-translate-y-1">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Phone className="h-7 w-7" />
            </span>
            <h3 className="iced mt-4 text-lg font-extrabold uppercase text-white">Talk To A Human</h3>
            <p className="mt-2 flex-1 text-sm text-white/90">Real questions deserve real answers — no scripts, no pressure. Tap to call now.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
              {site.phoneDisplay} <ChevronRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- The Daylight Standard */
function StandardCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ice-100 via-ice-500 to-navy-700 pt-16 pb-20">
      {/* The wrapped van — brand identity render, floating on the gradient */}
      <div className="container-x relative">
        <Reveal from="right" className="relative mx-auto max-w-4xl">
          <div className="pointer-events-none absolute inset-x-16 bottom-3 h-10 rounded-[50%] bg-black/30 blur-2xl" aria-hidden />
          <img
            src="/van.webp"
            alt="Daylight Solar wrapped Sprinter service van"
            width={1400}
            height={860}
            className="relative mx-auto h-auto w-full drop-shadow-[0_30px_45px_rgba(5,14,29,0.4)]"
          />
        </Reveal>
      </div>

      <div className="container-x relative mt-10 grid items-center gap-10 lg:grid-cols-2">
        <div className="text-white">
          <p className="font-[family-name:var(--font-montserrat)] text-lg font-bold uppercase tracking-wide text-ice-100">
            Every quote we write follows
          </p>
          <h2 className="iced iced-light mt-2 text-3xl sm:text-4xl">The Daylight Standard</h2>
          <p className="mt-4 max-w-xl text-white/90">
            Ten written commitments that make a solar contract readable — the whole price on page one,
            no escalator games, no lien surprises, and a company that will tell you <i>not</i> to buy
            when the math says so. Bring the ten questions to any solar company. Especially us.
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-semibold text-white">
            {["Price In Writing First", "No Escalator Games", "Honest 'No-Sale' Verdicts"].map((b, i) => (
              <li key={b} className="flex items-center gap-3">
                {i > 0 && <Sun className="h-4 w-4 text-turquoise" />}
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/our-promise" className="btn btn-primary">Read the 10 Commitments</Link>
            <Link href="/quote" className="btn btn-outline-light">Start the 60-Second Check</Link>
          </div>
        </div>

        <div className="relative">
          <Reveal from="right">
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm ring-1 ring-white/20">
              <div className="grid grid-cols-3 gap-4 text-center text-white">
                {[
                  { icon: FileText, label: "Whole Price, Page One" },
                  { icon: Shield, label: "One Warranty Chain" },
                  { icon: Battery, label: "Utility-Matched Design" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-2xl bg-white/10 p-4">
                    <Icon className="mx-auto h-7 w-7 text-turquoise" />
                    <p className="mt-2 text-xs font-semibold">{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-white/80">
                A contract you can read in daylight is the entire brand. It&apos;s in the name.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
      <WaveBottom />
    </section>
  );
}

/* --------------------------------------------------------- Local service */
function LocalService() {
  return (
    <section className="bg-white pt-6 pb-16 sm:pt-14 sm:pb-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal from="left" className="relative">
          <div className="rounded-3xl bg-navy-800 p-8 text-white shadow-[0_30px_60px_-24px_rgba(11,29,54,0.5)] sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise">Why local wins in solar</p>
            <div className="mt-5 space-y-5">
              {[
                { t: "National quotes run ~10% higher.", b: "Marketplace data shows national installers averaging about 10% above local companies for the same hardware — door-to-door commissions have to come from somewhere." },
                { t: "We know which utility bills you.", b: "SCE, Riverside's RPU, Moreno Valley Utility, Colton, Banning — the design rules change at the city line, and quoting the wrong ones is the most common IE solar mistake." },
                { t: "We're here after the install.", b: "The IE is full of orphaned systems whose installers vanished. Our service department fixes them — which tells you how we think about year 15 of your warranty." },
              ].map((item) => (
                <div key={item.t} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-turquoise text-navy-900">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-bold text-white">{item.t}</p>
                    <p className="text-sm text-white/80">{item.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div>
          <h2 className="iced iced-dark text-3xl sm:text-4xl">Inland Empire Local, On Purpose</h2>
          <p className="mt-5 text-slate-600">
            {site.name} designs and installs solar, storage, and the electrical work underneath them
            across Riverside and San Bernardino counties. No fly-in sales crews, no call centers,
            no &quot;area manager&quot; three states away — a local team that answers to its neighbors,
            because its neighbors know where we work.
          </p>
          <div className="mt-6 space-y-5">
            {[
              { t: "Consultants Paid For Accuracy, Not Tonnage.", b: "Nobody here earns more by selling you a bigger system than your usage supports. That one incentive choice explains most of how we behave." },
              { t: "Licensed, Insured, and Verifiable.", b: "Check any California contractor at the CSLB before signing — including us. We put the license number on everything because you should be looking it up." },
              { t: "Fast Answers Across the Metro.", b: "Riverside, Moreno Valley, Corona, Fontana, Menifee, Temecula, and every community between — consults scheduled fast, numbers delivered faster." },
            ].map((item) => (
              <div key={item.t} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ice-500 text-white">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-bold text-navy-800">{item.t}</p>
                  <p className="text-sm text-slate-600">{item.b}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="btn btn-outline-navy">About {site.shortName}</Link>
            <Link href="/service-areas" className="btn btn-primary">
              <MapPin className="h-4 w-4" /> See Service Areas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- FAQ */
function FaqSection() {
  return (
    <section className="bg-navy-800 py-16 sm:py-24" id="faq">
      <div className="container-x">
        <h2 className="iced iced-light text-center text-3xl sm:text-4xl">Frequently Asked Questions</h2>
        <div className="mx-auto mt-10 max-w-5xl">
          <Faq items={HOME_FAQS} dark />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ Orphan rescue */
function RescueCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#f5a623] via-[#ef8412] to-[#e8650a] py-16">
      <div className="container-x relative text-center text-white">
        <h2 className="iced iced-light text-3xl sm:text-4xl">Solar Installer Vanished? You&apos;re Not Stuck.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/95">
          Dead inverter, red lights, a monitoring app that stopped updating — and a phone number that
          stopped answering. We service systems we didn&apos;t install, and we&apos;ll tell you what
          yours is actually producing.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={site.phoneHref} className="btn bg-white text-red-brand hover:bg-ice-100">
            <Phone className="h-4 w-4" /> {site.phoneDisplay}
          </Link>
          <Link href="/services/solar-repair-service" className="btn btn-outline-light">
            <Wrench className="h-4 w-4" /> Solar Rescue
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- Blog under reviews */
function HomeBlog() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ice-600">Knowledge is free here</p>
            <h2 className="iced iced-dark mt-2 text-3xl sm:text-4xl">Solar Guides &amp; Straight Answers</h2>
            <p className="mt-3 max-w-xl text-slate-600">
              The same explanations our consultants give at kitchen tables — NEM 3.0, real costs, and the scams to dodge.
            </p>
          </div>
          <Link href="/blog" className="btn btn-outline-navy shrink-0">All Guides</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-sm ring-1 ring-ice-100 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative flex aspect-[1200/630] items-end overflow-hidden bg-gradient-to-br from-navy-800 via-navy-700 to-ice-700 p-5">
                <span className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-turquoise to-red-brand" aria-hidden />
                <Sun className="absolute right-4 top-4 h-8 w-8 text-turquoise/70" aria-hidden />
                <p className="font-[family-name:var(--font-montserrat)] text-lg font-extrabold uppercase leading-tight text-white">
                  {p.title.split(":")[0]}
                </p>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-ice-600">{p.readMinutes} min read</p>
                <h3 className="mt-2 flex-1 font-[family-name:var(--font-montserrat)] text-lg font-extrabold leading-snug text-navy-800 transition group-hover:text-ice-600">
                  {p.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-ice-600">
                  Read the guide <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ------------------------------------------------- The Daylight Deal */
function DaylightDeal() {
  const STACK = [
    { t: "Cash price AND financed price, side by side", b: "The gap between them is the dealer fee everyone else hides inside a “low monthly payment.” On our quote, it’s printed." },
    { t: "Designed for the utility that actually bills you", b: "SCE’s NEM 3.0, Riverside’s RPU, Moreno Valley Utility, Colton, Banning — the math changes at the city line. Your design follows your bill’s rules." },
    { t: "25-year math with visible assumptions", b: "Every savings projection states its assumed utility rates, year by year. “Up to” is not a number." },
    { t: "No escalator — in bold print", b: "Payments that climb every year for 25 years are how this industry mints regret. Our default structures don’t escalate, ever." },
    { t: "The Honest Verdict", b: "If solar doesn’t pencil for your house, we say so — in writing — and you keep the full analysis. A company that can’t say no can’t be trusted saying yes." },
    { t: `Locked for ${site.programs.priceLockDays} days`, b: "A real offer survives the night. Our numbers are good tomorrow, next week, and next month — countdown clocks are for deals that can’t survive daylight." },
  ];
  return (
    <section className="bg-gradient-to-b from-white to-ice-50 py-16 sm:py-24" id="deal">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-brand">The Daylight Deal</p>
          <h2 className="iced iced-dark mt-2 text-3xl sm:text-4xl">Six Promises. Zero Fine-Print Games.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Other companies stack incentives. We stack the protections that make a 25-year decision safe —
            because in this market, the paperwork you can read <i>is</i> the incentive.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.15fr_1fr]">
          {/* the stack */}
          <div className="space-y-4">
            {STACK.map((it, i) => (
              <Reveal key={it.t} from="up" delay={Math.min(i, 5) * 60}>
                <div className="flex items-start gap-4 rounded-2xl border border-ice-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-turquoise to-red-brand text-white">
                    <Check className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-montserrat)] font-extrabold text-navy-800">{it.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{it.b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* the consequence they can drag to — their bill, their horizon */}
          <Reveal from="right" className="lg:sticky lg:top-28">
            <CostOfDoingNothing />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Programs */
function Programs() {
  const CARDS = [
    {
      icon: Shield,
      kicker: "Heroes Priority Program",
      title: "For those who show up for everyone else",
      body: "Active military, veterans, first responders, teachers, and nurses get priority install scheduling — and we donate " + site.programs.heroDonation + " in your name to the school, station, or unit you choose.",
      foot: "Verified at consult · stacks with any written quote",
    },
    {
      icon: Wrench,
      kicker: "Solar Rescue Credit",
      title: "Orphaned system? Your diagnosis pays you back",
      body: "If your installer vanished, our full system audit and production report is credited 100% toward any repair or upgrade we do. You learn the truth about your system either way.",
      foot: "Applies to systems we didn’t install · no lectures included",
    },
    {
      icon: FileText,
      kicker: "The Bill-Beat Pledge",
      title: "If we can’t beat your bill, we’ll say so",
      body: "If an honestly designed system can’t deliver a payment below your current average electric cost, we tell you to wait — in writing — and what would have to change for the math to work.",
      foot: "The no-sale verdict, guaranteed on paper",
    },
  ];
  return (
    <section className="bg-white py-16 sm:py-24" id="programs">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ice-600">Programs you may qualify for</p>
          <h2 className="iced iced-dark mt-2 text-3xl sm:text-4xl">More Than A Quote</h2>
          <p className="mt-4 text-slate-600">
            Tell us what applies to you in the 60-second check and we match you automatically — no coupon codes, no hoops.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.kicker} from="up" delay={i * 80}>
                <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-ice-100 bg-gradient-to-b from-white to-ice-50 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500 to-navy-800 text-white shadow-lg"><Icon className="h-6 w-6" /></span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-red-brand">{c.kicker}</p>
                  <h3 className="mt-1.5 font-[family-name:var(--font-montserrat)] text-lg font-extrabold leading-snug text-navy-800">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{c.body}</p>
                  <p className="mt-4 border-t border-ice-100 pt-3 text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400">{c.foot}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href="/quote" className="btn btn-primary">See which programs I qualify for</Link>
          <p className="mx-auto mt-4 max-w-xl text-xs text-slate-400">
            Program benefits require qualification and are confirmed in your written quote. Availability may vary by location and home.
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- wave dividers */
function WaveBottom() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 leading-[0] text-white">
      <svg viewBox="0 0 1440 120" className="h-16 w-full" preserveAspectRatio="none" fill="currentColor">
        <path d="M0 120h1440V70c-200 40-420 54-720 34C420 82 220 92 0 60z" />
      </svg>
    </div>
  );
}
