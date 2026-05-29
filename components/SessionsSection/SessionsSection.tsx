"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { PublicProgram } from "@/lib/cms";
import { BOOK_NOW_URL } from "@/lib/site-contact";
import Button from "@/components/ui/Button/Button";
import styles from "./SessionsSection.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export type SessionGroups = PublicProgram["sessions_group"];

interface SessionsSectionProps {
  sessionGroups: SessionGroups;
  title?: string;
  ariaLabel?: string;
}

export default function SessionsSection({
  sessionGroups,
  title = "Signature Sessions",
  ariaLabel = "Signature Sessions",
}: SessionsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const [openSessionId, setOpenSessionId] = useState<string | null>(null);

  const toggleSession = (id: string) => {
    setOpenSessionId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={ref} className={styles.sessions} aria-label={ariaLabel}>
      <div className={`${styles.container} ${styles.sessionsLayout}`}>
        <motion.aside
          className={styles.sessionsIntro}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className={styles.sessionsIntroSticky}>
            <h2 className={styles.sessionsTitle}>{title}</h2>
            <Button
              href={BOOK_NOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              color="var(--color-blue-100)"
            >
              Reserve your moments
            </Button>
          </div>
        </motion.aside>

        <div className={styles.sessionsGroups}>
          {sessionGroups.map((group, gi) => {
            const sessions = group.sessions || [];
            const showGroupHeading = Boolean(group.name?.trim());
            return (
              <div key={`${group.name}-${gi}`} className={styles.sessionGroup}>
                {showGroupHeading && <h3 className={styles.sessionGroupTitle}>{group.name}</h3>}
                <ul className={styles.sessionItems}>
                  {sessions.map((session, si) => {
                    const sessionId = `${gi}-${si}-${session.name}`;
                    const detailsId = `session-details-${gi}-${si}`;
                    const isOpen = openSessionId === sessionId;
                    return (
                      <motion.li
                        key={sessionId}
                        className={styles.sessionItem}
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: gi * 0.08 + si * 0.05,
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
                          <h4 className={styles.sessionItemTitle}>{session.name}</h4>
                          <span
                            className={`${styles.sessionItemIcon} ${isOpen ? styles.sessionItemIconOpen : ""}`}
                            aria-hidden
                          >
                            +
                          </span>
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
