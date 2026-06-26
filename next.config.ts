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
  async redirects() {
    return [
      {
        source: "/about/philosophy",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about/customer-journey",
        destination: "/journey",
        permanent: true,
      },
      {
        source: "/about/journey",
        destination: "/journey",
        permanent: true,
      },
      {
        source: "/about/staff",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/community/bfriends-journal",
        destination: "/community/journal",
        permanent: true,
      },
      {
        source: "/community/blife-ecosystem-news",
        destination: "/community/journal",
        permanent: true,
      },
      {
        source: "/treatment/beauty-treatments",
        destination: "/spa/facials",
        permanent: true,
      },
      {
        source: "/treatment/spa-treatment",
        destination: "/spa/spa",
        permanent: true,
      },
      {
        source: "/treatment/:slug",
        destination: "/spa/:slug",
        permanent: true,
      },
      {
        source: "/about/facilities",
        destination: "/facilities",
        permanent: true,
      },
      {
        source: "/about/facilities/:slug",
        destination: "/facilities/:slug",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storageb.awancode.com" },
      ...(r2Host ? [{ protocol: "https" as const, hostname: r2Host }] : []),
    ],
  },
};

export default nextConfig;
