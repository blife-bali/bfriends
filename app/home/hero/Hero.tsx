"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button/Button";
import styles from "./Hero.module.css";

export default function Hero() {
  const [blurAmount, setBlurAmount] = useState(0);

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

  return (
    <section className={styles.hero}>
      <div className={styles.background} style={{ filter: `blur(${blurAmount}px)` }} aria-hidden />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.content}>
        <h1 className={styles.title}>Which <em>Friend</em> Do You Need Today?</h1>
        <div className={styles.buttonGroup}>
          <Button
            variant="border"
            className={styles.button}
            color="var(--color-white-100)"
            href="#learn-more"
            icon={<ArrowUpRight size={16} />}
          >
            Learn More
          </Button>
          <Button
            variant="border"
            className={styles.button}
            color="var(--color-white-100)"
            href="#reserve"
            icon={<ArrowUpRight size={16} />}
          >
            Reserve Schedule
          </Button>
        </div>
      </div>
    </section>
  );
}
