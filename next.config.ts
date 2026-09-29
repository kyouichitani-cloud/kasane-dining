import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.GITHUB_ACTIONS === "true"
    ? {
        output: "export" as const,
        basePath: "/kasane-dining",
        assetPrefix: "/kasane-dining/",
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: process.env.GITHUB_ACTIONS === "true",
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
