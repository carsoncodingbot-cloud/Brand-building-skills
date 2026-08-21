import { site } from "@/lib/site";
import { Star, GoogleG } from "@/components/Icons";
import Link from "next/link";

/**
 * SAMPLE reviews — original placeholder content for layout/demo.
 * Replace `sampleReviews` with a live Google/Reputation feed when the
 * business's real reviews are connected.
 *
 * Cards are styled to match real Google review anatomy: letter avatar in
 * a material color, name, gold stars + relative time, plain text — no
 * decorative quote marks, no invented badges.
 */
export interface Review { name: string; initials: string; when: string; date?: string; text: string }

/** Google's letter-avatar palette — deterministic per reviewer. */
export const AVATAR_COLORS = ["#AB47BC", "#00897B", "#D81B60", "#3949AB", "#F4511E", "#546E7A"];
export const REVIEW_FONT = "Roboto, 'Helvetica Neue', Arial, sans-serif";

export const sampleReviews: Review[] = [
  { name: "Marisol Vega", initials: "M", when: "3 weeks ago", text: "Three companies gave us monthly payments. Daylight gave us a one-page sheet with the actual system price, the loan terms, and the payback math — before anyone came to the house. That's why they got the job." },
  { name: "David Cortez", initials: "D", when: "a month ago", text: "Our SCE bill was hitting $480 in July. The battery design covers our whole 4–9pm window now and the install crew was clean, on schedule, and walked me through the monitoring app before they left." },
  { name: "Angela Whitfield", initials: "A", when: "a month ago", text: "Honest company. They told my mother solar did NOT make sense on her small bill and fixed her orphaned system's inverter instead. Who does that? These guys." },
  { name: "Ramiro Cantú", initials: "R", when: "2 months ago", text: "We're in Riverside city on RPU and they actually knew what that meant — designed solar-only, no battery upsell, because our export credits are different. Every other quote tried to sell us storage we didn't need." },
  { name: "Jessica Boone", initials: "J", when: "2 months ago", text: "Panels plus a new roof in one project in Menifee. One crew, one warranty conversation, no finger-pointing. The paperwork was large print and plain English, exactly like they promise." },
  { name: "Tomás Herrera", initials: "T", when: "3 months ago", text: "EV charger and panel upgrade quoted up front with the solar — no surprise change orders halfway through. System's been producing right at the modeled numbers all summer." },
];

/** One review, Google-review anatomy — shared by the grid and /reviews. */
export function ReviewCard({ r, i }: { r: Review; i: number }) {
  return (
    <article className="flex flex-col rounded-2xl border border-[#e8eaed] bg-white p-5 shadow-sm" style={{ fontFamily: REVIEW_FONT }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-medium text-white"
            style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
          >
            {r.initials.slice(0, 1)}
          </span>
          <div>
            <p className="text-sm font-medium text-[#202124]">{r.name}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="flex gap-0.5 text-[#fbbc04]">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5" />)}
              </span>
              <span className="text-xs text-[#5f6368]">{r.when ?? r.date}</span>
            </div>
          </div>
        </div>
        <GoogleG className="mt-0.5 h-5 w-5 shrink-0" />
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#3c4043]">{r.text}</p>
    </article>
  );
}

export default function Reviews({ reviews = sampleReviews, heading = "What our clients say about us" }: {
  reviews?: Review[]; heading?: string;
}) {
  return (
    <section className="bg-ice-100 py-16 sm:py-20" id="reviews">
      <div className="container-x">
        <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,43,88,0.35)] sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <h2 className="font-[family-name:var(--font-montserrat)] text-2xl font-extrabold text-navy-800 sm:text-3xl">{heading}</h2>
            <div className="flex flex-wrap items-center gap-4">
              {/* Google Reviews badge */}
              <div className="flex items-center gap-3 rounded-2xl border border-ice-100 bg-white px-4 py-2.5 shadow-sm">
                <GoogleG className="h-8 w-8 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-[family-name:var(--font-montserrat)] text-2xl font-extrabold leading-none text-navy-800">{site.ratingValue}</span>
                    <span className="flex gap-0.5 text-gold">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" />)}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs font-semibold text-slate-500">Google Reviews · {site.reviewCount} reviews</div>
                </div>
              </div>
              <Link href="/contact" className="btn btn-primary !py-3 text-sm">Write a review</Link>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-ice-100 bg-ice-50 p-5">
            <div className="flex items-center gap-2 text-ice-600">
              <Star className="h-4 w-4" />
              <span className="text-sm font-bold">Why homeowners choose Daylight</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Consistently praised for written prices that don’t move, designs that match the utility actually billing the home, and clean, on-schedule installs — with straight answers even when the answer is “don’t buy solar yet.”
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.slice(0, 6).map((r, i) => <ReviewCard key={r.name} r={r} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
