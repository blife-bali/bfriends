"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  CircleHelp,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useSound } from "@/contexts/SoundContext";
import styles from "./Floater.module.css";

export default function Floater() {
  const { soundEnabled, setSoundEnabled, playAmbience } = useSound();

  const handleAudioToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) {
      playAmbience();
    }
  };

  return (
    <div className={styles.floater} aria-label="Quick actions">
      <Link
        href="/contact"
        className={styles.button}
        aria-label="Contact us"
      >
        <Mail size={22} strokeWidth={1.5} />
      </Link>
      <Link
        href="/faq"
        className={styles.button}
        aria-label="FAQ"
      >
        <CircleHelp size={22} strokeWidth={1.5} />
      </Link>
      <button
        type="button"
        className={styles.button}
        onClick={handleAudioToggle}
        aria-label={soundEnabled ? "Mute ambience" : "Play ambience"}
      >
        {soundEnabled ? (
          <Volume2 size={22} strokeWidth={1.5} />
        ) : (
          <VolumeX size={22} strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
