"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  const [blurAmount, setBlurAmount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const HERO_VIDEO_DURATION_SECONDS = 36;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const maxBlur = 10; // Maximum blur in pixels

      // Calculate blur based on scroll distance from hero
      // Blur increases as you scroll further down from hero
      const calculatedBlur = Math.min(maxBlur, (scrollY / heroHeight) * maxBlur);
      setBlurAmount(calculatedBlur);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= HERO_VIDEO_DURATION_SECONDS) {
        video.currentTime = 0;
        video.play().catch(() => undefined);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <section className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.background}
        style={{ filter: `blur(${blurAmount}px)` }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onEnded={(e) => {
          // Safety net: some browsers may not re-loop reliably when style updates occur.
          e.currentTarget.play().catch(() => undefined);
        }}
        aria-hidden
      >
        <source src="/videos/N - Yoga.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay} aria-hidden />
      <div className={styles.content}>
        <h1 className={styles.title}>Find What Your Body Needs Today</h1>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.button}
            color="var(--color-white-100)"
            href="#learn-more"
            showIcon
          >
            Learn More
          </Button>
          <Button
            className={styles.button}
            color="var(--color-white-100)"
            href="#reserve"
            showIcon
          >
            Reserve Schedule
          </Button>
        </div>
      </div>
    </section>
  );
}
