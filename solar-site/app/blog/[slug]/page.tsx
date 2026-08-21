import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { ChevronRight, Phone } from "@/components/Icons";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.description,
      url: `/blog/${p.slug}`,
      type: "article",
      images: [{ url: p.cover, width: 1200, height: 630, alt: p.title }],
    },
    twitter: { card: "summary_large_image", images: [p.cover] },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    dateModified: p.date,
    mainEntityOfPage: `${site.url}/blog/${p.slug}/`,
    image: `${site.url}${p.cover}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/og.png` },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {p.faqs.length > 0 && <FaqJsonLd faqs={p.faqs} />}
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: p.h1, url: `/blog/${p.slug}` }]} />

      <PageHero
        title={p.h1}
        subtitle={p.description}
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: p.h1, href: `/blog/${p.slug}` }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <article>
            <img
              src={`${process.env.BASE_PATH || ""}${p.cover}`}
              alt={p.title}
              width={1200}
              height={630}
              className="aspect-[1200/630] w-full rounded-2xl border border-ice-100 object-cover shadow-md"
            />
            <p className="mt-6 text-sm font-bold uppercase tracking-wider text-ice-600">
              {new Date(p.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {p.readMinutes} min read · Daylight Solar
            </p>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{p.intro}</p>
            {p.sections.map((s) => (
              <section key={s.h2} className="mt-10">
                <h2 className="font-[family-name:var(--font-montserrat)] text-xl font-extrabold text-navy-800 sm:text-2xl">{s.h2}</h2>
                {s.body.filter(Boolean).map((para, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-slate-600">{para}</p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-3">
                    {s.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 leading-relaxed text-slate-600">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ice-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-navy-800 to-[#001a36] p-7 text-white shadow-[0_30px_60px_-24px_rgba(0,43,88,0.6)] ring-1 ring-white/10">
              <h3 className="iced text-xl font-extrabold uppercase text-white">Talk to a real one</h3>
              <p className="mt-2 text-sm text-white/80">Your real solar numbers — price, payment, payback — in writing, before anyone visits. Local across the Inland Empire.</p>
              <a href={site.phoneHref} className="btn btn-primary mt-5 w-full">
                <Phone className="h-4 w-4" /> {site.phoneDisplay}
              </a>
              <Link href="/quote" className="btn btn-outline-light mt-3 w-full">60-Second Check</Link>
            </div>
            <div className="mt-6 rounded-2xl border border-ice-100 bg-ice-50 p-6">
              <h3 className="font-[family-name:var(--font-montserrat)] text-sm font-extrabold uppercase tracking-wider text-navy-800">Keep reading</h3>
              <ul className="mt-4 space-y-3">
                {p.related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="inline-flex items-start gap-1.5 text-sm font-semibold text-ice-600 hover:text-navy-800">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" /> {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {p.faqs.length > 0 && (
        <section className="bg-ice-100 py-16">
          <div className="container-x">
            <h2 className="iced iced-dark text-center text-2xl sm:text-3xl">Common Questions</h2>
            <div className="mx-auto mt-8 max-w-4xl">
              <Faq items={p.faqs} />
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Want this math run on your house?"
        text="Straight answers and every number in writing — before anyone rings your doorbell."
      />
    </>
  );
}
