import type { NextConfig } from "next";

/**
 * EXPORT mode (set EXPORT=true) builds a fully static site into `out/` for
 * hosting on GitHub Pages under a repo subpath. Normal `next build`/`next dev`
 * are untouched so local development still serves from the root.
 */
const isExport = process.env.EXPORT === "true";
// Repo name → GitHub Pages serves a project site at /<repo>/.
const repoBasePath = "/Brand-building-skills";

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export",
        basePath: repoBasePath,
        trailingSlash: true,
      }
    : {}),
  images: {
    // Static export can't run the image optimizer, and the mascot loads from a
    // remote CDN anyway, so serve every image unoptimized in export mode. In
    // normal mode the mascot self-hosts from /public once `npm run mascot` runs
    // (see components/Mascot.tsx); until then it loads from the CDN directly.
    unoptimized: isExport,
    remotePatterns: [
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
      { protocol: "https", hostname: "d2ol7oe51mr4n9.cloudfront.net" },
    ],
  },
};

export default nextConfig;
