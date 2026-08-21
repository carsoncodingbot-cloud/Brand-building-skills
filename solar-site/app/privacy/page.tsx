import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information — including details you share through our website forms, phone calls, and advertising lead forms.`,
  alternates: { canonical: "/privacy" },
};

const updated = "July 7, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-navy-800">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy" }]} />
      <PageHero
        title="Privacy Policy"
        subtitle="Plain-English answers about what information we collect, why we collect it, and how we protect it."
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }]}
      />

      <section className="bg-white py-14 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-ice-600">Last updated: {updated}</p>
            <p className="mt-4 leading-relaxed text-slate-600">
              {site.name} (&ldquo;Daylight,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy.
              This policy explains what information we collect when you visit {site.url.replace("https://", "")}, call or text us,
              request service, or submit your information through one of our forms — including lead forms on advertising platforms
              such as Facebook and Instagram (Meta) and Google.
            </p>

            <Section title="Information we collect">
              <p>We collect information you choose to give us, such as:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Contact details — your name, phone number, email address, and service address or ZIP code.</li>
                <li>Service details — what&rsquo;s going on with your heating, cooling, or plumbing system, how soon you need help, and whether you own or rent your home.</li>
                <li>Communications — records of calls, texts, emails, and form submissions with our team.</li>
              </ul>
              <p>
                Like most websites, we also automatically collect limited technical data (such as browser type, pages visited,
                and general location) through cookies and similar tools, including analytics and advertising pixels. You can
                control cookies through your browser settings.
              </p>
            </Section>

            <Section title="How we use your information">
              <ul className="list-disc space-y-1.5 pl-5">
                <li>To respond to your request, schedule appointments, and perform service.</li>
                <li>To contact you by phone, text message, or email about your request, appointment reminders, estimates, and follow-ups.</li>
                <li>To send occasional offers, maintenance reminders, or membership information you may opt out of at any time.</li>
                <li>To measure and improve our website, service, and advertising.</li>
                <li>To comply with legal obligations and protect against fraud or misuse.</li>
              </ul>
            </Section>

            <Section title="Calls and text messages">
              <p>
                When you submit your phone number through our website or an advertising lead form, you consent to receive calls
                and text messages about your request from {site.name} and, where applicable, a licensed local service partner
                we match to your request — including via automated technology. Consent is not a condition of purchase. Message
                and data rates may apply, and message frequency varies. Reply STOP to any text to opt out, or HELP for help.
                We do not share your mobile number with third parties for their own unrelated marketing.
              </p>
            </Section>

            <Section title="How we share information">
              <p>We share your information only as needed to get your request handled:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Licensed, vetted local service partners — when you request service, your request may be fulfilled by or referred to a licensed local heating, cooling, or plumbing professional in our network, who may contact you directly about it.</li>
                <li>Service providers who help us operate — such as scheduling, dispatch, payment, review, and communication tools — under obligations to protect your data.</li>
                <li>Advertising and analytics platforms (such as Meta and Google) in limited, technical form to measure ad performance.</li>
                <li>Authorities when required by law, or as needed to protect our rights, customers, and team.</li>
              </ul>
            </Section>

            <Section title="Lead forms on Facebook, Instagram, and Google">
              <p>
                If you submit an instant lead form through Meta or Google, that platform collects your information under its own
                privacy policy and delivers it to us. We use it solely to respond to your request as described above.
              </p>
            </Section>

            <Section title="Your choices">
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Opt out of marketing emails via the unsubscribe link, and of texts by replying STOP.</li>
                <li>Ask us to access, correct, or delete the personal information we hold about you.</li>
                <li>Limit cookies and tracking through your browser or device settings.</li>
              </ul>
              <p>
                To exercise any of these choices, contact us at <a className="font-semibold text-ice-600 hover:underline" href={`mailto:${site.email}`}>{site.email}</a> or{" "}
                <a className="font-semibold text-ice-600 hover:underline" href={site.phoneHref}>{site.phoneDisplay}</a>.
              </p>
            </Section>

            <Section title="Data security and retention">
              <p>
                We use reasonable administrative, technical, and physical safeguards to protect your information, and we keep it
                only as long as needed for the purposes above or as required by law. No method of transmission or storage is
                100% secure, so we cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="Children's privacy">
              <p>Our services are intended for adults. We do not knowingly collect personal information from children under 13.</p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                We may update this policy from time to time. The &ldquo;Last updated&rdquo; date above reflects the most recent
                version, and material changes will be posted on this page.
              </p>
            </Section>

            <Section title="Contact us">
              <p>
                {site.name} &middot; Riverside, CA
                <br />
                Phone: <a className="font-semibold text-ice-600 hover:underline" href={site.phoneHref}>{site.phoneDisplay}</a>
                <br />
                Email: <a className="font-semibold text-ice-600 hover:underline" href={`mailto:${site.email}`}>{site.email}</a>
              </p>
              <p>
                Looking for something else? Visit our <Link href="/contact/" className="font-semibold text-ice-600 hover:underline">contact page</Link>.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </>
  );
}
