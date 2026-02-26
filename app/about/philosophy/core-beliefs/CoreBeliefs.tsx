"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./CoreBeliefs.module.css";

const BELIEFS = [
  {
    id: 1,
    index: "01",
    title: "Intentionality",
    body: "Movement without purpose is labor. Every rep is calculated.",
  },
  {
    id: 2,
    index: "02",
    title: "Sustainability",
    body: "Rhythm over burnout. A loop, not a crash.",
  },
  {
    id: 3,
    index: "03",
    title: "Integration",
    body: "Skin reflects gut; muscle supports mind. The whole system.",
  },
];

export default function CoreBeliefs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className={styles.section} aria-label="Core beliefs">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Core Beliefs</p>
        <div className={styles.grid}>
          {BELIEFS.map((item, i) => (
            <motion.article
              key={item.id}
              className={styles.card}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: {},
              }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.span
                className={styles.index}
                aria-hidden
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.06 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {item.index}
              </motion.span>
              <motion.div
                className={styles.borderTop}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.1,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              />
              <motion.div
                className={styles.borderRight}
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              />
              <div className={styles.content}>
                <motion.h3
                  className={styles.heading}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.1,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className={styles.body}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.1,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                >
                  {item.body}
                </motion.p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
