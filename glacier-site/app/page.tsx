import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { serviceIcons, Star, Phone, ChevronRight, Snowflake, Check, Clock, Shield, MapPin } from "@/components/Icons";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import { FaqJsonLd } from "@/components/JsonLd";

const HOME_FAQS = [
  { q: "What HVAC services do you offer?", a: "We provide air conditioning repair and installation, heating and furnace service, indoor air quality solutions, ductless mini-splits, water heaters, and commercial HVAC across greater San Antonio — plus 24/7 emergency service." },
  { q: "Do you offer emergency service?", a: `Yes. San Antonio heat doesn't keep business hours, and neither do we. Call ${site.phoneDisplay} any time, day or night, and we'll prioritize no-cool and no-heat emergencies.` },
  { q: "What areas do you serve?", a: "All of greater San Antonio — including Stone Oak, Alamo Heights, Boerne, New Braunfels, Schertz, Cibolo, Helotes, Converse, and the surrounding Hill Country and I-35 communities." },
  { q: "Are your technicians certified?", a: "Absolutely. Every Glacier technician is certified, background-checked, and receives ongoing training so you get service from people who genuinely know HVAC — not guesswork." },
  { q: "How can I book service?", a: "Call us, use the contact form, or request service online. We respond quickly and work around your schedule to find a time that fits." },
  { q: "Do you offer maintenance plans?", a: "Yes — the Glacier Club. Members get seasonal tune-ups, priority scheduling, discounted repairs, and a system that lasts longer and runs more efficiently." },
  { q: "Are you locally owned?", a: "100% family-owned and operated right here in San Antonio. No private equity, no call centers — just a local team that answers to its neighbors." },
  { q: "Do you offer financing?", a: "Yes. We offer flexible financing on qualifying installations so a new system fits your budget. Ask us about current options when you book." },
];

export default function Home() {
  return (
    <>
      <FaqJsonLd faqs={HOME_FAQS} />
      <Hero />
      <TrustBar />
      <ServicesSection />
      <GlacierClubCta />
      <LocalService />
      <FaqSection />
      <EmergencyCta />
      <Reviews />
    </>
  );
}

/* ------------------------------------------------------------------ Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ice-500 to-navy-800 pt-20">
      <div className="hero-mountains absolute inset-0" aria-hidden />
      <div className="container-x relative grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-2 lg:py-24">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5" />)}
            </div>
            <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold uppercase tracking-wider text-ice-200">
              Top-Rated San Antonio HVAC
            </span>
          </div>
          <h1 className="iced iced-light mt-5 text-4xl sm:text-5xl lg:text-6xl">
            Comprehensive HVAC Services in San Antonio, Texas
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            Whether you need fast AC repair, a new high-efficiency system, or 24/7 emergency help,
            Glacier&apos;s certified technicians keep your home comfortable through every Texas season.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Schedule Online</Link>
            <Link href={site.phoneHref} className="btn btn-outline-light">
              <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="animate-float">
            <Image
              src={site.mascotUrl}
              alt="Glacier Heating & Air yeti mascot giving a thumbs up"
              width={896} height={1200} priority
              className="mx-auto h-auto w-[78%] max-w-sm object-contain drop-shadow-[0_20px_40px_rgba(0,20,45,0.45)] lg:w-full lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Trust bar */
function TrustBar() {
  return (
    <div className="bg-gradient-to-r from-[#f7941d] via-[#f15a24] to-[#e11f26] py-3.5">
      <div className="container-x text-center font-[family-name:var(--font-montserrat)] text-sm font-bold uppercase tracking-wide text-white sm:text-base">
        Family-owned &amp; operated&nbsp; | &nbsp;Licensed &amp; insured&nbsp; | &nbsp;Serving all of Greater San Antonio
      </div>
    </div>
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
            One trusted team for everything that keeps your home comfortable — cooling, heating, air quality, and more.
          </p>
        </div>

        <Link href={`/services/${feature.slug}`}
          className="group mt-10 flex flex-col items-center rounded-[var(--radius-card)] bg-navy-800 px-6 py-10 text-center text-white shadow-[0_30px_60px_-30px_rgba(0,43,88,0.6)] transition hover:-translate-y-1">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ice-500 text-white">
            <FeatureIcon className="h-8 w-8" />
          </span>
          <h3 className="iced mt-5 text-2xl font-extrabold uppercase text-white">{feature.name}</h3>
          <p className="mt-3 max-w-2xl text-white/80">{feature.short}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 font-bold text-ice-300 group-hover:text-white">
            Learn More <ChevronRight className="h-4 w-4" />
          </span>
        </Link>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            const dark = i % 2 === 1;
            return (
              <Link key={s.slug} href={`/services/${s.slug}`}
                className={`group flex flex-col rounded-[var(--radius-card)] p-7 text-center shadow-sm transition hover:-translate-y-1 ${
                  dark ? "bg-navy-800 text-white" : "bg-white ring-1 ring-ice-100"
                }`}>
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ice-500 text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className={`iced mt-4 text-lg font-extrabold uppercase ${dark ? "text-white" : "text-navy-800"}`}>{s.name}</h3>
                <p className={`mt-2 flex-1 text-sm ${dark ? "text-white/80" : "text-slate-600"}`}>{s.short}</p>
                <span className={`mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-bold ${dark ? "text-ice-300 group-hover:text-white" : "text-ice-600"}`}>
                  Learn More <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
          <Link href={site.phoneHref}
            className="group flex flex-col items-center justify-center rounded-[var(--radius-card)] bg-red-brand p-7 text-center text-white shadow-sm transition hover:-translate-y-1">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Clock className="h-7 w-7" />
            </span>
            <h3 className="iced mt-4 text-lg font-extrabold uppercase text-white">24/7 Emergency</h3>
            <p className="mt-2 flex-1 text-sm text-white/90">No cool? No heat? We answer day or night. Tap to call now.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">
              {site.phoneDisplay} <ChevronRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Glacier Club */
function GlacierClubCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ice-600 to-ice-700 py-20">
      <WaveTop />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-2">
        <div className="text-white">
          <p className="font-[family-name:var(--font-montserrat)] text-lg font-bold uppercase tracking-wide text-ice-100">
            Save money by joining the
          </p>
          <h2 className="iced iced-light mt-2 text-4xl sm:text-5xl">Glacier Club</h2>
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-semibold text-white">
            {["Routine Tune-Ups", "Lower Repair Costs", "Priority Scheduling"].map((b, i) => (
              <li key={b} className="flex items-center gap-3">
                {i > 0 && <Snowflake className="h-4 w-4 text-turquoise" />}
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={site.phoneHref} className="btn btn-primary">Call to Join</Link>
            <Link href="/glacier-club" className="btn btn-outline-light">Learn More</Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm ring-1 ring-white/20">
            <div className="grid grid-cols-3 gap-4 text-center text-white">
              {[
                { icon: Check, label: "2 Seasonal Tune-Ups" },
                { icon: Shield, label: "15% Off Repairs" },
                { icon: Clock, label: "Front-of-Line Service" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-2xl bg-white/10 p-4">
                  <Icon className="mx-auto h-7 w-7 text-turquoise" />
                  <p className="mt-2 text-xs font-semibold">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-white/80">
              Membership pays for itself with one avoided breakdown.
            </p>
          </div>
        </div>
      </div>
      <WaveBottom />
    </section>
  );
}

/* --------------------------------------------------------- Local service */
function LocalService() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-ice-200 to-ice-500 shadow-xl ring-1 ring-ice-100">
            <div className="flex h-full flex-col items-center justify-center p-8 text-center text-white">
              <Image src={site.mascotUrl} alt="Glacier technician mascot" width={300} height={400}
                className="h-48 w-auto object-contain drop-shadow-xl" />
              <p className="mt-4 max-w-xs text-sm font-semibold text-white/90">
                Certified local technicians serving San Antonio neighborhoods since {site.foundedYear}.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="iced iced-dark text-3xl sm:text-4xl">Local Service You Can Count On</h2>
          <p className="mt-5 text-slate-600">
            Glacier Heating &amp; Air keeps homes and businesses comfortable across greater San Antonio.
            Whether it&apos;s AC repair, heating service, preventative maintenance, or cleaner indoor air,
            our team gets your system running the way it should.
          </p>
          <div className="mt-6 space-y-5">
            {[
              { t: "Certified Technicians. Ongoing Training.", b: "Real expertise, not guesswork — our techs stay current on the latest systems and best practices." },
              { t: "Local, Family-Owned, and Staying That Way.", b: "No private equity, no call centers. Just a San Antonio team that answers to its neighbors." },
              { t: "Fast Response Across the Metro.", b: "Trucks stocked and dispatched across Bexar, Comal, Guadalupe, and Kendall counties." },
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
            <Link href="/about" className="btn btn-outline-navy">About Glacier</Link>
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

/* ------------------------------------------------------------ Emergency */
function EmergencyCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#f7941d] via-[#f15a24] to-[#e11f26] py-16">
      <div className="container-x relative text-center text-white">
        <h2 className="iced iced-light text-3xl sm:text-4xl">Emergency HVAC? We&apos;re On Call 24/7</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          Don&apos;t let a breakdown leave you sweating or shivering. Rapid, reliable repair service any time, day or night.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={site.phoneHref} className="btn bg-white text-red-brand hover:bg-ice-100">
            <Phone className="h-4 w-4" /> {site.phoneDisplay}
          </Link>
          <Link href="/contact" className="btn btn-outline-light">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- wave dividers */
function WaveTop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 leading-[0] text-ice-500">
      <svg viewBox="0 0 1440 120" className="h-16 w-full" preserveAspectRatio="none" fill="currentColor">
        <path d="M0 0h1440v40c-180 40-360 60-720 40C420 104 200 90 0 60z" />
      </svg>
    </div>
  );
}
function WaveBottom() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 leading-[0] text-white">
      <svg viewBox="0 0 1440 120" className="h-16 w-full" preserveAspectRatio="none" fill="currentColor">
        <path d="M0 120h1440V70c-200 40-420 54-720 34C420 82 220 92 0 60z" />
      </svg>
    </div>
  );
}
