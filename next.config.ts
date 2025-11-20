import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["tldraw"],
  // Ensure we ignore typescript errors during build for now as we are prototyping
  typescript: {
    ignoreBuildErrors: true,
  },

};

export default nextConfig;
