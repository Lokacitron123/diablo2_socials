import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Opt in to caching
    staleTimes: {
      dynamic: 30,
    },
  },
};

export default nextConfig;
