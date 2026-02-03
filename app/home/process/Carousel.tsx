"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";
import { processData } from "@/lib/process-data";
import useEmblaCarousel from "embla-carousel-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_BREAKPOINT = 1025;

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 0,
    align: "center",
  });
  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  const [scrollProgress, setScrollProgress] = useState(0);
  const emblaContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {};
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // GSAP only on desktop; skip entirely on tablet/mobile
  useEffect(() => {
    if (!isDesktop) return;

    const section = sectionRef.current;
    const emblaContainer = emblaContainerRef.current;

    if (!section || !emblaContainer || !emblaApi) return;

    const scrollWidth = emblaContainer.scrollWidth;
    const viewportWidth = emblaContainer.offsetWidth;
    const horizontalDistance = scrollWidth - viewportWidth;

    if (horizontalDistance <= 0) return;

    const actualSlideCount = emblaApi.slideNodes().length;

    emblaApi.reInit({
      startIndex: 1,
      align: "center",
      dragFree: true,
      containScroll: false,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${horizontalDistance}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
        onLeaveBack: () => {
          gsap.set(emblaContainer, { x: 0 });
          setScrollProgress(0);
        },
      },
    });

    tl.to(emblaContainer, {
      x: -horizontalDistance,
      ease: "none",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
      gsap.set(emblaContainer, { x: 0 });
    };
  }, [isDesktop, emblaApi]);

  useEffect(() => {
    if (!isDesktop) return;
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDesktop]);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Desktop: title + carousel in one block so both stay in viewport (at bottom) */}
      <div className={styles.desktopBlock}>
        <div className={styles.titleContainer}>
          <p className={styles.eyebrow}>Your Journey</p>
          <h1 className={styles.heading}>
            Simple Steps to Start Your <br /><em>Journey</em> to <em>Befriend</em> Yourself
          </h1>
        </div>
        <div className={styles.carouselWrapper}>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer} ref={emblaContainerRef}>
              <div className={styles.emblaSlide} aria-hidden="true" />
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
        </div>
      </div>

      {/* Tablet/Mobile: title + vertical stack (hidden on desktop via CSS) */}
      <div className={styles.carouselWrapperMobile}>
        <div className={styles.titleContainer}>
          <p className={styles.eyebrow}>Your Journey</p>
          <h1 className={styles.heading}>
            Simple Steps to Start Your <br /><em>Journey</em> to <em>Befriend</em> Yourself
          </h1>
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
