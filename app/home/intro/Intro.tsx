"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import parallax from "@/components/ParallaxSection/ParallaxSection.module.css";
import styles from "./Intro.module.css";

const CONTENT_BLOCKS = [
  {
    title: "Data-Driven Assessment",
    body: "Gain valuable insights into your body's current condition through a comprehensive wellness assessment.",
  },
  {
    title: "Personalised Recommendations",
    body: "Receive tailored guidance based on your individual needs, goals, and lifestyle.",
  },
  {
    title: "Expert-Led Support",
    body: "Work alongside experienced wellness professionals who help you navigate every stage of your journey.",
  },
];

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
  showBlocks?: boolean;
}

export default function Intro({
  headline = DEFAULT_HEADLINE,
  body = DEFAULT_BODY,
  imageUrl = INTRO_IMAGE,
  showCta = true,
  showImage = true,
  showBlocks = false,
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
    mass: 0.01,
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
        {/* 1. Centered Header */}
        <div className={styles.textColumn}>
          <div className={styles.descriptionContainer}>
            <h2 className={styles.heading}>{headline}</h2>
            <p className={styles.description}>{body}</p>
            {showCta && (
              <Button
                href="/about"
                className={styles.button}
                color="var(--color-blue-100)"
              >
                About Us
              </Button>
            )}
          </div>
        </div>

        {/* 2. Content Blocks */}
        {showBlocks && (
          <div className={styles.contentBlocks}>
            {CONTENT_BLOCKS.map((block, i) => (
              <div key={block.title} className={styles.contentBlock}>
                <span className={styles.contentBlockNumber}>0{i + 1}</span>
                <h3 className={styles.contentBlockTitle}>{block.title}</h3>
                <p className={styles.contentBlockBody}>{block.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* 3. Parallax Image */}
        {showImage && (
          <div className={parallax.imageWrap} ref={imageWrapperRef}>
            <div
              className={`${parallax.imageFrame} ${parallax.imageFrameRatioIntro} ${isImageInView ? parallax.imageFrameVisible : parallax.imageFrameBefore}`}
            >
              <motion.div className={parallax.parallaxLayer} style={{ y }}>
                <Image
                  src={imageUrl}
                  alt="BFriends"
                  fill
                  className={parallax.coverImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1568px"
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}