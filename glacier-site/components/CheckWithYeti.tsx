import Mascot from "@/components/Mascot";
import SystemCheck from "@/components/SystemCheck";

/**
 * The 60-Second System Check with the yeti peeking over the top edge of
 * the card — he's presenting the form, so the eye lands on question 1.
 * His lower body simply sits behind the opaque card (z-order), which is
 * also what keeps the source art's baked bottom zone permanently hidden.
 */
export default function CheckWithYeti() {
  return (
    <div className="relative pt-16">
      {/* frosty glow behind the peeking head */}
      <div className="pointer-events-none absolute right-4 top-0 h-28 w-32 rounded-full bg-turquoise/35 blur-2xl" aria-hidden />
      {/* yeti peeking over the card */}
      <div className="absolute right-3 top-0 z-0 w-[118px] animate-float sm:right-5 sm:w-[132px]">
        <Mascot
          alt="Glacier's yeti mascot peeking over the 60-second system check"
          width={896} height={1200} priority sizes="132px"
          className="h-auto w-full"
        />
      </div>
      {/* speech bubble */}
      <div className="absolute right-[7.4rem] top-4 z-20 sm:right-[8.6rem]">
        <div className="rounded-2xl rounded-br-sm bg-white px-3.5 py-2 shadow-xl ring-1 ring-ice-100">
          <p className="whitespace-nowrap text-xs font-bold text-navy-800">60 seconds. I timed it.</p>
        </div>
      </div>
      <div className="relative z-10">
        <SystemCheck />
      </div>
    </div>
  );
}
