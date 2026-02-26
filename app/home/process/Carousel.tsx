"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./Carousel.module.css";
import {
  processData,
  processSectionTitle,
  processSectionIntro,
} from "@/lib/process-data";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card";

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 0,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollProgress = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.min(emblaApi.scrollProgress(), 1);
    setScrollProgress(progress);
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

  return (
    <section className={styles.section}>
      {/* Desktop: title + carousel */}
      <div className={styles.desktopBlock}>
        <div className={styles.titleContainer}>
          <p className={styles.eyebrow}>Our Process</p>
          <h1 className={styles.heading}>{processSectionTitle}</h1>
          <p className={styles.intro}>{processSectionIntro}</p>
        </div>
        <div className={styles.carouselWrapper}>
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
            aria-label="Previous step"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
          >
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {processData.map((step, index) => (
                <div key={step.id} className={styles.emblaSlide}>
                  <Card step={step} index={index} />
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
            aria-label="Next step"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
          >
            <ChevronRight size={28} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Tablet/Mobile: title + vertical stack */}
      <div className={styles.carouselWrapperMobile}>
        <div className={styles.titleContainer}>
          <p className={styles.eyebrow}>Our Process</p>
          <h1 className={styles.heading}>{processSectionTitle}</h1>
          <p className={styles.intro}>{processSectionIntro}</p>
        </div>
        <div className={styles.mobileCardsContainer}>
          {processData.map((step, index) => (
            <div key={step.id} className={styles.mobileSlide}>
              <Card step={step} index={index} variant="mobileCard" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
