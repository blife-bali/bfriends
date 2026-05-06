"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { type ProgramData, type ProgramSessionGroup } from "@/lib/programs-data";
import { BOOK_NOW_URL } from "@/lib/site-contact";
import { ArrowRight, ArrowUpRight, ChevronLeft } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import styles from "./ProgramContent.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const FRAMEWORK_IMAGE_FALLBACK = "/images/hero-test.png";
const FRAMEWORK_FALLBACK_TITLE = "The Framework";
const FRAMEWORK_FALLBACK_PARAGRAPH =
  "A precision-led approach that connects what your body needs with how we guide you—step by step, in one continuous experience at BFriends.";

function getSessionGroups(program: ProgramData & { sessionGroups?: ProgramSessionGroup[] }): ProgramSessionGroup[] {
  const fromDb = program.sessionGroups;
  if (Array.isArray(fromDb) && fromDb.length > 0) {
    return fromDb;
  }
  if (program.sessions && program.sessions.length > 0) {
    return [{ typeTitle: "Signature Sessions", sessions: program.sessions }];
  }
  return [];
}

interface ProgramContentProps {
  program: ProgramData;
  programs: ProgramData[];
}

export default function ProgramContent({ program, programs }: ProgramContentProps) {
  const fwTitle =
    (typeof program.pillarsTitle === "string" ? program.pillarsTitle.trim() : "") || FRAMEWORK_FALLBACK_TITLE;
  const fwParagraph =
    (typeof program.pillarsParagraph === "string" ? program.pillarsParagraph.trim() : "") || FRAMEWORK_FALLBACK_PARAGRAPH;
  const fwImage =
    program.pillarsImage || program.image || FRAMEWORK_IMAGE_FALLBACK;

  return (
    <div className={styles.root}>
      {program.philosophy && <PhilosophySection philosophy={program.philosophy} />}
      <FrameworkSection title={fwTitle} paragraph={fwParagraph} imageUrl={fwImage} />
      {(() => {
        const sessionGroups = getSessionGroups(program);
        const total = sessionGroups.reduce((n, g) => n + (g.sessions?.length ?? 0), 0);
        return total > 0 ? (
          <SessionsSection sessionGroups={sessionGroups} fallbackImage={program.image} />
        ) : null;
      })()}
      <ProgramCta program={program} />
      {(program.previousProgram || program.nextProgram) && (
        <ProgramNavFooter
          previousSlug={program.previousProgram}
          nextSlug={program.nextProgram}
          programs={programs}
        />
      )}
    </div>
  );
}

function PhilosophySection({ philosophy }: { philosophy: string }) {
  return (
    <section
      className={styles.philosophy}
      aria-labelledby="program-philosophy-title"
    >
      <div className={styles.philosophyInner}>
        <h2 id="program-philosophy-title" className={styles.philosophyTitle}>
          The Philosophy
        </h2>
        <p className={styles.philosophyBody}>{philosophy}</p>
      </div>
    </section>
  );
}

/** Framework block — same structure as home intro (image + two-column title / body). */
function FrameworkSection({
  title,
  paragraph,
  imageUrl,
}: {
  title: string;
  paragraph: string;
  imageUrl: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const [isImageInView, setIsImageInView] = useState(false);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsImageInView(entry.isIntersecting),
      { threshold: 0.25, rootMargin: "0px" }
    );
    if (imageWrapperRef.current) observer.observe(imageWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.framework} aria-labelledby="program-framework-title">
      <div className={styles.frameworkContainer}>
        <p className={styles.eyebrow}>02 / The Framework</p>

        <div className={styles.frameworkImageWrap} ref={imageWrapperRef}>
          <div
            className={`${styles.frameworkImageInner} ${isImageInView ? styles.frameworkImageInnerVisible : styles.frameworkImageInnerBefore}`}
          >
            <Image
              src={imageUrl}
              alt=""
              fill
              className={styles.frameworkSectionImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1568px"
            />
          </div>
        </div>

        <motion.div
          className={styles.frameworkConclusion}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className={styles.frameworkLeft}>
            <h2 id="program-framework-title" className={styles.frameworkConclusionTitle}>
              {title}
            </h2>
          </div>
          <div className={styles.frameworkRight}>
            <p className={styles.frameworkConclusionText}>{paragraph}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SessionsSection({
  sessionGroups,
  fallbackImage,
}: {
  sessionGroups: ProgramSessionGroup[];
  fallbackImage: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  let cardIndex = 0;

  return (
    <section ref={ref} className={styles.sessions} aria-label="Signature Sessions">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Signature Sessions</p>
        {sessionGroups.map((group, gi) => {
          const sessions = group.sessions || [];
          const showGroupHeading =
            sessionGroups.length > 1 ||
            (group.typeTitle && group.typeTitle !== "Signature Sessions");
          return (
            <div key={`${group.typeTitle}-${gi}`} className={styles.sessionGroup}>
              {showGroupHeading && (
                <h3 className={styles.sessionGroupTitle}>{group.typeTitle}</h3>
              )}
              <ul className={styles.sessionsGrid}>
                {sessions.map((session, si) => {
                  const i = cardIndex++;
                  return (
                    <motion.li
                      key={`${gi}-${si}-${session.title}`}
                      className={styles.sessionCard}
                      initial={{ opacity: 0, y: 24 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.06,
                        ease: EASE,
                      }}
                    >
                      <div className={styles.sessionCardImageWrap}>
                        <Image
                          src={session.image ?? fallbackImage}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={styles.sessionCardImage}
                        />
                      </div>
                      <div className={styles.sessionCardContent}>
                        <h4 className={styles.sessionCardTitle}>{session.title}</h4>
                        <p className={styles.sessionCardDesc}>{session.description}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          );
        })}
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
          href={BOOK_NOW_URL}
          target="_blank"
          rel="noopener noreferrer"
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
  programs,
}: {
  previousSlug?: string;
  nextSlug?: string;
  programs: ProgramData[];
}) {
  const previousProgram = previousSlug
    ? programs.find((p) => p.slug === previousSlug)
    : null;
  const nextProgram = nextSlug
    ? programs.find((p) => p.slug === nextSlug)
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
