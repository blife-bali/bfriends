"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import Startup from "@/components/Startup/Startup";
import { useSound } from "@/contexts/SoundContext";

const STARTUP_SEEN_KEY = "bfriends-startup-seen";

export default function PageEntry({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setSoundEnabled } = useSound();
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"loader" | "startup" | "ready">("loader");

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setSoundEnabled(withSound);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STARTUP_SEEN_KEY, "1");
    }
    setPhase("ready");
  };

  /* Only run loader/startup flow after client mount so timers and storage work */
  if (!mounted || phase === "loader") {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  if (phase === "startup") {
    return (
      <>
        <Startup onComplete={handleStartupComplete} />
        {children}
      </>
    );
  }

  return <>{children}</>;
}
