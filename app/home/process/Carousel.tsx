"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";
import { processData } from "@/lib/process-data";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger);

interface CarouselProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

export default function Carousel({ containerRef }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 0,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const viewportRef = useRef<HTMLElement | null>(null);
  const emblaContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Keep Embla's scroll snap logic for compatibility
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

  // GSAP ScrollTrigger Horizontal Scroll Implementation
  useEffect(() => {
    const section = sectionRef.current;
    const emblaContainer = emblaContainerRef.current;

    if (!section || !emblaContainer || !emblaApi) return;

    // Calculate the horizontal scroll distance
    // scrollWidth - offsetWidth gives us the total scrollable width
    const scrollWidth = emblaContainer.scrollWidth;
    const viewportWidth = emblaContainer.offsetWidth;
    const horizontalDistance = scrollWidth - viewportWidth;

    // If there's nothing to scroll, don't create the trigger
    if (horizontalDistance <= 0) return;

    // Get total slide count dynamically from Embla API
    // This includes the blank spacer card + all processData cards
    const actualSlideCount = emblaApi.slideNodes().length;

    // Disable Embla's built-in scroll behavior to avoid conflicts
    // We'll handle scrolling purely through GSAP
    emblaApi.reInit({
      startIndex: 1,
      align: "center",
      dragFree: true,
      containScroll: false,
    });

    // Create GSAP timeline for horizontal scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", // Pin when section hits top of viewport
        end: `+=${horizontalDistance}`, // Scroll distance based on carousel width
        pin: true, // Pin the section
        scrub: 1, // Smooth scrubbing - links animation to scrollbar position
        anticipatePin: 1, // Improves pin/unpin performance
        // Update progress bar based on scroll progress
        onUpdate: (self) => {
          const progress = self.progress;
          // Smooth progress bar - use continuous value directly
          setScrollProgress(progress);
          // Calculate current slide index for internal tracking
          // Use actual slide count from Embla (includes blank spacer)
          const currentSlide = Math.round(progress * actualSlideCount);
          setSelectedIndex(Math.max(0, Math.min(currentSlide, actualSlideCount)));
        },
        // Clean up when trigger is complete
        onLeaveBack: () => {
          // Reset position when scrolling back up past the section
          gsap.set(emblaContainer, { x: 0 });
          setScrollProgress(0);
          setSelectedIndex(0);
        },
      },
    });

    // Animate the container horizontally
    tl.to(emblaContainer, {
      x: -horizontalDistance, // Translate from 0 to -horizontalDistance
      ease: "none", // Linear animation for direct scroll mapping
    });

    // Cleanup function
    return () => {
      // Kill the timeline and scroll trigger
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
      // Reset transform
      gsap.set(emblaContainer, { x: 0 });
    };
  }, [emblaApi]);

  // Refresh ScrollTrigger on resize to ensure correct calculations
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
  <section className={styles.section} ref={sectionRef}>
    <div className={styles.carouselWrapper}>
      {/* Title Container */}
      <div className={styles.titleContainer}>
        <p className={styles.eyebrow}>Your Journey</p>
        <h1 className={styles.heading}>
          Simple Steps to Start Your <br/><em>Journey</em> to <em>Befriend</em> Yourself
        </h1>
      </div>

      {/* Carousel Container */}
      <div className={styles.embla} ref={emblaRef}>
        <div
          className={styles.emblaContainer}
          ref={emblaContainerRef}
        >
          {/* Blank spacer card for alignment */}
          <div
            className={styles.emblaSlide}
            aria-hidden="true"
          />
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
              width: `${scrollProgress * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  </section>
  );
}
