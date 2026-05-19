"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import "lenis/dist/lenis.css";

const lenisOptions: LenisOptions = {
  autoRaf: true,
  lerp: 0.1,
  smoothWheel: true,
  allowNestedScroll: true,
  anchors: true,
  stopInertiaOnNavigate: true,
};

function LenisScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isAdmin || reduceMotion) {
    return children;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      <LenisScrollToTop />
      {children}
    </ReactLenis>
  );
}
