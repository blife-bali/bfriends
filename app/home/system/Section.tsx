"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import { trackEvent } from "@/lib/gtag";
import styles from "./Section.module.css";

const DEFAULT_HEADING = "A clear path to move, recover, and improve.";
const DEFAULT_BODY = `Your journey at BFriends is designed step by step - starting from your baseline, tracking your
progress, and adjusting as your body heals.

Each phase builds on the last, creating a structured yet flexible path that responds to your
needs over time.

You don't have to do everything at once. You simply begin where you are—and grow from there.`;

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

export default function SystemSection({
  steps = [],
  carouselSteps = [],
}: {
  steps?: any[];
  carouselSteps?: JourneyStep[];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.06 });

  const homeSection = steps?.[0];
  const heading = homeSection?.title || DEFAULT_HEADING;
  const paragraphs = (homeSection?.description || DEFAULT_BODY)
    .split("\n\n")
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <section ref={ref} className={styles.section} aria-label="The BFriends system">
      <div className={styles.container}>
        <div className={styles.split}>
          <motion.aside
            className={styles.introCol}
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
            <Button
              href="/about/journey"
              color="var(--color-blue-100)"
              className={styles.cta}
              onClick={() =>
                trackEvent("cta_click", {
                  label: "view_customer_journey",
                  location: "home_system",
                })
              }
            >
              View BFriends Journey
            </Button>
          </motion.aside>

          <motion.ol
            className={styles.flowList}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {carouselSteps.map((step, index) => {
              const stepIndex = formatStepIndex(step.number, index);
              const isLast = index === carouselSteps.length - 1;

              return (
                <li key={step.id} className={styles.flowItem}>
                  <div className={styles.flowMark} aria-hidden="true">
                    <span className={styles.stepIndex}>{stepIndex}</span>
                    {!isLast && <span className={styles.flowLine} />}
                  </div>

                  <article className={styles.stepCard}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>

                    {step.description && (
                      <p className={styles.description}>{step.description}</p>
                    )}

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
                </li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
