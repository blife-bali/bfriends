"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { PublicProgram } from "@/lib/cms";
import styles from "./SpaSessionsSection.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export type SpaSessionGroups = PublicProgram["sessions_group"];

interface SpaSessionsSectionProps {
  sessionGroups: SpaSessionGroups;
  ariaLabel?: string;
}

export default function SpaSessionsSection({
  sessionGroups,
  ariaLabel = "Spa",
}: SpaSessionsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const [openSessionId, setOpenSessionId] = useState<string | null>(null);

  const toggleSession = (id: string) => {
    setOpenSessionId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={ref} className={styles.section} aria-label={ariaLabel}>
      <div className={styles.container}>
        <div className={styles.groups}>
          {sessionGroups.map((group, gi) => {
            const sessions = group.sessions || [];
            const showGroupHeading = Boolean(group.name?.trim());
            return (
              <div key={`${group.name}-${gi}`} className={styles.group}>
                {showGroupHeading && <h2 className={styles.groupTitle}>{group.name}</h2>}
                <ul className={styles.items}>
                  {sessions.map((session, si) => {
                    const sessionId = `${gi}-${si}-${session.name}`;
                    const detailsId = `spa-session-${gi}-${si}`;
                    const isOpen = openSessionId === sessionId;
                    return (
                      <motion.li
                        key={sessionId}
                        className={styles.item}
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
                          className={styles.itemTrigger}
                          onClick={() => toggleSession(sessionId)}
                          aria-expanded={isOpen}
                          aria-controls={detailsId}
                        >
                          <h3 className={styles.itemTitle}>{session.name}</h3>
                          <span
                            className={`${styles.itemIcon} ${isOpen ? styles.itemIconOpen : ""}`}
                            aria-hidden
                          >
                            +
                          </span>
                        </button>
                        <div
                          id={detailsId}
                          className={`${styles.itemDetails} ${isOpen ? styles.itemDetailsOpen : ""}`}
                        >
                          <div className={styles.itemDetailsInner}>
                            {session.extra && <p className={styles.itemText}>{session.extra}</p>}
                            {session.desc && <p className={styles.itemText}>{session.desc}</p>}
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
