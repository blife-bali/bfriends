"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import styles from "./Intro.module.css";

const DEFAULT_HEADLINE = "A journey to become your own friend.";
const DEFAULT_BODY =
  "BFriends is a wellness hub in Kerobokan, Bali. A place created to reconnect with the oldest companion in your life, yourself. Here, wellness is not about pushing limits or chasing outcomes. It is about understanding, accepting, and caring for your body and mind through intentional movement, mindful rest, and restoration.";

// Authentic photo assets aligned to the section meaning (movement + restoration)
const INTRO_IMAGE = "/images/Restore/DDK00016.webp";

export interface IntroProps {
  headline?: string;
  body?: string;
  showCta?: boolean;
  showImage?: boolean;
}

export default function Intro({
  headline = DEFAULT_HEADLINE,
  body,
  showCta = true,
  showImage = true,
}: IntroProps) {
  const [isImageInView, setIsImageInView] = useState(false);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsImageInView(entry.isIntersecting),
      { threshold: 0.25, rootMargin: "0px" }
    );
    if (imageWrapperRef.current) observer.observe(imageWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const textOnly = !showImage && !showCta;
  return (
    <section className={`${styles.intro} ${textOnly ? styles.introTextOnly : ""}`}>
      <div className={styles.container}>
        <div ref={textRef} className={styles.textColumn}>
          <div className={styles.headingContainer}>
            <p className={styles.combinedParagraph}>
              <span className={styles.heading}>
                <span className={styles.maskWrap}>
                  <motion.span
                    className={styles.maskInner}
                    initial={{ y: "100%" }}
                    animate={textInView ? { y: "0%" } : { y: "100%" }}
                    transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    {headline}
                  </motion.span>
                </span>
              </span>
            </p>
          </div>
          {body != null && body !== "" && (
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>
                <span className={styles.maskWrap}>
                  <motion.span
                    className={styles.maskInner}
                    initial={{ y: "100%" }}
                    animate={textInView ? { y: "0%" } : { y: "100%" }}
                    transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    {body}
                  </motion.span>
                </span>
              </p>
            </div>
          )}
        </div>

        {showImage && (
          <div className={styles.imageWrapper} ref={imageWrapperRef}>
            <div
              className={`${styles.imageInner} ${isImageInView ? styles.imageInnerVisible : styles.imageInnerBefore}`}
            >
              <Image
                src={INTRO_IMAGE}
                alt="BFriends"
                fill
                className={styles.sectionImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1568px"
              />
            </div>
          </div>
        )}

        <div className={styles.conclusionContainer}>
          <div className={styles.leftConclusion}>
            <h2 className={styles.conclusionTitle}>About BFriends.</h2>
          </div>
          <div className={styles.rightConclusion}>
            <p className={styles.conclusionText}>{DEFAULT_BODY}</p>
            {showCta && (
              <Button
                href="/about"
                className={styles.button}
                color="var(--color-blue-100)"
                showIcon
              >
                About Us
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
