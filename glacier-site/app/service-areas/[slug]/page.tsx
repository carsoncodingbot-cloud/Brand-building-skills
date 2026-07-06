import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCity } from "@/lib/cities";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { serviceIcons, Check, Phone, MapPin, Star, ChevronRight } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCity(slug);
  if (!c) return {};
  const title = `HVAC & AC Repair in ${c.name}, TX`;
  const description = `Reliable AC repair, heating, and 24/7 emergency HVAC in ${c.name}. ${site.name} — certified local technicians. Call ${site.phoneDisplay}.`;
  return { title, description, alternates: { canonical: `/service-areas/${c.slug}` }, openGraph: { title, description, url: `/service-areas/${c.slug}` } };
}

function cityFaqs(cityName: string) {
  return [
    { q: `Do you offer emergency HVAC service in ${cityName}?`, a: `Yes. We provide 24/7 emergency AC and heating repair throughout ${cityName}. When your system goes down, call ${site.phoneDisplay} and we'll prioritize your call.` },
    { q: `How fast can you get to ${cityName}?`, a: `Our trucks are dispatched across the metro, so we reach most ${cityName} homes same-day — often within a couple of hours for no-cool and no-heat emergencies.` },
    { q: `Do you service both older and newer homes in ${cityName}?`, a: `Absolutely. From established homes with aging ductwork to new construction with builder-grade systems, our ${cityName} technicians handle repair, replacement, and tune-ups for every kind of system.` },
    { q: `Are you licensed and insured to work in ${cityName}?`, a: `Yes — Glacier Heating & Air is fully licensed and insured (${site.license}), and every technician serving ${cityName} is certified and background-checked.` },
  ];
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCity(slug);
  if (!c) notFound();

  const url = `${site.url}/service-areas/${c.slug}`;
  const faqs = cityFaqs(c.name);
  const nearby = cities.filter((x) => x.county === c.county && x.slug !== c.slug).slice(0, 4);

  return (
    <>
      <ServiceJsonLd name={`HVAC Services in ${c.name}, TX`} description={`AC repair, heating, and emergency HVAC service in ${c.name}. ${c.angle}`} url={url} areaServed={`${c.name}, TX`} />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }, { name: c.name, url: `/service-areas/${c.slug}` }]} />

      <PageHero
        title={`HVAC & AC Repair in ${c.name}, Texas`}
        subtitle={`Certified, family-owned HVAC service ${c.name} homeowners trust — AC repair, heating, air quality, and 24/7 emergencies.`}
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }, { name: c.name, href: `/service-areas/${c.slug}` }]}
      />

      {/* Trust strip */}
      <div className="bg-gradient-to-r from-[#f7941d] via-[#f15a24] to-[#e11f26] py-3.5">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center font-[family-name:var(--font-montserrat)] text-sm font-bold uppercase tracking-wide text-white">
          <span>Same-Day Service in {c.name}</span><span className="hidden sm:inline text-white/50">|</span>
          <span>Upfront Pricing</span><span className="hidden sm:inline text-white/50">|</span>
          <span>24/7 Emergency Availability</span>
        </div>
      </div>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5" />)}
              <span className="ml-1 text-sm font-semibold text-slate-500">Rated {site.ratingValue} by {c.name}-area homeowners</span>
            </div>
            <h2 className="iced iced-dark mt-4 text-2xl sm:text-3xl">Your Local {c.name} HVAC Team</h2>
            <p className="mt-4 text-slate-600">{c.angle}</p>
            <p className="mt-4 text-slate-600">
              From the first triple-digit day of summer to a surprise winter freeze, Glacier keeps {c.name} homes
              comfortable with fast repairs, efficient installs, and maintenance that prevents breakdowns before they
              start. We&apos;re local, we&apos;re certified, and we treat your home like our own.
            </p>

            {c.neighborhoods.length > 0 && (
              <div className="mt-6 rounded-2xl border border-ice-100 bg-ice-50 p-5">
                <div className="flex items-center gap-2 text-ice-600">
                  <MapPin className="h-5 w-5" />
                  <span className="font-bold">Neighborhoods we serve near {c.name}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{c.neighborhoods.join(" · ")} — and everywhere in between.</p>
              </div>
            )}

            <h3 className="iced iced-dark mt-10 text-xl sm:text-2xl">HVAC Services in {c.name}</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {services.map((s) => {
                const Icon = serviceIcons[s.icon];
                return (
                  <Link key={s.slug} href={`/services/${s.slug}`}
                    className="group flex items-start gap-3 rounded-2xl border border-ice-100 bg-gradient-to-b from-white to-ice-50 p-4 shadow-sm transition hover:-translate-y-1 hover:border-ice-500 hover:shadow-md">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-ice-500 to-navy-800 text-white shadow">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-bold text-navy-800 group-hover:text-ice-600">{s.name}</span>
                      <span className="block text-xs text-slate-500">{s.short}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-navy-800 to-[#001a36] p-7 text-white shadow-[0_30px_60px_-24px_rgba(0,43,88,0.6)] ring-1 ring-white/10">
              <div className="flex items-center gap-1.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" />)}
                <span className="ml-1 text-sm font-semibold text-white/90">{site.ratingValue} · {site.reviewCount}+ reviews</span>
              </div>
              <h3 className="iced mt-3 text-xl font-extrabold uppercase text-white">{c.name} Service</h3>
              <p className="mt-2 text-sm text-white/80">Same-day availability for most {c.name} homes. 24/7 for emergencies.</p>
              <Link href={site.phoneHref} className="btn btn-primary mt-5 w-full">
                <Phone className="h-4 w-4" /> {site.phoneDisplay}
              </Link>
              <Link href="/contact" className="btn btn-outline-light mt-3 w-full">Schedule Online</Link>
              <ul className="mt-6 space-y-2 text-sm text-white/85">
                {[`Local ${c.county} technicians`, "Upfront, honest pricing", "24/7 emergency service", "Licensed & insured"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-turquoise" /> {t}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-ice-100 py-16">
        <div className="container-x">
          <h2 className="iced iced-dark text-center text-2xl sm:text-3xl">{c.name} HVAC — Common Questions</h2>
          <div className="mx-auto mt-8 max-w-4xl"><Faq items={faqs} /></div>
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="bg-white py-12">
          <div className="container-x text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-ice-600">Also serving nearby</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {nearby.map((n) => (
                <Link key={n.slug} href={`/service-areas/${n.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-ice-200 bg-ice-50 px-4 py-2 text-sm font-semibold text-navy-800 hover:border-ice-500 hover:text-ice-600">
                  {n.name} <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title={`Need HVAC service in ${c.name}?`} text="Call now or schedule online — fast, friendly, and local." />
    </>
  );
}
