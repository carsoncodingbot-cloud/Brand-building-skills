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
    default: `${site.name} | Solar Panels & Battery Storage in Riverside & the Inland Empire`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} designs solar and battery systems for Riverside, Moreno Valley, Corona, and the Inland Empire — every price in writing before you sign, honest NEM 3.0 math, and straight answers. Call ${site.phoneDisplay}.`,
  applicationName: site.name,
  keywords: [
    "solar panels Riverside CA", "solar companies Moreno Valley", "solar installation Inland Empire",
    "battery storage Riverside", "NEM 3.0 solar", "solar company Corona CA",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Solar & Battery for the Inland Empire`,
    description: "Solar and battery systems with every number in writing before you sign — Riverside, Moreno Valley & the Inland Empire.",
    url: site.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — Inland Empire solar` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Solar & Battery for the Inland Empire`,
    description: "Every number in writing before you sign. Solar, batteries & honest math for the IE.",
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // Real anti-framing / CSP / HSTS are served as HTTP headers at the edge
  // (see public/_headers, vercel.json, and SECURITY.md). This is the one signal
  // static hosting can carry via <meta>.
  referrer: "strict-origin-when-cross-origin",
};

export const viewport: Viewport = {
  themeColor: "#0b1d36",
  width: "device-width",
  initialScale: 1,
  // Stops iOS Safari's input-focus auto-zoom (which sticks after submit and
  // leaves the page zoomed in). Pinch-zoom still works on iOS 10+.
  maximumScale: 1,
  // Never let the page open or pinch below 100% — paired with the
  // overflow-x clip in globals.css this kills the zoomed-out white gutter.
  minimumScale: 1,
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
