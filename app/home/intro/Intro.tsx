"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import styles from "./Intro.module.css";

const DEFAULT_HEADLINE = "Feeling tired, out of balance, or stuck in a routine?";
const DEFAULT_BODY =
  "Your body doesn’t always need more effort; sometimes it needs the right kind of care. At the center of Kerobokan, Bali, BFriends will help you start where you are and guide you toward what you need.";

// Authentic photo assets aligned to the section meaning (movement + restoration)
const INTRO_IMAGE = "/images/intro.jpg";

export interface IntroProps {
  headline?: string;
  body?: string;
  imageUrl?: string;
  showCta?: boolean;
  showImage?: boolean;
}

export default function Intro({
  headline = DEFAULT_HEADLINE,
  body = DEFAULT_BODY,
  imageUrl = INTRO_IMAGE,
  showCta = true,
  showImage = true,
}: IntroProps) {
  const [isImageInView, setIsImageInView] = useState(false);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");

  const { scrollYProgress } = useScroll({
    target: imageWrapperRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.4,
  });
  const y = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY !== lastScrollY.current) {
        scrollDirection.current = currentY > lastScrollY.current ? "down" : "up";
        lastScrollY.current = currentY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsImageInView(true);
        } else if (scrollDirection.current === "up") {
          setIsImageInView(false);
        }
      },
      { threshold: 0.25, rootMargin: "0px" }
    );
    if (imageWrapperRef.current) observer.observe(imageWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const textOnly = !showImage && !showCta;
  return (
    <section className={`${styles.intro} ${textOnly ? styles.introTextOnly : ""}`}>
      <div className={styles.container}>
        <div className={styles.textColumn}>
          {body != null && body !== "" && (
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>
                <span className={styles.maskWrap}>
                  {/* <motion.span
                    className={styles.maskInner}
                    initial={{ y: "100%" }}
                    animate={textInView ? { y: "0%" } : { y: "100%" }}
                    transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    {body}
                  </motion.span> */}
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
              <motion.div className={styles.parallaxLayer} style={{ y }}>
                <Image
                  src={imageUrl}
                  alt="BFriends"
                  fill
                  className={styles.sectionImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1568px"
                />
              </motion.div>
            </div>
          </div>
        )}

        <div className={styles.conclusionContainer}>
          <div className={styles.leftConclusion}>
            <h2 className={styles.conclusionTitle}>{headline}</h2>
          </div>
          <div className={styles.rightConclusion}>
            <p className={styles.conclusionText}>{body}</p>
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
