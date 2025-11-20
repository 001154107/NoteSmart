/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["tldraw"],

  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  turbopack: {},
};

export default nextConfig;
