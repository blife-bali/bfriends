"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ProgramData } from "@/lib/programs-data";
import Card from "./card/Card";
import { trackEvent } from "@/lib/gtag";
import styles from "./Section.module.css";

const DEFAULT_DESKTOP_IMAGE = "/images/programs/D.webp";

type ProgramSource = ProgramData & { slug?: string; button_label?: string };

type ServicesProgram = {
  name: string;
  title: string;
  subheading: string;
  image: string;
  buttonLabel: string;
  slug: string;
};

function normalizePrograms(source: ProgramSource[] | undefined): ServicesProgram[] {
  if (!source || source.length === 0) return [];
  return source.map((p) => ({
    name: p.name ?? p.title ?? "",
    title: p.title ?? p.name,
    subheading: p.subheading ?? "",
    image: p.image || DEFAULT_DESKTOP_IMAGE,
    buttonLabel: p.buttonLabel ?? p.button_label ?? "Discover",
    slug: (p.slug ?? p.name).toLowerCase(),
  }));
}


export default function Section({
  programs: programsProp,
}: {
  programs?: ProgramSource[];
}) {
  const programs = useMemo(() => normalizePrograms(programsProp), [programsProp]);
  const n = programs.length;
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
  }, [programs.length, updateArrows]);

  const scrollByAmount = (dir: 1 | -1) => {
    trackEvent('services_interact', { action: 'carousel_arrow', direction: dir === 1 ? 'next' : 'prev' });
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

  if (n === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-label="Our programs">
      <div className={styles.mainContainer}>
        <div className={styles.titleRow}>
          <div className={styles.titleContainer}>
            <p className={styles.eyebrow}>Our Programs</p>
            <h2 className={styles.title}>
              The <em>Journey</em> at BFriends
            </h2>
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
            {programs.map((program) => (
              <div key={program.slug} className={styles.carouselItem}>
                <Card
                  image={program.image || DEFAULT_DESKTOP_IMAGE}
                  name={program.name}
                  title={program.title}
                  subheading={program.subheading}
                  buttonLabel={program.buttonLabel}
                  slug={program.slug}
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
