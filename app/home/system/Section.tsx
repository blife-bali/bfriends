"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { processData } from "@/lib/process-data";
import SystemCard from "./Card";
import styles from "./Section.module.css";

// Photo asset for the BFriends system / journey section
const SYSTEM_IMAGE = "/images/Integrate/DDK09558.jpg";

export default function SystemSection() {
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
    const observer = new IntersectionObserver(
      ([entry]) => setIsImageInView(entry.isIntersecting),
      { threshold: 0.25, rootMargin: "0px" }
    );
    if (imageWrapperRef.current) observer.observe(imageWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Title container: eyebrow, title, intro */}
        <div className={styles.titleContainer}>
          <p className={styles.eyebrow}>Customer Journey</p>
          <h2 className={styles.heading}>A clear path to move, recover, and improve.</h2>
          
        </div>

        {/* Image block (mirrors intro video wrapper – image instead of video) */}
        <div className={styles.imageWrapper} ref={imageWrapperRef}>
          <div
            className={`${styles.imageInner} ${isImageInView ? styles.imageInnerVisible : styles.imageInnerBefore}`}
          >
            <Image
              src={SYSTEM_IMAGE}
              alt="BFriends system"
              fill
              className={styles.sectionImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1568px"
            />
          </div>
        </div>

        {/* Conclusion container (same structure as Intro) */}
        <div className={styles.conclusionContainer}>
          <div className={styles.leftConclusion}>
            <h2 className={styles.conclusionTitle}>Customer Journey</h2>
          </div>
          <div className={styles.rightConclusion}>
            <p className={styles.conclusionText}>
              Your journey at BFriends is designed step by step - starting from your baseline, tracking your
              progress, and adjusting as your body heals.
            </p>
            <p className={styles.conclusionText}>
              Each phase builds on the last, creating a structured yet flexible path that responds to your
              needs over time.
            </p>
            <p className={styles.conclusionText}>
              You don’t have to do everything at once. You simply begin where you are—and grow from there.
            </p>
            <Button
              href="/about/customer-journey"
              className={styles.conclusionButton}
              color="var(--color-blue-100)"
              showIcon
            >
              View Customer Journey
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
