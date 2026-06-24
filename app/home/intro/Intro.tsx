"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import parallax from "@/components/ParallaxSection/ParallaxSection.module.css";
import videoStyles from "@/components/VideoBlock/VideoBlock.module.css";
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
const DEFAULT_VIDEO = "/videos/BFriends2.mp4";

export interface IntroProps {
  headline?: string;
  body?: string;
  videoUrl?: string;
  showCta?: boolean;
  showMedia?: boolean;
  /** @deprecated Use showMedia */
  showImage?: boolean;
  showBlocks?: boolean;
}

export default function Intro({
  headline = DEFAULT_HEADLINE,
  body = DEFAULT_BODY,
  videoUrl = DEFAULT_VIDEO,
  showCta = true,
  showMedia,
  showImage,
  showBlocks = false,
}: IntroProps) {
  const shouldShowMedia = showMedia ?? showImage ?? true;
  const [isMediaInView, setIsMediaInView] = useState(false);
  const mediaWrapperRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");

  const { scrollYProgress } = useScroll({
    target: mediaWrapperRef,
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
          setIsMediaInView(true);
        } else if (scrollDirection.current === "up") {
          setIsMediaInView(false);
        }
      },
      { threshold: 0.25, rootMargin: "0px" }
    );
    if (mediaWrapperRef.current) observer.observe(mediaWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const textOnly = !shouldShowMedia && !showCta;
  return (
    <section className={`${styles.intro} ${textOnly ? styles.introTextOnly : ""}`}>
      <div className={styles.container}>
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

        {shouldShowMedia && (
          <div className={parallax.imageWrap} ref={mediaWrapperRef}>
            <div
              className={`${parallax.imageFrame} ${parallax.imageFrameRatio169} ${isMediaInView ? parallax.imageFrameVisible : parallax.imageFrameBefore}`}
            >
              <motion.div className={parallax.parallaxLayer} style={{ y }}>
                <video
                  src={videoUrl}
                  className={videoStyles.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
