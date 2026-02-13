"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Loader.module.css";

const LOGO_FILL_DURATION_MS = 1200;

interface LoaderProps {
  onComplete?: () => void;
  /** When true, overlay fades out (e.g. parent switched to startup, same Loader instance) */
  fadeOut?: boolean;
}

export default function Loader({ onComplete, fadeOut = false }: LoaderProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (fadeOut) {
      /* Parent set phase to startup: trigger fade so we reveal Startup underneath */
      const raf = requestAnimationFrame(() => setIsFadingOut(true));
      return () => cancelAnimationFrame(raf);
    }

    const completeAt = LOGO_FILL_DURATION_MS;
    const t = setTimeout(() => {
      onComplete?.();
      setIsFadingOut(true);
    }, completeAt);
    return () => clearTimeout(t);
  }, [onComplete, fadeOut]);

  return (
    <div
      className={`${styles.overlay} ${isFadingOut ? styles.fadeOut : ""} ${fadeOut ? styles.logoComplete : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        backgroundColor: "#FEFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-hidden="true"
    >
      <div className={styles.logoWrapper}>
        <Image
          src="/images/icons/logo-default.svg"
          alt=""
          width={195}
          height={40}
          className={styles.logoBase}
          priority
          aria-hidden
        />
        <div className={styles.logoFillWrapper}>
          <Image
            src="/images/icons/logo-default.svg"
            alt="BFriends"
            width={195}
            height={40}
            className={styles.logoFill}
            priority
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
