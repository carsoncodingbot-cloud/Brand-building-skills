import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The mascot is served self-hosted from /public once `npm run mascot` is
    // run (see components/Mascot.tsx). Until then it loads directly from the
    // source CDN in the visitor's browser (unoptimized), so these patterns are
    // a belt-and-suspenders allowance for any optimized remote usage.
    remotePatterns: [
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
      { protocol: "https", hostname: "d2ol7oe51mr4n9.cloudfront.net" },
    ],
  },
};

export default nextConfig;
