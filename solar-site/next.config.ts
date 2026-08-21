import type { NextConfig } from "next";

/**
 * EXPORT mode (set EXPORT=true) builds a fully static site into `out/` for
 * hosting on GitHub Pages under a repo subpath. Normal `next build`/`next dev`
 * are untouched so local development still serves from the root.
 */
const isExport = process.env.EXPORT === "true";
// Served from the root of the production domain, so no basePath.

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {}),
  images: {
    // Static export can't run the image optimizer; all art is local or inline SVG.
    unoptimized: isExport,
  },
};

export default nextConfig;
