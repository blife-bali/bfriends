"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./Startup.module.css";

const FADE_OUT_DURATION_MS = 1000;

interface StartupProps {
  onComplete: (withSound: boolean) => void;
}

export default function Startup({ onComplete }: StartupProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleChoice = (withSound: boolean) => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete(withSound);
    }, FADE_OUT_DURATION_MS);
  };

  return (
    <div
      className={`${styles.overlay} ${isExiting ? styles.fadeOut : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(48px)",
        WebkitBackdropFilter: "blur(48px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      role="dialog"
      aria-label="Enter website"
    >
      <div className={styles.content}>
        <p className={styles.title}>How would you <br/>like to <em>enter</em>?</p>
        <div className={styles.choices}>
          <button
            type="button"
            className={`${styles.choice} ${styles.primary}`}
            onClick={() => handleChoice(true)}
          >
            <span className={styles.iconPart} aria-hidden>
              <Volume2 size={20} strokeWidth={1.5} />
            </span>
            <span className={styles.textPart}>With Ambience</span>
          </button>
          <button
            type="button"
            className={`${styles.choice} ${styles.border}`}
            onClick={() => handleChoice(false)}
          >
            <span className={styles.iconPart} aria-hidden>
              <VolumeX size={20} strokeWidth={1.5} />
            </span>
            <span className={styles.textPart}>With Silence</span>
          </button>
        </div>
      </div>
    </div>
  );
}
