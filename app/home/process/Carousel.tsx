"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";
import { processData } from "@/lib/process-data";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger);

interface CarouselProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

export default function Carousel({ containerRef }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 1,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(1);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const viewportRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!containerRef?.current || !emblaApi || !viewportRef.current) return;

    const carouselElement = viewportRef.current as HTMLElement;

    const handleWheel = (e: WheelEvent) => {
      const isAtStart = emblaApi.canScrollPrev();
      const isAtEnd = emblaApi.canScrollNext();

      // Allow vertical scroll if carousel is at start or end
      if (isAtStart || isAtEnd) {
        return; // Let it scroll naturally
      }

      // Prevent vertical scroll when carousel can scroll horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
      }
    };

    // Only add wheel listener if carousel is in view
    const scrollTrigger = ScrollTrigger.create({
      trigger: carouselElement,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        carouselElement.addEventListener("wheel", handleWheel, { passive: false });
      },
      onLeave: () => {
        carouselElement.removeEventListener("wheel", handleWheel);
      },
    });

    return () => {
      scrollTrigger.kill();
      carouselElement.removeEventListener("wheel", handleWheel);
    };
  }, [emblaApi, containerRef]);

  const handleScrollPrev = () => emblaApi?.scrollPrev();
  const handleScrollNext = () => emblaApi?.scrollNext();

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.embla} ref={emblaRef} {...({ ref: viewportRef } as any)}>
        <div className={styles.emblaContainer}>
          {processData.map((step, index) => (
            <div
              key={step.id}
              className={styles.emblaSlide}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
            >
              <Card step={step} index={index} />
            </div>
          ))}
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressIndicator}
            style={{
              width: `${((selectedIndex + 1) / processData.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className={clsx(styles.carouselButton, styles.carouselButtonPrev)}
        onClick={handleScrollPrev}
        disabled={!emblaApi?.canScrollPrev()}
        aria-label="Previous"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className={clsx(styles.carouselButton, styles.carouselButtonNext)}
        onClick={handleScrollNext}
        disabled={!emblaApi?.canScrollNext()}
        aria-label="Next"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
