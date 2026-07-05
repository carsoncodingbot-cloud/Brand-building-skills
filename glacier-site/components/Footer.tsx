import Link from "next/link";
import { site, NAV_SERVICES } from "@/lib/site";
import { tier1Cities } from "@/lib/cities";
import { GlacierMark } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      {/* faint diagonal light streaks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ background: "repeating-linear-gradient(115deg, #fff 0 2px, transparent 2px 120px)" }} />
      <div className="container-x relative py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand / contact */}
          <div>
            <div className="flex items-center gap-2.5">
              <GlacierMark className="h-11 w-11" />
              <span className="leading-none">
                <span className="block font-[family-name:var(--font-montserrat)] text-xl font-extrabold uppercase tracking-tight">Glacier</span>
                <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-ice-300">Heating &amp; Air</span>
              </span>
            </div>
            <p className="mt-5 text-sm text-ice-200/80">{site.license}</p>
            <p className="mt-4 text-sm font-semibold">Reach out for 24/7 assistance with your San&nbsp;Antonio HVAC needs.</p>
            <dl className="mt-4 space-y-1 text-sm">
              <div><dt className="inline font-bold">Email: </dt><dd className="inline"><a className="text-ice-300 hover:underline" href={`mailto:${site.email}`}>{site.email}</a></dd></div>
              <div><dt className="inline font-bold">Phone: </dt><dd className="inline"><a className="text-ice-300 hover:underline" href={site.phoneHref}>{site.phoneDisplay}</a></dd></div>
              <div><dt className="inline font-bold">Office: </dt><dd className="inline text-ice-200/90">{site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}</dd></div>
            </dl>
          </div>

          <FooterCol title="Services" links={NAV_SERVICES} />

          <FooterCol title="Get in Touch" links={[
            { label: "Contact Us", href: "/contact" },
            { label: "Customer Reviews", href: "/reviews" },
            { label: "FAQ", href: "/#faq" },
            { label: "Financing", href: "/financing" },
            { label: "Glacier Club", href: "/glacier-club" },
            { label: "About Us", href: "/about" },
          ]} />

          <FooterCol title="Service Areas" links={[
            { label: "All Service Areas", href: "/service-areas" },
            ...tier1Cities.slice(0, 7).map((c) => ({ label: c.name, href: `/service-areas/${c.slug}` })),
          ]} />
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-ice-200/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-3">
            <SocialLink href={site.social.facebook} label="Facebook" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
            <SocialLink href={site.social.instagram} label="Instagram" d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.5-.1 4.8c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.5 2.2 15.2 2.2 12s0-3.5.1-4.8C2.4 4 3.9 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.8-11.1a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-extrabold uppercase tracking-wider text-ice-400">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-ice-200/85 hover:text-white">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, label, d }: { href: string; label: string; d: string }) {
  return (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d={d} /></svg>
    </a>
  );
}
