import type { NextConfig } from "next";
import path from "path";

const r2Url = process.env.R2_URL || "";
let r2Host = "";
try {
  if (r2Url) r2Host = new URL(r2Url).hostname;
} catch {}

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: r2Host
      ? [{ protocol: "https", hostname: r2Host }]
      : [],
  },
};

export default nextConfig;
