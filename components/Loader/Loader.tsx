"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Loader.module.css";

const LOGO_FILL_DURATION_MS = 1200;
const HOLD_MS = 400;
const FADE_MS = 1400;

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const completedRef = useRef(false);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onCompleteRef.current?.();
  };

  useEffect(() => {
    const fadeAt = LOGO_FILL_DURATION_MS + HOLD_MS;
    const fadeTimer = setTimeout(() => setIsFadingOut(true), fadeAt);
    const doneTimer = setTimeout(finish, fadeAt + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div
      className={`${styles.overlay} ${isFadingOut ? styles.fadeOut : ""}`}
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
      onTransitionEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.propertyName === "opacity") finish();
      }}
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
