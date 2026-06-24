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
import styles from "./JourneyFlow.module.css";

const DEFAULT_HEADING = "The Friends Journey";
const DEFAULT_BODY = `The Friends Journey is a unique experience that combines the best of both worlds: the
physical and the digital. It's a journey that starts with a physical product and continues in the
digital world, where you can interact with your BFriend in a whole new way.`;

const FALLBACK_IMAGE = "/images/Integrate/DDK09558.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

interface ProcessSubpoint {
  title: string;
  description?: string;
}

interface JourneyStep {
  id: number;
  number?: string;
  title: string;
  description?: string;
  image?: string;
  subpoints?: ProcessSubpoint[];
}

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
                <span className={styles.stepPointMarker} aria-hidden="true" />
                <div className={styles.stepPointContent}>
                  <span className={styles.stepPointTitle}>{point.title}</span>
                  {point.description && (
                    <span className={styles.stepPointText}>{point.description}</span>
                  )}
                </div>
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
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

export default function JourneyFlow({
  steps,
  heading,
  body,
}: {
  steps: JourneyStep[];
  heading?: string;
  body?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const markRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const [trackInset, setTrackInset] = useState({ top: 0, bottom: 0 });
  const inView = useInView(ref, { once: true, amount: 0.06 });

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
    updateActiveIndices(smoothProgress.get());

    const handleResize = () => updateActiveIndices(smoothProgress.get());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [smoothProgress, updateActiveIndices, steps.length]);

  useEffect(() => {
    const updateTrackInset = () => {
      const flow = flowRef.current;
      const firstMark = markRefs.current[0];
      const lastMark = markRefs.current[steps.length - 1];
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
  }, [steps.length]);

  const title = heading || DEFAULT_HEADING;
  const paragraphs = (body || DEFAULT_BODY)
    .split("\n\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section ref={ref} className={styles.section} aria-label="BFriends Journey">
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <h2 className={styles.title}>{title}</h2>
          {paragraphs.map((paragraph, idx) => (
            <p key={idx} className={styles.body}>
              {paragraph}
            </p>
          ))}
        </motion.header>

        <div className={styles.flow} ref={flowRef}>
          <div
            className={styles.flowTrack}
            style={{ top: trackInset.top, bottom: trackInset.bottom }}
            aria-hidden="true"
          >
            <div className={styles.flowTrackBase} />
            <motion.div className={styles.flowTrackProgress} style={{ scaleY }} />
          </div>

          <ol className={styles.flowList}>
            {steps.map((step, index) => {
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
        </div>
      </div>
    </section>
  );
}
