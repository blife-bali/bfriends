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

// [ NOTES ] Do not render <html>/<body> here — root app/layout.tsx already owns those.
// Nested document tags caused hydration errors and broke CMS Save button clicks. [ END NOTES ] //
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${libreBodoni.variable} antialiased`} style={{ margin: 0, minHeight: '100%' }}>
      {children}
    </div>
  );
}
