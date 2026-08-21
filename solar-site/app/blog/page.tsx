import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ChevronRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Solar Guides & Straight Answers for Inland Empire Homeowners",
  description:
    "Straight-answer solar guides from Daylight Solar: NEM 3.0 in plain English, real Inland Empire costs, battery decisions, and the scams to dodge.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Solar Guides & Straight Answers for Inland Empire Homeowners",
    description:
      "NEM 3.0 in plain English, real IE costs, battery decisions, and the scams to dodge.",
    url: "/blog",
  },
};

export default function BlogIndex() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]} />
      <PageHero
        title="Solar Guides & Straight Answers"
        subtitle="No upsell, no fear-mongering — the same explanations we give at kitchen tables, written down."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p.slug} className="flex h-full flex-col overflow-hidden rounded-2xl border border-ice-100 bg-gradient-to-b from-white to-ice-50 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <Link href={`/blog/${p.slug}`} className="block">
                  <img src={`${process.env.BASE_PATH || ""}${p.cover}`} alt={p.title} width={1200} height={630} className="aspect-[1200/630] w-full object-cover" loading="lazy" />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-ice-600">
                  {new Date(p.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {p.readMinutes} min read
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-montserrat)] text-lg font-extrabold text-navy-800">
                  <Link href={`/blog/${p.slug}`} className="hover:text-ice-600">{p.title}</Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{p.description}</p>
                <Link href={`/blog/${p.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ice-600 hover:text-navy-800">
                  Read the guide <ChevronRight className="h-4 w-4" />
                </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Want your own numbers?"
        text="Free written quotes — price, payment, payback — before anyone visits your Inland Empire home."
      />
    </>
  );
}
