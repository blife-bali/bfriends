"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { ProgramData } from "@/lib/programs-data";
import {
  Activity,
  Flame,
  Dumbbell,
  Trophy,
  CupSoda,
  Coffee,
  UtensilsCrossed,
  Flower2,
  HandMetal,
  AlignVerticalSpaceAround,
  HeartPulse,
  Stethoscope,
  Sparkles,
  Droplets,
  ScanFace,
  Waves,
  Music,
  Brain,
  Heart,
  Users,
  Mountain,
  Medal,
  Timer,
  Target,
  type LucideIcon,
} from "lucide-react";
import styles from "./ProgramContent.module.css";

const PROGRAM_ICONS: Record<string, LucideIcon> = {
  Activity,
  Flame,
  Dumbbell,
  Trophy,
  CupSoda,
  Coffee,
  UtensilsCrossed,
  Flower2,
  HandMetal,
  AlignVerticalSpaceAround,
  HeartPulse,
  Stethoscope,
  Sparkles,
  Droplets,
  ScanFace,
  Waves,
  Music,
  Brain,
  Heart,
  Users,
  Mountain,
  Medal,
  Timer,
  Target,
};
const FALLBACK_ICON = Activity;

const SECTION_WRAPPER_CLASS = styles.sectionWrap;

interface ProgramContentProps {
  program: ProgramData;
}

export default function ProgramContent({ program }: ProgramContentProps) {
  const quoteRef = useRef<HTMLElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.3 });
  const philosophyImages = program.philosophyImages ?? [];
  const galleryImages = program.galleryImages ?? [];
  const philosophyImage = philosophyImages[0] ?? program.image;

  return (
    <div className={styles.root}>
      {/* 1. Intro Quote */}
      {program.quote && (
        <section ref={quoteRef} className={styles.quoteSection} aria-label="Quote">
          <div className={SECTION_WRAPPER_CLASS}>
            <motion.blockquote
              className={styles.quote}
              initial={{ opacity: 0 }}
              animate={quoteInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {program.quote}
            </motion.blockquote>
          </div>
        </section>
      )}

      {/* 2. Philosophy (50/50 split, sticky text) */}
      {program.philosophy && (
        <section className={styles.philosophySection} aria-label="Philosophy">
          <div className={SECTION_WRAPPER_CLASS}>
            <div className={styles.philosophyGrid}>
              <div className={styles.philosophySticky}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className={styles.philosophyHeading}>Philosophy</h2>
                  <p className={styles.philosophyText}>{program.philosophy}</p>
                </motion.div>
              </div>
              <div className={styles.philosophyImageCol}>
                <div className={styles.philosophyImageWrap}>
                  <Image
                    src={philosophyImage}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={styles.philosophyImg}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Process (vertical timeline, border-bottom, active dimming) */}
      {program.steps && program.steps.length > 0 && (
        <section className={styles.processSection} aria-label="Process">
          <div className={SECTION_WRAPPER_CLASS}>
            <ProcessTimeline steps={program.steps} />
          </div>
        </section>
      )}

      {/* 4. Programs (uniform 2-col grid, same-height cards) */}
      {program.programItems && program.programItems.length > 0 && (
        <section className={styles.programsSection} aria-label="Programs">
          <div className={SECTION_WRAPPER_CLASS}>
            <ProgramsGrid programItems={program.programItems} />
          </div>
        </section>
      )}

      {/* 5. Gallery (film strip marquee) */}
      {galleryImages.length > 0 && (
        <section className={styles.gallerySection} aria-label="Gallery">
          <div className={styles.galleryMarqueeWrap}>
            <div className={styles.marqueeTrack}>
              {[...galleryImages, ...galleryImages].map((src, i) => (
                <div key={i} className={styles.marqueeItem}>
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="320px"
                    className={styles.marqueeImg}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ProcessTimeline({
  steps,
}: {
  steps: { id: string; title: string; desc: string }[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const viewportMid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const dist = Math.abs(mid - viewportMid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIndex(best);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [steps.length]);

  return (
    <div className={styles.timeline}>
      {steps.map((step, i) => (
        <div
          key={step.id}
          ref={(el) => {
            stepRefs.current[i] = el;
          }}
          className={styles.timelineRow}
          style={{ opacity: activeIndex === i ? 1 : 0.4 }}
        >
          <div className={styles.timelineContent}>
            <span className={styles.timelineNumber} aria-hidden>
              {step.id}
            </span>
            <h3 className={styles.timelineTitle}>{step.title}</h3>
            <p className={styles.timelineDesc}>{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgramsGrid({
  programItems,
}: {
  programItems: NonNullable<ProgramData["programItems"]>;
}) {
  return (
    <div className={styles.programsGrid}>
      {programItems.map((item, i) => {
        const Icon = PROGRAM_ICONS[item.icon] ?? FALLBACK_ICON;
        return (
          <motion.article
            key={item.title}
            className={styles.programCard}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.35 }}
            whileHover={{ y: -4 }}
          >
            <div className={styles.programCardInner}>
              <span className={styles.programIcon}>
                <Icon className={styles.programIconSvg} aria-hidden />
              </span>
              <h3 className={styles.programTitle}>{item.title}</h3>
              <p className={styles.programDesc}>{item.desc}</p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
