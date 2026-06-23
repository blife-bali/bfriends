"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Button from "@/components/ui/Button/Button";
import { trackEvent } from "@/lib/gtag";
import styles from "./Section.module.css";

const DEFAULT_HEADING = "A clear path to move, recover, and improve.";
const DEFAULT_BODY = `Your journey at BFriends is designed step by step - starting from your baseline, tracking your
progress, and adjusting as your body heals.

Each phase builds on the last, creating a structured yet flexible path that responds to your
needs over time.

You don't have to do everything at once. You simply begin where you are—and grow from there.`;

const FALLBACK_IMAGE = "/images/Integrate/DDK09558.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

interface ProcessSubpoint {
  title: string;
  description: string;
}

interface JourneyStep {
  id: number;
  number?: string;
  title: string;
  description?: string;
  image: string;
  subpoints?: ProcessSubpoint[];
}

function formatStepIndex(number: string | undefined, index: number) {
  if (number) return number.padStart(2, "0");
  return String(index + 1).padStart(2, "0");
}

function JourneyStepCard({ step }: { step: JourneyStep }) {
  return (
    <article className={styles.stepCard}>
      <h3 className={styles.stepTitle}>{step.title}</h3>

      <div className={styles.stepImageContainer}>
        <Image
          src={step.image || FALLBACK_IMAGE}
          alt={step.title}
          fill
          className={styles.stepImage}
          sizes="(max-width: 768px) 33vw, 22vw"
        />
      </div>

      {step.description && <p className={styles.description}>{step.description}</p>}

      {step.subpoints && step.subpoints.length > 0 && (
        <ul className={styles.subpoints}>
          {step.subpoints.map((sp, i) => (
            <li key={i} className={styles.subpoint}>
              <span className={styles.subpointTitle}>{sp.title}</span>
              <span className={styles.subpointDesc}>{sp.description}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function SystemSection({
  steps = [],
  carouselSteps = [],
}: {
  steps?: any[];
  carouselSteps?: JourneyStep[];
}) {
  const ref = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const markRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const inView = useInView(ref, { once: true, amount: 0.06 });

  const { scrollYProgress } = useScroll({
    target: flowRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.01,
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
  }, [smoothProgress, updateActiveIndices, carouselSteps.length]);

  const homeSection = steps?.[0];
  const heading = homeSection?.title || DEFAULT_HEADING;
  const paragraphs = (homeSection?.description || DEFAULT_BODY)
    .split("\n\n")
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <section ref={ref} className={styles.section} aria-label="The BFriends system">
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <h2 className={styles.title}>{heading}</h2>
          {paragraphs.map((paragraph: string, idx: number) => (
            <p key={idx} className={styles.body}>
              {paragraph}
            </p>
          ))}
        </motion.header>

        <div className={styles.flow} ref={flowRef}>
          <div className={styles.flowTrack} aria-hidden="true">
            <div className={styles.flowTrackBase} />
            <motion.div className={styles.flowTrackProgress} style={{ scaleY }} />
          </div>

          <ol className={styles.flowList}>
            {carouselSteps.map((step, index) => {
              const stepIndex = formatStepIndex(step.number, index);
              const stepNum = index + 1;
              const cardOnLeft = stepNum % 2 === 1;

              return (
                <li
                  key={step.id}
                  className={`${styles.flowItem} ${
                    activeIndices.has(index) ? styles.flowItemActive : ""
                  }`}
                >
                  <div className={styles.flowSlotLeft}>
                    {cardOnLeft && <JourneyStepCard step={step} />}
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
                    {!cardOnLeft && <JourneyStepCard step={step} />}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className={styles.flowFooter}>
          <Button
            href="/about/journey"
            variant="border"
            color="var(--color-blue-80)"
            
            onClick={() =>
              trackEvent("cta_click", {
                label: "view_customer_journey",
                location: "home_system",
              })
            }
          >
            View BFriends Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
