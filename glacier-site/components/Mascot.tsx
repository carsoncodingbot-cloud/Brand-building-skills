import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Glacier's yeti mascot — the face of the brand.
 *
 * Bulletproof source resolution (evaluated at build time on the server):
 *  1. If /public/mascot.png (or .webp) exists, use the self-hosted file and let
 *     Next optimize it. This is the preferred production path — run
 *     `npm run mascot` once to download it, or drop your own art in /public.
 *  2. Otherwise fall back to the original AI-generated art on the CDN and mark
 *     it `unoptimized` so the *visitor's browser* loads it straight from the
 *     source. That means it renders everywhere, even if the hosting server
 *     itself can't reach the CDN. The mascot never silently disappears.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");
const LOCAL_CANDIDATES = ["mascot.webp", "mascot.png"];

function resolveMascot(): { src: string; local: boolean } {
  for (const file of LOCAL_CANDIDATES) {
    try {
      if (fs.existsSync(path.join(PUBLIC_DIR, file))) {
        return { src: `/${file}`, local: true };
      }
    } catch {
      /* fs not available in this runtime — fall through to remote */
    }
  }
  return { src: site.mascotUrl, local: false };
}

const { src, local } = resolveMascot();

export default function Mascot({
  alt = "Glacier Heating & Air yeti mascot",
  width,
  height,
  className,
  priority = false,
  sizes,
}: {
  alt?: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      unoptimized={!local}
      className={["mascot-sticker", className].filter(Boolean).join(" ")}
    />
  );
}
