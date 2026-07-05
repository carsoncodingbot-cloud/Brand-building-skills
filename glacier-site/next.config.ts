import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Original AI-generated mascot is currently served from this CDN.
    // TODO for production: download it to /public/mascot.png and drop this.
    remotePatterns: [
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
    ],
  },
};

export default nextConfig;
