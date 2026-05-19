"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import SystemCard from "./Card";
import { trackEvent } from "@/lib/gtag";
import parallax from "@/components/ParallaxSection/ParallaxSection.module.css";
import styles from "./Section.module.css";

const SYSTEM_IMAGE = "/images/Integrate/DDK09558.jpg";
const DEFAULT_HEADING = "A clear path to move, recover, and improve.";
const DEFAULT_BODY = `Your journey at BFriends is designed step by step - starting from your baseline, tracking your
progress, and adjusting as your body heals.

Each phase builds on the last, creating a structured yet flexible path that responds to your
needs over time.

You don’t have to do everything at once. You simply begin where you are—and grow from there.`;

export default function SystemSection({ steps = [] }: { steps?: any[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 0,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
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

  const updateScrollProgress = useCallback(() => {
    if (!emblaApi) return;
    setScrollProgress(Math.min(emblaApi.scrollProgress(), 1));
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateScrollProgress();
    emblaApi.on("scroll", updateScrollProgress);
    emblaApi.on("reInit", updateScrollProgress);
    return () => {
      emblaApi.off("scroll", updateScrollProgress);
      emblaApi.off("reInit", updateScrollProgress);
    };
  }, [emblaApi, updateScrollProgress]);

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

  const homeSection = steps?.[0];
  const heading = homeSection?.title || DEFAULT_HEADING;
  const imageUrl = homeSection?.image || SYSTEM_IMAGE;
  const paragraphs = (homeSection?.description || DEFAULT_BODY)
    .split('\n\n')
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Title container: eyebrow, title, intro */}
        {/* <div className={styles.titleContainer}>
          <p className={styles.eyebrow}>Customer Journey</p>
          <h2 className={styles.heading}>{heading}</h2>
          
        </div> */}

        {/* Image block (mirrors intro video wrapper – image instead of video) */}
        <div className={parallax.imageWrap} ref={imageWrapperRef}>
          <div
            className={`${parallax.imageFrame} ${parallax.imageFrameRatio169} ${isImageInView ? parallax.imageFrameVisible : parallax.imageFrameBefore}`}
          >
            <motion.div className={parallax.parallaxLayer} style={{ y }}>
              <Image
                src={imageUrl}
                alt="BFriends system"
                fill
                className={parallax.coverImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1568px"
              />
            </motion.div>
          </div>
        </div>

        {/* Conclusion container (same structure as Intro) */}
        <div className={parallax.copyGrid}>
          <div className={parallax.copyColLeft}>
            <h2 className={`${parallax.copyTitle} ${parallax.copyTitleLg}`}>BFriends Journey</h2>
          </div>
          <div className={`${parallax.copyColRight} ${styles.rightConclusion}`}>
            {paragraphs.map((paragraph: string, idx: number) => (
              <p key={idx} className={parallax.copyBody}>{paragraph}</p>
            ))}
            <Button
              href="/about/journey"
              className={styles.conclusionButton}
              color="var(--color-blue-100)"
              onClick={() => trackEvent('cta_click', { label: 'view_customer_journey', location: 'home_system' })}
            >
              View BFriends Journey
            </Button>
          </div>
        </div>

        {/* Desktop: Embla carousel of system cards
        <div className={styles.carouselWrapper}>
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
            aria-label="Previous"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
          >
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {processData.map((step) => (
                <div key={step.id} className={styles.emblaSlide}>
                  <SystemCard step={step} />
                </div>
              ))}
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressIndicator}
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
            aria-label="Next"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
          >
            <ChevronRight size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile: vertical stack of system cards */}
        {/* <div className={styles.carouselWrapperMobile}>
          <div className={styles.mobileCardsContainer}>
            {processData.map((step) => (
              <div key={step.id} className={styles.mobileSlide}>
                <SystemCard step={step} />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}