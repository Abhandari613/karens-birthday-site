import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zepqbywcloxqikdlmxdx.supabase.co",
      },
      // Keep placeholder if needed
      {
        protocol: "https",
        hostname: "placeholder.supabase.co",
      },
      // Spotify album covers (future)
      {
        protocol: "https",
        hostname: "i.scdn.co",
      }
    ],
  },
};

export default nextConfig;
