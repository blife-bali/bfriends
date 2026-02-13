"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Loader.module.css";

const LOGO_FILL_DURATION_MS = 1200;
const FADE_OUT_DELAY_MS = 300;
const FADE_OUT_DURATION_MS = 400;

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutStart = LOGO_FILL_DURATION_MS + FADE_OUT_DELAY_MS;
    const completeAt = fadeOutStart + FADE_OUT_DURATION_MS;

    const startFadeOut = setTimeout(() => {
      setIsFadingOut(true);
    }, fadeOutStart);

    const handleComplete = setTimeout(() => {
      onComplete();
    }, completeAt);

    return () => {
      clearTimeout(startFadeOut);
      clearTimeout(handleComplete);
    };
  }, [onComplete]);

  return (
    <div
      className={`${styles.overlay} ${isFadingOut ? styles.fadeOut : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#FEFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isFadingOut ? 0 : 1,
        transition: "opacity 0.4s ease-out",
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
