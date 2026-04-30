"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button/Button";
import styles from "./Hero.module.css";

const DEFAULT_TITLE = "Find What Your Body Needs Today";
const DEFAULT_VIDEO = "/videos/BFriends2.mp4";

export default function Hero({ title = DEFAULT_TITLE, videoUrl = DEFAULT_VIDEO }: { title?: string; videoUrl?: string }) {
  const [blurAmount, setBlurAmount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const maxBlur = 10;
      const calculatedBlur = Math.min(maxBlur, (scrollY / heroHeight) * maxBlur);
      setBlurAmount(calculatedBlur);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.hero}>
      <video
        ref={videoRef}
        src={videoUrl}
        className={styles.background}
        style={{ filter: `blur(${blurAmount}px)` }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onEnded={(e) => {
          e.currentTarget.play().catch(() => undefined);
        }}
        aria-hidden
      />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.button}
            color="var(--color-white-100)"
            href="/about"
            showIcon
          >
            Learn More
          </Button>
          <Button
            className={styles.button}
            color="var(--color-white-100)"
            href="https://wa.me/6281128742021"
            showIcon
          >
            Reserve Schedule
          </Button>
        </div>
      </div>
    </section>
  );
}
