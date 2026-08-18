import type { Metadata } from "next";
import { Libre_Bodoni } from "next/font/google";
import MainLayout from "@/components/MainLayout/MainLayout";
import PageEntry from "@/components/PageEntry/PageEntry";
import AnalyticsProvider from "@/components/Analytics/AnalyticsProvider";
import LenisProvider from "@/components/Lenis/LenisProvider";
import { SoundProvider } from "@/contexts/SoundContext";
import { getGoogleAnalyticsId } from "@/lib/gtag-server";
import "./globals.css";

const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-libre-bodoni",
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "BFriends";
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "A wellness journey that begins with becoming a friend to yourself. Join bfriends in Kerobokan, Bali. Gym, Spa, and Community. Opening 2026.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bfriends.id";
const ogImage = process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE || "/images/icons/logo-bfriends hor.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteName} | Kerobokan Wellness Center | Opening 2026`,
  description: siteDescription,
  keywords: [
    "wellness",
    "gym",
    "spa",
    "bali",
    "kerobokan",
    "bfriends",
    "recovery",
    "health",
    "fitness",
    "community",
  ],
  authors: [{ name: siteName }],
  openGraph: {
    title: `${siteName} | Kerobokan Wellness Center`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${siteName} Logo`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Kerobokan Wellness Center`,
    description: siteDescription,
    images: [ogImage],
  },
  icons: {
    icon: "/images/icons/B-logo.png",
    apple: "/images/icons/B-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = await getGoogleAnalyticsId();

  return (
    <html
      lang="en"
      className={libreBodoni.variable}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kbz3vui.css" />
      </head>
      <body className="antialiased">
        <AnalyticsProvider measurementId={gaId} />
        <LenisProvider>
          <SoundProvider>
            <MainLayout>
              <PageEntry>{children}</PageEntry>
            </MainLayout>
          </SoundProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
