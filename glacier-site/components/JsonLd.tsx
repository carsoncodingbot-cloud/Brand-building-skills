import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { cities } from "@/lib/cities";

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const baseBusiness = () => ({
  "@type": "HVACBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  telephone: site.phoneHref.replace("tel:", ""),
  email: site.email,
  priceRange: site.priceRange,
  image: site.mascotUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday","Sunday"], opens: "00:00", closes: "23:59" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: site.ratingValue, reviewCount: site.reviewCount },
  sameAs: [site.social.facebook, site.social.instagram],
});

export function LocalBusinessJsonLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        ...baseBusiness(),
        logo: `${site.url}/og.png`,
        slogan: site.tagline,
        areaServed: cities.map((c) => ({
          "@type": "City",
          name: `${c.name}, TX`,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "HVAC & Plumbing Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.name,
              url: `${site.url}/services/${s.slug}`,
            },
          })),
        },
      }}
    />
  );
}

export function ServiceJsonLd({ name, description, url, areaServed = "San Antonio, TX" }: {
  name: string; description: string; url: string; areaServed?: string;
}) {
  return (
    <Ld data={{
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: name,
      description,
      url,
      areaServed,
      provider: baseBusiness(),
    }} />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <Ld data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }} />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <Ld data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.url}`,
      })),
    }} />
  );
}
