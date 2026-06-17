"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Button from "@/components/ui/Button/Button";
import StepCard from "./StepCard";
import { trackEvent } from "@/lib/gtag";
import styles from "./Section.module.css";

const DEFAULT_HEADING = "A clear path to move, recover, and improve.";
const DEFAULT_BODY = `Your journey at BFriends is designed step by step - starting from your baseline, tracking your
progress, and adjusting as your body heals.

Each phase builds on the last, creating a structured yet flexible path that responds to your
needs over time.

You don't have to do everything at once. You simply begin where you are—and grow from there.`;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface JourneyStep {
  id: number;
  number?: string;
  title: string;
  description?: string;
  image: string;
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
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const homeSection = steps?.[0];
  const heading = homeSection?.title || DEFAULT_HEADING;
  const paragraphs = (homeSection?.description || DEFAULT_BODY)
    .split("\n\n")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const updateArrows = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    updateArrows();
    emblaApi.on("select", updateArrows);
    emblaApi.on("reInit", updateArrows);
    return () => {
      emblaApi.off("select", updateArrows);
      emblaApi.off("reInit", updateArrows);
    };
  }, [emblaApi, carouselSteps.length, updateArrows]);

  return (
    <section ref={ref} className={styles.section} aria-label="The BFriends system">
      <div className={styles.container}>
        <motion.div
          className={styles.titleRow}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className={styles.titleContainer}>
            <h2 className={styles.headerTitle}>{heading}</h2>
            {paragraphs.map((paragraph: string, idx: number) => (
              <p key={idx} className={styles.headerSub}>
                {paragraph}
              </p>
            ))}
          </div>

          {carouselSteps.length > 0 && (
            <div className={styles.arrowContainer}>
              <button
                type="button"
                className={styles.arrowButton}
                aria-label="Previous step"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canScrollPrev}
              >
                <ChevronLeft size={24} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                className={styles.arrowButton}
                aria-label="Next step"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canScrollNext}
              >
                <ChevronRight size={24} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </motion.div>

        {carouselSteps.length > 0 && (
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {carouselSteps.map((step, index) => (
                <div key={step.id} className={styles.emblaSlide}>
                  <StepCard
                    image={step.image}
                    index={formatStepIndex(step.number, index)}
                    title={step.title}
                    description={step.description}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.buttonWrapper}>
          <Button
            href="/about/journey"
            className={styles.conclusionButton}
            color="var(--color-blue-100)"
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
