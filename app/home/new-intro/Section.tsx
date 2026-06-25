"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import { trackEvent } from "@/lib/gtag";
import styles from "./Section.module.css";

const CONTENT_BLOCKS = [
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

const DEFAULT_HEADLINE = "Feeling tired, out of balance, or stuck in a routine?";
const DEFAULT_SYSTEM_BODY = `Your journey at BFriends is designed step by step - starting from your baseline, tracking your
progress, and adjusting as your body heals.

Each phase builds on the last, creating a structured yet flexible path that responds to your
needs over time.

You don't have to do everything at once. You simply begin where you are—and grow from there.`;

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

interface JourneyStep {
  id: number;
  number?: string;
  title: string;
}

function formatStepIndex(number: string | undefined, index: number) {
  if (number) return number.padStart(2, "0");
  return String(index + 1).padStart(2, "0");
}

export default function NewIntroSection({
  headline = DEFAULT_HEADLINE,
  steps = [],
  carouselSteps = [],
}: {
  headline?: string;
  steps?: { title?: string; description?: string }[];
  carouselSteps?: JourneyStep[];
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const homeSection = steps?.[0];
  const paragraphs = (homeSection?.description || DEFAULT_SYSTEM_BODY)
    .split("\n\n")
    .map((s: string) => s.trim())
    .filter(Boolean);

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
          {CONTENT_BLOCKS.map((block, i) => (
            <motion.article key={block.title} className={styles.pillar} variants={fadeInBlur}>
              <span className={styles.pillarIndex}>0{i + 1}</span>
              <h3 className={styles.pillarTitle}>{block.title}</h3>
              <p className={styles.pillarBody}>{block.body}</p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className={styles.narrative}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInBlur}
          transition={{ delay: 0.22 }}
        >
          {paragraphs.map((paragraph: string, idx: number) => (
            <p key={idx} className={styles.narrativeParagraph}>
              {paragraph}
            </p>
          ))}
        </motion.div>

        {carouselSteps.length > 0 && (
          <motion.div
            className={styles.journeyPanel}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInBlur}
            transition={{ delay: 0.32 }}
          >
            <div className={styles.journeyRail}>
              <div className={styles.journeyLine} aria-hidden="true" />
              <ol className={styles.journeySteps} aria-label="BFriends journey steps">
                {carouselSteps.map((step, index) => (
                  <li key={step.id} className={styles.journeyStep}>
                    <span className={styles.journeyMark}>
                      {formatStepIndex(step.number, index)}
                    </span>
                    <span className={styles.journeyLabel}>{step.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}

        <motion.div
          className={styles.ctaRow}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInBlur}
          transition={{ delay: 0.42 }}
        >
          <Button
            href="/about/journey"
            variant="border"
            color="var(--color-blue-80)"
            onClick={() =>
              trackEvent("cta_click", {
                label: "view_customer_journey",
                location: "home_new_intro",
              })
            }
          >
            View BFriends Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
