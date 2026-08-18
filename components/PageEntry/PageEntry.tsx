"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import Footer from "@/components/Footer/Footer";

export default function PageEntry({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;
  const hideFooter = isAdmin || pathname === "/contact";
  const [phase, setPhase] = useState<"loader" | "ready">("loader");

  useEffect(() => {
    if (phase === "loader") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [phase]);

  return (
    <>
      {children}
      {phase === "ready" && !hideFooter && <Footer />}
      {phase === "loader" && <Loader onComplete={() => setPhase("ready")} />}
    </>
  );
}
