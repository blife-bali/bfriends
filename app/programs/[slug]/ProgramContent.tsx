"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { ProgramData } from "@/lib/programs-data";
import { programsData } from "@/lib/programs-data";
import { ArrowRight, ArrowUpRight, ChevronLeft } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import styles from "./ProgramContent.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface ProgramContentProps {
  program: ProgramData;
}

export default function ProgramContent({ program }: ProgramContentProps) {
  return (
    <div className={styles.root}>
      {program.philosophy && (
        <PhilosophySection
          philosophy={program.philosophy}
          philosophyImage={program.philosophyImage ?? program.image}
        />
      )}
      {program.pillars && program.pillars.length > 0 && (
        <PillarsSection
          pillars={program.pillars}
          pillarsImage={program.pillarsImage ?? program.image}
        />
      )}
      {program.sessions && program.sessions.length > 0 && (
        <SessionsSection sessions={program.sessions} fallbackImage={program.image} />
      )}
      <ProgramCta program={program} />
      {(program.previousProgram || program.nextProgram) && (
        <ProgramNavFooter
          previousSlug={program.previousProgram}
          nextSlug={program.nextProgram}
        />
      )}
    </div>
  );
}

function PhilosophySection({
  philosophy,
  philosophyImage,
}: {
  philosophy: string;
  philosophyImage: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 0.4], ["2%", "-8%"]);

  return (
    <section ref={ref} className={styles.philosophy} aria-label="The Philosophy">
      <div className={styles.container}>
        <div className={styles.philosophyLayout}>
          <motion.div
            className={styles.philosophyImageWrap}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <motion.div className={styles.philosophyImageInner} style={{ y: imageY }}>
              <Image
                src={philosophyImage}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.philosophyImage}
              />
            </motion.div>
          </motion.div>
          <div className={styles.philosophyTextCol}>
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              01 / The Philosophy
            </motion.p>
            <div className={styles.philosophyMaskWrap}>
              <motion.p
                className={styles.philosophyParagraph}
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              >
                {philosophy}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarsSection({
  pillars,
  pillarsImage,
}: {
  pillars: { title: string; description: string }[];
  pillarsImage: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className={styles.pillars} aria-label="The Framework">
      <div className={styles.container}>
        <p className={styles.eyebrow}>02 / The Framework</p>
        <div className={styles.pillarsSplit}>
          <div className={styles.pillarsGridCol}>
            {pillars.map((pillar, i) => (
              <motion.article
                key={pillar.title}
                className={styles.pillarCard}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={{ hidden: {}, visible: {} }}
                transition={{ delay: i * 0.08 }}
              >
                <motion.div
                  className={styles.pillarBorderT}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
                />
                <motion.div
                  className={styles.pillarBorderR}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: EASE }}
                />
                <span className={styles.pillarIndexLarge} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.pillarContent}>
                  <motion.h4
                    className={styles.pillarTitle}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.35 + i * 0.08,
                      ease: EASE,
                    }}
                  >
                    {pillar.title}
                  </motion.h4>
                  <motion.p
                    className={styles.pillarDesc}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.08,
                      ease: EASE,
                    }}
                  >
                    {pillar.description}
                  </motion.p>
                </div>
              </motion.article>
            ))}
          </div>
          <motion.div
            className={styles.pillarsImageCol}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            <Image
              src={pillarsImage}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className={styles.pillarsImage}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SessionsSection({
  sessions,
  fallbackImage,
}: {
  sessions: { title: string; description: string; image?: string }[];
  fallbackImage: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section ref={ref} className={styles.sessions} aria-label="Signature Sessions">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Signature Sessions</p>
        <ul className={styles.sessionsGrid}>
          {sessions.map((session, i) => (
            <motion.li
              key={session.title}
              className={styles.sessionCard}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: EASE,
              }}
            >
              <div className={styles.sessionCardImageWrap}>
                <Image
                  src={session.image ?? fallbackImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.sessionCardImage}
                />
              </div>
              <div className={styles.sessionCardContent}>
                <h4 className={styles.sessionCardTitle}>{session.title}</h4>
                <p className={styles.sessionCardDesc}>{session.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProgramCta({ program }: { program: ProgramData }) {
  return (
    <section className={styles.cta} aria-label="Get started">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Get started</p>
        <h2 className={styles.ctaHeading}>
          Ready to experience {program.name}?
        </h2>
        <Button
          href="/book"
          color="var(--color-blue-100)"
          showIcon
        >
          Book a session
        </Button>
      </div>
    </section>
  );
}

function ProgramNavFooter({
  previousSlug,
  nextSlug,
}: {
  previousSlug?: string;
  nextSlug?: string;
}) {
  const previousProgram = previousSlug
    ? programsData.find((p) => p.name.toLowerCase() === previousSlug)
    : null;
  const nextProgram = nextSlug
    ? programsData.find((p) => p.name.toLowerCase() === nextSlug)
    : null;

  if (!previousProgram && !nextProgram) return null;

  return (
    <section className={styles.programNavFooterSection} aria-label="Previous and next program">
      {/* <div className={styles.programNavFooterEyebrowWrap}>
        <p className={styles.eyebrow}>Explore Programs</p>
      </div> */}
      <div className={styles.programNavFooter}>
      {previousProgram ? (
        <Link
          href={`/programs/${previousSlug}`}
          className={styles.programNavLink}
        >
          <div
            className={styles.programNavBg}
            style={{ backgroundImage: `url(${previousProgram.image})` }}
            aria-hidden
          />
          <div className={styles.programNavOverlay} aria-hidden />
          <div className={styles.programNavContent}>
            <span className={styles.programNavLabel}>Previous</span>
            <span className={styles.programNavText}>
              <span className={styles.programNavIcon}>
                <ChevronLeft aria-hidden />
              </span>
              {previousProgram.name}
            </span>
          </div>
        </Link>
      ) : (
        <div className={styles.programNavPlaceholder} aria-hidden />
      )}
      {nextProgram ? (
        <Link
          href={`/programs/${nextSlug}`}
          className={styles.programNavLink}
        >
          <div
            className={styles.programNavBg}
            style={{ backgroundImage: `url(${nextProgram.image})` }}
            aria-hidden
          />
          <div className={styles.programNavOverlay} aria-hidden />
          <div className={styles.programNavContent}>
            <span className={styles.programNavLabel}>Next</span>
            <span className={styles.programNavText}>
              {nextProgram.name}
              <span className={styles.programNavIcon}>
                <ArrowRight aria-hidden />
              </span>
            </span>
          </div>
        </Link>
      ) : (
        <div className={styles.programNavPlaceholder} aria-hidden />
      )}
      </div>
    </section>
  );
}
