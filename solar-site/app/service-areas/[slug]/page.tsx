import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCity } from "@/lib/cities";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { serviceIcons, Check, Phone, MapPin, Star, ChevronRight, Bolt } from "@/components/Icons";
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
  const title = `Solar Panels & Battery Storage in ${c.name}, CA`;
  const description = `Solar installation, battery storage, and honest ${c.utility} math for ${c.name} homeowners. ${site.name} — every number in writing before you sign. Call ${site.phoneDisplay}.`;
  return { title, description, alternates: { canonical: `/service-areas/${c.slug}` }, openGraph: { title, description, url: `/service-areas/${c.slug}` } };
}

function cityFaqs(c: { name: string; utility: string }) {
  const isSCE = c.utility.startsWith("SCE");
  return [
    {
      q: `Is solar worth it in ${c.name} in 2026?`,
      a: isSCE
        ? `For most ${c.name} homes billed by SCE, the honest 2026 answer is: solar with battery storage usually pencils, solar-only often doesn't. Under NEM 3.0, SCE credits exported power at a fraction of what you pay to buy it back, so storing your midday production for the 4–9pm peak window is what makes the math work. We run your real numbers and tell you straight either way.`
        : `${c.name} homes are billed by ${c.utility}, which runs its own solar program with its own rules — different from SCE's NEM 3.0 next door, and often friendlier. That changes the right design, which is why we quote to your actual utility's program, not a template.`,
    },
    { q: `Which utility serves ${c.name}?`, a: `${c.name} is served by ${c.utility}. This matters more than most solar quotes admit: export credits, rate structures, and interconnection rules all differ by utility, and the right system design follows the rules of whoever actually bills your house. It's the first thing we verify — before any numbers.` },
    { q: `How much does solar cost in ${c.name}?`, a: `Inland Empire market pricing in 2026 runs around $2.29 per watt installed — roughly $20,000 for a typical 8–9 kW system, with batteries a real additional line item. Your written quote shows the full cash price and financed price side by side, so dealer fees have nowhere to hide.` },
    { q: `Are you licensed to work in ${c.name}?`, a: `Yes — ${site.name} is licensed and insured (${site.license}), and you can verify any California contractor at the CSLB license lookup before signing anything. We encourage exactly that, for every company that quotes you — especially us.` },
  ];
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCity(slug);
  if (!c) notFound();

  const url = `${site.url}/service-areas/${c.slug}`;
  const faqs = cityFaqs(c);
  const nearby = cities.filter((x) => x.county === c.county && x.slug !== c.slug).slice(0, 4);

  return (
    <>
      <ServiceJsonLd name={`Solar Installation in ${c.name}, CA`} description={`Solar panels, battery storage, and honest utility math in ${c.name}. ${c.angle}`} url={url} areaServed={`${c.name}, CA`} />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }, { name: c.name, url: `/service-areas/${c.slug}` }]} />

      <PageHero
        title={`Solar Panels & Batteries in ${c.name}, California`}
        subtitle={`Local, licensed solar ${c.name} homeowners can actually read — designed for ${c.utility}'s real rules, with every number in writing before you sign.`}
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Service Areas", href: "/service-areas" }, { name: c.name, href: `/service-areas/${c.slug}` }]}
      />

      {/* Trust strip */}
      <div className="bg-gradient-to-r from-[#f5a623] via-[#ef8412] to-[#e8650a] py-3.5">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center font-[family-name:var(--font-montserrat)] text-sm font-bold uppercase tracking-wide text-white">
          <span>Serving {c.name} Locally</span><span className="hidden sm:inline text-white/50">|</span>
          <span>Numbers In Writing First</span><span className="hidden sm:inline text-white/50">|</span>
          <span>Designed For {c.utility.split(" (")[0]}</span>
        </div>
      </div>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5" />)}
              <span className="ml-1 text-sm font-semibold text-slate-500">Rated {site.ratingValue} by Inland Empire homeowners</span>
            </div>
            <h2 className="iced iced-dark mt-4 text-2xl sm:text-3xl">Your Local {c.name} Solar Team</h2>
            <p className="mt-4 text-slate-600">{c.angle}</p>
            <p className="mt-4 text-slate-600">
              Every {c.name} quote starts the same way: we verify which utility bills you, pull your
              last twelve months of real usage, and design to both. Then your full price, payment, and
              payback math arrives in writing — before anyone visits your house, and before anyone asks
              for a signature.
            </p>

            {/* Utility callout — the local fact competitors' templates miss */}
            <div className="mt-6 rounded-2xl border border-turquoise/40 bg-gold/5 p-5">
              <div className="flex items-center gap-2 text-navy-800">
                <Bolt className="h-5 w-5 text-red-brand" />
                <span className="font-bold">Who bills {c.name}: {c.utility}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {c.utility.startsWith("SCE")
                  ? "SCE territory means NEM 3.0 rules: exported solar earns a fraction of what evening power costs, so we design for self-consumption — which usually makes battery storage the honest recommendation."
                  : `A municipal utility means its own solar program and its own math — often friendlier than SCE's NEM 3.0 next door. We quote to ${c.utility.split(" (")[0]}'s actual rules, which most out-of-town sales crews have never read.`}
              </p>
            </div>

            {c.neighborhoods.length > 0 && (
              <div className="mt-6 rounded-2xl border border-ice-100 bg-ice-50 p-5">
                <div className="flex items-center gap-2 text-ice-600">
                  <MapPin className="h-5 w-5" />
                  <span className="font-bold">Neighborhoods we serve around {c.name}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{c.neighborhoods.join(" · ")} — and everywhere in between.</p>
              </div>
            )}

            <h3 className="iced iced-dark mt-10 text-xl sm:text-2xl">Solar &amp; Electrical Services in {c.name}</h3>
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
            <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-navy-800 to-navy-950 p-7 text-white shadow-[0_30px_60px_-24px_rgba(5,14,29,0.6)] ring-1 ring-white/10">
              <div className="flex items-center gap-1.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" />)}
                <span className="ml-1 text-sm font-semibold text-white/90">{site.ratingValue} · local reviews</span>
              </div>
              <h3 className="iced mt-3 text-xl font-extrabold uppercase text-white">{c.name} Numbers</h3>
              <p className="mt-2 text-sm text-white/80">Your real solar math for a {c.name} roof — price, payment, payback — in writing before any visit.</p>
              <Link href={site.phoneHref} className="btn btn-primary mt-5 w-full">
                <Phone className="h-4 w-4" /> {site.phoneDisplay}
              </Link>
              <Link href="/quote" className="btn btn-outline-light mt-3 w-full">60-Second Check</Link>
              <ul className="mt-6 space-y-2 text-sm text-white/85">
                {[`${c.utility.split(" (")[0]}-matched design`, "Every number in writing first", "Licensed, insured & verifiable", "Local crews, not fly-ins"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-turquoise" /> {t}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-ice-100 py-16">
        <div className="container-x">
          <h2 className="iced iced-dark text-center text-2xl sm:text-3xl">{c.name} Solar — Common Questions</h2>
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

      <CtaBand title={`Ready for honest solar math in ${c.name}?`} text="Call now or run the 60-second check — every number arrives in writing." />
    </>
  );
}
