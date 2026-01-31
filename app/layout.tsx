import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Libre_Bodoni, Hanken_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-libre-bodoni",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bfriends.id"),
  title: "BFriends | Kerobokan Wellness Center | Opening 2026",
  description:
    "A wellness journey that begins with becoming a friend to yourself. Join bfriends in Kerobokan, Bali. Gym, Spa, and Community. Opening 2026.",
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
  authors: [{ name: "BFriends" }],
  openGraph: {
    title: "BFriends | Kerobokan Wellness Center",
    description:
      "A wellness journey that begins with becoming a friend to yourself. Opening soon in 2026.",
    url: "https://bfriends.id",
    siteName: "BFriends",
    images: [
      {
        url: "/images/icons/logo-bfriends hor.png",
        width: 1200,
        height: 630,
        alt: "BFriends Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BFriends - Kerobokan Wellness Center",
    description:
      "A wellness journey that begins with becoming a friend to yourself. Opening soon in 2026.",
    images: ["/images/icons/logo-bfriends hor.png"],
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
    canonical: "https://bfriends.id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${libreBodoni.variable} ${hankenGrotesk.variable}`}
    >
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
