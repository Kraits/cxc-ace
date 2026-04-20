import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  serverExternalPackages: ["bcryptjs", "@libsql/client"],
};

export default nextConfig;
