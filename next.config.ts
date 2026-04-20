import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  // Vercel handles standalone output natively
  serverExternalPackages: ["bcryptjs"],
};

export default nextConfig;
