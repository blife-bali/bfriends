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

const SYSTEM_IMAGE = "/images/programs/D.webp";

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
          {/* <p className={styles.eyebrow}>The System</p> */}
          <h2 className={styles.heading}>It's Not What You Do. <br/> It's The State You Return To.</h2>
          
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
              An expert-driven, data-led system integrated into a routine and validated by results.
            </p>
            <Button
              href="/about"
              variant="underline"
              className={styles.conclusionButton}
              color="var(--color-blue-100)"
              icon={<ArrowUpRight size={16} />}
            >
              Learn More
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
