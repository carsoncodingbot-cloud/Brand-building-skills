import Link from "next/link";
import { site } from "@/lib/site";
import { Phone } from "@/components/Icons";

export default function CtaBand({
  title = "Ready for your real number?",
  text = "Sixty seconds of questions, zero pressure — and every figure in writing before anyone visits your house.",
}: { title?: string; text?: string }) {
  return (
    <section className="bg-navy-800 py-14">
      <div className="container-x flex flex-col items-center gap-6 text-center">
        <div>
          <h2 className="iced iced-light text-2xl sm:text-3xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/85">{text}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={site.phoneHref} className="btn btn-primary">
            <Phone className="h-4 w-4" /> {site.phoneDisplay}
          </Link>
          <Link href="/quote" className="btn btn-outline-light">Start the 60-Second Check</Link>
        </div>
      </div>
    </section>
  );
}
