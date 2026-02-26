import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zepqbywcloxqikdlmxdx.supabase.co",
      },
      {
        protocol: "https",
        hostname: "placeholder.supabase.co",
      }
    ],
  },
};

export default nextConfig;
