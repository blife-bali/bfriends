'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation/Navigation';
import Floater from '@/components/Floater/Floater';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navigation />}
      {children}
      {!isAdmin && <Floater />}
    </>
  );
}
