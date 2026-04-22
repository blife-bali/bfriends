"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./BLifeEcosystem.module.css";

interface EcosystemItem {
  id: number | string;
  name: string;
  description: string;
  url?: string | null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BLifeEcosystem({ items = [] }: { items?: EcosystemItem[] }) {
  const list = items;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  if (list.length === 0) return null;

  return (
    <section ref={ref} className={styles.section} aria-label="The BLife ecosystem">
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>The Ecosystem</p>
          <h2 className={styles.headerTitle}>Distinct Roles. One Rhythm.</h2>
        </motion.header>
        <ul className={styles.list}>
          {list.map((item, i) => {
            const label = `${String(i + 1).padStart(2, "0")} / ${item.name}`;
            const content = (
              <>
                <span className={styles.itemLabel}>{label}</span>
                <span className={styles.itemDesc}>{item.description}</span>
              </>
            );
            return (
              <motion.li
                key={item.id}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                transition={{
                  duration: 0.5,
                  delay: 0.06 + i * 0.06,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.item}
                    title="Visit"
                  >
                    {content}
                  </a>
                ) : (
                  <span className={styles.item}>{content}</span>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
