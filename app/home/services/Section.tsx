"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { programsData, type ProgramData } from "@/lib/programs-data";
import { trackEvent } from "@/lib/gtag";
import styles from "./Section.module.css";

const DEFAULT_DESKTOP_IMAGE = "/images/programs/D.webp";

type ProgramSource = ProgramData & { slug?: string; button_label?: string };

type ServicesProgram = {
  name: string;
  subheading: string;
  image: string;
  buttonLabel: string;
  slug: string;
};

function normalizePrograms(source: ProgramSource[] | undefined): ServicesProgram[] {
  const list = source && source.length > 0 ? source : (programsData as ProgramSource[]);
  return list.map((p) => ({
    name: p.name,
    subheading: p.subheading ?? "",
    image: p.image || DEFAULT_DESKTOP_IMAGE,
    buttonLabel: p.buttonLabel ?? p.button_label ?? "Discover",
    slug: (p.slug ?? p.name).toLowerCase(),
  }));
}

function useWarmHeroImageCache(srcs: readonly string[]) {
  useEffect(() => {
    for (const src of srcs) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
    }
  }, [srcs]);
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
  heroSrcs,
  activeSrc,
  activeAlt,
  prioritySrc,
}: {
  heroSrcs: readonly string[];
  activeSrc: string;
  activeAlt: string;
  prioritySrc: string;
}) {
  return (
    <div className={styles.imageStack} aria-live="polite">
      {heroSrcs.map((src) => {
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

function ServicesDesktop({ programs }: { programs: ServicesProgram[] }) {
  const heroSrcs = useMemo(
    () => [...new Set([DEFAULT_DESKTOP_IMAGE, ...programs.map((p) => p.image)])],
    [programs]
  );

  const [preview, setPreview] = useState({
    src: DEFAULT_DESKTOP_IMAGE,
    alt: "BFriends programs",
  });

  const showProgram = useCallback((program: ServicesProgram | null) => {
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
          heroSrcs={heroSrcs}
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
          {programs.map((program) => (
            <li key={program.slug}>
              <button
                type="button"
                className={styles.menuRow}
                onPointerEnter={() => showProgram(program)}
                onFocus={() => showProgram(program)}
                onClick={() => {
                  trackEvent('services_interact', { action: 'menu_click', program: program.slug });
                  showProgram(program);
                }}
              >
                <div className={styles.rowTop}>
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

function MobileHeroStack({
  programs,
  activeIndex,
}: {
  programs: ServicesProgram[];
  activeIndex: number;
}) {
  return (
    <div className={styles.imageStack} aria-live="polite">
      {programs.map((p, i) => {
        const visible = i === activeIndex;
        return (
          <img
            key={p.slug}
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

export default function Section({
  programs: programsProp,
}: {
  programs?: ProgramSource[];
}) {
  const programs = useMemo(() => normalizePrograms(programsProp), [programsProp]);

  const heroWarmSrcs = useMemo(
    () => [...new Set([DEFAULT_DESKTOP_IMAGE, ...programs.map((p) => p.image)])],
    [programs]
  );

  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  useWarmHeroImageCache(heroWarmSrcs);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const mobileProgram = programs[mobileIndex] ?? programs[0]!;
  const n = programs.length;

  const goPrev = () => {
    trackEvent('services_interact', { action: 'mobile_arrow' });
    setMobileIndex((i) => (i - 1 + n) % n);
  };
  const goNext = () => {
    trackEvent('services_interact', { action: 'mobile_arrow' });
    setMobileIndex((i) => (i + 1) % n);
  };

  if (n === 0) {
    return null;
  }

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
              <MobileHeroStack programs={programs} activeIndex={mobileIndex} />
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
                  {mobileProgram.name}
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
                  href={`/programs/${mobileProgram.slug}`}
                  color="var(--color-blue-100)"
                  showIcon
                  className={styles.mobileCtaButton}
                  onClick={() => trackEvent('services_interact', { action: 'mobile_cta', program: mobileProgram.slug })}
                >
                  {mobileProgram.buttonLabel}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <ServicesDesktop programs={programs} />
        )}
      </div>
    </section>
  );
}
