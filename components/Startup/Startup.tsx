"use client";

import React from "react";
import styles from "./Startup.module.css";

interface StartupProps {
  onComplete: (withSound: boolean) => void;
}

export default function Startup({ onComplete }: StartupProps) {
  return (
    <div
      className={styles.overlay}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        backgroundColor: "rgba(254, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      role="dialog"
      aria-label="Enter website"
    >
      <div className={styles.content}>
        <p className={styles.title}>How would you like to enter?</p>
        <div className={styles.choices}>
          <button
            type="button"
            className={`${styles.choice} ${styles.primary}`}
            onClick={() => onComplete(true)}
          >
            Enter with sound
          </button>
          <button
            type="button"
            className={`${styles.choice} ${styles.secondary}`}
            onClick={() => onComplete(false)}
          >
            Enter without sound
          </button>
        </div>
      </div>
    </div>
  );
}
