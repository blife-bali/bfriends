"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import Startup from "@/components/Startup/Startup";
import Footer from "@/components/Footer/Footer";
import { useSound } from "@/contexts/SoundContext";

const STARTUP_SEEN_KEY = "bfriends-startup-seen";

export default function PageEntry({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setSoundEnabled, playAmbience } = useSound();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"loader" | "startup" | "ready">("loader");

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Prevent scroll during loader and startup so overlay stays fixed */
  useEffect(() => {
    if (phase === "loader" || phase === "startup") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [phase]);

  const handleLoaderComplete = () => {
    const isHome = pathname === "/" || pathname === "/home";
    const hasSeenStartup =
      typeof window !== "undefined" &&
      sessionStorage.getItem(STARTUP_SEEN_KEY) === "1";

    if (isHome && !hasSeenStartup) {
      setPhase("startup");
    } else {
      setPhase("ready");
    }
  };

  const handleStartupComplete = (withSound: boolean) => {
    if (withSound) {
      playAmbience();
    }
    setSoundEnabled(withSound);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STARTUP_SEEN_KEY, "1");
    }
    setPhase("ready");
  };

  /* Loader and Startup both mount from the start so resources load early; Loader on top (z-index) */
  if (!mounted) {
    return null;
  }

  if (phase === "loader" || phase === "startup") {
    return (
      <>
        <Startup onComplete={handleStartupComplete} />
        {children}
        <Loader
          onComplete={handleLoaderComplete}
          fadeOut={phase === "startup"}
        />
      </>
    );
  }

  /* Ready: show page content then footer so hero loads first */
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
