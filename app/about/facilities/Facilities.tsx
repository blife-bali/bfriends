"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import type { MockFacility } from "@/mock/facilities";
import styles from "./Facilities.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface FacilitiesProps {
  facilities: MockFacility[];
}

export default function Facilities({ facilities }: FacilitiesProps) {
  return (
    <div className={styles.list}>
      {facilities.map((facility, index) => (
        <FacilityRow key={facility.id} facility={facility} index={index} />
      ))}
    </div>
  );
}

function FacilityRow({ facility, index }: { facility: MockFacility; index: number }) {
  const rowRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLAnchorElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.2 });
  const reversed = index % 2 === 1;

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
      aria-labelledby={`facility-${facility.id}-title`}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <Link href={`/about/facilities/${facility.id}`} className={styles.media} ref={mediaRef}>
        <motion.div className={styles.mediaLayer} style={{ y }}>
          <Image
            src={facility.image}
            alt={facility.name}
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
        <div className={styles.metaRow}>
          <span className={styles.pillar}>{facility.pillarLabel}</span>
          <span className={styles.metaDivider} aria-hidden="true" />
          <span className={styles.floor}>{facility.floor}</span>
        </div>

        <h2 id={`facility-${facility.id}-title`} className={styles.title}>
          {facility.name}
        </h2>

        <p className={styles.body}>{facility.sub}</p>

        <Link href={`/about/facilities/${facility.id}`} className={styles.cta}>
          <span className={styles.ctaLabel}>Explore {facility.name}</span>
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
