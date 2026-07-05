// One-time mascot localizer.
//
// Downloads the brand mascot from its source URL (defined in lib/site.ts) into
// /public so the site serves it self-hosted instead of hot-linking a CDN.
// Run once after cloning:  npm run mascot
//
// Once /public/mascot.png exists, components/Mascot.tsx automatically uses it
// (optimized by Next) instead of the remote URL. Safe to re-run.

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Pull the mascot URL straight out of lib/site.ts so there is a single source
// of truth — no need to keep this script in sync by hand.
function readMascotUrl() {
  const siteSrc = readFileSync(join(root, "lib", "site.ts"), "utf8");
  const m = siteSrc.match(/mascotUrl:\s*\n?\s*["'`]([^"'`]+)["'`]/);
  if (!m) throw new Error("Could not find mascotUrl in lib/site.ts");
  return m[1];
}

async function main() {
  const url = readMascotUrl();
  console.log(`Downloading mascot from:\n  ${url}\n`);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: HTTP ${res.status} ${res.statusText}`);

  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(join(root, "public"), { recursive: true });
  const out = join(root, "public", "mascot.png");
  await writeFile(out, buf);

  console.log(`✅ Saved ${(buf.length / 1024).toFixed(0)} KB to public/mascot.png`);
  console.log("The site will now serve the mascot self-hosted (optimized by Next.js).");
}

main().catch((err) => {
  console.error("\n❌ Could not localize the mascot.");
  console.error(`   ${err.message}`);
  console.error("\nThe site still works — components/Mascot.tsx falls back to the");
  console.error("remote CDN URL, which loads directly in visitors' browsers.");
  process.exit(1);
});
