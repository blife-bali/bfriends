"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import styles from "./Section.module.css";

interface ProcessSubpoint {
  title: string;
  description?: string | null;
}

interface JourneyStep {
  id: number;
  number?: string;
  title: string;
  description?: string | null;
  image?: string | null;
  subpoints?: ProcessSubpoint[];
}

const FALLBACK_PILLARS = [
  {
    title: "Data-Driven Assessment",
    body: "Gain valuable insights into your body's current condition through a comprehensive wellness assessment.",
  },
  {
    title: "Personalised Recommendations",
    body: "Receive tailored guidance based on your individual needs, goals, and lifestyle.",
  },
  {
    title: "Expert-Led Support",
    body: "Work alongside experienced wellness professionals who help you navigate every stage of your journey.",
  },
];

export type IntroPillarBlock = {
  title: string;
  body: string;
};

const DEFAULT_HEADLINE = "Feeling tired, out of balance, or stuck in a routine?";
const DEFAULT_SYSTEM_BODY = `Your journey at BFriends is designed step by step - starting from your baseline, tracking your
progress, and adjusting as your body heals.

Each phase builds on the last, creating a structured yet flexible path that responds to your
needs over time.

You don't have to do everything at once. You simply begin where you are—and grow from there.`;

const FALLBACK_IMAGE = "/images/Integrate/DDK09558.webp";
const EASE_OUT = [0.22, 0.61, 0.36, 1] as const;

const fadeInBlur = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: EASE_OUT,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

function formatStepIndex(number: string | undefined, index: number) {
  if (number) return number.padStart(2, "0");
  return String(index + 1).padStart(2, "0");
}

function JourneyStepContent({ step }: { step: JourneyStep }) {
  const hasPoints = Boolean(step.subpoints && step.subpoints.length > 0);

  return (
    <article className={styles.stepContent}>
      <div className={styles.stepHeader}>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        {step.description && <p className={styles.stepDescription}>{step.description}</p>}
      </div>

      {hasPoints && (
        <>
          <div className={styles.stepDivider} role="separator" />
          <ul className={styles.stepPoints}>
            {step.subpoints!.map((point, i) => (
              <li key={i} className={styles.stepPoint}>
                <span className={styles.stepPointTitle}>{point.title}</span>
                {point.description && (
                  <span className={styles.stepPointText}>{point.description}</span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}

function JourneyStepImage({ step }: { step: JourneyStep }) {
  return (
    <div className={styles.stepImage}>
      <Image
        src={step.image || FALLBACK_IMAGE}
        alt={step.title}
        fill
        className={styles.stepImageEl}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 33vw"
      />
    </div>
  );
}

export default function NewIntroSection({
  headline = DEFAULT_HEADLINE,
  pillars = [],
  steps = [],
  journeySteps = [],
}: {
  headline?: string;
  pillars?: IntroPillarBlock[];
  steps?: { title?: string; description?: string }[];
  journeySteps?: JourneyStep[];
}) {
  const ref = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const markRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const [trackInset, setTrackInset] = useState({ top: 0, bottom: 0 });
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: flowRef,
    offset: ["start 0.92", "end 0.52"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    mass: 0.005,
  });
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  const updateActiveIndices = useCallback((progress: number) => {
    const flow = flowRef.current;
    if (!flow) return;

    const flowRect = flow.getBoundingClientRect();
    const tipY = progress * flowRect.height;
    const next = new Set<number>();

    markRefs.current.forEach((mark, index) => {
      if (!mark) return;
      const markRect = mark.getBoundingClientRect();
      const markCenterY = markRect.top - flowRect.top + markRect.height / 2;
      if (tipY >= markCenterY) {
        next.add(index);
      }
    });

    setActiveIndices((prev) => {
      if (prev.size === next.size && [...prev].every((i) => next.has(i))) {
        return prev;
      }
      return next;
    });
  }, []);

  useMotionValueEvent(smoothProgress, "change", updateActiveIndices);

  useEffect(() => {
    const frame = requestAnimationFrame(() => updateActiveIndices(smoothProgress.get()));

    const handleResize = () => updateActiveIndices(smoothProgress.get());
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [smoothProgress, updateActiveIndices, journeySteps.length]);

  useEffect(() => {
    const updateTrackInset = () => {
      const flow = flowRef.current;
      const firstMark = markRefs.current[0];
      const lastMark = markRefs.current[journeySteps.length - 1];
      if (!flow || !firstMark || !lastMark) return;

      const flowRect = flow.getBoundingClientRect();
      const firstRect = firstMark.getBoundingClientRect();
      const lastRect = lastMark.getBoundingClientRect();

      setTrackInset({
        top: firstRect.top - flowRect.top + firstRect.height / 2,
        bottom: flowRect.bottom - lastRect.bottom + lastRect.height / 2,
      });
    };

    updateTrackInset();
    window.addEventListener("resize", updateTrackInset);
    return () => window.removeEventListener("resize", updateTrackInset);
  }, [journeySteps.length]);

  const homeSection = steps?.[0];
  const paragraphs = (homeSection?.description || DEFAULT_SYSTEM_BODY)
    .split("\n\n")
    .map((s: string) => s.trim())
    .filter(Boolean);
  const pillarBlocks = pillars.length > 0 ? pillars : FALLBACK_PILLARS;

  return (
    <section ref={ref} className={styles.section} aria-label="Introduction and BFriends system">
      <div className={styles.container}>
        <motion.header
          className={styles.sectionHeader}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInBlur}
        >
          <h2 className={styles.headline}>{headline}</h2>
        </motion.header>

        <motion.div
          className={styles.pillars}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {pillarBlocks.map((block, i) => (
            <motion.article key={`${block.title}-${i}`} className={styles.pillar} variants={fadeInBlur}>
              <span className={styles.pillarIndex}>0{i + 1}</span>
              <h3 className={styles.pillarTitle}>{block.title}</h3>
              <p className={styles.pillarBody}>{block.body}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className={styles.flow}
          ref={flowRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInBlur}
          transition={{ delay: 0.22 }}
        >
          <div
            className={styles.flowTrack}
            style={{ top: trackInset.top, bottom: trackInset.bottom }}
            aria-hidden="true"
          >
            <div className={styles.flowTrackBase} />
            <motion.div className={styles.flowTrackProgress} style={{ scaleY }} />
          </div>

          <ol className={styles.flowList} aria-label="BFriends journey steps">
            <li className={styles.flowItemNarrative}>
              <div className={styles.narrative}>
                {paragraphs.map((paragraph: string, idx: number) => (
                  <p key={idx} className={styles.narrativeParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </li>

            {journeySteps.map((step, index) => {
              const stepIndex = formatStepIndex(step.number, index);
              const contentOnLeft = index % 2 === 1;

              return (
                <li
                  key={step.id}
                  className={`${styles.flowItem} ${
                    activeIndices.has(index) ? styles.flowItemActive : ""
                  }`}
                >
                  <div className={styles.flowSlotLeft}>
                    {contentOnLeft ? (
                      <JourneyStepContent step={step} />
                    ) : (
                      <JourneyStepImage step={step} />
                    )}
                  </div>

                  <div className={styles.flowMark} aria-hidden="true">
                    <span
                      ref={(el) => {
                        markRefs.current[index] = el;
                      }}
                      className={`${styles.stepIndexContainer} ${
                        activeIndices.has(index) ? styles.stepIndexContainerActive : ""
                      }`}
                    >
                      <span className={styles.stepIndex}>{stepIndex}</span>
                    </span>
                  </div>

                  <div className={styles.flowSlotRight}>
                    {contentOnLeft ? (
                      <JourneyStepImage step={step} />
                    ) : (
                      <JourneyStepContent step={step} />
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
