"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import styles from "./Hero.module.css";

const DEFAULT_TITLE = "Find What Your Body Needs Today";
const DEFAULT_SUBTITLE =
  "A personalized wellness journey powered by advanced body assessment technology and expert guidance, designed to evolve with your body's changing needs.";
const DEFAULT_IMAGE = "/images/intro.jpg";

export default function Hero({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  imageUrl = DEFAULT_IMAGE,
}: {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
}) {
  const [blurAmount, setBlurAmount] = useState(0);

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
      <Image
        src={imageUrl}
        alt=""
        fill
        priority
        className={styles.background}
        style={{ filter: `blur(${blurAmount}px)` }}
        sizes="100vw"
        aria-hidden
      />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        <div className={styles.buttonGroup}>
          <Button
            variant="border"
            className={styles.buttonPrimary}
            color="var(--color-white-100)"
            href="/about"
          >
            Discover The BFriends Method
          </Button>
          <Button
            className={styles.buttonSecondary}
            color="var(--color-white-100)"
            href="/programs"
          >
            Explore Programmes
          </Button>
        </div>
      </div>
    </section>
  );
}
