"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import styles from "./Intro.module.css";

const DEFAULT_HEADLINE = "A journey to become your own friend.";
const DEFAULT_BODY =
  "BFriends is a wellness hub in Kerobokan, Bali. A place created to reconnect with the oldest companion in your life, yourself. Here, wellness is not about pushing limits or chasing outcomes. It is about understanding, accepting, and caring for your body and mind through intentional movement, mindful rest, and restoration.";

export interface IntroProps {
  headline?: string;
  body?: string;
  showCta?: boolean;
  showVideo?: boolean;
}

export default function Intro({
  headline = DEFAULT_HEADLINE,
  body,
  showCta = true,
  showVideo = true,
}: IntroProps) {
  const [isInView, setIsInView] = useState(false);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!showVideo) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
        else setIsInView(false);
      },
      { threshold: 0.25, rootMargin: "0px" }
    );
    if (videoWrapperRef.current) observer.observe(videoWrapperRef.current);
    return () => observer.disconnect();
  }, [showVideo]);

  const textOnly = !showVideo && !showCta;
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

        {showVideo && (
          <div className={styles.videoWrapper} ref={videoWrapperRef}>
            <video
              className={`${styles.video} ${isInView ? styles.videoVisible : styles.videoBefore}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/videos/hero/Venue-4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
