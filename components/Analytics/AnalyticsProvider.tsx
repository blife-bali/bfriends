'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import RouteChangeTracker from './RouteChangeTracker';

export default function AnalyticsProvider({ measurementId }: { measurementId: string | null }) {
  const pathname = usePathname();

  if (!measurementId) return null;
  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <GoogleAnalytics measurementId={measurementId} />
      <Suspense fallback={null}>
        <RouteChangeTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}
