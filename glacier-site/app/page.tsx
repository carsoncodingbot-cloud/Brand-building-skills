import Mascot from "@/components/Mascot";
import Reveal from "@/components/Reveal";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { serviceIcons, Star, Phone, ChevronRight, Snowflake, Check, Clock, Shield, MapPin, GoogleG, Wrench } from "@/components/Icons";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import { FaqJsonLd } from "@/components/JsonLd";
import vanImg from "../public/van.webp";
import techImg from "../public/tech.webp";
import clubLogo from "../public/glacier-club-logo.png";

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
    <section className="relative overflow-hidden bg-gradient-to-b from-ice-500 to-navy-800 pt-24">
      <div className="hero-mountains absolute inset-0" aria-hidden />
      <div className="container-x relative grid items-center gap-8 pt-14 pb-6 sm:py-20 lg:grid-cols-2 lg:py-24">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-white/40">
              <GoogleG className="h-4 w-4" />
            </span>
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5" />)}
            </div>
            <span className="font-[family-name:var(--font-montserrat)] text-xs font-bold uppercase tracking-wider text-ice-200 sm:text-sm">
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
          {/* frosty glow halo behind the mascot */}
          <div className="pointer-events-none absolute left-1/2 top-[42%] -z-0 h-[80%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-turquoise/30 blur-3xl" aria-hidden />
          {/* Clipping wrapper: crops the mascot's now-transparent bottom so he
              sits grounded with no empty gap. Aspect ≈ the visible art height. */}
          <div
            className="relative mx-auto w-[86%] max-w-sm animate-float overflow-hidden lg:w-full lg:max-w-lg"
            style={{ aspectRatio: "896 / 884" }}
          >
            <Mascot
              alt="Glacier Heating & Air yeti mascot giving a thumbs up"
              width={896} height={1200} priority
              sizes="(max-width: 1024px) 86vw, 40vw"
              className="h-auto w-full object-contain"
            />
          </div>
          {/* floating Google-reviews trust badge */}
          <div className="absolute bottom-1 left-0 hidden rounded-2xl bg-white/95 px-4 py-3 shadow-xl ring-1 ring-ice-100 backdrop-blur sm:block lg:-left-4">
            <div className="flex items-center gap-2">
              <GoogleG className="h-5 w-5" />
              <span className="font-[family-name:var(--font-montserrat)] text-sm font-extrabold text-navy-800">{site.ratingValue}</span>
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5" />)}
              </div>
            </div>
            <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500">{site.reviewCount}+ Google reviews</p>
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
          {/* Plumbing — sits between Water Heaters and the Emergency card */}
          <Link href="/plumbing"
            className="group flex flex-col rounded-[var(--radius-card)] bg-navy-800 p-7 text-center text-white shadow-sm transition hover:-translate-y-1">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ice-500 text-white">
              <Wrench className="h-7 w-7" />
            </span>
            <h3 className="iced mt-4 text-lg font-extrabold uppercase text-white">Plumbing</h3>
            <p className="mt-2 flex-1 text-sm text-white/80">From leaks and clogged drains to water heater installs and fixture upgrades — we keep your home&apos;s plumbing running smoothly.</p>
            <span className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-bold text-ice-300 group-hover:text-white">
              Learn More <ChevronRight className="h-4 w-4" />
            </span>
          </Link>

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
    <section className="relative overflow-hidden bg-gradient-to-b from-ice-100 via-ice-500 to-ice-700 pt-16 pb-20 sm:pt-8">
      {/* Wrapped van — slides in from the right, floating on a blended gradient */}
      <div className="container-x relative">
        <Reveal from="right" className="relative mx-auto max-w-4xl">
          <div className="pointer-events-none absolute inset-x-16 bottom-3 h-10 rounded-[50%] bg-black/30 blur-2xl" aria-hidden />
          <Image
            src={vanImg}
            alt="Glacier Heating & Air wrapped Mercedes-Benz Sprinter service van"
            priority
            sizes="(max-width: 1024px) 92vw, 900px"
            className="relative mx-auto h-auto w-full drop-shadow-[0_30px_45px_rgba(0,20,45,0.4)]"
          />
        </Reveal>
      </div>

      <div className="container-x relative mt-10 grid items-center gap-10 lg:grid-cols-2">
        <div className="text-white">
          <p className="font-[family-name:var(--font-montserrat)] text-lg font-bold uppercase tracking-wide text-ice-100">
            Save money by joining the
          </p>
          <h2 className="sr-only">Glacier Club</h2>
          <Image
            src={clubLogo}
            alt="Glacier Club"
            sizes="(max-width: 640px) 70vw, 340px"
            className="mt-3 h-auto w-full max-w-xs drop-shadow-[0_10px_28px_rgba(0,20,45,0.45)]"
          />
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
    <section className="bg-white pt-6 pb-16 sm:pt-14 sm:pb-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal from="left" className="relative">
          <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_60px_-24px_rgba(0,43,88,0.5)] ring-1 ring-ice-100">
            <Image
              src={techImg}
              alt="Glacier Heating & Air technician servicing an AC condenser in San Antonio"
              sizes="(max-width: 1024px) 92vw, 560px"
              className="aspect-[4/5] w-full object-cover sm:aspect-[4/3]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-800/90 via-navy-800/45 to-transparent p-6 pt-16">
              <div className="flex items-center gap-2 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" />)}
              </div>
              <p className="mt-1.5 text-sm font-semibold text-white">
                Certified local technicians serving San Antonio since {site.foundedYear}.
              </p>
            </div>
          </div>
        </Reveal>
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
function WaveBottom() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 leading-[0] text-white">
      <svg viewBox="0 0 1440 120" className="h-16 w-full" preserveAspectRatio="none" fill="currentColor">
        <path d="M0 120h1440V70c-200 40-420 54-720 34C420 82 220 92 0 60z" />
      </svg>
    </div>
  );
}
