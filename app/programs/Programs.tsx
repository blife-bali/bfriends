"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import type { PublicProgram } from "@/lib/cms";
import styles from "./Programs.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const DEFAULT_IMAGE = "/images/programs/D.webp";

interface ProgramsProps {
  programs: PublicProgram[];
}

export default function Programs({ programs }: ProgramsProps) {
  return (
    <div className={styles.list}>
      {programs.map((program, index) => (
        <ProgramRow key={program.general.slug} program={program} index={index} />
      ))}
    </div>
  );
}

function ProgramRow({ program, index }: { program: PublicProgram; index: number }) {
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

  const slug = program.general.slug;
  const href = `/programs/${slug}`;
  const image = program.general.image || DEFAULT_IMAGE;
  const name = program.general.name;
  const body = program.general.subheading || program.intro.sub;
  const tags = program.what_you_find?.slice(0, 4) ?? [];

  return (
    <motion.section
      ref={rowRef}
      className={`${styles.row} ${reversed ? styles.rowReversed : ""}`}
      aria-labelledby={`program-${slug}-title`}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <Link href={href} className={styles.media} ref={mediaRef}>
        <motion.div className={styles.mediaLayer} style={{ y }}>
          <Image
            src={image}
            alt={name}
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
        <span className={styles.eyebrow}>Programme</span>

        <h2 id={`program-${slug}-title`} className={styles.title}>
          {name}
        </h2>

        {body && <p className={styles.body}>{body}</p>}

        {tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        <Link href={href} className={styles.cta}>
          <span className={styles.ctaLabel}>Discover {name}</span>
          <span className={styles.ctaIcon} aria-hidden="true">
            <ArrowRight size={16} strokeWidth={2} />
          </span>
        </Link>
      </div>
    </motion.section>
  );
}
