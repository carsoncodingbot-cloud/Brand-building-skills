import Link from "next/link";
import { ChevronRight } from "@/components/Icons";

export default function PageHero({
  title, subtitle, breadcrumb,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: { name: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ice-500 to-navy-800 pt-24">
      <div className="hero-mountains absolute inset-0" aria-hidden />
      <div className="container-x relative py-14 sm:py-20">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ice-200/90">
              {breadcrumb.map((b, i) => (
                <li key={b.href} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-ice-300" />}
                  {i < breadcrumb.length - 1 ? (
                    <Link href={b.href} className="hover:text-white">{b.name}</Link>
                  ) : (
                    <span className="font-semibold text-white">{b.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="iced iced-light max-w-4xl text-3xl sm:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/90">{subtitle}</p>}
      </div>
    </section>
  );
}
