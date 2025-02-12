import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["serpapi.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "serpapi.com",
      },
    ],
  },
};

export default nextConfig;
