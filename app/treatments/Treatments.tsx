"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import type { MockTreatment } from "@/mock/treatments";
import { treatmentNameInline } from "@/mock/treatments";
import styles from "./Treatments.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface TreatmentsProps {
  treatments: MockTreatment[];
}

export default function Treatments({ treatments }: TreatmentsProps) {
  return (
    <div className={styles.list}>
      {treatments.map((treatment, index) => (
        <TreatmentRow key={treatment.id} treatment={treatment} index={index} />
      ))}
    </div>
  );
}

function TreatmentRow({ treatment, index }: { treatment: MockTreatment; index: number }) {
  const rowRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLAnchorElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.2 });
  const reversed = index % 2 === 1;
  const inlineName = treatmentNameInline(treatment);

  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.01,
  });
  const y = useTransform(smoothProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.section
      ref={rowRef}
      className={`${styles.row} ${reversed ? styles.rowReversed : ""}`}
      aria-labelledby={`treatment-${treatment.id}-title`}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <Link href={`/treatments/${treatment.id}`} className={styles.media} ref={mediaRef}>
        <motion.div className={styles.mediaLayer} style={{ y }}>
          <Image
            src={treatment.image}
            alt={inlineName}
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </motion.div>
        <span className={styles.index} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Link>

      <div className={styles.copy}>
        <h2 id={`treatment-${treatment.id}-title`} className={styles.title}>
          {inlineName}
        </h2>

        <p className={styles.body}>{treatment.sub}</p>

        <Link href={`/treatments/${treatment.id}`} className={styles.cta}>
          <span className={styles.ctaLabel}>Explore {inlineName}</span>
          <ArrowRight
            className={styles.ctaArrow}
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.section>
  );
}
