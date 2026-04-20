import type { Metadata } from 'next';
import { Rethink_Sans, Poppins } from 'next/font/google';
import './globals.css';

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-display',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'BFriends Admin CMS',
  description: 'Content Management System for BFriends',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${rethinkSans.variable} ${poppins.variable}`} style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
