import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly bypass Turbopack for production builds due to Vercel caching bugs with static assets
  webpack: (config, { dev, isServer }) => {
    return config;
  },
  turbopack: {},
};

export default nextConfig;
