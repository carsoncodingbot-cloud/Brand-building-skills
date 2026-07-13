import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-opensans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Reliable HVAC in San Antonio, TX`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} provides expert AC repair, heating, and 24/7 emergency HVAC service across greater San Antonio. Family-owned, certified technicians. Call ${site.phoneDisplay}.`,
  applicationName: site.name,
  keywords: [
    "HVAC San Antonio", "AC repair San Antonio", "air conditioning repair",
    "heating repair San Antonio", "furnace repair", "HVAC company San Antonio TX",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Reliable HVAC in San Antonio, TX`,
    description: "Expert AC repair, heating & 24/7 emergency HVAC across greater San Antonio.",
    url: site.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — San Antonio HVAC` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Reliable HVAC in San Antonio, TX`,
    description: "Expert AC repair, heating & 24/7 emergency HVAC across greater San Antonio.",
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // Real anti-framing / CSP / HSTS are served as HTTP headers at the edge
  // (see public/_headers, vercel.json, and SECURITY.md). This is the one signal
  // GitHub Pages can carry via <meta>.
  referrer: "strict-origin-when-cross-origin",
};

export const viewport: Viewport = {
  themeColor: "#002b58",
  width: "device-width",
  initialScale: 1,
  // Stops iOS Safari's input-focus auto-zoom (which sticks after submit and
  // leaves the page zoomed in). Pinch-zoom still works on iOS 10+.
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <LocalBusinessJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
