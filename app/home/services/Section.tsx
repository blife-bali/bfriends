"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { programsData, type ProgramData } from "@/lib/programs-data";
import styles from "./Section.module.css";

const DEFAULT_DESKTOP_IMAGE = "/images/programs/D.webp";

/** Unique hero URLs (deduped) — stacked in DOM so swaps are opacity-only (instant). */
const HERO_IMAGE_SRCS = [
  ...new Set([
    DEFAULT_DESKTOP_IMAGE,
    ...programsData.map((p) => p.image),
  ]),
];

function useWarmHeroImageCache() {
  useEffect(() => {
    for (const src of HERO_IMAGE_SRCS) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
    }
  }, []);
}

function ImageTitleBlock({ mobile }: { mobile: boolean }) {
  return (
    <div className={styles.imageCaption}>
      <p className={styles.eyebrowOverlay}>Our Programs</p>
      <h2
        className={`${styles.heading} ${mobile ? styles.headingMobile : ""}`}
      >
        {mobile ? (
          <>
            The <em>Journey</em> at BFriends
          </>
        ) : (
          <>
            The <em>Journey</em> <br /> at BFriends
          </>
        )}
      </h2>
    </div>
  );
}

function StackedHeroImages({
  activeSrc,
  activeAlt,
  /** "high" for first paint slot (e.g. default / index 0) */
  prioritySrc,
}: {
  activeSrc: string;
  activeAlt: string;
  prioritySrc: string;
}) {
  return (
    <div className={styles.imageStack} aria-live="polite">
      {HERO_IMAGE_SRCS.map((src) => {
        const visible = src === activeSrc;
        return (
          <img
            key={src}
            src={src}
            alt={visible ? activeAlt : ""}
            aria-hidden={!visible}
            className={`${styles.imageStackLayer} ${visible ? styles.imageStackLayerVisible : ""}`}
            loading="eager"
            decoding="async"
            fetchPriority={src === prioritySrc ? "high" : "low"}
            draggable={false}
          />
        );
      })}
    </div>
  );
}

/**
 * Desktop grid — stacked hero images so menu hover only toggles visibility (no src churn).
 */
function ServicesDesktop() {
  const [preview, setPreview] = useState({
    src: DEFAULT_DESKTOP_IMAGE,
    alt: "BFriends programs",
  });

  const showProgram = useCallback((program: ProgramData | null) => {
    if (!program) {
      setPreview({
        src: DEFAULT_DESKTOP_IMAGE,
        alt: "BFriends programs",
      });
    } else {
      setPreview({ src: program.image, alt: program.name });
    }
  }, []);

  const onNavPointerLeave = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: fine)").matches) {
      showProgram(null);
    }
  }, [showProgram]);

  return (
    <div className={styles.grid}>
      <div className={styles.imagePanel}>
        <StackedHeroImages
          activeSrc={preview.src}
          activeAlt={preview.alt}
          prioritySrc={DEFAULT_DESKTOP_IMAGE}
        />
        <div className={styles.imageBottomScrim} aria-hidden />
        <ImageTitleBlock mobile={false} />
      </div>
      <nav
        className={styles.menu}
        aria-label="Program menu"
        onPointerLeave={onNavPointerLeave}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            showProgram(null);
          }
        }}
      >
        <ul className={styles.menuList}>
          {programsData.map((program) => (
            <li key={program.letter}>
              <button
                type="button"
                className={styles.menuRow}
                onPointerEnter={() => showProgram(program)}
                onFocus={() => showProgram(program)}
                onClick={() => showProgram(program)}
              >
                <div className={styles.rowTop}>
                  <span className={styles.letter}>{program.letter}</span>
                  <span className={styles.name}>{program.name}</span>
                </div>
                <p className={styles.subheading}>{program.subheading}</p>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function MobileHeroStack({ activeIndex }: { activeIndex: number }) {
  return (
    <div className={styles.imageStack} aria-live="polite">
      {programsData.map((p, i) => {
        const visible = i === activeIndex;
        return (
          <img
            key={p.letter}
            src={p.image}
            alt={visible ? p.name : ""}
            aria-hidden={!visible}
            className={`${styles.imageStackLayer} ${visible ? styles.imageStackLayerVisible : ""}`}
            loading="eager"
            decoding="async"
            fetchPriority={i === 0 ? "high" : "low"}
            draggable={false}
          />
        );
      })}
    </div>
  );
}

export default function Section() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  useWarmHeroImageCache();

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const mobileProgram = programsData[mobileIndex]!;
  const n = programsData.length;

  const goPrev = () => setMobileIndex((i) => (i - 1 + n) % n);
  const goNext = () => setMobileIndex((i) => (i + 1) % n);

  return (
    <section
      className={`${styles.section} ${isMobile ? styles.sectionMobile : ""}`}
      aria-label="Our programs"
    >
      <div className={`${styles.inner} ${isMobile ? styles.innerMobile : ""}`}>
        {isMobile ? (
          <>
            <div
              className={`${styles.imagePanel} ${styles.imagePanelFill}`}
            >
              <MobileHeroStack activeIndex={mobileIndex} />
              <div className={styles.imageBottomScrim} aria-hidden />
              <ImageTitleBlock mobile />
            </div>
            <div className={styles.mobileFooter}>
              <div className={styles.mobileBar}>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={goPrev}
                  aria-label="Previous program"
                >
                  <ChevronLeft size={24} strokeWidth={1.5} />
                </button>
                <p className={styles.mobileName}>
                  {mobileProgram.letter} · {mobileProgram.name}
                </p>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={goNext}
                  aria-label="Next program"
                >
                  <ChevronRight size={24} strokeWidth={1.5} />
                </button>
              </div>
              <div className={styles.mobileCtaColumn}>
                <p className={styles.mobileSub}>{mobileProgram.subheading}</p>
                <Button
                  href={`/programs/${mobileProgram.name.toLowerCase()}`}
                  color="var(--color-blue-100)"
                  showIcon
                  className={styles.mobileCtaButton}
                >
                  {mobileProgram.buttonLabel}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <ServicesDesktop />
        )}
      </div>
    </section>
  );
}
