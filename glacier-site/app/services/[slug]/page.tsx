import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { tier1Cities } from "@/lib/cities";
import { site } from "@/lib/site";
import { serviceIcons, Check, Phone, ChevronRight } from "@/components/Icons";
import PageHero from "@/components/PageHero";
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

      {/* Intro + CTA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ice-500 text-white">
                <Icon className="h-7 w-7" />
              </span>
              <h2 className="iced iced-dark text-2xl sm:text-3xl">{s.name} in San Antonio</h2>
            </div>
            <p className="mt-5 text-slate-600">{s.intro}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {s.features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-ice-100 bg-ice-50 p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ice-500 text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <h3 className="font-[family-name:var(--font-montserrat)] font-bold text-navy-800">{f.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky booking card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-navy-800 p-7 text-white shadow-xl">
              <h3 className="iced text-xl font-extrabold uppercase text-white">Book {s.name}</h3>
              <p className="mt-2 text-sm text-white/80">Fast scheduling, upfront pricing, and certified San Antonio technicians.</p>
              <Link href={site.phoneHref} className="btn btn-primary mt-5 w-full">
                <Phone className="h-4 w-4" /> {site.phoneDisplay}
              </Link>
              <Link href="/contact" className="btn btn-outline-light mt-3 w-full">Schedule Online</Link>
              <ul className="mt-6 space-y-2 text-sm text-white/85">
                {["24/7 emergency availability", "Upfront, honest pricing", "Certified & background-checked techs", "Financing on qualifying installs"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-turquoise" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

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
