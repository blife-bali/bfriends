"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WhyCard from "./WhyCard";
import Button from "@/components/ui/Button/Button";
import { BOOK_NOW_URL } from "@/lib/site-contact";
import styles from "./WhyBFriends.module.css";

export default function WhyBFriends({ cards = [] }: { cards?: any[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 1);
    setCanScrollNext(el.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [cards.length, updateArrows]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = carouselRef.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.carouselItem}`));
    if (!items.length) return;

    const scrollLeft = el.scrollLeft;
    const currentIndex = items.reduce((closestIdx, item, idx) => {
      const currentDistance = Math.abs(items[closestIdx].offsetLeft - scrollLeft);
      const nextDistance = Math.abs(item.offsetLeft - scrollLeft);
      return nextDistance < currentDistance ? idx : closestIdx;
    }, 0);

    const nextIndex = Math.min(Math.max(currentIndex + dir, 0), items.length - 1);
    el.scrollTo({ left: items[nextIndex].offsetLeft, behavior: "smooth" });
  };

  return (
    <section className={styles.section}>
      <div className={styles.mainContainer}>
        <div className={styles.titleRow}>
          <div className={styles.titleContainer}>
            {/* <p className={styles.eyebrow}>Core Philosophy</p> */}
            <h2 className={styles.title}>Why <em>BFriends</em>?</h2>
            <p className={styles.subheading}>
              Real progress doesn’t come from pressure. It comes from understanding what you need and
              responding with care. Like a good friend, we support you through every phase of your
              journey.
            </p>
            <Button
              href={BOOK_NOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              showIcon
              className={styles.button}
            >
              Reserve Your Moments
            </Button>
          </div>
          <div className={`${styles.arrowContainer} ${styles.desktopArrows}`}>
            <button
              type="button"
              className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
              aria-label="Previous"
              onClick={() => scrollByAmount(-1)}
              disabled={!canScrollPrev}
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
              aria-label="Next"
              onClick={() => scrollByAmount(1)}
              disabled={!canScrollNext}
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className={styles.carousel} ref={carouselRef}>
          <div className={styles.carouselTrack}>
            {cards.map((card) => (
              <div key={card.id} className={styles.carouselItem}>
                <WhyCard
                  image={card.image}
                  title={card.point}
                  subheading={card.subpoint}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.arrowContainer} ${styles.mobileArrows}`}>
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
            aria-label="Previous"
            onClick={() => scrollByAmount(-1)}
            disabled={!canScrollPrev}
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
            aria-label="Next"
            onClick={() => scrollByAmount(1)}
            disabled={!canScrollNext}
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
