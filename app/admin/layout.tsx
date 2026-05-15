import type { Metadata } from 'next';
import { Libre_Bodoni } from 'next/font/google';
import './globals.css';

const libreBodoni = Libre_Bodoni({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-libre-bodoni',
});

export const metadata: Metadata = {
  title: 'BFriends Admin CMS',
  description: 'Content Management System for BFriends',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={libreBodoni.variable}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kbz3vui.css" />
      </head>
      <body className="antialiased" style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
