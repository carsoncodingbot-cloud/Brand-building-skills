import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { tier1Cities } from "@/lib/cities";
import { site } from "@/lib/site";
import { serviceIcons, Check, Phone, ChevronRight, Shield, Clock, Star, MapPin, Snowflake } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.h1,
    description: s.intro.slice(0, 155),
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.h1, description: s.intro.slice(0, 155), url: `/services/${s.slug}` },
  };
}

const PROCESS = [
  { t: "Book in Minutes", b: "Call or schedule online and we'll lock in an arrival window that fits your day — often same-day for urgent no-cool and no-heat calls." },
  { t: "Upfront Diagnosis", b: "A certified technician inspects your system, pinpoints the real problem, and explains your options with honest, upfront pricing before any work begins." },
  { t: "Done Right the First Time", b: "We complete the repair or install with quality parts, protect your home, clean up fully, and back the work with our workmanship guarantee." },
];

const WHY = [
  { icon: Shield, t: "Certified & Background-Checked", b: "Every tech is trained, vetted, and uniformed." },
  { icon: Clock, t: "24/7 Emergency Response", b: "We answer day or night when comfort can't wait." },
  { icon: Check, t: "Upfront, Honest Pricing", b: "Clear quotes before we start — never a surprise." },
  { icon: Star, t: `${site.ratingValue}★ Google-Rated`, b: `${site.reviewCount}+ San Antonio homeowners and counting.` },
  { icon: MapPin, t: "Local & Family-Owned", b: "No call centers, no private equity — just neighbors." },
  { icon: Snowflake, t: "Workmanship Guarantee", b: "We stand behind every repair and installation." },
];

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const Icon = serviceIcons[s.icon];
  const url = `${site.url}/services/${s.slug}`;

  return (
    <>
      <ServiceJsonLd name={s.name} description={s.intro} url={url} />
      {s.faqs.length > 0 && <FaqJsonLd faqs={s.faqs} />}
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Services", url: "/#services" }, { name: s.name, url: `/services/${s.slug}` }]} />

      <PageHero
        title={s.h1}
        subtitle={s.intro}
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Services", href: "/#services" }, { name: s.name, href: `/services/${s.slug}` }]}
      />

      {/* Trust strip */}
      <div className="bg-gradient-to-r from-[#f7941d] via-[#f15a24] to-[#e11f26] py-3.5">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center font-[family-name:var(--font-montserrat)] text-sm font-bold uppercase tracking-wide text-white">
          <span>Same-Day Service</span><span className="hidden sm:inline text-white/50">|</span>
          <span>Upfront Pricing</span><span className="hidden sm:inline text-white/50">|</span>
          <span>24/7 Emergency Availability</span>
        </div>
      </div>

      {/* Intro + sticky booking card */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ice-500 to-navy-800 text-white shadow-lg">
                <Icon className="h-7 w-7" />
              </span>
              <h2 className="iced iced-dark text-2xl sm:text-3xl">{s.name} in San Antonio</h2>
            </div>
            <p className="mt-5 text-slate-600">{s.intro}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {s.features.map((f, i) => (
                <Reveal key={f.title} from="up" delay={i * 60}>
                  <div className="h-full rounded-2xl border border-ice-100 bg-gradient-to-b from-white to-ice-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ice-500 text-white">
                        <Check className="h-4 w-4" />
                      </span>
                      <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-navy-800">{f.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Sticky booking card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-navy-800 to-[#001a36] p-7 text-white shadow-[0_30px_60px_-24px_rgba(0,43,88,0.6)] ring-1 ring-white/10">
              <div className="flex items-center gap-1.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" />)}
                <span className="ml-1 text-sm font-semibold text-white/90">{site.ratingValue} · {site.reviewCount}+ reviews</span>
              </div>
              <h3 className="iced mt-3 text-xl font-extrabold uppercase text-white">Book {s.name}</h3>
              <p className="mt-2 text-sm text-white/80">Fast scheduling, upfront pricing, and certified San Antonio technicians.</p>
              <Link href={site.phoneHref} className="btn btn-primary mt-5 w-full">
                <Phone className="h-4 w-4" /> {site.phoneDisplay}
              </Link>
              <Link href="/contact" className="btn btn-outline-light mt-3 w-full">Schedule Online</Link>
              <ul className="mt-6 space-y-2 text-sm text-white/85">
                {["24/7 emergency availability", "Upfront, honest pricing", "Certified & background-checked techs", "Financing on qualifying installs"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-turquoise" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* How it works — process */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ice-50 to-ice-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-ice-600">Simple, Transparent Process</p>
            <h2 className="iced iced-dark mt-2 text-2xl sm:text-3xl">How Glacier Gets It Done</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROCESS.map((p, i) => (
              <Reveal key={p.t} from="up" delay={i * 90}>
                <div className="relative h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ice-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ice-500 to-navy-800 font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-white shadow-lg">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-navy-800">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose Glacier */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-800 to-[#001a36] py-16 sm:py-20">
        <div className="hero-mountains absolute inset-0 opacity-40" aria-hidden />
        <div className="container-x relative">
          <div className="text-center text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-ice-300">The Glacier Difference</p>
            <h2 className="iced iced-light mt-2 text-2xl sm:text-3xl">Why San Antonio Trusts Glacier for {s.name}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map(({ icon: WIcon, t, b }, i) => (
              <Reveal key={t} from="up" delay={i * 60}>
                <div className="flex h-full items-start gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-white/10">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500 to-turquoise text-navy-800">
                    <WIcon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-white">{t}</h3>
                    <p className="mt-1 text-sm text-white/75">{b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href={site.phoneHref} className="btn btn-primary">
              <Phone className="h-4 w-4" /> {site.phoneDisplay}
            </Link>
            <Link href="/contact" className="btn btn-outline-light">Schedule Online</Link>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <Reviews heading={`San Antonio homeowners rate our ${s.name.toLowerCase()} service`} />

      {/* FAQ */}
      {s.faqs.length > 0 && (
        <section className="bg-ice-100 py-16">
          <div className="container-x">
            <h2 className="iced iced-dark text-center text-2xl sm:text-3xl">{s.name} — Common Questions</h2>
            <div className="mx-auto mt-8 max-w-4xl">
              <Faq items={s.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="bg-white py-14">
        <div className="container-x">
          <h2 className="text-center font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-navy-800">Explore More Services</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {services.filter((x) => x.slug !== s.slug).map((x) => (
              <Link key={x.slug} href={`/services/${x.slug}`}
                className="inline-flex items-center gap-1 rounded-full border border-ice-200 bg-ice-50 px-4 py-2 text-sm font-semibold text-navy-800 hover:border-ice-500 hover:text-ice-600">
                {x.name} <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            ))}
            <Link href="/plumbing"
              className="inline-flex items-center gap-1 rounded-full border border-ice-200 bg-ice-50 px-4 py-2 text-sm font-semibold text-navy-800 hover:border-ice-500 hover:text-ice-600">
              Plumbing <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Areas mini-list for internal linking */}
      <section className="bg-ice-50 py-12">
        <div className="container-x text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-ice-600">Serving all of Greater San Antonio</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 text-sm text-slate-600">
            {tier1Cities.map((c) => (
              <Link key={c.slug} href={`/service-areas/${c.slug}`} className="hover:text-ice-600 hover:underline">{c.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`Need ${s.name} in San Antonio?`} text="Call now or schedule online — we'll get your comfort back fast." />
    </>
  );
}
