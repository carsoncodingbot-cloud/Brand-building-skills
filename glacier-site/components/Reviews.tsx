import { site } from "@/lib/site";
import { Star } from "@/components/Icons";
import Link from "next/link";

/**
 * SAMPLE reviews — original placeholder content for layout/demo.
 * Replace `sampleReviews` with a live Google/Reputation feed when the
 * business's real reviews are connected.
 */
export interface Review { name: string; initials: string; date: string; text: string }

export const sampleReviews: Review[] = [
  { name: "Marisol Vega", initials: "MV", date: "May 28, 2026", text: "Our AC quit on a 102° afternoon and Glacier had a tech at the house within two hours. Diagnosed it fast, had the part on the truck, and we were cold again before dinner. Genuinely impressed." },
  { name: "David Cortez", initials: "DC", date: "May 26, 2026", text: "Replaced our 14-year-old system with a high-efficiency unit. The crew was clean, on time, and walked me through everything. Our summer electric bill dropped noticeably." },
  { name: "Angela Whitfield", initials: "AW", date: "May 24, 2026", text: "Honest company. They could have sold me a whole new system but instead fixed the actual problem for a fraction of the cost. That earned my business for life." },
  { name: "Ramiro Cantú", initials: "RC", date: "May 22, 2026", text: "Signed up for the Glacier Club after a tune-up. The tech found a weak capacitor before it failed. Exactly the kind of proactive service you want in the middle of a Texas summer." },
  { name: "Jessica Boone", initials: "JB", date: "May 21, 2026", text: "Professional, on time, and knowledgeable about our older Alamo Heights home. Explained the ductwork options clearly with no pressure. Highly recommend." },
  { name: "Tomás Herrera", initials: "TH", date: "May 20, 2026", text: "Installed a mini-split in our garage workshop. Quiet, efficient, and the install looks factory-clean. Couldn't be happier." },
];

export default function Reviews({ reviews = sampleReviews, heading = "What our clients say about us" }: {
  reviews?: Review[]; heading?: string;
}) {
  return (
    <section className="bg-ice-100 py-16 sm:py-20" id="reviews">
      <div className="container-x">
        <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,43,88,0.35)] sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <h2 className="font-[family-name:var(--font-montserrat)] text-2xl font-extrabold text-navy-800 sm:text-3xl">{heading}</h2>
            <div className="flex items-center gap-5">
              <div className="text-right">
                <div className="font-[family-name:var(--font-montserrat)] text-4xl font-extrabold leading-none text-navy-800">{site.ratingValue}</div>
                <div className="mt-1 flex items-center justify-end gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" />)}
                </div>
                <div className="mt-1 text-xs text-slate-500">{site.reviewCount} reviews</div>
              </div>
              <Link href="/contact" className="btn btn-primary !py-3 text-sm">Write a review</Link>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-ice-100 bg-ice-50 p-5">
            <div className="flex items-center gap-2 text-ice-600">
              <Star className="h-4 w-4" />
              <span className="text-sm font-bold">Why homeowners choose Glacier</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Consistently praised for fast response, friendly certified technicians, honest recommendations, and clean, on-time installations — with maintenance plans that keep San Antonio homes comfortable year-round.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.slice(0, 6).map((r) => (
              <article key={r.name} className="flex flex-col rounded-2xl border border-ice-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold">
                    <span className="mr-1 font-bold text-navy-800">5</span>
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" />)}
                  </div>
                  <time className="text-xs text-slate-400">{r.date}</time>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{r.text}</p>
                <div className="mt-4 flex items-center gap-3 border-t border-ice-100 pt-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ice-500 text-xs font-bold text-white">{r.initials}</span>
                  <span className="text-sm font-semibold text-navy-800">{r.name}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
