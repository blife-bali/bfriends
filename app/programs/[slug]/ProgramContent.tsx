"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { type PublicProgram } from "@/lib/cms";
import { BOOK_NOW_URL } from "@/lib/site-contact";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import VideoBlock from "@/components/VideoBlock/VideoBlock";
import parallax from "@/components/ParallaxSection/ParallaxSection.module.css";
import styles from "./ProgramContent.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const FRAMEWORK_IMAGE_FALLBACK = "/images/hero-test.png";
const PROGRAM_VIDEO_FALLBACK = "/videos/BFriends2.mp4";
const FRAMEWORK_FALLBACK_TITLE = "The Framework";
const FRAMEWORK_FALLBACK_PARAGRAPH =
  "A precision-led approach that connects what your body needs with how we guide you—step by step, in one continuous experience at BFriends.";

interface ProgramContentProps {
  program: PublicProgram;
  programs: PublicProgram[];
}

export default function ProgramContent({ program, programs }: ProgramContentProps) {
  const fwTitle =
    (typeof program.framework.title === "string" ? program.framework.title.trim() : "") || FRAMEWORK_FALLBACK_TITLE;
  const fwParagraph =
    (typeof program.framework.sub === "string" ? program.framework.sub.trim() : "") || FRAMEWORK_FALLBACK_PARAGRAPH;
  const fwImage =
    program.framework.image || program.general.image || FRAMEWORK_IMAGE_FALLBACK;
  const fwVideo =
    (typeof program.general.video === "string" && program.general.video.trim()) || PROGRAM_VIDEO_FALLBACK;
  const currentIndex = programs.findIndex((p) => p.general.slug === program.general.slug);
  const previousSlug = currentIndex > 0 ? programs[currentIndex - 1].general.slug : undefined;
  const nextSlug =
    currentIndex >= 0 && currentIndex < programs.length - 1
      ? programs[currentIndex + 1].general.slug
      : undefined;
  const isCafeProgram =
    program.general.slug.trim().toLowerCase() === "cafe" ||
    program.general.name.trim().toLowerCase() === "cafe";
  const shouldHideCta =
    ["cafe", "climbing"].includes(program.general.slug.trim().toLowerCase()) ||
    ["cafe", "climbing"].includes(program.general.name.trim().toLowerCase());

  return (
    <div className={styles.root}>
      {program.intro.sub && <PhilosophySection title={program.intro.title} body={program.intro.sub} />}
      <FrameworkSection title={fwTitle} paragraph={fwParagraph} imageUrl={fwImage} />
      {(() => {
        const sessionGroups = program.sessions_group || [];
        const total = sessionGroups.reduce((n, g) => n + (g.sessions?.length ?? 0), 0);
        return total > 0 ? (
          <SessionsSection sessionGroups={sessionGroups} isCafeProgram={isCafeProgram} />
        ) : null;
      })()}
      <ProgramVideoSection videoUrl={fwVideo} />
      {!shouldHideCta && <ProgramCta program={program} />}
      {false && (previousSlug || nextSlug) && (
        <ProgramNavFooter
          previousSlug={previousSlug}
          nextSlug={nextSlug}
          programs={programs}
        />
      )}
    </div>
  );
}

function PhilosophySection({ title, body }: { title: string; body: string }) {
  return (
    <section
      className={styles.philosophy}
      aria-labelledby="program-philosophy-title"
    >
      <div className={styles.philosophyInner}>
        <h2 id="program-philosophy-title" className={styles.philosophyTitle}>
          {title}
        </h2>
        <p className={styles.philosophyBody}>{body}</p>
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
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");

  const { scrollYProgress } = useScroll({
    target: imageWrapperRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.01,
  });
  const y = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY !== lastScrollY.current) {
        scrollDirection.current = currentY > lastScrollY.current ? "down" : "up";
        lastScrollY.current = currentY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsImageInView(true);
        } else if (scrollDirection.current === "up") {
          setIsImageInView(false);
        }
      },
      { threshold: 0.25, rootMargin: "0px" }
    );
    if (imageWrapperRef.current) observer.observe(imageWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.framework} aria-labelledby="program-framework-title">
      <div className={styles.frameworkContainer}>
        <div className={parallax.imageWrap} ref={imageWrapperRef}>
          <div
            className={`${parallax.imageFrame} ${parallax.imageFrameRatio169} ${isImageInView ? parallax.imageFrameVisible : parallax.imageFrameBefore}`}
          >
            <motion.div className={parallax.parallaxLayer} style={{ y }}>
              <Image
                src={imageUrl}
                alt=""
                fill
                className={parallax.coverImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1568px"
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          className={parallax.copyGrid}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className={parallax.copyColLeft}>
            <h2 id="program-framework-title" className={`${parallax.copyTitle} ${parallax.copyTitleLg}`}>
              {title}
            </h2>
          </div>
          <div className={`${parallax.copyColRight} ${parallax.copyColGapTight}`}>
            <p className={`${parallax.copyBody} ${parallax.copyBodyPreLine}`}>{paragraph}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProgramVideoSection({ videoUrl }: { videoUrl: string }) {
  return (
    <section className={styles.framework} aria-label="Program video">
      <div className={styles.frameworkContainer}>
        <VideoBlock src={videoUrl} />
      </div>
    </section>
  );
}

function SessionsSection({
  sessionGroups,
  isCafeProgram,
}: {
  sessionGroups: PublicProgram["sessions_group"];
  isCafeProgram: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const [openSessionId, setOpenSessionId] = useState<string | null>(null);

  const toggleSession = (id: string) => {
    setOpenSessionId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={ref} className={styles.sessions} aria-label="Signature Sessions">
      <div
        className={`${styles.container} ${styles.sessionsLayout} ${isCafeProgram ? styles.sessionsLayoutCafe : ""}`}
      >
        <motion.aside
          className={styles.sessionsIntro}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className={styles.sessionsIntroSticky}>
            <h2 className={styles.sessionsTitle}>Signature Sessions</h2>
            <Button
              href={BOOK_NOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              color="var(--color-blue-100)"
              showIcon
            >
              Reserve your moments
            </Button>
          </div>
        </motion.aside>

        <div className={`${styles.sessionsGroups} ${isCafeProgram ? styles.sessionsGroupsCafe : ""}`}>
        {sessionGroups.map((group, gi) => {
          const sessions = group.sessions || [];
          const showGroupHeading = Boolean(group.name?.trim());
          return (
            <div
              key={`${group.name}-${gi}`}
              className={`${styles.sessionGroup} ${isCafeProgram ? styles.sessionGroupCafe : ""}`}
            >
              {showGroupHeading && (
                <h3 className={styles.sessionGroupTitle}>{group.name}</h3>
              )}
              <ul className={`${styles.sessionItems} ${isCafeProgram ? styles.sessionItemsCafe : ""}`}>
                {sessions.map((session, si) => {
                  const sessionId = `${gi}-${si}-${session.name}`;
                  const detailsId = `session-details-${gi}-${si}`;
                  const isOpen = openSessionId === sessionId;
                  const hasImage = Boolean(session.image?.trim());
                  return (
                    <motion.li
                      key={sessionId}
                      className={`${styles.sessionItem} ${isCafeProgram ? styles.sessionItemCafe : ""}`}
                      initial={{ opacity: 0, y: 24 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: (gi * 0.08) + si * 0.05,
                        ease: EASE,
                      }}
                    >
                      <button
                        type="button"
                        className={styles.sessionItemTrigger}
                        onClick={() => toggleSession(sessionId)}
                        aria-expanded={isOpen}
                        aria-controls={detailsId}
                      >
                        {isCafeProgram && hasImage && (
                          <div className={styles.sessionItemImageWrap}>
                            <Image
                              src={session.image as string}
                              alt={session.name}
                              fill
                              className={styles.sessionItemImage}
                              sizes="(max-width: 768px) 100vw, 30vw"
                            />
                          </div>
                        )}
                        {isCafeProgram ? (
                          <div className={styles.sessionItemHeader}>
                            <h4 className={styles.sessionItemTitle}>{session.name}</h4>
                            <span
                              className={`${styles.sessionItemIcon} ${isOpen ? styles.sessionItemIconOpen : ""}`}
                              aria-hidden
                            >
                              +
                            </span>
                          </div>
                        ) : (
                          <>
                            <h4 className={styles.sessionItemTitle}>{session.name}</h4>
                            <span
                              className={`${styles.sessionItemIcon} ${isOpen ? styles.sessionItemIconOpen : ""}`}
                              aria-hidden
                            >
                              +
                            </span>
                          </>
                        )}
                      </button>
                      <div
                        id={detailsId}
                        className={`${styles.sessionItemDetails} ${isOpen ? styles.sessionItemDetailsOpen : ""}`}
                      >
                        <div className={styles.sessionItemDetailsInner}>
                          {session.extra && <p className={styles.sessionItemText}>{session.extra}</p>}
                          {session.desc && <p className={styles.sessionItemText}>{session.desc}</p>}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}

function ProgramCta({ program }: { program: PublicProgram }) {
  return (
    <section className={styles.cta} aria-label="Get started">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Get started</p>
        <h2 className={styles.ctaHeading}>
          Ready to experience {program.general.name}?
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
  programs: PublicProgram[];
}) {
  const previousProgram = previousSlug
    ? programs.find((p) => p.general.slug === previousSlug)
    : null;
  const nextProgram = nextSlug
    ? programs.find((p) => p.general.slug === nextSlug)
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
            style={{ backgroundImage: `url(${previousProgram.general.image})` }}
            aria-hidden
          />
          <div className={styles.programNavOverlay} aria-hidden />
          <div className={styles.programNavContent}>
            <span className={styles.programNavLabel}>Previous</span>
            <span className={styles.programNavText}>
              <span className={styles.programNavIcon}>
                <ChevronLeft aria-hidden />
              </span>
              {previousProgram.general.name}
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
            style={{ backgroundImage: `url(${nextProgram.general.image})` }}
            aria-hidden
          />
          <div className={styles.programNavOverlay} aria-hidden />
          <div className={styles.programNavContent}>
            <span className={styles.programNavLabel}>Next</span>
            <span className={styles.programNavText}>
              {nextProgram.general.name}
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
